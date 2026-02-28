"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, Typography, Button, ToggleButtonGroup, ToggleButton } from "@mui/material";

// ─── Types ────────────────────────────────────────────────────────────────────

type Difficulty = "easy" | "normal" | "hard";
type GameState = "start" | "playing" | "gameover";

interface GameItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  radius: number;
  emoji: string;
  label: string;
  points: number;
  fact: string;
  isGood: boolean;
  isPowerUp: boolean;
  isLifeLoss: boolean;
  pulse: number;
  rotation: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface FloatingText {
  x: number;
  y: number;
  text: string;
  life: number;
  maxLife: number;
  color: string;
  isPoints: boolean;
}

interface Star {
  x: number;
  y: number;
  size: number;
  alpha: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface GameStats {
  itemsCaught: number;
  itemsMissed: number;
  bestCombo: number;
  timeSurvived: number;
}

// ─── Item Definitions ─────────────────────────────────────────────────────────

const GOOD_ITEMS = [
  { emoji: "\u{1F4B0}", label: "Deducci\u00f3n de Salud", points: 10, fact: "Gastos m\u00e9dicos son deducibles en tu declaraci\u00f3n", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F4DA}", label: "Educaci\u00f3n Deducible", points: 15, fact: "Inversi\u00f3n en educaci\u00f3n reduce tu base gravable", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F3E0}", label: "Intereses Hipoteca", points: 20, fact: "Los intereses de vivienda son deducibles hasta 1,200 UVT", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F4BC}", label: "Gastos de Negocio", points: 15, fact: "Gastos necesarios para tu actividad son deducibles", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F381}", label: "Donaci\u00f3n Deducible", points: 25, fact: "Donaciones a fundaciones dan beneficio tributario", isPowerUp: false, isLifeLoss: false },
];

const POWER_UP = {
  emoji: "\u2B50", label: "Escudo Fiscal", points: 0, fact: "\u00a1Escudo activado! 5 segundos de inmunidad", isPowerUp: true, isLifeLoss: false,
};

const BAD_ITEMS = [
  { emoji: "\u{1F4CB}", label: "Multa DIAN", points: -20, fact: "\u00a1La DIAN sanciona declaraciones tard\u00edas!", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u26A0\uFE0F", label: "Sanci\u00f3n Tributaria", points: -15, fact: "No declarar a tiempo genera intereses moratorios", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F6AB}", label: "Embargo Fiscal", points: -25, fact: "Las deudas con la DIAN pueden generar embargos", isPowerUp: false, isLifeLoss: false },
  { emoji: "\u{1F480}", label: "Cierre de Negocio", points: 0, fact: "El desorden contable puede cerrar tu negocio", isPowerUp: false, isLifeLoss: true },
];

const DIFFICULTY_SETTINGS: Record<Difficulty, { speedMult: number; spawnMult: number }> = {
  easy: { speedMult: 0.7, spawnMult: 0.7 },
  normal: { speedMult: 1.0, spawnMult: 1.0 },
  hard: { speedMult: 1.4, spawnMult: 1.4 },
};

const RANKS = [
  { min: 0, max: 150, title: "Aprendiz Fiscal \u{1F4DD}", message: "Necesitas una asesora que te gu\u00ede" },
  { min: 150, max: 400, title: "Contador Junior \u{1F4CA}", message: "Vas por buen camino, una consulta te impulsar\u00e1" },
  { min: 400, max: 800, title: "Estratega Tributario \u{1F9E0}", message: "\u00a1Gran instinto! Imagina con asesor\u00eda profesional" },
  { min: 800, max: Infinity, title: "Maestro de Deducciones \u{1F451}", message: "\u00a1Incre\u00edble! Agenda para llevar tus finanzas al siguiente nivel" },
];

