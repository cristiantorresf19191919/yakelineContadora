"use client";

import { Box, Chip, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/lib/blogData";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import useStyles from "./BlogListing.styles";

interface BlogListingProps {
  articles: BlogArticle[];
}

type Language = "es" | "en";

const ALL_CATEGORY = "__all__";

const translations = {
  es: {
    title: "Blog de Bienestar Financiero",
    intro: "Reflexiones, historias y guías para potenciar tu experiencia de bienestar financiero y tomar mejores decisiones con tu dinero.",
    emptyState: "No hay artículos disponibles en este momento.",
    readMore: "Leer más",
    searchPlaceholder: "Busca por título, tema o categoría…",
    searchAria: "Buscar artículos",
    filterAria: "Filtrar artículos por categoría",
    allCategories: "Todos",
    searchEmpty:
      "No encontramos artículos para tu búsqueda. Prueba otra palabra.",
    results: (count: number) =>
      `${count} ${count === 1 ? "artículo" : "artículos"}`,
  },
  en: {
    title: "Financial Wellness Blog",
    intro: "Reflections, stories, and guides to enhance your financial wellness experience and make better decisions with your money.",
    emptyState: "No articles available at this time.",
    readMore: "Read more",
    searchPlaceholder: "Search by title, topic or category…",
    searchAria: "Search articles",
    filterAria: "Filter articles by category",
    allCategories: "All",
    searchEmpty:
      "We couldn't find articles for your search. Try another word.",
    results: (count: number) =>
      `${count} ${count === 1 ? "article" : "articles"}`,
  },
} as const;

/** Strip diacritics + lowercase for accent-insensitive Spanish search. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

/** Accent-insensitive match: exact substring first, then subsequence fallback. */
function matchesQuery(haystack: string, query: string): boolean {
  if (!query) return true;
  if (haystack.includes(query)) return true;
  let hi = 0;
  let qi = 0;
  while (hi < haystack.length && qi < query.length) {
    if (haystack[hi] === query[qi]) qi += 1;
    hi += 1;
  }
  return qi === query.length;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
} as const;

const cardVariantsReduced = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
} as const;

function BlogListingContent({ articles }: BlogListingProps) {
  const { classes } = useStyles();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "es") as Language;
  const t = translations[lang];
  const reduce = useReducedMotion();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(ALL_CATEGORY);

  const categories = useMemo(() => {
    const unique = new Set(articles.map((article) => article.category));
    return Array.from(unique);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const q = normalize(query.trim());
    return articles.filter((article) => {
      if (category !== ALL_CATEGORY && article.category !== category) {
        return false;
      }
      if (!q) return true;
      const haystack = normalize(
        `${article.title} ${article.excerpt} ${article.category}`
      );
      return matchesQuery(haystack, q);
    });
  }, [articles, query, category]);

  return (
    <Box component="section" className={classes.section}>
      <Box className={classes.container}>
        <Box className={classes.header}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Typography variant="h1" className={classes.title}>
              {t.title}
            </Typography>
            <Typography className={classes.intro}>
              {t.intro}
            </Typography>
          </motion.div>
        </Box>

        {articles.length === 0 ? (
          <Box className={classes.emptyState}>
            <Typography>{t.emptyState}</Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                maxWidth: 760,
                margin: "0 auto",
                mb: { xs: 4, md: 6 },
              }}
            >
              <TextField
                fullWidth
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "var(--brand-primary)" }} />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ "aria-label": t.searchAria }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    backgroundColor: "background.paper",
                    fontFamily: "'Outfit', sans-serif",
                    "& fieldset": {
                      borderColor: "rgba(var(--brand-primary-rgb), 0.22)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(var(--brand-primary-rgb), 0.42)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "var(--brand-primary)",
                      borderWidth: "2px",
                    },
                  },
                }}
              />

              <Box
                role="group"
                aria-label={t.filterAria}
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1,
                  justifyContent: "center",
                  mt: 2.5,
                }}
              >
                {[ALL_CATEGORY, ...categories].map((value) => {
                  const selected = category === value;
                  const label =
                    value === ALL_CATEGORY ? t.allCategories : value;
                  return (
                    <Chip
                      key={value}
                      label={label}
                      onClick={() => setCategory(value)}
                      clickable
                      aria-pressed={selected}
                      sx={{
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        fontFamily: "'Outfit', sans-serif",
                        borderRadius: "50px",
                        border: "1px solid",
                        borderColor: selected
                          ? "var(--brand-primary)"
                          : "rgba(var(--brand-primary-rgb), 0.25)",
                        backgroundColor: selected
                          ? "var(--brand-primary)"
                          : "transparent",
                        color: selected ? "#FFFFFF" : "var(--brand-primary)",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: selected
                            ? "var(--brand-primary-dark)"
                            : "rgba(var(--brand-primary-rgb), 0.08)",
                        },
                        "&:focus-visible": {
                          outline: "2px solid var(--brand-primary)",
                          outlineOffset: "2px",
                        },
                      }}
                    />
                  );
                })}
              </Box>
            </Box>

            <Typography
              aria-live="polite"
              sx={{
                textAlign: "center",
                color: "var(--text-subtle)",
                fontSize: "0.95rem",
                fontWeight: 500,
                mb: 3,
              }}
            >
              {t.results(filteredArticles.length)}
            </Typography>

            {filteredArticles.length === 0 ? (
              <Box className={classes.emptyState}>
                <Typography>{t.searchEmpty}</Typography>
              </Box>
            ) : (
              <motion.div
                className={classes.grid}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article, index) => {
                    const articleUrl =
                      lang === "es"
                        ? `/blog/${article.slug}`
                        : `/blog/${article.slug}?lang=en`;

                    return (
                      <motion.div
                        key={article.slug}
                        layout={reduce ? false : "position"}
                        variants={reduce ? cardVariantsReduced : cardVariants}
                        exit={
                          reduce
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                scale: 0.92,
                                transition: { duration: 0.2 },
                              }
                        }
                        whileHover={reduce ? undefined : { y: -8 }}
                        style={{ display: "flex" }}
                      >
                        <Link
                          href={articleUrl}
                          className={classes.card}
                          style={{ width: "100%" }}
                        >
                          <Box className={classes.imageWrapper}>
                            <Image
                              src={article.heroImage}
                              alt={article.heroImageAlt}
                              fill
                              className={classes.image}
                              priority={index < 3}
                            />
                            <Box className={classes.imageOverlay} />
                            <Typography className={classes.categoryBadge}>
                              {article.category}
                            </Typography>
                          </Box>
                          <Box className={classes.cardContent}>
                            <Box className={classes.meta}>
                              <Typography className={classes.date}>
                                {new Date(article.date).toLocaleDateString(
                                  lang === "en" ? "en-US" : "es-CO",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </Typography>
                            </Box>
                            <Typography className={classes.cardTitle}>
                              {article.title}
                            </Typography>
                            <Typography className={classes.cardExcerpt}>
                              {article.excerpt}
                            </Typography>
                            <Box className={`${classes.readMore} readMoreLink`}>
                              <Typography component="span">
                                {t.readMore}
                              </Typography>
                              <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className={classes.arrowIcon}
                              >
                                <path
                                  d="M7.5 15L12.5 10L7.5 5"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Box>
                          </Box>
                        </Link>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default function BlogListing({ articles }: BlogListingProps) {
  return (
    <Suspense fallback={
      <Box component="section" sx={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    }>
      <BlogListingContent articles={articles} />
    </Suspense>
  );
}
