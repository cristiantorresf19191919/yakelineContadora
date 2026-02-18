"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

const steps = [
  {
    number: "01",
    title: "Agenda tu consulta",
    description:
      "Escr\u00edbenos por WhatsApp o agenda en l\u00ednea. En menos de 24 horas coordinamos tu primera sesi\u00f3n gratuita de 15 minutos.",
    Icon: WhatsAppIcon,
    color: "#25D366",
  },
  {
    number: "02",
    title: "Diagn\u00f3stico financiero",
    description:
      "Analizamos tu situaci\u00f3n contable, tributaria y fiscal. Identificamos oportunidades y riesgos que quiz\u00e1s no ves.",
    Icon: SearchRoundedIcon,
    color: "#5D3FD3",
  },
  {
    number: "03",
    title: "Plan de acci\u00f3n claro",
    description:
      "Recibe un plan personalizado con pasos concretos para optimizar tus finanzas, reducir impuestos y crecer con tranquilidad.",
    Icon: TrendingUpRoundedIcon,
    color: "#F59E0B",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
} as const;

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
} as const;

export default function ProcessSteps() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F6FF 50%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background element */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,63,211,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 1100, mx: "auto", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 48 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              letterSpacing: 3,
              fontSize: "0.85rem",
            }}
          >
            PROCESO SIMPLE
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              mt: 1,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            \u00bfC\u00f3mo funciona?
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: { xs: "1.05rem", md: "1.2rem" },
              mt: 2,
              maxWidth: 600,
              mx: "auto",
              lineHeight: 1.7,
            }}
          >
            Tres pasos sencillos para transformar la salud financiera de tu
            negocio.
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: { xs: 4, md: 5 },
              position: "relative",
            }}
          >
            {/* Connecting line (desktop only) */}
            <Box
              sx={{
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: 60,
                left: "20%",
                right: "20%",
                height: 2,
                background:
                  "linear-gradient(90deg, #25D366 0%, #5D3FD3 50%, #F59E0B 100%)",
                opacity: 0.25,
                zIndex: 0,
              }}
            />

            {steps.map((step) => (
              <motion.div key={step.number} variants={stepVariants}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {/* Icon circle */}
                  <Box
                    sx={{
                      width: { xs: 80, md: 96 },
                      height: { xs: 80, md: 96 },
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      background: `linear-gradient(135deg, ${step.color}18 0%, ${step.color}08 100%)`,
                      border: `2px solid ${step.color}30`,
                      mb: 3,
                      position: "relative",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.08)",
                        boxShadow: `0 12px 32px ${step.color}25`,
                      },
                    }}
                  >
                    <step.Icon
                      sx={{ fontSize: { xs: 32, md: 40 }, color: step.color }}
                    />
                    {/* Step number badge */}
                    <Box
                      sx={{
                        position: "absolute",
                        top: -4,
                        right: -4,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        background: step.color,
                        color: "#fff",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        display: "grid",
                        placeItems: "center",
                        boxShadow: `0 4px 12px ${step.color}40`,
                      }}
                    >
                      {step.number}
                    </Box>
                  </Box>

                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: "1.2rem", md: "1.35rem" },
                      mb: 1.5,
                      color: "text.primary",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.95rem", md: "1.05rem" },
                      lineHeight: 1.7,
                      maxWidth: 320,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
