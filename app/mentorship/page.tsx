"use client";

import { useState } from "react";
import { Box, Typography, Container, Button, Grid, Avatar, Collapse, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Footer from "../components/Footer/Footer";

const modules = [
  {
    title: "Diagnóstico Profundo",
    description: "Análisis exhaustivo de tu situación financiera actual, identificando fortalezas, debilidades y oportunidades inmediatas de mejora.",
    duration: "2 sesiones",
    items: ["Mapeo financiero completo", "Identificación de fugas de dinero", "Evaluación de estructura tributaria actual"],
  },
  {
    title: "Estructura Fiscal",
    description: "Diseño de una estructura fiscal óptima adaptada a tu tipo de negocio y objetivos de crecimiento.",
    duration: "3 sesiones",
    items: ["Planeación tributaria personalizada", "Optimización de régimen fiscal", "Estrategias legales de ahorro tributario"],
  },
  {
    title: "Pricing y Rentabilidad",
    description: "Aprende a fijar precios que reflejen tu valor real y maximicen la rentabilidad de cada servicio o producto.",
    duration: "2 sesiones",
    items: ["Análisis de costos y márgenes", "Estrategias de pricing basadas en valor", "Punto de equilibrio y proyecciones"],
  },
  {
    title: "Automatización",
    description: "Implementa herramientas y procesos que te ahorren horas de trabajo manual en contabilidad y finanzas.",
    duration: "2 sesiones",
    items: ["Herramientas de facturación electrónica", "Tableros de control financiero", "Procesos contables automatizados"],
  },
];

const testimonials = [
  {
    quote: "La claridad que obtuve en solo 3 sesiones valió más que un año de intentar descifrarlo sola. Yakeline tiene una visión comercial que pocos contadores tienen.",
    name: "Camila R.",
    role: "Dueña de Agencia de Marketing",
    initial: "C",
    stars: 5,
  },
  {
    quote: "Gracias a la mentoría, logré estructurar mis finanzas de tal forma que este año pagaré 40% menos en impuestos, todo de manera legal. Una inversión que se pagó sola.",
    name: "Andrés M.",
    role: "Empresario de E-commerce",
    initial: "A",
    stars: 5,
  },
];

export default function MentorshipPage() {
  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  const toggleModule = (index: number) => {
    setExpandedModule(expandedModule === index ? null : index);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#050505", minHeight: "100vh", color: "white", overflowX: "hidden" }}>

        {/* HERO */}
        <Container maxWidth="lg" sx={{ pt: { xs: 16, md: 20 }, pb: { xs: 10, md: 15 }, position: "relative" }}>
          {/* Glow effect */}
          <Box sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            height: "400px",
            background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(0,0,0,0) 70%)",
            filter: "blur(60px)",
            pointerEvents: "none"
          }} />

          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Box sx={{ display: "inline-block", px: 2.5, py: 1, border: "1px solid #D4AF37", borderRadius: 50, mb: 3 }}>
                  <Typography variant="caption" sx={{ color: "#D4AF37", fontWeight: 700, letterSpacing: 1.5, fontSize: "0.75rem" }}>
                    PROGRAMA EXCLUSIVO 1 A 1
                  </Typography>
                </Box>
                <Typography variant="h1" sx={{
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  fontWeight: 800,
                  lineHeight: 1.1,
                  mb: 3,
                  letterSpacing: "-0.02em"
                }}>
                  Desbloquea el <br />
                  <span style={{ color: "#D4AF37" }}>Potencial Real</span> <br/>
                  de tu Negocio.
                </Typography>
                <Typography variant="body1" sx={{ color: "#a0a0a0", fontSize: { xs: "1.05rem", md: "1.2rem" }, maxWidth: 550, mb: 5, lineHeight: 1.8 }}>
                  No necesitas más teoría. Necesitas una estrategia probada. Una mentoría intensiva para contadores y empresarios que quieren facturar más y trabajar mejor.
                </Typography>
                <Button
                  component="a"
                  href="https://wa.me/573207269417?text=Hola%20Yakeline,%20quiero%20aplicar%20al%20programa%20de%20mentoría"
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  size="large"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    bgcolor: "#D4AF37",
                    color: "#000",
                    fontWeight: 800,
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    borderRadius: 2,
                    px: 5,
                    py: 2,
                    "&:hover": { bgcolor: "#b5952f" }
                  }}
                >
                  Aplicar al Programa
                </Button>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={5}>
              {/* Modules Overview with Expand */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Box sx={{
                  background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)",
                  borderRadius: 4,
                  border: "1px solid #222",
                  overflow: "hidden"
                }}>
                  <Box sx={{ p: { xs: 3, md: 4 } }}>
                    <Typography variant="h6" sx={{ color: "#D4AF37", mb: 0.5, fontWeight: 700 }}>
                      Módulos del Programa
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
                      9 sesiones personalizadas
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      {modules.map((mod, i) => {
                        const isExpanded = expandedModule === i;
                        return (
                          <Box key={i}>
                            <Box
                              onClick={() => toggleModule(i)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 2,
                                p: 2,
                                bgcolor: isExpanded ? "rgba(212, 175, 55, 0.08)" : "rgba(255,255,255,0.03)",
                                borderRadius: 2,
                                cursor: "pointer",
                                border: isExpanded ? "1px solid rgba(212, 175, 55, 0.2)" : "1px solid transparent",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                  bgcolor: "rgba(212, 175, 55, 0.06)",
                                }
                              }}
                            >
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
                                <CheckCircleIcon sx={{ color: "#D4AF37", fontSize: 22 }} />
                                <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>{mod.title}</Typography>
                              </Box>
                              {isExpanded ? (
                                <ExpandLessIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                              ) : (
                                <ExpandMoreIcon sx={{ color: "#666", fontSize: 20 }} />
                              )}
                            </Box>
                            <Collapse in={isExpanded} timeout={300}>
                              <Box sx={{ px: 2, pb: 2, pt: 1 }}>
                                <Typography variant="body2" sx={{ color: "#999", mb: 2, lineHeight: 1.7 }}>
                                  {mod.description}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                                  <AccessTimeIcon sx={{ color: "#D4AF37", fontSize: 16 }} />
                                  <Typography variant="caption" sx={{ color: "#D4AF37", fontWeight: 600 }}>
                                    {mod.duration}
                                  </Typography>
                                </Box>
                                {mod.items.map((item, j) => (
                                  <Box key={j} sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 0.8 }}>
                                    <Box sx={{ width: 4, height: 4, borderRadius: "50%", bgcolor: "#D4AF37", mt: 1, flexShrink: 0 }} />
                                    <Typography variant="body2" sx={{ color: "#888", fontSize: "0.85rem", lineHeight: 1.5 }}>
                                      {item}
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            </Collapse>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>

        {/* TESTIMONIALS */}
        <Box sx={{ py: { xs: 10, md: 15 }, borderTop: "1px solid #1a1a1a" }}>
          <Container maxWidth="md" sx={{ textAlign: "center" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" sx={{ color: "#D4AF37", letterSpacing: 3, fontWeight: 600 }}>
                TESTIMONIOS
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 6, mt: 1, fontSize: { xs: "1.8rem", md: "2.5rem" }, lineHeight: 1.3 }}>
                Lo que dicen mis mentorados
              </Typography>
            </motion.div>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              {testimonials.map((testimonial, i) => (
                <Grid item xs={12} md={6} key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                  >
                    <Box sx={{
                      p: { xs: 3, md: 4 },
                      bgcolor: "#111",
                      borderRadius: 3,
                      textAlign: "left",
                      border: "1px solid #1a1a1a",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "border-color 0.3s ease",
                      "&:hover": {
                        borderColor: "#333",
                      }
                    }}>
                      <Box sx={{ display: "flex", gap: 0.5, mb: 2.5 }}>
                        {Array.from({ length: testimonial.stars }).map((_, s) => (
                          <StarIcon key={s} sx={{ color: "#D4AF37", fontSize: 18 }} />
                        ))}
                      </Box>
                      <Typography sx={{ color: "#ccc", mb: 3, fontStyle: "italic", lineHeight: 1.8, flex: 1, fontSize: { xs: "0.95rem", md: "1rem" } }}>
                        &quot;{testimonial.quote}&quot;
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, pt: 2, borderTop: "1px solid #1a1a1a" }}>
                        <Avatar sx={{ bgcolor: "#D4AF3720", color: "#D4AF37", fontWeight: 700 }}>{testimonial.initial}</Avatar>
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.3 }}>{testimonial.name}</Typography>
                          <Typography variant="caption" sx={{ color: "#666" }}>{testimonial.role}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* FAQ SECTION */}
        <Box sx={{ py: { xs: 8, md: 12 }, borderTop: "1px solid #1a1a1a" }}>
          <Container maxWidth="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="overline" sx={{ color: "#D4AF37", letterSpacing: 3, fontWeight: 600, textAlign: "center", display: "block", mb: 1 }}>
                PREGUNTAS FRECUENTES
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 5, textAlign: "center", fontSize: { xs: "1.6rem", md: "2.2rem" }, lineHeight: 1.3 }}>
                Sobre el programa
              </Typography>
              {[
                {
                  q: "¿Para quién es esta mentoría?",
                  a: "Para contadores independientes, empresarios y profesionales que quieren estructurar mejor sus finanzas, optimizar sus impuestos y escalar sus ingresos con una guía personalizada."
                },
                {
                  q: "¿Cuánto dura el programa completo?",
                  a: "El programa consta de 9 sesiones distribuidas a lo largo de 8-10 semanas, dependiendo de tu ritmo. Cada sesión dura entre 60 y 90 minutos."
                },
                {
                  q: "¿Las sesiones son virtuales o presenciales?",
                  a: "Todas las sesiones son virtuales por videollamada, lo que permite atender mentorados en cualquier ciudad de Colombia y el mundo."
                },
                {
                  q: "¿Qué resultados puedo esperar?",
                  a: "Los mentorados típicamente logran ahorros tributarios del 20-40%, mejor estructura de precios, claridad financiera total y herramientas para tomar decisiones basadas en datos."
                },
              ].map((faq, i) => (
                <Accordion
                  key={i}
                  disableGutters
                  elevation={0}
                  sx={{
                    bgcolor: "#111",
                    border: "1px solid #222",
                    borderRadius: "12px !important",
                    mb: 1.5,
                    "&:before": { display: "none" },
                    overflow: "hidden",
                    color: "white",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#D4AF37" }} />}
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
                    <Typography sx={{ color: "#999", lineHeight: 1.75, fontSize: "0.95rem" }}>
                      {faq.a}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </motion.div>
          </Container>
        </Box>

        {/* BOTTOM CTA */}
        <Box sx={{ py: { xs: 8, md: 12 }, textAlign: "center", borderTop: "1px solid #1a1a1a" }}>
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.3 }}>
                ¿Lista para transformar tu negocio?
              </Typography>
              <Typography sx={{ color: "#666", mb: 4, lineHeight: 1.7 }}>
                Cupos limitados. Aplica hoy y agenda tu llamada de diagnóstico gratuita.
              </Typography>
              <Button
                component="a"
                href="https://wa.me/573207269417?text=Hola%20Yakeline,%20quiero%20aplicar%20al%20programa%20de%20mentoría"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  bgcolor: "#D4AF37",
                  color: "#000",
                  fontWeight: 800,
                  fontSize: "1rem",
                  borderRadius: 2,
                  px: 5,
                  py: 2,
                  "&:hover": { bgcolor: "#b5952f" }
                }}
              >
                Aplicar Ahora
              </Button>
            </motion.div>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
