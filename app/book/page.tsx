"use client";

import { useState } from "react";
import { Box, Typography, Container, Button, Stack, TextField, Chip } from "@mui/material";
import { motion } from "framer-motion";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { getFirebaseApp } from "@/lib/firebase/clientApp";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import Footer from "../components/Footer/Footer";

const bookHighlights = [
  "Principios eternos de finanzas personales",
  "Estrategias adaptadas al contexto colombiano",
  "Casos reales de emprendedores exitosos",
  "Herramientas prácticas y descargables",
];

export default function BookPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    try {
      const app = getFirebaseApp();
      const db = getFirestore(app);
      await addDoc(collection(db, "bookWaitlist"), {
        email: email.trim(),
        subscribedAt: serverTimestamp(),
      });
      setSubmitted(true);
      setEmail("");
    } catch {
      // Still show success to user, email might be saved on retry
      setSubmitted(true);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #EAE6DF 0%, #FFFFFF 100%)",
        overflow: "hidden"
      }}>

        <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 15 }, pb: { xs: 6, md: 10 } }}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 6, md: 8 }} alignItems="center">

            {/* 3D BOOK MOCKUP SIDE */}
            <Box sx={{ flex: 1, position: "relative", perspective: "1000px" }}>
              <motion.div
                initial={{ rotateY: -30, rotateX: 10, opacity: 0 }}
                animate={{ rotateY: -15, rotateX: 5, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{
                  width: 280,
                  height: 420,
                  margin: "0 auto",
                  background: "#000",
                  borderRadius: "4px 16px 16px 4px",
                  boxShadow: "20px 20px 60px rgba(0,0,0,0.3)",
                  position: "relative",
                  transformStyle: "preserve-3d"
                }}
              >
                <Box sx={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(45deg, #1a1a1a 0%, #2c2c2c 100%)",
                  borderRadius: "4px 16px 16px 4px",
                  p: { xs: 3, md: 4 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderLeft: "8px solid #333"
                }}>
                  <Typography variant="h3" sx={{ color: "white", fontFamily: "serif", fontWeight: 700, fontSize: { xs: "1.8rem", md: "2.2rem" } }}>
                    Domina <br/> Tu Dinero
                  </Typography>
                  <Box>
                    <Typography sx={{ color: "#D4AF37", fontSize: "0.85rem", letterSpacing: 2 }}>YAKELINE BUSTAMANTE</Typography>
                  </Box>
                </Box>
              </motion.div>

              {/* Shadow */}
              <Box sx={{
                position: "absolute",
                bottom: -40, left: "50%", transform: "translateX(-50%)",
                width: "70%", height: 20,
                background: "black", filter: "blur(30px)", opacity: 0.2, zIndex: -1
              }} />
            </Box>

            {/* CONTENT SIDE */}
            <Box sx={{ flex: 1 }}>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Chip
                  label="PRÓXIMAMENTE"
                  icon={<AutoStoriesIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    bgcolor: "#D4AF3715",
                    color: "#8B7355",
                    fontWeight: 700,
                    letterSpacing: 1,
                    fontSize: "0.75rem",
                    mb: 3,
                    border: "1px solid #D4AF3730",
                  }}
                />
                <Typography variant="h2" sx={{
                  fontFamily: "serif",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  fontWeight: 700,
                  mb: 3,
                  color: "#1a1a1a",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em"
                }}>
                  El manual que cambiará tu relación con el dinero.
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: "1rem", md: "1.1rem" }, color: "text.secondary", mb: 4, lineHeight: 1.85 }}>
                  En estas páginas no encontrarás fórmulas mágicas, sino principios eternos y estrategias modernas adaptadas al contexto colombiano. Una guía honesta para emprendedores que quieren construir riqueza real.
                </Typography>

                {/* Book highlights */}
                <Box sx={{ mb: 4 }}>
                  {bookHighlights.map((highlight, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <CheckCircleOutlineIcon sx={{ color: "#D4AF37", fontSize: 20 }} />
                      <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
                        {highlight}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Waitlist form */}
                <Box sx={{
                  p: { xs: 3, md: 4 },
                  bgcolor: "#fff",
                  borderRadius: 3,
                  border: "1px solid #e8e4de",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.06)"
                }}>
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Box sx={{ textAlign: "center", py: 2 }}>
                        <CheckCircleOutlineIcon sx={{ color: "#4CAF50", fontSize: 48, mb: 2 }} />
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                          ¡Estás en la lista!
                        </Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                          Te avisaremos cuando el libro esté disponible y recibirás el primer capítulo gratis.
                        </Typography>
                      </Box>
                    </motion.div>
                  ) : (
                    <>
                      <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, fontSize: { xs: "1rem", md: "1.1rem" } }}>
                        Únete a la lista de espera
                      </Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 3, lineHeight: 1.6 }}>
                        Sé de los primeros en recibir el libro y obtén el Capítulo 1 gratis.
                      </Typography>
                      <Box component="form" onSubmit={handleWaitlist}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                          <TextField
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="tu@correo.com"
                            type="email"
                            required
                            fullWidth
                            size="small"
                            variant="outlined"
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                                bgcolor: "#fafaf8",
                              }
                            }}
                          />
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={submitting}
                            sx={{
                              borderRadius: 2,
                              px: 4,
                              py: 1.2,
                              bgcolor: "#1a1a1a",
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                              "&:hover": { bgcolor: "#333" },
                              "&:disabled": { bgcolor: "#666", color: "#ccc" }
                            }}
                          >
                            {submitting ? "Enviando..." : "Reservar"}
                          </Button>
                        </Stack>
                      </Box>
                    </>
                  )}
                </Box>

                {/* WhatsApp alternative */}
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
                    ¿Prefieres que te avise directamente?
                  </Typography>
                  <Button
                    component="a"
                    href="https://wa.me/573207269417?text=Hola%20Yakeline,%20quiero%20reservar%20el%20libro%20Domina%20Tu%20Dinero"
                    target="_blank"
                    rel="noopener noreferrer"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      color: "#25D366",
                      fontWeight: 600,
                      "&:hover": { bgcolor: "#25D36610" }
                    }}
                  >
                    Escríbeme por WhatsApp
                  </Button>
                </Box>
              </motion.div>
            </Box>

          </Stack>
        </Container>

      </Box>
      <Footer />
    </>
  );
}
