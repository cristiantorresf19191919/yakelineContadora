"use client";

import AboutSection from "./components/AboutSection/AboutSection";
import ClientResults from "./components/ClientResults/ClientResults";
import ConfidenceShowcase from "./components/ConfidenceShowcase/ConfidenceShowcase";
import CredibilityBadges from "./components/CredibilityBadges/CredibilityBadges";
import DiagnosisPromo from "./components/DiagnosisPromo/DiagnosisPromo";
import FinancialGrowth from "./components/FinancialGrowth/FinancialGrowth";
import FinancialHealthQuiz from "./components/FinancialHealthQuiz/FinancialHealthQuiz";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import NewsletterSection from "./components/NewsletterSection/NewsletterSection";
import PremiumClientsCarousel from "./components/PremiumClientsCarousel/PremiumClientsCarousel";
import ProcessSteps from "./components/ProcessSteps/ProcessSteps";
import SectionDivider from "./components/SectionDivider/SectionDivider";
import ServicesHighlights from "./components/ServicesHighlights/ServicesHighlights";
import HomeVideoSection from "./components/HomeVideoSection/HomeVideoSection";
import SmartPopup from "./components/SmartPopup/SmartPopup";
import SocialProofToast from "./components/SocialProofToast/SocialProofToast";
import TaxCalendar from "./components/TaxCalendar/TaxCalendar";
import TaxSavingsCalculator from "./components/TaxSavingsCalculator/TaxSavingsCalculator";
import GamesArcade from "./components/GamesArcade/GamesArcade";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBadges />
      <HomeVideoSection />
      <SectionDivider variant="wave" topColor="#FAFAFA" bottomColor="#FFFFFF" />
      <FinancialGrowth />
      <ServicesHighlights />
      <SectionDivider variant="curve" topColor="#FFFFFF" bottomColor="#F8F6FF" />
      <TaxSavingsCalculator />
      <FinancialHealthQuiz />
      <ProcessSteps />
      <SectionDivider variant="curve" topColor="#FFFFFF" bottomColor="#FAFAFA" flip />
      <DiagnosisPromo />
      <ClientResults />
      <ConfidenceShowcase />
      <SectionDivider variant="wave" topColor="#FAFAFA" bottomColor="#FFF7F0" />
      <PremiumClientsCarousel />
      <GamesArcade />
      <TaxCalendar />
      <AboutSection />
      <NewsletterSection />
      <Footer />
      <SmartPopup />
      <SocialProofToast />
    </>
  );
}
