"use client";

import { useState, useCallback, useMemo, useEffect, useRef, ReactElement } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  LinearProgress,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import ShieldRoundedIcon from "@mui/icons-material/ShieldRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";

// ─── Types ───────────────────────────────────────────────────────────────────

interface QuizOption {
  label: string;
  score: number;
}

interface QuizQuestion {
  id: number;
  question: string;
  category: string;
  options: QuizOption[];
}

interface DiagnosisLevel {
  label: string;
  color: string;
  bgColor: string;
  icon: ReactElement;
  message: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const questions: QuizQuestion[] = [
  {
    id: 1,
    question: "¿Cómo manejas tu declaración de renta?",
    category: "Declaración de renta",
    options: [
      { label: "No declaro, ni sé si debo hacerlo", score: 0 },
      { label: "Declaro pero siempre a última hora y con estrés", score: 1 },
      { label: "Declaro a tiempo con ayuda de un contador", score: 2 },
      { label: "Tengo un plan tributario optimizado todo el año", score: 3 },
    ],
  },
  {
    id: 2,
    question: "¿Llevas un registro organizado de tus ingresos y gastos?",
    category: "Registro contable",
    options: [
      { label: "No llevo registros de ningún tipo", score: 0 },
      { label: "Anoto algunas cosas en un cuaderno o Excel básico", score: 1 },
      { label: "Tengo un Excel detallado o app de finanzas", score: 2 },
      { label: "Uso software contable profesional con reportes", score: 3 },
    ],
  },
  {
    id: 3,
    question: "¿Conoces tus obligaciones tributarias con la DIAN?",
    category: "Obligaciones DIAN",
    options: [
      { label: "No sé cuáles son mis obligaciones", score: 0 },
      { label: "Conozco algunas pero no estoy seguro/a", score: 1 },
      { label: "Las conozco pero a veces se me pasan fechas", score: 2 },
      { label: "Las conozco todas y las cumplo puntualmente", score: 3 },
    ],
  },
  {
    id: 4,
    question: "¿Tienes un plan de ahorro e inversión?",
    category: "Ahorro e inversión",
    options: [
      { label: "No ahorro, gasto todo lo que entra", score: 0 },
      { label: "Ahorro de vez en cuando lo que sobra", score: 1 },
      { label: "Ahorro un porcentaje fijo cada mes", score: 2 },
      { label: "Tengo inversiones diversificadas y metas claras", score: 3 },
    ],
  },
  {
    id: 5,
    question: "¿Cómo manejas la facturación de tu negocio?",
    category: "Facturación",
    options: [
      { label: "No facturo, todo es informal", score: 0 },
      { label: "Facturo solo cuando me lo piden", score: 1 },
      { label: "Facturo todo pero de forma manual", score: 2 },
      { label: "Facturación electrónica automatizada y organizada", score: 3 },
    ],
  },
];

const WHATSAPP_NUMBER = "573207269417";

function getDiagnosis(percentage: number): DiagnosisLevel {
  if (percentage <= 30) {
    return {
      label: "Critico",
      color: "#EF4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
      icon: <ErrorRoundedIcon sx={{ fontSize: 28 }} />,
      message:
        "Tu salud financiera necesita atención urgente. Estás expuesto/a a sanciones de la DIAN y pérdidas significativas. Es momento de actuar.",
    };
  }
  if (percentage <= 50) {
    return {
      label: "En riesgo",
      color: "#F97316",
      bgColor: "rgba(249, 115, 22, 0.1)",
      icon: <WarningAmberRoundedIcon sx={{ fontSize: 28 }} />,
      message:
        "Hay señales de alerta en tus finanzas. Tienes algunos hábitos pero falta estructura y organización profesional para evitar problemas.",
    };
  }
  if (percentage <= 70) {
    return {
      label: "Estable",
      color: "#3B82F6",
      bgColor: "rgba(59, 130, 246, 0.1)",
      icon: <ShieldRoundedIcon sx={{ fontSize: 28 }} />,
      message:
        "Vas por buen camino pero hay oportunidades de mejora. Con ajustes estratégicos podrías optimizar tu carga tributaria y ahorrar más.",
    };
  }
  return {
    label: "Saludable",
    color: "#10B981",
    bgColor: "rgba(16, 185, 129, 0.1)",
    icon: <CheckCircleRoundedIcon sx={{ fontSize: 28 }} />,
    message:
      "Excelente manejo financiero. Mantienes control, cumples con la DIAN y planificas a futuro. Sigue así y busca optimizar aún más.",
  };
}

function getRecommendations(answers: number[]): string[] {
  const recs: string[] = [];
  if (answers[0] !== undefined && answers[0] < 2) {
    recs.push(
      "Agenda una revisión de tu situación tributaria para saber si debes declarar renta y cómo optimizar tu declaración."
    );
  }
  if (answers[1] !== undefined && answers[1] < 2) {
    recs.push(
      "Implementa un sistema de registro de ingresos y gastos. Esto es la base para tomar buenas decisiones financieras."
    );
  }
  if (answers[2] !== undefined && answers[2] < 2) {
    recs.push(
      "Identifica tus obligaciones con la DIAN y crea un calendario tributario para evitar sanciones y multas."
    );
  }
  if (answers[3] !== undefined && answers[3] < 2) {
    recs.push(
      "Define un porcentaje fijo de ahorro mensual y explora opciones de inversión adecuadas para tu perfil."
    );
  }
  if (answers[4] !== undefined && answers[4] < 2) {
    recs.push(
      "Formaliza tu facturación con facturación electrónica. Es obligatorio en Colombia y te da control sobre tus ingresos."
    );
  }
  if (recs.length === 0) {
    recs.push(
      "Tu situación es sólida. Una asesoría especializada puede ayudarte a encontrar oportunidades de optimización tributaria avanzada."
    );
  }
  return recs;
}

// ─── Confetti Particle ──────────────────────────────────────────────────────

function ConfettiParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.8,
        duration: 2 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        color: [
          "#5D3FD3",
          "#F59E0B",
          "#10B981",
          "#3B82F6",
          "#EC4899",
          "#8B5CF6",
        ][Math.floor(Math.random() * 6)],
        rotation: Math.random() * 360,
      })),
    []
  );

  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: -20,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.size > 10 ? "50%" : "2px",
          }}
        />
      ))}
    </Box>
  );
}

