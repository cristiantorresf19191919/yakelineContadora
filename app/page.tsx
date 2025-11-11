"use client";

import AboutSection from "./components/AboutSection/AboutSection";
import ConfidenceShowcase from "./components/ConfidenceShowcase/ConfidenceShowcase";
import FloatingWhatsApp from "./components/FloatingWhatsApp/FloatingWhatsApp";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import NewsletterSection from "./components/NewsletterSection/NewsletterSection";
import PremiumClientsCarousel from "./components/PremiumClientsCarousel/PremiumClientsCarousel";
import ServicesHighlights from "./components/ServicesHighlights/ServicesHighlights";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesHighlights />
      <ConfidenceShowcase />
      <PremiumClientsCarousel />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
