import type { Country } from "./types";
import { getAllCountries, getCountryData } from "./data-utils";

export interface SearchResult {
  type: "country" | "landmark" | "institution" | "river" | "city";
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge?: string;
  image?: string;
  metadata?: Record<string, string>;
  countryCode?: string;
  countryName?: string;
}

export class SearchService {
  private static countries: Country[] = [];
  private static initialized = false;

  static async initialize() {
    if (this.initialized) return;

    try {
      const countryCodes = await getAllCountries();
      const countryPromises = countryCodes.map((code) => getCountryData(code));
      const countryResults = await Promise.all(countryPromises);

      this.countries = countryResults.filter(
        (country): country is Country => country !== null
      );
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize search service:", error);
      // Set initialized to true even on error to prevent infinite retries
      this.initialized = true;
    }
  }

  static async search(
    query: string,
    type: string = "all"
  ): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    await this.initialize();

    const results: SearchResult[] = [];
    const lowercaseQuery = query.toLowerCase();

    for (const country of this.countries) {
      // Search countries
      if (
        (type === "all" || type === "country") &&
        this.matchesQuery(country.name, lowercaseQuery)
      ) {
        results.push({
          type: "country",
          title: country.name,
          subtitle: country.region,
          description: `Capital: ${
            country.capital
          }. Population: ${this.formatPopulation(country.population)}`,
          url: `/country/${country.iso2.toLowerCase()}`,
          badge: country.iso2,
          image: country.flag,
          metadata: {
            capital: country.capital,
            population: this.formatPopulation(country.population),
            region: country.region,
          },
          countryCode: country.iso2,
          countryName: country.name,
        });
      }

      // Search cities
      if (
        (type === "all" || type === "city") &&
        country.famousCities &&
        country.famousCities.length > 0
      ) {
        for (const city of country.famousCities) {
          if (
            this.matchesQuery(city.name, lowercaseQuery) ||
            this.matchesQuery(city.whyFamous, lowercaseQuery)
          ) {
            results.push({
              type: "city",
              title: city.name,
              subtitle: `${country.name}`,
              description: city.whyFamous,
              url: `/country/${country.iso2.toLowerCase()}#cities`,
              badge: "City",
              image: city.image,
              metadata: {
                country: country.name,
                region: country.region,
              },
              countryCode: country.iso2,
              countryName: country.name,
            });
          }
        }
      }

      // Search landmarks
      if (
        (type === "all" || type === "landmark") &&
        country.landmarks &&
        country.landmarks.length > 0
      ) {
        for (const landmark of country.landmarks) {
          if (
            this.matchesQuery(landmark.name, lowercaseQuery) ||
            this.matchesQuery(landmark.whyFamous, lowercaseQuery) ||
            this.matchesQuery(landmark.city, lowercaseQuery)
          ) {
            results.push({
              type: "landmark",
              title: landmark.name,
              subtitle: `${landmark.city}, ${country.name}`,
              description: landmark.whyFamous,
              url: `/country/${country.iso2.toLowerCase()}#landmarks`,
              badge: "Landmark",
              image: landmark.imagePath,
              metadata: {
                city: landmark.city,
                country: country.name,
                coordinates: `${landmark.coordinates.lat}, ${landmark.coordinates.lng}`,
              },
              countryCode: country.iso2,
              countryName: country.name,
            });
          }
        }
      }

      // Search institutions/universities
      if (
        (type === "all" || type === "institution") &&
        country.institutions &&
        country.institutions.length > 0
      ) {
        for (const institution of country.institutions) {
          if (
            this.matchesQuery(institution.name, lowercaseQuery) ||
            this.matchesQuery(institution.city, lowercaseQuery) ||
            this.matchesQuery(institution.type, lowercaseQuery)
          ) {
            results.push({
              type: "institution",
              title: institution.name,
              subtitle: `${institution.city}, ${country.name}`,
              description: `${institution.type} founded in ${institution.founded}`,
              url: `/country/${country.iso2.toLowerCase()}#institutions`,
              badge: "University",
              metadata: {
                founded: institution.founded.toString(),
                type: institution.type,
                rank: `#${institution.globalRank}`,
                country: country.name,
              },
              countryCode: country.iso2,
              countryName: country.name,
            });
          }
        }
      }

      // Search rivers
      if (
        (type === "all" || type === "river") &&
        country.rivers &&
        country.rivers.length > 0
      ) {
        for (const river of country.rivers) {
          if (
            this.matchesQuery(river.name, lowercaseQuery) ||
            this.matchesQuery(river.source, lowercaseQuery) ||
            this.matchesQuery(river.mouth, lowercaseQuery)
          ) {
            results.push({
              type: "river",
              title: river.name,
              subtitle: river.countries.join(", "),
              description: `${river.length} km long river flowing from ${river.source} to ${river.mouth}`,
              url: `/country/${country.iso2.toLowerCase()}#rivers`,
              badge: "River",
              metadata: {
                length: `${river.length} km`,
                source: river.source,
                mouth: river.mouth,
                countries: river.countries.join(", "),
              },
              countryCode: country.iso2,
              countryName: country.name,
            });
          }
        }
      }
    }

    // Sort results by relevance (exact matches first, then partial matches)
    return results
      .sort((a, b) => {
        const aExact = a.title.toLowerCase() === lowercaseQuery;
        const bExact = b.title.toLowerCase() === lowercaseQuery;

        if (aExact && !bExact) return -1;
        if (!aExact && bExact) return 1;

        const aStarts = a.title.toLowerCase().startsWith(lowercaseQuery);
        const bStarts = b.title.toLowerCase().startsWith(lowercaseQuery);

        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;

        return a.title.localeCompare(b.title);
      })
      .slice(0, 50); // Limit to 50 results
  }

  private static matchesQuery(text: string, query: string): boolean {
    return text.toLowerCase().includes(query);
  }

  private static formatPopulation(population: number): string {
    if (population >= 1000000000) {
      return `${(population / 1000000000).toFixed(1)}B`;
    } else if (population >= 1000000) {
      return `${(population / 1000000).toFixed(1)}M`;
    } else if (population >= 1000) {
      return `${(population / 1000).toFixed(1)}K`;
    }
    return population.toString();
  }

  static getSearchSuggestions(query: string): string[] {
    if (!query || query.length < 2) return [];

    // If not initialized, return empty suggestions
    if (!this.initialized || this.countries.length === 0) return [];

    const suggestions = new Set<string>();
    const lowercaseQuery = query.toLowerCase();

    for (const country of this.countries) {
      // Country names
      if (country.name.toLowerCase().includes(lowercaseQuery)) {
        suggestions.add(country.name);
      }

      // Capital cities
      if (
        country.capital &&
        country.capital.toLowerCase().includes(lowercaseQuery)
      ) {
        suggestions.add(country.capital);
      }

      // Famous cities
      if (country.famousCities && country.famousCities.length > 0) {
        for (const city of country.famousCities) {
          if (city.name.toLowerCase().includes(lowercaseQuery)) {
            suggestions.add(city.name);
          }
        }
      }

      // Landmarks
      if (country.landmarks && country.landmarks.length > 0) {
        for (const landmark of country.landmarks) {
          if (landmark.name.toLowerCase().includes(lowercaseQuery)) {
            suggestions.add(landmark.name);
          }
        }
      }
    }

    return Array.from(suggestions).slice(0, 8);
  }
}
