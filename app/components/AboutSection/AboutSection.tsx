"use client";

import { Box, Typography } from "@mui/material";
import useStyles from "./AboutSection.styles";

export default function AboutSection() {
  const { classes } = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.container}>
        <Typography variant="h2" className={classes.heading}>
          ¿Te preocupan los Impuestos y el manejo de tu Patrimonio?
        </Typography>
        <Typography className={classes.body}>
          Con más de 10 años de experiencia, ayudo a empresas y personas como tú a
          optimizar su contabilidad, resolver casos con la DIAN y construir un
          futuro financiero sólido.
        </Typography>
        <Typography className={classes.footerNote}>
          🚧 Página en construcción - Más cambios y mejoras vendrán pronto 🚧
        </Typography>
      </Box>
    </Box>
  );
}

