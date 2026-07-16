"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import LightbulbRoundedIcon from "@mui/icons-material/LightbulbRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import LocalFireDepartmentRoundedIcon from "@mui/icons-material/LocalFireDepartmentRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";

/* ─────────────────────────────────────────────────────────────
   Ahorcado Tributario — a tax-vocabulary hangman.
   Each wrong letter draws the next body part of the muñequito;
   6 wrong = fully hanged. Educational DIAN/tax tips throughout,
   confetti on a win. Card is intentionally dark with theme-hued
   accents so it reads well across all nine random moods.
   ───────────────────────────────────────────────────────────── */

interface Term {
  /** Puzzle word — UNACCENTED uppercase A–Z so the keyboard stays simple. */
  word: string;
  /** Always-visible clue (educational). */
  hint: string;
  /** Fact revealed when the round ends. */
  tip: string;
}

const TERMS: Term[] = [
  { word: "RENTA", hint: "El impuesto anual sobre tus ingresos", tip: "Las personas naturales declaran renta entre agosto y octubre, según los últimos dígitos del NIT." },
  { word: "FACTURA", hint: "Documento que soporta una venta", tip: "La factura electrónica debe ser validada por la DIAN antes de entregarse al comprador." },
  { word: "RETENCION", hint: "Anticipo del impuesto descontado en el pago", tip: "La retención en la fuente es un recaudo anticipado del impuesto de renta." },
  { word: "DEDUCCION", hint: "Gasto que reduce tu base gravable", tip: "Salud, educación y dependientes pueden disminuir legalmente tu impuesto a pagar." },
  { word: "IMPUESTO", hint: "Aporte obligatorio al Estado", tip: "En Colombia los impuestos nacionales los administra la DIAN." },
  { word: "PATRIMONIO", hint: "Tus bienes menos tus deudas", tip: "Un patrimonio elevado puede obligarte a declarar renta aunque tengas pocos ingresos." },
  { word: "SANCION", hint: "Multa por incumplir a la DIAN", tip: "La sanción mínima en 2026 equivale a 10 UVT: mejor cumplir a tiempo." },
  { word: "DECLARACION", hint: "El reporte de ingresos ante la DIAN", tip: "Declarar tarde genera una sanción del 5% mensual sobre el impuesto, más intereses." },
  { word: "CONTADOR", hint: "El profesional que ordena tus finanzas", tip: "Un buen contador te ayuda a pagar solo lo justo, de forma legal." },
  { word: "TRIBUTARIA", hint: "Relativo a los impuestos", tip: "La planeación tributaria reduce tu carga fiscal aprovechando beneficios y deducciones." },
  { word: "NOMINA", hint: "El pago de salarios y aportes", tip: "La nómina electrónica es obligatoria y se reporta a la DIAN." },
  { word: "FISCAL", hint: "Relativo al fisco y al Estado", tip: "El año fiscal en Colombia va del 1 de enero al 31 de diciembre." },
  { word: "DIVIDENDOS", hint: "Utilidades repartidas a los socios", tip: "Los dividendos pueden estar gravados dependiendo de su monto y origen." },
  { word: "REVISORIA", hint: "Control y vigilancia contable de una empresa", tip: "Algunas sociedades, como ciertas S.A.S. y anónimas, requieren revisor fiscal obligatorio." },
  { word: "LIQUIDACION", hint: "Cálculo final del impuesto a pagar", tip: "Una liquidación bien hecha evita pagar de más — o sanciones por pagar de menos." },
];

const WRONG_TIPS = [
  "La declaración de renta se presenta entre agosto y octubre según tu NIT.",
  "Guarda tus facturas: los gastos soportados reducen tu impuesto.",
  "La sanción mínima de la DIAN en 2026 es de 10 UVT.",
  "La factura electrónica debe validarse ante la DIAN antes de entregarla.",
  "Los aportes voluntarios a pensión pueden ser deducibles hasta el 25%.",
  "Declarar a tiempo evita sanciones del 5% mensual más intereses.",
];

