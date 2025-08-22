"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";
import type { Country } from "@/lib/types";
import "@/styles/country-map.css";

interface CountryMapProps {
  country: Country;
}

export function CountryMap({ country }: CountryMapProps) {
  return (
    <Card className="country-map">
      {/* Header */}
      <div className="map-header">
        <Map className="map-icon" />
        <h2 className="map-title">Country Map</h2>
        <Badge variant="secondary">{country.iso2}</Badge>
      </div>

      {/* Map Image */}
      <div className="map-image-container">
        <img
          src={`/images/country/${country.iso2.toLowerCase()}.svg`}
          alt={`${country.name} Map`}
          className="map-image"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="map-fallback">
          <div className="map-fallback-content">
            <div className="map-fallback-emoji">🗺️</div>
            <p className="map-fallback-title">{country.name} Map</p>
            <p className="map-fallback-subtitle">Map not available</p>
          </div>
        </div>
      </div>

      <div className="map-details">
        <div>
          <span className="detail-label">Capital:</span>
          <p className="detail-value">{country.capital}</p>
        </div>
        <div>
          <span className="detail-label">Region:</span>
          <p className="detail-value">{country.region}</p>
        </div>
      </div>
    </Card>
  );
}
