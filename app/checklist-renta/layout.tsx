import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checklist Declaración de Renta 2025 (PDF Gratis)",
  description:
    "Descarga gratis el checklist con los 24 documentos que necesitas para tu declaración de renta 2025 en Colombia: RUT, patrimonio, ingresos, deducciones y más. Versión PDF e interactiva.",
  keywords:
    "checklist declaración de renta 2025, documentos declaración de renta Colombia, requisitos declaración renta DIAN, lista documentos renta, checklist PDF gratis contadora",
  openGraph: {
    title: "Checklist Declaración de Renta 2025 — PDF Gratis",
    description:
      "Los 24 documentos que tu contadora necesita para tu declaración de renta 2025, organizados en 5 categorías. Descárgalo gratis o úsalo en línea.",
    type: "website",
  },
};

export default function ChecklistRentaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
