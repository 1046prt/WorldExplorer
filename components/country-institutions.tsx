import { GraduationCap, Trophy } from "lucide-react";
import type { Country } from "@/lib/types";
import { ImageModal } from "@/components/ui/image-modal";
import "@/styles/country-institutions.css";
interface CountryInstitutionsProps {
  country: Country;
}

export function CountryInstitutions({ country }: CountryInstitutionsProps) {
  return (
    <div className="country-institutions-card institutions-card">
      <div className="institutions-header">
        <GraduationCap className="country-institutions-icon" />
        <h2 className="institutions-title">Top Educational Institutions</h2>
        <span className="badge secondary">{country.institutions.length}</span>
      </div>

      <div className="institutions-grid">
        {country.institutions.map((institution) => (
          <div
            key={institution.slug}
            className="country-institutions-card institution-card"
          >
            {institution.imagePath && (
              <div className="institution-image-container">
                <ImageModal
                  src={institution.imagePath}
                  alt={`${institution.name}`}
                  width={280}
                  height={160}
                  className="institution-image"
                />
              </div>
            )}

            <div className="institution-content">
              <div className="institution-top">
                <div className="institution-rank">
                  <Trophy className="country-institutions-icon trophy" />
                  <span className="badge outline">
                    #{institution.globalRank}
                  </span>
                </div>
                <span className="badge secondary small">
                  Est. {institution.founded}
                </span>
              </div>
              <h3 className="institution-name">{institution.name}</h3>
              <p className="institution-city">{institution.city}</p>
              <p className="institution-type">{institution.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
