"use client";

import { useState, useEffect, useMemo, useCallback, type ReactElement } from "react";
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
import ChecklistRoundedIcon from "@mui/icons-material/ChecklistRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import PrintRoundedIcon from "@mui/icons-material/PrintRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// ─── Types ───────────────────────────────────────────────────────────────────

interface DocItem {
  id: string;
  label: string;
}

interface DocGroup {
  title: string;
  items: DocItem[];
}

interface Profile {
  id: string;
  label: string;
  icon: ReactElement;
  groups: DocGroup[];
}

// ─── Data (documentos reales para la declaración de renta en Colombia) ────────

const WHATSAPP_NUMBER = "573207269417";
const STORAGE_KEY = "yc:doc-checklist";

const COMMON_GROUP: DocGroup = {
  title: "Documentos comunes",
  items: [
    { id: "rut", label: "RUT actualizado" },
    { id: "identidad", label: "Documento de identidad" },
    { id: "bancos", label: "Certificados y extractos bancarios" },
    { id: "creditos", label: "Certificados de saldos de créditos" },
  ],
};

const PROFILES: Profile[] = [
  {
    id: "empleado",
    label: "Empleado / Persona natural",
    icon: <BadgeRoundedIcon />,
    groups: [
      {
        title: "Ingresos",
        items: [
          {
            id: "cert220",
            label: "Certificado de ingresos y retenciones (formulario 220)",
          },
          { id: "retefuente", label: "Certificados de retención en la fuente" },
        ],
      },
      {
        title: "Deducciones",
        items: [
          { id: "salud-pension", label: "Certificado de aportes a salud y pensión" },
          { id: "vivienda", label: "Intereses de crédito de vivienda" },
          { id: "prepagada", label: "Medicina prepagada" },
          { id: "dependientes", label: "Certificado de dependientes" },
          { id: "afc", label: "Aportes a AFC / pensiones voluntarias" },
        ],
      },
    ],
  },
  {
    id: "independiente",
    label: "Independiente / Servicios",
    icon: <WorkRoundedIcon />,
    groups: [
      {
        title: "Ingresos",
        items: [
          { id: "facturas", label: "Facturas electrónicas emitidas" },
          { id: "honorarios", label: "Certificados de honorarios" },
        ],
      },
      {
        title: "Soportes",
        items: [
          {
            id: "retenciones-clientes",
            label: "Certificados de retención practicados por clientes",
          },
          { id: "costos-gastos", label: "Soportes de costos y gastos" },
          {
            id: "seguridad-social",
            label: "Aportes a seguridad social como independiente",
          },
        ],
      },
    ],
  },
  {
    id: "negocio",
    label: "Negocio / Empresa",
    icon: <StorefrontRoundedIcon />,
    groups: [
      {
        title: "Contabilidad",
        items: [
          { id: "estados-financieros", label: "Estados financieros" },
          { id: "libros", label: "Libros y auxiliares contables" },
          { id: "inventarios", label: "Inventarios" },
        ],
      },
      {
        title: "Facturación",
        items: [
          {
            id: "factura-electronica",
            label: "Facturación electrónica emitida y recibida",
          },
        ],
      },
      {
        title: "Soportes y obligaciones",
        items: [
          { id: "nomina", label: "Nómina y aportes" },
          {
            id: "iva-retencion",
            label: "Declaraciones de IVA y retención presentadas",
          },
          {
            id: "activos-pasivos",
            label: "Certificados de activos y pasivos",
          },
        ],
      },
    ],
  },
];

// ─── Checklist item row (accessible, animated) ────────────────────────────────