const TAX_TIPS = [
  "Declara a tiempo para evitar sanciones e intereses moratorios.",
  "Organiza tus facturas mensuales para facilitar tu declaraci\u00f3n.",
  "Los aportes voluntarios a pensiones son deducibles.",
  "Guarda tus certificados de retenci\u00f3n en la fuente.",
  "La medicina prepagada puede ser deducible en tu renta.",
  "Un buen contador te ahorra m\u00e1s de lo que cuesta.",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function getRank(score: number) {
  return RANKS.find((r) => score >= r.min && score < r.max) || RANKS[RANKS.length - 1];
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DeductionCatcherGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const gameLoopRef = useRef<boolean>(false);

  // Game state stored in refs for the game loop (avoids stale closures)
  const stateRef = useRef<GameState>("start");
  const scoreRef = useRef(0);
  const livesRef = useRef(3);
  const comboRef = useRef(0);
  const bestComboRef = useRef(0);
  const multiplierRef = useRef(1);
  const shieldActiveRef = useRef(false);
  const shieldEndTimeRef = useRef(0);
  const itemsRef = useRef<GameItem[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const floatingTextsRef = useRef<FloatingText[]>([]);
  const starsRef = useRef<Star[]>([]);
  const basketXRef = useRef(0);
  const targetXRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const gameStartTimeRef = useRef(0);
  const nextItemIdRef = useRef(0);
  const difficultyRef = useRef<Difficulty>("normal");
  const statsRef = useRef<GameStats>({ itemsCaught: 0, itemsMissed: 0, bestCombo: 0, timeSurvived: 0 });
  const canvasSizeRef = useRef({ w: 700, h: 450 });
  const dprRef = useRef(1);
  const decorItemsRef = useRef<GameItem[]>([]);
  const basketBounceRef = useRef(0);

  // React state for overlay UI
  const [gameState, setGameState] = useState<GameState>("start");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [highScore, setHighScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);
  const [finalStats, setFinalStats] = useState<GameStats>({ itemsCaught: 0, itemsMissed: 0, bestCombo: 0, timeSurvived: 0 });
  const [displayedScore, setDisplayedScore] = useState(0);

  // ─── Canvas Sizing ────────────────────────────────────────────────────────

  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const containerWidth = container.clientWidth;
    const w = Math.min(containerWidth, 700);
    const h = window.innerWidth < 600 ? 380 : 450;

    canvasSizeRef.current = { w, h };
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, []);

  // ─── Stars Init ───────────────────────────────────────────────────────────

  const initStars = useCallback(() => {
    const { w, h } = canvasSizeRef.current;
    const stars: Star[] = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 2 + 1,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;
  }, []);

  // ─── Decorative Items for Start Screen ────────────────────────────────────

  const initDecorItems = useCallback(() => {
    const { w, h } = canvasSizeRef.current;
    const allDefs = [...GOOD_ITEMS, ...BAD_ITEMS];
    const items: GameItem[] = [];
    for (let i = 0; i < 8; i++) {
      const def = allDefs[Math.floor(Math.random() * allDefs.length)];
      items.push({
        id: i,
        x: Math.random() * (w - 40) + 20,
        y: Math.random() * h,
        speed: Math.random() * 0.4 + 0.2,
        radius: 18,
        emoji: def.emoji,
        label: def.label,
        points: def.points,
        fact: def.fact,
        isGood: def.points > 0,
        isPowerUp: false,
        isLifeLoss: false,
        pulse: 0,
        rotation: Math.random() * Math.PI * 2,
      });
    }
    decorItemsRef.current = items;
  }, []);

  // ─── Spawn Game Item ──────────────────────────────────────────────────────

  const spawnItem = useCallback(() => {
    const { w } = canvasSizeRef.current;
    const diff = DIFFICULTY_SETTINGS[difficultyRef.current];
    const elapsed = (performance.now() - gameStartTimeRef.current) / 1000;

    // Determine good vs bad (70% good, 5% power-up, 25% bad)
    const roll = Math.random();
    let def;
    let isGood = true;

    if (roll < 0.05) {
      def = POWER_UP;
      isGood = true;
    } else if (roll < 0.30) {
      def = BAD_ITEMS[Math.floor(Math.random() * BAD_ITEMS.length)];
      isGood = false;
    } else {
      def = GOOD_ITEMS[Math.floor(Math.random() * GOOD_ITEMS.length)];
      isGood = true;
    }

    const radius = 20;
    const baseSpeed = 1.2 + elapsed * 0.015;
    const speed = (baseSpeed + Math.random() * 0.8) * diff.speedMult;

    const item: GameItem = {
      id: nextItemIdRef.current++,
      x: Math.random() * (w - radius * 2) + radius,
      y: -radius * 2,
      speed,
      radius,
      emoji: def.emoji,
      label: def.label,
      points: def.points,
      fact: def.fact,
      isGood,
      isPowerUp: def.isPowerUp,
      isLifeLoss: def.isLifeLoss,
      pulse: 0,
      rotation: Math.random() * Math.PI * 2,
    };

    itemsRef.current.push(item);
  }, []);

  // ─── Spawn Particles ─────────────────────────────────────────────────────

  const spawnParticles = useCallback((x: number, y: number, color: string, count: number) => {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const speed = Math.random() * 3 + 1.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 1,
        maxLife: 1,
        color,
        size: Math.random() * 3 + 2,
      });
    }
  }, []);

  // ─── Add Floating Text ───────────────────────────────────────────────────

  const addFloatingText = useCallback((x: number, y: number, text: string, color: string, isPoints: boolean) => {
    floatingTextsRef.current.push({ x, y, text, life: 1, maxLife: 1, color, isPoints });
  }, []);

  // ─── Start Game ───────────────────────────────────────────────────────────

  const startGame = useCallback(() => {
    scoreRef.current = 0;
    livesRef.current = 3;
    comboRef.current = 0;
    bestComboRef.current = 0;
    multiplierRef.current = 1;
    shieldActiveRef.current = false;
    shieldEndTimeRef.current = 0;
    itemsRef.current = [];
    particlesRef.current = [];
    floatingTextsRef.current = [];
    lastSpawnRef.current = performance.now();
    gameStartTimeRef.current = performance.now();
    nextItemIdRef.current = 0;
    basketBounceRef.current = 0;
    statsRef.current = { itemsCaught: 0, itemsMissed: 0, bestCombo: 0, timeSurvived: 0 };

    const { w } = canvasSizeRef.current;
    basketXRef.current = w / 2;
    targetXRef.current = w / 2;

    stateRef.current = "playing";
    setGameState("playing");
  }, []);

  // ─── End Game ─────────────────────────────────────────────────────────────

  const endGame = useCallback(() => {
    const elapsed = (performance.now() - gameStartTimeRef.current) / 1000;
    const stats: GameStats = {
      ...statsRef.current,
      bestCombo: bestComboRef.current,
      timeSurvived: Math.floor(elapsed),
    };

    const score = scoreRef.current;
    stateRef.current = "gameover";
    setGameState("gameover");
    setFinalScore(score);
    setFinalStats(stats);
    setDisplayedScore(0);

    // High score
    const stored = localStorage.getItem("deductionCatcherHighScore");
    const prev = stored ? parseInt(stored, 10) : 0;
    if (score > prev) {
      localStorage.setItem("deductionCatcherHighScore", String(score));
      setHighScore(score);
    }

    // Count-up animation
    const target = score;
    const duration = 1500;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedScore(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, []);

  // ─── Drawing ──────────────────────────────────────────────────────────────

  const drawBackground = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { w, h } = canvasSizeRef.current;

    // Gradient background
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0F172A");
    grad.addColorStop(1, "#1E293B");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (const star of starsRef.current) {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(time * star.twinkleSpeed * 0.001 + star.twinkleOffset));
      ctx.globalAlpha = alpha;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawBasket = useCallback((ctx: CanvasRenderingContext2D, time: number) => {
    const { h } = canvasSizeRef.current;
    const bx = basketXRef.current;
    const by = h - 40;
    const bw = 60;
    const bh = 30;
    const bounce = Math.sin(basketBounceRef.current * 8) * Math.max(0, basketBounceRef.current) * 5;
    const drawY = by + bounce;

    // Shield glow
    if (shieldActiveRef.current) {
      ctx.save();
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 20;
      ctx.strokeStyle = "rgba(255, 215, 0, 0.6)";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.roundRect(bx - bw / 2 - 6, drawY - bh / 2 - 6, bw + 12, bh + 12, 12);
      ctx.stroke();
      ctx.restore();
    }

    // Basket body
    ctx.save();
    ctx.shadowColor = "#5D3FD3";
    ctx.shadowBlur = 15;
    ctx.fillStyle = "#5D3FD3";
    ctx.beginPath();
    ctx.roundRect(bx - bw / 2, drawY - bh / 2, bw, bh, 8);
    ctx.fill();
    ctx.restore();

    // Basket highlight
    const highlight = ctx.createLinearGradient(bx - bw / 2, drawY - bh / 2, bx - bw / 2, drawY + bh / 2);
    highlight.addColorStop(0, "rgba(255,255,255,0.25)");
    highlight.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = highlight;
    ctx.beginPath();
    ctx.roundRect(bx - bw / 2, drawY - bh / 2, bw, bh, 8);
    ctx.fill();

    // Basket emoji
    ctx.font = "18px serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("\u{1F9FE}", bx, drawY);

    // Pulsing visual indicator when shield active
    if (shieldActiveRef.current) {
      const pulseAlpha = 0.2 + 0.15 * Math.sin(time * 0.008);
      ctx.fillStyle = `rgba(255, 215, 0, ${pulseAlpha})`;
      ctx.beginPath();
      ctx.arc(bx, drawY, 40, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const drawItem = useCallback((ctx: CanvasRenderingContext2D, item: GameItem, time: number) => {
    const { x, y, radius, emoji, isGood, isPowerUp } = item;

    ctx.save();

    // Glow
    if (isPowerUp) {
      ctx.shadowColor = "#FFD700";
      ctx.shadowBlur = 18 + Math.sin(time * 0.006) * 6;
    } else if (isGood) {
      ctx.shadowColor = "#22C55E";
      ctx.shadowBlur = 12;
    } else {
      ctx.shadowColor = "#EF4444";
      ctx.shadowBlur = 12 + Math.sin(time * 0.008 + item.id) * 4;
    }

    // Circle background
    const bgColor = isPowerUp
      ? "rgba(255, 215, 0, 0.25)"
      : isGood
      ? "rgba(34, 197, 94, 0.2)"
      : "rgba(239, 68, 68, 0.2)";
    ctx.fillStyle = bgColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Border
    const borderColor = isPowerUp ? "#FFD700" : isGood ? "#22C55E" : "#EF4444";
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();

    // Emoji
    ctx.font = `${radius * 1.1}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji, x, y);
  }, []);

  const drawHUD = useCallback((ctx: CanvasRenderingContext2D) => {
    const { w } = canvasSizeRef.current;
    const score = scoreRef.current;
    const lives = livesRef.current;
    const combo = comboRef.current;
    const multiplier = multiplierRef.current;
    const elapsed = (performance.now() - gameStartTimeRef.current) / 1000;

    // Progress bar (time survived)
    const barWidth = w - 20;
    const maxTime = 120; // 2 minutes for full bar
    const progress = Math.min(elapsed / maxTime, 1);
    ctx.fillStyle = "rgba(255,255,255,0.1)";
    ctx.beginPath();
    ctx.roundRect(10, 6, barWidth, 6, 3);
    ctx.fill();

    const progGrad = ctx.createLinearGradient(10, 0, 10 + barWidth * progress, 0);
    progGrad.addColorStop(0, "#5D3FD3");
    progGrad.addColorStop(1, "#F59E0B");
    ctx.fillStyle = progGrad;
    ctx.beginPath();
    ctx.roundRect(10, 6, barWidth * progress, 6, 3);
    ctx.fill();

    // Score (top center)
    ctx.save();
    ctx.shadowColor = "#FFFFFF";
    ctx.shadowBlur = 8;
    ctx.font = "bold 28px Outfit, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.fillText(String(score), w / 2, 18);
    ctx.restore();

    // Multiplier
    if (multiplier > 1) {
      ctx.font = "bold 16px Outfit, sans-serif";
      ctx.fillStyle = "#F59E0B";
      ctx.textAlign = "center";
      ctx.fillText(`x${multiplier}`, w / 2, 48);
    }

    // Lives (top right)
    ctx.font = "20px serif";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    let heartsStr = "";
    for (let i = 0; i < 3; i++) {
      heartsStr += i < lives ? "\u2764\uFE0F" : "\u{1F5A4}";
    }
    ctx.fillText(heartsStr, w - 10, 20);

    // Combo (top left)
    if (combo >= 3) {
      ctx.font = "bold 16px Outfit, sans-serif";
      ctx.fillStyle = "#F97316";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`\u{1F525} ${combo} combo`, 10, 20);
    }

    // Shield timer
    if (shieldActiveRef.current) {
      const remaining = Math.max(0, (shieldEndTimeRef.current - performance.now()) / 1000);
      ctx.font = "bold 14px Outfit, sans-serif";
      ctx.fillStyle = "#FFD700";
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`\u2B50 ${remaining.toFixed(1)}s`, 10, 42);
    }
  }, []);

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    for (const p of particlesRef.current) {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }, []);

  const drawFloatingTexts = useCallback((ctx: CanvasRenderingContext2D) => {
    for (const ft of floatingTextsRef.current) {
      ctx.globalAlpha = ft.life;
      ctx.font = ft.isPoints ? "bold 18px Outfit, sans-serif" : "13px Outfit, sans-serif";
      ctx.fillStyle = ft.color;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const yOffset = (1 - ft.life) * 50;
      ctx.fillText(ft.text, ft.x, ft.y - yOffset);
    }
    ctx.globalAlpha = 1;
  }, []);

  // ─── Game Loop ────────────────────────────────────────────────────────────

  const gameLoop = useCallback((time: number) => {
    if (!gameLoopRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = canvasSizeRef.current;
    ctx.clearRect(0, 0, w, h);

    // Background (always drawn)
    drawBackground(ctx, time);

    const state = stateRef.current;

    if (state === "start") {
      // Animate decor items
      for (const item of decorItemsRef.current) {
        item.y += item.speed;
        item.rotation += 0.005;
        if (item.y > h + 30) {
          item.y = -30;
          item.x = Math.random() * (w - 40) + 20;
        }
        ctx.globalAlpha = 0.35;
        drawItem(ctx, item, time);
        ctx.globalAlpha = 1;
      }
    }

    if (state === "playing") {
      const diff = DIFFICULTY_SETTINGS[difficultyRef.current];
      const elapsed = (time - gameStartTimeRef.current) / 1000;

      // Smooth basket movement (lerp)
      basketXRef.current = lerp(basketXRef.current, targetXRef.current, 0.15);
      basketXRef.current = clamp(basketXRef.current, 30, w - 30);

      // Bounce decay
      if (basketBounceRef.current > 0) {
        basketBounceRef.current -= 0.03;
        if (basketBounceRef.current < 0) basketBounceRef.current = 0;
      }

      // Shield expiry
      if (shieldActiveRef.current && time > shieldEndTimeRef.current) {
        shieldActiveRef.current = false;
      }

      // Spawn items
      const spawnInterval = Math.max(350, 1000 - elapsed * 8) / diff.spawnMult;
      if (time - lastSpawnRef.current > spawnInterval) {
        spawnItem();
        lastSpawnRef.current = time;
      }

      // Update items
      const basketY = h - 40;
      const basketW = 60;
      const basketH = 30;
      const bx = basketXRef.current;

      const remainingItems: GameItem[] = [];

      for (const item of itemsRef.current) {
        item.y += item.speed;
        item.pulse += 0.05;

        // Collision: circle (item) vs rectangle (basket)
        const closestX = clamp(item.x, bx - basketW / 2, bx + basketW / 2);
        const closestY = clamp(item.y, basketY - basketH / 2, basketY + basketH / 2);
        const dx = item.x - closestX;
        const dy = item.y - closestY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < item.radius) {
          // Caught!
          basketBounceRef.current = 1;

          if (item.isPowerUp) {
            // Shield
            shieldActiveRef.current = true;
            shieldEndTimeRef.current = time + 5000;
            spawnParticles(item.x, item.y, "#FFD700", 15);
            addFloatingText(item.x, item.y - 20, "\u2B50 Escudo Fiscal!", "#FFD700", true);
            addFloatingText(item.x, item.y - 40, item.fact, "#FFD700", false);
          } else if (item.isGood) {
            const pts = item.points * multiplierRef.current;
            scoreRef.current += pts;
            comboRef.current++;
            statsRef.current.itemsCaught++;

            if (comboRef.current > bestComboRef.current) bestComboRef.current = comboRef.current;

            // Update multiplier
            if (comboRef.current >= 10) multiplierRef.current = 5;
            else if (comboRef.current >= 5) multiplierRef.current = 3;
            else if (comboRef.current >= 3) multiplierRef.current = 2;

            spawnParticles(item.x, item.y, "#22C55E", 10);
            addFloatingText(item.x, item.y - 20, `+${pts}`, "#22C55E", true);
            addFloatingText(item.x, item.y - 45, item.fact, "#A7F3D0", false);
          } else {
            // Bad item
            if (shieldActiveRef.current) {
              // Blocked by shield
              spawnParticles(item.x, item.y, "#FFD700", 8);
              addFloatingText(item.x, item.y - 20, "\u2B50 Bloqueado!", "#FFD700", true);
            } else if (item.isLifeLoss) {
              livesRef.current--;
              comboRef.current = 0;
              multiplierRef.current = 1;
              spawnParticles(item.x, item.y, "#EF4444", 20);
              addFloatingText(item.x, item.y - 20, "\u{1F480} -1 Vida!", "#EF4444", true);
              addFloatingText(item.x, item.y - 45, item.fact, "#FCA5A5", false);

              if (livesRef.current <= 0) {
                endGame();
              }
            } else {
              const pts = item.points;
              scoreRef.current = Math.max(0, scoreRef.current + pts);
              comboRef.current = 0;
              multiplierRef.current = 1;
              spawnParticles(item.x, item.y, "#EF4444", 10);
              addFloatingText(item.x, item.y - 20, `${pts}`, "#EF4444", true);
              addFloatingText(item.x, item.y - 45, item.fact, "#FCA5A5", false);
            }
          }
          continue; // Don't keep this item
        }

        // Off screen
        if (item.y > h + item.radius * 2) {
          if (item.isGood && !item.isPowerUp) {
            statsRef.current.itemsMissed++;
          }
          continue;
        }

        remainingItems.push(item);
      }

      itemsRef.current = remainingItems;

      // Update particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.025;
        return p.life > 0;
      });

      // Update floating texts
      floatingTextsRef.current = floatingTextsRef.current.filter((ft) => {
        ft.life -= 0.012;
        return ft.life > 0;
      });

      // Draw game items
      for (const item of itemsRef.current) {
        drawItem(ctx, item, time);
      }

      drawParticles(ctx);
      drawBasket(ctx, time);
      drawFloatingTexts(ctx);
      drawHUD(ctx);
    }

    if (state === "gameover") {
      // Just keep the starry background
    }

    animFrameRef.current = requestAnimationFrame(gameLoop);
  }, [drawBackground, drawItem, drawBasket, drawParticles, drawFloatingTexts, drawHUD, spawnItem, spawnParticles, addFloatingText, endGame]);

  // ─── Input Handlers ───────────────────────────────────────────────────────

  const getCanvasX = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * canvasSizeRef.current.w;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (stateRef.current !== "playing") return;
    targetXRef.current = getCanvasX(e.clientX);
  }, [getCanvasX]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (stateRef.current !== "playing") return;
    e.preventDefault();
    if (e.touches.length > 0) {
      targetXRef.current = getCanvasX(e.touches[0].clientX);
    }
  }, [getCanvasX]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (stateRef.current !== "playing") return;
    if (e.touches.length > 0) {
      targetXRef.current = getCanvasX(e.touches[0].clientX);
    }
  }, [getCanvasX]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (stateRef.current !== "playing") return;
    const step = 30;
    if (e.key === "ArrowLeft") {
      targetXRef.current = Math.max(30, targetXRef.current - step);
    } else if (e.key === "ArrowRight") {
      targetXRef.current = Math.min(canvasSizeRef.current.w - 30, targetXRef.current + step);
    }
  }, []);

  // ─── Effects ──────────────────────────────────────────────────────────────

  // Initialize & start render loop
  useEffect(() => {
    // Load high score
    const stored = localStorage.getItem("deductionCatcherHighScore");
    if (stored) setHighScore(parseInt(stored, 10));

    updateCanvasSize();
    initStars();
    initDecorItems();

    gameLoopRef.current = true;
    animFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      gameLoopRef.current = false;
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateCanvasSize, initStars, initDecorItems, gameLoop]);

  // Resize handler
  useEffect(() => {
    const onResize = () => {
      updateCanvasSize();
      initStars();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateCanvasSize, initStars]);

  // Input listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMouseMove, handleTouchMove, handleTouchStart, handleKeyDown]);

  // Sync difficulty ref
  useEffect(() => {
    difficultyRef.current = difficulty;
  }, [difficulty]);

  // ─── Render ───────────────────────────────────────────────────────────────

  const rank = getRank(finalScore);
  const accuracy =
    finalStats.itemsCaught + finalStats.itemsMissed > 0
      ? Math.round((finalStats.itemsCaught / (finalStats.itemsCaught + finalStats.itemsMissed)) * 100)
      : 0;
  const randomTip = TAX_TIPS[Math.floor(Math.random() * TAX_TIPS.length)];
  const whatsappUrl =
    "https://wa.me/573207269417?text=Hola%20Yakeline,%20jugu%C3%A9%20Atrapa%20Deducciones%20y%20quiero%20optimizar%20mis%20impuestos";

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        mx: "auto",
        position: "relative",
        userSelect: "none",
      }}
    >
      {/* Canvas Container */}
      <Box
        ref={containerRef}
        sx={{
          width: "100%",
          position: "relative",
          borderRadius: 3,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(93, 63, 211, 0.3)",
          border: "1px solid rgba(93, 63, 211, 0.3)",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            cursor: gameState === "playing" ? "none" : "default",
            touchAction: "none",
          }}
        />

        {/* ─── Start Screen Overlay ───────────────────────────────────── */}
        {gameState === "start" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(15, 23, 42, 0.85)",
              backdropFilter: "blur(4px)",
              zIndex: 2,
              px: 2,
              gap: 1.5,
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { xs: "1.6rem", sm: "2.2rem" },
                color: "#FFFFFF",
                textAlign: "center",
                textShadow: "0 0 20px rgba(93, 63, 211, 0.6)",
              }}
            >
              {"\u{1F3AF}"} Atrapa Deducciones
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "0.85rem", sm: "1rem" },
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
                maxWidth: 400,
              }}
            >
              Atrapa las deducciones fiscales y esquiva las multas
            </Typography>

            {highScore > 0 && (
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#F59E0B",
                  fontWeight: 600,
                }}
              >
                {"\u{1F3C6}"} R\u00e9cord: {highScore} pts
              </Typography>
            )}

            <ToggleButtonGroup
              value={difficulty}
              exclusive
              onChange={(_, val) => val && setDifficulty(val as Difficulty)}
              size="small"
              sx={{
                mt: 1,
                "& .MuiToggleButton-root": {
                  color: "rgba(255,255,255,0.6)",
                  borderColor: "rgba(255,255,255,0.2)",
                  fontSize: { xs: "0.75rem", sm: "0.85rem" },
                  px: { xs: 1.5, sm: 2.5 },
                  "&.Mui-selected": {
                    color: "#FFFFFF",
                    backgroundColor: "rgba(93, 63, 211, 0.5)",
                    borderColor: "#5D3FD3",
                    "&:hover": {
                      backgroundColor: "rgba(93, 63, 211, 0.6)",
                    },
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.05)",
                  },
                },
              }}
            >
              <ToggleButton value="easy">Fácil</ToggleButton>
              <ToggleButton value="normal">Normal</ToggleButton>
              <ToggleButton value="hard">Difícil</ToggleButton>
            </ToggleButtonGroup>

            <Button
              onClick={startGame}
              variant="contained"
              sx={{
                mt: 1.5,
                px: 5,
                py: 1.3,
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 800,
                backgroundColor: "#5D3FD3",
                borderRadius: 3,
                textTransform: "none",
                animation: "pulseBtn 2s ease-in-out infinite",
                "@keyframes pulseBtn": {
                  "0%, 100%": { boxShadow: "0 0 0 0 rgba(93, 63, 211, 0.5)" },
                  "50%": { boxShadow: "0 0 0 12px rgba(93, 63, 211, 0)" },
                },
                "&:hover": {
                  backgroundColor: "#4C2FC2",
                },
              }}
            >
              JUGAR
            </Button>
          </Box>
        )}

        {/* ─── Game Over Overlay ──────────────────────────────────────── */}
        {gameState === "gameover" && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              background: "rgba(15, 23, 42, 0.92)",
              backdropFilter: "blur(6px)",
              zIndex: 2,
              px: 2,
              py: { xs: 2, sm: 3 },
              overflowY: "auto",
            }}
          >
            <Typography
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 800,
                fontSize: { xs: "1.3rem", sm: "1.7rem" },
                color: "#FFFFFF",
                textAlign: "center",
                mb: 0.5,
              }}
            >
              Fin del Juego
            </Typography>

            {/* Score */}
            <Typography
              sx={{
                fontSize: { xs: "2rem", sm: "2.8rem" },
                fontWeight: 900,
                color: "#F59E0B",
                textShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
              }}
            >
              {displayedScore}
            </Typography>
            <Typography sx={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", mb: 1 }}>puntos</Typography>

            {/* Rank */}
            <Typography
              sx={{
                fontSize: { xs: "1rem", sm: "1.2rem" },
                fontWeight: 700,
                color: "#FFFFFF",
                textAlign: "center",
              }}
            >
              {rank.title}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "0.78rem", sm: "0.85rem" },
                color: "rgba(255,255,255,0.6)",
                textAlign: "center",
                mb: 1,
              }}
            >
              {rank.message}
            </Typography>

            {/* Stats Grid */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 0.8,
                width: "100%",
                maxWidth: 320,
                mb: 1,
              }}
            >
              {[
                { label: "Atrapados", value: finalStats.itemsCaught },
                { label: "Precisi\u00f3n", value: `${accuracy}%` },
                { label: "Mejor Combo", value: finalStats.bestCombo },
                { label: "Tiempo", value: `${finalStats.timeSurvived}s` },
              ].map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 2,
                    p: 0.8,
                    textAlign: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.5)" }}>{stat.label}</Typography>
                  <Typography sx={{ fontSize: "1rem", fontWeight: 700, color: "#FFFFFF" }}>{stat.value}</Typography>
                </Box>
              ))}
            </Box>

            {/* Tax Tip */}
            <Typography
              sx={{
                fontSize: "0.75rem",
                color: "#A7F3D0",
                fontStyle: "italic",
                textAlign: "center",
                mb: 1.5,
                px: 1,
              }}
            >
              {"\u{1F4A1}"} {randomTip}
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, width: "100%", maxWidth: 300 }}>
              <Button
                onClick={() => {
                  stateRef.current = "start";
                  setGameState("start");
                  initDecorItems();
                }}
                variant="contained"
                sx={{
                  backgroundColor: "#5D3FD3",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1,
                  "&:hover": { backgroundColor: "#4C2FC2" },
                }}
              >
                JUGAR DE NUEVO
              </Button>

              <Button
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                sx={{
                  backgroundColor: "#25D366",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1,
                  fontSize: "0.85rem",
                  "&:hover": { backgroundColor: "#1EBE57" },
                }}
              >
                {"\u{1F4F2}"} Quiero Asesor\u00eda Profesional
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Instruction below game */}
      <Typography
        sx={{
          mt: 1.5,
          textAlign: "center",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
          color: "text.secondary",
        }}
      >
        Mueve con el mouse, flechas o arrastra con el dedo
      </Typography>
    </Box>
  );
}
