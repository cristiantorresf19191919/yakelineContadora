"use client";

import { useState } from "react";
import { Box, Typography, Container, Button, Grid, Paper, Collapse, Accordion, AccordionSummary, AccordionDetails, Chip } from "@mui/material";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Link from "next/link";
import Footer from "../components/Footer/Footer";
import JsonLd from "@/app/components/JsonLd/JsonLd";
import ServicePackages from "../components/ServicePackages/ServicePackages";

const services = [
  {
    title: "Gestión Tributaria Integral",
    description: "Despreocúpate de los impuestos. Optimizamos tu carga tributaria cumpliendo rigurosamente con la ley.",
    icon: <GavelIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#7C3AED",
    popular: true,
    details: [
      "Presentación de declaraciones de renta, IVA, retención en la fuente e ICA",
      "Planeación fiscal para minimizar tu carga tributaria legalmente",
      "Respuesta a requerimientos y procesos con la DIAN",
      "Certificaciones tributarias y reportes de información exógena",
      "Asesoría permanente en cambios normativos fiscales",
    ],
    benefit: "Ahorra hasta un 30% en impuestos con una estrategia fiscal bien diseñada.",
  },
  {
    title: "Revisoría Fiscal y Auditoría",
    description: "Garantiza la transparencia y confiabilidad de tu información financiera con procesos rigurosos.",
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#DB2777",
    details: [
      "Auditoría integral de estados financieros",
      "Evaluación del sistema de control interno",
      "Detección y prevención de riesgos financieros",
      "Informes de revisoría fiscal según normativa colombiana",
      "Dictamen sobre estados financieros con estándares NIIF",
    ],
    benefit: "Protege tu empresa con información financiera confiable y transparente.",
    popular: false,
  },
  {
    title: "Consultoría Financiera Estratégica",
    description: "No solo registramos el pasado, diseñamos el futuro de tu negocio con datos y estrategia.",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#F59E0B",
    details: [
      "Análisis de rentabilidad y márgenes por línea de negocio",
      "Proyecciones de flujo de caja y presupuestos",
      "Estructuración de costos y punto de equilibrio",
      "Diagnóstico financiero integral con recomendaciones",
      "Acompañamiento en toma de decisiones de inversión",
    ],
    benefit: "Toma decisiones inteligentes basadas en datos reales de tu negocio.",
    popular: false,
  },
];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yakelincontadora.com";

const faqItems: { q: string; a: string }[] = [
  {
    q: "¿Cómo funciona la primera consulta gratuita?",
    a: "Agendamos una llamada de 15 minutos por WhatsApp o videollamada donde analizo rápidamente tu situación fiscal, identifico oportunidades de mejora y te doy un plan de acción claro.",
  },
  {
    q: "¿Trabajan con emprendedores pequeños o solo empresas grandes?",
    a: "Trabajamos con emprendedores de todos los tamaños. Desde profesionales independientes hasta pymes con equipos de más de 50 personas. Cada plan se adapta a tu realidad.",
  },
  {
    q: "¿Cuánto tiempo toma ver resultados en mi carga tributaria?",
    a: "Desde la primera sesión identificamos oportunidades inmediatas. La planeación fiscal completa se implementa en 2-4 semanas, y los ahorros se reflejan en tu siguiente declaración.",
  },
  {
    q: "¿Pueden ayudarme si tengo problemas con la DIAN?",
    a: "Sí, tenemos amplia experiencia en respuesta a requerimientos, procesos de fiscalización y resolución de sanciones con la DIAN. Te acompañamos en todo el proceso.",
  },
  {
    q: "¿Los servicios son presenciales o virtuales?",
    a: "Ofrecemos ambas modalidades. La mayoría de nuestros clientes trabajan de forma virtual, lo que permite atender empresarios en todo Colombia. Para casos especiales, también hay opción presencial en Medellín.",
  },
];

const servicesListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Yakeline Contadora",
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      areaServed: { "@type": "Country", name: "Colombia" },
      provider: {
        "@type": "AccountingService",
        name: "Yakeline Contadora",
        "@id": `${SITE_URL}/#organization`,
      },
    },
  })),
};

const servicesBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Servicios",
      item: `${SITE_URL}/services`,
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export default function ServicesPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <JsonLd data={servicesListSchema} />
      <JsonLd data={servicesBreadcrumbSchema} />
      <JsonLd data={faqSchema} />
      {/* HEADER SECTION */}
      <Box sx={{
        pt: { xs: 16, md: 20 },
        pb: { xs: 6, md: 10 },
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden"
      }}>
        <Box sx={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.05) 0%, rgba(var(--brand-primary-rgb), 0) 70%)" }} />

        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3, fontSize: "0.85rem" }}>
              SERVICIOS PROFESIONALES
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" }, fontWeight: 900, mb: 3, mt: 1, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
              Tranquilidad Fiscal y <br/>
              <span style={{ background: "var(--brand-gradient)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Crecimiento Financiero
              </span>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: { xs: "1.05rem", md: "1.25rem" }, color: "text.secondary", maxWidth: 700, mx: "auto", mb: 6, lineHeight: 1.8 }}>
              Soluciones contables diseñadas para empresarios que valoran su tiempo y buscan resultados. Deja los números en manos expertas.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      {/* CARDS SECTION */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: "var(--bg)" }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {services.map((service, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <Grid item xs={12} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ height: "100%" }}
                  >
                    <Paper sx={{
                      p: { xs: 3, md: 4 },
                      borderRadius: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      position: "relative",
                      overflow: "hidden",
                      boxShadow: isExpanded
                        ? "var(--shadow-lg)"
                        : "var(--shadow-md)",
                      border: isExpanded
                        ? "2px solid rgba(var(--brand-primary-rgb), 0.18)"
                        : service.popular ? "2px solid rgba(var(--brand-primary-rgb), 0.18)" : "1px solid var(--border)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "var(--shadow-lg)",
                      }
                    }}>
                      {service.popular && (
                        <Chip
                          icon={<StarRoundedIcon sx={{ fontSize: 16 }} />}
                          label="Más Solicitado"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            background: "var(--brand-gradient)",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.7rem",
                            "& .MuiChip-icon": { color: "white" },
                          }}
                        />
                      )}
                      <Box sx={{
                        width: { xs: 64, md: 80 },
                        height: { xs: 64, md: 80 },
                        borderRadius: "28%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--brand-gradient)",
                        boxShadow: "0 8px 20px rgba(var(--brand-primary-rgb), 0.2)",
                        mb: 3
                      }}>
                        {service.icon}
                      </Box>
                      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5, fontSize: { xs: "1.3rem", md: "1.5rem" }, lineHeight: 1.3 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.75, mb: 3, fontSize: { xs: "0.95rem", md: "1rem" } }}>
                        {service.description}
                      </Typography>

                      {/* Expand/Collapse Button */}
                      <Button
                        onClick={() => toggleExpand(index)}
                        aria-expanded={isExpanded}
                        aria-controls={`service-details-${index}`}
                        endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                          color: "var(--brand-primary)",
                          fontWeight: 700,
                          p: 0,
                          mb: 1,
                          fontSize: "0.95rem",
                          "&:hover": { bgcolor: "transparent", opacity: 0.8 }
                        }}
                      >
                        {isExpanded ? "Ver menos" : "Ver detalles"}
                      </Button>

                      {/* Expandable Details */}
                      <Collapse in={isExpanded} timeout={400}>
                        <Box id={`service-details-${index}`} sx={{ mt: 2, pt: 2, borderTop: "1px solid rgba(var(--brand-primary-rgb), 0.08)" }}>
                          {service.details.map((detail, i) => (
                            <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5, mb: 1.5 }}>
                              <CheckCircleOutlineIcon sx={{ color: "var(--brand-primary)", fontSize: 20, mt: 0.3, flexShrink: 0 }} />
                              <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                {detail}
                              </Typography>
                            </Box>
                          ))}
                          <Box sx={{
                            mt: 3,
                            p: 2,
                            borderRadius: 2,
                            bgcolor: "rgba(var(--brand-primary-rgb), 0.05)",
                            border: "1px solid rgba(var(--brand-primary-rgb), 0.08)"
                          }}>
                            <Typography variant="body2" sx={{ color: "var(--brand-primary)", fontWeight: 600, lineHeight: 1.6 }}>
                              {service.benefit}
                            </Typography>
                          </Box>
                        </Box>
                      </Collapse>

                      {/* WhatsApp CTA at bottom */}
                      <Box sx={{ mt: "auto", pt: 2, width: "100%" }}>
                        <Button
                          component="a"
                          href={`https://wa.me/573207269417?text=${encodeURIComponent(`Hola Yakeline, me interesa el servicio de ${service.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          startIcon={<WhatsAppIcon />}
                          variant="outlined"
                          fullWidth
                          sx={{
                            borderColor: "rgba(var(--brand-primary-rgb), 0.25)",
                            color: "var(--brand-primary)",
                            fontWeight: 600,
                            borderRadius: 3,
                            py: 1.2,
                            "&:hover": {
                              bgcolor: "rgba(var(--brand-primary-rgb), 0.05)",
                              borderColor: "var(--brand-primary)",
                            }
                          }}
                        >
                          Consultar
                        </Button>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* SERVICE PACKAGES / PRICING */}
      <ServicePackages />

      {/* FAQ SECTION */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "var(--bg)" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3, textAlign: "center", display: "block", mb: 1 }}>
              PREGUNTAS FRECUENTES
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 5, textAlign: "center", fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.3 }}>
              Todo lo que necesitas saber
            </Typography>
            {faqItems.map((faq, i) => (
              <Accordion
                key={i}
                disableGutters
                elevation={0}
                sx={{
                  bgcolor: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--r-sm) !important",
                  mb: 1.5,
                  "&:before": { display: "none" },
                  overflow: "hidden",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: "primary.main" }} />}
                  sx={{
                    px: 3,
                    py: 1,
                    "& .MuiAccordionSummary-content": { my: 1.5 },
                  }}
                >
                  <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.5 }}>
                    {faq.q}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                  <Typography sx={{ color: "text.secondary", lineHeight: 1.75, fontSize: "0.95rem" }}>
                    {faq.a}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </motion.div>
        </Container>
      </Box>

      {/* CTA SECTION */}
      <Box sx={{ py: { xs: 10, md: 15 }, bgcolor: "#111", color: "white", textAlign: "center" }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3, fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.3 }}>
              ¿Listo para ordenar tu negocio?
            </Typography>
            <Typography sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, opacity: 0.7, mb: 2, lineHeight: 1.7, maxWidth: 550, mx: "auto" }}>
              Agenda una consulta inicial gratuita y descubre cómo podemos optimizar tus impuestos hoy mismo.
            </Typography>
            <Typography sx={{ fontSize: "0.9rem", opacity: 0.5, mb: 5 }}>
              Primera asesoría sin costo - Sin compromiso
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/citas" passHref>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthRoundedIcon />}
                  sx={{
                    bgcolor: "white",
                    color: "black",
                    borderRadius: 50,
                    px: { xs: 4, md: 5 },
                    py: 2,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    fontWeight: 700,
                    "&:hover": { bgcolor: "#f0f0f0" }
                  }}
                >
                  Agendar Cita
                </Button>
              </Link>
              <Button
                component="a"
                href="https://wa.me/573207269417?text=Hola%20Yakeline,%20quiero%20agendar%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.3)",
                  borderRadius: 50,
                  px: { xs: 4, md: 5 },
                  py: 2,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                  fontWeight: 700,
                  "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.06)" }
                }}
              >
                WhatsApp
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
