"use client";

import { useSelectedDate } from "./date-context";

const formatter = new Intl.DateTimeFormat(undefined, {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export default function ActiveDate() {
  const { selectedDate } = useSelectedDate();

  return (
    <span className="flex items-baseline gap-2 font-mono text-sm text-black dark:text-zinc-50">
      <span className="text-zinc-500 dark:text-zinc-400">Active Date:</span>
      <span className="font-semibold" suppressHydrationWarning>
        {formatter.format(selectedDate)}
      </span>
    </span>
  );
}
