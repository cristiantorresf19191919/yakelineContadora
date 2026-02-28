"use client";

import { useState } from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

const packages = [
  {
    id: "starter",
    name: "Consulta Express",
    nameEn: "Express Consultation",
    price: "GRATIS",
    priceNote: "Primera consulta",
    icon: <RocketLaunchRoundedIcon sx={{ fontSize: 28 }} />,
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    features: [
      "Diagnóstico financiero de 15 min",
      "Evaluación de tu situación tributaria",
      "Identificación de oportunidades de ahorro",
      "Recomendaciones inmediatas",
    ],
    cta: "Agendar Gratis",
    popular: false,
  },
  {
    id: "professional",
    name: "Plan Profesional",
    nameEn: "Professional Plan",
    price: "$250.000",
    priceNote: "por sesión",
    icon: <StarRoundedIcon sx={{ fontSize: 28 }} />,
    color: "#5D3FD3",
    gradient: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
    features: [
      "Consulta personalizada de 60 min",
      "Análisis detallado de tu contabilidad",
      "Plan tributario a la medida",
      "Revisión de obligaciones DIAN",
      "Seguimiento por WhatsApp (1 semana)",
      "Informe de recomendaciones escrito",
    ],
    cta: "Elegir Plan",
    popular: true,
  },
  {
    id: "premium",
    name: "Plan Empresarial",
    nameEn: "Enterprise Plan",
    price: "$450.000",
    priceNote: "por mes",
    icon: <DiamondRoundedIcon sx={{ fontSize: 28 }} />,
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
    features: [
      "Todo lo del Plan Profesional",
      "Gestión tributaria mensual completa",
      "Facturación electrónica DIAN",
      "Revisoría fiscal trimestral",
      "Soporte prioritario ilimitado",
      "Planeación fiscal anual",
      "Representación ante la DIAN",
    ],
    cta: "Contactar",
    popular: false,
  },
];

interface ServicePackagesProps {
  onSelectPackage?: (packageId: string) => void;
}

export default function ServicePackages({ onSelectPackage }: ServicePackagesProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 4 },
        background: "linear-gradient(180deg, #FAFAFA 0%, #F3EEFF 50%, #FAFAFA 100%)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Chip
              icon={<WorkspacePremiumRoundedIcon />}
              label="PLANES DE SERVICIO"
              sx={{
                mb: 2,
                px: 2,
                py: 2.5,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                color: "#1F2937",
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              Elige el Plan{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #5D3FD3 0%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Perfecto para Ti
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Desde una consulta gratuita hasta gestión empresarial completa.
              Cada plan diseñado para maximizar tu tranquilidad financiera.
            </Typography>
          </Box>
        </motion.div>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 3.5 },
            alignItems: "stretch",
          }}
        >
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onMouseEnter={() => setHoveredId(pkg.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ position: "relative" }}
            >
              {pkg.popular && (
                <Box
                  sx={{
                    position: "absolute",
                    top: -14,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 2,
                  }}
                >
                  <Chip
                    label="MÁS POPULAR"
                    size="small"
                    sx={{
                      background: "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
                      color: "#78350F",
                      fontWeight: 800,
                      fontSize: "0.7rem",
                      letterSpacing: "0.08em",
                      px: 1,
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.4)",
                    }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  background: "white",
                  borderRadius: "20px",
                  p: { xs: 3, md: 3.5 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  border: pkg.popular
                    ? "2px solid rgba(93, 63, 211, 0.3)"
                    : "1px solid rgba(93, 63, 211, 0.08)",
                  boxShadow: pkg.popular
                    ? "0 20px 60px rgba(93, 63, 211, 0.15), 0 8px 24px rgba(0,0,0,0.06)"
                    : "0 8px 32px rgba(0,0,0,0.04)",
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  transform: hoveredId === pkg.id ? "translateY(-8px)" : "none",
                  position: "relative",
                  overflow: "hidden",
                  "&::before": pkg.popular
                    ? {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "4px",
                        background: pkg.gradient,
                      }
                    : {},
                }}
              >
                {/* Icon + Name */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: "14px",
                      background: `${pkg.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: pkg.color,
                    }}
                  >
                    {pkg.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: "1.2rem",
                      color: "#1F2937",
                    }}
                  >
                    {pkg.name}
                  </Typography>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.8 }}>
                    <Typography
                      sx={{
                        fontWeight: 800,
                        fontSize: pkg.price === "GRATIS" ? "2rem" : "2.2rem",
                        color: pkg.color,
                        lineHeight: 1,
                      }}
                    >
                      {pkg.price}
                    </Typography>
                    <Typography sx={{ color: "#9CA3AF", fontSize: "0.85rem" }}>
                      {pkg.priceNote}
                    </Typography>
                  </Box>
                </Box>

                {/* Features */}
                <Box sx={{ flex: 1, mb: 3 }}>
                  {pkg.features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                        mb: 1.2,
                      }}
                    >
                      <CheckCircleRoundedIcon
                        sx={{ fontSize: 18, color: pkg.color, mt: 0.2, flexShrink: 0 }}
                      />
                      <Typography sx={{ fontSize: "0.88rem", color: "#4B5563", lineHeight: 1.5 }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* CTA */}
                <Button
                  fullWidth
                  variant={pkg.popular ? "contained" : "outlined"}
                  onClick={() => {
                    if (pkg.id === "starter") {
                      onSelectPackage?.(pkg.id);
                    } else {
                      window.open(
                        `https://wa.me/573207269417?text=${encodeURIComponent(
                          `Hola Yakeline, me interesa el ${pkg.name}. ¿Podemos agendar una consulta?`
                        )}`,
                        "_blank"
                      );
                    }
                  }}
                  startIcon={pkg.id !== "starter" ? <WhatsAppIcon /> : undefined}
                  sx={{
                    borderRadius: "50px",
                    py: 1.3,
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: "0.95rem",
                    ...(pkg.popular
                      ? {
                          background: pkg.gradient,
                          boxShadow: `0 4px 16px ${pkg.color}50`,
                          "&:hover": {
                            boxShadow: `0 6px 24px ${pkg.color}60`,
                          },
                        }
                      : {
                          color: pkg.color,
                          borderColor: `${pkg.color}40`,
                          "&:hover": {
                            borderColor: pkg.color,
                            background: `${pkg.color}08`,
                          },
                        }),
                  }}
                >
                  {pkg.cta}
                </Button>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Box
            sx={{
              mt: { xs: 4, md: 5 },
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: { xs: 2, md: 4 },
              color: "#9CA3AF",
              fontSize: "0.82rem",
            }}
          >
            {[
              "Sin contratos a largo plazo",
              "Cancela cuando quieras",
              "Factura electrónica incluida",
              "Soporte por WhatsApp",
            ].map((text) => (
              <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <CheckCircleRoundedIcon sx={{ fontSize: 14, color: "#10B981" }} />
                <Typography sx={{ fontSize: "0.82rem", color: "#6B7280" }}>{text}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
