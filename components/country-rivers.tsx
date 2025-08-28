import { Waves } from "lucide-react";
import type { Country } from "@/lib/types";
import { ImageModal } from "@/components/ui/image-modal";
import "@/styles/country-river.css";
interface CountryRiversProps {
  country: Country;
}

export function CountryRivers({ country }: CountryRiversProps) {
  return (
    <div className="card rivers-card">
      <div className="rivers-header">
        <Waves className="icon" />
        <h2 className="rivers-title">Major Rivers</h2>
        <span className="badge badge-secondary">{country.rivers.length}</span>
      </div>

      <div className="rivers-list">
        {country.rivers.map((river) => (
          <div key={river.slug} className="river-item">
            <div className="river-content">
              <div className="river-top">
                <h3 className="river-name">{river.name}</h3>
                <span className="badge badge-outline">
                  {river.length.toLocaleString()} km
                </span>
              </div>

              <div className="river-info">
                <div>
                  <span className="label">Source:</span>
                  <p className="value">{river.source}</p>
                </div>
                <div>
                  <span className="label">Mouth:</span>
                  <p className="value">{river.mouth}</p>
                </div>
              </div>

              {river.countries.length > 1 && (
                <div className="river-countries">
                  Flows through: {river.countries.join(", ")}
                </div>
              )}
            </div>

            {river.imagePath && (
              <div className="river-image-container">
                <ImageModal
                  src={river.imagePath}
                  alt={`${river.name} river`}
                  width={120}
                  height={80}
                  className="river-image"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