// ─── Circular Score Gauge ───────────────────────────────────────────────────

function ScoreGauge({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <Box
      sx={{
        position: "relative",
        width: radius * 2,
        height: radius * 2,
        mx: "auto",
        mb: 3,
      }}
    >
      <svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        {/* Background ring */}
        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke="rgba(93, 63, 211, 0.1)"
          strokeWidth={stroke}
        />
        {/* Animated progress ring */}
        <motion.circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset:
              circumference - (percentage / 100) * circumference,
          }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{
            transformOrigin: "center",
            transform: "rotate(-90deg)",
          }}
        />
      </svg>
      {/* Percentage text in center */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Typography
            sx={{
              fontSize: { xs: 32, md: 38 },
              fontWeight: 800,
              fontFamily: "'Playfair Display', serif",
              color,
              lineHeight: 1,
            }}
          >
            {percentage}%
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function FinancialHealthQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [direction, setDirection] = useState(1); // 1 forward, -1 back
  const containerRef = useRef<HTMLDivElement>(null);

  const totalQuestions = questions.length;
  const maxScore = totalQuestions * 3;
  const progress = showResults
    ? 100
    : (currentStep / totalQuestions) * 100;

  const totalScore = useMemo(
    () => answers.reduce((sum, score) => sum + score, 0),
    [answers]
  );
  const percentage = useMemo(
    () => Math.round((totalScore / maxScore) * 100),
    [totalScore, maxScore]
  );
  const diagnosis = useMemo(() => getDiagnosis(percentage), [percentage]);
  const recommendations = useMemo(
    () => getRecommendations(answers),
    [answers]
  );

  const handleSelectOption = useCallback(
    (score: number, optionIndex: number) => {
      setSelectedOption(optionIndex);

      // Small delay so user sees the selection before advancing
      setTimeout(() => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = score;
        setAnswers(newAnswers);
        setDirection(1);

        if (currentStep < totalQuestions - 1) {
          setCurrentStep((prev) => prev + 1);
          setSelectedOption(null);
        } else {
          setShowResults(true);
        }
      }, 400);
    },
    [answers, currentStep, totalQuestions]
  );

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
      setSelectedOption(null);
    }
  }, [currentStep]);

  const handleRestart = useCallback(() => {
    setCurrentStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResults(false);
    setDirection(1);
  }, []);

  const whatsappMessage = useMemo(() => {
    const text = `Hola Yakeline, acabo de hacer el diagnóstico de salud financiera y obtuve ${percentage}% (${diagnosis.label}). Me gustaría agendar una consulta gratuita para mejorar mis finanzas.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }, [percentage, diagnosis.label]);

  // Scroll into view when step changes
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.top < 0 || rect.top > window.innerHeight * 0.5) {
        containerRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentStep, showResults]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  const currentQuestion = questions[currentStep];

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(135deg, #F5F3FF 0%, #FDF4FF 30%, #FFFBEB 60%, #F0F9FF 100%)",
      }}
    >
      {/* Background decorative mesh */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.4,
          background:
            "radial-gradient(circle at 20% 20%, rgba(93, 63, 211, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(245, 158, 11, 0.08) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.05) 0%, transparent 40%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Chip
              label="DIAGNOSTICO GRATUITO"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: "0.75rem",
                letterSpacing: 1.5,
                background:
                  "linear-gradient(135deg, #5D3FD3 0%, #8B5CF6 100%)",
                color: "#fff",
                height: 32,
                px: 1,
                "& .MuiChip-label": { px: 1.5 },
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.75rem", md: "2.25rem" },
                color: "#1F2937",
                lineHeight: 1.3,
                mb: 1.5,
              }}
            >
              ¿Que tan saludables estan{" "}
              <Box
                component="span"
                sx={{
                  background:
                    "linear-gradient(135deg, #5D3FD3, #F59E0B)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                tus finanzas?
              </Box>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.95rem", md: "1.05rem" },
                color: "#6B7280",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Responde 5 preguntas rapidas y descubre tu nivel de salud
              financiera con recomendaciones personalizadas.
            </Typography>
          </Box>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: "24px",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.8)",
              boxShadow:
                "0 20px 60px -15px rgba(93, 63, 211, 0.15), 0 0 0 1px rgba(93, 63, 211, 0.05)",
              overflow: "hidden",
              minHeight: { xs: 420, md: 400 },
            }}
          >
            {/* Progress bar */}
            <Box sx={{ px: 0 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                  height: 5,
                  borderRadius: 0,
                  backgroundColor: "rgba(93, 63, 211, 0.08)",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 0,
                    background:
                      "linear-gradient(90deg, #5D3FD3, #8B5CF6, #F59E0B)",
                    transition: "transform 0.6s ease",
                  },
                }}
              />
            </Box>

            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <AnimatePresence mode="wait" custom={direction}>
                {!showResults ? (
                  /* ─── Question View ──────────────────────────── */
                  <motion.div
                    key={`question-${currentStep}`}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    {/* Step indicator */}
                    <Typography
                      sx={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#5D3FD3",
                        letterSpacing: 0.5,
                        mb: 1,
                      }}
                    >
                      Pregunta {currentStep + 1} de {totalQuestions}
                    </Typography>

                    {/* Question */}
                    <Typography
                      sx={{
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        fontSize: { xs: "1.15rem", md: "1.3rem" },
                        color: "#1F2937",
                        mb: 3,
                        lineHeight: 1.4,
                      }}
                    >
                      {currentQuestion.question}
                    </Typography>

                    {/* Options */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                      }}
                    >
                      {currentQuestion.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        return (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: idx * 0.08,
                              duration: 0.3,
                            }}
                          >
                            <Box
                              onClick={() =>
                                selectedOption === null &&
                                handleSelectOption(option.score, idx)
                              }
                              sx={{
                                p: { xs: 2, md: 2.5 },
                                borderRadius: "16px",
                                border: isSelected
                                  ? "2px solid #5D3FD3"
                                  : "2px solid rgba(93, 63, 211, 0.08)",
                                background: isSelected
                                  ? "linear-gradient(135deg, rgba(93, 63, 211, 0.08), rgba(139, 92, 246, 0.06))"
                                  : "rgba(255, 255, 255, 0.6)",
                                cursor:
                                  selectedOption === null
                                    ? "pointer"
                                    : "default",
                                transition: "all 0.25s ease",
                                transform: isSelected
                                  ? "scale(1.02)"
                                  : "scale(1)",
                                "&:hover":
                                  selectedOption === null
                                    ? {
                                        borderColor:
                                          "rgba(93, 63, 211, 0.3)",
                                        background:
                                          "rgba(93, 63, 211, 0.04)",
                                        transform: "scale(1.01)",
                                      }
                                    : {},
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 2,
                                }}
                              >
                                {/* Letter badge */}
                                <Box
                                  sx={{
                                    width: 36,
                                    height: 36,
                                    minWidth: 36,
                                    borderRadius: "10px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    background: isSelected
                                      ? "linear-gradient(135deg, #5D3FD3, #8B5CF6)"
                                      : "rgba(93, 63, 211, 0.08)",
                                    color: isSelected
                                      ? "#fff"
                                      : "#5D3FD3",
                                    transition: "all 0.25s ease",
                                  }}
                                >
                                  {String.fromCharCode(65 + idx)}
                                </Box>
                                <Typography
                                  sx={{
                                    fontSize: {
                                      xs: "0.9rem",
                                      md: "0.95rem",
                                    },
                                    fontWeight: isSelected ? 600 : 500,
                                    color: isSelected
                                      ? "#5D3FD3"
                                      : "#374151",
                                    lineHeight: 1.4,
                                  }}
                                >
                                  {option.label}
                                </Typography>
                              </Box>
                            </Box>
                          </motion.div>
                        );
                      })}
                    </Box>

                    {/* Back button */}
                    {currentStep > 0 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          onClick={handleBack}
                          startIcon={<ArrowBackRoundedIcon />}
                          sx={{
                            mt: 3,
                            color: "#6B7280",
                            fontWeight: 500,
                            fontSize: "0.85rem",
                            textTransform: "none",
                            boxShadow: "none",
                            "&:hover": {
                              background: "rgba(93, 63, 211, 0.06)",
                              color: "#5D3FD3",
                              boxShadow: "none",
                              transform: "none",
                            },
                          }}
                        >
                          Anterior
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  /* ─── Results View ───────────────────────────── */
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Confetti for healthy score */}
                    {percentage > 70 && <ConfettiParticles />}

                    <Box
                      sx={{
                        textAlign: "center",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {/* Score gauge */}
                      <ScoreGauge
                        percentage={percentage}
                        color={diagnosis.color}
                      />

                      {/* Diagnosis badge */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.4 }}
                      >
                        <Chip
                          icon={diagnosis.icon}
                          label={diagnosis.label}
                          sx={{
                            mb: 2,
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            height: 40,
                            px: 1,
                            backgroundColor: diagnosis.bgColor,
                            color: diagnosis.color,
                            border: `1px solid ${diagnosis.color}20`,
                            "& .MuiChip-icon": {
                              color: diagnosis.color,
                            },
                          }}
                        />
                      </motion.div>

                      {/* Diagnosis message */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: "0.95rem", md: "1rem" },
                            color: "#4B5563",
                            lineHeight: 1.6,
                            mb: 3,
                            maxWidth: 480,
                            mx: "auto",
                          }}
                        >
                          {diagnosis.message}
                        </Typography>
                      </motion.div>

                      {/* Recommendations */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.5 }}
                      >
                        <Box
                          sx={{
                            textAlign: "left",
                            mb: 4,
                            p: { xs: 2.5, md: 3 },
                            borderRadius: "16px",
                            background: "rgba(93, 63, 211, 0.03)",
                            border:
                              "1px solid rgba(93, 63, 211, 0.08)",
                          }}
                        >
                          <Typography
                            sx={{
                              fontFamily:
                                "'Playfair Display', serif",
                              fontWeight: 700,
                              fontSize: "1rem",
                              color: "#1F2937",
                              mb: 2,
                            }}
                          >
                            Recomendaciones para ti:
                          </Typography>
                          <Box
                            component="ul"
                            sx={{
                              m: 0,
                              pl: 0,
                              listStyle: "none",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1.5,
                            }}
                          >
                            {recommendations.map((rec, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  delay: 1.6 + idx * 0.15,
                                  duration: 0.3,
                                }}
                              >
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: 1.5,
                                    alignItems: "flex-start",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 6,
                                      height: 6,
                                      minWidth: 6,
                                      borderRadius: "50%",
                                      background:
                                        "linear-gradient(135deg, #5D3FD3, #F59E0B)",
                                      mt: "8px",
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: "0.9rem",
                                      color: "#4B5563",
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    {rec}
                                  </Typography>
                                </Box>
                              </motion.li>
                            ))}
                          </Box>
                        </Box>
                      </motion.div>

                      {/* CTA Buttons */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            gap: 2,
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<WhatsAppIcon />}
                            href={whatsappMessage}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              background:
                                "linear-gradient(135deg, #25D366 0%, #128C7E 100%)",
                              color: "#fff",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              py: 1.5,
                              px: 3.5,
                              borderRadius: "50px",
                              textTransform: "none",
                              boxShadow:
                                "0 8px 25px -5px rgba(37, 211, 102, 0.4)",
                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                                boxShadow:
                                  "0 12px 30px -5px rgba(37, 211, 102, 0.5)",
                                transform: "translateY(-2px)",
                              },
                            }}
                          >
                            Consulta gratuita
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<RestartAltRoundedIcon />}
                            onClick={handleRestart}
                            sx={{
                              borderColor: "rgba(93, 63, 211, 0.3)",
                              color: "#5D3FD3",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              py: 1.3,
                              px: 3,
                              borderRadius: "50px",
                              textTransform: "none",
                              boxShadow: "none",
                              "&:hover": {
                                borderColor: "#5D3FD3",
                                background:
                                  "rgba(93, 63, 211, 0.06)",
                                boxShadow: "none",
                                transform: "translateY(-1px)",
                              },
                            }}
                          >
                            Repetir quiz
                          </Button>
                        </Box>
                      </motion.div>
                    </Box>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
