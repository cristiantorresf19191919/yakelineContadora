"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";
import JsonLd from "@/app/components/JsonLd/JsonLd";

const FAQS: { q: string; a: string }[] = [
  {
    q: "¿Debo declarar renta este año?",
    a: "En Colombia debes declarar renta si superas alguno de los topes anuales que fija la DIAN sobre tu patrimonio bruto, ingresos totales, consumos con tarjeta o compras, y consignaciones o movimientos bancarios. Estos valores se actualizan cada año en UVT, por lo que conviene revisar tu caso puntual antes de decidir. Escríbeme y validamos juntos si estás obligado(a).",
  },
  {
    q: "¿Qué documentos necesito para mi declaración?",
    a: "Por lo general necesitas tu RUT actualizado, los certificados de ingresos y retenciones de tus pagadores, los certificados bancarios y de inversiones, y los soportes de las deducciones que quieras aplicar (salud, dependientes, intereses de vivienda o aportes voluntarios, entre otros). Según tu actividad pueden requerirse documentos adicionales, así que te ayudo a armar la lista exacta para tu caso.",
  },
  {
    q: "¿Atienden de forma virtual y en toda Colombia?",
    a: "Sí. Atiendo de forma virtual, por lo que puedo acompañarte estés donde estés en Colombia. Coordinamos por videollamada, WhatsApp y correo para revisar documentos y resolver tus dudas con comodidad.",
  },
  {
    q: "¿Qué es la facturación electrónica y es obligatoria?",
    a: "La facturación electrónica es el sistema de la DIAN para emitir y validar facturas en formato digital. Es obligatoria para quienes son responsables de facturar según la normativa vigente; si tienes dudas sobre si te aplica, lo revisamos y te acompaño en la implementación.",
  },
  {
    q: "¿Qué pasa si no declaro o pago a tiempo?",
    a: "Presentar o pagar fuera de los plazos puede generar sanciones e intereses de mora que cobra la DIAN, y suelen aumentar con el tiempo. Si ya vas tarde, lo mejor es actuar cuanto antes para reducir el impacto; te acompaño a regularizar tu situación de la forma más conveniente.",
  },
  {
    q: "¿Ofrecen planeación tributaria durante todo el año?",
    a: "Sí. La planeación tributaria da mejores resultados cuando se trabaja durante todo el año y no solo en temporada de declaración, porque permite anticipar decisiones y organizar soportes con tiempo. Podemos definir un acompañamiento continuo ajustado a tus necesidades.",
  },
  {
    q: "¿Cómo agendo una asesoría?",
    a: "Puedes escribirme por WhatsApp para coordinar tu asesoría de forma rápida. Juntos definimos el día y la modalidad que mejor te convenga y preparamos lo que necesites revisar.",
  },
  {
    q: "¿Trabajan con personas naturales y empresas?",
    a: "Sí. Trabajo tanto con personas naturales (empleados, independientes y profesionales) como con empresas y emprendimientos. Adapto el acompañamiento al tipo de contribuyente y a tus objetivos.",
  },
];

// Static, author-controlled schema.org FAQPage structured data built from FAQS.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const WHATSAPP_MESSAGE =
  "Hola Yakeline, tengo una pregunta sobre mis impuestos y me gustaría una asesoría. ¿Me puedes ayudar?";

export default function FaqSection() {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? index : false);
    };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Embedded FAQPage structured data (schema.org). Content is static and author-controlled. */}
      <JsonLd data={faqSchema} />

      {/* Decorative background elements */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: -80,
          left: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.06) 0%, transparent 70%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: -60,
          right: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.06) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                mb: 2,
                borderRadius: "var(--r-pill)",
                bgcolor: "rgba(var(--brand-primary-rgb), 0.08)",
                color: "var(--brand-primary)",
              }}
            >
              <HelpOutlineRoundedIcon sx={{ fontSize: 20 }} />
              <Typography
                variant="overline"
                component="span"
                sx={{ fontWeight: 700, letterSpacing: 2, fontSize: "0.8rem", lineHeight: 1 }}
              >
                Resolvemos tus dudas
              </Typography>
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { xs: "1.9rem", sm: "2.3rem", md: "2.8rem" },
                lineHeight: 1.2,
                color: "var(--text)",
                mb: 2,
              }}
            >
              Preguntas frecuentes
            </Typography>
            <Typography
              sx={{
                color: "var(--text-muted)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Respuestas claras sobre declaración de renta, facturación electrónica y asesoría
              contable en Colombia.
            </Typography>
          </Box>

          {/* Accordion list */}
          <Box>
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(i * 0.05, 0.3) }}
              >
                <Accordion
                  expanded={expanded === i}
                  onChange={handleChange(i)}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "var(--surface)",
                    border: "1px solid rgba(var(--brand-primary-rgb), 0.1)",
                    borderRadius: "14px !important",
                    mb: 1.5,
                    overflow: "hidden",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                    "&:before": { display: "none" },
                    "&.Mui-expanded": {
                      borderColor: "rgba(var(--brand-primary-rgb), 0.35)",
                      boxShadow: "var(--shadow-md)",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreRoundedIcon sx={{ color: "var(--brand-primary)" }} />}
                    aria-controls={`faq-content-${i}`}
                    id={`faq-header-${i}`}
                    sx={{
                      px: { xs: 2.5, md: 3 },
                      py: 1,
                      "& .MuiAccordionSummary-content": { my: 1.5 },
                      "&:focus-visible": {
                        outline: "2px solid var(--brand-primary)",
                        outlineOffset: "-2px",
                        borderRadius: "14px",
                      },
                    }}
                  >
                    <Typography
                      component="h3"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "0.98rem", md: "1.1rem" },
                        lineHeight: 1.5,
                        color: "var(--text)",
                        pr: 1,
                      }}
                    >
                      {faq.q}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    id={`faq-content-${i}`}
                    sx={{ px: { xs: 2.5, md: 3 }, pb: 3, pt: 0 }}
                  >
                    <Typography
                      sx={{
                        color: "var(--text-muted)",
                        lineHeight: 1.75,
                        fontSize: { xs: "0.92rem", md: "0.98rem" },
                      }}
                    >
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </motion.div>
            ))}
          </Box>

          {/* Closing CTA */}
          <Box
            sx={{
              mt: { xs: 5, md: 6 },
              textAlign: "center",
              p: { xs: 3, md: 4 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(var(--brand-primary-rgb), 0.06) 0%, rgba(var(--brand-accent-rgb), 0.06) 100%)",
              border: "1px solid rgba(var(--brand-primary-rgb), 0.1)",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", md: "1.5rem" },
                color: "var(--text)",
                mb: 1,
              }}
            >
              ¿Tienes otra pregunta? Escríbeme
            </Typography>
            <Typography
              sx={{
                color: "var(--text-subtle)",
                fontSize: { xs: "0.95rem", md: "1rem" },
                maxWidth: 460,
                mx: "auto",
                mb: 3,
                lineHeight: 1.6,
              }}
            >
              Cuéntame tu caso y te respondo de forma personalizada, sin compromiso.
            </Typography>
            <Button
              component="a"
              href={`https://wa.me/573207269417?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderRadius: "var(--r-pill)",
                px: 4.5,
                py: 1.6,
                fontSize: "1rem",
                fontWeight: 700,
                textTransform: "none",
                background:
                  "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-strong) 100%)",
                boxShadow: "0 12px 30px rgba(var(--brand-primary-rgb), 0.3)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 100%)",
                  boxShadow: "0 16px 40px rgba(var(--brand-primary-rgb), 0.4)",
                },
              }}
            >
              Escribir por WhatsApp
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
