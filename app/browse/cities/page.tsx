"use client";

import React, { useState } from "react";
import Link from "next/link";
import "/app/globals.css";
import { Search, Filter, Building2, Users, MapPin, Globe } from "lucide-react";

interface City {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  population: string;
  region: string;
  flag: string;
  description: string;
}

const cities: City[] = [
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    countryCode: "JP",
    population: "37.4M",
    region: "Asia",
    flag: "🇯🇵",
    description: "World's largest metropolitan area",
  },
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    countryCode: "IN",
    population: "32.9M",
    region: "Asia",
    flag: "🇮🇳",
    description: "Historic capital of India",
  },
  {
    id: "shanghai",
    name: "Shanghai",
    country: "China",
    countryCode: "CN",
    population: "28.5M",
    region: "Asia",
    flag: "🇨🇳",
    description: "China's financial hub",
  },
  {
    id: "dhaka",
    name: "Dhaka",
    country: "Bangladesh",
    countryCode: "BD",
    population: "22.5M",
    region: "Asia",
    flag: "🇧🇩",
    description: "Capital of Bangladesh",
  },
  {
    id: "sao-paulo",
    name: "São Paulo",
    country: "Brazil",
    countryCode: "BR",
    population: "22.4M",
    region: "South America",
    flag: "🇧🇷",
    description: "Brazil's economic powerhouse",
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    countryCode: "EG",
    population: "21.3M",
    region: "Africa",
    flag: "🇪🇬",
    description: "City of a thousand minarets",
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    countryCode: "MX",
    population: "21.9M",
    region: "North America",
    flag: "🇲🇽",
    description: "Historic Aztec capital",
  },
  {
    id: "beijing",
    name: "Beijing",
    country: "China",
    countryCode: "CN",
    population: "21.5M",
    region: "Asia",
    flag: "🇨🇳",
    description: "China's political center",
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    countryCode: "IN",
    population: "20.4M",
    region: "Asia",
    flag: "🇮🇳",
    description: "Bollywood capital",
  },
  {
    id: "osaka",
    name: "Osaka",
    country: "Japan",
    countryCode: "JP",
    population: "18.9M",
    region: "Asia",
    flag: "🇯🇵",
    description: "Japan's kitchen",
  },
  {
    id: "new-york",
    name: "New York",
    country: "United States",
    countryCode: "US",
    population: "18.8M",
    region: "North America",
    flag: "🇺🇸",
    description: "The Big Apple",
  },
  {
    id: "karachi",
    name: "Karachi",
    country: "Pakistan",
    countryCode: "PK",
    population: "16.1M",
    region: "Asia",
    flag: "🇵🇰",
    description: "Pakistan's largest city",
  },
  {
    id: "chongqing",
    name: "Chongqing",
    country: "China",
    countryCode: "CN",
    population: "15.9M",
    region: "Asia",
    flag: "🇨🇳",
    description: "Mountain city",
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    countryCode: "TR",
    population: "15.5M",
    region: "Europe",
    flag: "🇹🇷",
    description: "Bridge between continents",
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    countryCode: "AR",
    population: "15.2M",
    region: "South America",
    flag: "🇦🇷",
    description: "Paris of South America",
  },
  {
    id: "kolkata",
    name: "Kolkata",
    country: "India",
    countryCode: "IN",
    population: "14.9M",
    region: "Asia",
    flag: "🇮🇳",
    description: "Cultural capital of India",
  },
  {
    id: "lagos",
    name: "Lagos",
    country: "Nigeria",
    countryCode: "NG",
    population: "14.8M",
    region: "Africa",
    flag: "🇳🇬",
    description: "Nigeria's commercial hub",
  },
  {
    id: "kinshasa",
    name: "Kinshasa",
    country: "DR Congo",
    countryCode: "CD",
    population: "14.3M",
    region: "Africa",
    flag: "🇨🇩",
    description: "Heart of Africa",
  },
  {
    id: "manila",
    name: "Manila",
    country: "Philippines",
    countryCode: "PH",
    population: "13.9M",
    region: "Asia",
    flag: "🇵🇭",
    description: "Pearl of the Orient",
  },
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    countryCode: "BR",
    population: "13.3M",
    region: "South America",
    flag: "🇧🇷",
    description: "Marvelous city",
  },
];

export default function CitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");

  const regions = [
    "All",
    "Asia",
    "Europe",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredCities = cities.filter((city) => {
    const matchesSearch =
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || city.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="page-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-green-600" />
            Major Cities of the World
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Discover the world's most populous and influential cities
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search cities or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCities.map((city) => (
            <div
              key={city.id}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{city.flag}</span>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {city.country}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                      {city.countryCode}
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {city.description}
                </p>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{city.population}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{city.region}</span>
                  </div>
                </div>
                <Link
                  href={`/country/${city.countryCode.toLowerCase()}`}
                  className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  View Country →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No cities found
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
