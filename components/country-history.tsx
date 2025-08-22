import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import type { Country } from "@/lib/types";
import "/styles/country-history.css";

interface CountryHistoryProps {
  country: Country;
}

export function CountryHistory({ country }: CountryHistoryProps) {
  return (
    <Card className="country-history">
      <div className="history-header">
        <Calendar className="history-icon" />
        <h2 className="history-title">Historical Timeline</h2>
      </div>

      <div className="history-events">
        {country.history.map((event, index) => (
          <div key={index} className="history-event">
            <div className="history-year">
              <Badge variant="outline" className="year-badge">
                {event.year}
              </Badge>
            </div>
            <div className="history-description">
              <p>{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
