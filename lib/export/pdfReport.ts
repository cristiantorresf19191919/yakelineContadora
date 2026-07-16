/**
 * Branded A4 PDF reports for the Yakeline Contadora result tools.
 *
 * jsPDF is imported dynamically inside each generator so it stays out of the
 * initial client bundle. Both public functions throw on failure; the calling
 * component is responsible for surfacing an error to the user.
 */

// ─── Public data shapes ──────────────────────────────────────────────────────

export interface HealthReportData {
  percentage: number;
  diagnosisLabel: string;
  diagnosisMessage: string;
  recommendations: string[];
}

export interface SavingsReportData {
  monthlyRevenue: number;
  estimatedTax: number;
  optimizedTax: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
}

// ─── Internal report description ─────────────────────────────────────────────

interface ReportContent {
  fileName: string;
  reportTitle: string;
  headlineCaption: string;
  headline: string;
  diagnosisLabel: string;
  intro?: string;
  bodyHeading: string;
  bodyLines: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Read a brand CSS custom property at runtime so the PDF follows the mood. */
function readBrandColor(name: string, fallback: string): string {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

/** Convert a "#rrggbb" / "#rgb" hex or "rgb(r, g, b)" string to an [r, g, b]
 *  triplet, falling back to the brand purple only when the input is unparseable. */
function hexToRgb(color: string): [number, number, number] {
  const fallback: [number, number, number] = [93, 63, 211];

  const clean = color.replace("#", "").trim();
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (/^[0-9a-fA-F]{6}$/.test(full)) {
    const int = Number.parseInt(full, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  // Not valid hex — accept "rgb(r, g, b)" / "rgba(...)" integer channels.
  const rgbMatch = color.match(/rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})/i);
  if (rgbMatch) {
    return [
      Math.min(255, Number.parseInt(rgbMatch[1], 10)),
      Math.min(255, Number.parseInt(rgbMatch[2], 10)),
      Math.min(255, Number.parseInt(rgbMatch[3], 10)),
    ];
  }

  return fallback;
}

/** Replace exotic whitespace (e.g. narrow no-break space from Intl) so jsPDF
 *  renders it cleanly with the standard font. */
function sanitize(text: string): string {
  return text.replace(/[\u00A0\u202F\u2007\u2009\u2060]/g, " ");
}

// ─── Report builder ──────────────────────────────────────────────────────────

async function buildAndSave(content: ReportContent): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  const [pr, pg, pb] = hexToRgb(readBrandColor("--brand-primary", "#5D3FD3"));

  // Top filled brand band.
  doc.setFillColor(pr, pg, pb);
  doc.rect(0, 0, pageWidth, 42, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Yakeline Contadora", margin, 21);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text("Asesoria Contable y Tributaria", margin, 31);

  let y = 60;

  // Report title.
  doc.setTextColor(31, 41, 55);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(17);
  const titleLines = doc.splitTextToSize(sanitize(content.reportTitle), contentWidth);
  doc.text(titleLines, margin, y);
  y += titleLines.length * 8 + 8;

  // Headline caption.
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  const captionLines = doc.splitTextToSize(sanitize(content.headlineCaption), contentWidth);
  doc.text(captionLines, margin, y);
  y += captionLines.length * 6 + 4;

  // Large headline number.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(38);
  doc.setTextColor(pr, pg, pb);
  const headlineLines = doc.splitTextToSize(sanitize(content.headline), contentWidth);
  doc.text(headlineLines, margin, y + 12);
  y += headlineLines.length * 15 + 6;

  // Diagnosis / label line.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(31, 41, 55);
  const labelLines = doc.splitTextToSize(sanitize(content.diagnosisLabel), contentWidth);
  doc.text(labelLines, margin, y);
  y += labelLines.length * 7 + 6;

  // Optional intro paragraph.
  if (content.intro) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(75, 85, 99);
    const introLines = doc.splitTextToSize(sanitize(content.intro), contentWidth);
    doc.text(introLines, margin, y);
    y += introLines.length * 6 + 6;
  }

  // Body heading.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(31, 41, 55);
  doc.text(sanitize(content.bodyHeading), margin, y);
  y += 9;

  // Bulleted body lines.
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  content.bodyLines.forEach((line) => {
    const wrapped = doc.splitTextToSize(sanitize(line), contentWidth - 7);
    doc.setFillColor(pr, pg, pb);
    doc.circle(margin + 1.2, y - 1.4, 0.9, "F");
    doc.setTextColor(55, 65, 81);
    doc.text(wrapped, margin + 7, y);
    y += wrapped.length * 6 + 3.5;
  });

  // Footer.
  const footerTop = pageHeight - 34;
  doc.setDrawColor(229, 231, 235);
  doc.setLineWidth(0.3);
  doc.line(margin, footerTop, pageWidth - margin, footerTop);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(pr, pg, pb);
  doc.text("Agenda tu asesoria personalizada", margin, footerTop + 8);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(107, 114, 128);
  const dateStr = new Date().toLocaleDateString("es-CO");
  doc.text(
    sanitize(`${dateStr}   |   yakelincontadora.com   |   WhatsApp +57 320 726 9417`),
    margin,
    footerTop + 15
  );

  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  const disclaimer = doc.splitTextToSize(
    "Estimacion referencial, resultado ilustrativo sujeto a tu situacion fiscal.",
    contentWidth
  );
  doc.text(disclaimer, margin, footerTop + 22);

  doc.save(content.fileName);
}

// ─── Public generators ───────────────────────────────────────────────────────

export async function downloadHealthReport(data: HealthReportData): Promise<void> {
  await buildAndSave({
    fileName: "diagnostico-financiero.pdf",
    reportTitle: "Diagnostico de Salud Financiera",
    headlineCaption: "Tu puntaje de salud financiera",
    headline: `${data.percentage}%`,
    diagnosisLabel: `Nivel: ${data.diagnosisLabel}`,
    intro: data.diagnosisMessage,
    bodyHeading: "Recomendaciones para ti",
    bodyLines:
      data.recommendations.length > 0
        ? data.recommendations
        : ["Agenda una asesoria personalizada para revisar tu situacion en detalle."],
  });
}

export async function downloadSavingsReport(data: SavingsReportData): Promise<void> {
  await buildAndSave({
    fileName: "ahorro-tributario.pdf",
    reportTitle: "Reporte de Ahorro Tributario",
    headlineCaption: "Ahorro estimado anual con planeacion tributaria",
    headline: formatCOP(data.annualSavings),
    diagnosisLabel: `Hasta ${data.savingsPercentage}% de optimizacion fiscal`,
    bodyHeading: "Desglose de tu estimacion",
    bodyLines: [
      `Impuesto mensual sin optimizar: ${formatCOP(data.estimatedTax)}`,
      `Impuesto mensual optimizado con Yakeline: ${formatCOP(data.optimizedTax)}`,
      `Ahorro mensual estimado: ${formatCOP(data.monthlySavings)}`,
      `Ahorro anual estimado: ${formatCOP(data.annualSavings)}`,
    ],
  });
}
