"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  LinearProgress,
  Chip,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import KeyRoundedIcon from "@mui/icons-material/KeyRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import SavingsRoundedIcon from "@mui/icons-material/SavingsRounded";
import FolderSpecialRoundedIcon from "@mui/icons-material/FolderSpecialRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import JsonLd from "@/app/components/JsonLd/JsonLd";

// ─── Contenido oficial del PDF (Checklist Declaración de Renta 2025) ─────────

export const PDF_URL = "/recursos/checklist-declaracion-renta-2025.pdf";
const WHATSAPP_NUMBER = "573207269417";
const STORAGE_KEY = "yc:checklist-renta-2025";

interface Section {
  id: string;
  title: string;
  hint?: string;
  icon: React.ReactElement;
  items: { id: string; label: string }[];
}

const SECTIONS: Section[] = [
  {
    id: "acceso",
    title: "Identificación y acceso a la plataforma",
    icon: <KeyRoundedIcon />,
    items: [
      { id: "rut", label: "RUT actualizado (dirección, correo, actividad económica, teléfono)" },
      { id: "firma", label: "Firma electrónica vigente" },
      { id: "muisca", label: "Usuario y contraseña MUISCA" },
    ],
  },
  {
    id: "patrimonio",
    title: "Patrimonio",
    hint: "Saldos al 31-12-2025",
    icon: <AccountBalanceRoundedIcon />,
    items: [
      { id: "extractos", label: "Extractos certificados de cuentas de ahorro, corrientes y CDT" },
      { id: "inversiones", label: "Certificados de inversiones fiduciarias, bonos, acciones" },
      { id: "predial", label: "Soportes: impuesto predial, escritura(s) de inmuebles" },
      { id: "vehiculos", label: "Factura de compra o tarjeta de propiedad de vehículos" },
      { id: "deudas", label: "Soportes de obligaciones y deudas (pagarés, créditos, leasing)" },
    ],
  },
  {
    id: "ingresos",
    title: "Ingresos recibidos en 2025",
    icon: <PaymentsRoundedIcon />,
    items: [
      { id: "retenciones", label: "Certificado de ingresos y retenciones (empleados)" },
      { id: "honorarios", label: "Certificados de honorarios/comisiones (independientes)" },
      { id: "rendimientos", label: "Certificados de rendimientos financieros" },
      { id: "dividendos", label: "Certificados de dividendos y participaciones" },
      { id: "cesantias", label: "Soportes de indemnizaciones, cesantías, pensiones, bonificaciones" },
    ],
  },
  {
    id: "deducciones",
    title: "Pagos que generan deducciones, rentas exentas o descuentos",
    icon: <SavingsRoundedIcon />,
    items: [
      { id: "vivienda", label: "Certificado de intereses de vivienda o leasing habitacional" },
      { id: "prepagada", label: "Certificado de medicina prepagada y seguros" },
      { id: "dependientes", label: "Certificación de dependientes (cónyuge, hijos, padres)" },
      { id: "afc", label: "Certificados de aportes voluntarios a pensiones y AFC" },
      { id: "donaciones", label: "Certificado de donaciones con derecho a descuento" },
      { id: "gmf", label: "Certificado del GMF – 4×1.000 pagado" },
      { id: "no-obligados", label: "Documentos soporte por compras a no obligados a facturar" },
    ],
  },
  {
    id: "complementaria",
    title: "Información complementaria",
    hint: "Si aplica",
    icon: <FolderSpecialRoundedIcon />,
    items: [
      { id: "conciliacion", label: "Formatos 2516/2517 de conciliación fiscal" },
      { id: "exterior", label: "Certificación de ingresos en el exterior y retenciones" },
      { id: "perdidas", label: "Soportes de pérdidas en bolsa, cripto o FIC" },
      { id: "formato490", label: "Recibos del formato 490 (anticipos o pagos parciales)" },
    ],
  },
];

const TOTAL_ITEMS = SECTIONS.reduce((sum, s) => sum + s.items.length, 0);

// ─── Hero: pila de papeles animada que representa el PDF ─────────────────────

const MOCK_LINES = [0.9, 0.7, 0.82, 0.6, 0.75, 0.66];

