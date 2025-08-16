"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="btn btn-outline btn-icon"
      aria-label="Toggle theme"
    >
      <Sun
        className="w-4 h-4 transition"
        style={{
          transform:
            theme === "dark"
              ? "rotate(-90deg) scale(0)"
              : "rotate(0deg) scale(1)",
          position: theme === "dark" ? "absolute" : "relative",
        }}
      />
      <Moon
        className="w-4 h-4 transition"
        style={{
          transform:
            theme === "dark"
              ? "rotate(0deg) scale(1)"
              : "rotate(90deg) scale(0)",
          position: theme === "light" ? "absolute" : "relative",
        }}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
