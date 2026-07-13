"use client";

import { Box, Typography, Grid } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import { motion } from "framer-motion";
import { useLanguage } from "@/app/contexts/LanguageContext";

const badgesData = [
  {
    Icon: VerifiedIcon,
    es: "10+ años de experiencia",
    en: "10+ Years of Experience",
    gradient: "var(--brand-gradient)",
    descEs: "Experiencia comprobada en contabilidad y finanzas",
    descEn: "Proven experience in accounting and finance",
  },
  {
    Icon: SchoolIcon,
    es: "Contadora Pública Certificada",
    en: "Certified Public Accountant",
    gradient: "var(--brand-gradient)",
    descEs: "Títulos y certificaciones profesionales",
    descEn: "Professional degrees and certifications",
  },
  {
    Icon: PeopleIcon,
    es: "500+ clientes satisfechos",
    en: "500+ Satisfied Clients",
    gradient: "linear-gradient(135deg, var(--brand-accent) 0%, var(--brand-primary) 100%)",
    descEs: "Resultados que hablan por sí solos",
    descEn: "Results that speak for themselves",
  },
];

export default function CredibilityBadges() {
  const { lang } = useLanguage();
  const badges = badgesData.map((b) => ({
    Icon: b.Icon,
    text: lang === "es" ? b.es : b.en,
    gradient: b.gradient,
    description: lang === "es" ? b.descEs : b.descEn,
  }));

  return (
    <Box sx={{
      py: { xs: 4, md: 7 },
      background: "var(--bg)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle decorative element */}
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        height: 500,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.04) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <Box sx={{
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 1.5, md: 4 },
        position: "relative",
        zIndex: 1,
      }}>
        <Grid container spacing={{ xs: 1.5, md: 3 }} justifyContent="center">
          {badges.map((badge, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Box sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" },
                  alignItems: { xs: "center", md: "center" },
                  textAlign: { xs: "left", md: "center" },
                  gap: { xs: 2, md: 2 },
                  p: { xs: 2.5, md: 3.5 },
                  bgcolor: "rgba(var(--surface-rgb), 0.72)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderRadius: { xs: 3, md: 4 },
                  border: "1px solid var(--border)",
                  boxShadow: "var(--shadow-md)",
                  height: "100%",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                  position: "relative",
                  overflow: "hidden",
                  "&:hover": {
                    transform: { xs: "none", md: "translateY(-6px)" },
                    boxShadow: "var(--shadow-lg)",
                    borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
                  },
                  // Shimmer accent line at top
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: badge.gradient,
                    opacity: 0.8,
                  },
                }}>
                  <Box sx={{
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: { xs: 56, md: 80 },
                    height: { xs: 56, md: 80 },
                    borderRadius: "50%",
                    background: badge.gradient,
                    flexShrink: 0,
                    boxShadow: "0 8px 20px rgba(var(--brand-primary-rgb), 0.3)",
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}>
                    <badge.Icon sx={{
                      fontSize: { xs: 28, md: 40 },
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))",
                    }} />
                  </Box>
                  <Box sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: { xs: 0.5, md: 0.75 },
                    minWidth: 0,
                  }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "var(--text)",
                        fontSize: { xs: "0.95rem", md: "1.25rem" },
                        lineHeight: { xs: 1.3, md: 1.5 },
                      }}
                    >
                      {badge.text}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "var(--text-muted)",
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
