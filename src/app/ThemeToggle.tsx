"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const getCurrentTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ||
    (!document.documentElement.classList.contains("light") &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
    ? "dark"
    : "light";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(getCurrentTheme());

    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemTheme = (event: MediaQueryListEvent) => {
      if (localStorage.getItem("color-mode") !== null) return;

      const nextTheme: Theme = event.matches ? "dark" : "light";
      setTheme(nextTheme);
    };

    systemTheme.addEventListener("change", followSystemTheme);
    return () => systemTheme.removeEventListener("change", followSystemTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = getCurrentTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.classList.toggle("light", nextTheme === "light");
    localStorage.setItem("color-mode", nextTheme);
    setTheme(nextTheme);
  };

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="col-span-2 mt-1 flex items-center justify-center gap-1 rounded-md border border-line px-1.5 py-1 text-tiny text-content-muted transition-colors hover:bg-surface-muted hover:text-content cursor-pointer"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <SunIcon className="size-3.5" aria-hidden="true" />
      ) : (
        <MoonIcon className="size-3.5" aria-hidden="true" />
      )}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
