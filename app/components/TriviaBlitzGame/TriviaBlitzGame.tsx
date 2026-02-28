"use client";

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayIcon from "@mui/icons-material/Replay";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

type GameState = "start" | "playing" | "explanation" | "gameover";

interface StreakTier {
  name: string;
  emoji: string;
  multiplier: number;
  minStreak: number;
}

interface FloatingScore {
  id: number;
  value: number;
  x: number;
}

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const QUESTIONS_PER_ROUND = 10;
const TIME_PER_QUESTION = 15;
const BASE_POINTS = 100;
const SPEED_BONUS_MAX = 50;
const SPEED_BONUS_THRESHOLD = 3;
const INITIAL_LIVES = 3;
const EXPLANATION_DELAY = 1800;
const HIGHSCORE_KEY = "triviaTributaria_highScore";

const STREAK_TIERS: StreakTier[] = [
  { name: "Diamond", emoji: "\uD83D\uDC8E", multiplier: 3, minStreak: 8 },
  { name: "Lightning", emoji: "\u26A1", multiplier: 2, minStreak: 5 },
  { name: "Fire", emoji: "\uD83D\uDD25", multiplier: 1.5, minStreak: 3 },
];

const LETTER_PREFIXES = ["A", "B", "C", "D"];

const CONFETTI_COLORS = [
  "#5D3FD3",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#3B82F6",
  "#EC4899",
  "#8B5CF6",
  "#06B6D4",
];

// ─── Questions Bank ──────────────────────────────────────────────────────────

