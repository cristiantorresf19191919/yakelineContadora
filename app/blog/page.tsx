"use client";

import BlogListing from "@/app/components/BlogListing/BlogListing";
import LanguageSwitch from "@/app/components/LanguageSwitch/LanguageSwitch";
import { getAllBlogArticles } from "@/lib/blogData";
import { Box } from "@mui/material";

export default function BlogPage() {
  const articles = getAllBlogArticles();

  return (
    <>
      <Box
        sx={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: { xs: "24px 16px 0", sm: "32px 24px 0", md: "64px 48px 0" },
        }}
      >
        <LanguageSwitch />
      </Box>
      <BlogListing articles={articles} />
    </>
  );
}

