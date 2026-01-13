"use client";

import { Box, Typography, Button, IconButton, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartPopup() {
  const [open, setOpen] = useState(false);
  const [hasSeen, setHasSeen] = useState(false);

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

  return (
    <AnimatePresence>
      {open && (
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: { 
              borderRadius: 4, 
              p: 0,
              overflow: "visible"
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Box sx={{ 
              position: "relative", 
              p: 4, 
              textAlign: "center",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white"
            }}>
              <IconButton
                onClick={handleClose}
                sx={{ 
                  position: "absolute", 
                  top: 8, 
                  right: 8,
                  color: "white",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.2)"
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
              
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, mt: 2 }}>
                🎁 Oferta Especial
              </Typography>
              <Typography variant="h5" sx={{ color: "#ffd700", mb: 2, fontWeight: 600 }}>
                Consulta inicial GRATIS
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, opacity: 0.9 }}>
                Valor: $150.000
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, opacity: 0.95 }}>
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
                  "&:hover": {
                    bgcolor: "#4a3fbf",
                    transform: "scale(1.02)"
                  },
                  "& .MuiButton-startIcon": {
                    color: "white"
                  }
                }}
              >
                Reclamar Oferta Ahora
              </Button>
              
              <Typography variant="caption" sx={{ opacity: 0.8 }}>
                Válido hasta fin de mes • No acumulable con otras promociones
              </Typography>
            </Box>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
