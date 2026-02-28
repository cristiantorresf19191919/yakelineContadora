"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import useStyles from "./PremiumClientsCarousel.styles";

type Testimonial = {
  id: string;
  category: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
  avatarColor: string;
};

const testimonials: Testimonial[] = [
  {
    id: "alejandro-lopez",
    category: "Tributario",
    quote: "Excelentes resultados con Yakeline. Nos ayud\u00f3 a resolver nuestra situaci\u00f3n tributaria de manera eficiente y profesional.",
    name: "Alejandro L\u00f3pez",
    role: "CEO \u00b7 C\u00e1mara de Abogados",
    rating: 5,
    avatarColor: "#7C3AED",
  },
  {
    id: "jorge-henao",
    category: "Asesor\u00eda",
    quote:
      "Trabajar con Yakeline ha sido una de las mejores decisiones para mi negocio. Su asesor\u00eda optimiz\u00f3 mis finanzas y me dio tranquilidad.",
    name: "Jorge Henao",
    role: "Empresario Colombiano",
    rating: 5,
    avatarColor: "#DB2777",
  },
  {
    id: "valentina-vega",
    category: "Asesor\u00eda",
    quote:
      "Yakeline ha sido fundamental para el crecimiento de mi negocio. Su organizaci\u00f3n financiera me brind\u00f3 la calma que necesitaba.",
    name: "Valentina Vega",
    role: "Profesional Independiente",
    rating: 5,
    avatarColor: "#F59E0B",
  },
  {
    id: "libardo-sanchez",
    category: "Casos DIAN",
    quote:
      "Gracias a Yakeline resolvimos problemas con la DIAN en tiempo r\u00e9cord. El acompa\u00f1amiento profesional y humano que necesit\u00e1bamos.",
    name: "Libardo S\u00e1nchez",
    role: "Director Financiero",
    rating: 5,
    avatarColor: "#4CAF50",
  },
  {
    id: "sofia-garcia",
    category: "Planeaci\u00f3n",
    quote:
      "Nos ayud\u00f3 a planear un a\u00f1o fiscal impecable. El equipo ahora trabaja con mayor claridad y foco en el crecimiento.",
    name: "Sof\u00eda Garc\u00eda",
    role: "COO \u00b7 StartUp Tech",
    rating: 5,
    avatarColor: "#2196F3",
  },
];

export default function PremiumClientsCarousel() {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isLgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const visibleSlides = useMemo(() => {
    if (isMdDown) {
      return 1;
    }
    if (isLgDown) {
      return 2;
    }
    return 3;
  }, [isLgDown, isMdDown]);

  const totalSlides = testimonials.length;
  const maxIndex = Math.max(totalSlides - visibleSlides, 0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);

  // Clamp currentIndex when maxIndex changes
  const clampedIndex = Math.min(currentIndex, maxIndex);

  const moveToIndex = useCallback(
    (index: number) => {
      const nextIndex =
        maxIndex === 0 ? 0 : ((index % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      setCurrentIndex(nextIndex);
    },
    [maxIndex]
  );

  const handleNext = useCallback(() => {
    moveToIndex(currentIndex + 1);
  }, [currentIndex, moveToIndex]);

  const handlePrev = useCallback(() => {
    moveToIndex(currentIndex - 1);
  }, [currentIndex, moveToIndex]);

  useEffect(() => {
    if (maxIndex === 0) {
      return;
    }

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!isHoveredRef.current) {
          setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }
      }, 6000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [maxIndex]);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const slideWidthPercent = 100 / visibleSlides;
  const trackStyle = {
    transform: `translate3d(-${clampedIndex * slideWidthPercent}%, 0, 0)`,
  };

  return (
    <Box
      component="section"
      className={classes.section}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box className={classes.container}>
        <Typography className={classes.eyebrow}>
          Clientes Premium
        </Typography>
        <Typography variant="h2" className={classes.title}>
          Resultados <span className={classes.highlighted}>Excepcionales</span> que inspiran confianza
        </Typography>
        <Typography className={classes.subtitle}>
          Historias reales de líderes que confiaron en nuestra asesoría para
          transformar sus finanzas, proteger su patrimonio y alcanzar la calma
          financiera que merecen.
        </Typography>

        <Box className={classes.carouselWrapper}>
          <Box className={classes.carouselViewport}>
            <Box
              ref={carouselTrackRef}
              className={classes.carouselTrack}
              style={trackStyle}
            >
              {testimonials.map((testimonial) => (
                <Box
                  key={testimonial.id}
                  className={classes.slide}
                  style={{
                    flex: `0 0 ${slideWidthPercent}%`,
                  }}
                >
                  <Box className={classes.card}>
                    <Box className={classes.cardHeader}>
                      <Box className={classes.categoryPill}>
                        {testimonial.category}
                      </Box>
                      {/* Star rating */}
                      <Box sx={{ display: "flex", gap: 0.25 }}>
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <StarRoundedIcon
                            key={i}
                            sx={{ fontSize: 16, color: "#F59E0B" }}
                          />
                        ))}
                      </Box>
                    </Box>
                    <Box className={classes.content}>
                      <span className={classes.quoteMark}>&ldquo;</span>
                      <Typography className={classes.quote}>
                        {testimonial.quote}
                      </Typography>
                      <Box className={classes.clientInfo}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          {/* Avatar initials */}
                          <Box
                            sx={{
                              width: 40,
                              height: 40,
                              borderRadius: "50%",
                              background: `linear-gradient(135deg, ${testimonial.avatarColor} 0%, ${testimonial.avatarColor}cc 100%)`,
                              color: "#fff",
                              display: "grid",
                              placeItems: "center",
                              fontSize: "0.875rem",
                              fontWeight: 700,
                              flexShrink: 0,
                              boxShadow: `0 4px 12px ${testimonial.avatarColor}30`,
                            }}
                          >
                            {testimonial.name.split(" ").map(n => n[0]).join("")}
                          </Box>
                          <Box>
                            <Typography className={classes.clientName}>
                              {testimonial.name}
                            </Typography>
                            <Typography className={classes.clientRole}>
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box className={classes.controls}>
          <Box className={classes.arrows}>
            <IconButton
              className={classes.arrowButton}
              onClick={handlePrev}
              aria-label="Testimonio anterior"
              data-disabled={totalSlides <= visibleSlides}
              disabled={totalSlides <= visibleSlides}
            >
              <ArrowBackIosNewIcon fontSize="small" />
            </IconButton>
            <IconButton
              className={classes.arrowButton}
              onClick={handleNext}
              aria-label="Siguiente testimonio"
              data-disabled={totalSlides <= visibleSlides}
              disabled={totalSlides <= visibleSlides}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box className={classes.indicators}>
            {Array.from({ length: maxIndex + 1 }).map((_, indicatorIndex) => (
              <Box
                key={`indicator-${indicatorIndex}`}
                className={classes.indicatorDot}
                data-active={indicatorIndex === clampedIndex}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


