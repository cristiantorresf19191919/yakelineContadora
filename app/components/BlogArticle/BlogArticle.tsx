"use client";

import { ReactElement, useCallback, useMemo, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import IosShareRoundedIcon from "@mui/icons-material/IosShareRounded";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BlogArticle as BlogArticleType } from "@/lib/blogData";
import useStyles from "./BlogArticle.styles";

interface BlogArticleProps {
  article: BlogArticleType;
}

export default function BlogArticle({ article }: BlogArticleProps) {
  const { classes } = useStyles();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const [shareError, setShareError] = useState(false);

  // Estimated reading time at ~200 words per minute.
  const readingMinutes = useMemo(() => {
    const words = article.content.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [article.content]);

  const handleShare = useCallback(async () => {
    if (typeof window === "undefined") return;
    const url = window.location.href;
    const shareData = { title: article.title, url };

    // Prefer the native share sheet when available (mobile / supported browsers).
    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      try {
        await navigator.share(shareData);
        return;
      } catch (error) {
        // User dismissed the share sheet: not an error worth surfacing.
        if (error instanceof DOMException && error.name === "AbortError") return;
        // Otherwise fall through to the clipboard fallback below.
      }
    }

    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } else {
        setShareError(true);
        window.setTimeout(() => setShareError(false), 3000);
      }
    } catch {
      setShareError(true);
      window.setTimeout(() => setShareError(false), 3000);
    }
  }, [article.title]);

  // Simple markdown-like parser for the content
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const elements: ReactElement[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];
    let key = 0;
    let isFirstParagraph = true;

    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(" ");
        if (text.trim()) {
          if (isFirstParagraph && text.includes("Por:")) {
            elements.push(
              <p key={key++} className={classes.introText}>
                {text}
              </p>
            );
            isFirstParagraph = false;
          } else {
            elements.push(
              <p key={key++} className={classes.content}>
                {text}
              </p>
            );
          }
        }
        currentParagraph = [];
      }
    };

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key++} className={classes.content}>
            {currentList.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("## ")) {
        flushParagraph();
        flushList();
        isFirstParagraph = false;
        elements.push(
          <h2 key={key++} className={classes.content}>
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith("### ")) {
        flushParagraph();
        flushList();
        isFirstParagraph = false;
        elements.push(
          <h3 key={key++} className={classes.content}>
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed === "⸻") {
        flushParagraph();
        flushList();
        isFirstParagraph = false;
        elements.push(<hr key={key++} className={classes.content} />);
      } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
        flushParagraph();
        flushList();
        isFirstParagraph = false;
        const text = trimmed.slice(2, -2);
        elements.push(
          <p key={key++} className={classes.content}>
            <strong>{text}</strong>
          </p>
        );
      } else if (trimmed.startsWith("• ")) {
        flushParagraph();
        isFirstParagraph = false;
        currentList.push(trimmed.substring(2));
      } else if (trimmed) {
        flushList();
        currentParagraph.push(trimmed);
      } else {
        flushParagraph();
        flushList();
      }
    });

    flushParagraph();
    flushList();

    return elements;
  };

  return (
    <article className={classes.article}>
      <Box className={classes.heroSection}>
        <Box className={classes.heroImageWrapper}>
          <Image
            src={article.heroImage}
            alt={article.heroImageAlt}
            width={1400}
            height={700}
            className={classes.heroImage}
            priority
            quality={90}
          />
          <Box className={classes.header}>
            <Box className={classes.headerContent}>
              <Typography className={classes.category}>
                {article.category}
              </Typography>
              <Typography variant="h1" className={classes.title}>
                {article.title}
              </Typography>
              <Box className={classes.meta}>
                <Typography>Por: Yakelin Bustamante</Typography>
                <Typography className={classes.metaSeparator}>•</Typography>
                <Typography>
                  {new Date(article.date).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Typography>
                <Typography className={classes.metaSeparator}>•</Typography>
                <Typography>{readingMinutes} min de lectura</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.contentWrapper}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 1.5,
            mb: { xs: 3, md: 4 },
            minHeight: 40,
          }}
        >
          <Box
            aria-live="polite"
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: 24,
            }}
          >
            <AnimatePresence initial={false}>
              {copied && (
                <motion.span
                  key="copied"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#16A34A",
                  }}
                >
                  Enlace copiado
                </motion.span>
              )}
              {shareError && (
                <motion.span
                  key="share-error"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#DC2626",
                  }}
                >
                  No se pudo copiar el enlace
                </motion.span>
              )}
            </AnimatePresence>
          </Box>
          <Button
            onClick={handleShare}
            startIcon={<IosShareRoundedIcon />}
            aria-label="Compartir este artículo"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.9375rem",
              color: "var(--brand-primary)",
              borderRadius: "50px",
              border: "1px solid rgba(var(--brand-primary-rgb), 0.3)",
              px: 2,
              py: 0.75,
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(var(--brand-primary-rgb), 0.08)",
                borderColor: "var(--brand-primary)",
              },
              "&:focus-visible": {
                outline: "2px solid var(--brand-primary)",
                outlineOffset: "2px",
              },
            }}
          >
            Compartir
          </Button>
        </Box>

        <Box className={classes.content}>
          {parseContent(article.content)}
        </Box>

        <Box className={classes.cta}>
          <Typography className={classes.ctaText}>
            ¿Te acompañamos a organizar tu mente y tus números?
          </Typography>
          <Typography component="p" sx={{ marginBottom: 2, fontSize: "1.125rem", color: "var(--text)" }}>
            Si sientes que:
          </Typography>
          <ul className={classes.ctaList}>
            <li>El dinero se te va sin saber cómo</li>
            <li>Nunca has hecho un presupuesto en serio</li>
            <li>Quieres ahorrar, pero siempre terminas gastando todo</li>
            <li>Te gustaría que alguien te guíe paso a paso</li>
          </ul>
          <Typography
            component="p"
            sx={{
              marginBottom: 3,
              fontSize: "1.125rem",
              color: "var(--text)",
              lineHeight: 1.7,
            }}
          >
            Estoy aquí para ayudarte. Soy Yakelin Bustamante, contadora y asesora
            financiera, y mi trabajo es unir números + psicología para que tomes
            decisiones más conscientes y logres una vida financiera más tranquila y
            ordenada.
          </Typography>
          <Box
            component="a"
            href={`https://wa.me/573207269417?text=${encodeURIComponent(
              "Hola, me gustaría solicitar una consulta contable."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={classes.ctaButton}
          >
            👉 Contáctame y empezamos a trabajar en tu plan
          </Box>
        </Box>
      </Box>
    </article>
  );
}
