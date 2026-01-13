"use client";

import { Box, Typography, LinearProgress } from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface UrgencyCounterProps {
  total?: number;
  initialRemaining?: number;
}

export default function UrgencyCounter({ 
  total = 10, 
  initialRemaining = 7 
}: UrgencyCounterProps) {
  const [remaining, setRemaining] = useState(initialRemaining);
  const percentage = (remaining / total) * 100;

  // Simular que ocasionalmente se reserva un cupo (opcional - para demo)
  // En producción, esto vendría de una API o base de datos
  useEffect(() => {
    const interval = setInterval(() => {
      // Solo decrementar si hay cupos disponibles y es aleatorio (10% de probabilidad cada 30 segundos)
      if (remaining > 0 && Math.random() < 0.1) {
        setRemaining((prev) => Math.max(0, prev - 1));
      }
    }, 30000); // Cada 30 segundos

    return () => clearInterval(interval);
  }, [remaining]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        p: 3, 
        bgcolor: "#fff3cd", 
        borderRadius: 2, 
        border: "2px solid #ffc107",
        mb: 3,
        boxShadow: "0 4px 12px rgba(255, 193, 7, 0.2)"
      }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#856404" }}>
          ⚡ Solo quedan {remaining} cupos disponibles
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={percentage} 
          sx={{ 
            height: 10, 
            borderRadius: 5,
            bgcolor: "#ffe082",
            mb: 1,
            "& .MuiLinearProgress-bar": {
              bgcolor: "#ff9800",
              borderRadius: 5,
            }
          }} 
        />
        <Typography variant="body2" sx={{ mt: 1, color: "#856404" }}>
          {total - remaining} personas ya reservaron su diagnóstico hoy
        </Typography>
      </Box>
    </motion.div>
  );
}
