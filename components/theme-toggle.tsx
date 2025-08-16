"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="theme-toggle"
      aria-label="Toggle theme"
    >
      <Sun className="theme-toggle-icon theme-toggle-sun" />
      <Moon className="theme-toggle-icon theme-toggle-moon" />
      <span className="theme-toggle-sr-only">Toggle theme</span>
    </button>
  );
}
