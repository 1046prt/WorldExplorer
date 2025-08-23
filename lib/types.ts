export interface Country {
  iso2: string;
  iso3: string;
  name: string;
  region: string;
  capital: string;
  population: number;
  image?: string;
  flag?: string;
  currency: Currency;
  languages: string[];
  timezones: string[];
  history: HistoryEvent[];
  states?: State[];
  famousCities: FamousCity[];
  landmarks: Landmark[];
  rivers: River[];
  institutions: Institution[];
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  image: string;
}

export interface HistoryEvent {
  year: number;
  description: string;
}

export interface State {
  name: string;
  capital: string;
  slug: string;
}

export interface FamousCity {
  name: string;
  whyFamous: string;
  slug: string;
  image?: string;
}

export interface Landmark {
  slug: string;
  name: string;
  city: string;
  coordinates: Coordinates;
  whyFamous: string;
  imagePath: string;
}

export interface River {
  slug: string;
  name: string;
  length: number;
  countries: string[];
  source: string;
  mouth: string;
  pathCoordinates: Coordinates[];
}

export interface Institution {
  slug: string;
  name: string;
  city: string;
  founded: number;
  globalRank: number;
  type: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
