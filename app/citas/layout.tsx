import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda tu Cita | Yakeline Contadora",
  description:
    "Reserva tu consulta contable y tributaria con Yakeline. Agenda una cita personalizada para declaración de renta, asesoría contable, gestión tributaria y más.",
  keywords:
    "agendar cita contadora, consulta contable, cita tributaria, asesoría contable Medellín, declaración de renta cita",
  openGraph: {
    title: "Agenda tu Cita | Yakeline Contadora",
    description:
      "Reserva tu consulta contable y tributaria personalizada con Yakeline Contadora.",
    type: "website",
  },
};

export default function CitasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
