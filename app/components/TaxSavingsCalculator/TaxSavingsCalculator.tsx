"use client";

import { useState, useMemo } from "react";
import { Box, Typography, Container, Slider, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

function formatCOP(value: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

const revenueMarks = [
  { value: 5, label: "$5M" },
  { value: 20, label: "$20M" },
  { value: 50, label: "$50M" },
  { value: 100, label: "$100M" },
  { value: 200, label: "$200M" },
];

export default function TaxSavingsCalculator() {
  const [revenue, setRevenue] = useState(30); // In millions COP

  const calculations = useMemo(() => {
    const revenueAmount = revenue * 1_000_000;
    // Tiered savings rate: higher revenue = slightly lower percentage but higher absolute savings
    const savingsRate = revenue <= 20 ? 0.25 : revenue <= 50 ? 0.22 : revenue <= 100 ? 0.20 : 0.18;
    const estimatedTax = revenueAmount * 0.35; // Approximate Colombian tax rate
    const optimizedTax = estimatedTax * (1 - savingsRate);
    const savings = estimatedTax - optimizedTax;
    const annualSavings = savings * 12;

    return {
      monthlyRevenue: revenueAmount,
      estimatedTax,
      optimizedTax,
      monthlySavings: savings,
      annualSavings,
      savingsPercentage: Math.round(savingsRate * 100),
    };
  }, [revenue]);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #F8F6FF 0%, #FFFFFF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93, 63, 211, 0.06) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 70%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 6 } }}>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 3,
                fontSize: "0.85rem",
                display: "block",
                mb: 1,
              }}
            >
              CALCULADORA DE AHORRO
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              Descubre cuánto puedes{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #5D3FD3 0%, #F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ahorrar en impuestos
              </span>
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "1rem", md: "1.1rem" },
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Mueve el control para ver una estimación de ahorro basada en tu facturación mensual.
            </Typography>
          </Box>

          {/* Calculator Card */}
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              boxShadow: "0 20px 60px rgba(93, 63, 211, 0.08), 0 4px 16px rgba(0,0,0,0.04)",
              border: "1px solid rgba(93, 63, 211, 0.06)",
            }}
          >
            {/* Slider Section */}
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  color: "#374151",
                  mb: 1,
                }}
              >
                Tu facturación mensual estimada
              </Typography>
              <motion.div
                key={revenue}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: { xs: "1.8rem", md: "2.4rem" },
                    color: "#5D3FD3",
                    mb: 3,
                  }}
                >
                  {formatCOP(revenue * 1_000_000)}
                </Typography>
              </motion.div>

              <Slider
                value={revenue}
                onChange={(_, newValue) => setRevenue(newValue as number)}
                min={5}
                max={200}
                step={5}
                marks={revenueMarks}
                sx={{
                  color: "#5D3FD3",
                  height: 8,
                  "& .MuiSlider-track": {
                    background: "linear-gradient(90deg, #5D3FD3, #7C5CE7)",
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 24,
                    height: 24,
                    bgcolor: "white",
                    border: "3px solid #5D3FD3",
                    boxShadow: "0 4px 12px rgba(93, 63, 211, 0.3)",
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0 4px 20px rgba(93, 63, 211, 0.4)",
                    },
                  },
                  "& .MuiSlider-rail": {
                    bgcolor: "#E8E0F7",
                  },
                  "& .MuiSlider-markLabel": {
                    fontSize: "0.75rem",
                    color: "#9CA3AF",
                  },
                }}
              />
            </Box>

            {/* Results Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                gap: { xs: 2, md: 3 },
                mb: 4,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`tax-${revenue}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#FEF2F2",
                      border: "1px solid #FECACA",
                      textAlign: "center",
                    }}
                  >
                    <TrendingDownRoundedIcon sx={{ color: "#EF4444", fontSize: 28, mb: 0.5 }} />
                    <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                      Sin optimizar
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        color: "#DC2626",
                      }}
                    >
                      {formatCOP(calculations.estimatedTax)}
                    </Typography>
                  </Box>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`optimized-${revenue}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      bgcolor: "#F0FDF4",
                      border: "1px solid #BBF7D0",
                      textAlign: "center",
                    }}
                  >
                    <AccountBalanceWalletRoundedIcon sx={{ color: "#22C55E", fontSize: 28, mb: 0.5 }} />
                    <Typography sx={{ fontSize: "0.75rem", color: "#9CA3AF", fontWeight: 500 }}>
                      Con Yakeline
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        color: "#16A34A",
                      }}
                    >
                      {formatCOP(calculations.optimizedTax)}
                    </Typography>
                  </Box>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`savings-${revenue}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <Box
                    sx={{
                      p: 2.5,
                      borderRadius: 3,
                      background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                      textAlign: "center",
                      boxShadow: "0 8px 20px rgba(93, 63, 211, 0.25)",
                    }}
                  >
                    <SavingsRoundedIcon sx={{ color: "#FCD34D", fontSize: 28, mb: 0.5 }} />
                    <Typography sx={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                      Tu ahorro mensual
                    </Typography>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", md: "1.3rem" },
                        color: "white",
                      }}
                    >
                      {formatCOP(calculations.monthlySavings)}
                    </Typography>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </Box>

            {/* Annual Highlight */}
            <motion.div
              key={`annual-${revenue}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#FFFBEB",
                  border: "1px solid #FDE68A",
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "#92400E",
                    fontWeight: 500,
                    mb: 0.5,
                  }}
                >
                  Ahorro estimado anual con planeación tributaria
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    color: "#B45309",
                  }}
                >
                  {formatCOP(calculations.annualSavings)}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    color: "#92400E",
                    opacity: 0.7,
                    mt: 0.5,
                  }}
                >
                  Hasta {calculations.savingsPercentage}% de optimización fiscal
                </Typography>
              </Box>
            </motion.div>

            {/* CTA */}
            <Box sx={{ textAlign: "center" }}>
              <Button
                component="a"
                href={`https://wa.me/573207269417?text=${encodeURIComponent(
                  `Hola Yakeline, facturo aproximadamente ${formatCOP(calculations.monthlyRevenue)} mensuales y me gustaría optimizar mis impuestos. ¿Podemos agendar una consulta?`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: 50,
                  px: 5,
                  py: 1.8,
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "none",
                  background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                  boxShadow: "0 12px 30px rgba(93, 63, 211, 0.3)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #4C1D95 0%, #5D3FD3 100%)",
                    boxShadow: "0 16px 40px rgba(93, 63, 211, 0.4)",
                  },
                }}
              >
                Quiero optimizar mis impuestos
              </Button>
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: "#9CA3AF",
                  mt: 1.5,
                }}
              >
                * Estimación referencial. El ahorro real depende de tu situación fiscal específica.
              </Typography>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
