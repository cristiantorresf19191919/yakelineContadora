"use client";

import { Box, Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { motion } from "framer-motion";

const badges = [
  { 
    icon: <VerifiedIcon sx={{ fontSize: 40 }} />, 
    text: "10+ años de experiencia", 
    color: "#4CAF50",
    description: "Experiencia comprobada en contabilidad y finanzas"
  },
  { 
    icon: <SchoolIcon sx={{ fontSize: 40 }} />, 
    text: "Contadora Pública Certificada", 
    color: "#2196F3",
    description: "Títulos y certificaciones profesionales"
  },
  { 
    icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
    text: "500+ clientes satisfechos", 
    color: "#FF9800",
    description: "Resultados que hablan por sí solos"
  },
];

export default function CredibilityBadges() {
  return (
    <Box sx={{ py: 6, bgcolor: "#f8f9fa" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 } }}>
        <Grid container spacing={3} justifyContent="center">
          {badges.map((badge, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 2,
                  p: 3,
                  bgcolor: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }
                }}>
                  <Box sx={{ 
                    color: badge.color, 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: `${badge.color}15`,
                  }}>
                    {badge.icon}
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a1a1a" }}>
                    {badge.text}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {badge.description}
                  </Typography>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
