import { WorldMap } from "@/components/world-map"
import { SearchBar } from "@/components/search-bar"
import { StatsOverview } from "@/components/stats-overview"
import { QuickNavigation } from "@/components/quick-navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { QuizSystem } from "@/components/quiz-system"
import { CurrencyConverter } from "@/components/currency-converter"
import { WeatherWidget } from "@/components/weather-widget"
import { GlobalRankings } from "@/components/global-rankings"
import { InteractiveGames } from "@/components/interactive-games"
import { EnvironmentDashboard } from "@/components/environment-dashboard"
import { LanguageExplorer } from "@/components/language-explorer"
import { CultureLifestyle } from "@/components/culture-lifestyle"
import { HistoricalMapSlider } from "@/components/historical-map-slider"
import { NatureExplorer } from "@/components/nature-explorer"
import { UserEngagement } from "@/components/user-engagement"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌍</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">WorldExplorer</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Discover the world's knowledge</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <SearchBar />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Explore Countries & Cultures</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Click on any country to discover its history, landmarks, cities, and more
          </p>
        </div>

        <StatsOverview />

        <div className="mt-8">
          <QuickNavigation />
        </div>

        <div className="mt-8">
          <WorldMap />
        </div>

        <div className="mt-8 space-y-8">
          <HistoricalMapSlider />

          <CultureLifestyle />

          <NatureExplorer />

          <UserEngagement />

          <GlobalRankings />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <InteractiveGames />
            <EnvironmentDashboard />
          </div>

          <LanguageExplorer />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <QuizSystem />
            <CurrencyConverter />
          </div>

          <div className="grid grid-cols-1 gap-8">
            <WeatherWidget />
          </div>
        </div>
      </main>
    </div>
  )
}