const MAX_WRONG = 6;
const BEST_KEY = "yc:ahorcado:best";
const KEY_ROWS = ["ABCDEFGHIJ", "KLMNOPQRST", "UVWXYZ"].map((r) => r.split(""));
const PART_COLORS = ["#FBBF24", "#FBBF24", "#FB923C", "#FB923C", "#F87171", "#EF4444"];
const WA_LINK = `https://wa.me/573207269417?text=${encodeURIComponent(
  "Hola Yakeline, jugué Ahorcado Tributario y quiero aprender más sobre mis impuestos",
)}`;

type Status = "idle" | "playing" | "won" | "lost";

function shuffle(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── Animated SVG muñequito. Gallows always drawn; body parts appear
   one per wrong guess, tinting toward red as danger rises. ── */
function HangmanFigure({ wrong, lost }: { wrong: number; lost: boolean }) {
  const reduce = useReducedMotion();
  const draw = reduce
    ? { initial: false as const, animate: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.45, ease: "easeOut" as const },
      };
  const stroke = "rgba(203,213,225,0.55)"; // slate gallows — reads on the dark card

  const parts = [
    <motion.circle key="head" cx={140} cy={62} r={16} fill="none" stroke={PART_COLORS[0]} strokeWidth={4} strokeLinecap="round" {...draw} />,
    <motion.line key="body" x1={140} y1={78} x2={140} y2={150} stroke={PART_COLORS[1]} strokeWidth={4} strokeLinecap="round" {...draw} />,
    <motion.line key="larm" x1={140} y1={96} x2={112} y2={122} stroke={PART_COLORS[2]} strokeWidth={4} strokeLinecap="round" {...draw} />,
    <motion.line key="rarm" x1={140} y1={96} x2={168} y2={122} stroke={PART_COLORS[3]} strokeWidth={4} strokeLinecap="round" {...draw} />,
    <motion.line key="lleg" x1={140} y1={150} x2={118} y2={186} stroke={PART_COLORS[4]} strokeWidth={4} strokeLinecap="round" {...draw} />,
    <motion.line key="rleg" x1={140} y1={150} x2={162} y2={186} stroke={PART_COLORS[5]} strokeWidth={4} strokeLinecap="round" {...draw} />,
  ].slice(0, wrong);

  const sway =
    lost && !reduce
      ? { rotate: [0, 4, -3, 2, 0], transition: { duration: 1.6, ease: "easeInOut" as const } }
      : { rotate: 0 };

  return (
    <svg viewBox="0 0 200 240" width="100%" height="100%" role="img" aria-label={`Muñequito: ${wrong} de ${MAX_WRONG} errores`} style={{ maxHeight: 240 }}>
      {/* Gallows */}
      <g stroke={stroke} strokeWidth={5} strokeLinecap="round" fill="none">
        <line x1={12} y1={232} x2={92} y2={232} />
        <line x1={46} y1={232} x2={46} y2={16} />
        <line x1={44} y1={16} x2={140} y2={16} />
        <line x1={140} y1={16} x2={140} y2={46} />
      </g>
      {/* Figure (sways when hanged) */}
      <motion.g style={{ transformOrigin: "140px 16px" }} animate={sway}>
        {parts}
        {lost && (
          <g stroke="#EF4444" strokeWidth={2.5} strokeLinecap="round">
            <line x1={133} y1={58} x2={138} y2={63} />
            <line x1={138} y1={58} x2={133} y2={63} />
            <line x1={142} y1={58} x2={147} y2={63} />
            <line x1={147} y1={58} x2={142} y2={63} />
          </g>
        )}
      </motion.g>
    </svg>
  );
}

