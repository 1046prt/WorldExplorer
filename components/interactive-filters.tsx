"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-4 w-4" />
        <h3 className="font-semibold">Filters</h3>
        {hasActiveFilters && (
          <Badge variant="secondary" className="ml-auto">
            Active
          </Badge>
        )}
      </div>

      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        {/* Region Filter */}
        <div>
          <label className="text-sm font-medium mb-2 block">Region</label>
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
        <div>
          <label className="text-sm font-medium mb-2 block">Sort by</label>
          <div className="flex gap-2">
            <Select
              value={filters.sortBy}
              onValueChange={(value) => updateFilters({ sortBy: value })}
            >
              <SelectTrigger className="flex-1">
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
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" onClick={clearFilters} className="w-full">
            Clear Filters
          </Button>
        )}
      </div>
    </Card>
  );
}
