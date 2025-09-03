"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GlobalNavigation } from "@/components/global-navigation";
import { BrowseFilters } from "@/components/browse-filters";
import Footer from "@/components/footer";
import "@/styles/search-page.css";
import "@/styles/search-bar.css";
import {
  Search,
  MapPin,
  GraduationCap,
  Building2,
  Waves,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchService, type SearchResult } from "@/lib/search-service";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [selectedType, setSelectedType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery && debouncedQuery.length >= 2) {
        setIsLoading(true);
        try {
          const searchResults = await SearchService.search(
            debouncedQuery,
            selectedType
          );
          setResults(searchResults);
        } catch (error) {
          console.error("Search error:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, selectedType]);

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
              searchPlaceholder="Search..."
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
              showSuggestions={false}
            />
            {query && (
              <section className="section">
                <div className="search-results-header">
                  <h2 className="search-results-title">
                    Search Results for &quot;{query}&quot;
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
