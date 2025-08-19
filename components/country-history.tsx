import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Country } from "@/lib/types";

interface CountryHistoryProps {
  country: Country;
}

export function CountryHistory({ country }: CountryHistoryProps) {
  return (
    <Card className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5 text-amber-600" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Historical Timeline
        </h2>
      </div>

      <div className="space-y-4">
        {country.history.map((event, index) => (
          <div
            key={index}
            className="flex gap-4 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
          >
            <div className="flex-shrink-0">
              <Badge variant="outline" className="font-mono">
                {event.year}
              </Badge>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
