import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios Contables y Tributarios",
  description: "Gestión tributaria integral, revisoría fiscal y consultoría financiera estratégica. Optimiza tus impuestos y asegura el crecimiento de tu negocio con asesoría experta en Colombia.",
  keywords: "servicios contables, gestión tributaria, revisoría fiscal, consultoría financiera, declaración de renta, contador Colombia, facturación electrónica, asesoría tributaria",
  openGraph: {
    title: "Servicios Contables Profesionales | Yakeline Contadora",
    description: "Tranquilidad fiscal y crecimiento financiero con nuestros servicios contables integrales",
    type: "website",
    images: [
      {
        url: "/photo2.png",
        width: 1200,
        height: 630,
        alt: "Servicios Contables Yakeline Contadora",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicios Contables | Yakeline Contadora",
    description: "Asesoría contable y tributaria profesional",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
