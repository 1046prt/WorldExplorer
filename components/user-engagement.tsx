"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Camera, Trophy, Star } from "lucide-react"

const userData = {
  visited: ["France", "Japan", "Brazil", "Australia", "Egypt"],
  wishlist: ["Iceland", "New Zealand", "Peru", "Morocco", "Thailand"],
  achievements: [
    { name: "World Explorer", description: "Visited 5 countries", progress: 100, icon: "🌍" },
    { name: "Quiz Master", description: "Scored 90%+ on 10 quizzes", progress: 70, icon: "🧠" },
    { name: "Culture Enthusiast", description: "Explored 20 cultural sites", progress: 85, icon: "🏛️" },
  ],
  photos: [
    { country: "France", landmark: "Eiffel Tower", likes: 24, user: "traveler123" },
    { country: "Japan", landmark: "Mount Fuji", likes: 31, user: "explorer_jane" },
    { country: "Brazil", landmark: "Christ the Redeemer", likes: 18, user: "wanderlust_mike" },
  ],
}

export function UserEngagement() {
  const [activeTab, setActiveTab] = useState("visited")

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-6 w-6" />
          Your World Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="visited">Visited</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="photos">Photo Gallery</TabsTrigger>
          </TabsList>

          <TabsContent value="visited" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-green-600">{userData.visited.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Countries Visited</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {userData.visited.map((country, index) => (
                <Card key={index} className="border-green-200 bg-green-50 dark:bg-green-950">
                  <CardContent className="p-4 text-center">
                    <MapPin className="h-6 w-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium text-green-800 dark:text-green-200">{country}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full">
              <MapPin className="h-4 w-4 mr-2" />
              Mark New Country as Visited
            </Button>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-blue-600">{userData.wishlist.length}</h3>
              <p className="text-gray-600 dark:text-gray-400">Countries on Wishlist</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {userData.wishlist.map((country, index) => (
                <Card key={index} className="border-blue-200 bg-blue-50 dark:bg-blue-950">
                  <CardContent className="p-4 text-center">
                    <Heart className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                    <p className="font-medium text-blue-800 dark:text-blue-200">{country}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button variant="outline" className="w-full bg-transparent">
              <Heart className="h-4 w-4 mr-2" />
              Add to Wishlist
            </Button>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-4">
            {userData.achievements.map((achievement, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{achievement.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{achievement.description}</p>
                      <Progress value={achievement.progress} className="h-2" />
                      <p className="text-xs text-gray-500 mt-1">{achievement.progress}% Complete</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {userData.photos.map((photo, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg mb-3 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">{photo.landmark}</h4>
                      <Badge variant="outline">{photo.country}</Badge>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">by {photo.user}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{photo.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button className="w-full">
              <Camera className="h-4 w-4 mr-2" />
              Upload Your Photo
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
