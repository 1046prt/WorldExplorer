import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy } from "lucide-react"
import type { Country } from "@/lib/types"

interface CountryInstitutionsProps {
  country: Country
}

export function CountryInstitutions({ country }: CountryInstitutionsProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="w-5 h-5 text-indigo-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top Educational Institutions</h2>
        <Badge variant="secondary">{country.institutions.length}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {country.institutions.map((institution) => (
          <Card key={institution.slug} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <Badge variant="outline">#{institution.globalRank}</Badge>
              </div>
              <Badge variant="secondary" className="text-xs">
                Est. {institution.founded}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{institution.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{institution.city}</p>
            <p className="text-xs text-gray-500">{institution.type}</p>
          </Card>
        ))}
      </div>
    </Card>
  )
}
