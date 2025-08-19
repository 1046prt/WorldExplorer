"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, Book, Users } from "lucide-react";

const cultureData = {
  etiquette: [
    {
      country: "Japan",
      dos: [
        "Bow when greeting",
        "Remove shoes indoors",
        "Use both hands for business cards",
      ],
      donts: [
        "Point with one finger",
        "Blow your nose in public",
        "Tip at restaurants",
      ],
    },
    {
      country: "France",
      dos: [
        'Greet with "Bonjour"',
        "Dress elegantly",
        "Keep hands visible at dinner",
      ],
      donts: [
        "Speak loudly in public",
        "Rush through meals",
        "Ask personal questions immediately",
      ],
    },
    {
      country: "India",
      dos: [
        "Use right hand for eating",
        "Remove shoes in temples",
        "Dress modestly",
      ],
      donts: [
        "Use left hand for greeting",
        "Show soles of feet",
        "Touch someone's head",
      ],
    },
  ],
  music: [
    {
      country: "Brazil",
      genre: "Bossa Nova",
      artists: ["João Gilberto", "Antonio Carlos Jobim"],
      sample: "Girl from Ipanema",
    },
    {
      country: "Ireland",
      genre: "Celtic Folk",
      artists: ["The Chieftains", "Clannad"],
      sample: "Danny Boy",
    },
    {
      country: "Mali",
      genre: "Afrobeat",
      artists: ["Ali Farka Touré", "Salif Keita"],
      sample: "Madan",
    },
  ],
  literature: [
    {
      country: "Russia",
      authors: ["Leo Tolstoy", "Fyodor Dostoevsky"],
      books: ["War and Peace", "Crime and Punishment"],
    },
    {
      country: "Colombia",
      authors: ["Gabriel García Márquez", "Jorge Isaacs"],
      books: ["One Hundred Years of Solitude", "María"],
    },
    {
      country: "Nigeria",
      authors: ["Chinua Achebe", "Wole Soyinka"],
      books: ["Things Fall Apart", "The Lion and the Jewel"],
    },
  ],
};

export function CultureLifestyle() {
  const [selectedCountry, setSelectedCountry] = useState("Japan");

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-6 w-6" />
          Global Culture & Lifestyle
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="etiquette" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="etiquette">Etiquette Guide</TabsTrigger>
            <TabsTrigger value="music">Traditional Music</TabsTrigger>
            <TabsTrigger value="literature">Literature</TabsTrigger>
          </TabsList>

          <TabsContent value="etiquette" className="space-y-4">
            <div className="flex gap-2 flex-wrap">
              {cultureData.etiquette.map((item) => (
                <Button
                  key={item.country}
                  variant={
                    selectedCountry === item.country ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCountry(item.country)}
                >
                  {item.country}
                </Button>
              ))}
            </div>
            {cultureData.etiquette.find(
              (item) => item.country === selectedCountry
            ) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-green-800 dark:text-green-200 text-lg">
                      Do's
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cultureData.etiquette
                        .find((item) => item.country === selectedCountry)
                        ?.dos.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-green-600 mt-1">✓</span>
                            <span className="text-green-800 dark:text-green-200">
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-red-200 bg-red-50 dark:bg-red-950">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-red-800 dark:text-red-200 text-lg">
                      Don'ts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {cultureData.etiquette
                        .find((item) => item.country === selectedCountry)
                        ?.donts.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-600 mt-1">✗</span>
                            <span className="text-red-800 dark:text-red-200">
                              {item}
                            </span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="music" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cultureData.music.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Music className="h-5 w-5" />
                      {item.country}
                    </CardTitle>
                    <Badge variant="secondary">{item.genre}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Featured Artists:</h4>
                        <div className="flex flex-wrap gap-1">
                          {item.artists.map((artist, i) => (
                            <Badge key={i} variant="outline">
                              {artist}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Sample Track:</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {item.sample}
                        </p>
                      </div>
                      <Button size="sm" className="w-full">
                        🎵 Listen on Spotify
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="literature" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cultureData.literature.map((item, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      {item.country}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Famous Authors:</h4>
                        <div className="space-y-1">
                          {item.authors.map((author, i) => (
                            <p
                              key={i}
                              className="text-sm text-gray-600 dark:text-gray-400"
                            >
                              {author}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Notable Works:</h4>
                        <div className="space-y-1">
                          {item.books.map((book, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="mr-1 mb-1"
                            >
                              {book}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
