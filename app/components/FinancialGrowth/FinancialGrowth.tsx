"use client";

import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import useStyles from "./FinancialGrowth.styles";

export default function FinancialGrowth() {
  const { classes } = useStyles();

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.backgroundOverlay} />
      
      <motion.div 
        className={classes.content}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Typography className={classes.yakelineSignature}>
            Yakeline Bustamante
        </Typography>
        
        <Typography variant="h2" className={classes.question}>
            ¿Qué frena tu crecimiento financiero?
        </Typography>

        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
             <Button variant="contained" className={classes.ctaButton} href="#contact">
                Descúbrelo
            </Button>
        </motion.div>
       
      </motion.div>
    </Box>
  );
}
