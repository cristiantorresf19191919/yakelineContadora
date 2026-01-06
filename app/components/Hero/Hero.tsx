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

