"use client";

import React, { useState } from "react";
import Link from "next/link";
import "/styles/globals.css"
import {
  Search,
  Filter,
  GraduationCap,
  Users,
  MapPin,
  Star,
  Calendar,
} from "lucide-react";

interface University {
  id: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  flag: string;
  founded: number;
  students: string;
  ranking: number;
  type: string;
  description: string;
}

const universities: University[] = [
  {
    id: "harvard",
    name: "Harvard University",
    city: "Cambridge",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1636,
    students: "23,000",
    ranking: 1,
    type: "Private",
    description: "Oldest institution of higher education in the US",
  },
  {
    id: "mit",
    name: "MIT",
    city: "Cambridge",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1861,
    students: "11,500",
    ranking: 2,
    type: "Private",
    description: "Leading in science and technology",
  },
  {
    id: "stanford",
    name: "Stanford University",
    city: "Stanford",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1885,
    students: "17,000",
    ranking: 3,
    type: "Private",
    description: "Heart of Silicon Valley innovation",
  },
  {
    id: "cambridge",
    name: "University of Cambridge",
    city: "Cambridge",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1209,
    students: "24,000",
    ranking: 4,
    type: "Public",
    description: "One of the world's oldest universities",
  },
  {
    id: "oxford",
    name: "University of Oxford",
    city: "Oxford",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1096,
    students: "26,000",
    ranking: 5,
    type: "Public",
    description: "Oldest university in the English-speaking world",
  },
  {
    id: "caltech",
    name: "Caltech",
    city: "Pasadena",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1891,
    students: "2,200",
    ranking: 6,
    type: "Private",
    description: "Premier science and engineering institute",
  },
  {
    id: "eth-zurich",
    name: "ETH Zurich",
    city: "Zurich",
    country: "Switzerland",
    countryCode: "CH",
    flag: "🇨🇭",
    founded: 1855,
    students: "22,000",
    ranking: 7,
    type: "Public",
    description: "Leading European technical university",
  },
  {
    id: "ucl",
    name: "University College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1826,
    students: "42,000",
    ranking: 8,
    type: "Public",
    description: "London's global university",
  },
  {
    id: "imperial",
    name: "Imperial College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1907,
    students: "19,000",
    ranking: 9,
    type: "Public",
    description: "Science, engineering, medicine and business",
  },
  {
    id: "chicago",
    name: "University of Chicago",
    city: "Chicago",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1890,
    students: "17,000",
    ranking: 10,
    type: "Private",
    description: "Birthplace of modern economics",
  },
  {
    id: "nus",
    name: "National University of Singapore",
    city: "Singapore",
    country: "Singapore",
    countryCode: "SG",
    flag: "🇸🇬",
    founded: 1905,
    students: "40,000",
    ranking: 11,
    type: "Public",
    description: "Asia's leading global university",
  },
  {
    id: "peking",
    name: "Peking University",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    founded: 1898,
    students: "47,000",
    ranking: 12,
    type: "Public",
    description: "China's first modern national university",
  },
  {
    id: "tsinghua",
    name: "Tsinghua University",
    city: "Beijing",
    country: "China",
    countryCode: "CN",
    flag: "🇨🇳",
    founded: 1911,
    students: "50,000",
    ranking: 13,
    type: "Public",
    description: "China's MIT",
  },
  {
    id: "pennsylvania",
    name: "University of Pennsylvania",
    city: "Philadelphia",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1740,
    students: "25,000",
    ranking: 14,
    type: "Private",
    description: "Home of the Wharton School",
  },
  {
    id: "edinburgh",
    name: "University of Edinburgh",
    city: "Edinburgh",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1583,
    students: "47,000",
    ranking: 15,
    type: "Public",
    description: "Scotland's ancient university",
  },
  {
    id: "kings-college",
    name: "King's College London",
    city: "London",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    founded: 1829,
    students: "33,000",
    ranking: 16,
    type: "Public",
    description: "One of England's oldest universities",
  },
  {
    id: "columbia",
    name: "Columbia University",
    city: "New York",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1754,
    students: "33,000",
    ranking: 17,
    type: "Private",
    description: "Ivy League in Manhattan",
  },
  {
    id: "princeton",
    name: "Princeton University",
    city: "Princeton",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1746,
    students: "5,400",
    ranking: 18,
    type: "Private",
    description: "Elite liberal arts and research",
  },
  {
    id: "yale",
    name: "Yale University",
    city: "New Haven",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1701,
    students: "13,600",
    ranking: 19,
    type: "Private",
    description: "Historic Ivy League institution",
  },
  {
    id: "cornell",
    name: "Cornell University",
    city: "Ithaca",
    country: "United States",
    countryCode: "US",
    flag: "🇺🇸",
    founded: 1865,
    students: "25,000",
    ranking: 20,
    type: "Private",
    description: "Any person, any study",
  },
];

export default function UniversitiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const types = ["All", "Private", "Public"];

  const filteredUniversities = universities.filter((university) => {
    const matchesSearch =
      university.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      university.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedType === "All" || university.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="page-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <GraduationCap className="w-8 h-8 text-purple-600" />
            Top Universities Worldwide
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Explore the world's leading institutions of higher education
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search universities, cities, or countries..."
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
          {filteredUniversities.map((university) => (
            <div
              key={university.id}
              className="card hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{university.flag}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold">
                        #{university.ranking}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      university.type === "Private"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {university.type}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2">
                  {university.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  {university.description}
                </p>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {university.city}, {university.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{university.students} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Founded {university.founded}</span>
                  </div>
                </div>

                <Link
                  href={`/country/${university.countryCode.toLowerCase()}`}
                  className="inline-block mt-4 text-purple-600 dark:text-purple-400 hover:underline text-sm"
                >
                  View Country →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredUniversities.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No universities found
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
