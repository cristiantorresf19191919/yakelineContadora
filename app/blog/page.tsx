"use client";

import BlogListing from "@/app/components/BlogListing/BlogListing";
import LanguageSwitch from "@/app/components/LanguageSwitch/LanguageSwitch";
import { getAllBlogArticles } from "@/lib/blogData";
import { Box, Typography, Chip, Container } from "@mui/material";
import { motion } from "framer-motion";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import Footer from "@/app/components/Footer/Footer";

export default function BlogPage() {
  const articles = getAllBlogArticles();

  return (
    <>
      {/* Blog Hero Header */}
      <Box
        sx={{
          pt: { xs: 14, md: 18 },
          pb: { xs: 4, md: 6 },
          background: "linear-gradient(180deg, #FAFAFA 0%, #F3EEFF 50%, #FAFAFA 100%)",
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Chip
              icon={<ArticleRoundedIcon />}
              label="Blog Financiero"
              sx={{
                mb: 2.5,
                px: 2,
                py: 2.5,
                fontSize: "0.85rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #5D3FD3 0%, #7C5CE7 100%)",
                color: "white",
                "& .MuiChip-icon": { color: "white" },
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3.2rem" },
                color: "#1F2937",
                mb: 2,
                lineHeight: 1.2,
              }}
            >
              Insights para tu{" "}
              <Box
                component="span"
                sx={{
                  background: "linear-gradient(135deg, #5D3FD3 0%, #A78BFA 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Crecimiento Financiero
              </Box>
            </Typography>
            <Typography
              sx={{
                color: "#6B7280",
                fontSize: { xs: "1rem", md: "1.15rem" },
                maxWidth: 550,
                mx: "auto",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              Artículos prácticos sobre contabilidad, impuestos y estrategia financiera
              para emprendedores y empresarios colombianos.
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: { xs: "24px 16px 0", sm: "32px 24px 0", md: "0 48px" },
        }}
      >
        <LanguageSwitch />
      </Box>
      <BlogListing articles={articles} />
      <Footer />
    </>
  );
}

