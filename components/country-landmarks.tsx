import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ExternalLink } from "lucide-react";
import { LandmarkModal } from "@/components/landmark-modal";
import type { Country } from "@/lib/types";
import Image from "next/image";
import "/styles/country-landmarks.css";

interface CountryLandmarksProps {
  country: Country;
}

export function CountryLandmarks({ country }: CountryLandmarksProps) {
  return (
    <Card className="country-landmarks">
      <div className="landmarks-header">
        <MapPin className="landmarks-icon" />
        <h2 className="landmarks-title">Famous Landmarks</h2>
        <Badge variant="secondary">{country.landmarks.length}</Badge>
      </div>

      <div className="landmarks-grid">
        {country.landmarks.map((landmark) => (
          <LandmarkModal
            key={landmark.slug}
            landmark={{
              ...landmark,
              country: country.name,
              countryCode: country.iso2,
            }}
          >
            <Card className="landmark-card">
              <div className="landmark-image">
                <Image
                  src={landmark.imagePath || "/placeholder.svg"}
                  alt={landmark.name}
                  fill
                />
              </div>
              <div className="landmark-content">
                <div className="landmark-header">
                  <h3>{landmark.name}</h3>
                  <Badge variant="outline" className="city-badge">
                    {landmark.city}
                  </Badge>
                </div>
                <p className="landmark-description">{landmark.whyFamous}</p>
                <div className="landmark-footer">
                  <div className="landmark-coordinates">
                    {landmark.coordinates.lat.toFixed(4)},{" "}
                    {landmark.coordinates.lng.toFixed(4)}
                  </div>
                  <Button size="sm" variant="ghost">
                    <ExternalLink className="external-icon" />
                  </Button>
                </div>
              </div>
            </Card>
          </LandmarkModal>
        ))}
      </div>
    </Card>
  );
}
