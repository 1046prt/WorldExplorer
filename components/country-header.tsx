import { ArrowLeft, Globe, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPopulation } from "@/lib/data-utils";
import type { Country } from "@/lib/types";
import Link from "next/link";

// Function to get country flag emoji from ISO2 code
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
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to World Map
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{country.iso2}</Badge>
            <Badge variant="secondary">{country.region}</Badge>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-5xl">{getCountryFlag(country.iso2)}</span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                {country.name}
              </h1>
              <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded border flex items-center justify-center text-xs font-medium">
                {country.currency.symbol}
              </div>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Capital:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {country.capital}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span className="font-medium">
                {formatPopulation(country.population)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-green-600" />
              <span className="font-medium">
                {country.landmarks.length} Landmarks
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-600" />
              <span className="font-medium">
                {country.languages.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
