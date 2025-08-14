import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Waves } from "lucide-react"
import type { Country } from "@/lib/types"

interface CountryRiversProps {
  country: Country
}

export function CountryRivers({ country }: CountryRiversProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Waves className="w-5 h-5 text-cyan-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Major Rivers</h2>
        <Badge variant="secondary">{country.rivers.length}</Badge>
      </div>

      <div className="space-y-4">
        {country.rivers.map((river) => (
          <div
            key={river.slug}
            className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-lg border border-cyan-200 dark:border-cyan-800"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{river.name}</h3>
              <Badge variant="outline">{river.length.toLocaleString()} km</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Source:</span>
                <p className="text-gray-600 dark:text-gray-400">{river.source}</p>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Mouth:</span>
                <p className="text-gray-600 dark:text-gray-400">{river.mouth}</p>
              </div>
            </div>
            {river.countries.length > 1 && (
              <div className="mt-2">
                <span className="text-xs text-gray-500">Flows through: {river.countries.join(", ")}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}
