"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, RefreshCw } from "lucide-react"

interface RandomFact {
  country: string
  fact: string
  category: "culture" | "geography" | "history" | "nature" | "economy"
}

const randomFacts: RandomFact[] = [
  {
    country: "US",
    fact: "The United States has no official national language at the federal level.",
    category: "culture",
  },
  { country: "CA", fact: "Canada has more lakes than the rest of the world combined.", category: "geography" },
  { country: "JP", fact: "Japan consists of 6,852 islands, but only 430 are inhabited.", category: "geography" },
  { country: "BR", fact: "Brazil is home to 60% of the Amazon rainforest.", category: "nature" },
  { country: "AU", fact: "Australia is the only country that is also a continent.", category: "geography" },
  { country: "IN", fact: "India has 22 official languages and over 1,600 spoken languages.", category: "culture" },
  { country: "CN", fact: "The Great Wall of China is not visible from space with the naked eye.", category: "history" },
  { country: "RU", fact: "Russia spans 11 time zones, more than any other country.", category: "geography" },
  {
    country: "EG",
    fact: "The Great Pyramid of Giza was the tallest building in the world for over 3,800 years.",
    category: "history",
  },
  {
    country: "FR",
    fact: "France is the most visited country in the world with over 89 million tourists annually.",
    category: "economy",
  },
]

export function RandomFactGenerator() {
  const [currentFact, setCurrentFact] = useState<RandomFact | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateRandomFact = () => {
    setIsLoading(true)
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomFacts.length)
      setCurrentFact(randomFacts[randomIndex])
      setIsLoading(false)
    }, 500)
  }

  useEffect(() => {
    generateRandomFact()
  }, [])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "culture":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "geography":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "history":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
      case "nature":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      case "economy":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Did You Know?</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generateRandomFact}
          disabled={isLoading}
          className="hover:bg-yellow-100 dark:hover:bg-yellow-900 bg-transparent"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>

      {currentFact && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white dark:bg-gray-800">
              {currentFact.country}
            </Badge>
            <Badge className={getCategoryColor(currentFact.category)}>{currentFact.category}</Badge>
          </div>
          <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{currentFact.fact}</p>
        </div>
      )}
    </Card>
  )
}
