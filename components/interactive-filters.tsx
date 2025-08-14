"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, SortAsc, SortDesc } from "lucide-react"

interface FilterOptions {
  search: string
  region: string
  sortBy: string
  sortOrder: "asc" | "desc"
}

interface InteractiveFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void
  regions: string[]
  sortOptions: { value: string; label: string }[]
}

export function InteractiveFilters({ onFiltersChange, regions, sortOptions }: InteractiveFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    region: "all", // Updated default value
    sortBy: "default", // Updated default value
    sortOrder: "asc",
  })

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const clearFilters = () => {
    const cleared = { search: "", region: "all", sortBy: "default", sortOrder: "asc" as const } // Updated default values
    setFilters(cleared)
    onFiltersChange(cleared)
  }

  return (
    <Card className="p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-4 h-4 text-gray-600" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Filters & Search</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search countries, cities, landmarks..."
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
            className="pl-10"
          />
        </div>

        <Select value={filters.region} onValueChange={(value) => updateFilters({ region: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Select region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}
            disabled={!filters.sortBy || filters.sortBy === "default"}
          >
            {filters.sortOrder === "asc" ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
          </Button>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear
          </Button>
        </div>
      </div>

      {(filters.search || filters.region !== "all" || filters.sortBy !== "default") && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
          {filters.search && <Badge variant="secondary">Search: {filters.search}</Badge>}
          {filters.region !== "all" && <Badge variant="secondary">Region: {filters.region}</Badge>}
          {filters.sortBy !== "default" && (
            <Badge variant="secondary">
              Sort: {sortOptions.find((opt) => opt.value === filters.sortBy)?.label} ({filters.sortOrder})
            </Badge>
          )}
        </div>
      )}
    </Card>
  )
}
