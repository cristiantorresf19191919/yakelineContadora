"use client";

import { Box, Typography, Container } from "@mui/material";
import Footer from "../components/Footer/Footer";

const sections = [
  {
    title: "1. Servicios Ofrecidos",
    content:
      "Yakeline Bustamante Contadora ofrece servicios de asesoría contable, tributaria, revisoría fiscal, auditoría, planeación financiera y mentoría empresarial. Los servicios específicos, alcance y condiciones se acuerdan individualmente con cada cliente.",
  },
  {
    title: "2. Relación Profesional",
    content:
      "La relación profesional entre Yakeline Bustamante y el cliente se establece formalmente al momento de acordar los términos específicos del servicio. La navegación en este sitio web no constituye una relación profesional contable o de asesoría.",
  },
  {
    title: "3. Responsabilidad del Cliente",
    content:
      "El cliente se compromete a proporcionar información veraz, completa y oportuna para la correcta prestación de los servicios. La exactitud de las declaraciones y documentos depende directamente de la calidad de la información suministrada por el cliente.",
  },
  {
    title: "4. Confidencialidad",
    content:
      "Toda la información compartida durante la prestación de servicios se trata con estricta confidencialidad profesional, conforme al Código de Ética Profesional del Contador Público (Ley 43 de 1990) y la Ley 1581 de 2012.",
  },
  {
    title: "5. Tarifas y Pagos",
    content:
      "Las tarifas se comunican antes de iniciar cualquier servicio. La consulta inicial gratuita no genera compromiso de contratación. Los servicios recurrentes se facturan según lo acordado. Todos los precios están expresados en pesos colombianos (COP).",
  },
  {
    title: "6. Cancelación de Citas",
    content:
      "Las citas pueden cancelarse o reprogramarse con al menos 24 horas de anticipación sin costo alguno. Cancelaciones con menos de 24 horas pueden estar sujetas a un cargo según el tipo de servicio.",
  },
  {
    title: "7. Propiedad Intelectual",
    content:
      "Todo el contenido de este sitio web (textos, imágenes, diseños, logotipos) es propiedad de Yakeline Bustamante o se usa con la debida autorización. Queda prohibida su reproducción sin consentimiento previo por escrito.",
  },
  {
    title: "8. Limitación de Responsabilidad",
    content:
      "La información publicada en este sitio web tiene carácter informativo y educativo. No constituye asesoría contable, tributaria o financiera específica. Para obtener asesoría personalizada, contáctenos directamente.",
  },
  {
    title: "9. Legislación Aplicable",
    content:
      "Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia se resolverá ante los tribunales competentes de la ciudad de residencia de la prestadora del servicio.",
  },
  {
    title: "10. Modificaciones",
    content:
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Las modificaciones entrarán en vigencia al momento de su publicación en este sitio web. Recomendamos revisar esta página periódicamente.",
  },
];

export default function TermsPage() {
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(180deg, #FAFAFA 0%, #FFFFFF 100%)",
          pt: { xs: 14, md: 16 },
          pb: { xs: 6, md: 10 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h1"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "2rem", md: "2.8rem" },
              color: "#1F2937",
              mb: 2,
            }}
          >
            Términos y Condiciones
          </Typography>
          <Typography
            sx={{
              color: "#6B7280",
              fontSize: "0.95rem",
              mb: 5,
              borderBottom: "1px solid #E5E7EB",
              pb: 3,
            }}
          >
            Última actualización: Febrero 2026 — Yakeline Bustamante, Contadora Pública
          </Typography>

          <Typography sx={{ color: "#4B5563", lineHeight: 1.8, mb: 4 }}>
            Al utilizar este sitio web y contratar nuestros servicios, usted
            acepta los siguientes términos y condiciones. Le recomendamos leerlos
            detenidamente.
          </Typography>

          {sections.map((section) => (
            <Box key={section.title} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: "#1F2937",
                  mb: 1.5,
                  fontSize: { xs: "1.1rem", md: "1.25rem" },
                }}
              >
                {section.title}
              </Typography>
              <Typography sx={{ color: "#4B5563", lineHeight: 1.8 }}>
                {section.content}
              </Typography>
            </Box>
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
