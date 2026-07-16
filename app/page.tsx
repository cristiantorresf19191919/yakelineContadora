"use client";

import dynamic from "next/dynamic";

import AboutSection from "./components/AboutSection/AboutSection";
import ConfidenceShowcase from "./components/ConfidenceShowcase/ConfidenceShowcase";
import CredibilityBadges from "./components/CredibilityBadges/CredibilityBadges";
import DiagnosisPromo from "./components/DiagnosisPromo/DiagnosisPromo";
import DocumentChecklist from "./components/DocumentChecklist/DocumentChecklist";
import FaqSection from "./components/FaqSection/FaqSection";
import FinancialGrowth from "./components/FinancialGrowth/FinancialGrowth";
import FinancialHealthQuiz from "./components/FinancialHealthQuiz/FinancialHealthQuiz";
import Footer from "./components/Footer/Footer";
import Hero from "./components/Hero/Hero";
import HomeVideoSection from "./components/HomeVideoSection/HomeVideoSection";
import NewsletterSection from "./components/NewsletterSection/NewsletterSection";
import ProcessSteps from "./components/ProcessSteps/ProcessSteps";
import SectionSkeleton from "./components/SectionSkeleton/SectionSkeleton";
import ServicesHighlights from "./components/ServicesHighlights/ServicesHighlights";
import TaxSavingsCalculator from "./components/TaxSavingsCalculator/TaxSavingsCalculator";
import UvtBracketVisualizer from "./components/UvtBracketVisualizer/UvtBracketVisualizer";
import VideoShowcase from "./components/VideoShowcase/VideoShowcase";

// Below-the-fold, interaction-only sections carry no SEO value, so they are
// code-split and loaded on the client — this keeps them out of the initial
// server HTML and the main JS bundle, trimming first-load cost.
const GamesArcade = dynamic(
  () => import("./components/GamesArcade/GamesArcade"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const SmartPopup = dynamic(() => import("./components/SmartPopup/SmartPopup"), {
  ssr: false,
});
const SocialProofToast = dynamic(
  () => import("./components/SocialProofToast/SocialProofToast"),
  { ssr: false }
);
// Client-only: TaxCalendar computes "now" at render for its day-counters and
// upcoming-deadline filtering. Rendering it only on the client avoids a
// build-time-vs-visit-time hydration mismatch (and defers its JS).
const TaxCalendar = dynamic(
  () => import("./components/TaxCalendar/TaxCalendar"),
  { ssr: false, loading: () => <SectionSkeleton /> }
);

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityBadges />
      <VideoShowcase />
      <HomeVideoSection />
      <FinancialGrowth />
      <ServicesHighlights />
      <TaxSavingsCalculator />
      <UvtBracketVisualizer />
      <FinancialHealthQuiz />
      <ProcessSteps />
      <DocumentChecklist />
      <DiagnosisPromo />
      <ConfidenceShowcase />
      <GamesArcade />
      <TaxCalendar />
      <AboutSection />
      <FaqSection />
      <NewsletterSection />
      <Footer />
      <SmartPopup />
      <SocialProofToast />
    </>
  );
}
