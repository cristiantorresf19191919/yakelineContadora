"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";

export default function UrgencyCounter() {
  const currentMonth = new Date().toLocaleString("es-CO", { month: "long" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{
        p: 3,
        bgcolor: "#F3EEFF",
        borderRadius: 2,
        border: "1px solid rgba(93, 63, 211, 0.15)",
        mb: 3,
        display: "flex",
        alignItems: "center",
        gap: 2,
      }}>
        <CalendarMonthRoundedIcon sx={{ color: "#5D3FD3", fontSize: 32 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: "#1F2937", fontSize: "1rem" }}>
            Consultas disponibles para {currentMonth}
          </Typography>
          <Typography variant="body2" sx={{ color: "#6B7280" }}>
            Agenda tu diagnóstico financiero gratuito y da el primer paso hacia la tranquilidad fiscal.
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}
