import type { Country } from "./types";
import {
  CountryAPIService,
  type Country as APICountry,
} from "./country-api-service";

export async function getCountryData(
  countryCode: string
): Promise<Country | null> {
  try {
    // Use file system on server, fetch on client
    if (typeof window === "undefined") {
      // Server-side: read from file system - import fs dynamically
      const { promises: fs } = await import("fs");
      const path = await import("path");

      const filePath = path.join(
        process.cwd(),
        "public",
        "data",
        "countries",
        `${countryCode.toLowerCase()}.json`
      );
      try {
        const fileContents = await fs.readFile(filePath, "utf8");
        const data = JSON.parse(fileContents);
        return data;
      } catch {
        console.warn(`Country data file not found for: ${countryCode}`);
        return null;
      }
    } else {
      // Client-side: use fetch
      const response = await fetch(
        `/data/countries/${countryCode.toLowerCase()}.json`,
        {
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.warn(`Country data not found for: ${countryCode}`);
        return null;
      }

      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Error loading country data:", error);
    return null;
  }
}

export async function getAllCountries(): Promise<string[]> {
  try {
    // Try to get countries from API first
    const apiCountries = await CountryAPIService.getAllCountries();
    return apiCountries.map((country) => country.iso2.toLowerCase());
  } catch (error) {
    console.warn(
      "API unavailable, falling back to static country list:",
      error
    );
    // Fallback to static list if API fails
    return [
      "us",
      "fr",
      "cn",
      "gb",
      "jp",
      "ca",
      "de",
      "it",
      "br",
      "in",
      "au",
      "ru",
      "mx",
      "es",
      "ar",
    ];
  }
}

// New function to get all API countries
export async function getAllAPICountries(): Promise<APICountry[]> {
  try {
    return await CountryAPIService.getAllCountries();
  } catch (error) {
    console.error("Failed to fetch countries from API:", error);
    return [];
  }
}

// Enhanced function to get country data with API support
export async function getEnhancedCountryData(countryCode: string): Promise<{
  staticData: Country | null;
  apiData: APICountry | null;
}> {
  try {
    const [staticData, apiData] = await Promise.allSettled([
      getCountryData(countryCode),
      CountryAPIService.getCountryDetails(countryCode),
    ]);

    return {
      staticData: staticData.status === "fulfilled" ? staticData.value : null,
      apiData: apiData.status === "fulfilled" ? apiData.value : null,
    };
  } catch (error) {
    console.error("Error fetching enhanced country data:", error);
    return { staticData: null, apiData: null };
  }
}

export function searchCountries(
  query: string,
  countries: Country[]
): Country[] {
  const lowercaseQuery = query.toLowerCase();
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.capital.toLowerCase().includes(lowercaseQuery) ||
      country.region.toLowerCase().includes(lowercaseQuery) ||
      (country.famousCities &&
        country.famousCities.some((city) =>
          city.name.toLowerCase().includes(lowercaseQuery)
        )) ||
      (country.landmarks &&
        country.landmarks.some((landmark) =>
          landmark.name.toLowerCase().includes(lowercaseQuery)
        )) ||
      (country.institutions &&
        country.institutions.some((institution) =>
          institution.name.toLowerCase().includes(lowercaseQuery)
        )) ||
      (country.rivers &&
        country.rivers.some((river) =>
          river.name.toLowerCase().includes(lowercaseQuery)
        ))
  );
}

export function searchLandmarks(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase();
  const landmarks = [];

  for (const country of countries) {
    if (country.landmarks && country.landmarks.length > 0) {
      for (const landmark of country.landmarks) {
        if (
          landmark.name.toLowerCase().includes(lowercaseQuery) ||
          landmark.city.toLowerCase().includes(lowercaseQuery) ||
          landmark.whyFamous.toLowerCase().includes(lowercaseQuery)
        ) {
          landmarks.push({
            ...landmark,
            country: country.name,
            countryCode: country.iso2,
          });
        }
      }
    }
  }

  return landmarks;
}

export function searchInstitutions(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase();
  const institutions = [];

  for (const country of countries) {
    if (country.institutions && country.institutions.length > 0) {
      for (const institution of country.institutions) {
        if (
          institution.name.toLowerCase().includes(lowercaseQuery) ||
          institution.city.toLowerCase().includes(lowercaseQuery) ||
          institution.type.toLowerCase().includes(lowercaseQuery)
        ) {
          institutions.push({
            ...institution,
            country: country.name,
            countryCode: country.iso2,
          });
        }
      }
    }
  }

  return institutions.sort((a, b) => a.globalRank - b.globalRank);
}

export function searchRivers(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase();
  const rivers = [];

  for (const country of countries) {
    if (country.rivers && country.rivers.length > 0) {
      for (const river of country.rivers) {
        if (
          river.name.toLowerCase().includes(lowercaseQuery) ||
          river.source.toLowerCase().includes(lowercaseQuery) ||
          river.mouth.toLowerCase().includes(lowercaseQuery) ||
          river.countries.some((c) => c.toLowerCase().includes(lowercaseQuery))
        ) {
          rivers.push({
            ...river,
            country: country.name,
            countryCode: country.iso2,
          });
        }
      }
    }
  }

  return rivers.sort((a, b) => b.length - a.length);
}

export function getCountryStats(countries: Country[]) {
  const totalPopulation = countries.reduce(
    (sum, country) => sum + country.population,
    0
  );
  const totalLandmarks = countries.reduce(
    (sum, country) => sum + (country.landmarks ? country.landmarks.length : 0),
    0
  );
  const totalInstitutions = countries.reduce(
    (sum, country) =>
      sum + (country.institutions ? country.institutions.length : 0),
    0
  );
  const totalRivers = countries.reduce(
    (sum, country) => sum + (country.rivers ? country.rivers.length : 0),
    0
  );

  return {
    countries: countries.length,
    population: totalPopulation,
    landmarks: totalLandmarks,
    institutions: totalInstitutions,
    rivers: totalRivers,
  };
}

export function formatPopulation(population: number): string {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`;
  } else if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`;
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`;
  }
  return population.toString();
}

// New API-powered functions
export async function getCountriesByRegion(
  region: string
): Promise<APICountry[]> {
  try {
    return await CountryAPIService.getCountriesByRegion(region);
  } catch (error) {
    console.error("Error fetching countries by region:", error);
    return [];
  }
}

export async function getStatesForCountry(countryCode: string) {
  try {
    return await CountryAPIService.getStatesByCountry(countryCode);
  } catch (error) {
    console.error(`Error fetching states for ${countryCode}:`, error);
    return [];
  }
}

export async function getCitiesForCountry(countryCode: string) {
  try {
    return await CountryAPIService.getCitiesByCountry(countryCode);
  } catch (error) {
    console.error(`Error fetching cities for ${countryCode}:`, error);
    return [];
  }
}

export async function getCitiesForState(
  countryCode: string,
  stateCode: string
) {
  try {
    return await CountryAPIService.getCitiesByState(countryCode, stateCode);
  } catch (error) {
    console.error(
      `Error fetching cities for ${stateCode}, ${countryCode}:`,
      error
    );
    return [];
  }
}

// Enhanced stats function with API data
export async function getEnhancedCountryStats() {
  try {
    const [staticCountries, apiCountries] = await Promise.allSettled([
      getAllCountries()
        .then((codes) => Promise.all(codes.map((code) => getCountryData(code))))
        .then((countries) => countries.filter((c) => c !== null) as Country[]),
      CountryAPIService.getAllCountries(),
    ]);

    const staticData =
      staticCountries.status === "fulfilled" ? staticCountries.value : [];
    const apiData =
      apiCountries.status === "fulfilled" ? apiCountries.value : [];

    const staticStats = getCountryStats(staticData);

    return {
      static: staticStats,
      api: {
        countries: apiData.length,
        regions: new Set(apiData.map((c) => c.region)).size,
        subregions: new Set(apiData.map((c) => c.subregion)).size,
        currencies: new Set(apiData.map((c) => c.currency)).size,
      },
      combined: {
        totalCountries: apiData.length,
        detailedCountries: staticData.length,
        coverage:
          staticData.length > 0
            ? ((staticData.length / apiData.length) * 100).toFixed(1)
            : "0",
      },
    };
  } catch (error) {
    console.error("Error calculating enhanced stats:", error);
    return {
      static: {
        countries: 0,
        population: 0,
        landmarks: 0,
        institutions: 0,
        rivers: 0,
      },
      api: { countries: 0, regions: 0, subregions: 0, currencies: 0 },
      combined: { totalCountries: 0, detailedCountries: 0, coverage: "0" },
    };
  }
}
