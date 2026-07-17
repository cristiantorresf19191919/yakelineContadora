"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useInView, useReducedMotion } from "framer-motion";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

/* ─────────────────────────────────────────────────────────────
   LedgerShowcase — "Declaración en vivo".

   A self-contained accounting panel that fills itself in like a
   live contable app: PUC account codes and concepts are typed out
   line by line, each amount pops in, and a running total tallies up
   — then a result badge flips from "Calculando…" to the outcome
   (saldo a favor, IVA a pagar, nómina liquidada). It holds, then
   advances to the next document (Renta ⇄ IVA ⇄ Nómina), looping.

   Adapts the single-cursor typing engine from cv-project's
   CodeShowcase to VideoShowcase's styling conventions (MUI `sx` +
   `--brand-*` CSS variables, atmospheric orbs, gradient border), so
   it stays theme/mood-adaptive automatically. The "app screen"
   itself is always a dark glass UI, framed by the theme-hued border.

   Figures are realistic but illustrative — plausible PUC codes and
   UVT-based renta logic, not a real taxpayer's return.

   Accessibility & performance:
    - `prefers-reduced-motion`: every row shown filled in, no typing,
      no caret, no rotation
    - typing pauses while the section is scrolled out of view
    - the decorative panel is `aria-hidden`; a visually-hidden
      caption states its purpose for assistive tech
   ───────────────────────────────────────────────────────────── */

type Tone = "good" | "neutral";

interface LedgerRow {
  code: string;
  concept: string;
  /** Positive = ingreso; negative = deducción / descuento. */
  delta: number;
}

interface LedgerDoc {
  chip: string;
  tab: string;
  totalLabel: string;
  rows: LedgerRow[];
  badge: string;
  result: { label: string; value?: number; text?: string; tone: Tone };
}

const DOCS: LedgerDoc[] = [
  {
    chip: "Renta",
    tab: "renta_2024.decl",
    totalLabel: "Renta líquida gravable",
    badge: "Declaración lista",
    rows: [
      { code: "5202", concept: "Honorarios y salarios (cédula general)", delta: 186_400_000 },
      { code: "1110", concept: "Aportes obligatorios a salud y pensión", delta: -14_912_000 },
      { code: "5210", concept: "Renta exenta 25% (Art. 206 E.T.)", delta: -42_872_000 },
      { code: "5215", concept: "Deducción por dependientes (32 UVT)", delta: -4_978_000 },
      { code: "5220", concept: "Medicina prepagada (Art. 387)", delta: -7_171_000 },
      { code: "5225", concept: "Aportes voluntarios AFC y pensión", delta: -18_000_000 },
    ],
    result: { label: "Saldo a favor", value: 5_940_000, tone: "good" },
  },
  {
    chip: "IVA",
    tab: "iva_bimestre.decl",
    totalLabel: "IVA a pagar",
    badge: "Lista para presentar",
    rows: [
      { code: "2408", concept: "IVA generado en ventas (19%)", delta: 23_940_000 },
      { code: "2408", concept: "IVA descontable en compras", delta: -16_820_000 },
      { code: "1355", concept: "IVA retenido a favor", delta: -2_310_000 },
      { code: "1355", concept: "Saldo a favor período anterior", delta: -1_180_000 },
    ],
    result: { label: "Presentada a tiempo", text: "Sin sanciones", tone: "good" },
  },
  {
    chip: "Nómina",
    tab: "nomina_junio.pila",
    totalLabel: "Neto a pagar",
    badge: "Nómina liquidada",
    rows: [
      { code: "5105", concept: "Salario básico mensual", delta: 3_200_000 },
      { code: "5105", concept: "Auxilio de transporte", delta: 200_000 },
      { code: "2370", concept: "Aporte salud empleado (4%)", delta: -128_000 },
      { code: "2370", concept: "Aporte pensión empleado (4%)", delta: -128_000 },
      { code: "2365", concept: "Retención en la fuente", delta: -96_000 },
    ],
    result: { label: "Prestaciones al día", text: "Cesantías + prima provisionadas", tone: "good" },
  },
];

const ROW_HOLD_MS = 460;
const DOC_HOLD_MS = 3600;

