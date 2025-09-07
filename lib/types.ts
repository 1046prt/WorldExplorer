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
  // Additional optional properties
  geography?: Geography;
  heritage?: Heritage;
  politics?: Politics;
  economy?: Economy;
  culture?: Culture;
  education?: Education;
  demographics?: Demographics;
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
  imagePath: string;
  pathCoordinates: Coordinates[];
}

export interface Institution {
  slug: string;
  name: string;
  city: string;
  founded: number;
  globalRank: number;
  type: string;
  imagePath: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

// Additional interfaces for comprehensive data
export interface Geography {
  climateZones?: string[];
  geologicalFormations?: GeologicalFormation[];
  majorWaterBodies?: WaterBody[];
  area?: number;
}

export interface GeologicalFormation {
  name: string;
  type: string;
  description: string;
}

export interface WaterBody {
  name: string;
  type: string;
  coastline?: string;
  description?: string;
}

export interface Heritage {
  independenceDate?: string;
  foundingEvent?: string;
  majorHistoricalFigures?: HistoricalFigure[];
  unescoSites?: UnescoSite[];
  colonialHistory?: ColonialPeriod[];
}

export interface HistoricalFigure {
  name: string;
  role: string;
  period: string;
  achievement: string;
}

export interface UnescoSite {
  name: string;
  type: "Cultural" | "Natural" | "Mixed";
  year: number;
}

export interface ColonialPeriod {
  period: string;
  description: string;
}

export interface Politics {
  governmentType?: string;
  currentLeaders?: PoliticalLeader[];
  internationalMemberships?: string[];
}

export interface PoliticalLeader {
  name: string;
  position: string;
  party: string;
  termStart: string;
  termEnd?: string;
}

export interface Economy {
  gdp: number;
  gdpPerCapita?: number;
  employmentRate?: number;
  majorIndustries?: string[];
  topExports?: TradeItem[];
  topImports?: TradeItem[];
  employmentSectors?: EmploymentSectors;
}

export interface TradeItem {
  product: string;
  value: number;
}

export interface EmploymentSectors {
  services: number;
  industry: number;
  agriculture: number;
}

export interface Culture {
  officialLanguages?: string[];
  regionalLanguages?: string[];
  religionDemographics?: Record<string, number>;
  nationalFestivals?: NationalFestival[];
  traditionalFoods?: TraditionalFood[];
  nationalSymbols?: Record<string, string>;
}

export interface NationalFestival {
  name: string;
  date: string;
  description: string;
}

export interface TraditionalFood {
  name: string;
  description: string;
}

export interface Education {
  literacyRate: number;
  nobelPrizeWinners: number;
  educationSystem: string;
  famousScientists?: Scientist[];
}

export interface Scientist {
  name: string;
  field: string;
  achievement: string;
}

export interface Demographics {
  populationGrowth?: PopulationData[];
  urbanRural?: UrbanRuralDistribution;
  lifeExpectancy?: LifeExpectancy;
  ageDistribution?: AgeDistribution;
}

export interface PopulationData {
  year: number;
  population: number;
}

export interface UrbanRuralDistribution {
  urban: number;
  rural: number;
}

export interface LifeExpectancy {
  total: number;
  male: number;
  female: number;
}

export interface AgeDistribution {
  youth: number;
  workingAge: number;
  elderly: number;
}
