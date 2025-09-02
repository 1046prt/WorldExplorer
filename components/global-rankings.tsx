"use client";

import { useState } from "react";
import "@/styles/global-ranking.css";
import {
  Trophy,
  Building,
  Mountain,
  Users,
  DollarSign,
  Globe,
  Trees,
  PlaneTakeoff,
  Languages,
  Snowflake,
} from "lucide-react";

const rankingCategories = {
  tallestBuildings: {
    title: "Tallest Buildings",
    icon: Building,
    data: [
      { name: "Burj Khalifa", country: "UAE", value: "828m" },
      { name: "Merdeka 118", country: "Malaysia", value: "679m" },
      { name: "Shanghai Tower", country: "China", value: "632m" },
      { name: "Abraj Al-Bait", country: "Saudi Arabia", value: "601m" },
      { name: "Ping An Finance", country: "China", value: "599m" },
      { name: "Lotte World Tower", country: "South Korea", value: "555m" },
      { name: "One World Trade Center", country: "USA", value: "541m" },
      { name: "Guangzhou CTF Finance", country: "China", value: "530m" },
      { name: "Tianjin CTF Finance", country: "China", value: "530m" },
      { name: "China Zun", country: "China", value: "528m" },
      { name: "Taipei 101", country: "Taiwan", value: "508m" },
      {
        name: "Shanghai World Financial Center",
        country: "China",
        value: "492m",
      },
      {
        name: "International Commerce Centre",
        country: "Hong Kong",
        value: "484m",
      },
      { name: "Lakhta Center", country: "Russia", value: "462m" },
      { name: "Vincom Landmark 81", country: "Vietnam", value: "461m" },
    ],
  },
  longestRivers: {
    title: "Longest Rivers",
    icon: Snowflake,
    data: [
      { name: "Nile", country: "Egypt/Sudan", value: "6,650km" },
      { name: "Amazon", country: "Brazil/Peru", value: "6,400km" },
      { name: "Yangtze", country: "China", value: "6,300km" },
      { name: "Mississippi", country: "USA", value: "6,275km" },
      { name: "Yenisei", country: "Russia", value: "5,539km" },
      { name: "Yellow River", country: "China", value: "5,464km" },
      { name: "Ob–Irtysh", country: "Russia/Kazakhstan", value: "5,410km" },
      { name: "Congo", country: "Congo Basin", value: "4,700km" },
      { name: "Amur", country: "Russia/China", value: "4,444km" },
      { name: "Lena", country: "Russia", value: "4,400km" },
      { name: "Mekong", country: "SE Asia", value: "4,350km" },
      { name: "Mackenzie", country: "Canada", value: "4,241km" },
      { name: "Niger", country: "West Africa", value: "4,180km" },
      { name: "Murray-Darling", country: "Australia", value: "3,672km" },
      { name: "Tocantins", country: "Brazil", value: "3,650km" },
    ],
  },
  largestCities: {
    title: "Largest Cities by Population",
    icon: Users,
    data: [
      { name: "Tokyo", country: "Japan", value: "37.4M" },
      { name: "Delhi", country: "India", value: "32.9M" },
      { name: "Shanghai", country: "China", value: "28.5M" },
      { name: "Dhaka", country: "Bangladesh", value: "22.5M" },
      { name: "São Paulo", country: "Brazil", value: "22.4M" },
      { name: "Mexico City", country: "Mexico", value: "22.1M" },
      { name: "Cairo", country: "Egypt", value: "21.7M" },
      { name: "Mumbai", country: "India", value: "21.3M" },
      { name: "Beijing", country: "China", value: "20.9M" },
      { name: "Osaka", country: "Japan", value: "19.1M" },
      { name: "Karachi", country: "Pakistan", value: "16.8M" },
      { name: "Chongqing", country: "China", value: "16.4M" },
      { name: "Istanbul", country: "Turkey", value: "15.9M" },
      { name: "Kinshasa", country: "DR Congo", value: "15.5M" },
      { name: "Lagos", country: "Nigeria", value: "15.4M" },
    ],
  },
  gdpRanking: {
    title: "GDP Rankings (Nominal)",
    icon: DollarSign,
    data: [
      { name: "United States", country: "USA", value: "$26.9T" },
      { name: "China", country: "China", value: "$17.7T" },
      { name: "Japan", country: "Japan", value: "$4.9T" },
      { name: "Germany", country: "Germany", value: "$4.3T" },
      { name: "India", country: "India", value: "$3.7T" },
      { name: "UK", country: "United Kingdom", value: "$3.1T" },
      { name: "France", country: "France", value: "$3.0T" },
      { name: "Italy", country: "Italy", value: "$2.2T" },
      { name: "Canada", country: "Canada", value: "$2.1T" },
      { name: "South Korea", country: "South Korea", value: "$2.0T" },
      { name: "Russia", country: "Russia", value: "$1.9T" },
      { name: "Brazil", country: "Brazil", value: "$1.8T" },
      { name: "Australia", country: "Australia", value: "$1.7T" },
      { name: "Spain", country: "Spain", value: "$1.6T" },
      { name: "Mexico", country: "Mexico", value: "$1.5T" },
    ],
  },
  largestCountries: {
    title: "Largest Countries by Area",
    icon: Globe,
    data: [
      { name: "Russia", country: "Russia", value: "17.1M km²" },
      { name: "Canada", country: "Canada", value: "9.9M km²" },
      { name: "China", country: "China", value: "9.6M km²" },
      { name: "USA", country: "USA", value: "9.5M km²" },
      { name: "Brazil", country: "Brazil", value: "8.5M km²" },
      { name: "Australia", country: "Australia", value: "7.7M km²" },
      { name: "India", country: "India", value: "3.3M km²" },
      { name: "Argentina", country: "Argentina", value: "2.8M km²" },
      { name: "Kazakhstan", country: "Kazakhstan", value: "2.7M km²" },
      { name: "Algeria", country: "Algeria", value: "2.4M km²" },
      { name: "DR Congo", country: "DR Congo", value: "2.3M km²" },
      { name: "Greenland", country: "Denmark", value: "2.1M km²" },
      { name: "Saudi Arabia", country: "Saudi Arabia", value: "2.1M km²" },
      { name: "Mexico", country: "Mexico", value: "2.0M km²" },
      { name: "Indonesia", country: "Indonesia", value: "1.9M km²" },
    ],
  },
  largestForests: {
    title: "Largest Forests",
    icon: Trees,
    data: [
      {
        name: "Amazon Rainforest",
        country: "Brazil/Peru/Colombia",
        value: "5.5M km²",
      },
      {
        name: "Congo Rainforest",
        country: "Central Africa",
        value: "3.6M km²",
      },
      {
        name: "Valdivian Temperate",
        country: "Chile/Argentina",
        value: "248k km²",
      },
      { name: "Tongass National Forest", country: "USA", value: "68k km²" },
      { name: "Daintree Rainforest", country: "Australia", value: "1.2k km²" },
      { name: "Sundarbans", country: "India/Bangladesh", value: "10k km²" },
      { name: "Kinabalu National Park", country: "Malaysia", value: "754 km²" },
      {
        name: "New Guinea Rainforest",
        country: "Papua New Guinea",
        value: "288k km²",
      },
      { name: "Taiga", country: "Russia/Canada", value: "17M km²" },
      { name: "Eastern Siberian Taiga", country: "Russia", value: "10M km²" },
      { name: "Atlantic Forest", country: "Brazil", value: "1.3M km²" },
      { name: "Madhya Pradesh Forests", country: "India", value: "94k km²" },
      { name: "Boreal Forest", country: "Canada", value: "2.7M km²" },
      { name: "Congo Basin Swamp", country: "Congo Basin", value: "145k km²" },
      { name: "Tropical Andes", country: "Peru/Bolivia", value: "1.5M km²" },
    ],
  },
  highestMountains: {
    title: "Highest Mountains",
    icon: Mountain,
    data: [
      { name: "Mount Everest", country: "Nepal/China", value: "8,849m" },
      { name: "K2", country: "Pakistan/China", value: "8,611m" },
      { name: "Kangchenjunga", country: "India/Nepal", value: "8,586m" },
      { name: "Lhotse", country: "Nepal/China", value: "8,516m" },
      { name: "Makalu", country: "Nepal/China", value: "8,485m" },
      { name: "Cho Oyu", country: "Nepal/China", value: "8,188m" },
      { name: "Dhaulagiri I", country: "Nepal", value: "8,167m" },
      { name: "Manaslu", country: "Nepal", value: "8,163m" },
      { name: "Nanga Parbat", country: "Pakistan", value: "8,126m" },
      { name: "Annapurna I", country: "Nepal", value: "8,091m" },
      { name: "Gasherbrum I", country: "Pakistan/China", value: "8,080m" },
      { name: "Broad Peak", country: "Pakistan/China", value: "8,051m" },
      { name: "Gasherbrum II", country: "Pakistan/China", value: "8,035m" },
      { name: "Shishapangma", country: "China", value: "8,027m" },
      { name: "Gyachung Kang", country: "Nepal/China", value: "7,952m" },
    ],
  },
  mostSpokenLanguages: {
    title: "Most Spoken Languages",
    icon: Languages,
    data: [
      { name: "English", country: "Global", value: "1.5B" },
      { name: "Mandarin Chinese", country: "China", value: "1.1B" },
      { name: "Hindi", country: "India", value: "610M" },
      { name: "Spanish", country: "Spain/Latin America", value: "560M" },
      { name: "French", country: "France/Global", value: "310M" },
      { name: "Arabic", country: "Middle East/North Africa", value: "274M" },
      { name: "Bengali", country: "Bangladesh/India", value: "273M" },
      { name: "Russian", country: "Russia/Eastern Europe", value: "258M" },
      { name: "Portuguese", country: "Brazil/Portugal", value: "258M" },
      { name: "Urdu", country: "Pakistan/India", value: "231M" },
      { name: "Indonesian", country: "Indonesia", value: "199M" },
      { name: "German", country: "Germany/Europe", value: "135M" },
      { name: "Japanese", country: "Japan", value: "125M" },
      { name: "Swahili", country: "East Africa", value: "120M" },
      { name: "Marathi", country: "India", value: "99M" },
    ],
  },
  busiestAirports: {
    title: "Busiest Airports (Passengers)",
    icon: PlaneTakeoff,
    data: [
      { name: "Hartsfield–Jackson Atlanta", country: "USA", value: "104M" },
      { name: "Beijing Capital", country: "China", value: "100M" },
      { name: "Los Angeles Intl", country: "USA", value: "88M" },
      { name: "Dubai Intl", country: "UAE", value: "86M" },
      { name: "Tokyo Haneda", country: "Japan", value: "85M" },
      { name: "O'Hare Intl", country: "USA", value: "83M" },
      { name: "London Heathrow", country: "UK", value: "80M" },
      { name: "Shanghai Pudong", country: "China", value: "76M" },
      { name: "Paris Charles de Gaulle", country: "France", value: "76M" },
      { name: "Dallas/Fort Worth", country: "USA", value: "75M" },
      { name: "Guangzhou Baiyun", country: "China", value: "74M" },
      { name: "Hong Kong Intl", country: "Hong Kong", value: "73M" },
      { name: "Amsterdam Schiphol", country: "Netherlands", value: "72M" },
      { name: "Frankfurt Intl", country: "Germany", value: "71M" },
      { name: "Seoul Incheon", country: "South Korea", value: "70M" },
    ],
  },
  mostVisitedCountries: {
    title: "Most Visited Countries (Tourists)",
    icon: Globe,
    data: [
      { name: "France", country: "France", value: "89M" },
      { name: "Spain", country: "Spain", value: "83M" },
      { name: "USA", country: "USA", value: "79M" },
      { name: "China", country: "China", value: "66M" },
      { name: "Italy", country: "Italy", value: "64M" },
      { name: "Turkey", country: "Turkey", value: "51M" },
      { name: "Mexico", country: "Mexico", value: "45M" },
      { name: "Thailand", country: "Thailand", value: "40M" },
      { name: "Germany", country: "Germany", value: "39M" },
      { name: "UK", country: "UK", value: "37M" },
      { name: "Japan", country: "Japan", value: "32M" },
      { name: "Austria", country: "Austria", value: "30M" },
      { name: "Greece", country: "Greece", value: "28M" },
      { name: "Russia", country: "Russia", value: "24M" },
      { name: "Portugal", country: "Portugal", value: "22M" },
    ],
  },
};

