import { Globe, MapPin, Building, GraduationCap } from "lucide-react";

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
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <div className="stat-icon-wrapper">
            <stat.icon className="stat-icon" />
          </div>
          <div className="stat-content">
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
            <p className="stat-description">{stat.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
