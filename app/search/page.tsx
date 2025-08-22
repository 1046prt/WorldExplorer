"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import "@/styles/search-page.css";
import {
  Search,
  MapPin,
  GraduationCap,
  Building2,
  Waves,
  Globe,
} from "lucide-react";
import Link from "next/link";

interface SearchResult {
  type: "country" | "landmark" | "institution" | "river" | "city";
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge?: string;
  image?: string;
  metadata?: Record<string, string>;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  // Mock search results - in real app, this would come from API
  const mockResults: SearchResult[] = [
    {
      type: "country",
      title: "United States",
      subtitle: "North America",
      description:
        "Federal republic with 50 states, known for its diverse geography and cultural influence.",
      url: "/country/us",
      badge: "US",
      image: "/images/flags/us.png",
      metadata: { capital: "Washington, D.C.", population: "331.9M" },
    },
    {
      type: "country",
      title: "France",
      subtitle: "Europe",
      description:
        "Western European country known for its art, cuisine, and cultural heritage.",
      url: "/country/fr",
      badge: "FR",
      image: "/images/flags/france.png",
      metadata: { capital: "Paris", population: "67.7M" },
    },
    {
      type: "country",
      title: "Japan",
      subtitle: "Asia",
      description:
        "Island nation known for technology, culture, and traditional arts.",
      url: "/country/jp",
      badge: "JP",
      image: "/images/flags/japan.png",
      metadata: { capital: "Tokyo", population: "125.8M" },
    },
    {
      type: "country",
      title: "China",
      subtitle: "Asia",
      description:
        "Most populous country, ancient civilization with rapid modern development.",
      url: "/country/cn",
      badge: "CN",
      image: "/images/flags/cn.png",
      metadata: { capital: "Beijing", population: "1.41B" },
    },
    {
      type: "country",
      title: "India",
      subtitle: "Asia",
      description:
        "Diverse democracy with rich cultural heritage and growing economy.",
      url: "/country/in",
      badge: "IN",
      image: "/images/flags/in.png",
      metadata: { capital: "New Delhi", population: "1.38B" },
    },
    {
      type: "landmark",
      title: "Eiffel Tower",
      subtitle: "Paris, France",
      description:
        "Iconic iron lattice tower and symbol of France, built for the 1889 World's Fair.",
      url: "/country/fr#landmarks",
      badge: "Landmark",
      image: "/images/landmarks/eiffel-tower.png",
      metadata: { height: "330m", built: "1889" },
    },
    {
      type: "landmark",
      title: "Statue of Liberty",
      subtitle: "New York City, USA",
      description: "Symbol of freedom and democracy, gift from France in 1886.",
      url: "/country/us#landmarks",
      badge: "Landmark",
      image: "/images/landmarks/statue-of-liberty.png",
      metadata: { height: "93m", built: "1886" },
    },
    {
      type: "institution",
      title: "Harvard University",
      subtitle: "Cambridge, Massachusetts",
      description:
        "Private Ivy League research university, oldest in the United States.",
      url: "/country/us#institutions",
      badge: "University",
      image: "/images/institutions/harvard.png",
      metadata: { founded: "1636", rank: "#1" },
    },
    {
      type: "city",
      title: "Paris",
      subtitle: "France",
      description:
        "City of Light, global center of art, fashion, gastronomy, and culture.",
      url: "/country/fr#cities",
      badge: "City",
      image: "/images/cities/paris.png",
      metadata: { population: "2.1M", region: "Île-de-France" },
    },
    {
      type: "river",
      title: "Mississippi River",
      subtitle: "United States",
      description:
        "Major river system in North America, flowing from Minnesota to the Gulf of Mexico.",
      url: "/country/us#rivers",
      badge: "River",
      image: "/images/rivers/mississippi.png",
      metadata: { length: "3,734 km", source: "Lake Itasca" },
    },
  ];

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        const filtered = mockResults.filter(
          (result) =>
            result.title.toLowerCase().includes(query.toLowerCase()) ||
            result.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            result.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
        setIsLoading(false);
      }, 500);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    if (selectedType === "all") {
      setFilteredResults(results);
    } else {
      setFilteredResults(
        results.filter((result) => result.type === selectedType)
      );
    }
  }, [results, selectedType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "country":
        return <Globe className="w-4 h-4" />;
      case "landmark":
        return <MapPin className="w-4 h-4" />;
      case "institution":
        return <GraduationCap className="w-4 h-4" />;
      case "river":
        return <Waves className="w-4 h-4" />;
      case "city":
        return <Building2 className="w-4 h-4" />;
      default:
        return <Search className="w-4 h-4" />;
    }
  };

  return (
    <div className="page-wrapper page-background">
      <GlobalNavigation
        showBackButton={true}
        backHref="/"
        currentPage="search"
      />

      <div className="page-content">
        <main className="main">
          <div className="sections-container">
            <BrowseFilters
              searchTerm={query}
              onSearchChange={setQuery}
              searchPlaceholder="Search countries, cities, landmarks..."
              filterValue={selectedType}
              onFilterChange={setSelectedType}
              filterOptions={[
                "all",
                "country",
                "landmark",
                "institution",
                "city",
                "river",
              ]}
              filterLabel="Filter by type"
            />
            {query && (
              <section className="section">
                <div className="search-results-header">
                  <h2 className="search-results-title">
                    Search Results for "{query}"
                  </h2>
                  <p className="search-results-subtitle">
                    {isLoading
                      ? "Searching..."
                      : `${filteredResults.length} results found`}
                    {selectedType !== "all" && ` in ${selectedType}s`}
                  </p>
                </div>
              </section>
            )}

            {isLoading ? (
              <section className="section">
                <div className="search-loading">
                  <div className="search-spinner"></div>
                </div>
              </section>
            ) : filteredResults.length > 0 ? (
              <section className="section">
                <div className="search-results-grid">
                  {filteredResults.map((result, index) => (
                    <Link
                      key={index}
                      href={result.url}
                      className="search-result-card"
                    >
                      <div className="search-result-header">
                        <div className={`search-result-icon ${result.type}`}>
                          {getTypeIcon(result.type)}
                        </div>
                        <span className="search-result-badge">
                          {result.badge || result.type}
                        </span>
                      </div>
                      <h3 className="search-result-title">{result.title}</h3>
                      <p className="search-result-subtitle">
                        {result.subtitle}
                      </p>
                      <p className="search-result-description">
                        {result.description}
                      </p>

                      {result.metadata && (
                        <div className="search-result-metadata">
                          {Object.entries(result.metadata).map(
                            ([key, value]) => (
                              <span
                                key={key}
                                className="search-result-meta-item"
                              >
                                {key}: {value}
                              </span>
                            )
                          )}
                        </div>
                      )}
                    </Link>
                  ))}
                </div>
              </section>
            ) : query && !isLoading ? (
              <section className="section">
                <div className="empty-state">
                  <div className="empty-state-emoji">🔍</div>
                  <h3 className="empty-state-title">No results found</h3>
                  <p className="empty-state-description">
                    Try searching for countries, landmarks, cities, or
                    universities
                  </p>
                  <button
                    onClick={() => setQuery("")}
                    className="btn btn-outline"
                  >
                    Clear search
                  </button>
                </div>
              </section>
            ) : (
              <section className="section">
                <div className="empty-state">
                  <div className="empty-state-emoji">🌍</div>
                  <h3 className="empty-state-title">Start exploring</h3>
                  <p className="empty-state-description">
                    Search for countries, landmarks, cities, universities, and
                    more
                  </p>
                </div>
              </section>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="page-wrapper page-background">
          <div className="search-loading">
            <div className="search-spinner"></div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
