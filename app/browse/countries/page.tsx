"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, Globe, Users, MapPin } from "lucide-react";

interface Country {
  code: string;
  name: string;
  capital: string;
  population: string;
  region: string;
  flag: string;
}

const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    capital: "Washington D.C.",
    population: "331M",
    region: "North America",
    flag: "",
  },
  {
    code: "CN",
    name: "China",
    capital: "Beijing",
    population: "1.4B",
    region: "Asia",
    flag: "",
  },
  {
    code: "IN",
    name: "India",
    capital: "New Delhi",
    population: "1.4B",
    region: "Asia",
    flag: "",
  },
  {
    code: "BR",
    name: "Brazil",
    capital: "Brasília",
    population: "215M",
    region: "South America",
    flag: "",
  },
  {
    code: "RU",
    name: "Russia",
    capital: "Moscow",
    population: "146M",
    region: "Europe",
    flag: "",
  },
  {
    code: "JP",
    name: "Japan",
    capital: "Tokyo",
    population: "125M",
    region: "Asia",
    flag: "",
  },
  {
    code: "DE",
    name: "Germany",
    capital: "Berlin",
    population: "83M",
    region: "Europe",
    flag: "",
  },
  {
    code: "GB",
    name: "United Kingdom",
    capital: "London",
    population: "67M",
    region: "Europe",
    flag: "",
  },
  {
    code: "FR",
    name: "France",
    capital: "Paris",
    population: "68M",
    region: "Europe",
    flag: "",
  },
  {
    code: "IT",
    name: "Italy",
    capital: "Rome",
    population: "59M",
    region: "Europe",
    flag: "",
  },
  {
    code: "CA",
    name: "Canada",
    capital: "Ottawa",
    population: "38M",
    region: "North America",
    flag: "",
  },
  {
    code: "AU",
    name: "Australia",
    capital: "Canberra",
    population: "26M",
    region: "Oceania",
    flag: "",
  },
  {
    code: "MX",
    name: "Mexico",
    capital: "Mexico City",
    population: "128M",
    region: "North America",
    flag: "",
  },
  {
    code: "KR",
    name: "South Korea",
    capital: "Seoul",
    population: "52M",
    region: "Asia",
    flag: "",
  },
  {
    code: "ES",
    name: "Spain",
    capital: "Madrid",
    population: "47M",
    region: "Europe",
    flag: "",
  },
  {
    code: "AR",
    name: "Argentina",
    capital: "Buenos Aires",
    population: "45M",
    region: "South America",
    flag: "",
  },
  {
    code: "EG",
    name: "Egypt",
    capital: "Cairo",
    population: "104M",
    region: "Africa",
    flag: "",
  },
  {
    code: "ZA",
    name: "South Africa",
    capital: "Cape Town",
    population: "60M",
    region: "Africa",
    flag: "",
  },
  {
    code: "NG",
    name: "Nigeria",
    capital: "Abuja",
    population: "218M",
    region: "Africa",
    flag: "",
  },
  {
    code: "TH",
    name: "Thailand",
    capital: "Bangkok",
    population: "70M",
    region: "Asia",
    flag: "",
  },
];

export default function CountriesPage() {
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

  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All" || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="page-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Globe className="w-8 h-8 text-blue-600" />
            Countries of the World
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore detailed information about countries around the globe
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search countries or capitals..."
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <Link
              key={country.code}
              href={`/country/${country.code.toLowerCase()}`}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{country.flag}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {country.code}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{country.name}</h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{country.capital}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{country.population}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {country.region}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No countries found
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
