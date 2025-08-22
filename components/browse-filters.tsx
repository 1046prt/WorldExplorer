"use client";

import React from "react";
import { Search, Filter } from "lucide-react";

interface BrowseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  filterValue: string;
  onFilterChange: (value: string) => void;
  filterOptions: string[];
  filterLabel?: string;
}

export function BrowseFilters({
  searchTerm,
  onSearchChange,
  searchPlaceholder,
  filterValue,
  onFilterChange,
  filterOptions,
  filterLabel = "Filter",
}: BrowseFiltersProps) {
  return (
    <section className="section">
      <div className="countries-filters">
        <div className="filter-input-wrapper">
          <Search className="filter-input-icon" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input filter-input"
          />
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
