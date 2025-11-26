"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchService, type SearchResult } from "@/lib/search-service";
import "@/styles/global-search.css";

interface GlobalSearchProps {
  className?: string;
  placeholder?: string;
  showFullResults?: boolean;
}

export function GlobalSearch({
  className = "",
  placeholder = "Search...",
  showFullResults = false,
}: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const debouncedQuery = useDebounce(query, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery && debouncedQuery.length >= 2) {
        setIsLoading(true);
        try {
          // Use enhanced search that includes API data
          const searchResults = await SearchService.searchEnhanced(
            debouncedQuery,
            "all",
            true
          );
          setResults(
            showFullResults ? searchResults : searchResults.slice(0, 8)
          );
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
  }, [debouncedQuery, showFullResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        resultsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(true);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          const selectedResult = results[selectedIndex];
          router.push(selectedResult.url);
          setIsOpen(false);
          setQuery("");
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          setIsOpen(false);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleResultClick = (result: SearchResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery("");
  };

  const handleSeeAllResults = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const getTypeIcon = (type: string) => {
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
      case "state":
        return "🗺️";
      default:
        return "📍";
    }
  };

  return (
    <div className={`global-search ${className}`}>
      <div className="search-input-wrapper">
        <Search className="search-input-icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="search-input"
          autoComplete="off"
        />
      </div>

      {isOpen && (query.length >= 2 || results.length > 0) && (
        <div ref={resultsRef} className="search-results">
          {isLoading ? (
            <div className="search-loading">
              <div className="spinner"></div>
              <span>Searching...</span>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="search-results-list">
                {results.map((result, index) => (
                  <button
                    key={`${result.type}-${result.title}-${index}`}
                    className={`search-result-item ${
                      index === selectedIndex ? "selected" : ""
                    }`}
                    onClick={() => handleResultClick(result)}
                    onMouseEnter={() => setSelectedIndex(index)}
                  >
                    <div className="search-result-content">
                      <span className="search-result-icon">
                        {getTypeIcon(result.type)}
                      </span>
                      <div className="search-result-text">
                        <div className="search-result-header">
                          <span className="search-result-title">
                            {result.title}
                          </span>
                          <span className="search-result-badge">
                            {result.badge || result.type}
                          </span>
                        </div>
                        <span className="search-result-subtitle">
                          {result.subtitle}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {!showFullResults && query.trim() && (
                <div className="search-results-footer">
                  <button
                    className="search-see-all-button btn btn-ghost"
                    onClick={handleSeeAllResults}
                  >
                    <span>See all results for &quot;{query}&quot;</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : query.length >= 2 ? (
            <div className="search-no-results">
              <span>No results found for &quot;{query}&quot;</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
