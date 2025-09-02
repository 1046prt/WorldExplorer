import { ArrowLeft, Globe, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { formatPopulation } from "@/lib/data-utils";
import type { Country } from "@/lib/types";
import Link from "next/link";
import "@/styles/country-header.css";

function getCountryFlag(countryCode: string): string {
  const flagMap: Record<string, string> = {
    US: "🇺🇸",
    CN: "🇨🇳",
    IN: "🇮🇳",
    BR: "🇧🇷",
    RU: "🇷🇺",
    JP: "🇯🇵",
    DE: "🇩🇪",
    GB: "🇬🇧",
    FR: "🇫🇷",
    IT: "🇮🇹",
    CA: "🇨🇦",
    AU: "🇦🇺",
    MX: "🇲🇽",
    KR: "🇰🇷",
    ES: "🇪🇸",
    AR: "🇦🇷",
    EG: "🇪🇬",
    ZA: "🇿🇦",
    NG: "🇳🇬",
    TH: "🇹🇭",
    TR: "🇹🇷",
    SA: "🇸🇦",
    ID: "🇮🇩",
    PL: "🇵🇱",
    NL: "🇳🇱",
    BE: "🇧🇪",
    CH: "🇨🇭",
    AT: "🇦🇹",
    SE: "🇸🇪",
    NO: "🇳🇴",
    DK: "🇩🇰",
    FI: "🇫🇮",
    IE: "🇮🇪",
    PT: "🇵🇹",
    GR: "🇬🇷",
    CZ: "🇨🇿",
    HU: "🇭🇺",
    RO: "🇷🇴",
    BG: "🇧🇬",
    HR: "🇭🇷",
    SI: "🇸🇮",
    SK: "🇸🇰",
    LT: "🇱🇹",
    LV: "🇱🇻",
    EE: "🇪🇪",
    UA: "🇺🇦",
    BY: "🇧🇾",
    VN: "🇻🇳",
    PH: "🇵🇭",
    MY: "🇲🇾",
    SG: "🇸🇬",
    NZ: "🇳🇿",
    CL: "🇨🇱",
    PE: "🇵🇪",
    CO: "🇨🇴",
    VE: "🇻🇪",
    UY: "🇺🇾",
    PY: "🇵🇾",
    BO: "🇧🇴",
    EC: "🇪🇨",
    GY: "🇬🇾",
    SR: "🇸🇷",
    FK: "🇫🇰",
    GF: "🇬🇫",
    JO: "🇯🇴",
    LB: "🇱🇧",
    SY: "🇸🇾",
    IQ: "🇮🇶",
    IR: "🇮🇷",
    AF: "🇦🇫",
    PK: "🇵🇰",
    BD: "🇧🇩",
    LK: "🇱🇰",
    MV: "🇲🇻",
    NP: "🇳🇵",
    BT: "🇧🇹",
    MM: "🇲🇲",
    LA: "🇱🇦",
    KH: "🇰🇭",
    BN: "🇧🇳",
    TL: "🇹🇱",
    MN: "🇲🇳",
    KZ: "🇰🇿",
    KG: "🇰🇬",
    TJ: "🇹🇯",
    UZ: "🇺🇿",
    TM: "🇹🇲",
    GE: "🇬🇪",
    AM: "🇦🇲",
    AZ: "🇦🇿",
    IL: "🇮🇱",
    PS: "🇵🇸",
    CY: "🇨🇾",
    MT: "🇲🇹",
    IS: "🇮🇸",
    LU: "🇱🇺",
    LI: "🇱🇮",
    MC: "🇲🇨",
    SM: "🇸🇲",
    VA: "🇻🇦",
    AD: "🇦🇩",
  };
  return flagMap[countryCode.toUpperCase()] || "🏳️";
}

interface CountryHeaderProps {
  country: Country;
}

export function CountryHeader({ country }: CountryHeaderProps) {
  return (
    <header className="ch-header">
      {/* Background country image */}
      <div className="ch-bg-image">
        <OptimizedImage
          src={
            country.image ||
            `/images/countries/${country.iso2.toLowerCase()}.jpg`
          }
          alt={`${country.name} landscape`}
          fill
          className="object-cover opacity-20"
          priority
        />
      </div>

      <div className="ch-container">
        <div className="ch-topbar">
          <Link href="/browse/countries/">
            <Button variant="ghost" size="sm" className="ch-back-btn">
              <ArrowLeft className="ch-icon-sm" />
              Back
            </Button>
          </Link>
          <div className="ch-badges">
            <Badge variant="outline">{country.iso2}</Badge>
            <Badge variant="secondary">{country.region}</Badge>
          </div>
        </div>

        <div className="ch-main">
          <div className="ch-info">
            <div className="ch-title-row">
              <h1 className="ch-title">{country.name}</h1>
            </div>
            <p className="ch-capital">
              Capital:{" "}
              <span className="ch-capital-name">{country.capital}</span>
            </p>
          </div>

          <div className="ch-stats">
            <div className="ch-stat">
              <Users className="ch-icon" />
              <span>{formatPopulation(country.population)}</span>
            </div>
            <div className="ch-stat">
              <MapPin className="ch-icon" />
              <span>{country.landmarks.length} Landmarks</span>
            </div>
            <div className="ch-stat">
              <Globe className="ch-icon" />
              <span>{country.languages.join(", ")}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
