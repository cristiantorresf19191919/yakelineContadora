"use client";

import { Box, Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { motion } from "framer-motion";

const badges = [
  { 
    Icon: VerifiedIcon, 
    text: "10+ años de experiencia", 
    color: "#4CAF50",
    description: "Experiencia comprobada en contabilidad y finanzas"
  },
  { 
    Icon: SchoolIcon, 
    text: "Contadora Pública Certificada", 
    color: "#2196F3",
    description: "Títulos y certificaciones profesionales"
  },
  { 
    Icon: PeopleIcon, 
    text: "500+ clientes satisfechos", 
    color: "#FF9800",
    description: "Resultados que hablan por sí solos"
  },
];

export default function CredibilityBadges() {
  return (
    <Box sx={{ 
      py: { xs: 3, md: 6 }, 
      bgcolor: "#f8f9fa" 
    }}>
      <Box sx={{ 
        maxWidth: 1200, 
        mx: "auto", 
        px: { xs: 1.5, md: 4 } 
      }}>
        <Grid container spacing={{ xs: 1.5, md: 3 }} justifyContent="center">
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
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: { xs: "center", md: "center" },
                  textAlign: { xs: "left", md: "center" },
                  gap: { xs: 2, md: 2 },
                  p: { xs: 2, md: 3 },
                  bgcolor: "white",
                  borderRadius: { xs: 2, md: 3 },
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-5px)" },
                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  }
                }}>
                  <Box sx={{ 
                    color: badge.color, 
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 56, md: 80 },
                    height: { xs: 56, md: 80 },
                    borderRadius: "50%",
                    bgcolor: `${badge.color}15`,
                    flexShrink: 0,
                  }}>
                    <badge.Icon sx={{ 
                      fontSize: { xs: 28, md: 40 } 
                    }} />
                  </Box>
                  <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 0.5, md: 0 },
                    minWidth: 0,
                  }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 700, 
                        color: "#1a1a1a",
                        fontSize: { xs: "0.95rem", md: "1.25rem" },
                        lineHeight: { xs: 1.3, md: 1.5 },
                      }}
                    >
                      {badge.text}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: "text.secondary",
                        fontSize: { xs: "0.8rem", md: "0.875rem" },
                        lineHeight: { xs: 1.4, md: 1.5 },
                      }}
                    >
                      {badge.description}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
