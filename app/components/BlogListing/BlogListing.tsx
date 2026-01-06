"use client";

import { Box, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { BlogArticle } from "@/lib/blogData";
import { motion } from "framer-motion";
import useStyles from "./BlogListing.styles";

interface BlogListingProps {
  articles: BlogArticle[];
}

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
              Blog de Bienestar Financiero
            </Typography>
            <Typography className={classes.intro}>
              Reflexiones, historias y guías para potenciar tu experiencia de
              bienestar financiero y tomar mejores decisiones con tu dinero.
            </Typography>
          </motion.div>
        </Box>

        {articles.length === 0 ? (
          <Box className={classes.emptyState}>
            <Typography>No hay artículos disponibles en este momento.</Typography>
          </Box>
        ) : (
          <motion.div
            className={classes.grid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
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
                        {new Date(article.date).toLocaleDateString("es-CO", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </Box>
                    <Typography className={classes.cardTitle}>
                      {article.title}
                    </Typography>
                    <Typography className={classes.cardExcerpt}>
                      {article.excerpt}
                    </Typography>
                    <Box className={`${classes.readMore} readMoreLink`}>
                      <Typography component="span">Leer más</Typography>
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
            ))}
          </motion.div>
        )}
      </Box>
    </Box>
  );
}

