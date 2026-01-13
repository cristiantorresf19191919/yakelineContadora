"use client";

import { Box, Typography, Container, Button, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import GavelIcon from "@mui/icons-material/Gavel";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Link from "next/link";
import Footer from "../components/Footer/Footer";

const services = [
  {
    title: "Gestión Tributaria Integral",
    description: "Despreocúpate de los impuestos. Optimizamos tu carga tributaria cumpliendo rigurosamente con la ley. Presentación de declaraciones, planeación fiscal y respuesta a requerimientos.",
    icon: <GavelIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#7C3AED" // Violet
  },
  {
    title: "Revisoría Fiscal y Auditoría",
    description: "Garantiza la transparencia y confiabilidad de tu información financiera. Auditamos tus procesos para detectar riesgos y fortalecer el control interno de tu compañía.",
    icon: <AccountBalanceIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#DB2777" // Pink
  },
  {
    title: "Consultoría Financiera Estratégica",
    description: "No solo registramos el pasado, diseñamos el futuro. Análisis de rentabilidad, flujo de caja y proyecciones para tomar decisiones de negocio inteligentes.",
    icon: <TrendingUpIcon sx={{ fontSize: 40, color: "white" }} />,
    color: "#F59E0B" // Amber
  }
];

export default function ServicesPage() {
  return (
    <>
      {/* HEADER SECTION */}
      <Box sx={{ 
        pt: 20, 
        pb: 10, 
        background: "linear-gradient(135deg, #f3f4f6 0%, #fff 100%)",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Abstract Background Shapes */}
        <Box sx={{ position: "absolute", top: -100, right: -100, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(255,255,255,0) 70%)" }} />
        
        <Container maxWidth="lg" sx={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <Typography variant="overline" sx={{ color: "primary.main", fontWeight: 700, letterSpacing: 3 }}>
                    SERVICIOS PROFESIONALES
                </Typography>
                <Typography variant="h1" sx={{ fontSize: { xs: "2.5rem", md: "4rem" }, fontWeight: 900, mb: 3, mt: 1, letterSpacing: "-0.02em" }}>
                    Tranquilidad Fiscal y <br/>
                    <span style={{ background: "linear-gradient(90deg, #7C3AED 0%, #DB2777 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        Crecimiento Financiero
                    </span>
                </Typography>
                <Typography variant="body1" sx={{ fontSize: "1.25rem", color: "text.secondary", maxWidth: 700, mx: "auto", mb: 6 }}>
                    Soluciones contables diseñadas para empresarios que valoran su tiempo y buscan resultados. Deja los números en manos expertas.
                </Typography>
            </motion.div>
        </Container>
      </Box>

      {/* CARDS SECTION */}
      <Box sx={{ py: 10, bgcolor: "#fff" }}>
        <Container maxWidth="lg">
            <Grid container spacing={4}>
                {services.map((service, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Paper sx={{ 
                                p: 4, 
                                borderRadius: 8, 
                                height: "100%", 
                                display: "flex", 
                                flexDirection: "column", 
                                alignItems: "flex-start",
                                boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
                                border: "1px solid rgba(0,0,0,0.05)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                                "&:hover": {
                                    transform: "translateY(-10px)",
                                    boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
                                }
                            }}>
                                <Box sx={{ 
                                    width: 80, 
                                    height: 80, 
                                    borderRadius: "40%", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center", 
                                    background: `linear-gradient(135deg, ${service.color} 0%, ${service.color}dd 100%)`,
                                    boxShadow: `0 10px 20px ${service.color}40`,
                                    mb: 4
                                }}>
                                    {service.icon}
                                </Box>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, fontSize: "1.5rem" }}>
                                    {service.title}
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.7, flex: 1, mb: 4 }}>
                                    {service.description}
                                </Typography>
                                <Button 
                                    endIcon={<ArrowForwardIcon />} 
                                    sx={{ 
                                        color: service.color, 
                                        fontWeight: 700, 
                                        p: 0,
                                        "&:hover": { bgcolor: "transparent", opacity: 0.8 } 
                                    }}
                                >
                                    Saber más
                                </Button>
                            </Paper>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>
      </Box>

      {/* CTA SECTION */}
      <Box sx={{ py: 15, bgcolor: "#111", color: "white", textAlign: "center" }}>
        <Container maxWidth="md">
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>
                ¿Listo para ordenar tu negocio?
            </Typography>
            <Typography sx={{ fontSize: "1.2rem", opacity: 0.7, mb: 5 }}>
                Agenda una consulta inicial gratuita y descubre cómo podemos optimizar tus impuestos hoy mismo.
            </Typography>
            <Link href="https://wa.me/3207269417" passHref>
                <Button 
                    variant="contained" 
                    size="large"
                    sx={{
                        bgcolor: "white",
                        color: "black",
                        borderRadius: 50,
                        px: 6,
                        py: 2,
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        "&:hover": { bgcolor: "#f0f0f0" }
                    }}
                >
                    Contactar por WhatsApp
                </Button>
            </Link>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
