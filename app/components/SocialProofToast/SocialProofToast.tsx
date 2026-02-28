"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import TipsAndUpdatesRoundedIcon from "@mui/icons-material/TipsAndUpdatesRounded";

interface TipItem {
  tip: string;
  category: string;
  icon: "lightbulb" | "tips";
}

const tipsData: TipItem[] = [
  { tip: "¿Sabías que puedes deducir gastos de salud en tu declaración de renta?", category: "Renta", icon: "lightbulb" },
  { tip: "La fecha límite de IVA bimestral depende de tu último dígito del NIT.", category: "IVA", icon: "tips" },
  { tip: "Los independientes pueden deducir hasta el 25% de sus ingresos como costos.", category: "Tributario", icon: "lightbulb" },
  { tip: "La facturación electrónica es obligatoria para todos los responsables de IVA.", category: "DIAN", icon: "tips" },
  { tip: "Mantener tu contabilidad al día te evita sanciones de hasta el 5% del patrimonio.", category: "Contabilidad", icon: "lightbulb" },
  { tip: "Las personas naturales con ingresos > $59M deben declarar renta en 2026.", category: "Renta", icon: "tips" },
  { tip: "Puedes reducir tu base gravable con aportes voluntarios a pensión.", category: "Ahorro", icon: "lightbulb" },
  { tip: "Los pagos a seguridad social son deducibles en tu declaración de renta.", category: "Tributario", icon: "tips" },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNotification = useCallback(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 6000);
  }, []);

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 30000);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tipsData.length);
      showNotification();
    }, 45000 + Math.random() * 15000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  const current = tipsData[currentIndex];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            zIndex: 1200,
            pointerEvents: "auto",
          }}
        >
          <Box
            onClick={() => setVisible(false)}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              bgcolor: "white",
              borderRadius: "16px",
              px: 2.5,
              py: 1.5,
              boxShadow: "0 12px 40px rgba(0,0,0,0.12), 0 4px 12px rgba(93, 63, 211, 0.08)",
              border: "1px solid rgba(93, 63, 211, 0.08)",
              cursor: "pointer",
              maxWidth: 360,
              "&:hover": { boxShadow: "0 12px 40px rgba(0,0,0,0.16)" },
              transition: "box-shadow 0.2s",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: current.icon === "lightbulb"
                  ? "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)"
                  : "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {current.icon === "lightbulb" ? (
                <LightbulbRoundedIcon sx={{ color: "white", fontSize: 20 }} />
              ) : (
                <TipsAndUpdatesRoundedIcon sx={{ color: "white", fontSize: 20 }} />
              )}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "#5D3FD3",
                  lineHeight: 1.3,
                  mb: 0.3,
                }}
              >
                Tip {current.category}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.78rem",
                  color: "#4B5563",
                  lineHeight: 1.4,
                }}
              >
                {current.tip}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