const QUESTIONS_BANK: Question[] = [
  {
    question:
      "\u00BFCu\u00E1l es el plazo m\u00E1ximo para presentar la declaraci\u00F3n de renta de personas naturales?",
    options: [
      "Agosto-Octubre",
      "Enero-Marzo",
      "Junio-Julio",
      "Diciembre",
    ],
    correctAnswer: "Agosto-Octubre",
    explanation:
      "El plazo va de agosto a octubre, seg\u00FAn los \u00FAltimos d\u00EDgitos del NIT. \u00A1No dejes todo para el \u00FAltimo d\u00EDa!",
    difficulty: 1,
  },
  {
    question:
      "\u00BFQu\u00E9 porcentaje de IVA general aplica en Colombia?",
    options: ["19%", "16%", "21%", "15%"],
    correctAnswer: "19%",
    explanation:
      "El IVA general en Colombia es del 19% desde la reforma tributaria de 2016.",
    difficulty: 1,
  },
  {
    question: "\u00BFQu\u00E9 significa NIT?",
    options: [
      "N\u00FAmero de Identificaci\u00F3n Tributaria",
      "N\u00FAmero de Impuesto Total",
      "Nota de Ingreso Tributario",
      "N\u00FAmero Interno de Trabajo",
    ],
    correctAnswer: "N\u00FAmero de Identificaci\u00F3n Tributaria",
    explanation:
      "El NIT es tu c\u00E9dula tributaria, indispensable para cualquier tr\u00E1mite ante la DIAN.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFCu\u00E1l es el valor de la UVT para 2026?",
    options: ["$49,799", "$47,065", "$42,412", "$50,500"],
    correctAnswer: "$49,799",
    explanation:
      "La Unidad de Valor Tributario (UVT) se actualiza cada a\u00F1o y es clave para calcular impuestos y sanciones.",
    difficulty: 2,
  },
  {
    question:
      "\u00BFQui\u00E9n administra los impuestos nacionales en Colombia?",
    options: [
      "DIAN",
      "Ministerio de Hacienda",
      "Banco de la Rep\u00FAblica",
      "Contralor\u00EDa",
    ],
    correctAnswer: "DIAN",
    explanation:
      "La Direcci\u00F3n de Impuestos y Aduanas Nacionales (DIAN) es la entidad encargada de administrar los impuestos.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFCada cu\u00E1nto se presenta el IVA bimestral?",
    options: [
      "Cada 2 meses",
      "Cada mes",
      "Cada 3 meses",
      "Cada 6 meses",
    ],
    correctAnswer: "Cada 2 meses",
    explanation:
      "Los grandes contribuyentes y ciertos responsables del IVA deben declarar cada 2 meses.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFQu\u00E9 es la retenci\u00F3n en la fuente?",
    options: [
      "Anticipo de impuestos",
      "Un impuesto adicional",
      "Una multa",
      "Un descuento comercial",
    ],
    correctAnswer: "Anticipo de impuestos",
    explanation:
      "Es un mecanismo de recaudo anticipado: te descuentan parte de tus impuestos en cada pago.",
    difficulty: 2,
  },
  {
    question:
      "\u00BFLos aportes voluntarios a pensi\u00F3n son deducibles?",
    options: [
      "S\u00ED, hasta el 25% del ingreso",
      "No, nunca",
      "Solo para empresas",
      "Solo despu\u00E9s de los 50 a\u00F1os",
    ],
    correctAnswer: "S\u00ED, hasta el 25% del ingreso",
    explanation:
      "Los aportes voluntarios a pensi\u00F3n pueden deducirse hasta el 25% del ingreso laboral. \u00A1Gran beneficio tributario!",
    difficulty: 2,
  },
  {
    question:
      "\u00BFQu\u00E9 documento necesitas para facturar electr\u00F3nicamente?",
    options: [
      "Resoluci\u00F3n de facturaci\u00F3n DIAN",
      "C\u00E1mara de Comercio",
      "RUT \u00FAnicamente",
      "Pasaporte",
    ],
    correctAnswer: "Resoluci\u00F3n de facturaci\u00F3n DIAN",
    explanation:
      "Necesitas una resoluci\u00F3n de facturaci\u00F3n expedida por la DIAN para emitir facturas electr\u00F3nicas v\u00E1lidas.",
    difficulty: 2,
  },
  {
    question:
      "\u00BFCu\u00E1l es la sanci\u00F3n m\u00EDnima de la DIAN en 2026?",
    options: ["10 UVT", "5 UVT", "1 UVT", "20 UVT"],
    correctAnswer: "10 UVT",
    explanation:
      "La sanci\u00F3n m\u00EDnima es de 10 UVT. En 2026 eso equivale a casi $498,000. \u00A1Mejor cumplir a tiempo!",
    difficulty: 2,
  },
  {
    question:
      "\u00BFLas personas naturales con ingresos mayores a cu\u00E1nto deben declarar renta?",
    options: [
      "1,400 UVT anuales",
      "500 UVT anuales",
      "2,000 UVT anuales",
      "Todos declaran",
    ],
    correctAnswer: "1,400 UVT anuales",
    explanation:
      "Si tus ingresos superan 1,400 UVT al a\u00F1o (aprox. $69.7 millones en 2026), debes declarar renta.",
    difficulty: 2,
  },
  {
    question: "\u00BFQu\u00E9 es el RUT?",
    options: [
      "Registro \u00DAnico Tributario",
      "Registro Universal de Trabajo",
      "Resoluci\u00F3n de Uso Tributario",
      "Recibo \u00DAnico de Transferencia",
    ],
    correctAnswer: "Registro \u00DAnico Tributario",
    explanation:
      "El RUT es tu identificaci\u00F3n ante la DIAN. Es obligatorio para cualquier actividad econ\u00F3mica.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFLos gastos m\u00E9dicos son deducibles en Colombia?",
    options: [
      "S\u00ED, como deducciones",
      "No, nunca",
      "Solo para empresas",
      "Solo con factura",
    ],
    correctAnswer: "S\u00ED, como deducciones",
    explanation:
      "Los gastos m\u00E9dicos prepagados y ciertos seguros de salud pueden incluirse como deducciones en tu renta.",
    difficulty: 2,
  },
  {
    question:
      "\u00BFQu\u00E9 impuesto pagan las empresas sobre sus ganancias?",
    options: [
      "Impuesto de renta (35%)",
      "IVA (19%)",
      "Retenci\u00F3n (10%)",
      "GMF (4x1000)",
    ],
    correctAnswer: "Impuesto de renta (35%)",
    explanation:
      "Las empresas en Colombia pagan el 35% sobre sus utilidades como impuesto de renta corporativo.",
    difficulty: 2,
  },
  {
    question: "\u00BFQu\u00E9 es el GMF (4x1000)?",
    options: [
      "Gravamen a Movimientos Financieros",
      "Gasto Municipal Federal",
      "Ganancia M\u00EDnima Fiscal",
      "Garant\u00EDa Monetaria Financiera",
    ],
    correctAnswer: "Gravamen a Movimientos Financieros",
    explanation:
      "El 4x1000 te cobra $4 por cada $1,000 que muevas en el sistema financiero. \u00A1Se acumula r\u00E1pido!",
    difficulty: 1,
  },
  {
    question:
      "\u00BFCada cu\u00E1nto se renueva el RUT?",
    options: [
      "No se renueva, se actualiza",
      "Cada a\u00F1o",
      "Cada 5 a\u00F1os",
      "Cada 2 a\u00F1os",
    ],
    correctAnswer: "No se renueva, se actualiza",
    explanation:
      "El RUT no tiene vencimiento. Solo debes actualizarlo cuando cambien tus datos o actividades econ\u00F3micas.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFQu\u00E9 es una factura electr\u00F3nica?",
    options: [
      "Documento digital validado por la DIAN",
      "Un correo con el precio",
      "Una foto de la factura",
      "Un mensaje de WhatsApp",
    ],
    correctAnswer: "Documento digital validado por la DIAN",
    explanation:
      "La factura electr\u00F3nica tiene validez legal y debe ser validada por la DIAN antes de ser entregada al comprador.",
    difficulty: 1,
  },
  {
    question:
      "\u00BFCu\u00E1ntos a\u00F1os debe conservar una empresa sus documentos contables?",
    options: [
      "M\u00EDnimo 10 a\u00F1os",
      "5 a\u00F1os",
      "3 a\u00F1os",
      "1 a\u00F1o",
    ],
    correctAnswer: "M\u00EDnimo 10 a\u00F1os",
    explanation:
      "Seg\u00FAn el C\u00F3digo de Comercio, los documentos contables deben conservarse por m\u00EDnimo 10 a\u00F1os.",
    difficulty: 3,
  },
  {
    question:
      "\u00BFQu\u00E9 beneficio tributario dan las donaciones?",
    options: [
      "Descuento del 25% en renta",
      "Exenci\u00F3n total",
      "No dan beneficio",
      "Solo si supera 100 UVT",
    ],
    correctAnswer: "Descuento del 25% en renta",
    explanation:
      "Las donaciones a entidades sin \u00E1nimo de lucro pueden dar un descuento del 25% del valor donado en tu renta.",
    difficulty: 3,
  },
  {
    question:
      "\u00BFQu\u00E9 es la planeaci\u00F3n tributaria?",
    options: [
      "Estrategia legal para optimizar impuestos",
      "Evadir impuestos",
      "Pagar m\u00E1s impuestos",
      "Ignorar la DIAN",
    ],
    correctAnswer: "Estrategia legal para optimizar impuestos",
    explanation:
      "La planeaci\u00F3n tributaria busca legalmente reducir tu carga fiscal aprovechando beneficios y deducciones.",
    difficulty: 2,
  },
  {
    question:
      "\u00BFQui\u00E9n necesita revisor fiscal obligatoriamente?",
    options: [
      "Sociedades an\u00F3nimas y ciertas SAS",
      "Todas las personas",
      "Solo bancos",
      "Nadie, es voluntario",
    ],
    correctAnswer: "Sociedades an\u00F3nimas y ciertas SAS",
    explanation:
      "Las S.A. siempre lo requieren. Las SAS lo necesitan cuando superan ciertos topes de ingresos o activos.",
    difficulty: 3,
  },
  {
    question:
      "\u00BFQu\u00E9 pasa si no declaras renta a tiempo?",
    options: [
      "Sanci\u00F3n por extemporaneidad + intereses",
      "Nada, se hace despu\u00E9s",
      "Te meten a la c\u00E1rcel",
      "Pierdes el RUT",
    ],
    correctAnswer: "Sanci\u00F3n por extemporaneidad + intereses",
    explanation:
      "Cada mes de retraso genera sanci\u00F3n del 5% del impuesto a cargo, m\u00E1s intereses de mora. \u00A1Costoso!",
    difficulty: 2,
  },
  {
    question:
      "\u00BFCu\u00E1nto es la tarifa de retenci\u00F3n para servicios profesionales?",
    options: ["11%", "5%", "19%", "25%"],
    correctAnswer: "11%",
    explanation:
      "La retenci\u00F3n para servicios profesionales es del 11% cuando el beneficiario es declarante de renta.",
    difficulty: 3,
  },
  {
    question:
      "\u00BFQu\u00E9 es el r\u00E9gimen simple de tributaci\u00F3n?",
    options: [
      "R\u00E9gimen unificado para simplificar impuestos",
      "Un impuesto para pobres",
      "Solo para grandes empresas",
      "Un r\u00E9gimen temporal",
    ],
    correctAnswer: "R\u00E9gimen unificado para simplificar impuestos",
    explanation:
      "El R\u00E9gimen Simple unifica varios impuestos en uno solo, ideal para peque\u00F1os y medianos negocios.",
    difficulty: 3,
  },
  {
    question:
      "\u00BFLos intereses de cr\u00E9ditos de vivienda son deducibles?",
    options: [
      "S\u00ED, hasta 1,200 UVT anuales",
      "No, nunca",
      "Solo el primer a\u00F1o",
      "Solo para vivienda nueva",
    ],
    correctAnswer: "S\u00ED, hasta 1,200 UVT anuales",
    explanation:
      "Puedes deducir intereses de cr\u00E9dito hipotecario hasta 1,200 UVT anuales. \u00A1Gran ahorro en tu renta!",
    difficulty: 3,
  },
];

