"use client";

import { Building2, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import type { Country } from "@/lib/types";
import type { City, State } from "@/lib/country-api-service";
import { getCitiesForCountry, getStatesForCountry } from "@/lib/data-utils";
import { ImageModal } from "@/components/ui/image-modal";
import { LoadingState } from "@/components/loading";
import { ErrorBoundary } from "@/components/error-boundary";
import "@/styles/country-cities.css";
interface CountryCitiesProps {
  country: Country;
  countryCode?: string;
}

export function CountryCities({ country, countryCode }: CountryCitiesProps) {
  const [apiCities, setApiCities] = useState<City[]>([]);
  const [apiStates, setApiStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (countryCode) {
      const fetchApiData = async () => {
        setLoading(true);
        setError(null);

        try {
          const [cities, states] = await Promise.all([
            getCitiesForCountry(countryCode).catch(() => []),
            getStatesForCountry(countryCode).catch(() => []),
          ]);

          setApiCities(cities);
          setApiStates(states);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Failed to fetch data");
        } finally {
          setLoading(false);
        }
      };

      fetchApiData();
    }
  }, [countryCode]);

  const hasApiData = apiCities.length > 0 || apiStates.length > 0;
  const hasStaticData = country.famousCities && country.famousCities.length > 0;
  return (
    <ErrorBoundary>
      <div className="card city-card">
        <div className="country-cities-card-header flex gap-sm items-center mb-lg">
          <Building2 className="country-cities-icon text-info" />
          <h2 className="country-cities-title-lg">Cities & States</h2>
          <span className="badge">
            {hasApiData
              ? `${apiCities.length} cities, ${apiStates.length} states`
              : hasStaticData
              ? `${country.famousCities.length} famous cities`
              : "0"}
          </span>
        </div>

        {loading && <LoadingState message="Loading cities and states..." />}

        {error && (
          <div className="error-message">
            <p>Failed to load additional data: {error}</p>
          </div>
        )}

        {/* API States Section */}
        {apiStates.length > 0 && (
          <div className="states-section">
            <h3 className="subtitle">States/Provinces ({apiStates.length})</h3>
            <div className="states-grid">
              {apiStates.slice(0, 20).map((state) => (
                <div key={state.id} className="state-item api-state">
                  <div className="state-header">
                    <MapPin className="state-icon" />
                    <span className="state-name">{state.name}</span>
                  </div>
                  <span className="state-code">{state.state_code}</span>
                  <span className="state-type">{state.type}</span>
                </div>
              ))}
            </div>
            {apiStates.length > 20 && (
              <p className="more-indicator">
                + {apiStates.length - 20} more states
              </p>
            )}
          </div>
        )}

        {/* API Cities Section */}
        {apiCities.length > 0 && (
          <div className="api-cities-section">
            <h3 className="subtitle">Major Cities ({apiCities.length})</h3>
            <div className="api-cities-grid">
              {apiCities.slice(0, 12).map((city) => (
                <div key={city.id} className="api-city-item">
                  <div className="api-city-header">
                    <Building2 className="city-icon" />
                    <span className="api-city-name">{city.name}</span>
                  </div>
                  <div className="api-city-details">
                    <span className="api-city-state">{city.state_name}</span>
                    {city.latitude && city.longitude && (
                      <span className="api-city-coords">
                        📍 {parseFloat(city.latitude).toFixed(2)}°,{" "}
                        {parseFloat(city.longitude).toFixed(2)}°
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {apiCities.length > 12 && (
              <p className="more-indicator">
                + {apiCities.length - 12} more cities
              </p>
            )}
          </div>
        )}

        {/* Static Famous Cities Section */}
        {hasStaticData && (
          <div className="famous-cities-section">
            <h3 className="subtitle">Famous Cities & Attractions</h3>
            <div className="city-list">
              {country.famousCities.map((city) => (
                <div key={city.slug} className="city-item">
                  <div className="city-image-container">
                    <ImageModal
                      src={city.image || `/images/cities/${city.slug}.jpg`}
                      alt={city.name}
                      width={160}
                      height={120}
                      className="city-image"
                    />
                  </div>
                  <div className="city-content">
                    <h4 className="city-name">{city.name}</h4>
                    <p className="city-desc">{city.whyFamous}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Static States Section (fallback) */}
        {!apiStates.length && country.states && country.states.length > 0 && (
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

        {!loading && !hasApiData && !hasStaticData && (
          <div className="no-data">
            <p>No city or state data available for this country.</p>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
