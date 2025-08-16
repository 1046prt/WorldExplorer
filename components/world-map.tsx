"use client";

import type React from "react";

import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ZoomIn, ZoomOut, RotateCcw, Globe, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CountryInfo {
  name: string;
  capital: string;
  population: string;
  region: string;
  area: string;
  currency: string;
  languages: string[];
  timezone: string;
}

const countryData: Record<string, CountryInfo> = {
  US: {
    name: "United States",
    capital: "Washington, D.C.",
    population: "331.9M",
    region: "North America",
    area: "9.8M km²",
    currency: "USD",
    languages: ["English"],
    timezone: "UTC-5 to UTC-10",
  },
  CA: {
    name: "Canada",
    capital: "Ottawa",
    population: "38.2M",
    region: "North America",
    area: "10.0M km²",
    currency: "CAD",
    languages: ["English", "French"],
    timezone: "UTC-3.5 to UTC-8",
  },
  MX: {
    name: "Mexico",
    capital: "Mexico City",
    population: "128.9M",
    region: "North America",
    area: "1.96M km²",
    currency: "MXN",
    languages: ["Spanish"],
    timezone: "UTC-6 to UTC-8",
  },
  BR: {
    name: "Brazil",
    capital: "Brasília",
    population: "215.3M",
    region: "South America",
    area: "8.5M km²",
    currency: "BRL",
    languages: ["Portuguese"],
    timezone: "UTC-2 to UTC-5",
  },
  AR: {
    name: "Argentina",
    capital: "Buenos Aires",
    population: "45.4M",
    region: "South America",
    area: "2.8M km²",
    currency: "ARS",
    languages: ["Spanish"],
    timezone: "UTC-3",
  },
  GB: {
    name: "United Kingdom",
    capital: "London",
    population: "67.3M",
    region: "Europe",
    area: "243,610 km²",
    currency: "GBP",
    languages: ["English"],
    timezone: "UTC+0",
  },
  FR: {
    name: "France",
    capital: "Paris",
    population: "67.7M",
    region: "Europe",
    area: "643,801 km²",
    currency: "EUR",
    languages: ["French"],
    timezone: "UTC+1",
  },
  DE: {
    name: "Germany",
    capital: "Berlin",
    population: "83.2M",
    region: "Europe",
    area: "357,022 km²",
    currency: "EUR",
    languages: ["German"],
    timezone: "UTC+1",
  },
  IT: {
    name: "Italy",
    capital: "Rome",
    population: "59.1M",
    region: "Europe",
    area: "301,340 km²",
    currency: "EUR",
    languages: ["Italian"],
    timezone: "UTC+1",
  },
  ES: {
    name: "Spain",
    capital: "Madrid",
    population: "47.4M",
    region: "Europe",
    area: "505,370 km²",
    currency: "EUR",
    languages: ["Spanish"],
    timezone: "UTC+1",
  },
  RU: {
    name: "Russia",
    capital: "Moscow",
    population: "146.2M",
    region: "Europe/Asia",
    area: "17.1M km²",
    currency: "RUB",
    languages: ["Russian"],
    timezone: "UTC+2 to UTC+12",
  },
  CN: {
    name: "China",
    capital: "Beijing",
    population: "1.41B",
    region: "Asia",
    area: "9.6M km²",
    currency: "CNY",
    languages: ["Mandarin"],
    timezone: "UTC+8",
  },
  IN: {
    name: "India",
    capital: "New Delhi",
    population: "1.38B",
    region: "Asia",
    area: "3.3M km²",
    currency: "INR",
    languages: ["Hindi", "English"],
    timezone: "UTC+5:30",
  },
  JP: {
    name: "Japan",
    capital: "Tokyo",
    population: "125.8M",
    region: "Asia",
    area: "377,975 km²",
    currency: "JPY",
    languages: ["Japanese"],
    timezone: "UTC+9",
  },
  AU: {
    name: "Australia",
    capital: "Canberra",
    population: "25.7M",
    region: "Oceania",
    area: "7.7M km²",
    currency: "AUD",
    languages: ["English"],
    timezone: "UTC+8 to UTC+10",
  },
  ZA: {
    name: "South Africa",
    capital: "Cape Town",
    population: "60.4M",
    region: "Africa",
    area: "1.2M km²",
    currency: "ZAR",
    languages: ["Afrikaans", "English"],
    timezone: "UTC+2",
  },
  EG: {
    name: "Egypt",
    capital: "Cairo",
    population: "104.3M",
    region: "Africa",
    area: "1.0M km²",
    currency: "EGP",
    languages: ["Arabic"],
    timezone: "UTC+2",
  },
  NG: {
    name: "Nigeria",
    capital: "Abuja",
    population: "218.5M",
    region: "Africa",
    area: "923,768 km²",
    currency: "NGN",
    languages: ["English"],
    timezone: "UTC+1",
  },
};

const countryCoordinates: Record<
  string,
  { x: number; y: number; width: number; height: number }
