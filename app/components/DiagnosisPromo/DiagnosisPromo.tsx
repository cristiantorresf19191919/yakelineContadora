"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useStyles from "./DiagnosisPromo.styles";
// Assuming we might use a placeholder or one of the existing images for Yakeline
// For now, I will use a placeholder or reference a generic image, ensuring it can be swapped.

const features = [
  "Revisión de la situación",
  "Te señalo 1-2 puntos críticos",
  "Te digo el primer paso para ordenar tus finanzas",
];

export default function DiagnosisPromo() {
  const { classes } = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <motion.div
        className={classes.container}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Box className={classes.imageWrapper}>
          {/* Using a placeholder or the provided image artifact if I can reference it, 
              but for a codebase, better to use a public asset or local public file. 
              I'll assume there is a 'yakeline.jpg' or similar in public, or use a placeholder.
          */}
           <img src="/yakeline_portrait.jpg" alt="Yakeline Bustamante" onError={(e) => e.currentTarget.src = 'https://placehold.co/600x800'} />
        </Box>

        <Box className={classes.contentWrapper}>
          <Typography variant="h2" className={classes.title}>
            Contadora, Finanzas, Revisoría Fiscal & Auditoría
          </Typography>
          <Typography className={classes.subtitle}>
            15 minutos para mirar tus números y encontrar fugas de dinero que hoy
            no ves.
            <br />
            <br />
            Estoy dando diagnósticos financieros gratuitos (solo 10 cupos) de 15
            minutos.
          </Typography>

          <ul className={classes.list}>
            {features.map((feature, index) => (
              <li key={index} className={classes.listItem}>
                <CheckCircleIcon /> {feature}
              </li>
            ))}
          </ul>

          <Box className={classes.ctaContainer}>
            <Box>
                <Typography className={classes.ctaLabel}>COMENTA: <span style={{color: '#d4af37'}}>"DIAGNÓSTICO"</span></Typography>
                <Typography className={classes.ctaLabel}>O ESCRÍBEME: <span style={{color: '#d4af37'}}>"FINANZAS"</span></Typography>
                <Typography variant="body2" sx={{mt: 1}}>Y te envío el enlace para agendar.</Typography>
            </Box>
            
             <Button 
                variant="outlined" 
                className={classes.ctaButton}
                href="https://wa.me/573207269417?text=Hola%20Yakeline,%20quisiera%20un%20diagnóstico%20financiero"
                target="_blank"
             >
                Solicitar Diagnóstico
             </Button>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
