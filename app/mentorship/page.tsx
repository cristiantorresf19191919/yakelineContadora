"use client";

import { Box, Typography, Container, Button, Grid, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Footer from "../components/Footer/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp/FloatingWhatsApp";

export default function MentorshipPage() {
  return (
    <>
      <Box sx={{ bgcolor: "#050505", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
        
        {/* HERO */}
        <Container maxWidth="lg" sx={{ pt: 20, pb: 15, position: "relative" }}>
             {/* Glow effect */}
             <Box sx={{ 
                 position: "absolute", 
                 top: "10%", 
                 left: "50%", 
                 transform: "translate(-50%, -50%)", 
                 width: "80vw", 
                 height: "400px", 
                 background: "radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, rgba(0,0,0,0) 70%)", 
                 filter: "blur(60px)",
                 pointerEvents: "none"
             }} />

             <Grid container spacing={6} alignItems="center">
                 <Grid item xs={12} md={7}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Box sx={{ display: "inline-block", px: 2, py: 1, border: "1px solid #D4AF37", borderRadius: 50, mb: 3 }}>
                            <Typography variant="caption" sx={{ color: "#D4AF37", fontWeight: 700, letterSpacing: 1 }}>
                                PROGRAMA EXCLUSIVO 1 A 1
                            </Typography>
                        </Box>
                        <Typography variant="h1" sx={{ fontSize: { xs: "3rem", md: "5rem" }, fontWeight: 800, lineHeight: 1.1, mb: 3 }}>
                            Desbloquea el <br />
                            <span style={{ color: "transparent", WebkitTextStroke: "1px #D4AF37" }}>Potencial Real</span> <br/>
                            de tu Negocio.
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#a0a0a0", fontSize: "1.2rem", maxWidth: 550, mb: 6, lineHeight: 1.8 }}>
                            No necesitas más teoría. Necesitas una estrategia probada. Una mentoría intensiva para contadores y empresarios que quieren facturar más y trabajar mejor.
                        </Typography>
                        <Button 
                            variant="contained" 
                            size="large"
                            sx={{
                                bgcolor: "#D4AF37",
                                color: "#000",
                                fontWeight: 800,
                                fontSize: "1.1rem",
                                borderRadius: 0,
                                px: 5,
                                py: 2,
                                "&:hover": { bgcolor: "#b5952f" }
                            }}
                            href="https://wa.me/3207269417"
                        >
                            Aplicar al Programa
                        </Button>
                    </motion.div>
                 </Grid>
                 <Grid item xs={12} md={5}>
                     {/* Abstract Visual Representation of Growth/Structure */}
                     <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ position: "relative", height: 500, width: "100%", background: "linear-gradient(135deg, #111 0%, #0a0a0a 100%)", borderRadius: 30, border: "1px solid #333", overflow: "hidden" }}
                     >
                         <Box sx={{ padding: 4 }}>
                             <Typography variant="h6" sx={{ color: "#D4AF37" }}>Módulos del Programa</Typography>
                             <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
                                {["Diagnóstico Profundo", "Estructura Fiscal", "Pricing y Rentabilidad", "Automatización"].map((item, i) => (
                                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, p: 2, bgcolor: "rgba(255,255,255,0.05)", borderRadius: 2 }}>
                                        <CheckCircleIcon sx={{ color: "#D4AF37" }} />
                                        <Typography>{item}</Typography>
                                    </Box>
                                ))}
                             </Box>
                         </Box>
                     </motion.div>
                 </Grid>
             </Grid>
        </Container>

        {/* TESTIMONIALS / AUTHORITY */}
        <Box sx={{ py: 15, borderTop: "1px solid #222" }}>
            <Container maxWidth="md" sx={{ textAlign: "center" }}>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 8 }}>
                    Lo que dicen mis mentorados
                </Typography>
                <Grid container spacing={4}>
                    {[1, 2].map((i) => (
                        <Grid item xs={12} md={6} key={i}>
                            <Box sx={{ p: 4, bgcolor: "#111", borderRadius: 4, textAlign: "left", border: "1px solid #222" }}>
                                <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                                    {[1,2,3,4,5].map(s => <StarIcon key={s} sx={{ color: "#D4AF37", fontSize: 18 }} />)}
                                </Box>
                                <Typography sx={{ color: "#ccc", mb: 3, fontStyle: "italic" }}>
                                    "La claridad que obtuve en solo 3 sesiones valió más que un año de intentar descifrarlo sola. Yakeline tiene una visión comercial que pocos contadores tienen."
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                    <Avatar sx={{ bgcolor: "#333" }}>C</Avatar>
                                    <Box>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Camila R.</Typography>
                                        <Typography variant="caption" sx={{ color: "#666" }}>Dueña de Agencia</Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>

      </Box>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
