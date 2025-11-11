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
import useStyles from "./PremiumClientsCarousel.styles";

type Testimonial = {
  id: string;
  category: string;
  quote: string;
  name: string;
  role: string;
};

const testimonials: Testimonial[] = [
  {
    id: "alejandro-lopez",
    category: "Tributario",
    quote: "Excelentes resultados con Yenny.",
    name: "Alejandro López",
    role: "CEO · Cámara de Abogados",
  },
  {
    id: "jorge-henao",
    category: "Asesoría",
    quote:
      "Trabajar con Yenny ha sido una de las mejores decisiones para mi negocio. Su asesoría optimizó mis finanzas y me dio tranquilidad.",
    name: "Jorge Henao",
    role: "Empresario Colombiano",
  },
  {
    id: "valentina-vega",
    category: "Asesoría",
    quote:
      "Yenny ha sido fundamental para el crecimiento de mi negocio. Su organización financiera me brindó la calma que necesitaba.",
    name: "Valentina Vega",
    role: "Profesional Independiente",
  },
  {
    id: "libardo-sanchez",
    category: "Casos DIAN",
    quote:
      "Gracias a Yenny resolvimos problemas con la DIAN en tiempo récord. La acompañé profesional y humana que necesitábamos.",
    name: "Libardo Sánchez",
    role: "Director Financiero",
  },
  {
    id: "sofia-garcia",
    category: "Planeación",
    quote:
      "Nos ayudó a planear un año fiscal impecable. El equipo ahora trabaja con mayor claridad y foco en el crecimiento.",
    name: "Sofía García",
    role: "COO · StartUp Tech",
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

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = testimonials.length;
  const maxIndex = Math.max(totalSlides - visibleSlides, 0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const carouselTrackRef = useRef<HTMLDivElement | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

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
    transform: `translate3d(-${currentIndex * slideWidthPercent}%, 0, 0)`,
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
                    </Box>
                    <Box className={classes.content}>
                      <span className={classes.quoteMark}>“</span>
                      <Typography className={classes.quote}>
                        {testimonial.quote}
                      </Typography>
                      <Box className={classes.clientInfo}>
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
                data-active={indicatorIndex === currentIndex}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


