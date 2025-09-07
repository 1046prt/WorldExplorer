"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type {
  Country,
  GeologicalFormation,
  WaterBody,
  HistoricalFigure,
  UnescoSite,
  ColonialPeriod,
  PoliticalLeader,
  TradeItem,
  NationalFestival,
  TraditionalFood,
  Scientist,
  PopulationData,
} from "@/lib/types";
import { formatPopulation } from "@/lib/data-utils";
import {
  Globe,
  Users,
  Landmark,
  Building2,
  GraduationCap,
  DollarSign,
  Calendar,
  Mountain,
  Waves,
} from "lucide-react";
import "@/styles/comprehensive-country-data.css";

interface ComprehensiveCountryDataProps {
  countryData: Country;
}

export function ComprehensiveCountryData({
  countryData,
}: ComprehensiveCountryDataProps) {
  const country = countryData;

  return (
    <div className="comprehensive-container">
      <div className="comprehensive-header">
        <h1 className="comprehensive-title"> {country.name} at a Glance</h1>
        <p className="comprehensive-subtitle">
          Comprehensive information about {country.name}
        </p>
      </div>

      <Tabs defaultValue="basic" className="comprehensive-tabs">
        <TabsList className="comprehensive-tabs-list">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
          <TabsTrigger value="heritage">Heritage</TabsTrigger>
          <TabsTrigger value="politics">Politics</TabsTrigger>
          <TabsTrigger value="economy">Economy</TabsTrigger>
          <TabsTrigger value="culture">Culture</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        {/* Basic Information */}
        <TabsContent value="basic" className="comprehensive-tab-content">
          <div className="data-grid">
            <Card className="data-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <Globe className="card-icon" />
                  Country Details
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                <div className="data-row">
                  <span className="data-label">ISO2:</span>
                  <Badge variant="outline">{country.iso2}</Badge>
                </div>
                <div className="data-row">
                  <span className="data-label">ISO3:</span>
                  <Badge variant="outline">{country.iso3}</Badge>
                </div>
                <div className="data-row">
                  <span className="data-label">Region:</span>
                  <span className="data-value">{country.region}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Capital:</span>
                  <span className="data-value">{country.capital}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Population:</span>
                  <span className="data-value">
                    {formatPopulation(country.population)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="data-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <DollarSign className="card-icon" />
                  Currency
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                <div className="data-row">
                  <span className="data-label">Code:</span>
                  <Badge>{country.currency.code}</Badge>
                </div>
                <div className="data-row">
                  <span className="data-label">Name:</span>
                  <span className="data-value">{country.currency.name}</span>
                </div>
                <div className="data-row">
                  <span className="data-label">Symbol:</span>
                  <span className="data-value">{country.currency.symbol}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="data-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  Languages & Timezones
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                <div className="data-section">
                  <span className="data-label">Languages:</span>
                  <div className="badge-list">
                    {country.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="data-section">
                  <span className="data-label">Timezones:</span>
                  <div className="badge-list">
                    {country.timezones.map((tz) => (
                      <Badge key={tz} variant="outline">
                        {tz}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geography */}
        <TabsContent value="geography" className="comprehensive-tab-content">
          {country.geography && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <Mountain className="card-icon" />
                    Climate & Geography
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-section">
                    <span className="data-label">Climate Zones:</span>
                    <div className="badge-list">
                      {country.geography.climateZones?.map((zone: string) => (
                        <Badge key={zone} variant="secondary">
                          {zone}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Geological Formations
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.geography.geologicalFormations?.map(
                    (formation: GeologicalFormation) => (
                      <div key={formation.name} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">
                            {formation.name}
                          </span>
                          <Badge variant="outline">{formation.type}</Badge>
                        </div>
                        <p className="formation-desc">
                          {formation.description}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <Waves className="card-icon" />
                    Water Bodies
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.geography.majorWaterBodies?.map(
                    (body: WaterBody) => (
                      <div key={body.name} className="water-body-item">
                        <div className="water-body-header">
                          <span className="water-body-name">{body.name}</span>
                          <Badge variant="secondary">{body.type}</Badge>
                        </div>
                        {body.coastline && (
                          <p className="water-body-detail">
                            Coastline: {body.coastline}
                          </p>
                        )}
                        {body.description && (
                          <p className="water-body-detail">
                            {body.description}
                          </p>
                        )}
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Features (Cities, Landmarks, Rivers, Institutions) */}
        <TabsContent value="features" className="comprehensive-tab-content">
          <div className="features-grid">
            {/* Famous Cities */}
            <Card className="feature-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <Building2 className="card-icon" />
                  Famous Cities ({country.famousCities?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                {country.famousCities?.map((city) => (
                  <div key={city.slug} className="feature-item">
                    {city.image && (
                      <div className="feature-image">
                        <OptimizedImage
                          src={city.image}
                          alt={city.name}
                          width={60}
                          height={40}
                          className="feature-thumb"
                        />
                      </div>
                    )}
                    <div className="feature-content">
                      <h4 className="feature-name">{city.name}</h4>
                      <p className="feature-desc">{city.whyFamous}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Landmarks */}
            <Card className="feature-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <Landmark className="card-icon" />
                  Landmarks ({country.landmarks?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                {country.landmarks?.map((landmark) => (
                  <div key={landmark.slug} className="feature-item">
                    {landmark.imagePath && (
                      <div className="feature-image">
                        <OptimizedImage
                          src={landmark.imagePath}
                          alt={landmark.name}
                          width={60}
                          height={40}
                          className="feature-thumb"
                        />
                      </div>
                    )}
                    <div className="feature-content">
                      <h4 className="feature-name">{landmark.name}</h4>
                      <p className="feature-location">{landmark.city}</p>
                      <p className="feature-desc">{landmark.whyFamous}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Rivers */}
            <Card className="feature-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <Waves className="card-icon" />
                  Rivers ({country.rivers?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                {country.rivers?.map((river) => (
                  <div key={river.slug} className="feature-item">
                    {river.imagePath && (
                      <div className="feature-image">
                        <OptimizedImage
                          src={river.imagePath}
                          alt={river.name}
                          width={60}
                          height={40}
                          className="feature-thumb"
                        />
                      </div>
                    )}
                    <div className="feature-content">
                      <h4 className="feature-name">{river.name}</h4>
                      <p className="feature-detail">
                        Length: {river.length.toLocaleString()} km
                      </p>
                      <p className="feature-detail">Source: {river.source}</p>
                      <p className="feature-detail">Mouth: {river.mouth}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Institutions */}
            <Card className="feature-card">
              <CardHeader className="card-header-compact">
                <CardTitle className="card-title-compact">
                  <GraduationCap className="card-icon" />
                  Institutions ({country.institutions?.length || 0})
                </CardTitle>
              </CardHeader>
              <CardContent className="card-content-compact">
                {country.institutions?.map((institution) => (
                  <div key={institution.slug} className="feature-item">
                    {institution.imagePath && (
                      <div className="feature-image">
                        <OptimizedImage
                          src={institution.imagePath}
                          alt={institution.name}
                          width={60}
                          height={40}
                          className="feature-thumb"
                        />
                      </div>
                    )}
                    <div className="feature-content">
                      <h4 className="feature-name">{institution.name}</h4>
                      <p className="feature-location">{institution.city}</p>
                      <div className="institution-meta">
                        <Badge variant="outline">
                          Rank #{institution.globalRank}
                        </Badge>
                        <Badge variant="secondary">
                          Est. {institution.founded}
                        </Badge>
                      </div>
                      <p className="feature-detail">{institution.type}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Additional tabs would be implemented similarly */}
        <TabsContent value="heritage" className="comprehensive-tab-content">
          {country.heritage && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <Calendar className="card-icon" />
                    Independence & Founding
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-row">
                    <span className="data-label">Independence Date:</span>
                    <span className="data-value">
                      {country.heritage.independenceDate}
                    </span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Founding Event:</span>
                    <span className="data-value">
                      {country.heritage.foundingEvent}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Historical Figures
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.heritage.majorHistoricalFigures?.map(
                    (figure: HistoricalFigure) => (
                      <div key={figure.name} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">{figure.name}</span>
                          <Badge variant="outline">{figure.role}</Badge>
                        </div>
                        <p className="formation-desc">
                          {figure.period} - {figure.achievement}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    UNESCO World Heritage Sites
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.heritage.unescoSites?.map((site: UnescoSite) => (
                    <div key={site.name} className="formation-item">
                      <div className="formation-header">
                        <span className="formation-name">{site.name}</span>
                        <Badge
                          variant={
                            site.type === "Cultural" ? "default" : "secondary"
                          }
                        >
                          {site.type}
                        </Badge>
                      </div>
                      <p className="formation-desc">Inscribed: {site.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Colonial History
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.heritage.colonialHistory?.map(
                    (period: ColonialPeriod, index: number) => (
                      <div key={index} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">
                            {period.period}
                          </span>
                        </div>
                        <p className="formation-desc">{period.description}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="politics" className="comprehensive-tab-content">
          {country.politics && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Government
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-row">
                    <span className="data-label">Type:</span>
                    <span className="data-value">
                      {country.politics.governmentType}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Current Leaders
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.politics.currentLeaders?.map(
                    (leader: PoliticalLeader, index: number) => (
                      <div key={index} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">{leader.name}</span>
                          <Badge variant="outline">{leader.position}</Badge>
                        </div>
                        <p className="formation-desc">
                          {leader.party} • {leader.termStart}
                          {leader.termEnd && ` - ${leader.termEnd}`}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    International Memberships
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="badge-list">
                    {country.politics.internationalMemberships?.map(
                      (membership: string) => (
                        <Badge key={membership} variant="secondary">
                          {membership}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="economy" className="comprehensive-tab-content">
          {country.economy && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <DollarSign className="card-icon" />
                    Economic Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-row">
                    <span className="data-label">GDP:</span>
                    <span className="data-value">
                      ${(country.economy.gdp / 1e12).toFixed(2)}T
                    </span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">GDP Per Capita:</span>
                    <span className="data-value">
                      ${country.economy.gdpPerCapita?.toLocaleString()}
                    </span>
                  </div>
                  {country.economy.employmentRate && (
                    <div className="data-row">
                      <span className="data-label">Employment Rate:</span>
                      <span className="data-value">
                        {country.economy.employmentRate}%
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Major Industries
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="badge-list">
                    {country.economy.majorIndustries?.map(
                      (industry: string) => (
                        <Badge key={industry} variant="secondary">
                          {industry}
                        </Badge>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Top Exports
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.economy.topExports?.map((exportItem: TradeItem) => (
                    <div key={exportItem.product} className="data-row">
                      <span className="data-label">{exportItem.product}:</span>
                      <span className="data-value">
                        ${(exportItem.value / 1e9).toFixed(1)}B
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Top Imports
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.economy.topImports?.map((importItem: TradeItem) => (
                    <div key={importItem.product} className="data-row">
                      <span className="data-label">{importItem.product}:</span>
                      <span className="data-value">
                        ${(importItem.value / 1e9).toFixed(1)}B
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {country.economy.employmentSectors && (
                <Card className="data-card">
                  <CardHeader className="card-header-compact">
                    <CardTitle className="card-title-compact">
                      Employment by Sector
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="card-content-compact">
                    <div className="data-row">
                      <span className="data-label">Services:</span>
                      <span className="data-value">
                        {country.economy.employmentSectors.services}%
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Industry:</span>
                      <span className="data-value">
                        {country.economy.employmentSectors.industry}%
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="data-label">Agriculture:</span>
                      <span className="data-value">
                        {country.economy.employmentSectors.agriculture}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="culture" className="comprehensive-tab-content">
          {country.culture && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Languages & Religion
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-section">
                    <span className="data-label">Official Languages:</span>
                    <div className="badge-list">
                      {country.culture.officialLanguages?.map(
                        (lang: string) => (
                          <Badge key={lang} variant="default">
                            {lang}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <div className="data-section">
                    <span className="data-label">Regional Languages:</span>
                    <div className="badge-list">
                      {country.culture.regionalLanguages?.map(
                        (lang: string) => (
                          <Badge key={lang} variant="secondary">
                            {lang}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Religious Demographics
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.culture.religionDemographics &&
                    Object.entries(country.culture.religionDemographics).map(
                      ([religion, percentage]) => (
                        <div key={religion} className="data-row">
                          <span className="data-label">{religion}:</span>
                          <span className="data-value">
                            {String(percentage)}%
                          </span>
                        </div>
                      )
                    )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    National Festivals
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.culture.nationalFestivals?.map(
                    (festival: NationalFestival) => (
                      <div key={festival.name} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">
                            {festival.name}
                          </span>
                          <Badge variant="outline">{festival.date}</Badge>
                        </div>
                        <p className="formation-desc">{festival.description}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Traditional Foods
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.culture.traditionalFoods?.map(
                    (food: TraditionalFood) => (
                      <div key={food.name} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">{food.name}</span>
                        </div>
                        <p className="formation-desc">{food.description}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    National Symbols
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.culture.nationalSymbols &&
                    Object.entries(country.culture.nationalSymbols).map(
                      ([symbol, value]) => (
                        <div key={symbol} className="data-row">
                          <span className="data-label">
                            {symbol.charAt(0).toUpperCase() + symbol.slice(1)}:
                          </span>
                          <span className="data-value">{String(value)}</span>
                        </div>
                      )
                    )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="education" className="comprehensive-tab-content">
          {country.education && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <GraduationCap className="card-icon" />
                    Education Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  <div className="data-row">
                    <span className="data-label">Literacy Rate:</span>
                    <span className="data-value">
                      {country.education.literacyRate}%
                    </span>
                  </div>
                  <div className="data-row">
                    <span className="data-label">Nobel Prize Winners:</span>
                    <span className="data-value">
                      {country.education.nobelPrizeWinners}
                    </span>
                  </div>
                  <div className="data-section">
                    <span className="data-label">Education System:</span>
                    <p className="formation-desc">
                      {country.education.educationSystem}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Famous Scientists
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.education.famousScientists?.map(
                    (scientist: Scientist) => (
                      <div key={scientist.name} className="formation-item">
                        <div className="formation-header">
                          <span className="formation-name">
                            {scientist.name}
                          </span>
                          <Badge variant="outline">{scientist.field}</Badge>
                        </div>
                        <p className="formation-desc">
                          {scientist.achievement}
                        </p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="demographics" className="comprehensive-tab-content">
          {country.demographics && (
            <div className="data-grid">
              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    <Users className="card-icon" />
                    Population Growth
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.demographics.populationGrowth?.map(
                    (data: PopulationData) => (
                      <div key={data.year} className="data-row">
                        <span className="data-label">{data.year}:</span>
                        <span className="data-value">
                          {data.population.toLocaleString()}
                        </span>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Urban vs Rural
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.demographics.urbanRural && (
                    <>
                      <div className="data-row">
                        <span className="data-label">Urban:</span>
                        <span className="data-value">
                          {country.demographics.urbanRural.urban}%
                        </span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Rural:</span>
                        <span className="data-value">
                          {country.demographics.urbanRural.rural}%
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Life Expectancy
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.demographics.lifeExpectancy && (
                    <>
                      <div className="data-row">
                        <span className="data-label">Total:</span>
                        <span className="data-value">
                          {country.demographics.lifeExpectancy.total} years
                        </span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Male:</span>
                        <span className="data-value">
                          {country.demographics.lifeExpectancy.male} years
                        </span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Female:</span>
                        <span className="data-value">
                          {country.demographics.lifeExpectancy.female} years
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <Card className="data-card">
                <CardHeader className="card-header-compact">
                  <CardTitle className="card-title-compact">
                    Age Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent className="card-content-compact">
                  {country.demographics.ageDistribution && (
                    <>
                      <div className="data-row">
                        <span className="data-label">Youth (0-17):</span>
                        <span className="data-value">
                          {country.demographics.ageDistribution.youth}%
                        </span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Working Age (18-64):</span>
                        <span className="data-value">
                          {country.demographics.ageDistribution.workingAge}%
                        </span>
                      </div>
                      <div className="data-row">
                        <span className="data-label">Elderly (65+):</span>
                        <span className="data-value">
                          {country.demographics.ageDistribution.elderly}%
                        </span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
