"use client";

import { useState } from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import DirectionsRunRoundedIcon from "@mui/icons-material/DirectionsRunRounded";
import CatchingPokemonRoundedIcon from "@mui/icons-material/CatchingPokemonRounded";
import QuizRoundedIcon from "@mui/icons-material/QuizRounded";
import TaxRunnerGame from "../TaxRunnerGame/TaxRunnerGame";
import DeductionCatcherGame from "../DeductionCatcherGame/DeductionCatcherGame";
import TriviaBlitzGame from "../TriviaBlitzGame/TriviaBlitzGame";

const games = [
  {
    id: "runner",
    label: "Tax Runner",
    icon: <DirectionsRunRoundedIcon sx={{ fontSize: 20 }} />,
    description: "Salta, esquiva multas y recoge deducciones",
    color: "#10B981",
  },
  {
    id: "catcher",
    label: "Atrapa Deducciones",
    icon: <CatchingPokemonRoundedIcon sx={{ fontSize: 20 }} />,
    description: "Atrapa beneficios fiscales que caen del cielo",
    color: "#5D3FD3",
  },
  {
    id: "trivia",
    label: "Trivia Tributaria",
    icon: <QuizRoundedIcon sx={{ fontSize: 20 }} />,
    description: "¿Cuánto sabes de impuestos colombianos?",
    color: "#F59E0B",
  },
];

export default function GamesArcade() {
  const [activeGame, setActiveGame] = useState("runner");

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background: "linear-gradient(180deg, #0F0A1A 0%, #1A1040 50%, #0F0A1A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(93,63,211,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Box sx={{ maxWidth: 900, mx: "auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5 } }}>
            <Chip
              icon={<SportsEsportsRoundedIcon />}
              label="APRENDE JUGANDO"
              sx={{
                mb: 2,
                px: 2,
                py: 2.5,
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "1.8rem", md: "2.5rem" },
                color: "white",
                mb: 1.5,
                lineHeight: 1.2,
              }}
            >
              Mini-Juegos{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #FCD34D 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Financieros
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "rgba(255,255,255,0.6)",
                fontSize: { xs: "0.95rem", md: "1.1rem" },
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.7,
              }}
            >
              Pon a prueba tus conocimientos tributarios mientras te diviertes.
              Cada juego te enseña algo nuevo sobre tus impuestos.
            </Typography>
          </Box>
        </motion.div>

        {/* Game Selector Tabs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 1, md: 1.5 },
            mb: { xs: 3, md: 4 },
            flexWrap: "wrap",
          }}
        >
          {games.map((game) => (
            <Button
              key={game.id}
              onClick={() => setActiveGame(game.id)}
              startIcon={game.icon}
              sx={{
                borderRadius: "50px",
                px: { xs: 2, md: 3 },
                py: { xs: 1, md: 1.2 },
                fontWeight: 700,
                fontSize: { xs: "0.78rem", md: "0.88rem" },
                textTransform: "none",
                transition: "all 0.3s ease",
                ...(activeGame === game.id
                  ? {
                      background: `linear-gradient(135deg, ${game.color} 0%, ${game.color}cc 100%)`,
                      color: "white",
                      boxShadow: `0 4px 20px ${game.color}50`,
                    }
                  : {
                      background: "rgba(255,255,255,0.06)",
                      color: "rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                        color: "white",
                      },
                    }),
              }}
            >
              {game.label}
            </Button>
          ))}
        </Box>

        {/* Active Game Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Typography
              sx={{
                textAlign: "center",
                color: "rgba(255,255,255,0.5)",
                fontSize: "0.85rem",
                mb: 3,
              }}
            >
              {games.find((g) => g.id === activeGame)?.description}
            </Typography>
          </motion.div>
        </AnimatePresence>

        {/* Game Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
          >
            {activeGame === "runner" && <TaxRunnerGame />}
            {activeGame === "catcher" && <DeductionCatcherGame />}
            {activeGame === "trivia" && <TriviaBlitzGame />}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.78rem",
              mt: 4,
              lineHeight: 1.6,
            }}
          >
            Basado en la legislación tributaria colombiana vigente •
            ¿Quieres aprender más? Agenda una consulta gratuita
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
}
