"use client";

import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import useStyles from "./ServicesHighlights.styles";

const services = [
  {
    title: "Planeación Fiscal",
    description:
      "Reduce el impacto de tus impuestos de manera legal, ética y eficiente.",
  },
  {
    title: "Casos DIAN",
    description:
      "Resolvemos y prevenimos problemas con la DIAN, garantizando cumplimiento fiscal y tranquilidad financiera.",
  },
  {
    title: "Protección patrimonial",
    description:
      "Preservamos el valor de tus bienes y aseguramos su disponibilidad para las generaciones futuras.",
  },
  {
    title: "Contabilidades",
    description:
      "Mantén tus registros contables organizados, claros y listos para auditorías, con el respaldo de una experta.",
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
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}


