import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, DollarSign, Globe, Users } from "lucide-react"
import { formatPopulation } from "@/lib/data-utils"
import type { Country } from "@/lib/types"
import Image from "next/image"

interface CountryOverviewProps {
  country: Country
}

export function CountryOverview({ country }: CountryOverviewProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Country Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Population</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600">{formatPopulation(country.population)}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{country.population.toLocaleString()} people</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Currency</h3>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={country.currency.image || "/placeholder.svg"}
              alt={country.currency.name}
              width={24}
              height={24}
              className="rounded"
            />
            <span className="font-medium">{country.currency.name}</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {country.currency.code} ({country.currency.symbol})
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {country.languages.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Timezones</h3>
          </div>
          <div className="space-y-1">
            {country.timezones.slice(0, 3).map((timezone) => (
              <p key={timezone} className="text-sm text-gray-600 dark:text-gray-400">
                {timezone}
              </p>
            ))}
            {country.timezones.length > 3 && (
              <p className="text-xs text-gray-500">+{country.timezones.length - 3} more</p>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
