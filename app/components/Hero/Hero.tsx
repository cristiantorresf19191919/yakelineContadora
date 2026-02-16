"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import useStyles from "./Hero.styles";
import { useReducedMotion } from "@/app/hooks/useReducedMotion";

export default function Hero() {
  const { classes } = useStyles();
  const prefersReducedMotion = useReducedMotion();

  const handleWhatsAppClick = () => {
    const phoneNumber = "3207269417";
    const message = encodeURIComponent(
      "Hola, me gustaría solicitar una consulta contable."
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  // Subtle, elegant animations following 2025 best practices
  // Respect user's motion preferences for accessibility
  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.1, 0.25, 1], // Elegant ease curve
      },
    },
  } as const;

  const imageVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      x: prefersReducedMotion ? 0 : 20,
      scale: 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: prefersReducedMotion ? 0 : 0.2,
      },
    },
  } as const;

  return (
    <Box component="section" className={classes.hero}>
      <Box className={classes.heroBackground} />
      <Box className={classes.container}>
        <motion.div
          className={classes.contentWrapper}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Typography variant="h1" className={classes.mainHeading}>
              <span className={classes.firstLine}>Asesoría Contable y</span>
              <span className={classes.secondLine}>Tributaria</span>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography className={classes.tagline}>
              Para el Bienestar De Tus Finanzas
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography className={classes.bodyText}>
              Optimiza Tu Contabilidad y Asegura el Manejo Correcto De tus Impuestos
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography className={classes.subHeading}>
              Con la Asesoría de Una Experta en Finanzas.
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<WhatsAppIcon />}
              onClick={handleWhatsAppClick}
              className={classes.ctaButton}
              component={motion.button}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Solicita tu Consulta
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          className={classes.imageWrapper}
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <Box className={classes.imageBackdrop} />
          
          {/* Mobile-only animated shapes - respect reduced motion preference */}
          {!prefersReducedMotion && (
            <Box className={classes.mobileAnimationContainer}>
              {/* Subtle animated blob shape 1 - elegant and smooth */}
              <motion.div
              className={classes.animatedBlob1}
              animate={{
                x: [0, 12, -8, 6, 0],
                y: [0, -10, 6, -4, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "45% 55% 60% 40% / 55% 50% 40% 70%",
                  "55% 45% 50% 50% / 45% 55% 60% 50%",
                  "50% 50% 45% 55% / 60% 45% 55% 55%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95],
              }}
            />

            {/* Subtle animated blob shape 2 - elegant and smooth */}
            <motion.div
              className={classes.animatedBlob2}
              animate={{
                x: [0, -10, 8, -6, 0],
                y: [0, 12, -8, 6, 0],
                scale: [1, 0.96, 1.06, 0.98, 1],
                borderRadius: [
                  "40% 60% 50% 50% / 60% 40% 50% 60%",
                  "55% 45% 55% 45% / 45% 55% 60% 50%",
                  "45% 55% 60% 40% / 55% 45% 45% 70%",
                  "50% 50% 45% 55% / 60% 50% 55% 45%",
                  "40% 60% 50% 50% / 60% 40% 50% 60%",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: [0.45, 0.05, 0.55, 0.95],
                delay: 2,
              }}
            />

            {/* Subtle gradient sweep - more elegant */}
            <motion.div
              className={classes.gradientSweep}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
                repeatDelay: 3,
              }}
            />
            
            {/* Subtle floating particles - elegant and minimal */}
            {[
              { top: "15%", left: "10%" },
              { top: "25%", right: "15%" },
              { top: "45%", left: "20%" },
              { top: "60%", right: "25%" },
              { bottom: "30%", left: "15%" },
              { bottom: "20%", right: "20%" },
            ].map((position, i) => {
              // Subtle circular motion - more refined
              const angleOffset = (i * 60) * (Math.PI / 180);
              const radiusX = 12 + (i % 3) * 4; // Smaller radius (12-20px)
              const radiusY = 10 + (i % 2) * 6; // Smaller radius (10-16px)

              const keyframes = Array.from({ length: 9 }, (_, frame) => {
                const angle = angleOffset + (frame * (Math.PI * 2 / 8));
                return {
                  x: Math.cos(angle) * radiusX,
                  y: Math.sin(angle) * radiusY,
                };
              });

              // More subtle scale and opacity variations
              const scaleValues = [0.85, 0.95, 1.0, 0.95, 0.9, 0.95, 1.0, 0.95, 0.85];
              const opacityValues = [0.2, 0.3, 0.4, 0.35, 0.25, 0.35, 0.4, 0.3, 0.2];

              return (
                <motion.div
                  key={i}
                  className={classes.floatingParticle}
                  style={position}
                  animate={{
                    x: keyframes.map(k => k.x),
                    y: keyframes.map(k => k.y),
                    scale: scaleValues,
                    opacity: opacityValues,
                  }}
                  transition={{
                    duration: 8 + (i % 3) * 2, // Slower, more elegant (8-12 seconds)
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              );
            })}
            </Box>
          )}
          
          <Image
            src="/photo2.png"
            alt="Asesora contable profesional"
            width={600}
            height={800}
            className={classes.image}
            priority
          />
        </motion.div>
      </Box>
    </Box>
  );
}

