"use client";

import { Box, Typography, Button, Container, Chip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded";
import Link from "next/link";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import InstagramFeed from "../components/InstagramFeed/InstagramFeed";

export default function VideosPage() {
  return (
    <>
      <Box sx={{
        position: 'relative',
        pt: { xs: 14, md: 18 },
        pb: { xs: 6, md: 10 },
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)',
        overflow: 'hidden'
      }}>
        <Box sx={{
          position: 'absolute',
          top: -200,
          right: -200,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
          filter: 'blur(120px)',
          opacity: 0.25,
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Link href="/" passHref>
              <Button
                startIcon={<ArrowBackIcon />}
                sx={{
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  color: 'text.secondary',
                  bgcolor: 'rgba(255,255,255,0.8)',
                  backdropFilter: 'blur(10px)',
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  "&:hover": { bgcolor: 'white' }
                }}
              >
                Volver al inicio
              </Button>
            </Link>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chip
              icon={<VideoLibraryRoundedIcon />}
              label="Video Blog"
              sx={{
                mb: 2.5,
                px: 2,
                py: 2.5,
                fontSize: "0.85rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
            <Typography variant="h1" sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              fontWeight: 900,
              mb: 3,
              letterSpacing: '-2px',
              color: '#1a1a1a',
              lineHeight: 1.1
            }}>
              Galería de <span style={{ color: '#FF416C' }}>Conocimiento</span>
            </Typography>
            <Typography variant="body1" sx={{
              fontSize: { xs: '1.05rem', md: '1.3rem' },
              color: 'text.secondary',
              maxWidth: 650,
              mx: 'auto',
              lineHeight: 1.7
            }}>
              Una colección curada de videos con consejos prácticos para transformar tu comprensión sobre finanzas y contabilidad.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#f8f9fa', pb: 4 }}>
        <InstagramFeed />
      </Box>

      {/* CTA Section */}
      <Box sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #5D3FD3 0%, #4C1D95 100%)",
        textAlign: "center",
        color: "white",
      }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                lineHeight: 1.3,
              }}
            >
              ¿Quieres asesoría personalizada?
            </Typography>
            <Typography sx={{ fontSize: { xs: "1rem", md: "1.15rem" }, opacity: 0.85, mb: 4, lineHeight: 1.7, maxWidth: 500, mx: "auto" }}>
              Los videos son el comienzo. Agenda una consulta y recibe un plan de acción diseñado para tu negocio.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/citas" passHref>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<CalendarMonthRoundedIcon />}
                  sx={{
                    bgcolor: "white",
                    color: "#5D3FD3",
                    borderRadius: 50,
                    px: 4,
                    py: 1.5,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "1rem",
                    "&:hover": { bgcolor: "#F3EEFF" },
                  }}
                >
                  Agendar Consulta
                </Button>
              </Link>
              <Button
                component="a"
                href="https://wa.me/573207269417?text=Hola%20Yakeline,%20vi%20tus%20videos%20y%20quiero%20saber%20más"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  color: "white",
                  borderColor: "rgba(255,255,255,0.4)",
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { borderColor: "white", bgcolor: "rgba(255,255,255,0.08)" },
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
