"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion, useReducedMotion } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

/* ─────────────────────────────────────────────────────────────
   VideoShowcase — an editorial-cinematic feature player.
   Muted preview autoplays when scrolled into view; a clear
   "Reproducir con sonido" gesture restarts it unmuted with native
   controls. Pauses off-screen; honours reduced-motion (no autoplay).
   Framed in a theme-hued gradient border so it adapts to all moods.
   ───────────────────────────────────────────────────────────── */

const WA_LINK = `https://wa.me/573207269417?text=${encodeURIComponent(
  "Hola Yakeline, vi tu video y quiero agendar una consulta",
)}`;

export default function VideoShowcase() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Muted preview plays when visible; pauses when it leaves the viewport.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e) return;
        if (e.isIntersecting) {
          if (!reduce && !started) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.45 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce, started]);

  const playWithSound = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = false;
    v.loop = false;
    v.controls = true;
    v.currentTime = 0;
    v.play().catch(() => {});
    setStarted(true);
  }, []);

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        py: { xs: 8, md: 14 },
        px: { xs: 2, md: 4 },
        background:
          "radial-gradient(1000px 520px at 14% 8%, rgba(var(--brand-primary-rgb),0.12), transparent 55%), radial-gradient(900px 520px at 88% 96%, rgba(var(--brand-accent-rgb),0.10), transparent 55%), var(--bg)",
      }}
    >
      {/* Atmospheric floating orbs */}
      {!reduce && (
        <>
          <motion.div
            aria-hidden
            animate={{ y: [0, -26, 0], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "8%",
              left: "6%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(var(--brand-primary-rgb),0.16), transparent 70%)",
              filter: "blur(30px)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            aria-hidden
            animate={{ y: [0, 24, 0], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: "6%",
              right: "8%",
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(var(--brand-accent-rgb),0.14), transparent 70%)",
              filter: "blur(36px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <Box sx={{ maxWidth: 1040, mx: "auto", position: "relative", zIndex: 1 }}>
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
            <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--brand-accent)" }}>
              Presentación
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
            Mira cómo puedo{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(120deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
              }}
            >
              ayudarte
            </Box>
          </Typography>
          <Typography sx={{ mt: 2, mx: "auto", maxWidth: 560, color: "var(--text-muted)", fontSize: { xs: "1rem", md: "1.12rem" }, lineHeight: 1.7 }}>
            Un breve vistazo a la asesoría contable y tributaria, cercana y sin
            enredos, que preparo para tu tranquilidad financiera.
          </Typography>
        </motion.div>

        {/* Framed theater player */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Box
            sx={{
              position: "relative",
              p: "2px",
              borderRadius: "28px",
              background:
                "linear-gradient(135deg, rgba(var(--brand-primary-rgb),0.9) 0%, rgba(var(--brand-accent-rgb),0.7) 45%, rgba(var(--brand-primary-rgb),0.15) 100%)",
              boxShadow:
                "0 50px 120px -40px rgba(var(--brand-primary-rgb),0.55), 0 20px 60px -30px rgba(0,0,0,0.5)",
            }}
          >
            {/* Corner brackets */}
            {["tl", "tr", "bl", "br"].map((c) => (
              <Box
                key={c}
                aria-hidden
                sx={{
                  position: "absolute",
                  width: 26,
                  height: 26,
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

            <Box sx={{ position: "relative", borderRadius: "26px", overflow: "hidden", background: "#05050a", aspectRatio: "16 / 9" }}>
              <video
                ref={videoRef}
                src="/video/presentacion.mp4"
                poster="/video/presentacion-poster.jpg"
                muted
                loop
                autoPlay={!reduce}
                playsInline
                preload="metadata"
                aria-label="Video de presentación de Yakeline Contadora"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* Preview overlay (before the user opts into sound) */}
              {!started && (
                <motion.button
                  type="button"
                  onClick={playWithSound}
                  aria-label="Reproducir video con sonido"
                  initial={false}
                  whileHover={reduce ? undefined : { scale: 1.03 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 14,
                    background:
                      "radial-gradient(120% 90% at 50% 50%, rgba(5,5,10,0.12) 0%, rgba(5,5,10,0.42) 100%)",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Box sx={{ position: "relative", display: "grid", placeItems: "center" }}>
                    {!reduce && (
                      <motion.span
                        aria-hidden
                        animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                        style={{ position: "absolute", width: 76, height: 76, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.6)" }}
                      />
                    )}
                    <Box
                      sx={{
                        width: 76,
                        height: 76,
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        color: "#0b0b12",
                        background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.86) 100%)",
                        boxShadow: "0 12px 34px -8px rgba(0,0,0,0.55)",
                      }}
                    >
                      <PlayArrowRoundedIcon sx={{ fontSize: 44, ml: "3px" }} />
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.75,
                      px: 1.75,
                      py: 0.75,
                      borderRadius: "999px",
                      background: "rgba(0,0,0,0.42)",
                      backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.18)",
                      color: "#fff",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                    }}
                  >
                    <VolumeUpRoundedIcon sx={{ fontSize: 17 }} />
                    Reproducir con sonido
                  </Box>
                </motion.button>
              )}
            </Box>
          </Box>
        </motion.div>

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
            Agenda tu consulta
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
}
