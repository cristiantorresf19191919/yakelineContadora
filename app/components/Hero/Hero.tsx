"use client";

import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion } from "framer-motion";
import useStyles from "./Hero.styles";

export default function Hero() {
  const { classes } = useStyles();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  const imageVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 },
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
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
          
          {/* Mobile-only animated shapes */}
          <Box className={classes.mobileAnimationContainer}>
            {/* Animated blob shape 1 */}
            <motion.div
              className={classes.animatedBlob1}
              animate={{
                x: [0, 30, -20, 10, 0],
                y: [0, -25, 15, -10, 0],
                scale: [1, 1.2, 0.9, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                borderRadius: [
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "30% 60% 70% 40% / 50% 60% 30% 80%",
                  "70% 30% 50% 50% / 40% 50% 60% 50%",
                  "40% 60% 50% 50% / 60% 40% 50% 60%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            {/* Animated blob shape 2 */}
            <motion.div
              className={classes.animatedBlob2}
              animate={{
                x: [0, -25, 20, -15, 0],
                y: [0, 30, -20, 15, 0],
                scale: [1, 0.8, 1.3, 0.9, 1],
                rotate: [360, 270, 180, 90, 0],
                borderRadius: [
                  "40% 60% 50% 50% / 60% 40% 50% 60%",
                  "70% 30% 50% 50% / 40% 50% 60% 50%",
                  "30% 60% 70% 40% / 50% 60% 30% 80%",
                  "60% 40% 30% 70% / 60% 30% 70% 40%",
                  "40% 60% 50% 50% / 60% 40% 50% 60%",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            
            {/* Gradient sweep shape */}
            <motion.div
              className={classes.gradientSweep}
              animate={{
                x: ["-100%", "200%"],
                rotate: [0, 180],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 1,
              }}
            />
            
            {/* Floating particles - seamless infinite animation */}
            {[
              { top: "15%", left: "10%" },
              { top: "25%", right: "15%" },
              { top: "45%", left: "20%" },
              { top: "60%", right: "25%" },
              { bottom: "30%", left: "15%" },
              { bottom: "20%", right: "20%" },
              { top: "35%", left: "30%" },
              { bottom: "40%", right: "15%" },
            ].map((position, i) => {
              // Create smooth circular-like motion paths that loop seamlessly
              // Each particle follows a different circular pattern
              const angleOffset = (i * 45) * (Math.PI / 180); // Vary starting angle in radians
              const radiusX = 25 + (i % 3) * 8; // Vary horizontal radius (25-41px)
              const radiusY = 20 + (i % 2) * 12; // Vary vertical radius (20-32px)
              
              // Create keyframes for smooth circular motion (8 points for smoothness)
              // Using 9 points where first and last are identical for seamless loop
              const keyframes = Array.from({ length: 9 }, (_, frame) => {
                const angle = angleOffset + (frame * (Math.PI * 2 / 8));
                return {
                  x: Math.cos(angle) * radiusX,
                  y: Math.sin(angle) * radiusY,
                };
              });
              
              // Scale and opacity arrays that loop seamlessly (first = last)
              const scaleValues = [0.7, 1.0, 1.1, 0.9, 0.8, 1.0, 1.1, 0.9, 0.7];
              const opacityValues = [0.3, 0.5, 0.7, 0.6, 0.4, 0.6, 0.7, 0.5, 0.3];
              
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
                    duration: 6 + (i % 3) * 1.5, // Vary duration between 6-9 seconds
                    repeat: Infinity,
                    ease: "linear", // Linear for smooth circular motion
                    delay: i * 0.25, // Stagger start times
                  }}
                />
              );
            })}
          </Box>
          
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

