import type { Country } from "./types"

export async function getCountryData(countryCode: string): Promise<Country | null> {
  try {
    const response = await fetch(`/data/countries/${countryCode.toLowerCase()}.json`)
    if (!response.ok) return null
    return await response.json()
  } catch (error) {
    console.error("Error loading country data:", error)
    return null
  }
}

export async function getAllCountries(): Promise<string[]> {
  // Available country data files
  return [
    "us",
    "ca",
    "mx",
    "br",
    "ar",
    "cl",
    "pe",
    "co",
    "ve",
    "uy",
    "gb",
    "fr",
    "de",
    "it",
    "es",
    "pt",
    "nl",
    "be",
    "ch",
    "at",
    "se",
    "no",
    "dk",
    "fi",
    "is",
    "ie",
    "pl",
    "cz",
    "hu",
    "ro",
    "bg",
    "hr",
    "si",
    "sk",
    "lt",
    "lv",
    "ee",
    "ru",
    "ua",
    "by",
    "cn",
    "jp",
    "kr",
    "in",
    "th",
    "vn",
    "ph",
    "id",
    "my",
    "sg",
    "au",
    "nz",
    "fj",
    "pg",
    "sb",
    "vu",
    "nc",
    "pf",
    "ck",
    "to",
    "za",
    "ng",
    "ke",
    "et",
    "tz",
    "ug",
    "rw",
    "mw",
    "zm",
    "zw",
    "bw",
    "na",
    "sz",
    "ls",
    "mg",
    "mu",
    "sc",
    "cv",
    "st",
    "gq",
    "eg",
    "ly",
    "tn",
    "dz",
    "ma",
    "sd",
    "ss",
    "er",
    "dj",
    "so",
  ]
}

export function searchCountries(query: string, countries: Country[]): Country[] {
  const lowercaseQuery = query.toLowerCase()
  return countries.filter(
    (country) =>
      country.name.toLowerCase().includes(lowercaseQuery) ||
      country.capital.toLowerCase().includes(lowercaseQuery) ||
      country.region.toLowerCase().includes(lowercaseQuery) ||
      country.famousCities.some((city) => city.name.toLowerCase().includes(lowercaseQuery)) ||
      country.landmarks.some((landmark) => landmark.name.toLowerCase().includes(lowercaseQuery)) ||
      country.institutions.some((institution) => institution.name.toLowerCase().includes(lowercaseQuery)) ||
      country.rivers.some((river) => river.name.toLowerCase().includes(lowercaseQuery)),
  )
}

export function searchLandmarks(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase()
  const landmarks = []

  for (const country of countries) {
    for (const landmark of country.landmarks) {
      if (
        landmark.name.toLowerCase().includes(lowercaseQuery) ||
        landmark.city.toLowerCase().includes(lowercaseQuery) ||
        landmark.whyFamous.toLowerCase().includes(lowercaseQuery)
      ) {
        landmarks.push({ ...landmark, country: country.name, countryCode: country.iso2 })
      }
    }
  }

  return landmarks
}

export function searchInstitutions(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase()
  const institutions = []

  for (const country of countries) {
    for (const institution of country.institutions) {
      if (
        institution.name.toLowerCase().includes(lowercaseQuery) ||
        institution.city.toLowerCase().includes(lowercaseQuery) ||
        institution.type.toLowerCase().includes(lowercaseQuery)
      ) {
        institutions.push({ ...institution, country: country.name, countryCode: country.iso2 })
      }
    }
  }

  return institutions.sort((a, b) => a.globalRank - b.globalRank)
}

export function searchRivers(query: string, countries: Country[]) {
  const lowercaseQuery = query.toLowerCase()
  const rivers = []

  for (const country of countries) {
    for (const river of country.rivers) {
      if (
        river.name.toLowerCase().includes(lowercaseQuery) ||
        river.source.toLowerCase().includes(lowercaseQuery) ||
        river.mouth.toLowerCase().includes(lowercaseQuery) ||
        river.countries.some((c) => c.toLowerCase().includes(lowercaseQuery))
      ) {
        rivers.push({ ...river, country: country.name, countryCode: country.iso2 })
      }
    }
  }

  return rivers.sort((a, b) => b.length - a.length)
}

export function getCountryStats(countries: Country[]) {
  const totalPopulation = countries.reduce((sum, country) => sum + country.population, 0)
  const totalLandmarks = countries.reduce((sum, country) => sum + country.landmarks.length, 0)
  const totalInstitutions = countries.reduce((sum, country) => sum + country.institutions.length, 0)
  const totalRivers = countries.reduce((sum, country) => sum + country.rivers.length, 0)

  return {
    countries: countries.length,
    population: totalPopulation,
    landmarks: totalLandmarks,
    institutions: totalInstitutions,
    rivers: totalRivers,
  }
}

export function formatPopulation(population: number): string {
  if (population >= 1000000000) {
    return `${(population / 1000000000).toFixed(1)}B`
  } else if (population >= 1000000) {
    return `${(population / 1000000).toFixed(1)}M`
  } else if (population >= 1000) {
    return `${(population / 1000).toFixed(1)}K`
  }
  return population.toString()
}
