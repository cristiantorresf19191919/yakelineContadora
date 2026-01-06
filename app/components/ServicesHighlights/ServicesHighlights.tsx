"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useStyles from "./ServicesHighlights.styles";

const services = [
  {
    title: "Auditorías",
    description:
      "Evaluación exhaustiva de tu situación financiera para garantizar transparencia y cumplimiento.",
  },
  {
    title: "Balances",
    description:
      "Preparación y análisis de estados financieros precisos para la toma de decisiones estratégicas.",
  },
  {
    title: "Liquidaciones",
    description:
      "Cálculo exacto de impuestos y obligaciones laborales, minimizando riesgos y errores.",
  },
  {
    title: "Asesoría tributaria",
    description:
      "Estrategias fiscales personalizadas para optimizar tu carga tributaria legalmente.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 20,
    },
  },
} as const;

export default function ServicesHighlights() {
  const { classes } = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.halo} />
      <motion.div
        className={classes.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div variants={cardVariants}>
          <Typography variant="h2" className={classes.heading}>
            Tu contabilidad, tus impuestos y tu tranquilidad financiera en las
            mejores manos.
          </Typography>
        </motion.div>

        <Box className={classes.cardsWrapper}>
          <Box className={classes.cardsGrid}>
            {services.map(({ title, description }) => (
              <motion.div
                key={title}
                className={classes.card}
                variants={cardVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Box className={classes.accentDot} />
                <Typography component="h3" className={classes.cardTitle}>
                  {title}
                </Typography>
                <Typography className={classes.cardDescription}>
                  {description}
                </Typography>
              </motion.div>
            ))}
             <motion.div
                className={classes.promoCard}
                variants={cardVariants}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                 <Typography variant="h4" className={classes.promoTitle}>
                  PRIMERA ASESORÍA
                  <br />
                  <span style={{ color: "white", background: "#d4af37", padding: "0 8px" }}>GRATIS</span>
                </Typography>
              </motion.div>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}


