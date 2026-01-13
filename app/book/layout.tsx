import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Libro - Domina Tu Dinero | Yakeline Contadora",
  description: "El manual que cambiará tu relación con el dinero. Guía honesta para emprendedores que quieren construir riqueza real. Descarga el capítulo 1 gratis.",
  keywords: "libro finanzas, libro contabilidad, finanzas personales, emprendimiento, riqueza",
  openGraph: {
    title: "Libro: Domina Tu Dinero | Yakeline Contadora",
    description: "El manual que cambiará tu relación con el dinero",
    type: "book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
