"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import useStyles from "./AboutSection.styles";

const stats = [
  { label: "Negocios", value: 200 },
  { label: "Cuentas activas", value: 25 },
  { label: "Años de experiencia", value: 10 },
  { label: "Casos con la DIAN", value: 150 },
];

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function AboutSection() {
  const { classes } = useStyles();
  const [animatedValues, setAnimatedValues] = useState(() =>
    stats.map(() => 0)
  );
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  const formattedStats = useMemo(
    () =>
      stats.map((stat, index) => ({
        ...stat,
        display: Math.round(animatedValues[index]),
      })),
    [animatedValues]
  );

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    let animationFrame: number;

    const animate = () => {
      const duration = 1600;
      const start = performance.now();

      const step = (timestamp: number) => {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = easeOutCubic(progress);

        setAnimatedValues(
          stats.map((stat) => stat.value * eased)
        );

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        }
      };

      animationFrame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          animate();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <Box component="section" className={classes.section} ref={sectionRef}>
      <Box className={classes.glowLeft} />
      <Box className={classes.glowRight} />

      <Box className={classes.container}>
        <Box className={classes.header}>
          <Typography variant="h2" className={classes.heading}>
            ¿Te preocupan los Impuestos y el manejo de tu Patrimonio?
          </Typography>
          <Typography className={classes.description}>
            Con más de 10 años de experiencia, acompaño a empresas y personas
            como tú a optimizar su contabilidad, resolver casos con la DIAN y
            construir un futuro financiero sólido.
          </Typography>
        </Box>

        <Box className={classes.contentGrid}>
          <Box className={classes.summaryCard}>
            <Typography className={classes.summaryEyebrow}>
              Yakelin Bustamante trabajando con clientes
            </Typography>
            <Typography className={classes.summaryTitle}>
              Resultados que respaldan nuestra experiencia
            </Typography>
            <Typography className={classes.summaryBody}>
              Integramos planeación fiscal, defensa ante la DIAN y acompañamiento
              estratégico para que cada cifra refleje tranquilidad y crecimiento.
            </Typography>

            <Box className={classes.statsGrid}>
              {formattedStats.map(({ label, display }) => (
                <Box key={label} className={classes.statBlock}>
                  <Typography className={classes.statValue}>+{display}</Typography>
                  <Typography className={classes.statLabel}>{label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className={classes.gallery}>
            <Box className={classes.mainPhoto}>
              <Image
                src="/photo3.png"
                alt="Yakelin Bustamante trabajando con clientes"
                fill
                className={classes.photoImage}
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
              <Box className={classes.photoCaption}>
                Yakelin Bustamante trabajando con clientes
              </Box>
            </Box>

            <Box className={classes.secondaryColumn}>
              <Box className={classes.secondaryPhoto}>
                <Image
                  src="/photo4.png"
                  alt="Yakelin Bustamante sonriendo"
                  fill
                  className={classes.photoImage}
                  sizes="(max-width: 1024px) 50vw, 260px"
                />
                <Box className={classes.photoCaption}>
                  Yakelin Bustamante sonriendo
                </Box>
              </Box>
              <Box className={classes.secondaryPhoto}>
                <Image
                  src="/photo5.png"
                  alt="Yakelin Bustamante en sesión profesional"
                  fill
                  className={classes.photoImage}
                  sizes="(max-width: 1024px) 50vw, 260px"
                />
                <Box className={classes.photoCaption}>
                  Yakelin Bustamante en sesión profesional
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

