import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quién Soy - Yakelin Bustamante",
  description: "Conoce a Yakelin Bustamante, contadora y asesora financiera especializada en ayudar a empresarios a optimizar sus finanzas y cumplir con sus obligaciones tributarias en Colombia.",
  keywords: "Yakelin Bustamante, contadora, asesora financiera, contador Colombia, experiencia contable",
  openGraph: {
    title: "Quién Soy | Yakeline Contadora",
    description: "Conoce a Yakelin Bustamante, tu aliada estratégica en contabilidad y finanzas",
    type: "profile",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
