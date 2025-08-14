"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import type { Country } from "@/lib/types"

interface SearchResult {
  type: "country" | "landmark" | "institution" | "river" | "city"
  title: string
  subtitle: string
  url: string
  badge?: string
}

export function SearchBar() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        try {
          // Load sample countries for search (in real app, this would be from API)
          const sampleCountries: Country[] = []
          // This would normally fetch from your data source

          const searchResults: SearchResult[] = []

          // Add hardcoded search results for demo
          if (query.toLowerCase().includes("us") || query.toLowerCase().includes("united states")) {
            searchResults.push({
              type: "country",
              title: "United States",
              subtitle: "North America • Washington, D.C.",
              url: "/country/us",
              badge: "US",
            })
          }

          if (query.toLowerCase().includes("fr") || query.toLowerCase().includes("france")) {
            searchResults.push({
              type: "country",
              title: "France",
              subtitle: "Europe • Paris",
              url: "/country/fr",
              badge: "FR",
            })
          }

          if (query.toLowerCase().includes("cn") || query.toLowerCase().includes("china")) {
            searchResults.push({
              type: "country",
              title: "China",
              subtitle: "Asia • Beijing",
              url: "/country/cn",
              badge: "CN",
            })
          }

          if (query.toLowerCase().includes("eiffel") || query.toLowerCase().includes("tower")) {
            searchResults.push({
              type: "landmark",
              title: "Eiffel Tower",
              subtitle: "Paris, France • Iconic iron lattice tower",
              url: "/country/fr#landmarks",
              badge: "Landmark",
            })
          }

          if (query.toLowerCase().includes("statue") || query.toLowerCase().includes("liberty")) {
            searchResults.push({
              type: "landmark",
              title: "Statue of Liberty",
              subtitle: "New York City, USA • Symbol of freedom",
              url: "/country/us#landmarks",
              badge: "Landmark",
            })
          }

          if (query.toLowerCase().includes("harvard") || query.toLowerCase().includes("university")) {
            searchResults.push({
              type: "institution",
              title: "Harvard University",
              subtitle: "Cambridge, Massachusetts • Rank #1",
              url: "/country/us#institutions",
              badge: "University",
            })
          }

          if (query.toLowerCase().includes("paris") || query.toLowerCase().includes("city")) {
            searchResults.push({
              type: "city",
              title: "Paris",
              subtitle: "France • City of Light, global center of art and culture",
              url: "/country/fr#cities",
              badge: "City",
            })
          }

          if (query.toLowerCase().includes("mississippi") || query.toLowerCase().includes("river")) {
            searchResults.push({
              type: "river",
              title: "Mississippi River",
              subtitle: "United States • 3,734 km long",
              url: "/country/us#rivers",
              badge: "River",
            })
          }

          setResults(searchResults.slice(0, 8)) // Limit to 8 results
          setIsOpen(searchResults.length > 0)
        } catch (error) {
          console.error("Search error:", error)
          setResults([])
        } finally {
          setIsLoading(false)
        }
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(searchTimeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const handleResultClick = (url: string) => {
    router.push(url)
    setIsOpen(false)
    setQuery("")
  }

  const clearSearch = () => {
    setQuery("")
    setResults([])
    setIsOpen(false)
  }

  const getResultIcon = (type: string) => {
    switch (type) {
      case "country":
        return "🌍"
      case "landmark":
        return "🏛️"
      case "institution":
        return "🎓"
      case "river":
        return "🌊"
      case "city":
        return "🏙️"
      default:
        return "📍"
    }
  }

  return (
    <div ref={searchRef} className="relative">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search countries, cities, landmarks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            className="pl-10 pr-10 w-64"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
        </div>
        <Button type="submit" size="sm" disabled={!query.trim()}>
          Search
        </Button>
      </form>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto bg-white dark:bg-gray-800 shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">
              <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getResultIcon(result.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900 dark:text-white truncate">{result.title}</h4>
                        {result.badge && (
                          <Badge variant="outline" className="text-xs">
                            {result.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{result.subtitle}</p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="px-4 py-2 border-t border-gray-100 dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSearch({ preventDefault: () => {} } as React.FormEvent)}
                  className="w-full justify-start text-blue-600 dark:text-blue-400"
                >
                  <Search className="w-4 h-4 mr-2" />
                  See all results for "{query}"
                </Button>
              </div>
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">No results found for "{query}"</div>
          ) : null}
        </Card>
      )}
    </div>
  )
}
