"use client";
import { useState } from "react";
import type { Country } from "@/lib/types";

interface ComprehensiveCountryDataProps {
  countryData: Country;
}

export function ComprehensiveCountryData({
  countryData,
}: ComprehensiveCountryDataProps) {
  const [activeTab] = useState("overview");

  return (
    <div>
      <h2>{countryData.name}</h2>
      <p>Active tab: {activeTab}</p>
    </div>
  );
}
