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
    <div className="grid-layout grid-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card p-6 backdrop-blur card-hover">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
              }}
            >
              <stat.icon
                className="w-6 h-6"
                style={{ color: "var(--color-primary)" }}
              />
            </div>
            <div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--color-foreground)" }}
              >
                {stat.value}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--color-foreground)" }}
              >
                {stat.label}
              </p>
              <p
                className="text-xs"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {stat.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
