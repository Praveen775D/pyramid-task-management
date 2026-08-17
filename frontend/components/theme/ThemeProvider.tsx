"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { userApi } from "@/lib/api";
import { Theme } from "@/lib/types";

export type Accent = "amber" | "blue" | "pink" | "rose" | "emerald" | "black";

type ThemeContextValue = {
  theme: Theme;
  accent: Accent;
  setTheme: (theme: Theme) => Promise<void>;
  setAccent: (accent: Accent) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const ACCENTS: Accent[] = ["amber", "blue", "pink", "rose", "emerald", "black"];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("default");
  const [accent, setAccentState] = useState<Accent>("blue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("pyramid_theme") as Theme | null;
    const savedAccent = localStorage.getItem("pyramid_accent") as Accent | null;
    const nextTheme = savedTheme && ["default", "dark"].includes(savedTheme) ? savedTheme : "default";
    const nextAccent = savedAccent && ACCENTS.includes(savedAccent) ? savedAccent : "blue";

    setThemeState(nextTheme);
    setAccentState(nextAccent);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.dataset.accent = nextAccent;
  }, []);

  async function setTheme(nextTheme: Theme) {
    setThemeState(nextTheme);
    localStorage.setItem("pyramid_theme", nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    try { await userApi.updateTheme(nextTheme); } catch { /* local persistence is enough */ }
  }

  function setAccent(nextAccent: Accent) {
    setAccentState(nextAccent);
    localStorage.setItem("pyramid_accent", nextAccent);
    document.documentElement.dataset.accent = nextAccent;
  }

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
