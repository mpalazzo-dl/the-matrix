"use client";

import { useState } from "react";
import { startOfToday, useSelectedDate } from "./date-context";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const monthLabel = new Intl.DateTimeFormat(undefined, {
  month: "long",
  year: "numeric",
});

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Builds the grid of days shown for a given month, padded with leading
 * `null`s so the first day lands under the correct weekday column.
 */
function buildMonthDays(year: number, month: number): (Date | null)[] {
  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = firstOfMonth.getDay();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < leadingBlanks; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}

export default function CalendarPicker() {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const today = startOfToday();

  // The month currently shown in the grid; starts on the selected date's month.
  const [viewDate, setViewDate] = useState(
    () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const cells = buildMonthDays(year, month);

  const goToPreviousMonth = () => setViewDate(new Date(year, month - 1, 1));
  const goToNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const dayClass = (date: Date) => {
    const selected = isSameDay(date, selectedDate);
    const current = isSameDay(date, today);
    return [
      "flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors",
      selected
        ? "bg-foreground font-semibold text-background"
        : "text-black hover:bg-black/[.06] dark:text-zinc-100 dark:hover:bg-white/[.08]",
      !selected && current
        ? "ring-1 ring-inset ring-zinc-400 dark:ring-zinc-500"
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className="w-72 rounded-2xl border border-black/[.08] bg-white p-4 shadow-sm dark:border-white/[.145] dark:bg-zinc-950">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-black/[.06] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-white"
        >
          ‹
        </button>
        <span className="font-mono text-sm font-semibold text-black dark:text-zinc-50">
          {monthLabel.format(viewDate)}
        </span>
        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-black/[.06] hover:text-black dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-white"
        >
          ›
        </button>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday) => (
          <span
            key={weekday}
            className="flex h-8 w-9 items-center justify-center text-xs font-medium text-zinc-400 dark:text-zinc-500"
          >
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, index) =>
          date ? (
            <button
              key={date.toISOString()}
              type="button"
              onClick={() => setSelectedDate(date)}
              aria-label={date.toDateString()}
              aria-pressed={isSameDay(date, selectedDate)}
              className={dayClass(date)}
            >
              {date.getDate()}
            </button>
          ) : (
            <span key={`blank-${index}`} className="h-9 w-9" />
          ),
        )}
      </div>
    </div>
  );
}
