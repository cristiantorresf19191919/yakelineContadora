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
        pt: { xs: 15, md: 20 }, 
        pb: { xs: 8, md: 12 }, 
        textAlign: 'center',
        background: 'linear-gradient(135deg, #FFFEFF 0%, #D7FFFE 100%)', // Lighter, fresher gradient
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <Box 
            component={motion.div}
            animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            sx={{
                position: 'absolute',
                top: -200,
                right: -200,
                width: 600,
                height: 600,
                borderRadius: '40%',
                background: 'linear-gradient(45deg, #85FFBD 0%, #FFFB7D 100%)',
                filter: 'blur(100px)',
                opacity: 0.4,
                zIndex: 0
            }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'left', mb: 4 }}>
             <Link href="/" passHref>
                <Button 
                    startIcon={<ArrowBackIcon />}
                    sx={{ 
                        textTransform: 'none', 
                        fontSize: '1rem', 
                        color: 'text.secondary',
                        bgcolor: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        px: 3,
                        py: 1,
                        borderRadius: '20px',
                        "&:hover": { bgcolor: 'white' }
                    }}
                >
                    Volver
                </Button>
            </Link>
        </Box>
        
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <Typography variant="h1" sx={{ 
                fontSize: { xs: '3rem', md: '5rem' }, 
                fontWeight: 900, 
                mb: 3,
                letterSpacing: '-2px',
                color: '#1a1a1a',
                lineHeight: 1
            }}>
              Galería de <span style={{ color: '#FF416C' }}>Conocimiento</span>
            </Typography>
            <Typography variant="body1" sx={{ 
                fontSize: { xs: '1.2rem', md: '1.5rem' }, 
                color: 'text.secondary',
                maxWidth: 700, 
                mx: 'auto',
                lineHeight: 1.6
            }}>
                Una colección curada de videos para transformar tu comprensión sobre finanzas y contabilidad.
            </Typography>
        </motion.div>
        </Container>
      </Box>

      <Box sx={{ bgcolor: '#f8f9fa' }}>
        <InstagramFeed />
      </Box>

      <Footer />
    </>
  );
}
