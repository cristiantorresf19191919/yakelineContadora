"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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

  return (
    <Box component="section" className={classes.hero}>
      <Box className={classes.container}>
        <Box className={classes.contentWrapper}>
          <Typography variant="h1" className={classes.mainHeading}>
            <span className={classes.firstLine}>Asesoría Contable y</span>
            <span className={classes.secondLine}>Tributaria</span>
          </Typography>

          <Typography className={classes.tagline}>
            Para el Bienestar De Tus Finanzas
          </Typography>

          <Typography className={classes.bodyText}>
            Optimiza Tu Contabilidad y Asegura el Manejo Correcto De tus Impuestos
          </Typography>

          <Typography className={classes.subHeading}>
            Con la Asesoría de Una Experta en Finanzas.
          </Typography>

          <Box
            component="a"
            href={`https://wa.me/3207269417?text=${encodeURIComponent(
              "Hola, me gustaría solicitar una consulta contable."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.ctaButton}
            onClick={(e) => {
              e.preventDefault();
              handleWhatsAppClick();
            }}
          >
            <WhatsAppIcon className={classes.whatsappIcon} />
            Solicita tu Consulta
          </Box>
        </Box>

        <Box className={classes.imageWrapper}>
          <Image
            src="/photo2.png"
            alt="Asesora contable profesional"
            width={600}
            height={800}
            className={classes.image}
            priority
          />
        </Box>
      </Box>
    </Box>
  );
}

