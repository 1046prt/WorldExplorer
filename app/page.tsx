import { SearchBar } from "@/components/search-bar";
import { StatsOverview } from "@/components/stats-overview";
import { QuickNavigation } from "@/components/quick-navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { QuizSystem } from "@/components/quiz-system";
import { CurrencyConverter } from "@/components/currency-converter";
import { RandomFactGenerator } from "@/components/random-fact-generator";
import { WeatherWidget } from "@/components/weather-widget";
import GlobalRankings from "@/components/global-rankings";
import { InteractiveGames } from "@/components/interactive-games";
import { EnvironmentDashboard } from "@/components/environment-dashboard";
import { LanguageExplorer } from "@/components/language-explorer";
import CultureLifestyle from "@/components/culture-lifestyle";
import { HistoricalMapSlider } from "@/components/historical-map-slider";
import { NatureExplorer } from "@/components/nature-explorer";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="page-background">
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-brand">
              <div className="header-logo">
                <span
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                  }}
                >
                  🌍
                </span>
              </div>
              <div>
                <h1 className="header-title">WorldExplorer</h1>
                <p className="header-subtitle">
                  Discover the world's knowledge
                </p>
              </div>
            </div>
            <div className="header-actions">
              <SearchBar />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="main-hero">
          <h2 className="main-hero-title">Explore Countries & Cultures</h2>
          <p className="main-hero-description">
            Click on any country to discover its history, landmarks, cities, and
            more
          </p>
        </div>

        <StatsOverview />

        <div className="section">
          <QuickNavigation />
        </div>

        <div className="sections-container">
          <div className="section">
            <HistoricalMapSlider />
          </div>

          <div className="section">
            <RandomFactGenerator />
          </div>

          <div className="section">
            <CultureLifestyle />
          </div>

          <div className="section">
            <NatureExplorer />
          </div>

          <div className="section">
            <GlobalRankings />
          </div>

          <div className="section">
            <LanguageExplorer />
          </div>

          <div className="section">
            <div className="grid-layout grid-2">
              <QuizSystem />
              <CurrencyConverter />
            </div>
          </div>

          <div className="section">
            <WeatherWidget />
          </div>

          <div className="section">
            <div className="grid-layout grid-2">
              <InteractiveGames />
              <EnvironmentDashboard />
            </div>
          </div>
        </div>
      </main>

      <div>
        <Footer />
      </div>
    </div>
  );
}
