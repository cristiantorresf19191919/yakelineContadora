"use client";

import { CSSProperties, useCallback } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import useStyles from "./ConfidenceShowcase.styles";

const cardClassNames = [
  "cardSmall",
  "cardMedium",
  "cardLarge",
  "cardRight",
  "cardRightSmall",
] as const;

type CardClassName = (typeof cardClassNames)[number];

type GalleryImage = {
  src: string;
  alt: string;
  className: CardClassName;
  tilt: string;
  priority?: boolean;
};

type TiltStyle = CSSProperties & { "--tilt"?: string };

const galleryImages: GalleryImage[] = [
  {
    src: "/photo1.jpg",
    alt: "Yakeline Bustamante sonriendo con confianza",
    className: "cardSmall",
    tilt: "-7deg",
  },
  {
    src: "/photo4.png",
    alt: "Yakeline Bustamante en consulta profesional",
    className: "cardMedium",
    tilt: "-3deg",
  },
  {
    src: "/photo2.png",
    alt: "Retrato principal de Yakeline Bustamante",
    className: "cardLarge",
    tilt: "0deg",
    priority: true,
  },
  {
    src: "/photo5.png",
    alt: "Yakeline disfrutando de una lectura financiera",
    className: "cardRight",
    tilt: "4deg",
  },
  {
    src: "/photo3.png",
    alt: "Yakeline Bustamante con actitud estratégica",
    className: "cardRightSmall",
    tilt: "8deg",
  },
];

export default function ConfidenceShowcase() {
  const { classes, cx } = useStyles();

  const handleWhatsAppClick = useCallback(() => {
    const phoneNumber = "3207269417";
    const message = encodeURIComponent(
      "Hola Yakeline, quiero tener mis finanzas bajo control."
    );
    window.open(
      `https://wa.me/${phoneNumber}?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  }, []);

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.glowBackdrop} />
      <Box className={classes.container}>
        <Typography variant="h2" className={classes.heading}>
          Ten todo{" "}
          <Box component="span" className={classes.highlight}>
            bajo control
          </Box>{" "}
          y deja de preocuparte
        </Typography>

        <Box className={classes.gallery}>
          {galleryImages.map(({ src, alt, className, tilt, priority }) => (
            <Box
              key={src}
              className={cx(classes.photoCard, classes[className])}
              style={{ "--tilt": tilt } as TiltStyle}
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority={priority}
                sizes="(max-width: 900px) 45vw, 220px"
              />
            </Box>
          ))}
        </Box>

        <Box className={classes.ctaArea}>
          <Box className={classes.ctaGlow} />

          <Box
            component="a"
            className={classes.whatsappButton}
            href="https://wa.me/3207269417"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.preventDefault();
              handleWhatsAppClick();
            }}
          >
            <WhatsAppIcon className={classes.whatsappIcon} />
            Transforma tus finanzas
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


