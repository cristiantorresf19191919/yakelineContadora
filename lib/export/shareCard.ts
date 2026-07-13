/**
 * Instagram-story (1080x1920) share cards drawn with the Canvas 2D API only.
 *
 * `createStoryCardBlob` renders a branded result card and returns a PNG Blob.
 * `shareOrDownload` prefers the native Web Share sheet (with the file attached)
 * and falls back to a plain download when sharing files isn't supported.
 */

export interface StoryCardData {
  /** The big centered result, e.g. "72%" or "$12.000.000". */
  headline: string;
  /** A short caption describing the result. */
  label: string;
}

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1920;

/** Read a brand CSS custom property at runtime so the card follows the mood. */
function readBrandColor(name: string, fallback: string): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Best-effort wait so web fonts (Playfair Display / Outfit) are ready before
 *  the canvas measures and paints text. Never rejects. */
async function ensureFontsReady(): Promise<void> {
  try {
    if (typeof document !== "undefined" && "fonts" in document) {
      await document.fonts.ready;
    }
  } catch {
    // Ignore — canvas falls back to a system font if the web font is absent.
  }
}

function fillCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number
): void {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

/** Pick the largest font size (stepping down) whose text fits `maxWidth`. */
function fitFontSize(
  ctx: CanvasRenderingContext2D,
  text: string,
  buildFont: (size: number) => string,
  maxSize: number,
  minSize: number,
  maxWidth: number
): number {
  let size = maxSize;
  while (size > minSize) {
    ctx.font = buildFont(size);
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 4;
  }
  return size;
}

/** Draw centered text, wrapping onto up to two lines around `centerY`. */
function drawWrappedCentered(
  ctx: CanvasRenderingContext2D,
  text: string,
  centerX: number,
  centerY: number,
  maxWidth: number,
  lineHeight: number
): void {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  words.forEach((word) => {
    const candidate = current ? `${current} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  });
  if (current) lines.push(current);

  const startY = centerY - ((lines.length - 1) * lineHeight) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, centerX, startY + i * lineHeight);
  });
}

export async function createStoryCardBlob(data: StoryCardData): Promise<Blob> {
  if (typeof document === "undefined") {
    throw new Error("createStoryCardBlob solo puede ejecutarse en el navegador.");
  }

  await ensureFontsReady();

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No se pudo inicializar el lienzo para la imagen.");
  }

  const primary = readBrandColor("--brand-primary", "#5D3FD3");
  const strong = readBrandColor("--brand-primary-strong", "#7C5CE7");
  const accent = readBrandColor("--brand-accent", "#F59E0B");

  // Vertical brand gradient background.
  const gradient = ctx.createLinearGradient(0, 0, 0, CARD_HEIGHT);
  gradient.addColorStop(0, strong);
  gradient.addColorStop(1, primary);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Subtle rounded decorative shapes.
  ctx.save();
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = "#FFFFFF";
  fillCircle(ctx, CARD_WIDTH - 90, 260, 300);
  fillCircle(ctx, 110, CARD_HEIGHT - 380, 360);
  ctx.restore();

  ctx.save();
  ctx.globalAlpha = 0.1;
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.roundRect(90, 640, CARD_WIDTH - 180, 640, 56);
  ctx.fill();
  ctx.restore();

  const cx = CARD_WIDTH / 2;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Brand name near the top.
  ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
  ctx.font = "600 46px 'Outfit', sans-serif";
  ctx.fillText("Yakeline Contadora", cx, 200);

  // Accent divider.
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(cx - 55, 248, 110, 8, 4);
  ctx.fill();

  // Result label (caption).
  ctx.fillStyle = "rgba(255, 255, 255, 0.82)";
  ctx.font = "500 42px 'Outfit', sans-serif";
  drawWrappedCentered(ctx, data.label.toUpperCase(), cx, 780, 820, 58);

  // Big centered result.
  ctx.fillStyle = "#FFFFFF";
  const headlineSize = fitFontSize(
    ctx,
    data.headline,
    (size) => `800 ${size}px 'Playfair Display', serif`,
    240,
    88,
    860
  );
  ctx.font = `800 ${headlineSize}px 'Playfair Display', serif`;
  ctx.fillText(data.headline, cx, 980);

  // Accent underline beneath the result.
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(cx - 90, 1120, 180, 10, 5);
  ctx.fill();

  // Disclaimer.
  ctx.fillStyle = "rgba(255, 255, 255, 0.68)";
  ctx.font = "400 30px 'Outfit', sans-serif";
  drawWrappedCentered(
    ctx,
    "Estimacion referencial, resultado ilustrativo",
    cx,
    1400,
    820,
    42
  );

  // Handle + tagline near the bottom.
  ctx.fillStyle = "#FFFFFF";
  ctx.font = "700 48px 'Outfit', sans-serif";
  ctx.fillText("@yakelinecontadora", cx, 1680);

  ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
  ctx.font = "500 34px 'Outfit', sans-serif";
  ctx.fillText("Asesoria contable y tributaria", cx, 1748);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("No se pudo generar la imagen para compartir."));
      }
    }, "image/png");
  });
}

export async function shareOrDownload(
  blob: Blob,
  filename: string,
  text: string
): Promise<void> {
  const file = new File([blob], filename, { type: blob.type || "image/png" });
  const title = "Yakeline Contadora";

  const canShareFiles =
    typeof navigator !== "undefined" &&
    typeof navigator.canShare === "function" &&
    typeof navigator.share === "function" &&
    navigator.canShare({ files: [file] });

  if (canShareFiles) {
    try {
      await navigator.share({ files: [file], text, title });
      return;
    } catch (error) {
      // User dismissed the native share sheet — don't fall back to a download.
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      // Any other share failure falls through to the download path below.
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  } finally {
    URL.revokeObjectURL(url);
  }
}
