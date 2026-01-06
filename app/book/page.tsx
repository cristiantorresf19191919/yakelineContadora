"use client";

import { Box, Typography, Container, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import DownloadIcon from "@mui/icons-material/Download";
import Footer from "../components/Footer/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp/FloatingWhatsApp";

export default function BookPage() {
  return (
    <>
      <Box sx={{ 
          minHeight: "100vh", 
          background: "linear-gradient(180deg, #EAE6DF 0%, #FFFFFF 100%)", // Warm paper color
          overflow: "hidden"
      }}>
        
        <Container maxWidth="lg" sx={{ pt: 15, pb: 10 }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={8} alignItems="center">
                
                {/* 3D BOOK MOCKUP SIDE */}
                <Box sx={{ flex: 1, position: "relative", perspective: "1000px" }}>
                    <motion.div
                        initial={{ rotateY: -30, rotateX: 10,  opacity: 0 }}
                        animate={{ rotateY: -15, rotateX: 5, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        style={{ 
                            width: 320, 
                            height: 480, 
                            margin: "0 auto",
                            background: "#000",
                            borderRadius: "4px 16px 16px 4px",
                            boxShadow: "20px 20px 60px rgba(0,0,0,0.3)",
                            position: "relative",
                            transformStyle: "preserve-3d"
                        }}
                    >
                         {/* Book Cover Design Sim */}
                         <Box sx={{ 
                             position: "absolute", inset: 0, 
                             background: "linear-gradient(45deg, #1a1a1a 0%, #2c2c2c 100%)",
                             borderRadius: "4px 16px 16px 4px",
                             p: 4,
                             display: "flex",
                             flexDirection: "column",
                             justifyContent: "space-between",
                             borderLeft: "8px solid #333"
                         }}>
                             <Typography variant="h3" sx={{ color: "white", fontFamily: "serif", fontWeight: 700 }}>
                                 Domina <br/> Tu Dinero
                             </Typography>
                             <Box>
                                 <Typography sx={{ color: "#D4AF37", fontSize: "0.9rem", letterSpacing: 2 }}>YAKELINE BUSTAMANTE</Typography>
                             </Box>
                         </Box>
                    </motion.div>
                    
                    {/* Shadow */}
                    <Box sx={{ 
                        position: "absolute", 
                        bottom: -40, left: "50%", transform: "translateX(-50%)", 
                        width: "80%", height: 20, 
                        background: "black", filter: "blur(30px)", opacity: 0.3, zIndex: -1 
                    }} />
                </Box>

                {/* CONTENT SIDE */}
                <Box sx={{ flex: 1 }}>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <Typography variant="overline" sx={{ color: "text.secondary",  fontWeight: 600, letterSpacing: 2 }}>
                            PRÓXIMAMENTE / BESTSELLER
                        </Typography>
                        <Typography variant="h2" sx={{ fontFamily: "serif", fontSize: { xs: "2.5rem", md: "3.5rem" }, fontWeight: 700, mb: 3, color: "#1a1a1a" }}>
                            El manual que cambiará tu relación con el dinero.
                        </Typography>
                        <Typography variant="body1" sx={{ fontSize: "1.1rem", color: "text.secondary", mb: 4, lineHeight: 1.8 }}>
                            En estas páginas no encontrarás fórmulas mágicas, sino principios eternos y estrategias modernas adaptadas al contexto colombiano. Una guía honesta para emprendedores que quieren construir riqueza real.
                        </Typography>

                        <Box sx={{ p: 3, bgcolor: "#fff", borderRadius: 4, border: "1px solid #e0e0e0", mb: 4 }}>
                            <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                                Descarga el Capítulo 1 Gratis
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                                Únete a la lista de espera y recibe una muestra exclusiva hoy mismo.
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    startIcon={<DownloadIcon />}
                                    sx={{ borderRadius: 50, px: 4 }}
                                >
                                    Descargar PDF
                                </Button>
                            </Stack>
                        </Box>
                    </motion.div>
                </Box>

            </Stack>
        </Container>

      </Box>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
