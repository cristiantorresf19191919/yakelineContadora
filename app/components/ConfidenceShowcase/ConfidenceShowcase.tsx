"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  baseTilt: number;
  baseY: number;
  priority?: boolean;
};

const galleryImages: GalleryImage[] = [
  {
    src: "/photo1.jpg",
    alt: "Yakeline Bustamante sonriendo con confianza",
    className: "cardSmall",
    baseTilt: -8,
    baseY: 20,
  },
  {
    src: "/photo4.png",
    alt: "Yakeline Bustamante en consulta profesional",
    className: "cardMedium",
    baseTilt: -5,
    baseY: 10,
  },
  {
    src: "/photo2.png",
    alt: "Retrato principal de Yakeline Bustamante",
    className: "cardLarge",
    baseTilt: 0,
    baseY: 0,
    priority: true,
  },
  {
    src: "/photo5.png",
    alt: "Yakeline disfrutando de una lectura financiera",
    className: "cardRight",
    baseTilt: 5,
    baseY: 10,
  },
  {
    src: "/photo3.png",
    alt: "Yakeline Bustamante con actitud estratégica",
    className: "cardRightSmall",
    baseTilt: 8,
    baseY: 20,
  },
];

export default function ConfidenceShowcase() {
  const { classes, cx } = useStyles();
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the parallax effect
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      x.set((e.clientX - rect.left - centerX) / centerX); // -1 to 1
      y.set((e.clientY - rect.top - centerY) / centerY); // -1 to 1
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

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
    <Box
      component="section"
      className={classes.section}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Box className={classes.glowBackdrop} />
      <Box className={classes.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography variant="h2" className={classes.heading}>
            Ten todo{" "}
            <Box component="span" className={classes.highlight}>
              bajo control
            </Box>{" "}
            y deja de preocuparte
          </Typography>
        </motion.div>

        <Box className={classes.gallery}>
          {galleryImages.map(
            ({ src, alt, className, baseTilt, priority, baseY }, index) => {
              // Creating unique rotation transforms for each card based on mouse position
              // Center card moves less, outer cards move more for depth
              const depthFactor = Math.abs(index - 2) + 1; // 1 for center, 2 for mid, 3 for outer
              
              const rotateY = useTransform(mouseX, [-1, 1], [-5 * depthFactor, 5 * depthFactor]);
              const rotateX = useTransform(mouseY, [-1, 1], [5 * depthFactor, -5 * depthFactor]);
              const translateX = useTransform(mouseX, [-1, 1], [-10 * depthFactor, 10 * depthFactor]);

              return (
                <motion.div
                  key={src}
                  className={cx(classes.photoCard, classes[className])}
                  style={{
                    rotateY,
                    rotateX,
                    x: translateX,
                    zIndex: index === 2 ? 10 : 5 - Math.abs(index - 2), // Stack order
                  }}
                  initial={{ opacity: 0, y: 100, rotate: baseTilt }}
                  whileInView={{
                    opacity: 1,
                    y: baseY, // Apply the arch offset
                    rotate: baseTilt,
                    transition: {
                      type: "spring",
                      duration: 1,
                      delay: index * 0.1,
                      bounce: 0.3,
                    },
                  }}
                  animate={{
                    y: [baseY, baseY - 8, baseY], // Breathing animation
                  }}
                  transition={{
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5, // Stagger bouncing
                    },
                  }}
                  whileHover={{
                    scale: 1.15,
                    y: baseY - 20,
                    zIndex: 20,
                    rotate: 0, // Straighten up on hover
                    filter: "brightness(1.1)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes="(max-width: 900px) 45vw, 300px"
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
              );
            }
          )}
        </Box>

        <Box className={classes.ctaArea}>
          <Box className={classes.ctaGlow} />

          <motion.a
            className={classes.whatsappButton}
            href="https://wa.me/3207269417"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => {
              event.preventDefault();
              handleWhatsAppClick();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <WhatsAppIcon className={classes.whatsappIcon} />
            Transforma tus finanzas
          </motion.a>
        </Box>
      </Box>
    </Box>
  );
}


