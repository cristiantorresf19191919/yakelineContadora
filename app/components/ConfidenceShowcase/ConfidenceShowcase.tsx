"use client";

import { useCallback, useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  // Mouse position values (desktop only)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the parallax effect
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  // Scroll-based animations for mobile (optional, can be removed if not needed)
  // const { scrollYProgress } = useScroll({
  //   target: sectionRef,
  //   offset: ["start end", "end start"],
  // });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable on mobile
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      x.set((e.clientX - rect.left - centerX) / centerX); // -1 to 1
      y.set((e.clientY - rect.top - centerY) / centerY); // -1 to 1
    }
  };

  const handleMouseLeave = () => {
    if (isMobile) return; // Disable on mobile
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
      ref={sectionRef}
    >
      <Box className={classes.glowBackdrop} />
      <Box 
        className={classes.container}
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
              // Desktop: mouse-based parallax
              // Mobile: scroll-based or static with nice animations
              const depthFactor = Math.abs(index - 2) + 1;
              
              // Desktop transforms
              const rotateY = useTransform(mouseX, [-1, 1], [-5 * depthFactor, 5 * depthFactor]);
              const rotateX = useTransform(mouseY, [-1, 1], [5 * depthFactor, -5 * depthFactor]);
              const translateX = useTransform(mouseX, [-1, 1], [-10 * depthFactor, 10 * depthFactor]);

              // Adjust baseTilt for mobile (less tilt, more subtle)
              const mobileTilt = isMobile ? baseTilt * 0.2 : baseTilt;

              return (
                <motion.div
                  key={src}
                  className={cx(classes.photoCard, classes[className])}
                  style={{
                    rotateY: isMobile ? 0 : rotateY,
                    rotateX: isMobile ? 0 : rotateX,
                    x: isMobile ? 0 : translateX,
                    zIndex: index === 2 ? 10 : 5 - Math.abs(index - 2),
                  }}
                  initial={{ 
                    opacity: 0, 
                    y: isMobile ? 50 : 100, 
                    rotate: mobileTilt,
                    scale: isMobile ? 0.9 : 1,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: isMobile ? 0 : baseY,
                    rotate: mobileTilt,
                    scale: 1,
                    transition: {
                      type: "spring",
                      duration: isMobile ? 0.6 : 1,
                      delay: index * (isMobile ? 0.12 : 0.1),
                      bounce: isMobile ? 0.5 : 0.3,
                    },
                  }}
                  viewport={{ once: false, margin: isMobile ? "-100px" : "-50px" }}
                  animate={
                    isMobile
                      ? undefined // Disable breathing on mobile for better performance
                      : {
                          y: [baseY, baseY - 8, baseY],
                        }
                  }
                  transition={
                    isMobile
                      ? undefined
                      : {
                          y: {
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          },
                        }
                  }
                  whileHover={
                    isMobile
                      ? undefined // Disable hover on mobile
                      : {
                          scale: 1.35,
                          y: baseY - 30,
                          zIndex: 50,
                          rotate: 0,
                          filter: "brightness(1.15)",
                          transition: { duration: 0.4, type: "spring", stiffness: 300 },
                        }
                  }
                  whileTap={
                    isMobile
                      ? {
                          scale: 0.98,
                          transition: { duration: 0.2 },
                        }
                      : undefined
                  }
                >
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={isMobile ? "(max-width: 600px) 90vw, (max-width: 900px) 45vw, 300px" : "(max-width: 900px) 45vw, 300px"}
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