const WA_LINK = `https://wa.me/573207269417?text=${encodeURIComponent(
  "Hola Yakeline, quiero que me ayudes con mi declaración",
)}`;

const rand = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

/** SSR-deterministic thousands formatting (avoids locale/env drift). */
function formatCOP(n: number): string {
  const neg = n < 0;
  const digits = Math.abs(Math.round(n))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${neg ? "−$" : "$"}${digits}`;
}

/** Human-feeling delay before typing the character at `pos` of a concept. */
function typeDelay(text: string, pos: number): number {
  const prev = text[pos - 1];
  if (prev === " ") return rand(28, 66);
  if (prev === "(" || prev === "%") return rand(60, 120);
  if (Math.random() < 0.05) return rand(90, 170);
  return rand(15, 33);
}

export default function LedgerShowcase() {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { amount: 0.25 });

  const [docIndex, setDocIndex] = useState(0);
  const [rowPos, setRowPos] = useState(0); // index of the row being typed
  const [charPos, setCharPos] = useState(0); // chars typed in the active concept
  const [displayTotal, setDisplayTotal] = useState(0);
  const displayRef = useRef(0);

  const doc = DOCS[docIndex];
  const rows = doc.rows;
  const curRow = rowPos < rows.length ? rows[rowPos] : undefined;
  const curConcept = curRow?.concept ?? "";
  const conceptDone = !curRow || charPos >= curConcept.length;
  const done = reduce || rowPos >= rows.length;

  // How many rows' amounts are locked in (drives the running total).
  const revealedCount = reduce
    ? rows.length
    : Math.min(rows.length, rowPos + (conceptDone ? 1 : 0));

  const targetTotal = useMemo(
    () => rows.slice(0, revealedCount).reduce((sum, r) => sum + r.delta, 0),
    [rows, revealedCount],
  );

  // Reset the typing cursor whenever the document changes.
  useEffect(() => {
    setRowPos(0);
    setCharPos(0);
    setDisplayTotal(0);
    displayRef.current = 0;
  }, [docIndex]);

  // Typing engine — one self-cleaning timeout per character / per row.
  useEffect(() => {
    if (reduce || !inView || rowPos >= rows.length) return;
    if (charPos < curConcept.length) {
      const t = window.setTimeout(
        () => setCharPos((c) => c + 1),
        typeDelay(curConcept, charPos),
      );
      return () => window.clearTimeout(t);
    }
    // Concept finished → amount is revealed → breathe, then next row.
    const t = window.setTimeout(() => {
      setRowPos((r) => r + 1);
      setCharPos(0);
    }, ROW_HOLD_MS);
    return () => window.clearTimeout(t);
  }, [reduce, inView, rowPos, charPos, curConcept, rows.length]);

  // Hold the finished document, then advance to the next one.
  useEffect(() => {
    if (reduce || !inView || rowPos < rows.length) return;
    const t = window.setTimeout(
      () => setDocIndex((i) => (i + 1) % DOCS.length),
      DOC_HOLD_MS,
    );
    return () => window.clearTimeout(t);
  }, [reduce, inView, rowPos, rows.length]);

  // Ease the running total toward its target as rows lock in.
  useEffect(() => {
    if (reduce) {
      displayRef.current = targetTotal;
      setDisplayTotal(targetTotal);
      return;
    }
    const from = displayRef.current;
    const to = targetTotal;
    if (from === to) return;
    let raf = 0;
    let startTs = 0;
    const dur = 560;
    const tick = (ts: number) => {
      if (!startTs) startTs = ts;
      const t = Math.min(1, (ts - startTs) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = from + (to - from) * eased;
      displayRef.current = val;
      setDisplayTotal(val);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [targetTotal, reduce]);

  const switchTo = useCallback(
    (i: number) => {
      if (i !== docIndex) setDocIndex(i);
    },
    [docIndex],
  );

  const goodTone = doc.result.tone === "good";

  return (
    <Box
      component="section"
      ref={wrapRef}
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 14 },
        px: { xs: 2, md: 4 },
        background:
          "radial-gradient(1000px 520px at 12% 6%, rgba(var(--brand-primary-rgb),0.12), transparent 55%), radial-gradient(900px 520px at 90% 98%, rgba(var(--brand-accent-rgb),0.10), transparent 55%), var(--bg)",
      }}
    >
      {/* Atmospheric floating orbs (theme-hued) */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            animate={{ y: [0, -24, 0], opacity: [0.45, 0.75, 0.45] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "10%",
              left: "5%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(var(--brand-primary-rgb),0.16), transparent 70%)",
              filter: "blur(32px)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 22, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "8%",
              right: "7%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(var(--brand-accent-rgb),0.14), transparent 70%)",
              filter: "blur(38px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Box sx={{ maxWidth: 1000, mx: "auto", position: "relative", zIndex: 1 }}>
        {/* Kicker + headline */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: "center", marginBottom: 40 }}
        >
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, mb: 2 }}>
            <Box sx={{ width: 34, height: 2, background: "var(--brand-accent)", borderRadius: 2, opacity: 0.8 }} />
            <Typography
              sx={{
                fontSize: "0.72rem",
                fontWeight: 800,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "var(--brand-accent)",
              }}
            >
              En vivo
            </Typography>
            <Box sx={{ width: 34, height: 2, background: "var(--brand-accent)", borderRadius: 2, opacity: 0.8 }} />
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
              lineHeight: 1.12,
              letterSpacing: "-0.02em",
              color: "var(--text)",
            }}
          >
            Así preparo tu{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(120deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
              }}
            >
              declaración
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              mx: "auto",
              maxWidth: 560,
              color: "var(--text-muted)",
              fontSize: { xs: "1rem", md: "1.12rem" },
              lineHeight: 1.7,
            }}
          >
            Cada cifra en su lugar, cada deducción aprovechada. Mira cómo se
            arma tu declaración, cuenta por cuenta, hasta el resultado final.
          </Typography>
        </motion.div>

        {/* The animated accounting panel — framed by a theme-hued gradient border */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            aria-hidden
            sx={{
              position: "relative",
              p: "2px",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(var(--brand-primary-rgb),0.9) 0%, rgba(var(--brand-accent-rgb),0.7) 45%, rgba(var(--brand-primary-rgb),0.15) 100%)",
              boxShadow:
                "0 50px 120px -40px rgba(var(--brand-primary-rgb),0.5), 0 20px 60px -30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Corner brackets */}
            {["tl", "tr", "bl", "br"].map((c) => (
              <Box
                key={c}
                aria-hidden
                sx={{
                  position: "absolute",
                  width: 24,
                  height: 24,
                  zIndex: 3,
                  pointerEvents: "none",
                  borderColor: "var(--brand-accent)",
                  opacity: 0.85,
                  ...(c[0] === "t" ? { top: -9, borderTop: "2px solid" } : { bottom: -9, borderBottom: "2px solid" }),
                  ...(c[1] === "l" ? { left: -9, borderLeft: "2px solid" } : { right: -9, borderRight: "2px solid" }),
                  ...(c === "tl" ? { borderTopLeftRadius: 10 } : {}),
                  ...(c === "tr" ? { borderTopRightRadius: 10 } : {}),
                  ...(c === "bl" ? { borderBottomLeftRadius: 10 } : {}),
                  ...(c === "br" ? { borderBottomRightRadius: 10 } : {}),
                }}
              />
            ))}

            {/* The dark "app screen" — fixed dark UI regardless of page theme */}
            <Box
              sx={{
                position: "relative",
                borderRadius: "22px",
                overflow: "hidden",
                background: "linear-gradient(180deg, #0d0b1a 0%, #0a0912 100%)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Window bar: dots · tab · document chips */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  px: { xs: 1.75, md: 2.25 },
                  py: 1.25,
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <Box sx={{ display: "flex", gap: 0.75, flexShrink: 0 }}>
                  {["#ff5f56", "#febc2e", "#27c840"].map((c) => (
                    <Box key={c} sx={{ width: 11, height: 11, borderRadius: "50%", background: c, opacity: 0.9 }} />
                  ))}
                </Box>
                <Box
                  component={motion.div}
                  key={`tab-${docIndex}`}
                  initial={reduce ? false : { opacity: 0, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.24 }}
                  sx={{
                    ml: 0.5,
                    px: 1.25,
                    py: 0.4,
                    borderRadius: "7px",
                    fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                    fontSize: { xs: "0.68rem", md: "0.74rem" },
                    color: "rgba(237,233,254,0.85)",
                    background: "rgba(var(--brand-primary-rgb),0.18)",
                    border: "1px solid rgba(var(--brand-primary-rgb),0.35)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: { xs: 130, sm: "none" },
                  }}
                >
                  {doc.tab}
                </Box>
                <Box sx={{ flex: 1 }} />
                <Box sx={{ display: "flex", gap: 0.5, flexShrink: 0 }}>
                  {DOCS.map((d, i) => (
                    <Box
                      component="button"
                      type="button"
                      key={d.chip}
                      onClick={() => switchTo(i)}
                      sx={{
                        cursor: "pointer",
                        px: { xs: 0.9, md: 1.15 },
                        py: 0.4,
                        borderRadius: "999px",
                        fontSize: { xs: "0.62rem", md: "0.68rem" },
                        fontWeight: 700,
                        letterSpacing: "0.02em",
                        fontFamily: "inherit",
                        transition: "all 0.2s ease",
                        border: "1px solid",
                        borderColor: i === docIndex ? "rgba(var(--brand-accent-rgb),0.7)" : "rgba(255,255,255,0.1)",
                        color: i === docIndex ? "#0a0912" : "rgba(226,232,240,0.6)",
                        background: i === docIndex ? "var(--brand-accent)" : "transparent",
                        "&:hover": {
                          borderColor: "rgba(var(--brand-accent-rgb),0.6)",
                          color: i === docIndex ? "#0a0912" : "rgba(245,245,255,0.95)",
                        },
                      }}
                    >
                      {d.chip}
                    </Box>
                  ))}
                </Box>
              </Box>

              {/* Ledger body */}
              <Box
                sx={{
                  px: { xs: 1.75, md: 3 },
                  py: { xs: 2, md: 2.5 },
                  minHeight: { xs: 300, md: 340 },
                }}
              >
                {/* Column labels */}
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "52px 1fr auto", md: "64px 1fr auto" },
                    gap: { xs: 1, md: 2 },
                    pb: 1,
                    mb: 0.5,
                    borderBottom: "1px dashed rgba(255,255,255,0.08)",
                    fontSize: "0.6rem",
                    fontWeight: 800,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(148,163,184,0.55)",
                  }}
                >
                  <span>Cuenta</span>
                  <span>Concepto</span>
                  <Box component="span" sx={{ textAlign: "right" }}>Valor</Box>
                </Box>

                {/* Rows */}
                {rows.map((row, i) => {
                  if (!reduce && i > rowPos) return null;
                  const isCurrent = !reduce && i === rowPos;
                  const shownConcept = isCurrent ? row.concept.slice(0, charPos) : row.concept;
                  const showAmount = reduce || i < rowPos || (isCurrent && conceptDone);
                  const positive = row.delta >= 0;
                  return (
                    <Box
                      key={`${docIndex}-${i}`}
                      component={motion.div}
                      initial={reduce ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "52px 1fr auto", md: "64px 1fr auto" },
                        gap: { xs: 1, md: 2 },
                        alignItems: "center",
                        py: { xs: 0.7, md: 0.85 },
                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                          fontSize: { xs: "0.72rem", md: "0.8rem" },
                          color: "rgba(167,139,250,0.85)",
                        }}
                      >
                        {row.code}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontSize: { xs: "0.8rem", md: "0.92rem" },
                          color: "rgba(237,233,254,0.9)",
                          lineHeight: 1.35,
                        }}
                      >
                        {shownConcept}
                        {isCurrent && !conceptDone && (
                          <Box
                            component={motion.span}
                            aria-hidden
                            animate={{ opacity: [1, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                            sx={{
                              display: "inline-block",
                              width: "2px",
                              height: "1em",
                              ml: "1px",
                              verticalAlign: "text-bottom",
                              background: "var(--brand-accent)",
                            }}
                          />
                        )}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          justifySelf: "end",
                          fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                          fontSize: { xs: "0.74rem", md: "0.86rem" },
                          fontWeight: 600,
                          fontVariantNumeric: "tabular-nums",
                          whiteSpace: "nowrap",
                          color: positive ? "#34d399" : "#fb7185",
                          opacity: showAmount ? 1 : 0,
                          transform: showAmount ? "translateY(0)" : "translateY(3px)",
                          transition: "opacity 0.25s ease, transform 0.25s ease",
                        }}
                      >
                        {positive ? "+" : "−"}
                        {formatCOP(Math.abs(row.delta))}
                      </Box>
                    </Box>
                  );
                })}
              </Box>

              {/* Status / total footer */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 1.5,
                  flexWrap: "wrap",
                  px: { xs: 1.75, md: 3 },
                  py: { xs: 1.5, md: 1.75 },
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(var(--brand-primary-rgb),0.06)",
                }}
              >
                {/* Left: live status */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                  {done ? (
                    <>
                      <CheckCircleRoundedIcon sx={{ fontSize: 18, color: "#34d399" }} />
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: "0.74rem", md: "0.82rem" }, fontWeight: 700, color: "rgba(237,233,254,0.9)" }}
                      >
                        {doc.badge}
                      </Box>
                    </>
                  ) : (
                    <>
                      <Box
                        component={motion.span}
                        aria-hidden
                        animate={{ opacity: [1, 0.3, 1], scale: [1, 0.85, 1] }}
                        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
                        sx={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand-accent)", flexShrink: 0 }}
                      />
                      <Box
                        component="span"
                        sx={{
                          fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                          fontSize: { xs: "0.7rem", md: "0.78rem" },
                          color: "rgba(148,163,184,0.75)",
                        }}
                      >
                        Calculando · fila {Math.min(rowPos + 1, rows.length)}/{rows.length}
                      </Box>
                    </>
                  )}
                </Box>

                {/* Right: running total, then result badge */}
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.25, ml: "auto" }}>
                  {done ? (
                    <Box
                      component={motion.div}
                      key={`result-${docIndex}`}
                      initial={reduce ? false : { opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{ display: "flex", alignItems: "baseline", gap: 1 }}
                    >
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: "0.66rem", md: "0.72rem" }, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.7)" }}
                      >
                        {doc.result.label}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          fontWeight: 800,
                          fontVariantNumeric: "tabular-nums",
                          color: goodTone ? "#34d399" : "#fbbf24",
                        }}
                      >
                        {doc.result.value != null ? formatCOP(doc.result.value) : doc.result.text}
                      </Box>
                    </Box>
                  ) : (
                    <>
                      <Box
                        component="span"
                        sx={{ fontSize: { xs: "0.66rem", md: "0.72rem" }, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(148,163,184,0.7)", display: { xs: "none", sm: "inline" } }}
                      >
                        {doc.totalLabel}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontFamily: "ui-monospace, SFMono-Regular, 'Roboto Mono', monospace",
                          fontSize: { xs: "1rem", md: "1.25rem" },
                          fontWeight: 800,
                          fontVariantNumeric: "tabular-nums",
                          color: "#fff",
                        }}
                      >
                        {formatCOP(displayTotal)}
                      </Box>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* Visually-hidden description for assistive tech (panel is aria-hidden) */}
        <Box
          sx={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          Animación ilustrativa de cómo se prepara una declaración de renta, IVA
          y nómina, cuenta por cuenta.
        </Box>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{ textAlign: "center", marginTop: 32 }}
        >
          <Box
            component="a"
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: 3.5,
              py: 1.4,
              borderRadius: "var(--r-pill)",
              fontWeight: 800,
              fontSize: "1rem",
              textDecoration: "none",
              color: "#fff",
              background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
              boxShadow: "0 14px 34px -12px rgba(37,211,102,0.6)",
              transition: "transform 0.2s var(--ease-standard), filter 0.2s var(--ease-standard)",
              "&:hover": { transform: "translateY(-2px)", filter: "brightness(1.05)" },
            }}
          >
            <WhatsAppIcon sx={{ fontSize: 20 }} />
            Que prepare la tuya
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
