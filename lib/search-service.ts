import type { Country } from "./types";
import { getAllCountries, getCountryData } from "./data-utils";
import {
  CountryAPIService,
  type Country as APICountry,
} from "./country-api-service";

export interface SearchResult {
  type: "country" | "landmark" | "institution" | "river" | "city" | "state";
  title: string;
  subtitle: string;
  description: string;
  url: string;
  badge?: string;
  image?: string;
  metadata?: Record<string, string>;
  countryCode?: string;
  countryName?: string;
  coordinates?: { lat: string; lng: string };
}

interface EnhancedSearchResult extends SearchResult {
  relevanceScore: number;
}

export class SearchService {
  private static countries: Country[] = [];
  private static apiCountries: APICountry[] = [];
  private static initialized = false;
  private static apiInitialized = false;

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
      this.initialized = true;
    }
  }

  static async initializeAPI() {
    if (this.apiInitialized) return;

    try {
      this.apiCountries = await CountryAPIService.getAllCountries();
      this.apiInitialized = true;
    } catch (error) {
      console.error("Failed to initialize API search service:", error);
      this.apiInitialized = true;
    }
  }

  static async searchAPI(query: string, limit = 20): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    await this.initializeAPI();

    const results: EnhancedSearchResult[] = [];
    const searchTerm = query.toLowerCase().trim();

    try {
      // Search countries from API
      const matchingCountries = this.apiCountries
        .filter(
          (country) =>
            country.name.toLowerCase().includes(searchTerm) ||
            country.iso2.toLowerCase().includes(searchTerm) ||
            country.iso3.toLowerCase().includes(searchTerm) ||
            country.capital?.toLowerCase().includes(searchTerm) ||
            country.region.toLowerCase().includes(searchTerm)
        )
        .slice(0, 10);

      // Add country results
      for (const country of matchingCountries) {
        const relevanceScore = this.calculateRelevanceScore(
          country.name,
          searchTerm
        );
        results.push({
          type: "country",
          title: country.name,
          subtitle: `${country.capital} • ${country.region}`,
          description: `Population: ${this.formatPopulation(
            parseInt(country.numeric_code) * 1000000
          )} • Currency: ${country.currency_name}`,
          url: `/country/${country.iso2.toLowerCase()}`,
          badge: country.iso2,
          image: country.emoji,
          metadata: {
            capital: country.capital,
            region: country.region,
            currency: country.currency_name,
            iso2: country.iso2,
            iso3: country.iso3,
          },
          countryCode: country.iso2,
          countryName: country.name,
          coordinates: { lat: country.latitude, lng: country.longitude },
          relevanceScore,
        });
      }

      // Search states and cities for top matching countries
      if (results.length < limit && matchingCountries.length > 0) {
        for (const country of matchingCountries.slice(0, 3)) {
          try {
            // Search states
            const states = await CountryAPIService.getStatesByCountry(
              country.iso2
            );
            const matchingStates = states
              .filter((state) => state.name.toLowerCase().includes(searchTerm))
              .slice(0, 5);

            for (const state of matchingStates) {
              const relevanceScore = this.calculateRelevanceScore(
                state.name,
                searchTerm
              );
              results.push({
                type: "state",
                title: state.name,
                subtitle: `State in ${state.country_name}`,
                description: `Administrative division • ${state.type}`,
                url: `/country/${state.country_code.toLowerCase()}#states`,
                badge: "State",
                metadata: {
                  country: state.country_name,
                  type: state.type,
                  stateCode: state.state_code,
                },
                countryCode: state.country_code,
                countryName: state.country_name,
                coordinates: { lat: state.latitude, lng: state.longitude },
                relevanceScore,
              });
            }

            // Search cities
            const cities = await CountryAPIService.getCitiesByCountry(
              country.iso2
            );
            const matchingCities = cities
              .filter((city) => city.name.toLowerCase().includes(searchTerm))
              .slice(0, 8);

            for (const city of matchingCities) {
              const relevanceScore = this.calculateRelevanceScore(
                city.name,
                searchTerm
              );
              results.push({
                type: "city",
                title: city.name,
                subtitle: `${city.state_name}, ${city.country_name}`,
                description: `City in ${city.state_name} state`,
                url: `/country/${city.country_code.toLowerCase()}#cities`,
                badge: "City",
                metadata: {
                  state: city.state_name,
                  country: city.country_name,
                  stateCode: city.state_code,
                },
                countryCode: city.country_code,
                countryName: city.country_name,
                coordinates: { lat: city.latitude, lng: city.longitude },
                relevanceScore,
              });
            }
          } catch (error) {
            console.warn(`Error searching in ${country.name}:`, error);
          }
        }
      }

      // Sort by relevance score and limit results
      // Sort by relevance score and limit results
      return (
        results
          .sort((a, b) => b.relevanceScore - a.relevanceScore)
          .slice(0, limit)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ relevanceScore, ...result }) => result)
      );
    } catch (error) {
      console.error("API Search error:", error);
      return [];
    }
  }

  private static calculateRelevanceScore(text: string, query: string): number {
    const textLower = text.toLowerCase();
    const queryLower = query.toLowerCase();

    if (textLower === queryLower) return 100;
    if (textLower.startsWith(queryLower)) return 80;
    if (textLower.includes(` ${queryLower}`)) return 60;
    if (textLower.includes(queryLower)) return 40;

    return 0;
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

    const suggestions = new Set<string>();
    const lowercaseQuery = query.toLowerCase();

    // API-based suggestions
    if (this.apiInitialized && this.apiCountries.length > 0) {
      for (const country of this.apiCountries) {
        if (country.name.toLowerCase().includes(lowercaseQuery)) {
          suggestions.add(country.name);
        }
        if (
          country.capital &&
          country.capital.toLowerCase().includes(lowercaseQuery)
        ) {
          suggestions.add(country.capital);
        }
        if (country.region.toLowerCase().includes(lowercaseQuery)) {
          suggestions.add(country.region);
        }
      }
    }

    // Fallback to static data if API not available
    if (
      suggestions.size === 0 &&
      this.initialized &&
      this.countries.length > 0
    ) {
      for (const country of this.countries) {
        if (country.name.toLowerCase().includes(lowercaseQuery)) {
          suggestions.add(country.name);
        }
        if (
          country.capital &&
          country.capital.toLowerCase().includes(lowercaseQuery)
        ) {
          suggestions.add(country.capital);
        }
        if (country.famousCities && country.famousCities.length > 0) {
          for (const city of country.famousCities) {
            if (city.name.toLowerCase().includes(lowercaseQuery)) {
              suggestions.add(city.name);
            }
          }
        }
        if (country.landmarks && country.landmarks.length > 0) {
          for (const landmark of country.landmarks) {
            if (landmark.name.toLowerCase().includes(lowercaseQuery)) {
              suggestions.add(landmark.name);
            }
          }
        }
      }
    }

    return Array.from(suggestions).slice(0, 8);
  }

  // Enhanced search that combines API and static data
  static async searchEnhanced(
    query: string,
    type: string = "all",
    useAPI: boolean = true
  ): Promise<SearchResult[]> {
    if (!query || query.length < 2) return [];

    const results: SearchResult[] = [];

    // Try API search first if enabled
    if (useAPI) {
      try {
        const apiResults = await this.searchAPI(query, 15);
        results.push(...apiResults);
      } catch (error) {
        console.warn(
          "API search failed, falling back to static search:",
          error
        );
      }
    }

    // Add static search results if we need more or if API failed
    if (results.length < 20) {
      const staticResults = await this.search(query, type);

      // Filter out duplicates based on title and type
      const existingKeys = new Set(results.map((r) => `${r.type}-${r.title}`));
      const uniqueStaticResults = staticResults.filter(
        (r) => !existingKeys.has(`${r.type}-${r.title}`)
      );

      results.push(...uniqueStaticResults);
    }

    return results.slice(0, 50);
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
}
