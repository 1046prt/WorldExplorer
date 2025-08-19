import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";
import type { Country } from "@/lib/types";

interface CountryCitiesProps {
  country: Country;
}

export function CountryCities({ country }: CountryCitiesProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Building2 className="w-5 h-5 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Famous Cities
        </h2>
        <Badge variant="secondary">{country.famousCities.length}</Badge>
      </div>

      <div className="space-y-4">
        {country.famousCities.map((city) => (
          <div
            key={city.slug}
            className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              {city.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {city.whyFamous}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          States/Provinces
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {country.states.map((state) => (
            <div
              key={state.slug}
              className="flex justify-between items-center text-sm"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {state.name}
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {state.capital}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
