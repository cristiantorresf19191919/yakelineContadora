"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Box, Typography } from "@mui/material";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type GameState = "start" | "playing" | "gameover";

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

interface Coin {
  x: number;
  y: number;
  width: number;
  height: number;
  collected: boolean;
  bobOffset: number;
  glowPhase: number;
}

interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  hit: boolean;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  speed: number;
  opacity: number;
}

interface Mountain {
  x: number;
  height: number;
  width: number;
  color: string;
}

interface ConfettiPiece {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  width: number;
  height: number;
  life: number;
}

interface Star {
  x: number;
  y: number;
  size: number;
  twinkle: number;
}

interface Player {
  x: number;
  y: number;
  vy: number;
  onGround: boolean;
  runFrame: number;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = "taxrunner_highscore";
const GRAVITY = 0.55;
const JUMP_FORCE = -11.5;
const BASE_SPEED = 4;
const SPEED_INCREMENT = 0.4;
const SPEED_MILESTONE = 500;
const PLAYER_SIZE = 30;
const COIN_SIZE = 24;
const GROUND_OFFSET = 50;
const MAX_LIVES = 3;
const COIN_SCORE = 10;
const INVINCIBLE_FRAMES = 90;

const TAX_TIPS = [
  "Las personas naturales en Colombia deben declarar renta si sus ingresos brutos superan 1.400 UVT.",
  "Puedes deducir hasta el 40% de tus ingresos netos con gastos debidamente soportados.",
  "Los aportes voluntarios a pensiones y AFC son deducibles de la base gravable.",
  "La factura electronica es obligatoria para todos los responsables del IVA en Colombia.",
  "El impuesto de industria y comercio (ICA) varia segun el municipio y la actividad economica.",
  "Las donaciones a entidades sin animo de lucro pueden generar un descuento tributario del 25%.",
  "Los gastos de nomina como salarios y prestaciones sociales son deducibles al 100%.",
  "Planificar tu tributacion con un contador te puede ahorrar millones en impuestos legalmente.",
];

const SCORE_MESSAGES: { min: number; max: number; message: string }[] = [
  { min: 0, max: 200, message: "Las multas de la DIAN te alcanzaron! Una asesoria te puede salvar." },
  { min: 200, max: 500, message: "Buen intento! Con planeacion tributaria llegarias mas lejos." },
  { min: 500, max: 1000, message: "Impresionante! Tienes instinto financiero. Imagina con asesoria experta." },
  { min: 1000, max: Infinity, message: "Eres un experto en deducciones! Agenda tu consulta para maximizar ahorros reales." },
];

// ---------------------------------------------------------------------------
// Pure helpers (outside component)
// ---------------------------------------------------------------------------

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function aabb(
  ax: number, ay: number, aw: number, ah: number,
  bx: number, by: number, bw: number, bh: number
) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function loadHighScore(): number {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? parseInt(saved, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

function saveHighScore(score: number, current: number): boolean {
  try {
    if (score > current) {
      localStorage.setItem(STORAGE_KEY, String(score));
      return true;
    }
  } catch {
    // ignore
  }
  return false;
}

// ---------------------------------------------------------------------------
// Game Engine — plain class, no hooks, no React dependency
// ---------------------------------------------------------------------------

class TaxRunnerEngine {
  // Canvas
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dpr = 1;
  w = 700;
  h = 350;

  // State
  state: GameState = "start";
  score = 0;
  lives = MAX_LIVES;
  combo = 0;
  bestCombo = 0;
  speedMult = 1;
  frame = 0;
  invincible = 0;
  shake = 0;
  highScore = 0;
  tipIndex = 0;
  spawnTimer = 0;
  coinTimer = 0;
  displayScore = 0;
  gameOverTick = 0;
  newHigh = false;
  animFrame = 0;
  destroyed = false;

  // Entities
  player: Player;
  coins: Coin[] = [];
  obstacles: Obstacle[] = [];
  particles: Particle[] = [];
  clouds: Cloud[] = [];
  mountains: Mountain[] = [];
  stars: Star[] = [];
  confetti: ConfettiPiece[] = [];

  // Callbacks
  onStateChange?: () => void;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.player = { x: 60, y: 0, vy: 0, onGround: true, runFrame: 0 };
    this.highScore = loadHighScore();
  }

  get groundY() {
    return this.h - GROUND_OFFSET;
  }

  // ---- Init ----

  initBackground() {
    const { w, h } = this;
    this.clouds = [];
    for (let i = 0; i < 6; i++) {
      this.clouds.push({
        x: Math.random() * w * 1.5,
        y: 20 + Math.random() * (h * 0.35),
        width: 50 + Math.random() * 80,
        speed: 0.15 + Math.random() * 0.35,
        opacity: 0.08 + Math.random() * 0.12,
      });
    }
    const colors = ["#1E1245", "#251658", "#2D1A6B"];
    this.mountains = [];
    for (let i = 0; i < 8; i++) {
      this.mountains.push({
        x: i * (w / 4) - 50,
        height: 60 + Math.random() * 80,
        width: 100 + Math.random() * 120,
        color: colors[i % colors.length],
      });
    }
    this.stars = [];
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * w,
        y: Math.random() * (h * 0.55),
        size: 0.5 + Math.random() * 1.8,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
  }

  resize(containerWidth: number) {
    this.dpr = window.devicePixelRatio || 1;
    this.w = Math.min(containerWidth, 700);
    this.h = this.w <= 500 ? 280 : 350;
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.canvas.style.width = `${this.w}px`;
    this.canvas.style.height = `${this.h}px`;
    if (this.player.onGround || this.player.y > this.groundY - PLAYER_SIZE) {
      this.player.y = this.groundY - PLAYER_SIZE;
    }
  }

  reset() {
    this.score = 0;
    this.lives = MAX_LIVES;
    this.combo = 0;
    this.bestCombo = 0;
    this.speedMult = 1;
    this.frame = 0;
    this.invincible = 0;
    this.shake = 0;
    this.spawnTimer = 0;
    this.coinTimer = 0;
    this.displayScore = 0;
    this.gameOverTick = 0;
    this.newHigh = false;
    this.player = {
      x: 60,
      y: this.groundY - PLAYER_SIZE,
      vy: 0,
      onGround: true,
      runFrame: 0,
    };
    this.coins = [];
    this.obstacles = [];
    this.particles = [];
    this.confetti = [];
    this.initBackground();
  }

  // ---- Actions ----

  jump() {
    if (this.player.onGround) {
      this.player.vy = JUMP_FORCE;
      this.player.onGround = false;
    }
  }

  interact() {
    if (this.state === "start") {
      this.reset();
      this.state = "playing";
      this.onStateChange?.();
      return;
    }
    if (this.state === "playing") {
      this.jump();
      return;
    }
    if (this.state === "gameover" && this.gameOverTick > 30) {
      this.reset();
      this.state = "playing";
      this.onStateChange?.();
    }
  }

  // Returns true if click hit WhatsApp CTA area
  checkWhatsAppHit(canvasX: number, canvasY: number): boolean {
    if (this.state !== "gameover") return false;
    const { w, h } = this;
    const ctaW = 240;
    const ctaH = 36;
    const ctaX = w / 2 - ctaW / 2;
    const retryBtnY = Math.min(h * 0.82, h * 0.82);
    const ctaY = retryBtnY + 40 + 14;
    return canvasX >= ctaX && canvasX <= ctaX + ctaW && canvasY >= ctaY && canvasY <= ctaY + ctaH;
  }

  // ---- Spawn ----

  spawnObstacle() {
    const h = 28 + Math.random() * 28;
    this.obstacles.push({
      x: this.w + 20,
      y: this.groundY - h,
      width: 26 + Math.random() * 14,
      height: h,
      hit: false,
    });
  }

  spawnCoin() {
    this.coins.push({
      x: this.w + 20 + Math.random() * 60,
      y: this.groundY - 60 - Math.random() * 80,
      width: COIN_SIZE,
      height: COIN_SIZE,
      collected: false,
      bobOffset: Math.random() * Math.PI * 2,
      glowPhase: Math.random() * Math.PI * 2,
    });
  }

  burstParticles(x: number, y: number, count: number, colors: string[], speed = 3) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
      const spd = speed * (0.5 + Math.random());
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd - 1,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 2 + Math.random() * 3,
      });
    }
  }

  burstConfetti() {
    const confettiColors = ["#FFD700", "#FF6B6B", "#5D3FD3", "#00E676", "#FF4081", "#40C4FF", "#FF9100"];
    for (let i = 0; i < 80; i++) {
      this.confetti.push({
        x: this.w * 0.2 + Math.random() * this.w * 0.6,
        y: -10 - Math.random() * 40,
        vx: (Math.random() - 0.5) * 6,
        vy: 2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
        width: 6 + Math.random() * 6,
        height: 3 + Math.random() * 4,
        life: 120 + Math.random() * 80,
      });
    }
  }

  // ---- Draw helpers ----

  drawBackground() {
    const { ctx, w, h, frame } = this;
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, "#0F0A1A");
    grad.addColorStop(0.6, "#1A1040");
    grad.addColorStop(1, "#251658");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    for (const star of this.stars) {
      const alpha = 0.3 + 0.7 * Math.abs(Math.sin(star.twinkle + frame * 0.02));
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawMountains() {
    const { ctx } = this;
    const gy = this.groundY;
    for (const m of this.mountains) {
      ctx.fillStyle = m.color;
      ctx.beginPath();
      ctx.moveTo(m.x, gy);
      ctx.lineTo(m.x + m.width / 2, gy - m.height);
      ctx.lineTo(m.x + m.width, gy);
      ctx.closePath();
      ctx.fill();
    }
  }

  drawClouds() {
    const { ctx } = this;
    for (const c of this.clouds) {
      ctx.fillStyle = `rgba(255,255,255,${c.opacity})`;
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.width / 2, c.width / 4, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(c.x - c.width * 0.25, c.y + 5, c.width / 3, c.width / 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(c.x + c.width * 0.25, c.y + 3, c.width / 3, c.width / 5, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawGround() {
    const { ctx, w } = this;
    const gy = this.groundY;
    const glowGrad = ctx.createLinearGradient(0, gy - 6, 0, gy + 16);
    glowGrad.addColorStop(0, "rgba(93,63,211,0)");
    glowGrad.addColorStop(0.4, "rgba(93,63,211,0.6)");
    glowGrad.addColorStop(1, "rgba(93,63,211,0)");
    ctx.fillStyle = glowGrad;
    ctx.fillRect(0, gy - 6, w, 22);
    ctx.strokeStyle = "#7C5CFC";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, gy);
    ctx.lineTo(w, gy);
    ctx.stroke();
    const gfGrad = ctx.createLinearGradient(0, gy, 0, gy + GROUND_OFFSET);
    gfGrad.addColorStop(0, "rgba(93,63,211,0.15)");
    gfGrad.addColorStop(1, "rgba(15,10,26,0.9)");
    ctx.fillStyle = gfGrad;
    ctx.fillRect(0, gy, w, GROUND_OFFSET);
    ctx.strokeStyle = "rgba(93,63,211,0.12)";
    ctx.lineWidth = 1;
    const speed = BASE_SPEED * this.speedMult;
    const offset = (this.frame * speed) % 40;
    for (let gx = -offset; gx < w; gx += 40) {
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx, gy + GROUND_OFFSET);
      ctx.stroke();
    }
  }

  drawPlayer() {
    const { ctx, player: p, invincible, frame } = this;
    if (invincible > 0 && Math.floor(invincible / 5) % 2 === 0) return;
    ctx.save();
    ctx.translate(p.x + PLAYER_SIZE / 2, p.y + PLAYER_SIZE / 2);
    const tilt = p.vy * 0.02;
    ctx.rotate(tilt);
    ctx.shadowColor = "#7C5CFC";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(0, 0, PLAYER_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#5D3FD3";
    ctx.beginPath();
    ctx.arc(-5, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, -4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#5D3FD3";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, 1, 6, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
    if (p.onGround) {
      const legSwing = Math.sin(frame * 0.3) * 6;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-3, PLAYER_SIZE / 2 - 4);
      ctx.lineTo(-3 + legSwing, PLAYER_SIZE / 2 + 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(3, PLAYER_SIZE / 2 - 4);
      ctx.lineTo(3 - legSwing, PLAYER_SIZE / 2 + 6);
      ctx.stroke();
    } else {
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-3, PLAYER_SIZE / 2 - 4);
      ctx.lineTo(-6, PLAYER_SIZE / 2 + 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(3, PLAYER_SIZE / 2 - 4);
      ctx.lineTo(6, PLAYER_SIZE / 2 + 2);
      ctx.stroke();
    }
    ctx.restore();
    // Trail
    if (frame % 3 === 0 && this.state === "playing") {
      this.particles.push({
        x: p.x, y: p.y + PLAYER_SIZE,
        vx: -1 - Math.random(), vy: -Math.random() * 0.5,
        life: 15 + Math.random() * 10, maxLife: 25,
        color: "rgba(124,92,252,0.6)", size: 2 + Math.random() * 2,
      });
    }
  }

  drawCoinEntity(coin: Coin) {
    if (coin.collected) return;
    const { ctx, frame } = this;
    const bob = Math.sin(coin.bobOffset + frame * 0.05) * 4;
    const glow = 0.4 + 0.3 * Math.sin(coin.glowPhase + frame * 0.08);
    const cx = coin.x + coin.width / 2;
    const cy = coin.y + coin.height / 2 + bob;
    ctx.save();
    ctx.shadowColor = `rgba(255,215,0,${glow})`;
    ctx.shadowBlur = 16;
    ctx.fillStyle = "#FFD700";
    ctx.beginPath();
    ctx.arc(cx, cy, COIN_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#FFF8DC";
    ctx.beginPath();
    ctx.arc(cx - 2, cy - 2, COIN_SIZE / 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#B8860B";
    ctx.font = `bold ${COIN_SIZE * 0.6}px Outfit, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", cx + 1, cy + 1);
    ctx.restore();
  }

  drawObstacleEntity(obs: Obstacle) {
    if (obs.hit) return;
    const { ctx } = this;
    ctx.save();
    ctx.shadowColor = "rgba(255,50,50,0.5)";
    ctx.shadowBlur = 10;
    const grad = ctx.createLinearGradient(obs.x, obs.y, obs.x, obs.y + obs.height);
    grad.addColorStop(0, "#FF4444");
    grad.addColorStop(1, "#CC0000");
    ctx.fillStyle = grad;
    roundRect(ctx, obs.x, obs.y, obs.width, obs.height, 4);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillRect(obs.x + 2, obs.y + 2, obs.width - 4, 4);
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 2;
    const midX = obs.x + obs.width / 2;
    const midY = obs.y + obs.height / 2;
    const s = Math.min(obs.width, obs.height) * 0.2;
    ctx.beginPath();
    ctx.moveTo(midX - s, midY - s);
    ctx.lineTo(midX + s, midY + s);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(midX + s, midY - s);
    ctx.lineTo(midX - s, midY + s);
    ctx.stroke();
    ctx.restore();
  }

  drawParticles() {
    const { ctx } = this;
    for (const p of this.particles) {
      const alpha = p.life / p.maxLife;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  drawConfetti() {
    const { ctx } = this;
    for (const c of this.confetti) {
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate((c.rotation * Math.PI) / 180);
      ctx.fillStyle = c.color;
      ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
      ctx.restore();
    }
  }

  drawHUD() {
    const { ctx, w, score, lives, combo, speedMult } = this;
    ctx.save();
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 22px Outfit, sans-serif";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.shadowColor = "rgba(93,63,211,0.7)";
    ctx.shadowBlur = 8;
    ctx.fillText(`${score}`, 16, 14);
    ctx.font = "bold 13px Outfit, sans-serif";
    ctx.fillStyle = "#A78BFA";
    ctx.shadowBlur = 0;
    ctx.fillText(`x${speedMult.toFixed(1)}`, 16, 40);
    if (combo > 1) {
      ctx.font = "bold 14px Outfit, sans-serif";
      ctx.fillStyle = "#FFD700";
      ctx.fillText(`Combo x${combo}`, 16, 58);
    }
    ctx.textAlign = "right";
    ctx.font = "18px sans-serif";
    ctx.shadowBlur = 0;
    let heartsStr = "";
    for (let i = 0; i < MAX_LIVES; i++) {
      heartsStr += i < lives ? "\u2764\uFE0F" : "\uD83D\uDDA4";
    }
    ctx.fillText(heartsStr, w - 14, 14);
    ctx.restore();
  }

  // ---- Screen draws ----

  drawStartScreen() {
    const { ctx, w, h, frame } = this;
    this.drawBackground();
    this.drawMountains();
    this.drawClouds();
    this.drawGround();
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.shadowColor = "#7C5CFC";
    ctx.shadowBlur = 20;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 36px 'Playfair Display', serif";
    ctx.fillText("Tax Runner", w / 2, h * 0.28);
    ctx.font = "40px sans-serif";
    ctx.shadowBlur = 0;
    ctx.fillText("\uD83C\uDFC3", w / 2 - 90, h * 0.28);
    ctx.font = "14px Outfit, sans-serif";
    ctx.fillStyle = "#A78BFA";
    ctx.fillText("Recoge deducciones, esquiva multas de la DIAN", w / 2, h * 0.40);
    if (this.highScore > 0) {
      ctx.font = "13px Outfit, sans-serif";
      ctx.fillStyle = "#FFD700";
      ctx.fillText(`Mejor Puntuacion: ${this.highScore}`, w / 2, h * 0.50);
    }
    // Play button
    const btnW = 160;
    const btnH = 46;
    const btnX = w / 2 - btnW / 2;
    const btnY = h * 0.58;
    const pulse = 1 + 0.03 * Math.sin(frame * 0.06);
    ctx.save();
    ctx.translate(w / 2, btnY + btnH / 2);
    ctx.scale(pulse, pulse);
    ctx.translate(-w / 2, -(btnY + btnH / 2));
    const btnGrad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
    btnGrad.addColorStop(0, "#6A3FA0");
    btnGrad.addColorStop(1, "#5D3FD3");
    ctx.fillStyle = btnGrad;
    ctx.shadowColor = "rgba(93,63,211,0.5)";
    ctx.shadowBlur = 16;
    roundRect(ctx, btnX, btnY, btnW, btnH, 23);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 18px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("JUGAR", w / 2, btnY + btnH / 2);
    ctx.restore();
    ctx.fillStyle = "rgba(255,255,255,0.4)";
    ctx.font = "12px Outfit, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("ESPACIO / Toca para saltar", w / 2, h * 0.86);
    ctx.restore();
  }

  drawGameOverScreen() {
    const { ctx, w, h } = this;
    this.drawBackground();
    this.drawMountains();
    this.drawGround();
    ctx.fillStyle = "rgba(0,0,0,0.55)";
    ctx.fillRect(0, 0, w, h);
    this.drawConfetti();
    this.gameOverTick++;
    const finalScore = this.score;
    if (this.displayScore < finalScore) {
      this.displayScore = Math.min(finalScore, this.displayScore + Math.ceil(finalScore / 60));
    }
    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#FF6B6B";
    ctx.font = "bold 28px 'Playfair Display', serif";
    ctx.shadowColor = "rgba(255,50,50,0.5)";
    ctx.shadowBlur = 12;
    ctx.fillText("Fin del Juego", w / 2, h * 0.14);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 38px Outfit, sans-serif";
    ctx.fillText(`${this.displayScore}`, w / 2, h * 0.27);
    ctx.fillStyle = "#A78BFA";
    ctx.font = "13px Outfit, sans-serif";
    ctx.fillText("puntos", w / 2, h * 0.34);
    if (this.newHigh) {
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 14px Outfit, sans-serif";
      ctx.fillText("Nueva Mejor Puntuacion!", w / 2, h * 0.40);
    }
    // Score message
    const msg = SCORE_MESSAGES.find((m) => finalScore >= m.min && finalScore < m.max)?.message || "";
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.font = "12px Outfit, sans-serif";
    const words = msg.split(" ");
    let line = "";
    let lineY = h * 0.47;
    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > w - 60) {
        ctx.fillText(line.trim(), w / 2, lineY);
        line = word + " ";
        lineY += 16;
      } else {
        line = test;
      }
    }
    if (line.trim()) ctx.fillText(line.trim(), w / 2, lineY);
    // Tax tip
    const tip = TAX_TIPS[this.tipIndex % TAX_TIPS.length];
    ctx.fillStyle = "rgba(167,139,250,0.8)";
    ctx.font = "italic 11px Outfit, sans-serif";
    let tipLine = "";
    let tipY = lineY + 24;
    ctx.fillText("Tip:", w / 2, tipY);
    tipY += 14;
    const tipWords = tip.split(" ");
    for (const tw of tipWords) {
      const test = tipLine + tw + " ";
      if (ctx.measureText(test).width > w - 80) {
        ctx.fillText(tipLine.trim(), w / 2, tipY);
        tipLine = tw + " ";
        tipY += 14;
      } else {
        tipLine = test;
      }
    }
    if (tipLine.trim()) ctx.fillText(tipLine.trim(), w / 2, tipY);
    // Retry button
    const btnW = 180;
    const btnH = 40;
    const btnX = w / 2 - btnW / 2;
    const btnY2 = Math.min(tipY + 26, h * 0.82);
    const btnGrad = ctx.createLinearGradient(btnX, btnY2, btnX + btnW, btnY2 + btnH);
    btnGrad.addColorStop(0, "#6A3FA0");
    btnGrad.addColorStop(1, "#5D3FD3");
    ctx.fillStyle = btnGrad;
    ctx.shadowColor = "rgba(93,63,211,0.5)";
    ctx.shadowBlur = 10;
    roundRect(ctx, btnX, btnY2, btnW, btnH, 20);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 15px Outfit, sans-serif";
    ctx.fillText("JUGAR DE NUEVO", w / 2, btnY2 + btnH / 2);
    // WhatsApp CTA
    const ctaY = btnY2 + btnH + 14;
    const ctaW = 240;
    const ctaH = 36;
    const ctaX = w / 2 - ctaW / 2;
    ctx.fillStyle = "#25D366";
    ctx.shadowColor = "rgba(37,211,102,0.4)";
    ctx.shadowBlur = 10;
    roundRect(ctx, ctaX, ctaY, ctaW, ctaH, 18);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 12px Outfit, sans-serif";
    ctx.fillText("\uD83D\uDCF2 Agenda tu Consulta Gratis", w / 2, ctaY + ctaH / 2);
    ctx.restore();
  }

  // ---- Update & tick ----

  update() {
    const speed = BASE_SPEED * this.speedMult;
    const p = this.player;

    // Player physics
    p.vy += GRAVITY;
    p.y += p.vy;
    if (p.y >= this.groundY - PLAYER_SIZE) {
      p.y = this.groundY - PLAYER_SIZE;
      p.vy = 0;
      p.onGround = true;
    }

    if (this.invincible > 0) this.invincible--;

    // Spawn obstacles
    this.spawnTimer--;
    if (this.spawnTimer <= 0) {
      this.spawnObstacle();
      this.spawnTimer = Math.max(40, 100 - this.speedMult * 8 + Math.random() * 50);
    }

    // Spawn coins
    this.coinTimer--;
    if (this.coinTimer <= 0) {
      this.spawnCoin();
      this.coinTimer = 50 + Math.random() * 60;
    }

    // Update obstacles
    this.obstacles = this.obstacles.filter((o) => {
      o.x -= speed;
      if (o.x + o.width < -20) return false;
      if (
        !o.hit && this.invincible <= 0 &&
        aabb(p.x + 4, p.y + 4, PLAYER_SIZE - 8, PLAYER_SIZE - 8, o.x, o.y, o.width, o.height)
      ) {
        o.hit = true;
        this.lives--;
        this.combo = 0;
        this.invincible = INVINCIBLE_FRAMES;
        this.shake = 12;
        this.burstParticles(o.x + o.width / 2, o.y + o.height / 2, 10, ["#FF4444", "#FF6B6B", "#CC0000"], 4);
        if (this.lives <= 0) {
          this.state = "gameover";
          const isNew = saveHighScore(this.score, this.highScore);
          if (isNew) this.highScore = this.score;
          this.newHigh = isNew;
          this.tipIndex = (this.tipIndex + 1) % TAX_TIPS.length;
          if (isNew) this.burstConfetti();
          this.onStateChange?.();
        }
      }
      return true;
    });

    // Update coins
    this.coins = this.coins.filter((c) => {
      c.x -= speed;
      if (c.x + c.width < -20) return false;
      if (c.collected) return false;
      const bob = Math.sin(c.bobOffset + this.frame * 0.05) * 4;
      if (aabb(p.x, p.y, PLAYER_SIZE, PLAYER_SIZE, c.x, c.y + bob - 2, c.width, c.height + 4)) {
        c.collected = true;
        this.combo++;
        if (this.combo > this.bestCombo) this.bestCombo = this.combo;
        const comboBonus = Math.floor(this.combo / 3);
        this.score += COIN_SCORE + comboBonus * 5;
        this.burstParticles(c.x + c.width / 2, c.y + c.height / 2, 8, ["#FFD700", "#FFF8DC", "#F59E0B", "#FFFFFF"], 3);
        const newMult = 1 + Math.floor(this.score / SPEED_MILESTONE) * SPEED_INCREMENT;
        if (newMult !== this.speedMult) this.speedMult = newMult;
        return false;
      }
      return true;
    });

    // Update particles
    this.particles = this.particles.filter((pt) => {
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.vy += 0.06;
      pt.life--;
      return pt.life > 0;
    });

    // Update clouds
    for (const c of this.clouds) {
      c.x -= c.speed * this.speedMult;
      if (c.x + c.width < -40) {
        c.x = this.w + 40 + Math.random() * 60;
        c.y = 20 + Math.random() * (this.h * 0.35);
      }
    }

    // Update mountains
    for (const m of this.mountains) {
      m.x -= 0.3 * this.speedMult;
      if (m.x + m.width < -20) {
        m.x = this.w + 20 + Math.random() * 100;
        m.height = 60 + Math.random() * 80;
      }
    }
  }

  // ---- Main loop ----

  tick() {
    if (this.destroyed) return;
    const { ctx, dpr } = this;
    ctx.save();
    ctx.scale(dpr, dpr);

    if (this.shake > 0) {
      const intensity = this.shake * 0.5;
      ctx.translate(
        (Math.random() - 0.5) * intensity,
        (Math.random() - 0.5) * intensity
      );
      this.shake--;
    }

    this.frame++;

    if (this.state === "start") {
      this.drawStartScreen();
      ctx.restore();
      this.animFrame = requestAnimationFrame(() => this.tick());
      return;
    }

    if (this.state === "gameover") {
      this.drawGameOverScreen();
      this.confetti = this.confetti.filter((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.04;
        c.rotation += c.rotationSpeed;
        c.life--;
        return c.life > 0;
      });
      ctx.restore();
      this.animFrame = requestAnimationFrame(() => this.tick());
      return;
    }

    // Playing
    this.update();
    this.drawBackground();
    this.drawMountains();
    this.drawClouds();
    this.drawGround();
    for (const o of this.obstacles) this.drawObstacleEntity(o);
    for (const c of this.coins) this.drawCoinEntity(c);
    this.drawParticles();
    this.drawPlayer();
    this.drawHUD();

    ctx.restore();
    this.animFrame = requestAnimationFrame(() => this.tick());
  }

  start() {
    this.initBackground();
    this.player.y = this.groundY - PLAYER_SIZE;
    this.tick();
  }

  destroy() {
    this.destroyed = true;
    cancelAnimationFrame(this.animFrame);
  }
}

// ---------------------------------------------------------------------------
// React Component
// ---------------------------------------------------------------------------

export default function TaxRunnerGame() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<TaxRunnerEngine | null>(null);

  const [, forceUpdate] = useState(0);

  const whatsappUrl = useMemo(
    () =>
      "https://wa.me/573207269417?text=Hola%20Yakeline,%20jugu%C3%A9%20Tax%20Runner%20y%20quiero%20optimizar%20mis%20impuestos",
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const engine = new TaxRunnerEngine(canvas);
    engineRef.current = engine;

    engine.onStateChange = () => forceUpdate((n) => n + 1);

    // Initial resize
    const doResize = () => {
      if (!container) return;
      engine.resize(container.clientWidth);
    };
    doResize();
    engine.start();

    // Keyboard
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        engine.interact();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", doResize);

    return () => {
      engine.destroy();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", doResize);
    };
  }, []);

  const handleCanvasPointer = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const engine = engineRef.current;
    if (!engine) return;

    const canvas = canvasRef.current;
    if (!canvas) {
      engine.interact();
      return;
    }

    if (engine.state === "gameover") {
      const rect = canvas.getBoundingClientRect();
      let clientX: number, clientY: number;
      if ("touches" in e) {
        if (e.touches.length === 0) {
          engine.interact();
          return;
        }
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const scaleX = engine.w / rect.width;
      const scaleY = engine.h / rect.height;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      if (engine.checkWhatsAppHit(x, y)) {
        window.open(whatsappUrl, "_blank");
        return;
      }
    }

    engine.interact();
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 4 },
        background:
          "linear-gradient(180deg, rgba(93,63,211,0.04) 0%, rgba(255,255,255,0) 100%)",
      }}
    >
      {/* Section Header */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: { xs: "1.6rem", md: "2.2rem" },
            background: "linear-gradient(135deg, #5D3FD3 0%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            mb: 1,
          }}
        >
          Aprende Jugando
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            maxWidth: 480,
            mx: "auto",
            fontSize: { xs: "0.9rem", md: "1rem" },
          }}
        >
          Pon a prueba tus reflejos financieros con nuestros mini-juegos
        </Typography>
      </Box>

      {/* Game Container */}
      <Box
        ref={containerRef}
        sx={{
          maxWidth: 700,
          mx: "auto",
          position: "relative",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow:
            "0 0 30px rgba(93,63,211,0.25), 0 0 60px rgba(93,63,211,0.1)",
          border: "1px solid rgba(93,63,211,0.3)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: -1,
            borderRadius: "17px",
            padding: "1px",
            background:
              "linear-gradient(135deg, rgba(93,63,211,0.5), rgba(167,139,250,0.3), rgba(93,63,211,0.5))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            pointerEvents: "none",
          },
        }}
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasPointer}
          onTouchStart={(e) => {
            e.preventDefault();
            handleCanvasPointer(e);
          }}
          style={{
            display: "block",
            width: "100%",
            cursor: "pointer",
            touchAction: "none",
          }}
        />
      </Box>

      {/* Instructions */}
      <Typography
        variant="body2"
        sx={{
          textAlign: "center",
          mt: 2,
          color: "text.secondary",
          fontSize: "0.8rem",
          opacity: 0.7,
        }}
      >
        Usa ESPACIO o toca la pantalla para saltar
      </Typography>

      {/* Hidden WhatsApp link for accessibility */}
      <Box
        component="a"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          position: "absolute",
          width: 1,
          height: 1,
          overflow: "hidden",
          clip: "rect(0 0 0 0)",
        }}
        aria-label="Agenda tu Consulta Gratis por WhatsApp"
      >
        Agenda tu Consulta Gratis
      </Box>
    </Box>
  );
}
