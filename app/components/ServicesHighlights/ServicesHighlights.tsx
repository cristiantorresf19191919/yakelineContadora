"use client";

import { Box, Typography } from "@mui/material";
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

export default function ServicesHighlights() {
  const { classes } = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.halo} />
      <Box className={classes.container}>
        <Typography variant="h2" className={classes.heading}>
          Tu contabilidad, tus impuestos y tu tranquilidad financiera en las
          mejores manos.
        </Typography>

        <Box className={classes.cardsWrapper}>
          <Box className={classes.cardsGrid}>
            {services.map(({ title, description }) => (
              <Box key={title} className={classes.card}>
                <Box className={classes.accentDot} />
                <Typography component="h3" className={classes.cardTitle}>
                  {title}
                </Typography>
                <Typography className={classes.cardDescription}>
                  {description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


