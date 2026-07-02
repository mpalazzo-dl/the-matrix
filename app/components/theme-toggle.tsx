"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

export default function ThemeToggle() {
  // Read the theme the inline head script already applied to <html> so React's
  // initial state matches the DOM (no hydration mismatch, no flash).
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage may be unavailable (private mode); ignore.
    }
  }, [theme]);

  const setLight = useCallback(() => setTheme("light"), []);
  const setDark = useCallback(() => setTheme("dark"), []);

  const optionClass = (active: boolean) =>
    `flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
      active
        ? "bg-white text-black shadow-sm dark:bg-zinc-700 dark:text-white"
        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
    }`;

  return (
    <div
      role="group"
      aria-label="Theme"
      className="flex items-center gap-1 rounded-full border border-black/[.08] bg-zinc-100 p-1 dark:border-white/[.145] dark:bg-zinc-900"
    >
      <button
        type="button"
        onClick={setLight}
        aria-label="Light mode"
        aria-pressed={theme === "light"}
        className={optionClass(theme === "light")}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        onClick={setDark}
        aria-label="Dark mode"
        aria-pressed={theme === "dark"}
        className={optionClass(theme === "dark")}
      >
        <MoonIcon />
      </button>
    </div>
  );
}
