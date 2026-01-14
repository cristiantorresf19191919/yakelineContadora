"use client";

import { Box, Typography, Button, IconButton, useTheme, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";

export default function SmartPopup() {
  const [open, setOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    // Verificar si ya vieron el popup hoy
    const popupSeen = localStorage.getItem('popup-seen');
    const popupDate = localStorage.getItem('popup-date');
    const today = new Date().toDateString();
    
    // Si ya lo vieron hoy, no mostrar
    if (popupSeen === 'true' && popupDate === today) {
      return;
    }

    // Mostrar después de 30 segundos
    const timer = setTimeout(() => {
      if (!hasSeen) {
        setOpen(true);
      }
    }, 30000);

    // Mostrar al 70% del scroll
    const handleScroll = () => {
      const scrollPercent = 
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      if (scrollPercent > 70 && !hasSeen && !open) {
        setOpen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasSeen, open]);

  const handleClose = () => {
    setOpen(false);
    setHasSeen(true);
    const today = new Date().toDateString();
    localStorage.setItem('popup-seen', 'true');
    localStorage.setItem('popup-date', today);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = "3207269417";
    const message = encodeURIComponent(
      "Hola Yakeline, quiero reclamar la oferta especial de consulta inicial gratuita."
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
    handleClose();
  };

  // Calculate the diagonal of the screen for the radial animation
  const getDiagonal = () => {
    if (typeof window === 'undefined') return 2000;
    const width = window.innerWidth;
    const height = window.innerHeight;
    return Math.sqrt(width * width + height * height);
  };

  const popupContent = (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            overflow: "hidden",
          }}
          onClick={handleClose}
        >
          {/* Radial animation overlay */}
          <motion.div
            initial={{
              clipPath: `circle(0% at 50% 50%)`,
            }}
            animate={{
              clipPath: `circle(${getDiagonal()}px at 50% 50%)`,
            }}
            exit={{
              clipPath: `circle(0% at 50% 50%)`,
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: isMobile ? "flex-start" : "center",
              justifyContent: "center",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "100%", sm: "500px", md: "600px" },
                p: { xs: 4, sm: 4, md: 5 },
                pt: { xs: 6, sm: 4 },
                textAlign: "center",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: { xs: "100%", sm: "auto" },
              }}
            >
              <IconButton
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  top: { xs: 12, sm: 24 },
                  right: { xs: 12, sm: 24 },
                  color: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)",
                  },
                  zIndex: 10,
                }}
              >
                <CloseIcon />
              </IconButton>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ width: "100%" }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 700,
                    mb: 2,
                    mt: { xs: 1, sm: 2 },
                    fontSize: { xs: "2.25rem", sm: "2.125rem", md: "2.5rem" },
                  }}
                >
                  🎁 Oferta Especial
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    color: "#ffd700",
                    mb: 2,
                    fontWeight: 600,
                    fontSize: { xs: "1.875rem", sm: "1.75rem", md: "2rem" },
                  }}
                >
                  Consulta inicial GRATIS
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, opacity: 0.9, fontSize: { xs: "1.25rem", sm: "1.25rem" } }}
                >
                  Valor: $150.000
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    opacity: 0.95,
                    fontSize: { xs: "1.1rem", sm: "1rem" },
                    lineHeight: 1.6,
                    px: { xs: 2, sm: 0 },
                  }}
                >
                  Solo para los primeros 10 clientes de este mes.
                  <br />
                  Agenda ahora y recibe un diagnóstico completo de tus finanzas.
                </Typography>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleWhatsAppClick}
                  startIcon={<WhatsAppIcon sx={{ color: "white" }} />}
                  sx={{
                    mb: 2,
                    bgcolor: "#5a4fcf",
                    color: "white",
                    fontWeight: 700,
                    py: 1.5,
                    fontSize: { xs: "1.1rem", sm: "1rem" },
                    "&:hover": {
                      bgcolor: "#4a3fbf",
                      transform: "scale(1.02)",
                    },
                    "& .MuiButton-startIcon": {
                      color: "white",
                    },
                  }}
                >
                  Reclamar Oferta Ahora
                </Button>

                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.8,
                    fontSize: { xs: "0.85rem", sm: "0.75rem" },
                    display: "block",
                  }}
                >
                  Válido hasta fin de mes • No acumulable con otras promociones
                </Typography>
              </motion.div>
            </Box>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === 'undefined') return null;

  return createPortal(popupContent, document.body);
}
