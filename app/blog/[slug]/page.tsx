"use client";

import { useParams } from "next/navigation";
import BlogArticle from "@/app/components/BlogArticle/BlogArticle";
import Breadcrumb, {
  BreadcrumbItem,
} from "@/app/components/Breadcrumb/Breadcrumb";
import SuggestedArticles from "@/app/components/SuggestedArticles/SuggestedArticles";
import {
  getBlogArticle,
  getSuggestedArticles,
} from "@/lib/blogData";
import { Box, Typography } from "@mui/material";

export default function BlogArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = getBlogArticle(slug);

  if (!article) {
    return (
      <>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            paddingTop: "100px",
            textAlign: "center",
            minHeight: "50vh",
          }}
        >
          <Typography variant="h1">Artículo no encontrado</Typography>
          <Typography>El artículo que buscas no existe.</Typography>
        </Box>
      </>
    );
  }

  const suggestedArticles = getSuggestedArticles(slug, 3);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: article.title },
  ];

  return (
    <>
      <Breadcrumb sticky={true} items={breadcrumbItems} />
      <BlogArticle article={article} />
      {suggestedArticles.length > 0 && (
        <SuggestedArticles articles={suggestedArticles} currentSlug={slug} />
      )}
    </>
  );
}

