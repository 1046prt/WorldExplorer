import { Building2 } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Country } from "@/lib/types";
import "@/styles/country-cities.css";
interface CountryCitiesProps {
  country: Country;
}

export function CountryCities({ country }: CountryCitiesProps) {
  return (
    <div className="card city-card">
      <div className="card-header flex gap-sm items-center mb-lg">
        <Building2 className="icon text-info" />
        <h2 className="title-lg">Famous Cities</h2>
        <span className="badge">{country.famousCities.length}</span>
      </div>

      <div className="city-list">
        {country.famousCities.map((city) => (
          <div key={city.slug} className="city-item">
            <div className="city-image-container">
              <OptimizedImage
                src={city.image || `/images/cities/${city.slug}.jpg`}
                alt={city.name}
                width={120}
                height={80}
                className="city-image object-cover rounded-lg"
                sizes="120px"
              />
            </div>
            <div className="city-content">
              <h3 className="city-name">{city.name}</h3>
              <p className="city-desc">{city.whyFamous}</p>
            </div>
          </div>
        ))}
      </div>

      {country.states && country.states.length > 0 && (
        <div className="states-section">
          <h3 className="subtitle">States/Provinces</h3>
          <div className="states-grid">
            {country.states.map((state) => (
              <div key={state.slug} className="state-item">
                <span className="state-name">{state.name}</span>
                <span className="state-capital">{state.capital}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
