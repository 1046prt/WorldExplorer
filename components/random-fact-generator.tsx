"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, RefreshCw } from "lucide-react";

interface RandomFact {
  fact: string;
  category: string;
  country?: string;
}

const facts: RandomFact[] = [
  {
    fact: "The Great Wall of China is not visible from space with the naked eye.",
    category: "Geography",
    country: "China",
  },
  {
    fact: "Australia is the only country that is also a continent.",
    category: "Geography",
    country: "Australia",
  },
  {
    fact: "The Amazon rainforest produces about 20% of the world's oxygen.",
    category: "Environment",
    country: "Brazil",
  },
  {
    fact: "Iceland runs almost entirely on renewable energy.",
    category: "Environment",
    country: "Iceland",
  },
  {
    fact: "Japan has more than 6,800 islands.",
    category: "Geography",
    country: "Japan",
  },
  {
    fact: "The Netherlands is the most densely populated country in Europe.",
    category: "Demographics",
    country: "Netherlands",
  },
  {
    fact: "Switzerland has four official languages.",
    category: "Culture",
    country: "Switzerland",
  },
  {
    fact: "Canada has the longest coastline in the world.",
    category: "Geography",
    country: "Canada",
  },
];

export function RandomFactGenerator() {
  const [currentFact, setCurrentFact] = useState<RandomFact | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateRandomFact = () => {
    setIsLoading(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * facts.length);
      setCurrentFact(facts[randomIndex]);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    generateRandomFact();
  }, []);

  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Random World Fact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="spinner spinner-lg"></div>
          </div>
        ) : currentFact ? (
          <div className="space-y-3">
            <p className="text-base leading-relaxed">{currentFact.fact}</p>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">{currentFact.category}</Badge>
              {currentFact.country && (
                <Badge variant="outline">{currentFact.country}</Badge>
              )}
            </div>
          </div>
        ) : null}

        <Button
          onClick={generateRandomFact}
          disabled={isLoading}
          className="w-full"
          variant="outline"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
          />
          {isLoading ? "Loading..." : "New Fact"}
        </Button>
      </CardContent>
    </Card>
  );
}
