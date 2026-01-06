"use client";

import AboutSection from "./components/AboutSection/AboutSection";
import ConfidenceShowcase from "./components/ConfidenceShowcase/ConfidenceShowcase";
import DiagnosisPromo from "./components/DiagnosisPromo/DiagnosisPromo";
import FinancialGrowth from "./components/FinancialGrowth/FinancialGrowth";
import FloatingWhatsApp from "./components/FloatingWhatsApp/FloatingWhatsApp";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import NewsletterSection from "./components/NewsletterSection/NewsletterSection";
import PremiumClientsCarousel from "./components/PremiumClientsCarousel/PremiumClientsCarousel";
import ServicesHighlights from "./components/ServicesHighlights/ServicesHighlights";
import InstagramFeed from "./components/InstagramFeed/InstagramFeed";

export default function Home() {
  return (
    <>
      <Hero />
      <FinancialGrowth />
      <ServicesHighlights />
      <DiagnosisPromo />
      <ConfidenceShowcase />
      <PremiumClientsCarousel />
      <AboutSection />
      <InstagramFeed limit={3} />
      <NewsletterSection />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
