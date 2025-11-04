"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/lib/blogData";
import useStyles from "./SuggestedArticles.styles";

interface SuggestedArticlesProps {
  articles: BlogArticle[];
  currentSlug: string;
}

export default function SuggestedArticles({
  articles,
  currentSlug,
}: SuggestedArticlesProps) {
  const { classes } = useStyles();

  if (articles.length === 0) return null;

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.container}>
        <Typography variant="h2" className={classes.title}>
          Artículos Relacionados
        </Typography>
        <Box className={classes.grid}>
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className={classes.card}
            >
              <Box className={classes.imageWrapper}>
                <Image
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  fill
                  className={classes.image}
                />
              </Box>
              <Box className={classes.cardContent}>
                <Typography className={classes.cardCategory}>
                  {article.category}
                </Typography>
                <Typography className={classes.cardTitle}>
                  {article.title}
                </Typography>
                <Typography className={classes.cardExcerpt}>
                  {article.excerpt}
                </Typography>
                <Typography className={classes.readMore}>
                  Leer más →
                </Typography>
              </Box>
            </Link>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

