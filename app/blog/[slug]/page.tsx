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
import JsonLd from "@/app/components/JsonLd/JsonLd";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yakelincontadora.com";

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

  const articleUrl = `${SITE_URL}/blog/${slug}`;
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: article.heroImage
      ? `${SITE_URL}${article.heroImage}`
      : `${SITE_URL}/photo2.png`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "es-CO",
    articleSection: article.category,
    author: {
      "@type": "Person",
      name: "Yakelin Bustamante",
      url: `${SITE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Yakeline Contadora",
      "@id": `${SITE_URL}/#organization`,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: articleUrl,
      },
    ],
  };

  return (
    <>
      <JsonLd data={blogPostingSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Breadcrumb sticky={true} items={breadcrumbItems} />
      <BlogArticle article={article} />
      {suggestedArticles.length > 0 && (
        <SuggestedArticles articles={suggestedArticles} currentSlug={slug} />
      )}
    </>
  );
}