function PaperStack({ reduce }: { reduce: boolean }) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "relative",
        width: { xs: 240, sm: 290, md: 320 },
        mx: "auto",
        aspectRatio: "3 / 4",
      }}
    >
      {/* Hojas traseras */}
      {[
        { rotate: "-7deg", top: 18, opacity: 0.45 },
        { rotate: "5deg", top: 9, opacity: 0.7 },
      ].map((sheet) => (
        <Box
          key={sheet.rotate}
          sx={{
            position: "absolute",
            inset: 0,
            top: sheet.top,
            borderRadius: "18px",
            background: "var(--surface)",
            border: "1px solid rgba(var(--brand-primary-rgb), 0.12)",
            boxShadow: "var(--shadow-md)",
            transform: `rotate(${sheet.rotate})`,
            opacity: sheet.opacity,
          }}
        />
      ))}

      {/* Hoja principal */}
      <motion.div
        initial={reduce ? false : { y: 24, opacity: 0, rotate: -2 }}
        whileInView={reduce ? undefined : { y: 0, opacity: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 18,
          overflow: "hidden",
          background: "var(--surface)",
          border: "1px solid rgba(var(--brand-primary-rgb), 0.15)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Borde superior de marca */}
        <Box sx={{ height: 10, background: "var(--brand-gradient)" }} />

        <Box sx={{ p: { xs: 2.25, md: 3 }, flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: { xs: "0.82rem", md: "0.95rem" },
              color: "var(--text)",
              lineHeight: 1.3,
              mb: 2,
            }}
          >
            Checklist — Declaración de Renta 2025
          </Typography>

          {/* Renglones con chulos que aparecen en cascada */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, flex: 1 }}>
            {MOCK_LINES.map((width, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <motion.div
                  initial={reduce ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                  whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.18, duration: 0.28, ease: "backOut" }}
                  style={{
                    width: 18,
                    height: 18,
                    minWidth: 18,
                    borderRadius: 6,
                    background: "var(--brand-gradient)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckRoundedIcon sx={{ fontSize: 13, color: "#fff" }} />
                </motion.div>
                <Box
                  sx={{
                    height: 7,
                    borderRadius: "var(--r-pill)",
                    width: `${width * 100}%`,
                    background: "rgba(var(--brand-primary-rgb), 0.12)",
                  }}
                />
              </Box>
            ))}
          </Box>

          <Typography
            sx={{
              mt: 2,
              fontSize: "0.62rem",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--brand-primary)",
            }}
          >
            Yakelin Bustamante · Finanzas
          </Typography>
        </Box>
      </motion.div>

      {/* Insignia PDF flotante */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: -18, right: -16, zIndex: 2 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            px: 1.75,
            py: 1,
            borderRadius: "var(--r-pill)",
            background: "linear-gradient(135deg, var(--brand-accent), var(--brand-accent-dark))",
            color: "#fff",
            fontWeight: 800,
            fontSize: "0.8rem",
            letterSpacing: 0.5,
            boxShadow: "0 12px 30px rgba(var(--brand-accent-rgb), 0.45)",
          }}
        >
          <PictureAsPdfRoundedIcon sx={{ fontSize: 18 }} />
          PDF gratis
        </Box>
      </motion.div>
    </Box>
  );
}

// ─── Fila de checklist (mismo lenguaje visual del checklist del home) ─────────

