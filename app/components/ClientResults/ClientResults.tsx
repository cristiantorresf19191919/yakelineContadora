"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { motion, useInView } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MetricRow {
  label: string;
  beforeValue: number; // 0-100 (bar width percentage)
  afterValue: number;
  beforeLabel: string;
  afterLabel: string;
}

interface ClientCase {
  name: string;
  type: string;
  typeColor: string;
  metrics: MetricRow[];
  savingsLabel: string;
  savingsValue: string;
  savingsSubtext: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const clientCases: ClientCase[] = [
  {
    name: "Restaurante El Buen Sabor",
    type: "PYME",
    typeColor: "#5D3FD3",
    metrics: [
      {
        label: "Impuestos",
        beforeValue: 90,
        afterValue: 58,
        beforeLabel: "Pagaba $18M",
        afterLabel: "Paga $11.5M",
      },
      {
        label: "Deducciones",
        beforeValue: 5,
        afterValue: 80,
        beforeLabel: "0 deducciones",
        afterLabel: "12 deducciones aplicadas",
      },
      {
        label: "Facturación",
        beforeValue: 10,
        afterValue: 95,
        beforeLabel: "Sin facturación electrónica",
        afterLabel: "Facturación electrónica DIAN",
      },
    ],
    savingsLabel: "Ahorro fiscal",
    savingsValue: "36%",
    savingsSubtext: "ahorro fiscal",
  },
  {
    name: "María González",
    type: "Persona Natural",
    typeColor: "#0891B2",
    metrics: [
      {
        label: "Declaraciones",
        beforeValue: 85,
        afterValue: 15,
        beforeLabel: "Declaraba con sanciones",
        afterLabel: "Declara a tiempo",
      },
      {
        label: "Devoluciones",
        beforeValue: 5,
        afterValue: 75,
        beforeLabel: "$0 devoluciones",
        afterLabel: "$4.2M en devoluciones",
      },
      {
        label: "Sanciones",
        beforeValue: 80,
        afterValue: 5,
        beforeLabel: "Multas recurrentes DIAN",
        afterLabel: "Cero sanciones en 3 años",
      },
    ],
    savingsLabel: "Recuperados",
    savingsValue: "$4.2M",
    savingsSubtext: "recuperados",
  },
  {
    name: "Tech Solutions SAS",
    type: "Empresa",
    typeColor: "#059669",
    metrics: [
      {
        label: "Sistema",
        beforeValue: 85,
        afterValue: 15,
        beforeLabel: "Contabilidad manual",
        afterLabel: "Software contable",
      },
      {
        label: "Cierre mensual",
        beforeValue: 90,
        afterValue: 11,
        beforeLabel: "45 días cierre mensual",
        afterLabel: "5 días cierre mensual",
      },
      {
        label: "Planeación",
        beforeValue: 5,
        afterValue: 95,
        beforeLabel: "Sin planeación tributaria",
        afterLabel: "Plan tributario optimizado",
      },
    ],
    savingsLabel: "Más eficiente",
    savingsValue: "89%",
    savingsSubtext: "más eficiente",
  },
];

// ---------------------------------------------------------------------------
// Animated Counter Hook
// ---------------------------------------------------------------------------

function useCountUp(
  target: string,
  isInView: boolean,
  duration: number = 2000
): string {
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Parse: handles "$4.2M", "36%", "89%"
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const prefix = target.match(/^[^0-9.]*/)?.[0] ?? "";
    const suffix = target.match(/[^0-9.]*$/)?.[0] ?? "";
    const hasDecimal = target.includes(".");
    const decimalPlaces = hasDecimal
      ? (target.split(".")[1]?.replace(/[^0-9]/g, "").length ?? 0)
      : 0;

    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * numeric;

      const formatted = hasDecimal ? start.toFixed(decimalPlaces) : Math.round(start).toString();
      setDisplay(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return display;
}

// ---------------------------------------------------------------------------
// AnimatedBar Sub-component
// ---------------------------------------------------------------------------

function AnimatedBar({
  value,
  color,
  delay,
  label,
}: {
  value: number;
  color: string;
  delay: number;
  label: string;
}) {
  return (
    <Box sx={{ width: "100%", mb: 0.5 }}>
      <Typography
        variant="caption"
        sx={{
          color: color === "#EF4444" ? "#B91C1C" : "#047857",
          fontWeight: 600,
          fontSize: "0.7rem",
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: 10,
          borderRadius: 5,
          bgcolor: color === "#EF4444" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            height: "100%",
            borderRadius: 5,
            background:
              color === "#EF4444"
                ? "linear-gradient(90deg, #FCA5A5, #EF4444)"
                : "linear-gradient(90deg, #6EE7B7, #10B981)",
          }}
        />
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// MetricRowComponent
// ---------------------------------------------------------------------------

function MetricRowComponent({
  metric,
  index,
}: {
  metric: MetricRow;
  index: number;
}) {
  const baseDelay = index * 0.2;

  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography
        variant="body2"
        sx={{
          fontWeight: 700,
          color: "#374151",
          mb: 1,
          fontSize: "0.85rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {metric.label}
      </Typography>

      {/* Before bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
        <Box sx={{ flex: 1 }}>
          <AnimatedBar
            value={metric.beforeValue}
            color="#EF4444"
            delay={baseDelay}
            label={metric.beforeLabel}
          />
        </Box>
      </Box>

      {/* After bar */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ flex: 1 }}>
          <AnimatedBar
            value={metric.afterValue}
            color="#10B981"
            delay={baseDelay + 0.3}
            label={metric.afterLabel}
          />
        </Box>
      </Box>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// SavingsBadge with count-up
// ---------------------------------------------------------------------------

function SavingsBadge({
  savingsValue,
  savingsSubtext,
}: {
  savingsValue: string;
  savingsSubtext: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const animatedValue = useCountUp(savingsValue, isInView, 2200);

  return (
    <Box
      ref={ref}
      sx={{
        textAlign: "center",
        py: 2.5,
        px: 2,
        mt: 1,
        borderRadius: 3,
        background: "linear-gradient(135deg, rgba(93,63,211,0.08) 0%, rgba(16,185,129,0.08) 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 120,
          height: 120,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(93,63,211,0.25) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <EmojiEventsIcon
        sx={{ fontSize: 28, color: "#F59E0B", mb: 0.5 }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "2rem", md: "2.4rem" },
          background: "linear-gradient(135deg, #5D3FD3, #10B981)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          lineHeight: 1.1,
          position: "relative",
          zIndex: 1,
        }}
      >
        {animatedValue}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6B7280",
          fontWeight: 600,
          mt: 0.5,
          position: "relative",
          zIndex: 1,
        }}
      >
        {savingsSubtext}
      </Typography>
    </Box>
  );
}

// ---------------------------------------------------------------------------
// ClientCard
// ---------------------------------------------------------------------------

function ClientCard({
  client,
  index,
}: {
  client: ClientCase;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={{ height: "100%" }}
    >
      <Box
        sx={{
          height: "100%",
          borderRadius: 4,
          bgcolor: "#FFFFFF",
          boxShadow:
            "0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05)",
          border: "1px solid rgba(93,63,211,0.08)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow:
              "0 20px 40px -12px rgba(93,63,211,0.15), 0 8px 16px -8px rgba(0,0,0,0.08)",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            pt: 2.5,
            pb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                color: "#1F2937",
                lineHeight: 1.3,
              }}
            >
              {client.name}
            </Typography>
          </Box>
          <Chip
            label={client.type}
            size="small"
            sx={{
              bgcolor: `${client.typeColor}15`,
              color: client.typeColor,
              fontWeight: 700,
              fontSize: "0.7rem",
              letterSpacing: "0.05em",
              height: 26,
              border: `1px solid ${client.typeColor}30`,
            }}
          />
        </Box>

        {/* Before / After Labels */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            px: 3,
            pt: 2,
            pb: 0.5,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <CancelOutlinedIcon
              sx={{ fontSize: 15, color: "#EF4444" }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "#EF4444",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Antes
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              ml: 2,
            }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 15, color: "#10B981" }}
            />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                color: "#10B981",
                fontSize: "0.7rem",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Después
            </Typography>
          </Box>
        </Box>

        {/* Metrics */}
        <Box sx={{ px: 3, pt: 1, pb: 1, flex: 1 }}>
          {client.metrics.map((metric, i) => (
            <MetricRowComponent key={metric.label} metric={metric} index={i} />
          ))}
        </Box>

        {/* Savings */}
        <Box sx={{ px: 3, pb: 3 }}>
          <SavingsBadge
            savingsValue={client.savingsValue}
            savingsSubtext={client.savingsSubtext}
          />
        </Box>
      </Box>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function ClientResults() {
  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "573207269417";
    const message = encodeURIComponent(
      "Hola Yakeline, vi los resultados de tus clientes y quiero una asesoría para mi caso."
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, sm: 3, md: 4 },
        background:
          "linear-gradient(180deg, #F5F3FF 0%, #FAFAFA 40%, #F0FDF4 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(93,63,211,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -80,
          left: -80,
          width: 350,
          height: 350,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 1200, mx: "auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Chip
              icon={<TrendingUpIcon sx={{ fontSize: 16 }} />}
              label="CASOS DE EXITO"
              sx={{
                mb: 2,
                bgcolor: "rgba(93,63,211,0.08)",
                color: "#5D3FD3",
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                height: 32,
                border: "1px solid rgba(93,63,211,0.15)",
                "& .MuiChip-icon": {
                  color: "#5D3FD3",
                },
              }}
            />

            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                color: "#1F2937",
                lineHeight: 1.2,
                mb: 1.5,
              }}
            >
              Resultados{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #5D3FD3, #A78BFA)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Reales
              </Box>{" "}
              de Nuestros Clientes
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6B7280",
                maxWidth: 600,
                mx: "auto",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                lineHeight: 1.7,
              }}
            >
              Cada caso es una historia de transformación financiera. Estos son
              los resultados que logramos juntos.
            </Typography>
          </Box>
        </motion.div>

        {/* Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
              lg: "1fr 1fr 1fr",
            },
            gap: { xs: 3, md: 3.5 },
            mb: { xs: 6, md: 8 },
          }}
        >
          {clientCases.map((client, index) => (
            <ClientCard key={client.name} client={client} index={index} />
          ))}
        </Box>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Box
            sx={{
              textAlign: "center",
              py: { xs: 4, md: 5 },
              px: { xs: 3, md: 5 },
              borderRadius: 4,
              background:
                "linear-gradient(135deg, rgba(93,63,211,0.04) 0%, rgba(16,185,129,0.04) 100%)",
              border: "1px solid rgba(93,63,211,0.08)",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.3rem", md: "1.6rem" },
                color: "#1F2937",
                mb: 1,
              }}
            >
              Quieres resultados{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #5D3FD3, #10B981)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                asi
              </Box>
              ?
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#6B7280",
                mb: 3,
                fontSize: { xs: "0.9rem", md: "1rem" },
              }}
            >
              Agenda tu consulta gratuita y descubre cuanto puedes ahorrar.
            </Typography>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{ display: "inline-block" }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                onClick={handleWhatsAppClick}
                sx={{
                  background:
                    "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: { xs: "0.95rem", md: "1.05rem" },
                  px: { xs: 4, md: 5 },
                  py: 1.5,
                  borderRadius: 50,
                  textTransform: "none",
                  boxShadow:
                    "0 8px 24px -4px rgba(37,211,102,0.35)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #22C55E 0%, #0F766E 100%)",
                    boxShadow:
                      "0 12px 32px -4px rgba(37,211,102,0.45)",
                  },
                }}
              >
                Hablar con Yakeline
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