// ─── Utility Functions ───────────────────────────────────────────────────────

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getStreakTier(streak: number): StreakTier | null {
  for (const tier of STREAK_TIERS) {
    if (streak >= tier.minStreak) return tier;
  }
  return null;
}

function loadHighScore(): number {
  if (typeof window === "undefined") return 0;
  try {
    return parseInt(localStorage.getItem(HIGHSCORE_KEY) || "0", 10);
  } catch {
    return 0;
  }
}

function saveHighScore(score: number): void {
  if (typeof window === "undefined") return;
  try {
    const current = loadHighScore();
    if (score > current) {
      localStorage.setItem(HIGHSCORE_KEY, String(score));
    }
  } catch {
    // localStorage unavailable
  }
}

function prepareGameQuestions(): Question[] {
  const sorted = [...QUESTIONS_BANK].sort(
    (a, b) => a.difficulty - b.difficulty
  );
  const easy = sorted.filter((q) => q.difficulty === 1);
  const medium = sorted.filter((q) => q.difficulty === 2);
  const hard = sorted.filter((q) => q.difficulty === 3);

  const shuffledEasy = shuffleArray(easy);
  const shuffledMedium = shuffleArray(medium);
  const shuffledHard = shuffleArray(hard);

  // Pick ~3 easy, ~4 medium, ~3 hard, then arrange in ascending difficulty
  const selected = [
    ...shuffledEasy.slice(0, 3),
    ...shuffledMedium.slice(0, 4),
    ...shuffledHard.slice(0, 3),
  ];

  // Ensure we have 10
  if (selected.length < QUESTIONS_PER_ROUND) {
    const remaining = shuffleArray(
      QUESTIONS_BANK.filter((q) => !selected.includes(q))
    );
    selected.push(...remaining.slice(0, QUESTIONS_PER_ROUND - selected.length));
  }

  // Sort by difficulty so game gets progressively harder
  return selected
    .sort((a, b) => a.difficulty - b.difficulty)
    .map((q) => ({
      ...q,
      options: shuffleArray(q.options),
    }));
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

const MotionBox = motion.create(Box);

function CircularTimer({
  timeLeft,
  totalTime,
}: {
  timeLeft: number;
  totalTime: number;
}) {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const progress = timeLeft / totalTime;
  const dashOffset = circumference * (1 - progress);

  const color =
    timeLeft <= 5 ? "#EF4444" : timeLeft <= 10 ? "#F59E0B" : "#10B981";
  const isUrgent = timeLeft <= 5;

  return (
    <motion.div
      animate={
        isUrgent
          ? { scale: [1, 1.15, 1], filter: ["brightness(1)", "brightness(1.4)", "brightness(1)"] }
          : { scale: 1 }
      }
      transition={
        isUrgent
          ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0.3 }
      }
      style={{ position: "relative", width: 80, height: 80 }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 40 40)"
          style={{
            transition: "stroke-dashoffset 1s linear, stroke 0.5s ease",
            filter: isUrgent
              ? `drop-shadow(0 0 8px ${color})`
              : "none",
          }}
        />
      </svg>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color,
            fontWeight: 800,
            fontSize: "1.3rem",
            fontFamily: "'Outfit', monospace",
            transition: "color 0.5s ease",
          }}
        >
          {timeLeft}
        </Typography>
      </Box>
    </motion.div>
  );
}

function ConfettiEffect({ particles }: { particles: ConfettiParticle[] }) {
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 100,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: p.x,
            y: p.y,
            rotate: 0,
            scale: p.scale,
            opacity: 1,
          }}
          animate={{
            y: p.y + 400,
            x: p.x + (Math.random() - 0.5) * 200,
            rotate: p.rotation,
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: 10,
            height: 10,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            backgroundColor: p.color,
          }}
        />
      ))}
    </Box>
  );
}

