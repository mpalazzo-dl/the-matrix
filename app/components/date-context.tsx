"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** Returns the current date with the time stripped to local midnight. */
export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

type DateContextValue = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};

const DateContext = createContext<DateContextValue | null>(null);

export function DateProvider({ children }: { children: ReactNode }) {
  // Default the active date to today. Using an initializer keeps this stable
  // across renders instead of recomputing on every render.
  const [selectedDate, setSelectedDate] = useState<Date>(() => startOfToday());

  const value = useMemo(
    () => ({ selectedDate, setSelectedDate }),
    [selectedDate],
  );

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
}

export function useSelectedDate(): DateContextValue {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useSelectedDate must be used within a DateProvider");
  }
  return context;
}
