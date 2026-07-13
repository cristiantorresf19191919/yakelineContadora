import type { MetadataRoute } from "next";

// PWA manifest — makes the site installable to home screen with an offline
// fallback (service worker registered in ServiceWorkerRegister). Icons are
// crisp SVGs that render at any density.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yakeline Contadora — Asesoría Contable y Tributaria",
    short_name: "Yakeline",
    description:
      "Asesoría contable y tributaria profesional en Colombia: declaración de renta, calendario tributario, checklist de documentos y calculadoras.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#5d3fd3",
    lang: "es-CO",
    dir: "ltr",
    orientation: "portrait-primary",
    categories: ["business", "finance", "productivity"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      {
        src: "/icon-maskable.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
  };
}
