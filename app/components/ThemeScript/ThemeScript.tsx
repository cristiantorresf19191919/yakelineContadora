import Script from "next/script";

/**
 * Inline `<script>` that stamps `data-theme` on <html> BEFORE first paint.
 *
 * Behaviour: on EVERY full page load we roll a uniformly-random mood from all
 * nine and apply it immediately — the site greets each visit with a fresh
 * ambience. Because the whole chrome (header, hero, footer, command palette,
 * scrollbar) is driven by the `[data-theme]` CSS variables, the random mood
 * paints with zero flash. A visitor can still override the roll for the current
 * visit via the mood wheel (`applyTheme` persists + recolors); the next full
 * load simply re-rolls — this is the intended "random every load" experience.
 *
 * Wrapped in `next/script` with `strategy="beforeInteractive"` so Next hoists
 * it into <head> outside React's reconciler — a raw inline script in the React
 * tree risks hydration mismatches (React 19 also refuses to re-execute inline
 * scripts on the client). The body is a hardcoded constant — no user input.
 */
const SCRIPT = `(function(){try{var ids=['iris','esmeralda','zafiro','oro','rosa','medianoche','onix','bosque','cristal'];document.documentElement.setAttribute('data-theme',ids[Math.floor(Math.random()*ids.length)]);}catch(e){}})();`;

export function ThemeScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="yc-theme-pre-paint" strategy="beforeInteractive">
      {SCRIPT}
    </Script>
  );
}
