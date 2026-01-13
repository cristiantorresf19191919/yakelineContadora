import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Script from "next/script";
import EmotionCacheProvider from "./emotion-cache";
import ThemeProvider from "./ThemeProvider";
import Header from "./components/Header/Header";
import "./globals.css";
import { FloatingButtonsContainer } from "./components/FloatingButtonsContainer/FloatingButtonsContainer";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: {
    default: "Yakeline Contadora - Asesoría Contable y Tributaria",
    template: "%s | Yakeline Contadora"
  },
  description: "Asesoría contable y tributaria profesional en Colombia. Gestión tributaria, declaración de renta, facturación electrónica y consultoría financiera para personas y empresas.",
  keywords: ["contador", "asesoría contable", "declaración de renta", "gestión tributaria", "contador Colombia", "facturación electrónica", "DIAN", "revisoría fiscal", "consultoría financiera"],
  authors: [{ name: "Yakelin Bustamante" }],
  creator: "Yakelin Bustamante",
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com",
    siteName: "Yakeline Contadora",
    title: "Yakeline Contadora - Asesoría Contable y Tributaria",
    description: "Asesoría contable y tributaria profesional para el bienestar de tus finanzas",
    images: [
      {
        url: "/photo2.png",
        width: 1200,
        height: 630,
        alt: "Yakeline Contadora - Asesora Contable Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakeline Contadora - Asesoría Contable",
    description: "Asesoría contable y tributaria profesional",
    images: ["/photo2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "name": "Yakeline Contadora",
    "alternateName": "Yakelin Bustamante - Contadora",
    "description": "Asesoría contable y tributaria profesional para personas y empresas en Colombia",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com",
    "telephone": "+57-320-726-9417",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CO"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "serviceType": [
      "Gestión Tributaria Integral",
      "Revisoría Fiscal y Auditoría",
      "Consultoría Financiera Estratégica",
      "Declaración de Renta",
      "Facturación Electrónica",
      "Contabilidad para Pymes"
    ],
    "founder": {
      "@type": "Person",
      "name": "Yakelin Bustamante"
    }
  };

  return (
    <html lang="es" className={`${outfit.variable} ${playfair.variable}`}>
      <body>
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
        <EmotionCacheProvider>
          <ThemeProvider>
            <Header />
            {children}
            <FloatingButtonsContainer />
          </ThemeProvider>
        </EmotionCacheProvider>
      </body>
    </html>
  );
}
