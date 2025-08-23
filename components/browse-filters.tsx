"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchService } from "@/lib/search-service";

interface BrowseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: string[];
  filterLabel?: string;
  showSuggestions?: boolean;
}

export function BrowseFilters({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  filterOptions,
  filterLabel = "Filter",
  showSuggestions = true,
}: BrowseFiltersProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestionsList, setShowSuggestionsList] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      debouncedSearchTerm &&
      debouncedSearchTerm.length >= 2 &&
      showSuggestions
    ) {
      const fetchSuggestions = async () => {
        try {
          const newSuggestions =
            SearchService.getSearchSuggestions(debouncedSearchTerm);
          setSuggestions(newSuggestions);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      };
      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm, showSuggestions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        suggestionsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestionsList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (value: string) => {
    onSearchChange(value);
    setShowSuggestionsList(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setShowSuggestionsList(false);
    inputRef.current?.blur();
  };

  const clearSearch = () => {
    onSearchChange("");
    setShowSuggestionsList(false);
    inputRef.current?.focus();
  };

  const handleInputFocus = () => {
    setInputFocused(true);
    if (suggestions.length > 0) {
      setShowSuggestionsList(true);
    }
  };

  const handleInputBlur = () => {
    setInputFocused(false);
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      if (!inputFocused) {
        setShowSuggestionsList(false);
      }
    }, 200);
  };

  return (
    <section className="section">
      <div className="countries-filters">
        <div className="filter-input-wrapper">
          <Search className="filter-input-icon" />
          <input
            ref={inputRef}
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="input filter-input"
            autoComplete="off"
          />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="filter-clear-button"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {showSuggestionsList && suggestions.length > 0 && (
            <div ref={suggestionsRef} className="search-suggestions">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="search-suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span>{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="filter-select-wrapper">
          <Filter className="filter-select-icon" />
          <select
            value={filterValue}
            onChange={(e) => onFilterChange(e.target.value)}
            className="input filter-select"
            aria-label={filterLabel}
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all"
                  ? "All Types"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
