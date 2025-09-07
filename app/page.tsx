import { Metadata } from "next";
import { GlobalNavigation } from "@/components/global-navigation";
import { StatsOverview } from "@/components/stats-overview";
import { QuickNavigation } from "@/components/quick-navigation";
import { QuizSystem } from "@/components/quiz-system";
import { CurrencyConverter } from "@/components/currency-converter";
import { RandomFactGenerator } from "@/components/random-fact-generator";
import GlobalRankings from "@/components/global-rankings";
import { EnvironmentDashboard } from "@/components/environment-dashboard";
import LanguageExplorer from "@/components/language-explorer";
import CultureLifestyle from "@/components/culture-lifestyle";
import { HistoricalMapSlider } from "@/components/historical-map-slider";
import { NatureExplorer } from "@/components/nature-explorer";
import Footer from "@/components/footer";
import {
  generateSEOMetadata,
  generateEducationalStructuredData,
} from "@/components/seo/seo-config";

const educationalStructuredData = generateEducationalStructuredData();

export const metadata: Metadata = {
  ...generateSEOMetadata({
    title: "WorldExplorer - Discover the World's Knowledge",
    description:
      "Interactive educational platform for exploring countries, cultures, landmarks, and global knowledge. Learn about geography, history, and cultures worldwide through engaging tools, quizzes, and comprehensive country data.",
    keywords:
      "world explorer, countries, geography, education, travel, culture, landmarks, cities, history, interactive learning, global knowledge, educational platform, country information, cultural studies",
    canonical: "https://theworldexplorer.vercel.app",
  }),
};

export default function HomePage() {
  return (
    <>
      {/* Structured Data for Educational Content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(educationalStructuredData),
        }}
      />

      <div className="page-wrapper page-background">
        <GlobalNavigation currentPage="home" />
        <div className="page-content">
          <main className="main">
            <div className="main-hero">
              <h2 className="main-hero-title">Explore Countries & Cultures</h2>
              <p className="main-hero-description">
                Click on any country to discover its history, landmarks, cities,
                and more
              </p>
            </div>

            <StatsOverview />

            <div className="sections-container">
              <section className="section">
                <QuickNavigation />
              </section>

              <section className="section">
                <HistoricalMapSlider />
              </section>

              <section className="section">
                <RandomFactGenerator />
              </section>

              <section className="section">
                <CultureLifestyle />
              </section>

              <section className="section">
                <NatureExplorer />
              </section>

              <section className="section">
                <LanguageExplorer />
              </section>

              <section className="section">
                <CurrencyConverter />
              </section>

              <section className="section">
                <EnvironmentDashboard />
              </section>

              <section className="section">
                <GlobalRankings />
              </section>

              <section className="section">
                <QuizSystem />
              </section>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </>
  );
}