function FloatingScoreAnimation({ scores }: { scores: FloatingScore[] }) {
  return (
    <>
      {scores.map((s) => (
        <motion.div
          key={s.id}
          initial={{ y: 0, opacity: 1, x: s.x }}
          animate={{ y: -80, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "40%",
            left: 0,
            pointerEvents: "none",
            zIndex: 50,
          }}
        >
          <Typography
            sx={{
              color: "#10B981",
              fontWeight: 800,
              fontSize: "1.5rem",
              textShadow: "0 0 10px rgba(16,185,129,0.6)",
            }}
          >
            +{s.value}
          </Typography>
        </motion.div>
      ))}
    </>
  );
}

function BackgroundIcons() {
  const icons = [
    "\uD83D\uDCB0",
    "\uD83D\uDCCA",
    "\uD83D\uDCCB",
    "\uD83C\uDFE6",
    "\uD83D\uDCB3",
    "\uD83D\uDCC8",
    "\uD83E\uDDEE",
    "\uD83D\uDCDD",
  ];
  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {icons.map((icon, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -20, 0, 20, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, 10, 0, -10, 0],
          }}
          transition={{
            duration: 6 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
          style={{
            position: "absolute",
            fontSize: "2rem",
            opacity: 0.12,
            top: `${10 + (i * 12) % 80}%`,
            left: `${5 + (i * 14) % 90}%`,
          }}
        >
          {icon}
        </motion.div>
      ))}
    </Box>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function TriviaBlitzGame() {
  // Game state
  const [gameState, setGameState] = useState<GameState>("start");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [highScore, setHighScore] = useState(0);
  const [floatingScores, setFloatingScores] = useState<FloatingScore[]>([]);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<
    { question: string; yourAnswer: string; correctAnswer: string }[]
  >([]);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [streakMessage, setStreakMessage] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const floatingIdRef = useRef(0);
  const answerLockedRef = useRef(false);

  // Load high score on mount
  useEffect(() => {
    setHighScore(loadHighScore());
  }, []);

  const currentQuestion = questions[currentIndex] ?? null;
  const currentStreakTier = useMemo(() => getStreakTier(streak), [streak]);

  // ─── Timer ─────────────────────────────────────────────────────────────────

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    setTimeLeft(TIME_PER_QUESTION);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Handle time running out
  useEffect(() => {
    if (timeLeft === 0 && gameState === "playing" && !answerLockedRef.current) {
      handleTimeout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, gameState]);

  // ─── Sound Effects (Web Audio API) ─────────────────────────────────────────

  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      audioContextRef.current = new (window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = "sine") => {
      if (!soundEnabled) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, ctx.currentTime);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + duration
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
      } catch {
        // Audio unavailable
      }
    },
    [soundEnabled, getAudioContext]
  );

  const playCorrectSound = useCallback(() => {
    playTone(523, 0.15, "sine");
    setTimeout(() => playTone(659, 0.15, "sine"), 100);
    setTimeout(() => playTone(784, 0.2, "sine"), 200);
  }, [playTone]);

  const playWrongSound = useCallback(() => {
    playTone(330, 0.2, "sawtooth");
    setTimeout(() => playTone(220, 0.3, "sawtooth"), 150);
  }, [playTone]);

  const playStreakSound = useCallback(() => {
    playTone(523, 0.1, "sine");
    setTimeout(() => playTone(659, 0.1, "sine"), 80);
    setTimeout(() => playTone(784, 0.1, "sine"), 160);
    setTimeout(() => playTone(1047, 0.2, "sine"), 240);
  }, [playTone]);

  // ─── Confetti ──────────────────────────────────────────────────────────────

  const spawnConfetti = useCallback(() => {
    const newParticles: ConfettiParticle[] = Array.from(
      { length: 30 },
      (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: -10 + Math.random() * 30,
        color:
          CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 720 - 360,
        scale: 0.5 + Math.random() * 1.5,
      })
    );
    setConfetti(newParticles);
    setTimeout(() => setConfetti([]), 2000);
  }, []);

  // ─── Game Logic ────────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    const prepared = prepareGameQuestions();
    setQuestions(prepared);
    setCurrentIndex(0);
    setScore(0);
    setLives(INITIAL_LIVES);
    setStreak(0);
    setBestStreak(0);
    setTimeLeft(TIME_PER_QUESTION);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setFloatingScores([]);
    setConfetti([]);
    setCorrectAnswers(0);
    setWrongAnswers([]);
    setTotalTimeUsed(0);
    setStreakMessage(null);
    answerLockedRef.current = false;
    setGameState("playing");
    // Timer starts after first render
    setTimeout(() => startTimer(), 100);
  }, [startTimer]);

  const advanceToNext = useCallback(() => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= QUESTIONS_PER_ROUND || lives <= 0) {
      // Game over
      saveHighScore(score);
      setHighScore(Math.max(loadHighScore(), score));
      setGameState("gameover");
      stopTimer();
    } else {
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(null);
      answerLockedRef.current = false;
      setGameState("playing");
      startTimer();
    }
  }, [currentIndex, lives, score, stopTimer, startTimer]);

  const handleTimeout = useCallback(() => {
    if (answerLockedRef.current) return;
    answerLockedRef.current = true;
    stopTimer();

    setIsCorrect(false);
    setSelectedAnswer("__timeout__");
    setStreak(0);
    setLives((prev) => prev - 1);
    setTotalTimeUsed((prev) => prev + TIME_PER_QUESTION);
    playWrongSound();

    if (currentQuestion) {
      setWrongAnswers((prev) => [
        ...prev,
        {
          question: currentQuestion.question,
          yourAnswer: "Tiempo agotado",
          correctAnswer: currentQuestion.correctAnswer,
        },
      ]);
    }

    setGameState("explanation");
    setTimeout(() => {
      advanceToNext();
    }, EXPLANATION_DELAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion, stopTimer, advanceToNext, playWrongSound]);

  const handleAnswer = useCallback(
    (answer: string) => {
      if (answerLockedRef.current || !currentQuestion) return;
      answerLockedRef.current = true;
      stopTimer();

      const timeUsed = TIME_PER_QUESTION - timeLeft;
      setTotalTimeUsed((prev) => prev + timeUsed);
      setSelectedAnswer(answer);

      const correct = answer === currentQuestion.correctAnswer;
      setIsCorrect(correct);

      if (correct) {
        // Calculate points
        const speedBonus =
          timeUsed <= SPEED_BONUS_THRESHOLD
            ? SPEED_BONUS_MAX
            : Math.max(
                0,
                Math.round(
                  SPEED_BONUS_MAX *
                    (1 - (timeUsed - SPEED_BONUS_THRESHOLD) / (TIME_PER_QUESTION - SPEED_BONUS_THRESHOLD))
                )
              );

        const newStreak = streak + 1;
        setStreak(newStreak);
        setBestStreak((prev) => Math.max(prev, newStreak));

        const tier = getStreakTier(newStreak);
        const multiplier = tier ? tier.multiplier : 1;
        const earned = Math.round((BASE_POINTS + speedBonus) * multiplier);

        setScore((prev) => prev + earned);
        setCorrectAnswers((prev) => prev + 1);

        // Floating score
        floatingIdRef.current += 1;
        setFloatingScores((prev) => [
          ...prev,
          {
            id: floatingIdRef.current,
            value: earned,
            x: 20 + Math.random() * 60,
          },
        ]);
        setTimeout(
          () =>
            setFloatingScores((prev) =>
              prev.filter((s) => s.id !== floatingIdRef.current)
            ),
          1500
        );

        // Effects
        playCorrectSound();
        spawnConfetti();

        // Streak message
        const prevTier = getStreakTier(streak);
        const newTier = getStreakTier(newStreak);
        if (newTier && (!prevTier || newTier.minStreak > prevTier.minStreak)) {
          playStreakSound();
          setStreakMessage(
            `${newTier.emoji} RACHA x${newStreak}! (${newTier.multiplier}x puntos)`
          );
          setTimeout(() => setStreakMessage(null), 2000);
        }
      } else {
        setStreak(0);
        setLives((prev) => prev - 1);
        playWrongSound();
        setWrongAnswers((prev) => [
          ...prev,
          {
            question: currentQuestion.question,
            yourAnswer: answer,
            correctAnswer: currentQuestion.correctAnswer,
          },
        ]);
      }

      setGameState("explanation");
      setTimeout(() => {
        advanceToNext();
      }, EXPLANATION_DELAY);
    },
    [
      currentQuestion,
      stopTimer,
      timeLeft,
      streak,
      playCorrectSound,
      playWrongSound,
      playStreakSound,
      spawnConfetti,
      advanceToNext,
    ]
  );

  // ─── Rank Calculation ──────────────────────────────────────────────────────

  const getRank = useCallback(() => {
    if (score >= 900)
      return {
        title: "Gur\u00FA Tributario \uD83D\uDC51",
        message:
          "\u00A1Extraordinario! Eres de los mejores. Agenda para estrategias avanzadas.",
        color: "#F59E0B",
      };
    if (score >= 600)
      return {
        title: "Analista Financiero \uD83D\uDCCA",
        message:
          "\u00A1Impresionante dominio! Imagina optimizar tus impuestos con una experta.",
        color: "#8B5CF6",
      };
    if (score >= 300)
      return {
        title: "Estudiante Tributario \uD83D\uDCDA",
        message:
          "\u00A1Buen conocimiento base! Con asesor\u00EDa profesional ir\u00EDas mucho m\u00E1s lejos.",
        color: "#3B82F6",
      };
    return {
      title: "Novato Fiscal \uD83D\uDCDD",
      message:
        "Los impuestos colombianos son complejos. \u00A1Una asesora experta te puede guiar!",
      color: "#10B981",
    };
  }, [score]);

  // ─── Render: Start Screen ─────────────────────────────────────────────────

  if (gameState === "start") {
    return (
      <Box
        sx={{
          minHeight: { xs: "auto", md: 600 },
          background: "linear-gradient(165deg, #0F0A1A 0%, #1A1040 50%, #0F0A1A 100%)",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          position: "relative",
          maxWidth: 650,
          mx: "auto",
          p: { xs: 3, sm: 4, md: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <BackgroundIcons />

        <MotionBox
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.2rem" },
              fontWeight: 900,
              fontFamily: "'Playfair Display', serif",
              background:
                "linear-gradient(135deg, #A78BFA 0%, #F59E0B 50%, #A78BFA 100%)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
              lineHeight: 1.1,
            }}
          >
            {"\uD83E\uDDE0"} Trivia Tributaria
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: { xs: "1rem", sm: "1.15rem" },
              mb: 4,
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            {"\u00BFCu\u00E1nto sabes de impuestos en Colombia?"}
          </Typography>

          <Box
            sx={{
              mb: 4,
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "10 preguntas",
              "15 seg c/u",
              "3 vidas",
            ].map((tag) => (
              <Box
                key={tag}
                sx={{
                  px: 2,
                  py: 0.75,
                  borderRadius: 50,
                  border: "1px solid rgba(167,139,250,0.3)",
                  background: "rgba(93,63,211,0.15)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.85rem",
                  fontFamily: "'Outfit', sans-serif",
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>

          {highScore > 0 && (
            <MotionBox
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              sx={{ mb: 3 }}
            >
              <Typography
                sx={{
                  color: "#F59E0B",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                {"\u2B50"} Mejor puntaje: {highScore}
              </Typography>
            </MotionBox>
          )}

          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Button
              onClick={startGame}
              variant="contained"
              size="large"
              sx={{
                background:
                  "linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%)",
                color: "#FFF",
                fontWeight: 800,
                fontSize: { xs: "1.1rem", sm: "1.25rem" },
                px: { xs: 5, sm: 7 },
                py: 1.75,
                borderRadius: 50,
                textTransform: "uppercase",
                letterSpacing: 2,
                boxShadow: "0 0 30px rgba(93,63,211,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #5D3FD3 100%)",
                  boxShadow: "0 0 40px rgba(93,63,211,0.6)",
                },
              }}
            >
              COMENZAR
            </Button>
          </motion.div>
        </MotionBox>
      </Box>
    );
  }

  // ─── Render: Game Over ─────────────────────────────────────────────────────

  if (gameState === "gameover") {
    const rank = getRank();
    const accuracy =
      correctAnswers + wrongAnswers.length > 0
        ? Math.round(
            (correctAnswers / (correctAnswers + wrongAnswers.length)) * 100
          )
        : 0;
    const avgTime =
      correctAnswers + wrongAnswers.length > 0
        ? (totalTimeUsed / (correctAnswers + wrongAnswers.length)).toFixed(1)
        : "0";
    const didYouKnow = wrongAnswers.length > 0 ? wrongAnswers[0] : null;

    return (
      <Box
        sx={{
          minHeight: { xs: "auto", md: 600 },
          background: "linear-gradient(165deg, #0F0A1A 0%, #1A1040 50%, #0F0A1A 100%)",
          borderRadius: { xs: 3, md: 4 },
          overflow: "hidden",
          position: "relative",
          maxWidth: 650,
          mx: "auto",
          p: { xs: 2.5, sm: 4, md: 5 },
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", position: "relative", zIndex: 1 }}
        >
          {/* Score */}
          <Typography
            sx={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9rem",
              textTransform: "uppercase",
              letterSpacing: 3,
              mb: 1,
            }}
          >
            Puntaje Final
          </Typography>
          <CountUpScore target={score} />

          {/* Rank */}
          <MotionBox
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            sx={{
              mt: 2,
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "1.4rem", sm: "1.7rem" },
                fontWeight: 800,
                color: rank.color,
                fontFamily: "'Playfair Display', serif",
              }}
            >
              {rank.title}
            </Typography>
          </MotionBox>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.95rem",
              mb: 3,
              maxWidth: 400,
              mx: "auto",
            }}
          >
            {rank.message}
          </Typography>

          {/* Stats Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1.5,
              mb: 3,
              maxWidth: 380,
              mx: "auto",
            }}
          >
            {[
              {
                label: "Correctas",
                value: `${correctAnswers}/${correctAnswers + wrongAnswers.length}`,
              },
              { label: "Precisi\u00F3n", value: `${accuracy}%` },
              { label: "Mejor racha", value: `${bestStreak}` },
              { label: "Tiempo prom.", value: `${avgTime}s` },
            ].map((stat) => (
              <Box
                key={stat.label}
                sx={{
                  background: "rgba(255,255,255,0.05)",
                  borderRadius: 2,
                  p: 1.5,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: 1,
                  }}
                >
                  {stat.label}
                </Typography>
                <Typography
                  sx={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontSize: "1.3rem",
                  }}
                >
                  {stat.value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Did You Know */}
          {didYouKnow && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              sx={{
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.25)",
                borderRadius: 2,
                p: 2,
                mb: 3,
                textAlign: "left",
              }}
            >
              <Typography
                sx={{
                  color: "#F59E0B",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  mb: 0.5,
                }}
              >
                {"\uD83D\uDCA1"} {"\u00BFSab\u00EDas que...?"}
              </Typography>
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: "0.85rem",
                  lineHeight: 1.5,
                }}
              >
                {didYouKnow.question}
              </Typography>
              <Typography
                sx={{
                  color: "#10B981",
                  fontSize: "0.85rem",
                  mt: 0.5,
                  fontWeight: 600,
                }}
              >
                R: {didYouKnow.correctAnswer}
              </Typography>
            </MotionBox>
          )}

          {/* Wrong Answers Review */}
          {wrongAnswers.length > 1 && (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              sx={{
                mb: 3,
                maxHeight: 200,
                overflowY: "auto",
                "&::-webkit-scrollbar": { width: 4 },
                "&::-webkit-scrollbar-thumb": {
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 2,
                },
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.8rem",
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  mb: 1,
                  textAlign: "left",
                }}
              >
                Respuestas incorrectas
              </Typography>
              {wrongAnswers.slice(1).map((wa, i) => (
                <Box
                  key={i}
                  sx={{
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.15)",
                    borderRadius: 1.5,
                    p: 1.5,
                    mb: 1,
                    textAlign: "left",
                  }}
                >
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.8rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {wa.question}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#EF4444",
                      fontSize: "0.75rem",
                      mt: 0.3,
                    }}
                  >
                    Tu respuesta: {wa.yourAnswer}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#10B981",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                    }}
                  >
                    Correcta: {wa.correctAnswer}
                  </Typography>
                </Box>
              ))}
            </MotionBox>
          )}

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              onClick={startGame}
              startIcon={<ReplayIcon />}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(135deg, #5D3FD3 0%, #7C3AED 100%)",
                color: "#FFF",
                fontWeight: 700,
                px: 4,
                py: 1.5,
                borderRadius: 50,
                fontSize: "0.95rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #7C3AED 0%, #5D3FD3 100%)",
                },
              }}
            >
              JUGAR DE NUEVO
            </Button>
            <Button
              component="a"
              href="https://wa.me/573207269417?text=Hola%20Yakeline,%20jugu%C3%A9%20Trivia%20Tributaria%20y%20quiero%20aprender%20m%C3%A1s%20sobre%20mis%20impuestos"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<WhatsAppIcon />}
              variant="contained"
              sx={{
                background:
                  "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                color: "#FFF",
                fontWeight: 700,
                px: 3,
                py: 1.5,
                borderRadius: 50,
                fontSize: "0.9rem",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #128C7E 0%, #25D366 100%)",
                },
              }}
            >
              Consulta con una Experta
            </Button>
          </Box>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.72rem",
              mt: 3,
            }}
          >
            Basado en legislaci\u00F3n tributaria colombiana vigente
          </Typography>
        </MotionBox>
      </Box>
    );
  }

  // ─── Render: Playing / Explanation ─────────────────────────────────────────

  if (!currentQuestion) return null;

  const showExplanation = gameState === "explanation";

  return (
    <Box
      sx={{
        minHeight: { xs: 520, sm: 560, md: 600 },
        background: "linear-gradient(165deg, #0F0A1A 0%, #1A1040 50%, #0F0A1A 100%)",
        borderRadius: { xs: 3, md: 4 },
        overflow: "hidden",
        position: "relative",
        maxWidth: 650,
        mx: "auto",
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Confetti layer */}
      <ConfettiEffect particles={confetti} />

      {/* Floating scores */}
      <FloatingScoreAnimation scores={floatingScores} />

      {/* HUD - Top Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Score */}
        <Box sx={{ textAlign: "left" }}>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.65rem",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              lineHeight: 1,
            }}
          >
            Puntos
          </Typography>
          <Typography
            sx={{
              color: "#FFF",
              fontWeight: 800,
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              lineHeight: 1.1,
            }}
          >
            {score}
          </Typography>
        </Box>

        {/* Timer */}
        <CircularTimer timeLeft={timeLeft} totalTime={TIME_PER_QUESTION} />

        {/* Lives */}
        <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
          {Array.from({ length: INITIAL_LIVES }, (_, i) => (
            <motion.div
              key={i}
              animate={
                i >= lives
                  ? { scale: 0.7, opacity: 0.2 }
                  : { scale: 1, opacity: 1 }
              }
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FavoriteIcon
                sx={{
                  fontSize: { xs: 22, sm: 26 },
                  color: i < lives ? "#EF4444" : "rgba(255,255,255,0.15)",
                  filter:
                    i < lives
                      ? "drop-shadow(0 0 4px rgba(239,68,68,0.5))"
                      : "none",
                  transition: "color 0.3s ease",
                }}
              />
            </motion.div>
          ))}
          <IconButton
            onClick={() => setSoundEnabled((p) => !p)}
            size="small"
            sx={{
              color: "rgba(255,255,255,0.3)",
              ml: 0.5,
              p: 0.5,
              "&:hover": { color: "rgba(255,255,255,0.6)" },
            }}
          >
            {soundEnabled ? (
              <VolumeUpIcon sx={{ fontSize: 18 }} />
            ) : (
              <VolumeOffIcon sx={{ fontSize: 18 }} />
            )}
          </IconButton>
        </Box>
      </Box>

      {/* Streak Indicator */}
      <AnimatePresence mode="wait">
        {currentStreakTier && (
          <MotionBox
            key={currentStreakTier.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            sx={{
              textAlign: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                color:
                  currentStreakTier.name === "Diamond"
                    ? "#60A5FA"
                    : currentStreakTier.name === "Lightning"
                      ? "#FBBF24"
                      : "#F97316",
                fontWeight: 800,
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                textShadow: "0 0 12px currentColor",
              }}
            >
              {currentStreakTier.emoji} Racha x{streak} ({currentStreakTier.multiplier}x puntos)
            </Typography>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Streak activation message */}
      <AnimatePresence>
        {streakMessage && (
          <MotionBox
            initial={{ scale: 2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 200,
              pointerEvents: "none",
            }}
          >
            <Typography
              sx={{
                color: "#F59E0B",
                fontWeight: 900,
                fontSize: { xs: "1.5rem", sm: "2rem" },
                textShadow:
                  "0 0 30px rgba(245,158,11,0.8), 0 0 60px rgba(245,158,11,0.4)",
                whiteSpace: "nowrap",
              }}
            >
              {streakMessage}
            </Typography>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Question Card */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 5 }}>
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentIndex}
            initial={{ x: 80, opacity: 0 }}
            animate={{
              x: 0,
              opacity: 1,
              ...(isCorrect === false && selectedAnswer
                ? {}
                : {}),
            }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            sx={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            {/* Card shake wrapper for wrong answers */}
            <motion.div
              animate={
                isCorrect === false && selectedAnswer
                  ? { x: [0, -12, 12, -8, 8, -4, 4, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.5 }}
              style={{ flex: 1, display: "flex", flexDirection: "column" }}
            >
              {/* Glassmorphism Question Card */}
              <Box
                sx={{
                  background: isCorrect === true
                    ? "rgba(16,185,129,0.12)"
                    : isCorrect === false
                      ? "rgba(239,68,68,0.1)"
                      : "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isCorrect === true
                    ? "1px solid rgba(16,185,129,0.3)"
                    : isCorrect === false
                      ? "1px solid rgba(239,68,68,0.25)"
                      : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 3,
                  p: { xs: 2.5, sm: 3 },
                  mb: 2,
                  transition: "all 0.3s ease",
                }}
              >
                {/* Difficulty dots */}
                <Box sx={{ display: "flex", gap: 0.5, mb: 1.5 }}>
                  {Array.from({ length: 3 }, (_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background:
                          i < currentQuestion.difficulty
                            ? currentQuestion.difficulty === 1
                              ? "#10B981"
                              : currentQuestion.difficulty === 2
                                ? "#F59E0B"
                                : "#EF4444"
                            : "rgba(255,255,255,0.1)",
                        transition: "background 0.3s ease",
                      }}
                    />
                  ))}
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "0.7rem",
                      ml: 1,
                    }}
                  >
                    {currentQuestion.difficulty === 1
                      ? "F\u00E1cil"
                      : currentQuestion.difficulty === 2
                        ? "Medio"
                        : "Dif\u00EDcil"}
                  </Typography>
                </Box>

                <Typography
                  sx={{
                    color: "#FFF",
                    fontSize: { xs: "1.05rem", sm: "1.2rem" },
                    fontWeight: 600,
                    lineHeight: 1.4,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {currentQuestion.question}
                </Typography>
              </Box>

              {/* Answer Buttons */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.25,
                  flex: 1,
                }}
              >
                {currentQuestion.options.map((option, i) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption =
                    option === currentQuestion.correctAnswer;
                  const showResult = selectedAnswer !== null;

                  let bgColor = "rgba(255,255,255,0.04)";
                  let borderColor = "rgba(167,139,250,0.2)";
                  let textColor = "rgba(255,255,255,0.9)";

                  if (showResult) {
                    if (isCorrectOption) {
                      bgColor = "rgba(16,185,129,0.2)";
                      borderColor = "#10B981";
                      textColor = "#10B981";
                    } else if (isSelected && !isCorrectOption) {
                      bgColor = "rgba(239,68,68,0.15)";
                      borderColor = "#EF4444";
                      textColor = "#EF4444";
                    } else {
                      bgColor = "rgba(255,255,255,0.02)";
                      borderColor = "rgba(255,255,255,0.05)";
                      textColor = "rgba(255,255,255,0.3)";
                    }
                  }

                  return (
                    <MotionBox
                      key={option}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.1 + i * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 25,
                      }}
                    >
                      <Button
                        fullWidth
                        onClick={() => handleAnswer(option)}
                        disabled={showResult}
                        sx={{
                          background: bgColor,
                          border: `1.5px solid ${borderColor}`,
                          borderRadius: 2.5,
                          p: { xs: 1.5, sm: 1.75 },
                          textAlign: "left",
                          justifyContent: "flex-start",
                          color: textColor,
                          fontWeight: 600,
                          fontSize: { xs: "0.88rem", sm: "0.95rem" },
                          fontFamily: "'Outfit', sans-serif",
                          textTransform: "none",
                          transition: "all 0.25s ease",
                          position: "relative",
                          overflow: "hidden",
                          boxShadow: "none",
                          "&:hover": showResult
                            ? {}
                            : {
                                background: "rgba(93,63,211,0.15)",
                                borderColor: "#5D3FD3",
                                boxShadow:
                                  "0 0 20px rgba(93,63,211,0.25)",
                                transform: "translateY(-1px)",
                              },
                          "&.Mui-disabled": {
                            color: textColor,
                          },
                        }}
                      >
                        {/* Letter prefix */}
                        <Box
                          component="span"
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background:
                              showResult && isCorrectOption
                                ? "rgba(16,185,129,0.2)"
                                : showResult && isSelected && !isCorrectOption
                                  ? "rgba(239,68,68,0.2)"
                                  : "rgba(167,139,250,0.15)",
                            mr: 1.5,
                            flexShrink: 0,
                            fontSize: "0.8rem",
                            fontWeight: 700,
                            color:
                              showResult && isCorrectOption
                                ? "#10B981"
                                : showResult && isSelected && !isCorrectOption
                                  ? "#EF4444"
                                  : "#A78BFA",
                          }}
                        >
                          {showResult && isCorrectOption ? (
                            <CheckCircleIcon
                              sx={{ fontSize: 18 }}
                            />
                          ) : showResult && isSelected && !isCorrectOption ? (
                            <CancelIcon sx={{ fontSize: 18 }} />
                          ) : (
                            LETTER_PREFIXES[i]
                          )}
                        </Box>
                        {option}
                      </Button>
                    </MotionBox>
                  );
                })}
              </Box>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <MotionBox
                    initial={{ opacity: 0, y: 15, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3 }}
                    sx={{
                      mt: 2,
                      background: "rgba(167,139,250,0.08)",
                      border: "1px solid rgba(167,139,250,0.2)",
                      borderRadius: 2,
                      p: 2,
                      overflow: "hidden",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: { xs: "0.82rem", sm: "0.88rem" },
                        lineHeight: 1.5,
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      {"\uD83D\uDCA1"} {currentQuestion.explanation}
                    </Typography>
                  </MotionBox>
                )}
              </AnimatePresence>
            </motion.div>
          </MotionBox>
        </AnimatePresence>
      </Box>

      {/* Bottom Bar - Question Counter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 2,
          position: "relative",
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 0.75,
            alignItems: "center",
          }}
        >
          {Array.from({ length: QUESTIONS_PER_ROUND }, (_, i) => (
            <Box
              key={i}
              sx={{
                width: { xs: 8, sm: 10 },
                height: { xs: 8, sm: 10 },
                borderRadius: "50%",
                background:
                  i < currentIndex
                    ? "#5D3FD3"
                    : i === currentIndex
                      ? "#A78BFA"
                      : "rgba(255,255,255,0.1)",
                transition: "all 0.3s ease",
                boxShadow:
                  i === currentIndex
                    ? "0 0 8px rgba(167,139,250,0.6)"
                    : "none",
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.75rem",
            ml: 1.5,
          }}
        >
          {currentIndex + 1}/{QUESTIONS_PER_ROUND}
        </Typography>
      </Box>

      {/* Disclaimer */}
      <Typography
        sx={{
          color: "rgba(255,255,255,0.15)",
          fontSize: "0.65rem",
          textAlign: "center",
          mt: 1.5,
        }}
      >
        Basado en legislaci\u00F3n tributaria colombiana vigente
      </Typography>
    </Box>
  );
}

// ─── Count-Up Score Component ────────────────────────────────────────────────

function CountUpScore({ target }: { target: number }) {
  const [displayed, setDisplayed] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const duration = 1500;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * target));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target]);

  return (
    <Typography
      sx={{
        color: "#FFF",
        fontWeight: 900,
        fontSize: { xs: "3rem", sm: "3.8rem" },
        fontFamily: "'Playfair Display', serif",
        lineHeight: 1,
        textShadow: "0 0 40px rgba(167,139,250,0.4)",
      }}
    >
      {displayed}
    </Typography>
  );
}
