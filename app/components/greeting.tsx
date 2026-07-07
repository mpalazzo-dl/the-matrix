"use client";

import { useEffect, useState } from "react";

// Format a Date as standard (12-hour) time, e.g. "3:45 PM".
function formatStandardTime(date: Date): string {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function Greeting() {
  // The client's local time can't be known on the server, so render it only
  // after mount to avoid a hydration mismatch. Ticks every second.
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setTime(formatStandardTime(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      suppressHydrationWarning
      className="font-mono text-sm text-zinc-600 dark:text-zinc-300"
    >
      Hello User, the time is{time === null ? "…" : ` ${time}`}
    </span>
  );
}
