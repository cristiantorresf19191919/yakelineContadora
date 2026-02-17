"use client";

import { Box, Typography, Button, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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
        {/* Subtle background element */}
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

      <Footer />
    </>
  );
}
