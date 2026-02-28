"use client";

import { useState, useEffect, useCallback } from "react";
import { Box, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

interface ProofItem {
  name: string;
  city: string;
  action: string;
  icon: "check" | "calendar";
  timeAgo: string;
}

const proofData: ProofItem[] = [
  { name: "María G.", city: "Bogotá", action: "agendó una consulta tributaria", icon: "calendar", timeAgo: "hace 3 min" },
  { name: "Carlos R.", city: "Medellín", action: "se suscribió a la mentoría", icon: "check", timeAgo: "hace 8 min" },
  { name: "Ana P.", city: "Cali", action: "reservó una asesoría gratis", icon: "calendar", timeAgo: "hace 12 min" },
  { name: "Diego L.", city: "Barranquilla", action: "descargó la guía fiscal", icon: "check", timeAgo: "hace 15 min" },
  { name: "Laura M.", city: "Cartagena", action: "agendó revisoría fiscal", icon: "calendar", timeAgo: "hace 20 min" },
  { name: "Andrés V.", city: "Bucaramanga", action: "solicitó consulta contable", icon: "calendar", timeAgo: "hace 25 min" },
  { name: "Paola S.", city: "Pereira", action: "se unió al newsletter", icon: "check", timeAgo: "hace 30 min" },
  { name: "Julián T.", city: "Manizales", action: "agendó planeación tributaria", icon: "calendar", timeAgo: "hace 35 min" },
];

export default function SocialProofToast() {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNotification = useCallback(() => {
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 4500);
  }, []);

  useEffect(() => {
    // Show first notification after 25 seconds
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 25000);

    // Then show every 35-55 seconds (randomized)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % proofData.length);
      showNotification();
    }, 35000 + Math.random() * 20000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [showNotification]);

  const current = proofData[currentIndex];

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
              maxWidth: 340,
              "&:hover": { boxShadow: "0 12px 40px rgba(0,0,0,0.16)" },
              transition: "box-shadow 0.2s",
            }}
          >
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: current.icon === "calendar"
                  ? "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)"
                  : "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {current.icon === "calendar" ? (
                <CalendarMonthRoundedIcon sx={{ color: "white", fontSize: 20 }} />
              ) : (
                <CheckCircleRoundedIcon sx={{ color: "white", fontSize: 20 }} />
              )}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  color: "#1F2937",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {current.name} de {current.city}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#6B7280",
                  lineHeight: 1.3,
                }}
              >
                {current.action}
              </Typography>
              <Typography
                sx={{
                  fontSize: "0.68rem",
                  color: "#9CA3AF",
                  mt: 0.3,
                }}
              >
                {current.timeAgo}
              </Typography>
            </Box>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
