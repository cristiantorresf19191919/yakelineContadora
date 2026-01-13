"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/lib/blogData";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import useStyles from "./BlogListing.styles";

interface BlogListingProps {
  articles: BlogArticle[];
}

type Language = "es" | "en";

const translations = {
  es: {
    title: "Blog de Bienestar Financiero",
    intro: "Reflexiones, historias y guías para potenciar tu experiencia de bienestar financiero y tomar mejores decisiones con tu dinero.",
    emptyState: "No hay artículos disponibles en este momento.",
    readMore: "Leer más",
  },
  en: {
    title: "Financial Wellness Blog",
    intro: "Reflections, stories, and guides to enhance your financial wellness experience and make better decisions with your money.",
    emptyState: "No articles available at this time.",
    readMore: "Read more",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function BlogListing({ articles }: BlogListingProps) {
  const { classes } = useStyles();
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") || "es") as Language;
  const t = translations[lang];

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
          <motion.div
            className={classes.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {articles.map((article) => {
              const articleUrl = lang === "es" 
                ? `/blog/${article.slug}` 
                : `/blog/${article.slug}?lang=en`;
              
              return (
                <Link
                  key={article.slug}
                  href={articleUrl}
                  passHref
                  legacyBehavior
                >
                  <motion.a className={classes.card} variants={cardVariants} whileHover={{ y: -8 }}>
                    <Box className={classes.imageWrapper}>
                      <Image
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        fill
                        className={classes.image}
                        priority={articles.indexOf(article) < 3}
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
                        <Typography component="span">{t.readMore}</Typography>
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
                  </motion.a>
                </Link>
              );
            })}
          </motion.div>
        )}
      </Box>
    </Box>
  );
}