> = {
  US: { x: 15, y: 35, width: 25, height: 15 },
  CA: { x: 15, y: 20, width: 30, height: 15 },
  MX: { x: 15, y: 50, width: 15, height: 10 },
  BR: { x: 35, y: 60, width: 15, height: 20 },
  AR: { x: 30, y: 80, width: 10, height: 15 },
  GB: { x: 48, y: 30, width: 3, height: 4 },
  FR: { x: 50, y: 35, width: 4, height: 5 },
  DE: { x: 52, y: 32, width: 4, height: 5 },
  IT: { x: 52, y: 40, width: 3, height: 8 },
  ES: { x: 47, y: 42, width: 5, height: 5 },
  RU: { x: 55, y: 25, width: 35, height: 15 },
  CN: { x: 70, y: 40, width: 15, height: 12 },
  IN: { x: 65, y: 50, width: 8, height: 10 },
  JP: { x: 85, y: 42, width: 4, height: 8 },
  AU: { x: 80, y: 75, width: 12, height: 8 },
  ZA: { x: 52, y: 80, width: 6, height: 6 },
  EG: { x: 52, y: 52, width: 4, height: 6 },
  NG: { x: 48, y: 62, width: 4, height: 4 },
};

export function WorldMap() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  const handleCountryClick = useCallback(
    (countryCode: string) => {
      if (countryCode === selectedCountry) {
        // Navigate to country detail page
        router.push(`/country/${countryCode.toLowerCase()}`);
      } else {
        setSelectedCountry(countryCode);
      }
    },
    [selectedCountry, router]
  );

  const handleCountryHover = useCallback(
    (countryCode: string | null, event?: React.MouseEvent) => {
      setHoveredCountry(countryCode);
      if (countryCode && event) {
        setTooltipPosition({ x: event.clientX, y: event.clientY });
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    },
    []
  );

  const resetView = () => {
    setZoom(1);
    setSelectedCountry(null);
    setHoveredCountry(null);
    setShowTooltip(false);
  };

  const currentCountry = hoveredCountry || selectedCountry;
  const countryInfo = currentCountry ? countryData[currentCountry] : null;

  return (
    <Card className="p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-blue-100 dark:border-blue-800">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Interactive World Explorer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {countryInfo ? (
                <span className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {currentCountry}
                  </Badge>
                  <span className="font-medium">{countryInfo.name}</span>
                  {selectedCountry && (
                    <span className="text-blue-600 dark:text-blue-400 font-medium animate-pulse">
                      (Click again to explore details)
                    </span>
                  )}
                </span>
              ) : (
                "Hover over countries for quick facts • Click to select • Double-click to explore"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.min(zoom * 1.3, 3))}
            disabled={zoom >= 3}
            className="hover:bg-blue-50 dark:hover:bg-blue-900"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom(Math.max(zoom / 1.3, 0.6))}
            disabled={zoom <= 0.6}
            className="hover:bg-blue-50 dark:hover:bg-blue-900"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={resetView}
            className="hover:bg-blue-50 dark:hover:bg-blue-900 bg-transparent"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative w-full h-[500px] bg-gradient-to-b from-sky-50 to-blue-100 dark:from-sky-900 dark:to-blue-800 rounded-xl overflow-hidden border-2 border-blue-200 dark:border-blue-700 shadow-inner">
        <div
          className="world-map-wrapper"
          style={{ transform: `scale(${zoom})` }}
        >
          <Image
            src="/images/maps/world-map.png"
            alt="Interactive World Map"
            fill
            className="world-map-image"
            priority
          />

          {Object.entries(countryCoordinates).map(([countryCode, coords]) => (
            <div
              key={countryCode}
              className={`country-marker ${
                selectedCountry === countryCode ? "selected" : "default"
              }`}
              style={{
                left: `${coords.x}%`,
                top: `${coords.y}%`,
                width: `${coords.width}%`,
                height: `${coords.height}%`,
              }}
              onClick={() => handleCountryClick(countryCode)}
              onMouseEnter={(e) => handleCountryHover(countryCode, e)}
              onMouseLeave={() => handleCountryHover(null)}
              title={countryData[countryCode]?.name}
            />
          ))}
        </div>

        {showTooltip && hoveredCountry && countryData[hoveredCountry] && (
          <div
            className="map-tooltip"
            style={{
              left: tooltipPosition.x + 10,
              top: tooltipPosition.y - 10,
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">
                {hoveredCountry}
              </Badge>
              <span className="font-semibold text-sm">
                {countryData[hoveredCountry].name}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div>Capital: {countryData[hoveredCountry].capital}</div>
              <div>Population: {countryData[hoveredCountry].population}</div>
              <div>Currency: {countryData[hoveredCountry].currency}</div>
            </div>
          </div>
        )}
      </div>

      {countryInfo && (
        <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 rounded-xl border-2 border-blue-200 dark:border-blue-700 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded border flex items-center justify-center">
                  <span className="text-xs font-bold">{currentCountry}</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-blue-900 dark:text-blue-100">
                    {countryInfo.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {countryInfo.region}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Capital
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.capital}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Population
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.population}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Area
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.area}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Currency
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.currency}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Languages
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.languages.join(", ")}
                  </p>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Timezone
                  </span>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {countryInfo.timezone}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 ml-4">
              <Button
                variant="default"
                size="sm"
                onClick={() =>
                  router.push(`/country/${currentCountry?.toLowerCase()}`)
                }
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Info className="w-4 h-4 mr-2" />
                Explore Details
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