export default function GlobalRankings() {
  const [activeCategory, setActiveCategory] =
    useState<string>("tallestBuildings");

  // No need for useEffect since we initialize with the default value

  const currentData =
    rankingCategories[activeCategory as keyof typeof rankingCategories];
  const IconComponent = currentData.icon;

  return (
    <div className="global-card">
      <div className="card-header">
        <h2 className="card-title">
          <Trophy className="icon-trophy" />
          Global Rankings & Top 10 Lists
        </h2>
      </div>

      <div className="card-content">
        <div className="categories">
          {Object.entries(rankingCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`category-btn ${
                activeCategory === key ? "active" : ""
              }`}
            >
              <category.icon className="icon-small" />
              {category.title}
            </button>
          ))}
        </div>

        <div className="ranking-list">
          <h3 className="ranking-title">
            <IconComponent className="icon-medium" />
            {currentData.title}
          </h3>

          {currentData.data.map((item, index) => (
            <div key={index} className="ranking-item">
              <div className="ranking-left">
                <div
                  className={`rank-badge ${index === 0 ? "first" : "other"}`}
                >
                  {index + 1}
                </div>
                <div>
                  <div className="item-name">{item.name}</div>
                  <div className="item-country">{item.country}</div>
                </div>
              </div>
              <div className="item-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