function ChecklistRow({
  itemKey,
  label,
  checked,
  onToggle,
  reduce,
}: {
  itemKey: string;
  label: string;
  checked: boolean;
  onToggle: (key: string) => void;
  reduce: boolean;
}) {
  const inputId = `renta-${itemKey.replace(/[^a-z0-9]/gi, "-")}`;

  return (
    <Box
      component="label"
      htmlFor={inputId}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        p: { xs: 1.25, md: 1.5 },
        borderRadius: "14px",
        cursor: "pointer",
        border: checked
          ? "1.5px solid rgba(var(--brand-primary-rgb), 0.35)"
          : "1.5px solid rgba(var(--brand-primary-rgb), 0.08)",
        background: checked
          ? "rgba(var(--brand-primary-rgb), 0.05)"
          : "rgba(var(--surface-rgb), 0.72)",
        transition: "border-color 0.2s ease, background 0.2s ease",
        "&:hover": {
          borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
          background: "rgba(var(--brand-primary-rgb), 0.03)",
        },
        "& input:focus-visible + .yc-check": {
          outline: "3px solid rgba(var(--brand-primary-rgb), 0.4)",
          outlineOffset: 2,
        },
      }}
    >
      <input
        id={inputId}
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(itemKey)}
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0,
          margin: 0,
          pointerEvents: "none",
        }}
      />
      <Box
        className="yc-check"
        aria-hidden="true"
        sx={{
          width: 26,
          height: 26,
          minWidth: 26,
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: checked ? "none" : "2px solid rgba(var(--brand-primary-rgb), 0.3)",
          background: checked ? "var(--brand-gradient)" : "transparent",
          boxShadow: checked ? "0 4px 12px rgba(var(--brand-primary-rgb), 0.3)" : "none",
          transition: "background 0.2s ease, border 0.2s ease",
        }}
      >
        <AnimatePresence initial={false}>
          {checked && (
            <motion.span
              initial={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              animate={reduce ? { opacity: 1 } : { scale: 1, opacity: 1 }}
              exit={reduce ? { opacity: 0 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ display: "flex" }}
            >
              <CheckRoundedIcon sx={{ fontSize: 18, color: "#fff" }} />
            </motion.span>
          )}
        </AnimatePresence>
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "0.88rem", md: "0.95rem" },
          fontWeight: checked ? 600 : 500,
          color: checked ? "var(--brand-primary-dark)" : "var(--text-muted)",
          lineHeight: 1.4,
          textDecoration: checked ? "line-through" : "none",
          textDecorationColor: "rgba(var(--brand-primary-rgb), 0.4)",
          transition: "color 0.2s ease",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

// ─── Página completa ──────────────────────────────────────────────────────────

