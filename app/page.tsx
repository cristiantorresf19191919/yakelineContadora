"use client";

import AboutSection from "./components/AboutSection/AboutSection";
import ConfidenceShowcase from "./components/ConfidenceShowcase/ConfidenceShowcase";
import CredibilityBadges from "./components/CredibilityBadges/CredibilityBadges";
import DiagnosisPromo from "./components/DiagnosisPromo/DiagnosisPromo";
import FinancialGrowth from "./components/FinancialGrowth/FinancialGrowth";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import NewsletterSection from "./components/NewsletterSection/NewsletterSection";
import PremiumClientsCarousel from "./components/PremiumClientsCarousel/PremiumClientsCarousel";
import ServicesHighlights from "./components/ServicesHighlights/ServicesHighlights";
import InstagramFeed from "./components/InstagramFeed/InstagramFeed";
import HomeVideoSection from "./components/HomeVideoSection/HomeVideoSection";
import SmartPopup from "./components/SmartPopup/SmartPopup";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBadges />
      <HomeVideoSection />
      <FinancialGrowth />
      <ServicesHighlights />
      <DiagnosisPromo />
      <ConfidenceShowcase />
      <PremiumClientsCarousel />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <SmartPopup />
    </>
  );
}
