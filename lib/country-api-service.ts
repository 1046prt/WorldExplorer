/**
 * Country State City API Service
 * Provides access to comprehensive geographical data
 */

export interface Country {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  timezones: TimezoneInfo[];
  translations: Record<string, string>;
  latitude: string;
  longitude: string;
  emoji: string;
  emojiU: string;
}

export interface State {
  id: number;
  name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  state_code: string;
  type: string;
  latitude: string;
  longitude: string;
}

export interface City {
  id: number;
  name: string;
  state_id: number;
  state_code: string;
  state_name: string;
  country_id: number;
  country_code: string;
  country_name: string;
  latitude: string;
  longitude: string;
  wikiDataId?: string;
}

export interface TimezoneInfo {
  zoneName: string;
  gmtOffset: number;
  gmtOffsetName: string;
  abbreviation: string;
  tzName: string;
}

export interface APIResponse<T> {
  error: boolean;
  msg: string;
  data: T;
}

class APICache {
  private static cache = new Map<
    string,
    { data: unknown; timestamp: number }
  >();
  private static cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours

  static get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheExpiry) {
      return cached.data as T;
    }
    return null;
  }

  static set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  static clear(): void {
    this.cache.clear();
  }

  static clearExpired(): void {
    for (const [key, value] of this.cache.entries()) {
      if (Date.now() - value.timestamp >= this.cacheExpiry) {
        this.cache.delete(key);
      }
    }
  }
}

export class CountryAPIService {
  private static readonly baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.countrystatecity.in/v1";
  private static readonly apiKey = process.env.COUNTRY_API_KEY;

  private static getHeaders(): HeadersInit {
    if (!this.apiKey) {
      throw new Error(
        "Country API key not found. Please check your environment variables."
      );
    }

    return {
      "X-CSCAPI-KEY": this.apiKey,
      "Content-Type": "application/json",
    };
  }

  private static async fetchWithCache<T>(
    endpoint: string,
    cacheKey: string
  ): Promise<T> {
    // Check cache first
    const cached = APICache.get<T>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders(),
        next: { revalidate: 86400 }, // Cache for 24 hours
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} - ${response.statusText}`
        );
      }

      const data = await response.json();

      // Cache the result
      APICache.set(cacheKey, data);

      return data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  /**
   * Get all countries
   */
  static async getAllCountries(): Promise<Country[]> {
    return this.fetchWithCache<Country[]>("/countries", "all_countries");
  }

  /**
   * Get specific country details
   */
  static async getCountryDetails(countryCode: string): Promise<Country> {
    if (!countryCode) {
      throw new Error("Country code is required");
    }

    return this.fetchWithCache<Country>(
      `/countries/${countryCode.toUpperCase()}`,
      `country_${countryCode.toLowerCase()}`
    );
  }

  /**
   * Get all states for a country
   */
  static async getStatesByCountry(countryCode: string): Promise<State[]> {
    if (!countryCode) {
      throw new Error("Country code is required");
    }

    return this.fetchWithCache<State[]>(
      `/countries/${countryCode.toUpperCase()}/states`,
      `states_${countryCode.toLowerCase()}`
    );
  }

  /**
   * Get specific state details
   */
  static async getStateDetails(
    countryCode: string,
    stateCode: string
  ): Promise<State> {
    if (!countryCode || !stateCode) {
      throw new Error("Country code and state code are required");
    }

    return this.fetchWithCache<State>(
      `/countries/${countryCode.toUpperCase()}/states/${stateCode}`,
      `state_${countryCode.toLowerCase()}_${stateCode.toLowerCase()}`
    );
  }

  /**
   * Get all cities for a country
   */
  static async getCitiesByCountry(countryCode: string): Promise<City[]> {
    if (!countryCode) {
      throw new Error("Country code is required");
    }

    return this.fetchWithCache<City[]>(
      `/countries/${countryCode.toUpperCase()}/cities`,
      `cities_${countryCode.toLowerCase()}`
    );
  }

  /**
   * Get cities for a specific state
   */
  static async getCitiesByState(
    countryCode: string,
    stateCode: string
  ): Promise<City[]> {
    if (!countryCode || !stateCode) {
      throw new Error("Country code and state code are required");
    }

    return this.fetchWithCache<City[]>(
      `/countries/${countryCode.toUpperCase()}/states/${stateCode}/cities`,
      `cities_${countryCode.toLowerCase()}_${stateCode.toLowerCase()}`
    );
  }

  /**
   * Get complete hierarchy for a country (country + states + cities)
   */
  static async getCountryHierarchy(countryCode: string): Promise<{
    country: Country;
    states: State[];
    cities: City[];
  }> {
    try {
      const [country, states, cities] = await Promise.all([
        this.getCountryDetails(countryCode),
        this.getStatesByCountry(countryCode),
        this.getCitiesByCountry(countryCode),
      ]);

      return { country, states, cities };
    } catch (error) {
      console.error("Error fetching country hierarchy:", error);
      throw error;
    }
  }

  /**
   * Search countries by name or ISO code
   */
  static async searchCountries(query: string): Promise<Country[]> {
    const countries = await this.getAllCountries();
    const searchTerm = query.toLowerCase().trim();

    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm) ||
        country.iso2.toLowerCase().includes(searchTerm) ||
        country.iso3.toLowerCase().includes(searchTerm) ||
        country.capital?.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get countries by region
   */
  static async getCountriesByRegion(region: string): Promise<Country[]> {
    const countries = await this.getAllCountries();
    return countries.filter(
      (country) => country.region.toLowerCase() === region.toLowerCase()
    );
  }

  /**
   * Get countries by subregion
   */
  static async getCountriesBySubregion(subregion: string): Promise<Country[]> {
    const countries = await this.getAllCountries();
    return countries.filter(
      (country) => country.subregion.toLowerCase() === subregion.toLowerCase()
    );
  }

  /**
   * Clear all cached data
   */
  static clearCache(): void {
    APICache.clear();
  }

  /**
   * Clear expired cache entries
   */
  static clearExpiredCache(): void {
    APICache.clearExpired();
  }
}

export { APICache };
