"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Waves, MapPin, Ruler, Globe } from "lucide-react";
import "/styles/globals.css"
interface River {
  id: string;
  name: string;
  countries: string[];
  length: string;
  continent: string;
  source: string;
  mouth: string;
  description: string;
  flags: string[];
}

const rivers: River[] = [
  {
    id: "nile",
    name: "Nile River",
    countries: ["Egypt", "Sudan", "Uganda", "Ethiopia"],
    length: "6,650 km",
    continent: "Africa",
    source: "Lake Victoria",
    mouth: "Mediterranean Sea",
    description: "World's longest river, cradle of ancient civilization",
    flags: ["🇪🇬", "🇸🇩", "🇺🇬", "🇪🇹"],
  },
  {
    id: "amazon",
    name: "Amazon River",
    countries: ["Brazil", "Peru", "Colombia"],
    length: "6,400 km",
    continent: "South America",
    source: "Peruvian Andes",
    mouth: "Atlantic Ocean",
    description: "Largest river by discharge volume, heart of the rainforest",
    flags: ["🇧🇷", "🇵🇪", "🇨🇴"],
  },
  {
    id: "yangtze",
    name: "Yangtze River",
    countries: ["China"],
    length: "6,300 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "East China Sea",
    description: "Longest river in Asia, China's golden waterway",
    flags: ["🇨🇳"],
  },
  {
    id: "mississippi",
    name: "Mississippi River",
    countries: ["United States"],
    length: "3,730 km",
    continent: "North America",
    source: "Lake Itasca",
    mouth: "Gulf of Mexico",
    description: "Major North American river system",
    flags: ["🇺🇸"],
  },
  {
    id: "yenisei",
    name: "Yenisei River",
    countries: ["Russia", "Mongolia"],
    length: "3,487 km",
    continent: "Asia",
    source: "Mongolia",
    mouth: "Kara Sea",
    description: "Central Siberian river system",
    flags: ["🇷🇺", "🇲🇳"],
  },
  {
    id: "yellow",
    name: "Yellow River",
    countries: ["China"],
    length: "5,464 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "Bohai Sea",
    description: "Cradle of Chinese civilization",
    flags: ["🇨🇳"],
  },
  {
    id: "ob",
    name: "Ob River",
    countries: ["Russia"],
    length: "3,650 km",
    continent: "Asia",
    source: "Altai Mountains",
    mouth: "Kara Sea",
    description: "Major Siberian river",
    flags: ["🇷🇺"],
  },
  {
    id: "parana",
    name: "Paraná River",
    countries: ["Brazil", "Paraguay", "Argentina"],
    length: "4,880 km",
    continent: "South America",
    source: "Brazil",
    mouth: "Río de la Plata",
    description: "Second longest river in South America",
    flags: ["🇧🇷", "🇵🇾", "🇦🇷"],
  },
  {
    id: "congo",
    name: "Congo River",
    countries: ["DR Congo", "Central African Republic", "Angola"],
    length: "4,700 km",
    continent: "Africa",
    source: "East African Rift",
    mouth: "Atlantic Ocean",
    description: "Deepest river in the world",
    flags: ["🇨🇩", "🇨🇫", "🇦🇴"],
  },
  {
    id: "amur",
    name: "Amur River",
    countries: ["Russia", "China"],
    length: "2,824 km",
    continent: "Asia",
    source: "Mongolia",
    mouth: "Sea of Okhotsk",
    description: "Border river between Russia and China",
    flags: ["🇷🇺", "🇨🇳"],
  },
  {
    id: "lena",
    name: "Lena River",
    countries: ["Russia"],
    length: "4,400 km",
    continent: "Asia",
    source: "Baikal Mountains",
    mouth: "Laptev Sea",
    description: "Easternmost of the three great Siberian rivers",
    flags: ["🇷🇺"],
  },
  {
    id: "mekong",
    name: "Mekong River",
    countries: ["China", "Myanmar", "Laos", "Thailand", "Cambodia", "Vietnam"],
    length: "4,350 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "South China Sea",
    description: "Lifeline of Southeast Asia",
    flags: ["🇨🇳", "🇲🇲", "🇱🇦", "🇹🇭", "🇰🇭", "🇻🇳"],
  },
  {
    id: "mackenzie",
    name: "Mackenzie River",
    countries: ["Canada"],
    length: "4,241 km",
    continent: "North America",
    source: "Great Slave Lake",
    mouth: "Beaufort Sea",
    description: "Longest river system in Canada",
    flags: ["🇨🇦"],
  },
  {
    id: "niger",
    name: "Niger River",
    countries: ["Guinea", "Mali", "Niger", "Nigeria"],
    length: "4,180 km",
    continent: "Africa",
    source: "Guinea Highlands",
    mouth: "Gulf of Guinea",
    description: "Principal river of western Africa",
    flags: ["🇬🇳", "🇲🇱", "🇳🇪", "🇳🇬"],
  },
  {
    id: "brahmaputra",
    name: "Brahmaputra River",
    countries: ["China", "India", "Bangladesh"],
    length: "3,848 km",
    continent: "Asia",
    source: "Tibetan Plateau",
    mouth: "Bay of Bengal",
    description: "Trans-boundary river of Asia",
    flags: ["🇨🇳", "🇮🇳", "🇧🇩"],
  },
];

export default function RiversPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");

  const continents = [
    "All",
    "Africa",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Oceania",
  ];

  const filteredRivers = rivers.filter((river) => {
    const matchesSearch =
      river.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      river.countries.some((country) =>
        country.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesContinent =
      selectedContinent === "All" || river.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="page-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Waves className="w-8 h-8 text-cyan-600" />
            Major Rivers of the World
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the world's most important river systems and waterways
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search rivers or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {continents.map((continent) => (
                <option key={continent} value={continent}>
                  {continent}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRivers.map((river) => (
            <div
              key={river.id}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {river.flags.slice(0, 3).map((flag, index) => (
                      <span key={index} className="text-xl">
                        {flag}
                      </span>
                    ))}
                    {river.flags.length > 3 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        +{river.flags.length - 3}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {river.continent}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{river.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {river.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4" />
                    <span>{river.length}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {river.source} → {river.mouth}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{river.countries.join(", ")}</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-1">
                  {river.countries.slice(0, 2).map((country, index) => (
                    <Link
                      key={index}
                      href={`/search?q=${encodeURIComponent(country)}`}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline bg-cyan-50 dark:bg-cyan-900/20 px-2 py-1 rounded"
                    >
                      {country}
                    </Link>
                  ))}
                  {river.countries.length > 2 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                      +{river.countries.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRivers.length === 0 && (
          <div className="text-center py-12">
            <Waves className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No rivers found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
