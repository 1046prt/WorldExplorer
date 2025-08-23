import type { Country } from "./types";

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
      } catch (fileError) {
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
  // Available country data files - only include countries we actually have data for
  return [
    "us", // United States
    "fr", // France
    "cn", // China
    "gb", // United Kingdom
    "jp", // Japan
    "ca", // Canada
    "de", // Germany
    "it", // Italy
    "br", // Brazil
    "in", // India
    "au", // Australia
    "ru", // Russia
    "mx", // Mexico
    "es", // Spain
    "ar", // Argentina
  ];
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
