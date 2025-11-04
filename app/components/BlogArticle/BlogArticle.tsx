"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { BlogArticle as BlogArticleType } from "@/lib/blogData";
import useStyles from "./BlogArticle.styles";

interface BlogArticleProps {
  article: BlogArticleType;
}

export default function BlogArticle({ article }: BlogArticleProps) {
  const { classes } = useStyles();

  // Simple markdown-like parser for the content
  const parseContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
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
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.contentWrapper}>
        <Box className={classes.content}>
          {parseContent(article.content)}
        </Box>

        <Box className={classes.cta}>
          <Typography className={classes.ctaText}>
            ¿Te acompañamos a organizar tu mente y tus números?
          </Typography>
          <Typography component="p" sx={{ marginBottom: 2, fontSize: "1.125rem", color: "#4A3728" }}>
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
              color: "#4A3728",
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
            href={`https://wa.me/3207269417?text=${encodeURIComponent(
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
