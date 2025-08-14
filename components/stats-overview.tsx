import { Card } from "@/components/ui/card"
import { Globe, MapPin, Building, GraduationCap } from "lucide-react"

export function StatsOverview() {
  const stats = [
    {
      icon: Globe,
      label: "Countries",
      value: "195",
      description: "Sovereign nations",
    },
    {
      icon: MapPin,
      label: "Landmarks",
      value: "1,200+",
      description: "Famous places",
    },
    {
      icon: Building,
      label: "Cities",
      value: "500+",
      description: "Major cities",
    },
    {
      icon: GraduationCap,
      label: "Universities",
      value: "300+",
      description: "Top institutions",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{stat.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
