"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map } from "lucide-react";
import type { Country } from "@/lib/types";
import "@/styles/country-map.css";
import Image from "next/image";

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
        <Image
          src={`/images/country/${country.iso2.toLowerCase()}.svg`}
          alt={`${country.name} Map`}
          className="map-image"
          width={400}
          height={300}
          onLoad={(e) => {
            const fallback = (
              e.target as HTMLImageElement
            ).parentElement?.querySelector(".map-fallback") as HTMLElement;
            if (fallback) fallback.style.display = "none";
          }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const fallback = (
              e.target as HTMLImageElement
            ).parentElement?.querySelector(".map-fallback") as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
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
