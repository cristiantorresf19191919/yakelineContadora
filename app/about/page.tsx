"use client";

import { Box, Typography, Container, Button } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "../components/Footer/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp/FloatingWhatsApp";
import { useRef } from "react";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <>
      <Box sx={{ bgcolor: "#fff", overflow: "hidden" }} ref={containerRef}>
        {/* HERO SECTION */}
        <Box sx={{ 
            height: "90vh", 
            position: "relative", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            background: "radial-gradient(circle at 60% 50%, #fdfbf7 0%, #fff 60%)" 
        }}>
            <Box sx={{
                position: "absolute",
                top: 0, 
                left: 0,
                width: "100%",
                height: "100%", 
                opacity: 0.4,
                backgroundImage: "url('/noise.png')", // Assuming noise texture exists or just ignore
                pointerEvents: "none"
            }} />
            
            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: { xs: "column-reverse", md: "row" }, alignItems: "center", gap: 8 }}>
                 <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ flex: 1 }}
                 >
                     <Typography variant="overline" sx={{ letterSpacing: 4, color: "secondary.main", fontWeight: 700, mb: 2, display: "block" }}>
                         QUIEN SOY
                     </Typography>
                     <Typography variant="h1" sx={{ 
                         fontSize: { xs: "3rem", md: "4.5rem" }, 
                         fontWeight: 800, 
                         color: "#1a1a1a", 
                         lineHeight: 1.1, 
                         mb: 3 
                     }}>
                         Más que una contadora, tu <span style={{ color: "#8B7355" }}>aliada estratégica.</span>
                     </Typography>
                     <Typography variant="body1" sx={{ fontSize: "1.2rem", color: "text.secondary", maxWidth: 500, mb: 4, lineHeight: 1.8 }}>
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
                    initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ flex: 1, position: "relative", height: 600, width: "100%" }}
                 >
                     <Box sx={{ position: "relative", width: "100%", height: "100%", borderRadius: "300px 300px 20px 20px", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.1)" }}>
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
                            width: 120, 
                            height: 120, 
                            borderRadius: "50%", 
                            background: "#8B7355", 
                            zIndex: -1 
                        }} 
                     />
                 </motion.div>
            </Container>
        </Box>

        {/* STORY SECTION */}
        <Container maxWidth="md" sx={{ py: 15, position: "relative" }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="h2" sx={{ textAlign: "center", mb: 8, fontSize: "3rem", fontWeight: 700 }}>
                    Mi Historia
                </Typography>

                <Box sx={{ borderLeft: "2px solid #f0f0f0", pl: { xs: 3, md: 8 }, ml: { xs: 2, md: 0 } }}>
                    <Box sx={{ mb: 8, position: "relative" }}>
                        <Box sx={{ position: "absolute", left: { xs: -33, md: -72 }, top: 0, width: 14, height: 14, bgcolor: "secondary.main", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 0 2px #f0f0f0" }} />
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>El Inicio</Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", lineHeight: 1.8 }}>
                            Comencé mi carrera con una convicción clara: la contabilidad no debe ser un dolor de cabeza, sino la brújula que guía el éxito empresarial. Tras años trabajando con grandes firmas, noté que los emprendedores necesitaban más que declaraciones de impuestos; necesitaban educación y estrategia.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 8, position: "relative" }}>
                        <Box sx={{ position: "absolute", left: { xs: -33, md: -72 }, top: 0, width: 14, height: 14, bgcolor: "primary.main", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 0 2px #f0f0f0" }} />
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>La Transformación</Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", lineHeight: 1.8 }}>
                            Decidí fundar mi propia firma para romper el molde tradicional. Integré tecnología, mentoría personalizada y un enfoque humano. No solo gestiono números; entiendo los sueños detrás de ellos.
                        </Typography>
                    </Box>

                    <Box sx={{ position: "relative" }}>
                         <Box sx={{ position: "absolute", left: { xs: -33, md: -72 }, top: 0, width: 14, height: 14, bgcolor: "#1a1a1a", borderRadius: "50%", border: "4px solid #fff", boxShadow: "0 0 0 2px #f0f0f0" }} />
                        <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>Hoy</Typography>
                        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem", lineHeight: 1.8 }}>
                            Hoy, ayudo a cientos de empresarios a navegar el complejo mundo fiscal con confianza. Autora, conferencista y tu próxima aliada. ¿Estás listo para llevar tu negocio al siguiente nivel?
                        </Typography>
                        <Box sx={{ mt: 4 }}>
                            <Image src="/firma_placeholder.png" width={200} height={80} alt="Firma" style={{ opacity: 0.6 }} /> 
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </Container>
      </Box>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
