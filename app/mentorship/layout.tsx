import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentorías para Contadores y Empresarios",
  description: "Programa de mentoría 1 a 1 para contadores y empresarios que quieren facturar más y trabajar mejor. Desbloquea el potencial real de tu negocio con estrategias probadas.",
  keywords: "mentoría contadores, mentoría empresarios, coaching financiero, programa mentoría, crecimiento empresarial",
  openGraph: {
    title: "Mentorías | Yakeline Contadora",
    description: "Programa exclusivo de mentoría 1 a 1 para contadores y empresarios",
    type: "website",
  },
};

export default function MentorshipLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
