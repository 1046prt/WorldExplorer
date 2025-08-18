"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Country } from "@/lib/types";

interface SearchResult {
  type: "country" | "landmark" | "institution" | "river" | "city";
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          // Load sample countries for search (in real app, this would be from API)
          const sampleCountries: Country[] = [];
          // This would normally fetch from your data source

          const searchResults: SearchResult[] = [];

          // Add hardcoded search results for demo
          if (
            query.toLowerCase().includes("us") ||
            query.toLowerCase().includes("united states")
          ) {
            searchResults.push({
              type: "country",
              title: "United States",
              subtitle: "North America • Washington, D.C.",
              url: "/country/us",
              badge: "US",
            });
          }

          if (
            query.toLowerCase().includes("fr") ||
            query.toLowerCase().includes("france")
          ) {
            searchResults.push({
              type: "country",
              title: "France",
              subtitle: "Europe • Paris",
              url: "/country/fr",
              badge: "FR",
            });
          }

          if (
            query.toLowerCase().includes("cn") ||
            query.toLowerCase().includes("china")
          ) {
            searchResults.push({
              type: "country",
              title: "China",
              subtitle: "Asia • Beijing",
              url: "/country/cn",
              badge: "CN",
            });
          }

          if (
            query.toLowerCase().includes("eiffel") ||
            query.toLowerCase().includes("tower")
          ) {
            searchResults.push({
              type: "landmark",
              title: "Eiffel Tower",
              subtitle: "Paris, France • Iconic iron lattice tower",
              url: "/country/fr#landmarks",
              badge: "Landmark",
            });
          }

          if (
            query.toLowerCase().includes("statue") ||
            query.toLowerCase().includes("liberty")
          ) {
            searchResults.push({
              type: "landmark",
              title: "Statue of Liberty",
              subtitle: "New York City, USA • Symbol of freedom",
              url: "/country/us#landmarks",
              badge: "Landmark",
            });
          }

          if (
            query.toLowerCase().includes("harvard") ||
            query.toLowerCase().includes("university")
          ) {
            searchResults.push({
              type: "institution",
              title: "Harvard University",
              subtitle: "Cambridge, Massachusetts • Rank #1",
              url: "/country/us#institutions",
              badge: "University",
            });
          }

          if (
            query.toLowerCase().includes("paris") ||
            query.toLowerCase().includes("city")
          ) {
            searchResults.push({
              type: "city",
              title: "Paris",
              subtitle:
                "France • City of Light, global center of art and culture",
              url: "/country/fr#cities",
              badge: "City",
            });
          }

          if (
            query.toLowerCase().includes("mississippi") ||
            query.toLowerCase().includes("river")
          ) {
            searchResults.push({
              type: "river",
              title: "Mississippi River",
              subtitle: "United States • 3,734 km long",
              url: "/country/us#rivers",
              badge: "River",
            });
          }

          setResults(searchResults.slice(0, 8)); // Limit to 8 results
          setIsOpen(searchResults.length > 0);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const handleResultClick = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "country":
        return "🌍";
      case "landmark":
        return "🏛️";
      case "institution":
        return "🎓";
      case "river":
        return "🌊";
      case "city":
        return "🏙️";
      default:
        return "📍";
    }
  };

  return (
    <div ref={searchRef} className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="search-input-wrapper">
          <Search className="search-input-icon" />
          <input
            type="text"
            placeholder="Search countries, cities, landmarks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => results.length > 0 && setIsOpen(true)}
            className={`input search-input ${query ? "has-clear" : ""}`}
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="search-clear-button"
            >
              <X />
            </button>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!query.trim()}
        >
          Search
        </button>
      </form>

      {isOpen && (
        <div className="card search-results">
          {isLoading ? (
            <div className="search-loading">
              <div className="spinner"></div>
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div className="search-results-list">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.url)}
                  className="search-result-item"
                >
                  <div className="search-result-content">
                    <span className="search-result-icon">
                      {getResultIcon(result.type)}
                    </span>
                    <div className="search-result-text">
                      <div className="search-result-header">
                        <h4 className="search-result-title">{result.title}</h4>
                        {result.badge && (
                          <span className="search-result-badge">
                            {result.badge}
                          </span>
                        )}
                      </div>
                      <p className="search-result-subtitle">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
              <div className="search-results-footer">
                <button
                  onClick={() =>
                    handleSearch({
                      preventDefault: () => {},
                    } as React.FormEvent)
                  }
                  className="btn btn-ghost search-see-all-button"
                >
                  <Search />
                  See all results for "{query}"
                </button>
              </div>
            </div>
          ) : query.length >= 2 ? (
            <div className="search-no-results">
              No results found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
