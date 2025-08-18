"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Map } from "lucide-react"
import type { Country } from "@/lib/types"

interface CountryMapProps {
  country: Country
}

export function CountryMap({ country }: CountryMapProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <Map className="w-5 h-5 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Country Map</h2>
        <Badge variant="secondary">{country.iso2}</Badge>
      </div>

      {/* Map Image */}
      <div className="relative w-full h-64 bg-gradient-to-b from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg overflow-hidden border flex items-center justify-center">
        <img
          src={`/images/country/${country.iso2.toLowerCase()}.svg`}
          alt={`${country.name} Map`}
          className="w-full h-full object-contain"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none"
          }}
        />
        {/* Fallback text if image not found */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <div className="text-4xl mb-2">🗺️</div>
            <p className="text-gray-700 dark:text-gray-300 font-medium">{country.name} Map</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Map not available</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Capital:</span>
          <p className="text-gray-900 dark:text-gray-100">{country.capital}</p>
        </div>
        <div>
          <span className="font-medium text-gray-700 dark:text-gray-300">Region:</span>
          <p className="text-gray-900 dark:text-gray-100">{country.region}</p>
        </div>
      </div>
    </Card>
  )
}