export default function AhorcadoGame() {
  const reduce = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [order, setOrder] = useState<number[]>([]);
  const [pos, setPos] = useState(0);
  const [guessed, setGuessed] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  // Synchronous mirrors of guessed/status so a rapid burst of guesses (e.g. fast
  // keyboard typing) accumulates correctly instead of losing letters to React's
  // state batching / stale closures.
  const guessedRef = useRef<string[]>([]);
  const statusRef = useRef<Status>("idle");

  useEffect(() => {
    try {
      const stored = Number(localStorage.getItem(BEST_KEY));
      if (Number.isFinite(stored) && stored > 0) setBest(stored);
    } catch {
      /* storage blocked — non-fatal */
    }
  }, []);

  const term = status === "idle" || order.length === 0 ? null : TERMS[order[pos]];
  const word = term?.word ?? "";
  const wrongLetters = useMemo(() => guessed.filter((l) => !word.includes(l)), [guessed, word]);
  const wrong = wrongLetters.length;
  const lives = MAX_WRONG - wrong;

  const saveBest = useCallback((value: number) => {
    setBest((prev) => {
      const next = Math.max(prev, value);
      try {
        localStorage.setItem(BEST_KEY, String(next));
      } catch {
        /* non-fatal */
      }
      return next;
    });
  }, []);

  const celebrate = useCallback(async () => {
    if (reduce) return;
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 110, spread: 78, origin: { y: 0.5 }, colors: ["#FBBF24", "#34D399", "#A78BFA", "#F472B6", "#60A5FA"] });
      setTimeout(() => confetti({ particleCount: 60, spread: 110, startVelocity: 35, origin: { y: 0.45 } }), 220);
    } catch {
      /* confetti optional */
    }
  }, [reduce]);

  const begin = useCallback(() => {
    guessedRef.current = [];
    statusRef.current = "playing";
    setOrder(shuffle(TERMS.length));
    setPos(0);
    setGuessed([]);
    setScore(0);
    setStreak(0);
    setToast(null);
    setStatus("playing");
  }, []);

  const nextRound = useCallback(() => {
    guessedRef.current = [];
    statusRef.current = "playing";
    setPos((p) => {
      const np = p + 1;
      if (np >= order.length) {
        setOrder(shuffle(TERMS.length));
        return 0;
      }
      return np;
    });
    setGuessed([]);
    setToast(null);
    setStatus("playing");
  }, [order.length]);

  const guess = useCallback(
    (letter: string) => {
      if (statusRef.current !== "playing") return;
      const prev = guessedRef.current;
      if (prev.includes(letter)) return;
      const next = [...prev, letter];
      guessedRef.current = next;
      setGuessed(next);

      if (word.includes(letter)) {
        const solved = word.split("").every((ch) => next.includes(ch));
        if (solved) {
          const wrongNow = next.filter((l) => !word.includes(l)).length;
          const gained = 10 + (MAX_WRONG - wrongNow) * 3 + streak * 2;
          const newScore = score + gained;
          setScore(newScore);
          setStreak((k) => k + 1);
          saveBest(newScore);
          statusRef.current = "won";
          setStatus("won");
          celebrate();
        }
      } else {
        const wrongNow = next.filter((l) => !word.includes(l)).length;
        setToast(WRONG_TIPS[(wrongNow - 1) % WRONG_TIPS.length]);
        if (wrongNow >= MAX_WRONG) {
          setStreak(0);
          saveBest(score);
          statusRef.current = "lost";
          setStatus("lost");
        }
      }
    },
    [word, streak, score, saveBest, celebrate],
  );

  // Physical keyboard support while a round is active.
  useEffect(() => {
    if (status !== "playing") return;
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (k.length === 1 && k >= "A" && k <= "Z") guess(k);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [status, guess]);

  const isOver = status === "won" || status === "lost";

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 760,
        mx: "auto",
        p: { xs: 2, md: 3 },
        borderRadius: "24px",
        overflow: "hidden",
        color: "#F4F4F7",
        border: "1px solid rgba(255,255,255,0.08)",
        background:
          "radial-gradient(900px 320px at 50% -12%, rgba(var(--brand-primary-rgb),0.22), transparent 60%), linear-gradient(180deg, #14152a 0%, #0b0b12 100%)",
        boxShadow: "0 30px 70px -30px rgba(0,0,0,0.7)",
        minHeight: 460,
      }}
    >
      {/* Scoreboard */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1, mb: 2 }}>
        <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: { xs: "1.15rem", md: "1.35rem" }, color: "#fff" }}>
          Ahorcado Tributario
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Stat icon={<EmojiEventsRoundedIcon sx={{ fontSize: 16 }} />} label={`${score}`} title="Puntos" />
          <Stat icon={<LocalFireDepartmentRoundedIcon sx={{ fontSize: 16 }} />} label={`${streak}`} title="Racha" accent="#FB923C" />
          <Stat icon={<EmojiEventsRoundedIcon sx={{ fontSize: 16 }} />} label={`${best}`} title="Mejor" accent="#FBBF24" />
        </Box>
      </Box>

      {status === "idle" ? (
        <Box sx={{ textAlign: "center", py: { xs: 5, md: 7 } }}>
          <Box sx={{ width: 120, height: 120, mx: "auto", mb: 2, opacity: 0.9 }}>
            <HangmanFigure wrong={3} lost={false} />
          </Box>
          <Typography sx={{ fontSize: { xs: "1rem", md: "1.15rem" }, color: "rgba(255,255,255,0.8)", maxWidth: 440, mx: "auto", mb: 3, lineHeight: 1.6 }}>
            Adivina el término tributario letra por letra. Cada error acerca al
            muñequito a la horca. ¡Aprende sobre impuestos mientras juegas!
          </Typography>
          <Button
            onClick={begin}
            startIcon={<PlayArrowRoundedIcon />}
            sx={{
              px: 4,
              py: 1.4,
              borderRadius: "var(--r-pill)",
              fontWeight: 800,
              fontSize: "1rem",
              textTransform: "none",
              color: "#0b0b12",
              background: "linear-gradient(135deg, var(--brand-accent) 0%, #FCD34D 100%)",
              boxShadow: "0 10px 30px -10px rgba(var(--brand-accent-rgb),0.6)",
              "&:hover": { filter: "brightness(1.05)" },
            }}
          >
            Comenzar
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: { xs: 2, md: 3 }, alignItems: "stretch" }}>
          {/* Figure + lives */}
          <Box sx={{ flex: "0 0 auto", width: { xs: "100%", md: 220 }, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Box sx={{ width: { xs: 180, md: 210 }, height: { xs: 200, md: 240 } }}>
              <HangmanFigure wrong={wrong} lost={status === "lost"} />
            </Box>
            <Box sx={{ display: "flex", gap: 0.6, mt: 1 }} aria-label={`${lives} intentos restantes`}>
              {Array.from({ length: MAX_WRONG }).map((_, i) => (
                <FavoriteRoundedIcon key={i} sx={{ fontSize: 18, color: i < lives ? "#F87171" : "rgba(255,255,255,0.16)" }} />
              ))}
            </Box>
          </Box>

          {/* Word + hint + keyboard */}
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1, mb: 2, p: 1.5, borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <LightbulbRoundedIcon sx={{ fontSize: 18, color: "var(--brand-accent)", mt: "1px", flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.82)", lineHeight: 1.5 }}>
                <strong>Pista:</strong> {term?.hint}
              </Typography>
            </Box>

            {/* Word blanks */}
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: { xs: 0.6, md: 1 }, justifyContent: "center", mb: 2.5, minHeight: 54 }}>
              {word.split("").map((ch, i) => {
                const shown = guessed.includes(ch) || isOver;
                return (
                  <Box key={i} sx={{ width: { xs: 26, md: 32 }, textAlign: "center" }}>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={shown ? ch : "_"}
                        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.6 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: 800,
                          color: shown ? (guessed.includes(ch) ? "#fff" : "#F87171") : "rgba(255,255,255,0.35)",
                          borderBottom: "3px solid rgba(255,255,255,0.28)",
                          paddingBottom: 2,
                          lineHeight: 1.1,
                        }}
                      >
                        {shown ? ch : " "}
                      </motion.div>
                    </AnimatePresence>
                  </Box>
                );
              })}
            </Box>

            {/* Keyboard */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 0.5, md: 0.7 }, alignItems: "center" }}>
              {KEY_ROWS.map((row, ri) => (
                <Box key={ri} sx={{ display: "flex", gap: { xs: 0.5, md: 0.7 } }}>
                  {row.map((letter) => {
                    const used = guessed.includes(letter);
                    const correct = used && word.includes(letter);
                    const missed = used && !word.includes(letter);
                    return (
                      <Box
                        key={letter}
                        component="button"
                        type="button"
                        onClick={() => guess(letter)}
                        disabled={used || isOver}
                        aria-label={`Letra ${letter}`}
                        sx={{
                          width: { xs: 28, md: 34 },
                          height: { xs: 34, md: 40 },
                          borderRadius: "9px",
                          border: "1px solid",
                          borderColor: correct ? "transparent" : "rgba(255,255,255,0.14)",
                          fontWeight: 800,
                          fontSize: { xs: "0.8rem", md: "0.92rem" },
                          cursor: used || isOver ? "default" : "pointer",
                          transition: "transform 0.12s ease, background 0.15s ease",
                          color: correct ? "#08110d" : missed ? "rgba(255,255,255,0.32)" : "#E5E7EB",
                          background: correct
                            ? "linear-gradient(135deg,#34D399,#10B981)"
                            : missed
                              ? "rgba(239,68,68,0.14)"
                              : "rgba(255,255,255,0.08)",
                          "&:hover": used || isOver ? {} : { background: "rgba(255,255,255,0.18)", transform: "translateY(-1px)" },
                          "&:disabled": { cursor: "default" },
                        }}
                      >
                        {letter}
                      </Box>
                    );
                  })}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}

      {/* Wrong-guess tip toast */}
      <AnimatePresence>
        {toast && !isOver && status === "playing" && (
          <motion.div
            key={toast}
            initial={{ opacity: 0, y: 12, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 12, x: "-50%" }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              left: "50%",
              bottom: 14,
              width: "min(92%, 520px)",
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "10px 14px",
              borderRadius: 14,
              background: "rgba(251,146,60,0.14)",
              border: "1px solid rgba(251,146,60,0.35)",
              backdropFilter: "blur(6px)",
            }}
          >
            <LightbulbRoundedIcon sx={{ fontSize: 18, color: "#FBBF24", flexShrink: 0 }} />
            <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.9)", lineHeight: 1.45 }}>{toast}</Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Win / Lose overlay */}
      <AnimatePresence>
        {isOver && (
          <motion.div
            key={status}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              background: "rgba(6,7,15,0.82)",
              backdropFilter: "blur(6px)",
              zIndex: 5,
            }}
          >
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              style={{ textAlign: "center", maxWidth: 460 }}
            >
              <Typography sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, color: status === "won" ? "#34D399" : "#F87171", mb: 0.5 }}>
                {status === "won" ? "¡Correcto! 🎉" : "¡Te ahorcaron! 😵"}
              </Typography>
              <Typography sx={{ color: "rgba(255,255,255,0.85)", mb: 1.5 }}>
                La palabra era <strong style={{ color: "#fff" }}>{word}</strong>
              </Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start", textAlign: "left", p: 1.5, mb: 2.5, borderRadius: "14px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <LightbulbRoundedIcon sx={{ fontSize: 20, color: "var(--brand-accent)", flexShrink: 0 }} />
                <Typography sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.55 }}>{term?.tip}</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1.5, justifyContent: "center", flexWrap: "wrap" }}>
                <Button
                  onClick={nextRound}
                  startIcon={<ReplayRoundedIcon />}
                  sx={{
                    px: 3,
                    py: 1.1,
                    borderRadius: "var(--r-pill)",
                    fontWeight: 800,
                    textTransform: "none",
                    color: "#0b0b12",
                    background: "linear-gradient(135deg, var(--brand-accent) 0%, #FCD34D 100%)",
                    "&:hover": { filter: "brightness(1.05)" },
                  }}
                >
                  Siguiente palabra
                </Button>
                <Button
                  component="a"
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<WhatsAppIcon />}
                  sx={{
                    px: 3,
                    py: 1.1,
                    borderRadius: "var(--r-pill)",
                    fontWeight: 800,
                    textTransform: "none",
                    color: "#fff",
                    background: "linear-gradient(135deg,#25D366,#128C7E)",
                    "&:hover": { filter: "brightness(1.05)" },
                  }}
                >
                  Agenda tu consulta
                </Button>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

function Stat({ icon, label, title, accent = "#A78BFA" }: { icon: ReactNode; label: string; title: string; accent?: string }) {
  return (
    <Box title={title} sx={{ display: "flex", alignItems: "center", gap: 0.5, px: 1.2, py: 0.5, borderRadius: "999px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: accent }}>
      {icon}
      <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, color: "#fff" }}>{label}</Typography>
    </Box>
  );
}
