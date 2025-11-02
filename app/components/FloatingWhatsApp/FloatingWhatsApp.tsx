"use client";

import { Box } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState } from "react";
import useStyles from "./FloatingWhatsApp.styles";

export default function FloatingWhatsApp() {
  const { classes } = useStyles();
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
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
    <Box
      className={classes.floatingButton}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      role="button"
      aria-label="Contactar por WhatsApp"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <WhatsAppIcon className={classes.icon} />
      <Box
        className={`${classes.tooltip} ${
          showTooltip ? classes.tooltipVisible : ""
        }`}
      >
        ¿Tienes alguna pregunta?
      </Box>
    </Box>
  );
}

