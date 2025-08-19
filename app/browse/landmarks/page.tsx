"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, MapPin, Calendar, Globe, Star } from "lucide-react";
import "/styles/globals.css"
interface Landmark {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  type: string;
  built: string;
  description: string;
  significance: string;
  visitors: string;
}

const landmarks: Landmark[] = [
  {
    id: "great-wall",
    name: "Great Wall of China",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    type: "Historical",
    built: "7th century BC",
    description: "Ancient fortification system across northern China",
    significance: "UNESCO World Heritage Site",
    visitors: "10M annually",
  },
  {
    id: "eiffel-tower",
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    countryCode: "FR",
    flag: "🇫🇷",
    type: "Architectural",
    built: "1889",
    description: "Iron lattice tower and symbol of France",
    significance: "Cultural icon",
    visitors: "7M annually",
  },
  {
    id: "statue-of-liberty",
    name: "Statue of Liberty",
    city: "New York",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Monument",
    built: "1886",
    description: "Symbol of freedom and democracy",
    significance: "UNESCO World Heritage Site",
    visitors: "4M annually",
  },
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    city: "Cusco",
    country: "Peru",
    countryCode: "PE",
    flag: "🇵🇪",
    type: "Archaeological",
    built: "1450",
    description: "Ancient Incan citadel in the Andes",
    significance: "UNESCO World Heritage Site",
    visitors: "1.5M annually",
  },
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    type: "Mausoleum",
    built: "1653",
    description: "Ivory-white marble mausoleum",
    significance: "UNESCO World Heritage Site",
    visitors: "6M annually",
  },
  {
    id: "colosseum",
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    countryCode: "IT",
    flag: "🇮🇹",
    type: "Amphitheater",
    built: "80 AD",
    description: "Ancient Roman amphitheater",
    significance: "UNESCO World Heritage Site",
    visitors: "6M annually",
  },
  {
    id: "christ-redeemer",
    name: "Christ the Redeemer",
    city: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    flag: "🇧🇷",
    type: "Religious",
    built: "1931",
    description: "Art Deco statue of Jesus Christ",
    significance: "New Seven Wonders",
    visitors: "2M annually",
  },
  {
    id: "petra",
    name: "Petra",
    city: "Ma'an",
    country: "Jordan",
    countryCode: "JO",
    flag: "🇯🇴",
    type: "Archaeological",
    built: "4th century BC",
    description: "Ancient city carved into rock",
    significance: "UNESCO World Heritage Site",
    visitors: "1M annually",
  },
  {
    id: "angkor-wat",
    name: "Angkor Wat",
    city: "Siem Reap",
    country: "Cambodia",
    countryCode: "KH",
    flag: "🇰🇭",
    type: "Temple",
    built: "12th century",
    description: "Largest religious monument in the world",
    significance: "UNESCO World Heritage Site",
    visitors: "2.6M annually",
  },
  {
    id: "sydney-opera",
    name: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    countryCode: "AU",
    flag: "🇦🇺",
    type: "Performing Arts",
    built: "1973",
    description: "Multi-venue performing arts center",
    significance: "UNESCO World Heritage Site",
    visitors: "8.2M annually",
  },
  {
    id: "big-ben",
    name: "Big Ben",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    type: "Clock Tower",
    built: "1859",
    description: "Iconic clock tower of Westminster",
    significance: "Cultural landmark",
    visitors: "15M annually",
  },
  {
    id: "mount-rushmore",
    name: "Mount Rushmore",
    city: "Keystone",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Sculpture",
    built: "1941",
    description: "Presidential faces carved in granite",
    significance: "National memorial",
    visitors: "2M annually",
  },
  {
    id: "neuschwanstein",
    name: "Neuschwanstein Castle",
    city: "Bavaria",
    country: "Germany",
    countryCode: "DE",
    flag: "🇩🇪",
    type: "Castle",
    built: "1886",
    description: "Fairy-tale castle in the Alps",
    significance: "Tourist attraction",
    visitors: "1.4M annually",
  },
  {
    id: "sagrada-familia",
    name: "Sagrada Família",
    city: "Barcelona",
    country: "Spain",
    countryCode: "ES",
    flag: "🇪🇸",
    type: "Basilica",
    built: "1882-ongoing",
    description: "Gaudí's unfinished masterpiece",
    significance: "UNESCO World Heritage Site",
    visitors: "4.7M annually",
  },
  {
    id: "golden-gate",
    name: "Golden Gate Bridge",
    city: "San Francisco",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    type: "Bridge",
    built: "1937",
    description: "Iconic suspension bridge",
    significance: "Engineering marvel",
    visitors: "15M annually",
  },
];

export default function LandmarksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const types = [
    "All",
    "Historical",
    "Architectural",
    "Monument",
    "Archaeological",
    "Religious",
    "Temple",
    "Castle",
    "Bridge",
    "Mausoleum",
    "Amphitheater",
    "Performing Arts",
    "Clock Tower",
    "Sculpture",
    "Basilica",
  ];

  const filteredLandmarks = landmarks.filter((landmark) => {
    const matchesSearch =
      landmark.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landmark.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      landmark.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" || landmark.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="page-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-red-600" />
            World Famous Landmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover iconic landmarks and monuments from around the globe
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search landmarks, cities, or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandmarks.map((landmark) => (
            <div
              key={landmark.id}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{landmark.flag}</span>
                  <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded-full text-xs font-medium">
                    {landmark.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">{landmark.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {landmark.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {landmark.city}, {landmark.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Built: {landmark.built}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{landmark.significance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{landmark.visitors}</span>
                  </div>
                </div>

                <Link
                  href={`/country/${landmark.countryCode.toLowerCase()}`}
                  className="inline-block mt-4 text-red-600 dark:text-red-400 hover:underline text-sm"
                >
                  View Country →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredLandmarks.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No landmarks found
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
