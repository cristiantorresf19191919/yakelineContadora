"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useStyles from "./DiagnosisPromo.styles";
import UrgencyCounter from "../UrgencyCounter/UrgencyCounter";

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
          <Image 
            src="/photo1.jpg" 
            alt="Yakeline Bustamante" 
            width={600}
            height={800}
            style={{ 
              width: "100%", 
              height: "auto",
              borderRadius: "16px",
              objectFit: "cover"
            }}
            priority
          />
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

          <UrgencyCounter total={10} initialRemaining={7} />

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
