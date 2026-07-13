"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker (public/sw.js) in production only.
 * Registration is deferred to window "load" so it never competes with the
 * initial render, and failures are swallowed (the SW is a progressive
 * enhancement — the site works identically without it).
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        /* Non-fatal: the site works without offline support. */
      });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
