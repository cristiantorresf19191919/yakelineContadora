import Script from "next/script";

/**
 * Inline `<script>` that stamps `data-theme` on <html> BEFORE first paint so a
 * returning visitor never sees the default-mood flash before their saved theme
 * applies. Precedence: an attribute already on <html> wins (SSR / extension),
 * else the persisted cookie, else localStorage, else the default mood.
 *
 * Wrapped in `next/script` with `strategy="beforeInteractive"` so Next hoists
 * it into <head> outside React's reconciler — a raw inline script in the React
 * tree risks hydration mismatches (React 19 also refuses to re-execute inline
 * scripts on the client). The body is a hardcoded constant — no user input.
 */
const SCRIPT = `(function(){try{var ok={iris:1,esmeralda:1,zafiro:1,oro:1,rosa:1,medianoche:1,onix:1,bosque:1};var el=document.documentElement;var cur=el.getAttribute('data-theme');if(cur&&ok[cur])return;var fromCookie=(document.cookie.match(/(?:^|; )yc:theme=([^;]+)/)||[])[1];var fromLS=null;try{fromLS=localStorage.getItem('yc:theme');}catch(e){}var t=ok[fromCookie]?fromCookie:(ok[fromLS]?fromLS:'iris');el.setAttribute('data-theme',t);}catch(e){}})();`;

export function ThemeScript() {
  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="yc-theme-pre-paint" strategy="beforeInteractive">
      {SCRIPT}
    </Script>
  );
}
