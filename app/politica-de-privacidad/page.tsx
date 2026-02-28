"use client";

import { Box, Typography, Container } from "@mui/material";
import Footer from "../components/Footer/Footer";

const sections = [
  {
    title: "1. Información que Recopilamos",
    content:
      "Recopilamos información personal que usted nos proporciona voluntariamente, incluyendo: nombre, correo electrónico, número de teléfono, y datos financieros compartidos durante consultas. También recopilamos datos de navegación de forma automática (cookies, dirección IP, tipo de navegador) para mejorar nuestro servicio.",
  },
  {
    title: "2. Uso de la Información",
    content:
      "Utilizamos su información para: prestar servicios contables y tributarios, enviar comunicaciones sobre nuestros servicios (solo si usted se ha suscrito), mejorar la experiencia de usuario en nuestro sitio web, y cumplir con obligaciones legales y regulatorias.",
  },
  {
    title: "3. Protección de Datos",
    content:
      "Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal. Toda la información financiera compartida durante consultas se trata con estricta confidencialidad profesional conforme a la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia).",
  },
  {
    title: "4. Compartir Información",
    content:
      "No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para prestar nuestros servicios (por ejemplo, presentar declaraciones ante la DIAN) o cuando la ley lo exija.",
  },
  {
    title: "5. Cookies y Tecnologías Similares",
    content:
      "Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario, recordar preferencias y analizar el tráfico web. Usted puede configurar su navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.",
  },
  {
    title: "6. Derechos del Usuario",
    content:
      "Conforme a la Ley 1581 de 2012, usted tiene derecho a: conocer, actualizar y rectificar sus datos personales; solicitar prueba de la autorización otorgada; ser informado sobre el uso de sus datos; presentar quejas ante la Superintendencia de Industria y Comercio; revocar la autorización y/o solicitar la supresión de sus datos.",
  },
  {
    title: "7. Retención de Datos",
    content:
      "Conservamos su información personal mientras sea necesario para cumplir con los fines para los cuales fue recopilada, incluyendo obligaciones legales de retención documental contable (mínimo 10 años conforme al Código de Comercio).",
  },
  {
    title: "8. Contacto",
    content:
      "Para ejercer sus derechos o resolver dudas sobre esta política, puede contactarnos a través de WhatsApp al +57 320 726 9417 o visitando nuestras oficinas.",
  },
];

export default function PrivacyPolicyPage() {
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
            Política de Privacidad
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
            En Yakeline Bustamante Contadora nos comprometemos a proteger la
            privacidad y seguridad de la información personal de nuestros
            clientes y visitantes. Esta política describe cómo recopilamos,
            usamos y protegemos su información.
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
