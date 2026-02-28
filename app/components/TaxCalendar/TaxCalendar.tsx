"use client";

import { useState, useEffect, useMemo } from "react";
import { Box, Typography, Container, Button, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

interface TaxDeadline {
  id: string;
  name: string;
  description: string;
  date: Date;
  category: "renta" | "iva" | "retencion" | "exogena" | "gmf" | "otro";
}

const MONTH_NAMES_ES = [
  "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
  "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
];

const MONTH_FULL_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const CATEGORY_COLORS: Record<TaxDeadline["category"], string> = {
  renta: "#8B5CF6",
  iva: "#3B82F6",
  retencion: "#EC4899",
  exogena: "#14B8A6",
  gmf: "#F97316",
  otro: "#6B7280",
};

const CATEGORY_LABELS: Record<TaxDeadline["category"], string> = {
  renta: "Renta",
  iva: "IVA",
  retencion: "Retenci\u00f3n",
  exogena: "Ex\u00f3gena",
  gmf: "GMF",
  otro: "Otro",
};

// Colombian tax deadlines for 2026
const TAX_DEADLINES_2026: TaxDeadline[] = [
  // IVA Bimestral
  {
    id: "iva-bim-1",
    name: "IVA Bimestral - Ene/Feb",
    description: "Declaraci\u00f3n y pago del IVA correspondiente al primer bimestre de 2026.",
    date: new Date(2026, 2, 13), // Mar 13
    category: "iva",
  },
  {
    id: "iva-bim-2",
    name: "IVA Bimestral - Mar/Abr",
    description: "Declaraci\u00f3n y pago del IVA correspondiente al segundo bimestre de 2026.",
    date: new Date(2026, 4, 15), // May 15
    category: "iva",
  },
  {
    id: "iva-bim-3",
    name: "IVA Bimestral - May/Jun",
    description: "Declaraci\u00f3n y pago del IVA correspondiente al tercer bimestre de 2026.",
    date: new Date(2026, 6, 17), // Jul 17
    category: "iva",
  },
  {
    id: "iva-bim-4",
    name: "IVA Bimestral - Jul/Ago",
    description: "Declaraci\u00f3n y pago del IVA bimestral correspondiente al cuarto bimestre.",
    date: new Date(2026, 8, 11), // Sep 11
    category: "iva",
  },
  {
    id: "iva-bim-5",
    name: "IVA Bimestral - Sep/Oct",
    description: "Declaraci\u00f3n y pago del IVA correspondiente al quinto bimestre de 2026.",
    date: new Date(2026, 10, 13), // Nov 13
    category: "iva",
  },
  {
    id: "iva-bim-6",
    name: "IVA Bimestral - Nov/Dic",
    description: "Declaraci\u00f3n y pago del IVA correspondiente al sexto bimestre de 2026.",
    date: new Date(2027, 0, 15), // Jan 15, 2027
    category: "iva",
  },

  // Retenci\u00f3n en la fuente - monthly
  {
    id: "ret-feb",
    name: "Retenci\u00f3n en la Fuente - Enero",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a enero 2026.",
    date: new Date(2026, 1, 13), // Feb 13
    category: "retencion",
  },
  {
    id: "ret-mar",
    name: "Retenci\u00f3n en la Fuente - Febrero",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a febrero 2026.",
    date: new Date(2026, 2, 13), // Mar 13
    category: "retencion",
  },
  {
    id: "ret-apr",
    name: "Retenci\u00f3n en la Fuente - Marzo",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a marzo 2026.",
    date: new Date(2026, 3, 17), // Apr 17
    category: "retencion",
  },
  {
    id: "ret-may",
    name: "Retenci\u00f3n en la Fuente - Abril",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a abril 2026.",
    date: new Date(2026, 4, 15), // May 15
    category: "retencion",
  },
  {
    id: "ret-jun",
    name: "Retenci\u00f3n en la Fuente - Mayo",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a mayo 2026.",
    date: new Date(2026, 5, 12), // Jun 12
    category: "retencion",
  },
  {
    id: "ret-jul",
    name: "Retenci\u00f3n en la Fuente - Junio",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a junio 2026.",
    date: new Date(2026, 6, 17), // Jul 17
    category: "retencion",
  },
  {
    id: "ret-aug",
    name: "Retenci\u00f3n en la Fuente - Julio",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a julio 2026.",
    date: new Date(2026, 7, 14), // Aug 14
    category: "retencion",
  },
  {
    id: "ret-sep",
    name: "Retenci\u00f3n en la Fuente - Agosto",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a agosto 2026.",
    date: new Date(2026, 8, 11), // Sep 11
    category: "retencion",
  },
  {
    id: "ret-oct",
    name: "Retenci\u00f3n en la Fuente - Septiembre",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a septiembre 2026.",
    date: new Date(2026, 9, 16), // Oct 16
    category: "retencion",
  },
  {
    id: "ret-nov",
    name: "Retenci\u00f3n en la Fuente - Octubre",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a octubre 2026.",
    date: new Date(2026, 10, 13), // Nov 13
    category: "retencion",
  },
  {
    id: "ret-dec",
    name: "Retenci\u00f3n en la Fuente - Noviembre",
    description: "Declaraci\u00f3n mensual de retenci\u00f3n en la fuente correspondiente a noviembre 2026.",
    date: new Date(2026, 11, 11), // Dec 11
    category: "retencion",
  },

  // Informaci\u00f3n ex\u00f3gena
  {
    id: "exo-gdes",
    name: "Informaci\u00f3n Ex\u00f3gena - Grandes Contribuyentes",
    description: "Reporte de informaci\u00f3n ex\u00f3gena para grandes contribuyentes, a\u00f1o gravable 2025.",
    date: new Date(2026, 2, 27), // Mar 27
    category: "exogena",
  },
  {
    id: "exo-jur",
    name: "Informaci\u00f3n Ex\u00f3gena - Personas Jur\u00eddicas",
    description: "Reporte de informaci\u00f3n ex\u00f3gena para personas jur\u00eddicas, a\u00f1o gravable 2025.",
    date: new Date(2026, 3, 10), // Apr 10
    category: "exogena",
  },
  {
    id: "exo-nat",
    name: "Informaci\u00f3n Ex\u00f3gena - Personas Naturales",
    description: "Reporte de informaci\u00f3n ex\u00f3gena para personas naturales obligadas, a\u00f1o gravable 2025.",
    date: new Date(2026, 3, 24), // Apr 24
    category: "exogena",
  },

  // Declaraci\u00f3n de Renta Personas Naturales (NIT-based dates Aug-Oct 2026)
  {
    id: "renta-pn-1",
    name: "Renta Personas Naturales - NIT terminados en 01-02",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 01-02.",
    date: new Date(2026, 7, 11), // Aug 11
    category: "renta",
  },
  {
    id: "renta-pn-2",
    name: "Renta Personas Naturales - NIT terminados en 03-04",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 03-04.",
    date: new Date(2026, 7, 12), // Aug 12
    category: "renta",
  },
  {
    id: "renta-pn-3",
    name: "Renta Personas Naturales - NIT terminados en 05-06",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 05-06.",
    date: new Date(2026, 7, 14), // Aug 14
    category: "renta",
  },
  {
    id: "renta-pn-4",
    name: "Renta Personas Naturales - NIT terminados en 07-08",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 07-08.",
    date: new Date(2026, 7, 18), // Aug 18
    category: "renta",
  },
  {
    id: "renta-pn-5",
    name: "Renta Personas Naturales - NIT terminados en 09-10",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 09-10.",
    date: new Date(2026, 7, 19), // Aug 19
    category: "renta",
  },
  {
    id: "renta-pn-6",
    name: "Renta Personas Naturales - NIT terminados en 11-15",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 11-15.",
    date: new Date(2026, 7, 21), // Aug 21
    category: "renta",
  },
  {
    id: "renta-pn-7",
    name: "Renta Personas Naturales - NIT terminados en 16-20",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 16-20.",
    date: new Date(2026, 7, 25), // Aug 25
    category: "renta",
  },
  {
    id: "renta-pn-8",
    name: "Renta Personas Naturales - NIT terminados en 21-30",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 21-30.",
    date: new Date(2026, 8, 1), // Sep 1
    category: "renta",
  },
  {
    id: "renta-pn-9",
    name: "Renta Personas Naturales - NIT terminados en 31-40",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 31-40.",
    date: new Date(2026, 8, 4), // Sep 4
    category: "renta",
  },
  {
    id: "renta-pn-10",
    name: "Renta Personas Naturales - NIT terminados en 41-50",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 41-50.",
    date: new Date(2026, 8, 8), // Sep 8
    category: "renta",
  },
  {
    id: "renta-pn-11",
    name: "Renta Personas Naturales - NIT terminados en 51-60",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 51-60.",
    date: new Date(2026, 8, 11), // Sep 11
    category: "renta",
  },
  {
    id: "renta-pn-12",
    name: "Renta Personas Naturales - NIT terminados en 61-70",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 61-70.",
    date: new Date(2026, 8, 15), // Sep 15
    category: "renta",
  },
  {
    id: "renta-pn-13",
    name: "Renta Personas Naturales - NIT terminados en 71-80",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 71-80.",
    date: new Date(2026, 8, 18), // Sep 18
    category: "renta",
  },
  {
    id: "renta-pn-14",
    name: "Renta Personas Naturales - NIT terminados en 81-90",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 81-90.",
    date: new Date(2026, 8, 22), // Sep 22
    category: "renta",
  },
  {
    id: "renta-pn-15",
    name: "Renta Personas Naturales - NIT terminados en 91-00",
    description: "Declaraci\u00f3n de renta personas naturales a\u00f1o gravable 2025. \u00daltimos d\u00edgitos NIT 91-00.",
    date: new Date(2026, 9, 2), // Oct 2
    category: "renta",
  },

  // GMF
  {
    id: "gmf-2026",
    name: "GMF (4x1000) - Declaraci\u00f3n Anual",
    description: "Declaraci\u00f3n del Gravamen a los Movimientos Financieros. Aplica a entidades financieras.",
    date: new Date(2026, 3, 24), // Apr 24
    category: "gmf",
  },
];

function getDaysRemaining(targetDate: Date): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const diffMs = target.getTime() - today.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

function getUrgencyColor(daysRemaining: number): string {
  if (daysRemaining < 0) return "#6B7280";
  if (daysRemaining < 30) return "#EF4444";
  if (daysRemaining < 60) return "#F59E0B";
  return "#22C55E";
}

function getUrgencyLabel(daysRemaining: number): string {
  if (daysRemaining < 0) return "Vencido";
  if (daysRemaining === 0) return "Hoy";
  if (daysRemaining === 1) return "Ma\u00f1ana";
  if (daysRemaining < 30) return "Urgente";
  if (daysRemaining < 60) return "Pr\u00f3ximo";
  return "A tiempo";
}

// Animated countdown number component
function CountdownNumber({ value, label }: { value: number; label: string }) {
  return (
    <Box sx={{ textAlign: "center" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: { xs: "1.6rem", md: "2rem" },
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            {value}
          </Typography>
        </motion.div>
      </AnimatePresence>
      <Typography
        sx={{
          fontSize: "0.6rem",
          color: "rgba(255,255,255,0.5)",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: 1,
          mt: 0.3,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

export default function TaxCalendar() {
  const [now, setNow] = useState<Date>(new Date());
  const [activeFilter, setActiveFilter] = useState<TaxDeadline["category"] | "all">("all");

  // Update current time every minute for countdown accuracy
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const upcomingDeadlines = useMemo(() => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    return TAX_DEADLINES_2026
      .filter((d) => {
        const target = new Date(d.date.getFullYear(), d.date.getMonth(), d.date.getDate());
        return target.getTime() >= today.getTime();
      })
      .filter((d) => activeFilter === "all" || d.category === activeFilter)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 8);
  }, [now, activeFilter]);

  const filterCategories: Array<{ key: TaxDeadline["category"] | "all"; label: string }> = [
    { key: "all", label: "Todos" },
    { key: "renta", label: "Renta" },
    { key: "iva", label: "IVA" },
    { key: "retencion", label: "Retenci\u00f3n" },
    { key: "exogena", label: "Ex\u00f3gena" },
    { key: "gmf", label: "GMF" },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(180deg, #0F0A1A 0%, #1A1030 50%, #0F0A1A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decorative glows */}
      <Box
        sx={{
          position: "absolute",
          top: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93, 63, 211, 0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245, 158, 11, 0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            {/* Badge */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(245, 158, 11, 0.3)",
                  "0 0 40px rgba(245, 158, 11, 0.5)",
                  "0 0 20px rgba(245, 158, 11, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block", borderRadius: 50 }}
            >
              <Chip
                icon={<WarningAmberRoundedIcon sx={{ color: "#0F0A1A !important", fontSize: 18 }} />}
                label="NO TE ATRASES"
                sx={{
                  bgcolor: "#F59E0B",
                  color: "#0F0A1A",
                  fontWeight: 800,
                  fontSize: "0.8rem",
                  letterSpacing: 2,
                  px: 2,
                  py: 2.5,
                  borderRadius: 50,
                  "& .MuiChip-label": { px: 1 },
                }}
              />
            </motion.div>

            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                lineHeight: 1.2,
                mt: 3,
                mb: 2,
                color: "#FFFFFF",
              }}
            >
              Calendario Tributario{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, #5D3FD3 0%, #F59E0B 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                2026
              </Box>
            </Typography>

            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Cumplir con las fechas tributarias es clave para evitar sanciones e intereses.
              Consulta los pr\u00f3ximos vencimientos y mantente al d\u00eda con tus obligaciones fiscales.
            </Typography>
          </Box>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 1,
              mb: { xs: 4, md: 6 },
            }}
          >
            {filterCategories.map((cat) => (
              <Chip
                key={cat.key}
                label={cat.label}
                clickable
                onClick={() => setActiveFilter(cat.key)}
                sx={{
                  bgcolor:
                    activeFilter === cat.key
                      ? cat.key === "all"
                        ? "#5D3FD3"
                        : CATEGORY_COLORS[cat.key as TaxDeadline["category"]]
                      : "rgba(255,255,255,0.06)",
                  color:
                    activeFilter === cat.key
                      ? "#FFFFFF"
                      : "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  border: "1px solid",
                  borderColor:
                    activeFilter === cat.key
                      ? "transparent"
                      : "rgba(255,255,255,0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    bgcolor:
                      activeFilter === cat.key
                        ? undefined
                        : "rgba(255,255,255,0.1)",
                  },
                }}
              />
            ))}
          </Box>
        </motion.div>

        {/* Timeline Cards */}
        <Box
          sx={{
            position: "relative",
            maxWidth: 900,
            mx: "auto",
          }}
        >
          {/* Timeline vertical line (desktop only) */}
          <Box
            sx={{
              display: { xs: "none", md: "block" },
              position: "absolute",
              left: 40,
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(180deg, rgba(93, 63, 211, 0.4) 0%, rgba(245, 158, 11, 0.2) 100%)",
            }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {upcomingDeadlines.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 6 }}>
                  <CalendarMonthRoundedIcon
                    sx={{ fontSize: 48, color: "rgba(255,255,255,0.2)", mb: 2 }}
                  />
                  <Typography sx={{ color: "rgba(255,255,255,0.4)", fontSize: "1.1rem" }}>
                    No hay vencimientos pr\u00f3ximos en esta categor\u00eda.
                  </Typography>
                </Box>
              ) : (
                upcomingDeadlines.map((deadline, index) => {
                  const daysRemaining = getDaysRemaining(deadline.date);
                  const urgencyColor = getUrgencyColor(daysRemaining);
                  const urgencyLabel = getUrgencyLabel(daysRemaining);
                  const isUrgent = daysRemaining >= 0 && daysRemaining < 30;

                  return (
                    <motion.div
                      key={deadline.id}
                      initial={{ opacity: 0, x: -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          gap: { xs: 2, md: 3 },
                          mb: { xs: 2.5, md: 3 },
                          position: "relative",
                          alignItems: "flex-start",
                        }}
                      >
                        {/* Timeline dot (desktop) */}
                        <Box
                          sx={{
                            display: { xs: "none", md: "flex" },
                            width: 80,
                            flexShrink: 0,
                            justifyContent: "center",
                            pt: 2.5,
                          }}
                        >
                          <motion.div
                            animate={
                              isUrgent
                                ? {
                                    boxShadow: [
                                      `0 0 8px ${urgencyColor}`,
                                      `0 0 20px ${urgencyColor}`,
                                      `0 0 8px ${urgencyColor}`,
                                    ],
                                  }
                                : {}
                            }
                            transition={
                              isUrgent
                                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                                : {}
                            }
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: urgencyColor,
                              border: "3px solid #0F0A1A",
                              position: "relative",
                              zIndex: 2,
                            }}
                          />
                        </Box>

                        {/* Card */}
                        <Box
                          component={motion.div}
                          whileHover={{ scale: 1.015, y: -2 }}
                          transition={{ duration: 0.2 }}
                          sx={{
                            flex: 1,
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: { xs: 2, sm: 2.5 },
                            p: { xs: 2.5, md: 3 },
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.04)",
                            backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            position: "relative",
                            overflow: "hidden",
                            cursor: "default",
                            transition: "border-color 0.3s ease",
                            "&:hover": {
                              borderColor: `${urgencyColor}40`,
                            },
                          }}
                        >
                          {/* Urgent glow overlay */}
                          {isUrgent && (
                            <motion.div
                              animate={{
                                opacity: [0.03, 0.08, 0.03],
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                              style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(135deg, ${urgencyColor}20 0%, transparent 60%)`,
                                pointerEvents: "none",
                              }}
                            />
                          )}

                          {/* Date Badge */}
                          <Box
                            sx={{
                              flexShrink: 0,
                              width: { xs: 64, sm: 72 },
                              height: { xs: 68, sm: 76 },
                              borderRadius: 2.5,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              background: `linear-gradient(135deg, ${urgencyColor}20 0%, ${urgencyColor}08 100%)`,
                              border: `1px solid ${urgencyColor}30`,
                              position: "relative",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "0.65rem",
                                fontWeight: 700,
                                color: urgencyColor,
                                letterSpacing: 1.5,
                                textTransform: "uppercase",
                                lineHeight: 1,
                              }}
                            >
                              {MONTH_NAMES_ES[deadline.date.getMonth()]}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "'Playfair Display', serif",
                                fontWeight: 800,
                                fontSize: "1.6rem",
                                color: "#FFFFFF",
                                lineHeight: 1.1,
                                mt: 0.2,
                              }}
                            >
                              {deadline.date.getDate()}
                            </Typography>
                          </Box>

                          {/* Content */}
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                mb: 0.5,
                                flexWrap: "wrap",
                              }}
                            >
                              <Chip
                                label={CATEGORY_LABELS[deadline.category]}
                                size="small"
                                sx={{
                                  bgcolor: `${CATEGORY_COLORS[deadline.category]}20`,
                                  color: CATEGORY_COLORS[deadline.category],
                                  fontWeight: 700,
                                  fontSize: "0.65rem",
                                  height: 22,
                                  border: `1px solid ${CATEGORY_COLORS[deadline.category]}30`,
                                }}
                              />
                              {/* Urgency indicator */}
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                }}
                              >
                                <motion.div
                                  animate={
                                    isUrgent
                                      ? { scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }
                                      : {}
                                  }
                                  transition={
                                    isUrgent
                                      ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                                      : {}
                                  }
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: "50%",
                                    backgroundColor: urgencyColor,
                                  }}
                                />
                                <Typography
                                  sx={{
                                    fontSize: "0.7rem",
                                    fontWeight: 600,
                                    color: urgencyColor,
                                  }}
                                >
                                  {urgencyLabel}
                                </Typography>
                              </Box>
                            </Box>

                            <Typography
                              sx={{
                                fontWeight: 700,
                                fontSize: { xs: "0.95rem", md: "1.05rem" },
                                color: "#FFFFFF",
                                lineHeight: 1.3,
                                mb: 0.5,
                              }}
                            >
                              {deadline.name}
                            </Typography>

                            <Typography
                              sx={{
                                fontSize: "0.82rem",
                                color: "rgba(255,255,255,0.45)",
                                lineHeight: 1.5,
                              }}
                            >
                              {deadline.description}
                            </Typography>
                          </Box>

                          {/* Countdown */}
                          <Box
                            sx={{
                              flexShrink: 0,
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              justifyContent: "center",
                              px: { xs: 0, sm: 1.5 },
                              minWidth: { sm: 100 },
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                gap: 1.5,
                                alignItems: "center",
                              }}
                            >
                              {daysRemaining >= 0 ? (
                                <>
                                  {daysRemaining >= 30 && (
                                    <CountdownNumber
                                      value={Math.floor(daysRemaining / 30)}
                                      label="meses"
                                    />
                                  )}
                                  <CountdownNumber
                                    value={daysRemaining >= 30 ? daysRemaining % 30 : daysRemaining}
                                    label={daysRemaining >= 30 ? "d\u00edas" : "d\u00edas"}
                                  />
                                </>
                              ) : (
                                <Typography
                                  sx={{
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                    color: "#6B7280",
                                  }}
                                >
                                  Vencido
                                </Typography>
                              )}
                            </Box>
                            <Typography
                              sx={{
                                fontSize: "0.6rem",
                                color: "rgba(255,255,255,0.3)",
                                mt: 0.5,
                                textAlign: "center",
                              }}
                            >
                              {MONTH_FULL_ES[deadline.date.getMonth()]} {deadline.date.getDate()}, {deadline.date.getFullYear()}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Box
            sx={{
              mt: { xs: 6, md: 8 },
              textAlign: "center",
              p: { xs: 4, md: 5 },
              borderRadius: 4,
              background: "rgba(93, 63, 211, 0.08)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(93, 63, 211, 0.15)",
              maxWidth: 700,
              mx: "auto",
            }}
          >
            <CalendarMonthRoundedIcon
              sx={{
                fontSize: 40,
                color: "#5D3FD3",
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.3rem", md: "1.7rem" },
                color: "#FFFFFF",
                mb: 1.5,
                lineHeight: 1.3,
              }}
            >
              \u00bfNo sabes cu\u00e1les aplican a ti?
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.5)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                mb: 3,
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Cada contribuyente tiene obligaciones diferentes.
              Te ayudo a identificar tus fechas clave y a preparar todo con tiempo.
            </Typography>
            <Button
              component="a"
              href={`https://wa.me/573207269417?text=${encodeURIComponent(
                "Hola Yakeline, quiero saber cu\u00e1les son mis fechas tributarias y c\u00f3mo prepararme. \u00bfPodemos hablar?"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderRadius: 50,
                px: { xs: 4, md: 5 },
                py: 1.8,
                fontSize: { xs: "0.95rem", md: "1rem" },
                fontWeight: 700,
                textTransform: "none",
                background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                color: "#FFFFFF",
                boxShadow: "0 12px 30px rgba(93, 63, 211, 0.35)",
                "&:hover": {
                  background: "linear-gradient(135deg, #4C1D95 0%, #5D3FD3 100%)",
                  boxShadow: "0 16px 40px rgba(93, 63, 211, 0.45)",
                },
              }}
            >
              Consultar mis fechas tributarias
            </Button>
            <Typography
              sx={{
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.3)",
                mt: 2,
              }}
            >
              * Las fechas son referenciales. Consulta el calendario oficial de la DIAN para tu caso espec\u00edfico.
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
