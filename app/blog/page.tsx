"use client";

import BlogListing from "@/app/components/BlogListing/BlogListing";
import FloatingWhatsApp from "@/app/components/FloatingWhatsApp/FloatingWhatsApp";
import { getAllBlogArticles } from "@/lib/blogData";

export default function BlogPage() {
  const articles = getAllBlogArticles();

  return (
    <>
      <BlogListing articles={articles} />
      <FloatingWhatsApp />
    </>
  );
}

