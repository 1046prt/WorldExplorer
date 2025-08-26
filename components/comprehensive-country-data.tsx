"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Landmark,
  GraduationCap,
  Globe,
  MapPin,
  Building,
  Calendar,
} from "lucide-react";
import type { Country } from "@/lib/types";

interface ComprehensiveCountryDataProps {
  countryData: Country;
}

export function ComprehensiveCountryData({
  countryData,
}: ComprehensiveCountryDataProps) {
  const [activeTab, setActiveTab] = useState("overview");

 
}