export default function ChecklistRenta() {
  const reduce = useReducedMotion() ?? false;

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          const clean: Record<string, boolean> = {};
          for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
            if (value === true) clean[key] = true;
          }
          setChecked(clean);
        }
      }
    } catch {
      // Storage corrupto o no disponible: se inicia con la lista vacía.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      setStorageError(true);
    }
  }, [checked, hydrated]);

  const checkedCount = useMemo(
    () => Object.values(checked).filter(Boolean).length,
    [checked]
  );
  const progress = (checkedCount / TOTAL_ITEMS) * 100;
  const allDone = checkedCount === TOTAL_ITEMS;

  const handleToggle = useCallback((key: string) => {
    setChecked((prev) => {
      const next = { ...prev };
      if (next[key]) {
        delete next[key];
      } else {
        next[key] = true;
      }
      return next;
    });
  }, []);

  const handleReset = useCallback(() => setChecked({}), []);
  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  const whatsappHref = useMemo(() => {
    const text =
      "Hola Yakeline, descargué el checklist de la declaración de renta 2025 y quiero agendar una asesoría para presentar mi declaración.";
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, []);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "DigitalDocument",
      name: "Checklist para entrega de documentos – Declaración de Renta 2025",
      description:
        "Lista de verificación gratuita con los documentos necesarios para presentar la declaración de renta 2025 en Colombia: RUT, patrimonio, ingresos, deducciones e información complementaria.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelincontadora.com"}/checklist-renta`,
      encodingFormat: "application/pdf",
      inLanguage: "es",
      isAccessibleForFree: true,
      author: {
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "https://yakelincontadora.com"}/#organization`,
      },
    }),
    []
  );

  return (
    <Box component="main" sx={{ background: "var(--bg)" }}>
      <JsonLd data={jsonLd} />

      {/* ── Hero ── */}
      <Box
        component="section"
        sx={{
          position: "relative",
          overflow: "hidden",
          pt: { xs: 14, md: 18 },
          pb: { xs: 8, md: 12 },
          background: "var(--tint-soft)",
        }}
      >
        {/* Blobs decorativos */}
        <Box
          sx={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -100,
            left: -100,
            width: 340,
            height: 340,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.07) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1.15fr 0.85fr" },
              gap: { xs: 6, md: 8 },
              alignItems: "center",
            }}
          >
            {/* Texto */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Chip
                icon={<ChecklistRoundedIcon />}
                label="RECURSO GRATUITO · AÑO GRAVABLE 2025"
                sx={{
                  mb: 2.5,
                  fontWeight: 700,
                  fontSize: "0.7rem",
                  letterSpacing: 1.5,
                  height: 32,
                  px: 1,
                  background: "var(--brand-gradient)",
                  color: "#fff",
                  "& .MuiChip-icon": { color: "#fff", fontSize: 18 },
                  "& .MuiChip-label": { px: 1 },
                }}
              />
              <Typography
                variant="h1"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: { xs: "2.1rem", sm: "2.7rem", md: "3.2rem" },
                  lineHeight: 1.15,
                  color: "var(--text)",
                  mb: 2,
                }}
              >
                El checklist definitivo para tu{" "}
                <Box
                  component="span"
                  sx={{
                    background:
                      "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  declaración de renta
                </Box>
              </Typography>
              <Typography
                sx={{
                  color: "var(--text-subtle)",
                  fontSize: { xs: "1rem", md: "1.15rem" },
                  lineHeight: 1.75,
                  maxWidth: 540,
                  mb: 4,
                }}
              >
                Los {TOTAL_ITEMS} documentos que tu contadora necesita, organizados en 5
                categorías. Descárgalo en PDF o márcalo en línea: tu progreso queda
                guardado en este navegador.
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Button
                  component="a"
                  href={PDF_URL}
                  download="Checklist-Declaracion-Renta-2025-Yakeline-Contadora.pdf"
                  variant="contained"
                  size="large"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    borderRadius: "var(--r-pill)",
                    px: 4,
                    py: 1.6,
                    fontWeight: 700,
                    fontSize: "1rem",
                    textTransform: "none",
                    background:
                      "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-strong) 100%)",
                    boxShadow: "0 14px 34px rgba(var(--brand-primary-rgb), 0.35)",
                    "&:hover": {
                      background:
                        "linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 100%)",
                      boxShadow: "0 18px 44px rgba(var(--brand-primary-rgb), 0.45)",
                    },
                  }}
                >
                  Descargar PDF gratis
                </Button>
                <Button
                  component="a"
                  href="#checklist-interactivo"
                  variant="outlined"
                  size="large"
                  startIcon={<ChecklistRoundedIcon />}
                  sx={{
                    borderRadius: "var(--r-pill)",
                    px: 4,
                    py: 1.6,
                    fontWeight: 600,
                    fontSize: "1rem",
                    textTransform: "none",
                    borderColor: "rgba(var(--brand-primary-rgb), 0.35)",
                    color: "var(--brand-primary)",
                    "&:hover": {
                      borderColor: "var(--brand-primary)",
                      background: "rgba(var(--brand-primary-rgb), 0.06)",
                    },
                  }}
                >
                  Usar la versión interactiva
                </Button>
              </Box>

              <Typography
                sx={{ fontSize: "0.82rem", color: "var(--text-subtle)", letterSpacing: 0.3 }}
              >
                Sin registro · {TOTAL_ITEMS} documentos · 5 categorías · Elaborado por
                Yakelin Bustamante
              </Typography>
            </motion.div>

            {/* Mockup del PDF */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <PaperStack reduce={reduce} />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Checklist interactivo ── */}
      <Box
        component="section"
        id="checklist-interactivo"
        sx={{ py: { xs: 8, md: 11 }, scrollMarginTop: 100 }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.65rem", md: "2.2rem" },
                color: "var(--text)",
                mb: 1.5,
              }}
            >
              Marca lo que ya tienes
            </Typography>
            <Typography
              sx={{
                color: "var(--text-subtle)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Es la misma lista del PDF, sección por sección. Cuando completes todo,
              agenda tu cita y entrega tus documentos de una sola vez.
            </Typography>
          </Box>

          <Box
            sx={{
              bgcolor: "var(--surface)",
              borderRadius: "var(--r-lg)",
              p: { xs: 2.5, md: 4 },
              boxShadow: "var(--shadow-md)",
              border: "1px solid rgba(var(--brand-primary-rgb), 0.06)",
            }}
          >
            {/* Progreso */}
            <Box sx={{ mb: 3.5 }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  mb: 1,
                }}
              >
                <Typography
                  sx={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-muted)" }}
                  aria-live="polite"
                >
                  {checkedCount} de {TOTAL_ITEMS} documentos listos
                </Typography>
                <Button
                  onClick={handleReset}
                  startIcon={<RestartAltRoundedIcon />}
                  disabled={checkedCount === 0}
                  sx={{
                    color: "var(--text-subtle)",
                    fontWeight: 500,
                    fontSize: "0.8rem",
                    textTransform: "none",
                    minWidth: 0,
                    "&:hover": {
                      background: "rgba(var(--brand-primary-rgb), 0.06)",
                      color: "var(--brand-primary)",
                    },
                  }}
                >
                  Reiniciar
                </Button>
              </Box>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 8,
                  borderRadius: "var(--r-pill)",
                  backgroundColor: "rgba(var(--brand-primary-rgb), 0.1)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: "var(--r-pill)",
                    background:
                      "linear-gradient(90deg, var(--brand-primary), var(--brand-primary-light), var(--brand-accent))",
                    transition: "transform 0.5s ease",
                  },
                }}
              />
            </Box>

            {/* Secciones */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {SECTIONS.map((section, index) => {
                const headingId = `renta-seccion-${section.id}`;
                const sectionDone = section.items.every(
                  (item) => checked[`${section.id}::${item.id}`]
                );
                return (
                  <Box key={section.id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 1.75,
                        pb: 1,
                        borderBottom: "1px solid rgba(var(--brand-primary-rgb), 0.1)",
                      }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          width: 38,
                          height: 38,
                          minWidth: 38,
                          borderRadius: "12px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: sectionDone
                            ? "var(--brand-gradient)"
                            : "rgba(var(--brand-primary-rgb), 0.08)",
                          color: sectionDone ? "#fff" : "var(--brand-primary)",
                          transition: "background 0.3s ease, color 0.3s ease",
                          "& svg": { fontSize: 21 },
                        }}
                      >
                        {section.icon}
                      </Box>
                      <Box>
                        <Typography
                          component="h3"
                          id={headingId}
                          sx={{
                            fontFamily: "'Playfair Display', serif",
                            fontWeight: 700,
                            fontSize: { xs: "0.95rem", md: "1.05rem" },
                            color: "var(--text)",
                            lineHeight: 1.3,
                          }}
                        >
                          <Box
                            component="span"
                            sx={{ color: "var(--brand-primary)", mr: 0.75 }}
                          >
                            {String(index + 1).padStart(2, "0")}.
                          </Box>
                          {section.title}
                        </Typography>
                        {section.hint && (
                          <Typography
                            sx={{
                              fontSize: "0.75rem",
                              color: "var(--text-subtle)",
                              fontWeight: 500,
                            }}
                          >
                            {section.hint}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Box
                      role="group"
                      aria-labelledby={headingId}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {section.items.map((item) => {
                        const key = `${section.id}::${item.id}`;
                        return (
                          <ChecklistRow
                            key={key}
                            itemKey={key}
                            label={item.label}
                            checked={!!checked[key]}
                            onToggle={handleToggle}
                            reduce={reduce}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* Estado completado */}
            <AnimatePresence>
              {allDone && (
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    sx={{
                      mt: 3.5,
                      p: 2.5,
                      borderRadius: "var(--r-md)",
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      alignItems: "center",
                      gap: 2,
                      bgcolor: "rgba(16, 185, 129, 0.1)",
                      border: "1px solid rgba(16, 185, 129, 0.25)",
                    }}
                  >
                    <CelebrationRoundedIcon sx={{ color: "#10B981", fontSize: 32 }} />
                    <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
                      <Typography sx={{ fontWeight: 700, color: "#10B981" }}>
                        ¡Tienes todos tus documentos listos!
                      </Typography>
                      <Typography sx={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        El siguiente paso es agendar tu cita para presentar tu declaración.
                      </Typography>
                    </Box>
                    <Button
                      component={Link}
                      href="/citas"
                      variant="contained"
                      startIcon={<CalendarMonthRoundedIcon />}
                      sx={{
                        borderRadius: "var(--r-pill)",
                        px: 3,
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: "none",
                        whiteSpace: "nowrap",
                        background: "linear-gradient(135deg, #10B981, #059669)",
                        "&:hover": {
                          background: "linear-gradient(135deg, #059669, #047857)",
                        },
                      }}
                    >
                      Agendar mi cita
                    </Button>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Acciones */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                mt: 4,
                justifyContent: "center",
              }}
            >
              <Button
                component="a"
                href={PDF_URL}
                download="Checklist-Declaracion-Renta-2025-Yakeline-Contadora.pdf"
                variant="outlined"
                startIcon={<DownloadRoundedIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 3.5,
                  py: 1.4,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
                  color: "var(--brand-primary)",
                  "&:hover": {
                    borderColor: "var(--brand-primary)",
                    background: "rgba(var(--brand-primary-rgb), 0.06)",
                  },
                }}
              >
                Descargar PDF
              </Button>
              <Button
                onClick={handlePrint}
                variant="outlined"
                startIcon={<PrintRoundedIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 3.5,
                  py: 1.4,
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  textTransform: "none",
                  borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
                  color: "var(--brand-primary)",
                  "&:hover": {
                    borderColor: "var(--brand-primary)",
                    background: "rgba(var(--brand-primary-rgb), 0.06)",
                  },
                }}
              >
                Imprimir
              </Button>
              <Button
                component="a"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 3.5,
                  py: 1.4,
                  fontWeight: 700,
                  fontSize: "0.9rem",
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
                Tengo dudas
              </Button>
            </Box>

            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "var(--text-subtle)",
                textAlign: "center",
                mt: 2.5,
                lineHeight: 1.6,
              }}
            >
              * Listado referencial. Los documentos exactos dependen de tu situación
              particular y de las condiciones vigentes de la DIAN.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ── CTA final ── */}
      <Box component="section" sx={{ pb: { xs: 10, md: 14 } }}>
        <Container maxWidth="md">
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--r-xl)",
              p: { xs: 4, md: 6 },
              textAlign: "center",
              background:
                "linear-gradient(135deg, var(--brand-primary-dark) 0%, var(--brand-primary) 60%, var(--brand-primary-strong) 100%)",
              boxShadow: "var(--shadow-lg)",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -60,
                right: -60,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.06)",
                pointerEvents: "none",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.6rem", md: "2.1rem" },
                color: "#fff",
                mb: 1.5,
              }}
            >
              ¿Documentos listos? Deja el resto en manos expertas
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.85)",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: 520,
                mx: "auto",
                mb: 4,
                lineHeight: 1.7,
              }}
            >
              Agenda tu cita y presenta tu declaración de renta 2025 sin errores, sin
              sanciones y aprovechando cada deducción.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1.5,
                justifyContent: "center",
              }}
            >
              <Button
                component={Link}
                href="/citas"
                variant="contained"
                size="large"
                startIcon={<CalendarMonthRoundedIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: "1rem",
                  textTransform: "none",
                  background: "linear-gradient(135deg, var(--brand-accent), var(--brand-accent-dark))",
                  color: "#fff",
                  boxShadow: "0 14px 34px rgba(0, 0, 0, 0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, var(--brand-accent-dark), var(--brand-accent))",
                  },
                }}
              >
                Agendar mi cita
              </Button>
              <Button
                component="a"
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="large"
                startIcon={<WhatsAppIcon />}
                sx={{
                  borderRadius: "var(--r-pill)",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "none",
                  borderColor: "rgba(255, 255, 255, 0.45)",
                  color: "#fff",
                  "&:hover": {
                    borderColor: "#fff",
                    background: "rgba(255, 255, 255, 0.08)",
                  },
                }}
              >
                Escribir por WhatsApp
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Aviso de error de almacenamiento */}
      <Snackbar
        open={storageError}
        autoHideDuration={5000}
        onClose={() => setStorageError(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setStorageError(false)}
          sx={{ width: "100%" }}
        >
          No pudimos guardar tu progreso en este navegador. Puedes seguir marcando
          documentos igualmente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
