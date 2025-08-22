"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import "@/styles/interactive-filters.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";

interface FilterOptions {
  search: string;
  region: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
}

interface InteractiveFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  regions: string[];
  sortOptions: { value: string; label: string }[];
}

export function InteractiveFilters({
  onFiltersChange,
  regions,
  sortOptions,
}: InteractiveFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    region: "",
    sortBy: "",
    sortOrder: "asc",
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      search: "",
      region: "",
      sortBy: "",
      sortOrder: "asc",
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = filters.search || filters.region || filters.sortBy;

  return (
    <Card className="interactive-filters">
      <div className="filters-header">
        <Filter className="icon small" />
        <h3 className="filters-title">Filters</h3>
        {hasActiveFilters && (
          <Badge variant="secondary" className="filters-badge">
            Active
          </Badge>
        )}
      </div>

      <div className="filters-body">
        {/* Search Input */}
        <div className="search-wrapper">
          <Search className="icon search-icon" />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="search-input"
          />
        </div>

        {/* Region Filter */}
        <div className="filter-group">
          <label className="filter-label">Region</label>
          <Select
            value={filters.region}
            onValueChange={(value) => updateFilters({ region: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="All regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All regions</SelectItem>
              {regions.map((region) => (
                <SelectItem key={region} value={region}>
                  {region}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="filter-group">
          <label className="filter-label">Sort by</label>
          <div className="sort-controls">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              <SelectTrigger className="sort-select">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                updateFilters({
                  sortOrder: filters.sortOrder === "asc" ? "desc" : "asc",
                })
              }
              disabled={!filters.sortBy}
            >
              {filters.sortOrder === "asc" ? (
                <SortAsc className="icon small" />
              ) : (
                <SortDesc className="icon small" />
              )}
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="clear-btn">
            Clear Filters
          </Button>
        )}
      </div>
    </Card>
  );
}
