"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Container,
  Slider,
  Button,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import { motion, useReducedMotion, animate } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PercentRoundedIcon from "@mui/icons-material/PercentRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// ─── Constantes UVT ──────────────────────────────────────────────────────────
// TODO: Confirmar el valor oficial de la UVT 2026 con la resolucion de la DIAN
// antes de usar en calculos definitivos.
const UVT_2026 = 52076; // COP -- valor UVT 2026 (verificar con la resolucion oficial DIAN)

const WHATSAPP_NUMBER = "573207269417";

// Rango del control (renta liquida gravable anual en COP).
const MIN_COP = 0;
const MAX_COP = 2_000_000_000;
const STEP_COP = 1_000_000;

// ─── Tabla de tramos (Art. 241 ET) ───────────────────────────────────────────
// El impuesto se expresa en UVT: tax = (RLG - fromUvt) * rate + baseUvt.
// RLG = renta liquida gravable, tambien en UVT.
interface Bracket {
  lowerUvt: number;
  upperUvt: number; // Infinity en el ultimo tramo
  rate: number; // tarifa marginal (decimal)
  fromUvt: number; // umbral que se resta
  baseUvt: number; // impuesto acumulado de tramos anteriores (UVT)
  label: string; // "19%" ...
}

const BRACKETS: Bracket[] = [
  { lowerUvt: 0, upperUvt: 1090, rate: 0, fromUvt: 0, baseUvt: 0, label: "0%" },
  { lowerUvt: 1090, upperUvt: 1700, rate: 0.19, fromUvt: 1090, baseUvt: 0, label: "19%" },
  { lowerUvt: 1700, upperUvt: 4100, rate: 0.28, fromUvt: 1700, baseUvt: 116, label: "28%" },
  { lowerUvt: 4100, upperUvt: 8670, rate: 0.33, fromUvt: 4100, baseUvt: 788, label: "33%" },
  { lowerUvt: 8670, upperUvt: 18970, rate: 0.35, fromUvt: 8670, baseUvt: 2296, label: "35%" },
  { lowerUvt: 18970, upperUvt: 31000, rate: 0.37, fromUvt: 18970, baseUvt: 5901, label: "37%" },
  { lowerUvt: 31000, upperUvt: Infinity, rate: 0.39, fromUvt: 31000, baseUvt: 10352, label: "39%" },
];

// Cota superior visual para el ultimo tramo (sin limite real).
const TOP_BRACKET_DISPLAY_UVT = 45000;

// Progresion de opacidad para colorear los tramos dentro de la familia de marca.
const SEGMENT_OPACITY = [0.12, 0.25, 0.38, 0.5, 0.63, 0.78, 0.92];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function formatUVT(value: number): string {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(
    Math.round(value)
  );
}

function bracketRangeLabel(b: Bracket): string {
  if (b.upperUvt === Infinity) {
    return `> ${formatUVT(b.lowerUvt)} UVT`;
  }
  return `${formatUVT(b.lowerUvt)} – ${formatUVT(b.upperUvt)} UVT`;
}

// Devuelve el impuesto en UVT y el indice del tramo marginal para una RLG (UVT).
function computeTax(rlgUvt: number): { taxUvt: number; bracketIndex: number } {
  for (let i = BRACKETS.length - 1; i >= 0; i--) {
    const b = BRACKETS[i];
    if (rlgUvt >= b.lowerUvt) {
      const taxUvt = Math.max(0, (rlgUvt - b.fromUvt) * b.rate + b.baseUvt);
      return { taxUvt, bracketIndex: i };
    }
  }
  return { taxUvt: 0, bracketIndex: 0 };
}

// ─── Numero animado ──────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  format,
  reduce,
}: {
  value: number;
  format: (n: number) => string;
  reduce: boolean;
}) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      prevRef.current = value;
      return;
    }
    const controls = animate(prevRef.current, value, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(latest),
    });
    prevRef.current = value;
    return () => controls.stop();
  }, [value, reduce]);

  return <>{format(display)}</>;
}

// ─── Componente principal ────────────────────────────────────────────────────

