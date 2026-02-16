import type { Metadata, Viewport } from "next";
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

// Next.js 16 pattern: separate viewport export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"),
  title: {
    default: "Yakeline Contadora - Asesoría Contable y Tributaria Profesional en Colombia",
    template: "%s | Yakeline Contadora"
  },
  description: "Asesoría contable y tributaria profesional en Colombia. Experta en gestión tributaria, declaración de renta, facturación electrónica DIAN, revisoría fiscal y consultoría financiera para personas naturales y empresas.",
  keywords: [
    "contador Colombia",
    "asesoría contable Colombia",
    "declaración de renta Colombia",
    "gestión tributaria",
    "facturación electrónica DIAN",
    "revisoría fiscal",
    "consultoría financiera",
    "contador Bogotá",
    "asesor tributario",
    "contabilidad empresarial",
    "contador público",
    "servicios contables"
  ],
  authors: [{ name: "Yakelin Bustamante", url: "https://yakelinecontadora.com" }],
  creator: "Yakelin Bustamante",
  publisher: "Yakeline Contadora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      'es-CO': '/',
      'es': '/',
    },
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "/",
    siteName: "Yakeline Contadora",
    title: "Yakeline Contadora - Asesoría Contable y Tributaria Profesional",
    description: "Experta en asesoría contable y tributaria en Colombia. Gestión tributaria integral, declaración de renta, facturación electrónica y consultoría financiera personalizada.",
    images: [
      {
        url: "/photo2.png",
        width: 1200,
        height: 630,
        alt: "Yakeline Bustamante - Contadora Pública Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Yakeline Contadora - Asesoría Contable Profesional",
    description: "Experta en gestión tributaria, declaración de renta y consultoría financiera en Colombia",
    images: ["/photo2.png"],
    creator: "@yakelinecontadora",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AccountingService",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#organization`,
        "name": "Yakeline Contadora",
        "alternateName": "Yakelin Bustamante - Contadora Pública",
        "description": "Asesoría contable y tributaria profesional para personas naturales y empresas en Colombia. Experta en gestión tributaria, declaración de renta y consultoría financiera.",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com",
        "telephone": "+57-320-726-9417",
        "email": "contacto@yakelinecontadora.com",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "CO",
          "addressLocality": "Colombia"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Colombia"
        },
        "serviceType": [
          "Gestión Tributaria Integral",
          "Revisoría Fiscal y Auditoría",
          "Consultoría Financiera Estratégica",
          "Declaración de Renta Personas Naturales y Jurídicas",
          "Facturación Electrónica DIAN",
          "Contabilidad para Pymes",
          "Asesoría Tributaria",
          "Planeación Fiscal"
        ],
        "founder": {
          "@type": "Person",
          "name": "Yakelin Bustamante",
          "jobTitle": "Contadora Pública"
        },
        "priceRange": "$$",
        "image": "/photo2.png",
        "sameAs": [
          "https://www.instagram.com/yakelinecontadora",
          "https://www.facebook.com/yakelinecontadora",
          "https://www.linkedin.com/in/yakelin-bustamante"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#website`,
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com",
        "name": "Yakeline Contadora",
        "description": "Asesoría contable y tributaria profesional en Colombia",
        "publisher": {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#organization`
        },
        "inLanguage": "es-CO"
      },
      {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#webpage`,
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com",
        "name": "Yakeline Contadora - Asesoría Contable y Tributaria Profesional en Colombia",
        "isPartOf": {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#website`
        },
        "about": {
          "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelinecontadora.com"}/#organization`
        },
        "description": "Experta en asesoría contable y tributaria en Colombia. Gestión tributaria integral, declaración de renta, facturación electrónica y consultoría financiera personalizada.",
        "inLanguage": "es-CO"
      }
    ]
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
