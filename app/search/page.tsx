"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import "/app/globals.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  MapPin,
  GraduationCap,
  Building2,
  Waves,
  Globe,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      image: "/images/flags/fr.png",
      metadata: { capital: "Paris", population: "67.7M" },
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "country":
        return "text-blue-600";
      case "landmark":
        return "text-red-600";
      case "institution":
        return "text-purple-600";
      case "river":
        return "text-cyan-600";
      case "city":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌍</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  WorldExplorer
                </h1>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search countries, cities, landmarks..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="country">Countries</SelectItem>
                <SelectItem value="landmark">Landmarks</SelectItem>
                <SelectItem value="institution">Universities</SelectItem>
                <SelectItem value="city">Cities</SelectItem>
                <SelectItem value="river">Rivers</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {query && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Search Results for "{query}"
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {isLoading
                ? "Searching..."
                : `${filteredResults.length} results found`}
              {selectedType !== "all" && ` in ${selectedType}s`}
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
          </div>
        ) : filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResults.map((result, index) => (
              <Link key={index} href={result.url}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                  {result.image && (
                    <div className="aspect-video relative">
                      <Image
                        src={result.image || "/placeholder.svg"}
                        alt={result.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={getTypeColor(result.type)}>
                        {getTypeIcon(result.type)}
                      </div>
                      <Badge variant="outline">
                        {result.badge || result.type}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {result.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {result.subtitle}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-3">
                      {result.description}
                    </p>

                    {result.metadata && (
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(result.metadata).map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="text-xs"
                          >
                            {key}: {value}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        ) : query && !isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try searching for countries, landmarks, cities, or universities
            </p>
            <Button onClick={() => setQuery("")} variant="outline">
              Clear search
            </Button>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start exploring
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Search for countries, landmarks, cities, universities, and more
            </p>
          </div>
        )}
      </main>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
