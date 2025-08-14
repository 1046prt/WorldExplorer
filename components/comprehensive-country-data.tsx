"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Trophy, Landmark, GraduationCap, Plane, Factory, Globe } from "lucide-react"

interface CountryData {
  geography?: any
  heritage?: any
  politics?: any
  economy?: any
  culture?: any
  education?: any
  tourism?: any
  demographics?: any
  scienceTechnology?: any
  sportsEntertainment?: any
}

interface ComprehensiveCountryDataProps {
  countryData: CountryData
}

export function ComprehensiveCountryData({ countryData }: ComprehensiveCountryDataProps) {
  const [activeTab, setActiveTab] = useState("geography")

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 lg:grid-cols-10">
          <TabsTrigger value="geography" className="text-xs">
            Geography
          </TabsTrigger>
          <TabsTrigger value="heritage" className="text-xs">
            Heritage
          </TabsTrigger>
          <TabsTrigger value="politics" className="text-xs">
            Politics
          </TabsTrigger>
          <TabsTrigger value="economy" className="text-xs">
            Economy
          </TabsTrigger>
          <TabsTrigger value="culture" className="text-xs">
            Culture
          </TabsTrigger>
          <TabsTrigger value="education" className="text-xs">
            Education
          </TabsTrigger>
          <TabsTrigger value="tourism" className="text-xs">
            Tourism
          </TabsTrigger>
          <TabsTrigger value="demographics" className="text-xs">
            Demographics
          </TabsTrigger>
          <TabsTrigger value="science" className="text-xs">
            Science
          </TabsTrigger>
          <TabsTrigger value="sports" className="text-xs">
            Sports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="geography" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geography & Environment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.geography?.climateZones && (
                <div>
                  <h4 className="font-semibold mb-2">Climate Zones</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.geography.climateZones.map((zone: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {zone}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {countryData.geography?.geologicalFormations && (
                <div>
                  <h4 className="font-semibold mb-2">Geological Formations</h4>
                  <div className="grid gap-3">
                    {countryData.geography.geologicalFormations.map((formation: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h5 className="font-medium">{formation.name}</h5>
                        <p className="text-sm text-muted-foreground">{formation.type}</p>
                        <p className="text-sm mt-1">{formation.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.geography?.naturalDisasters && (
                <div>
                  <h4 className="font-semibold mb-2">Notable Natural Disasters</h4>
                  <div className="grid gap-3">
                    {countryData.geography.naturalDisasters.map((disaster: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{disaster.name}</h5>
                          <Badge variant="outline">{disaster.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{disaster.type}</p>
                        <p className="text-sm mt-1">{disaster.impact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="heritage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5" />
                History & Heritage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.heritage?.independenceDate && (
                <div>
                  <h4 className="font-semibold mb-2">Independence</h4>
                  <p className="text-lg">{countryData.heritage.independenceDate}</p>
                  <p className="text-sm text-muted-foreground">{countryData.heritage.foundingEvent}</p>
                </div>
              )}

              {countryData.heritage?.majorHistoricalFigures && (
                <div>
                  <h4 className="font-semibold mb-2">Major Historical Figures</h4>
                  <div className="grid gap-3">
                    {countryData.heritage.majorHistoricalFigures.map((figure: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{figure.name}</h5>
                          <Badge variant="outline">{figure.period}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{figure.role}</p>
                        <p className="text-sm mt-1">{figure.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.heritage?.unescoSites && (
                <div>
                  <h4 className="font-semibold mb-2">UNESCO World Heritage Sites</h4>
                  <div className="grid gap-2">
                    {countryData.heritage.unescoSites.map((site: any, index: number) => (
                      <div key={index} className="flex justify-between items-center p-2 border rounded">
                        <span className="font-medium">{site.name}</span>
                        <div className="flex gap-2">
                          <Badge variant={site.type === "Cultural" ? "default" : "secondary"}>{site.type}</Badge>
                          <Badge variant="outline">{site.year}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="politics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Politics & Governance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.politics?.currentLeaders && (
                <div>
                  <h4 className="font-semibold mb-2">Current Leaders</h4>
                  <div className="grid gap-3">
                    {countryData.politics.currentLeaders.map((leader: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-medium">{leader.name}</h5>
                            <p className="text-sm text-muted-foreground">{leader.position}</p>
                          </div>
                          <div className="text-right">
                            <Badge>{leader.party}</Badge>
                            <p className="text-xs text-muted-foreground mt-1">
                              {leader.termStart} - {leader.termEnd || "Present"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.politics?.governmentType && (
                <div>
                  <h4 className="font-semibold mb-2">Government Type</h4>
                  <p className="text-lg">{countryData.politics.governmentType}</p>
                </div>
              )}

              {countryData.politics?.internationalMemberships && (
                <div>
                  <h4 className="font-semibold mb-2">International Memberships</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.politics.internationalMemberships.map((membership: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {membership}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Factory className="h-5 w-5" />
                Economy & Trade
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.economy?.gdp && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">GDP</h4>
                    <p className="text-2xl font-bold">${(countryData.economy.gdp / 1000000000000).toFixed(2)}T</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">GDP Per Capita</h4>
                    <p className="text-2xl font-bold">${countryData.economy.gdpPerCapita?.toLocaleString()}</p>
                  </div>
                </div>
              )}

              {countryData.economy?.majorIndustries && (
                <div>
                  <h4 className="font-semibold mb-2">Major Industries</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.economy.majorIndustries.map((industry: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {industry}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {countryData.economy?.employmentSectors && (
                <div>
                  <h4 className="font-semibold mb-2">Employment by Sector</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Services</span>
                        <span>{countryData.economy.employmentSectors.services}%</span>
                      </div>
                      <Progress value={countryData.economy.employmentSectors.services} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Industry</span>
                        <span>{countryData.economy.employmentSectors.industry}%</span>
                      </div>
                      <Progress value={countryData.economy.employmentSectors.industry} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Agriculture</span>
                        <span>{countryData.economy.employmentSectors.agriculture}%</span>
                      </div>
                      <Progress value={countryData.economy.employmentSectors.agriculture} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Culture & Society</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.culture?.nationalSymbols && (
                <div>
                  <h4 className="font-semibold mb-2">National Symbols</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Flag:</span>
                      <p className="font-medium">{countryData.culture.nationalSymbols.flag}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Bird:</span>
                      <p className="font-medium">{countryData.culture.nationalSymbols.bird}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Flower:</span>
                      <p className="font-medium">{countryData.culture.nationalSymbols.flower}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Animal:</span>
                      <p className="font-medium">{countryData.culture.nationalSymbols.animal}</p>
                    </div>
                  </div>
                </div>
              )}

              {countryData.culture?.traditionalFoods && (
                <div>
                  <h4 className="font-semibold mb-2">Traditional Foods</h4>
                  <div className="grid gap-3">
                    {countryData.culture.traditionalFoods.map((food: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h5 className="font-medium">{food.name}</h5>
                        <p className="text-sm text-muted-foreground">{food.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.culture?.nationalFestivals && (
                <div>
                  <h4 className="font-semibold mb-2">National Festivals</h4>
                  <div className="grid gap-3">
                    {countryData.culture.nationalFestivals.map((festival: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{festival.name}</h5>
                          <Badge variant="outline">{festival.date}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{festival.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education & Science
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.education?.literacyRate && (
                <div>
                  <h4 className="font-semibold mb-2">Literacy Rate</h4>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Progress value={countryData.education.literacyRate} />
                    </div>
                    <span className="text-2xl font-bold">{countryData.education.literacyRate}%</span>
                  </div>
                </div>
              )}

              {countryData.education?.famousScientists && (
                <div>
                  <h4 className="font-semibold mb-2">Famous Scientists</h4>
                  <div className="grid gap-3">
                    {countryData.education.famousScientists.map((scientist: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h5 className="font-medium">{scientist.name}</h5>
                        <p className="text-sm text-muted-foreground">{scientist.field}</p>
                        <p className="text-sm mt-1">{scientist.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.education?.nobelPrizeWinners && (
                <div>
                  <h4 className="font-semibold mb-2">Nobel Prize Winners</h4>
                  <p className="text-3xl font-bold text-center">{countryData.education.nobelPrizeWinners}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tourism" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Tourism & Travel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.tourism?.mostVisitedCities && (
                <div>
                  <h4 className="font-semibold mb-2">Most Visited Cities</h4>
                  <div className="grid gap-3">
                    {countryData.tourism.mostVisitedCities.map((city: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{city.name}</h5>
                          <Badge>{city.visitors?.toLocaleString()} visitors</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {city.attractions?.map((attraction: string, idx: number) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {attraction}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.tourism?.adventureActivities && (
                <div>
                  <h4 className="font-semibold mb-2">Adventure Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.tourism.adventureActivities.map((activity: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {activity}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {countryData.tourism?.visaRequirements && (
                <div>
                  <h4 className="font-semibold mb-2">Visa Requirements</h4>
                  <p className="text-sm">{countryData.tourism.visaRequirements}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.demographics?.lifeExpectancy && (
                <div>
                  <h4 className="font-semibold mb-2">Life Expectancy</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">{countryData.demographics.lifeExpectancy.total}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{countryData.demographics.lifeExpectancy.male}</p>
                      <p className="text-sm text-muted-foreground">Male</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{countryData.demographics.lifeExpectancy.female}</p>
                      <p className="text-sm text-muted-foreground">Female</p>
                    </div>
                  </div>
                </div>
              )}

              {countryData.demographics?.urbanRural && (
                <div>
                  <h4 className="font-semibold mb-2">Urban vs Rural Distribution</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Urban</span>
                        <span>{countryData.demographics.urbanRural.urban}%</span>
                      </div>
                      <Progress value={countryData.demographics.urbanRural.urban} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Rural</span>
                        <span>{countryData.demographics.urbanRural.rural}%</span>
                      </div>
                      <Progress value={countryData.demographics.urbanRural.rural} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="science" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Science & Technology</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.scienceTechnology?.spaceMissions && (
                <div>
                  <h4 className="font-semibold mb-2">Space Missions</h4>
                  <div className="grid gap-3">
                    {countryData.scienceTechnology.spaceMissions.map((mission: any, index: number) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start">
                          <h5 className="font-medium">{mission.name}</h5>
                          <Badge variant="outline">{mission.year}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{mission.achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {countryData.scienceTechnology?.techStartups && (
                <div>
                  <h4 className="font-semibold mb-2">Major Tech Companies</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.scienceTechnology.techStartups.map((company: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {countryData.scienceTechnology?.patents && (
                <div>
                  <h4 className="font-semibold mb-2">Annual Patents</h4>
                  <p className="text-3xl font-bold text-center">
                    {countryData.scienceTechnology.patents.toLocaleString()}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Sports & Entertainment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {countryData.sportsEntertainment?.nationalSports && (
                <div>
                  <h4 className="font-semibold mb-2">National Sports</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.sportsEntertainment.nationalSports.map((sport: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {countryData.sportsEntertainment?.olympicPerformance && (
                <div>
                  <h4 className="font-semibold mb-2">Olympic Performance</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold">
                        {countryData.sportsEntertainment.olympicPerformance.totalMedals}
                      </p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">
                        {countryData.sportsEntertainment.olympicPerformance.goldMedals}
                      </p>
                      <p className="text-sm text-muted-foreground">Gold</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-400">
                        {countryData.sportsEntertainment.olympicPerformance.silverMedals}
                      </p>
                      <p className="text-sm text-muted-foreground">Silver</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-600">
                        {countryData.sportsEntertainment.olympicPerformance.bronzeMedals}
                      </p>
                      <p className="text-sm text-muted-foreground">Bronze</p>
                    </div>
                  </div>
                </div>
              )}

              {countryData.sportsEntertainment?.musicArtists && (
                <div>
                  <h4 className="font-semibold mb-2">Famous Music Artists</h4>
                  <div className="flex flex-wrap gap-2">
                    {countryData.sportsEntertainment.musicArtists.map((artist: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {artist}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
