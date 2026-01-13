import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Contabilidad y Finanzas",
  description: "Consejos, guías y actualizaciones sobre contabilidad, impuestos y finanzas personales en Colombia. Aprende sobre declaración de renta, gestión tributaria y más.",
  keywords: "blog contabilidad, consejos financieros, declaración de renta, impuestos Colombia, gestión tributaria, finanzas personales",
  openGraph: {
    title: "Blog de Contabilidad y Finanzas | Yakeline Contadora",
    description: "Consejos y guías sobre contabilidad, impuestos y finanzas en Colombia",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Contabilidad | Yakeline Contadora",
    description: "Consejos y guías sobre contabilidad y finanzas",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