function ChecklistRow({
  storageKey,
  label,
  checked,
  onToggle,
  reduce,
}: {
  storageKey: string;
  label: string;
  checked: boolean;
  onToggle: (key: string) => void;
  reduce: boolean;
}) {
  const inputId = `doc-${storageKey.replace(/[^a-z0-9]/gi, "-")}`;

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
          : "rgba(255,255,255,0.6)",
        transition: "border-color 0.2s ease, background 0.2s ease",
        "&:hover": {
          borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
          background: "rgba(var(--brand-primary-rgb), 0.03)",
        },
        // keyboard focus ring on the visual checkbox
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
        onChange={() => onToggle(storageKey)}
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
          boxShadow: checked
            ? "0 4px 12px rgba(var(--brand-primary-rgb), 0.3)"
            : "none",
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
          color: checked ? "var(--brand-primary-dark)" : "#374151",
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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DocumentChecklist() {
  const reduce = useReducedMotion() ?? false;

  const [activeProfileId, setActiveProfileId] = useState<string>(PROFILES[0].id);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);
  const [storageError, setStorageError] = useState(false);

  const activeProfile = useMemo(
    () => PROFILES.find((p) => p.id === activeProfileId) ?? PROFILES[0],
    [activeProfileId]
  );

  // Combine the shared documents with the profile-specific groups.
  const displayedGroups = useMemo<DocGroup[]>(
    () => [COMMON_GROUP, ...activeProfile.groups],
    [activeProfile]
  );

  const allItemKeys = useMemo(
    () =>
      displayedGroups.flatMap((group) =>
        group.items.map((item) => `${activeProfile.id}::${item.id}`)
      ),
    [displayedGroups, activeProfile.id]
  );

  const checkedCount = useMemo(
    () => allItemKeys.filter((key) => checked[key]).length,
    [allItemKeys, checked]
  );
  const totalCount = allItemKeys.length;
  const progress = totalCount > 0 ? (checkedCount / totalCount) * 100 : 0;
  const allDone = totalCount > 0 && checkedCount === totalCount;

  // ── Load persisted state (SSR-safe: runs only on the client) ────────────────
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
      // Corrupt or unavailable storage — start from an empty checklist.
    }
    setHydrated(true);
  }, []);

  // ── Persist state whenever it changes (after initial hydration) ─────────────
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      setStorageError(true);
    }
  }, [checked, hydrated]);

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

  const handleResetProfile = useCallback(() => {
    setChecked((prev) => {
      const next = { ...prev };
      for (const key of Object.keys(next)) {
        if (key.startsWith(`${activeProfile.id}::`)) delete next[key];
      }
      return next;
    });
  }, [activeProfile.id]);

  const handlePrint = useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  const whatsappHref = useMemo(() => {
    const text = `Hola Yakeline, estoy reuniendo mis documentos para la declaración de renta (perfil: ${activeProfile.label}) y tengo algunas dudas. ¿Me pueden orientar?`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [activeProfile.label]);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg, #FFFFFF 0%, #F8F6FF 100%)",
      }}
    >
      {/* Decorative background blobs */}
      <Box
        sx={{
          position: "absolute",
          top: -90,
          left: -90,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-primary-rgb), 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -70,
          right: -70,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(var(--brand-accent-rgb), 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
            <Chip
              icon={<ChecklistRoundedIcon />}
              label="DECLARACIÓN DE RENTA"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "0.72rem",
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
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.6rem" },
                lineHeight: 1.2,
                color: "#1F2937",
                mb: 1.5,
              }}
            >
              Checklist de documentos para tu{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(90deg, var(--brand-primary), var(--brand-accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                declaración de renta
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                maxWidth: 560,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Elige tu perfil y reúne lo que necesitas. Marca lo que ya tienes: tu
              progreso se guarda en este navegador.
            </Typography>
          </Box>
        </motion.div>

        {/* Profile selector (segmented control) */}
        <Box
          role="group"
          aria-label="Selecciona tu perfil tributario"
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
            p: 0.75,
            mb: { xs: 3, md: 4 },
            borderRadius: "18px",
            bgcolor: "rgba(var(--brand-primary-rgb), 0.06)",
            border: "1px solid rgba(var(--brand-primary-rgb), 0.08)",
          }}
        >
          {PROFILES.map((profile) => {
            const isActive = profile.id === activeProfile.id;
            return (
              <Box
                key={profile.id}
                component="button"
                type="button"
                onClick={() => setActiveProfileId(profile.id)}
                aria-pressed={isActive}
                sx={{
                  position: "relative",
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  px: { xs: 1.5, md: 2 },
                  py: 1.4,
                  borderRadius: "14px",
                  fontFamily: "inherit",
                  "&:focus-visible": {
                    outline: "3px solid rgba(var(--brand-primary-rgb), 0.4)",
                    outlineOffset: 2,
                  },
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="doc-profile-pill"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 14,
                      background:
                        "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-strong) 100%)",
                      boxShadow: "0 8px 22px rgba(var(--brand-primary-rgb), 0.28)",
                    }}
                  />
                )}
                <Box
                  component="span"
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    color: isActive ? "#fff" : "var(--brand-primary)",
                    fontWeight: 700,
                    fontSize: { xs: "0.85rem", md: "0.92rem" },
                    lineHeight: 1.2,
                    "& svg": { fontSize: 20 },
                  }}
                >
                  {profile.icon}
                  {profile.label}
                </Box>
              </Box>
            );
          })}
        </Box>

        {/* Checklist card */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            p: { xs: 2.5, md: 4 },
            boxShadow:
              "0 20px 60px rgba(var(--brand-primary-rgb), 0.08), 0 4px 16px rgba(0,0,0,0.04)",
            border: "1px solid rgba(var(--brand-primary-rgb), 0.06)",
          }}
        >
          {/* Progress */}
          <Box sx={{ mb: 3 }}>
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
                sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#374151" }}
                aria-live="polite"
              >
                {checkedCount} de {totalCount} documentos listos
              </Typography>
              <Button
                onClick={handleResetProfile}
                startIcon={<RestartAltRoundedIcon />}
                disabled={checkedCount === 0}
                sx={{
                  color: "#6B7280",
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
                borderRadius: 999,
                backgroundColor: "rgba(var(--brand-primary-rgb), 0.1)",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 999,
                  background:
                    "linear-gradient(90deg, var(--brand-primary), var(--brand-primary-light), var(--brand-accent))",
                  transition: "transform 0.5s ease",
                },
              }}
            />
          </Box>

          {/* Groups + items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {displayedGroups.map((group, groupIndex) => {
                  const groupHeadingId = `doc-group-${activeProfile.id}-${groupIndex}`;
                  return (
                  <Box key={group.title}>
                    <Typography
                      component="h3"
                      id={groupHeadingId}
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: "0.8rem",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        color: "var(--brand-primary)",
                        mb: 1.5,
                        pb: 0.75,
                        borderBottom: "1px solid rgba(var(--brand-primary-rgb), 0.1)",
                      }}
                    >
                      {group.title}
                    </Typography>
                    <Box
                      role="group"
                      aria-labelledby={groupHeadingId}
                      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                    >
                      {group.items.map((item) => {
                        const key = `${activeProfile.id}::${item.id}`;
                        return (
                          <ChecklistRow
                            key={key}
                            storageKey={key}
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
            </motion.div>
          </AnimatePresence>

          {/* Completion note */}
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
                    mt: 3,
                    p: 2,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    bgcolor: "rgba(16, 185, 129, 0.1)",
                    border: "1px solid rgba(16, 185, 129, 0.25)",
                  }}
                >
                  <CelebrationRoundedIcon sx={{ color: "#10B981" }} />
                  <Typography sx={{ fontWeight: 600, fontSize: "0.9rem", color: "#0F766E" }}>
                    ¡Listo! Tienes todos los documentos de este perfil.
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
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
              onClick={handlePrint}
              variant="outlined"
              startIcon={<PrintRoundedIcon />}
              sx={{
                borderRadius: 50,
                px: 3.5,
                py: 1.4,
                fontWeight: 600,
                fontSize: "0.9rem",
                textTransform: "none",
                borderColor: "rgba(var(--brand-primary-rgb), 0.3)",
                color: "var(--brand-primary)",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "var(--brand-primary)",
                  background: "rgba(var(--brand-primary-rgb), 0.06)",
                  boxShadow: "none",
                },
              }}
            >
              Imprimir mi checklist
            </Button>
            <Button
              component="a"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              startIcon={<WhatsAppIcon />}
              sx={{
                borderRadius: 50,
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
              Tengo dudas con mis documentos
            </Button>
          </Box>

          {/* Disclaimer */}
          <Typography
            sx={{
              fontSize: "0.75rem",
              color: "#6B7280",
              textAlign: "center",
              mt: 2.5,
              lineHeight: 1.6,
            }}
          >
            * Listado referencial. Los documentos exactos dependen de tu situación
            particular y de las condiciones vigentes de la DIAN. Confírmalos con tu
            contador antes de declarar.
          </Typography>
        </Box>
      </Container>

      {/* Storage error feedback */}
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