export default function UvtBracketVisualizer() {
  const reduce = useReducedMotion() ?? false;
  const [rlgCop, setRlgCop] = useState(100_000_000); // renta liquida gravable anual (COP)

  const result = useMemo(() => {
    const rlgUvt = rlgCop / UVT_2026;
    const { taxUvt, bracketIndex } = computeTax(rlgUvt);
    const taxCop = taxUvt * UVT_2026;
    const effectiveRate = rlgCop > 0 ? taxCop / rlgCop : 0;
    const marginalRate = BRACKETS[bracketIndex].rate;
    return { rlgUvt, taxUvt, taxCop, effectiveRate, marginalRate, bracketIndex };
  }, [rlgCop]);

  // Posicion del marcador (%) sobre la barra de 7 segmentos iguales.
  const markerPct = useMemo(() => {
    const segmentWidth = 100 / BRACKETS.length;
    const b = BRACKETS[result.bracketIndex];
    const upper = b.upperUvt === Infinity ? TOP_BRACKET_DISPLAY_UVT : b.upperUvt;
    const span = upper - b.lowerUvt;
    let fracWithin = span > 0 ? (result.rlgUvt - b.lowerUvt) / span : 0;
    fracWithin = Math.max(0, Math.min(1, fracWithin));
    return (result.bracketIndex + fracWithin) * segmentWidth;
  }, [result.bracketIndex, result.rlgUvt]);

  const handleNumericChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, "");
    const parsed = digits === "" ? 0 : Number(digits);
    if (Number.isNaN(parsed)) return;
    setRlgCop(Math.max(MIN_COP, Math.min(MAX_COP, parsed)));
  };

  const whatsappUrl = useMemo(() => {
    const text = `Hola Yakeline, use el visualizador de renta por tramos con una renta liquida gravable anual de ${formatCOP(
      rlgCop
    )} (impuesto ilustrativo ${formatCOP(
      result.taxCop
    )}). Quiero calcular mi renta real con deducciones y rentas exentas. ¿Podemos agendar una asesoria?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [rlgCop, result.taxCop]);

  const rlgMarks = [
    { value: 0, label: "$0" },
    { value: 500_000_000, label: "$500M" },
    { value: 1_000_000_000, label: "$1.000M" },
    { value: 1_500_000_000, label: "$1.500M" },
    { value: 2_000_000_000, label: "$2.000M" },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      {/* Adornos decorativos */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 250,
          height: 250,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Encabezado */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Chip
              label="IMPUESTO DE RENTA · EDUCATIVO"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "0.72rem",
                letterSpacing: 1.5,
                background:
                  "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-light) 100%)",
                color: "#fff",
                height: 32,
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.6rem" },
                lineHeight: 1.25,
                color: "var(--text)",
                mb: 1.5,
              }}
            >
              Cómo se calcula tu renta{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(90deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                por tramos (UVT)
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "var(--text-subtle)",
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              El impuesto de renta de personas naturales es progresivo: cada tramo
              de tu renta líquida gravable paga una tarifa distinta. Mueve el
              control y observa cómo se arma el cálculo.
            </Typography>

            {/* Valor UVT */}
            <Chip
              label={`Valor UVT 2026: ${formatCOP(UVT_2026)}`}
              variant="outlined"
              sx={{
                mt: 2.5,
                fontWeight: 600,
                fontSize: "0.82rem",
                color: "var(--brand-primary)",
                borderColor: "rgba(var(--brand-primary-rgb), 0.35)",
                bgcolor: "rgba(var(--brand-primary-rgb), 0.04)",
              }}
            />
          </Box>

          {/* Tarjeta */}
          <Box
            sx={{
              bgcolor: "var(--surface)",
              borderRadius: "var(--r-lg)",
              p: { xs: 3, md: 5 },
              boxShadow: "var(--shadow-md)",
              border: "1px solid rgba(var(--brand-primary-rgb), 0.06)",
            }}
          >
            {/* Control */}
            <Box sx={{ mb: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: { xs: "flex-start", sm: "flex-end" },
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1.5,
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "var(--text-muted)",
                      mb: 0.5,
                    }}
                  >
                    Renta líquida gravable anual
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                      fontSize: { xs: "1.7rem", md: "2.2rem" },
                      color: "var(--brand-primary)",
                      lineHeight: 1.1,
                    }}
                  >
                    <AnimatedNumber value={rlgCop} format={formatCOP} reduce={reduce} />
                  </Typography>
                  <Typography sx={{ fontSize: "0.85rem", color: "var(--text-subtle)", mt: 0.25 }}>
                    ≈ {formatUVT(result.rlgUvt)} UVT
                  </Typography>
                </Box>

                {/* Entrada numerica opcional */}
                <TextField
                  label="Escribir monto"
                  value={rlgCop === 0 ? "" : formatUVT(rlgCop)}
                  onChange={(e) => handleNumericChange(e.target.value)}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                  inputProps={{
                    inputMode: "numeric",
                  }}
                  sx={{
                    width: { xs: "100%", sm: 190 },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2.5,
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "var(--brand-primary)",
                      },
                    },
                    "& label.Mui-focused": { color: "var(--brand-primary)" },
                  }}
                />
              </Box>

              <Slider
                value={rlgCop}
                onChange={(_, newValue) => setRlgCop(newValue as number)}
                min={MIN_COP}
                max={MAX_COP}
                step={STEP_COP}
                marks={rlgMarks}
                aria-label="Renta líquida gravable anual en pesos colombianos"
                getAriaValueText={(v) => formatCOP(v)}
                valueLabelDisplay="off"
                sx={{
                  color: "var(--brand-primary)",
                  height: 8,
                  "& .MuiSlider-track": {
                    background:
                      "linear-gradient(90deg, var(--brand-primary), var(--brand-primary-strong))",
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 24,
                    height: 24,
                    bgcolor: "white",
                    border: "3px solid var(--brand-primary)",
                    boxShadow: "0 4px 12px rgba(var(--brand-primary-rgb), 0.3)",
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0 4px 20px rgba(var(--brand-primary-rgb), 0.4)",
                    },
                  },
                  "& .MuiSlider-rail": {
                    bgcolor: "rgba(var(--brand-primary-rgb), 0.12)",
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "0.72rem",
                    color: "var(--text-subtle)",
                  },
                }}
              />
            </Box>

            {/* Resultados */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 2, md: 3 },
                mb: 4,
              }}
            >
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "var(--r-md)",
                  textAlign: "center",
                  background:
                    "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-strong) 100%)",
                  boxShadow: "0 8px 20px rgba(var(--brand-primary-rgb), 0.25)",
                }}
              >
                <ReceiptLongRoundedIcon
                  sx={{ color: "#FCD34D", fontSize: 28, mb: 0.5 }}
                />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 500,
                  }}
                >
                  Impuesto estimado
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.15rem", md: "1.35rem" },
                    color: "white",
                  }}
                >
                  <AnimatedNumber
                    value={result.taxCop}
                    format={formatCOP}
                    reduce={reduce}
                  />
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "var(--r-md)",
                  textAlign: "center",
                  bgcolor: "rgba(var(--brand-primary-rgb), 0.05)",
                  border: "1px solid rgba(var(--brand-primary-rgb), 0.12)",
                }}
              >
                <PercentRoundedIcon
                  sx={{ color: "var(--brand-primary)", fontSize: 28, mb: 0.5 }}
                />
                <Typography
                  sx={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 500 }}
                >
                  Tarifa efectiva
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.15rem", md: "1.35rem" },
                    color: "var(--brand-primary-dark)",
                  }}
                >
                  <AnimatedNumber
                    value={result.effectiveRate * 100}
                    format={(n) => `${n.toFixed(1)}%`}
                    reduce={reduce}
                  />
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "var(--r-md)",
                  textAlign: "center",
                  bgcolor: "rgba(var(--brand-accent-rgb), 0.08)",
                  border: "1px solid rgba(var(--brand-accent-rgb), 0.25)",
                }}
              >
                <TrendingUpRoundedIcon
                  sx={{ color: "var(--brand-accent-dark)", fontSize: 28, mb: 0.5 }}
                />
                <Typography
                  sx={{ fontSize: "0.75rem", color: "var(--text-subtle)", fontWeight: 500 }}
                >
                  Tarifa marginal
                </Typography>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "1.15rem", md: "1.35rem" },
                    color: "var(--brand-accent-dark)",
                  }}
                >
                  <AnimatedNumber
                    value={result.marginalRate * 100}
                    format={(n) => `${Math.round(n)}%`}
                    reduce={reduce}
                  />
                </Typography>
              </Box>
            </Box>

            {/* Barra de tramos */}
            <Box sx={{ mb: 1.5 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  color: "var(--text-muted)",
                  mb: 1.5,
                }}
              >
                Los 7 tramos de la tarifa (Art. 241 ET)
              </Typography>

              <Box sx={{ position: "relative", pt: 3 }}>
                {/* Marcador de posicion */}
                <motion.div
                  aria-hidden="true"
                  animate={{ left: `${markerPct}%` }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 220, damping: 30 }
                  }
                  style={{
                    position: "absolute",
                    top: 0,
                    left: `${markerPct}%`,
                    bottom: 0,
                    width: 0,
                    zIndex: 2,
                    pointerEvents: "none",
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: -2,
                      left: "50%",
                      transform: "translateX(-50%)",
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      whiteSpace: "nowrap",
                      fontSize: "0.62rem",
                      fontWeight: 700,
                      color: "#fff",
                      bgcolor: "var(--brand-accent-dark)",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    }}
                  >
                    Tu renta
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 18,
                      bottom: 0,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 2,
                      bgcolor: "var(--brand-accent-dark)",
                    }}
                  />
                </motion.div>

                {/* Segmentos */}
                <Box
                  sx={{
                    display: "flex",
                    height: 40,
                    borderRadius: "var(--r-sm)",
                    overflow: "hidden",
                    border: "1px solid rgba(var(--brand-primary-rgb), 0.1)",
                  }}
                >
                  {BRACKETS.map((b, idx) => {
                    const isMarginal = idx === result.bracketIndex;
                    return (
                      <Box
                        key={b.label + idx}
                        sx={{
                          flex: 1,
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: `rgba(var(--brand-primary-rgb), ${SEGMENT_OPACITY[idx]})`,
                          borderRight:
                            idx < BRACKETS.length - 1
                              ? "1px solid rgba(255,255,255,0.5)"
                              : "none",
                          outline: isMarginal
                            ? "2px solid var(--brand-accent-dark)"
                            : "none",
                          outlineOffset: "-2px",
                          transition: "outline 0.2s ease",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "0.6rem", sm: "0.72rem" },
                            fontWeight: 700,
                            color: idx >= 3 ? "#fff" : "var(--brand-primary-dark)",
                          }}
                        >
                          {b.label}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* Leyenda de tramos */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 1,
                mb: 4,
              }}
            >
              {BRACKETS.map((b, idx) => {
                const isMarginal = idx === result.bracketIndex;
                return (
                  <Box
                    key={`legend-${b.label}-${idx}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      borderRadius: "var(--r-sm)",
                      bgcolor: isMarginal
                        ? "rgba(var(--brand-accent-rgb), 0.08)"
                        : "transparent",
                      border: isMarginal
                        ? "1px solid rgba(var(--brand-accent-rgb), 0.3)"
                        : "1px solid transparent",
                    }}
                  >
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        minWidth: 14,
                        borderRadius: "4px",
                        background: `rgba(var(--brand-primary-rgb), ${SEGMENT_OPACITY[idx]})`,
                        border: "1px solid rgba(var(--brand-primary-rgb), 0.15)",
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        color: "var(--brand-primary-dark)",
                        minWidth: 34,
                      }}
                    >
                      {b.label}
                    </Typography>
                    <Typography
                      sx={{ fontSize: "0.78rem", color: "var(--text-subtle)" }}
                    >
                      {bracketRangeLabel(b)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            {/* Disclaimer */}
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                alignItems: "flex-start",
                p: 2.5,
                borderRadius: "var(--r-md)",
                bgcolor: "rgba(245, 158, 11, 0.12)",
                border: "1px solid rgba(245, 158, 11, 0.28)",
                mb: 3,
              }}
            >
              <InfoOutlinedIcon sx={{ color: "#B45309", fontSize: 22, mt: 0.25 }} />
              <Typography
                sx={{ fontSize: "0.85rem", color: "#B45309", lineHeight: 1.6 }}
              >
                Cálculo ilustrativo del impuesto sobre la renta líquida gravable.
                Tu impuesto real depende de deducciones, rentas exentas y tu
                situación; agenda una asesoría.
              </Typography>
            </Box>

            {/* CTA */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                component="a"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 5,
                  py: 1.8,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  background:
                    "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-strong) 100%)",
                  boxShadow: "0 12px 30px rgba(var(--brand-primary-rgb), 0.3)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 100%)",
                    boxShadow: "0 16px 40px rgba(var(--brand-primary-rgb), 0.4)",
                  },
                }}
              >
                Quiero calcular mi renta real
              </Button>
              <Typography sx={{ fontSize: "0.75rem", color: "var(--text-subtle)", mt: 1.5 }}>
                * Estimación referencial basada en la tabla del Art. 241 ET y la
                UVT 2026. No sustituye una asesoría profesional.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
