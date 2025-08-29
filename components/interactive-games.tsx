"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GamepadIcon, Target, MapPin, Puzzle, Clock, Star } from "lucide-react";

const games = {
  treasureHunt: {
    title: "Landmark Treasure Hunt",
    icon: Target,
    description: "Find famous landmarks on the world map",
    difficulty: "Medium",
  },
  riverTrace: {
    title: "River Path Tracing",
    icon: MapPin,
    description: "Trace the course of major rivers",
    difficulty: "Hard",
  },
  culturalMatch: {
    title: "Cultural Match Game",
    icon: Puzzle,
    description: "Match traditions and foods to countries",
    difficulty: "Easy",
  },
};

const treasureHuntTargets = [
  {
    name: "Eiffel Tower",
    country: "France",
    hint: "Iron lattice tower in the City of Light",
    points: 100,
  },
  {
    name: "Great Wall",
    country: "China",
    hint: "Ancient fortification stretching thousands of miles",
    points: 150,
  },
  {
    name: "Statue of Liberty",
    country: "USA",
    hint: "Gift from France, symbol of freedom",
    points: 100,
  },
  {
    name: "Machu Picchu",
    country: "Peru",
    hint: "Ancient Incan citadel in the mountains",
    points: 200,
  },
  {
    name: "Taj Mahal",
    country: "India",
    hint: "White marble mausoleum, symbol of love",
    points: 150,
  },
];

const culturalMatches = [
  { item: "Sushi", country: "Japan", type: "food" },
  { item: "Flamenco", country: "Spain", type: "dance" },
  { item: "Pasta", country: "Italy", type: "food" },
  { item: "Tango", country: "Argentina", type: "dance" },
  { item: "Curry", country: "India", type: "food" },
];

export function InteractiveGames() {
  const [activeGame, setActiveGame] = useState("treasureHunt");
  const [gameState, setGameState] = useState({
    score: 0,
    timeLeft: 60,
    currentTarget: 0,
    isPlaying: false,
    matches: 0,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.isPlaying && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0) {
      setGameState((prev) => ({ ...prev, isPlaying: false }));
    }
    return () => clearTimeout(timer);
  }, [gameState.isPlaying, gameState.timeLeft]);

  const startGame = () => {
    setGameState({
      score: 0,
      timeLeft: 60,
      currentTarget: 0,
      isPlaying: true,
      matches: 0,
    });
  };

  const handleTreasureFound = () => {
    const points = treasureHuntTargets[gameState.currentTarget]?.points || 0;
    setGameState((prev) => ({
      ...prev,
      score: prev.score + points,
      currentTarget: prev.currentTarget + 1,
    }));
  };

  const renderTreasureHunt = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {gameState.timeLeft}s
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {gameState.score} points
          </Badge>
        </div>
        {!gameState.isPlaying ? (
          <Button onClick={startGame}>Start Hunt</Button>
        ) : (
          <Button
            variant="outline"
            onClick={() =>
              setGameState((prev) => ({ ...prev, isPlaying: false }))
            }
          >
            Stop Game
          </Button>
        )}
      </div>

      {gameState.isPlaying &&
      gameState.currentTarget < treasureHuntTargets.length ? (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <h4 className="text-lg font-semibold">Find This Landmark!</h4>
              <p className="text-gray-600 dark:text-gray-400">
                {treasureHuntTargets[gameState.currentTarget]?.hint}
              </p>
              <Badge variant="secondary">
                {treasureHuntTargets[gameState.currentTarget]?.points} points
              </Badge>
              <Button onClick={handleTreasureFound} className="mt-4">
                Found It! ({treasureHuntTargets[gameState.currentTarget]?.name})
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : gameState.isPlaying ? (
        <div className="text-center py-8">
          <h4 className="text-xl font-bold text-green-600">Congratulations!</h4>
          <p>You found all landmarks! Final Score: {gameState.score} points</p>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          Click &quot;Start Hunt&quot; to begin your treasure hunting adventure!
        </div>
      )}
    </div>
  );

  const renderCulturalMatch = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-3">Items</h4>
          <div className="space-y-2">
            {culturalMatches.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() =>
                  setGameState((prev) => ({
                    ...prev,
                    matches: prev.matches + 1,
                  }))
                }
              >
                {item.item} ({item.type})
              </Button>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Countries</h4>
          <div className="space-y-2">
            {culturalMatches.map((item, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start bg-transparent"
              >
                {item.country}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center">
        <Badge variant="outline">Matches: {gameState.matches}/5</Badge>
      </div>
    </div>
  );

  const currentGame = games[activeGame as keyof typeof games];
  const IconComponent = currentGame.icon;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GamepadIcon className="w-5 h-5 text-purple-500" />
          Interactive Learning Games
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(games).map(([key, game]) => (
            <Button
              key={key}
              variant={activeGame === key ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveGame(key)}
              className="flex items-center gap-2"
            >
              <game.icon className="w-4 h-4" />
              {game.title}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IconComponent className="w-5 h-5" />
              <h3 className="text-lg font-semibold">{currentGame.title}</h3>
            </div>
            <Badge
              variant={
                currentGame.difficulty === "Easy"
                  ? "secondary"
                  : currentGame.difficulty === "Medium"
                  ? "default"
                  : "destructive"
              }
            >
              {currentGame.difficulty}
            </Badge>
          </div>

          <p className="text-gray-600 dark:text-gray-400">
            {currentGame.description}
          </p>

          {activeGame === "treasureHunt" && renderTreasureHunt()}
          {activeGame === "culturalMatch" && renderCulturalMatch()}
          {activeGame === "riverTrace" && (
            <div className="text-center py-8 text-gray-500">
              River tracing game coming soon! Draw river paths on interactive
              maps.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
