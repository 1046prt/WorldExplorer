import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Globe, Users } from "lucide-react";
import { formatPopulation } from "@/lib/data-utils";
import type { Country } from "@/lib/types";
import Image from "next/image";
import "@/styles/country-overview.css";

interface CountryOverviewProps {
  country: Country;
}

export function CountryOverview({ country }: CountryOverviewProps) {
  return (
    <Card className="country-overview">
      <h2 className="overview-title">Country Overview</h2>

      <div className="overview-grid">
        {/* Population */}
        <div className="overview-section">
          <div className="section-header">
            <Users className="section-icon blue" />
            <h3 className="section-heading">Population</h3>
          </div>
          <p className="section-value blue">
            {formatPopulation(country.population)}
          </p>
          <p className="section-sub">
            {country.population.toLocaleString()} people
          </p>
        </div>

        {/* Currency */}
        <div className="overview-section">
          <div className="section-header">
            <DollarSign className="section-icon green" />
            <h3 className="section-heading">Currency</h3>
          </div>
          <div className="currency-info">
            <Image
              src={country.currency.image || "/placeholder.svg"}
              alt={country.currency.name}
              width={24}
              height={24}
              className="currency-image"
            />
            <span className="currency-name">{country.currency.name}</span>
          </div>
          <p className="section-sub">
            {country.currency.code} ({country.currency.symbol})
          </p>
        </div>

        {/* Languages */}
        <div className="overview-section">
          <div className="section-header">
            <Globe className="section-icon purple" />
            <h3 className="section-heading">Languages</h3>
          </div>
          <div className="languages-list">
            {country.languages.map((language) => (
              <Badge key={language} variant="secondary">
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {/* Timezones */}
        <div className="overview-section">
          <div className="section-header">
            <Clock className="section-icon orange" />
            <h3 className="section-heading">Timezones</h3>
          </div>
          <div className="timezones-list">
            {country.timezones.slice(0, 3).map((timezone) => (
              <p key={timezone} className="timezone-item">
                {timezone}
              </p>
            ))}
            {country.timezones.length > 3 && (
              <p className="timezone-more">
                +{country.timezones.length - 3} more
              </p>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
