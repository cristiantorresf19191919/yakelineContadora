"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import WorkHistoryRoundedIcon from "@mui/icons-material/WorkHistoryRounded";
import Footer from "../components/Footer/Footer";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);

  useEffect(() => {
    if (isInView) animate();
  }, [isInView, animate]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const trustMetrics = [
  { icon: <WorkHistoryRoundedIcon />, target: 10, suffix: "+", label: "Años de experiencia" },
  { icon: <GroupsRoundedIcon />, target: 500, suffix: "+", label: "Clientes satisfechos" },
  { icon: <VerifiedRoundedIcon />, target: 100, suffix: "%", label: "Cumplimiento DIAN" },
  { icon: <EmojiEventsRoundedIcon />, target: 30, suffix: "%", label: "Ahorro promedio en impuestos" },
];

const timelineItems = [
  {
    title: "El Inicio",
    color: "secondary.main",
    text: "Comencé mi carrera con una convicción clara: la contabilidad no debe ser un dolor de cabeza, sino la brújula que guía el éxito empresarial. Tras años trabajando con grandes firmas, noté que los emprendedores necesitaban más que declaraciones de impuestos; necesitaban educación y estrategia.",
  },
  {
    title: "La Transformación",
    color: "primary.main",
    text: "Decidí fundar mi propia firma para romper el molde tradicional. Integré tecnología, mentoría personalizada y un enfoque humano. No solo gestiono números; entiendo los sueños detrás de ellos.",
  },
  {
    title: "Hoy",
    color: "#1a1a1a",
    text: "Hoy, ayudo a cientos de empresarios a navegar el complejo mundo fiscal con confianza. Autora, conferencista y tu próxima aliada. ¿Estás listo para llevar tu negocio al siguiente nivel?",
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      <Box sx={{ bgcolor: "#fff", overflow: "hidden" }} ref={containerRef}>
        {/* HERO SECTION */}
        <Box sx={{
          minHeight: { xs: "auto", md: "90vh" },
          pt: { xs: 14, md: 0 },
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 60% 50%, #fdfbf7 0%, #fff 60%)"
        }}>
          <Container maxWidth="lg" sx={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            gap: { xs: 4, md: 8 },
            py: { xs: 4, md: 0 }
          }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ flex: 1 }}
            >
              <Typography variant="overline" sx={{ letterSpacing: 4, color: "secondary.main", fontWeight: 700, mb: 2, display: "block", fontSize: "0.8rem" }}>
                QUIEN SOY
              </Typography>
              <Typography variant="h1" sx={{
                fontSize: { xs: "2.5rem", sm: "3.2rem", md: "4rem" },
                fontWeight: 800,
                color: "#1a1a1a",
                lineHeight: 1.15,
                mb: 3,
                letterSpacing: "-0.02em"
              }}>
                Más que una contadora, tu <span style={{ color: "#8B7355" }}>aliada estratégica.</span>
              </Typography>
              <Typography variant="body1" sx={{ fontSize: { xs: "1.05rem", md: "1.2rem" }, color: "text.secondary", maxWidth: 500, mb: 4, lineHeight: 1.85 }}>
                Transformo números complejos en estrategias de crecimiento claras. Mi misión es empoderarte para que tomes el control de tu destino financiero.
              </Typography>
              <Link href="/services" passHref>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                  sx={{
                    borderRadius: 50,
                    px: 5,
                    py: 2,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 20px 40px -10px rgba(93, 63, 211, 0.3)"
                  }}
                >
                  Conoce mis servicios
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ flex: 1, position: "relative", width: "100%" }}
            >
              <Box sx={{
                position: "relative",
                width: "100%",
                height: { xs: 400, sm: 500, md: 600 },
                borderRadius: { xs: "24px", md: "300px 300px 20px 20px" },
                overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.1)"
              }}>
                <Image
                  src="/photo2.png"
                  alt="Yakeline Bustamante"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </Box>
              <Box
                component={motion.div}
                style={{ y: y1 }}
                sx={{
                  position: "absolute",
                  top: 40,
                  right: -20,
                  width: { xs: 80, md: 120 },
                  height: { xs: 80, md: 120 },
                  borderRadius: "50%",
                  background: "#8B7355",
                  zIndex: -1,
                  display: { xs: "none", md: "block" }
                }}
              />
            </motion.div>
          </Container>
        </Box>

        {/* TRUST METRICS */}
        <Box sx={{
          py: { xs: 5, md: 7 },
          background: "linear-gradient(135deg, #F8F5FF 0%, #FAFAFA 100%)",
          borderTop: "1px solid rgba(93, 63, 211, 0.06)",
          borderBottom: "1px solid rgba(93, 63, 211, 0.06)",
        }}>
          <Container maxWidth="lg">
            <Box sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
              gap: { xs: 3, md: 4 },
            }}>
              {trustMetrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <Box sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 1.5,
                      color: "white",
                      boxShadow: "0 8px 20px rgba(93, 63, 211, 0.25)",
                    }}>
                      {metric.icon}
                    </Box>
                    <Typography sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.8rem", md: "2.2rem" },
                      color: "#5D3FD3",
                      lineHeight: 1.2,
                    }}>
                      <AnimatedCounter target={metric.target} suffix={metric.suffix} duration={2000 + i * 300} />
                    </Typography>
                    <Typography sx={{ color: "#6B7280", fontSize: "0.85rem", fontWeight: 500 }}>
                      {metric.label}
                    </Typography>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>

        {/* STORY SECTION */}
        <Container maxWidth="md" sx={{ py: { xs: 8, md: 15 }, position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h2" sx={{ textAlign: "center", mb: { xs: 5, md: 8 }, fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 700 }}>
              Mi Historia
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 4, md: 6 } }}>
              {timelineItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                >
                  <Box sx={{
                    display: "flex",
                    gap: { xs: 2.5, md: 4 },
                    alignItems: "flex-start",
                  }}>
                    {/* Timeline indicator */}
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      pt: 0.5
                    }}>
                      <Box sx={{
                        width: 16,
                        height: 16,
                        bgcolor: item.color,
                        borderRadius: "50%",
                        border: "4px solid #fff",
                        boxShadow: "0 0 0 2px #e0e0e0",
                        flexShrink: 0,
                      }} />
                      {index < timelineItems.length - 1 && (
                        <Box sx={{
                          width: 2,
                          flex: 1,
                          minHeight: 40,
                          bgcolor: "#f0f0f0",
                          mt: 1,
                        }} />
                      )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ pb: { xs: 0, md: 2 } }}>
                      <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 700, fontSize: { xs: "1.3rem", md: "1.6rem" } }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.secondary", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.85 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>

            {/* CTA after story */}
            <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 }, display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/citas" passHref>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthRoundedIcon />}
                  sx={{
                    borderRadius: 50,
                    px: 5,
                    py: 2,
                    fontSize: "1rem",
                    textTransform: "none",
                    boxShadow: "0 20px 40px -10px rgba(93, 63, 211, 0.3)"
                  }}
                >
                  Agendar Consulta
                </Button>
              </Link>
              <Button
                component="a"
                href="https://wa.me/573207269417?text=Hola%20Yakeline,%20me%20gustaría%20conocer%20más%20sobre%20tus%20servicios"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: 50,
                  px: 5,
                  py: 2,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderColor: "rgba(93, 63, 211, 0.3)",
                  color: "#5D3FD3",
                  "&:hover": { borderColor: "#5D3FD3", bgcolor: "rgba(93, 63, 211, 0.04)" },
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
