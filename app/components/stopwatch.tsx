"use client";

import { useCallback, useEffect, useRef, useState } from "react";

function formatTime(totalMs: number): string {
  const totalSeconds = Math.floor(totalMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(minutes)}:${pad(seconds)}`;
}

export default function Stopwatch() {
  // `active` is true from the first Start until Reset. It is what enables the
  // Reset button and is independent of whether the clock is currently running.
  const [active, setActive] = useState(false);
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);

  // Timing is derived from timestamps to avoid interval drift: `accumulatedRef`
  // holds time banked from previous runs, `startRef` is when the current run began.
  const accumulatedRef = useRef(0);
  const startRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTick, [clearTick]);

  const handleStartPause = () => {
    if (running) {
      // Pause: bank the elapsed time and stop ticking.
      clearTick();
      const banked = accumulatedRef.current + (performance.now() - startRef.current);
      accumulatedRef.current = banked;
      setElapsedMs(banked);
      setRunning(false);
      return;
    }

    // Start (from fresh or from paused): resume from banked time.
    setActive(true);
    setRunning(true);
    startRef.current = performance.now();
    intervalRef.current = setInterval(() => {
      setElapsedMs(accumulatedRef.current + (performance.now() - startRef.current));
    }, 100);
  };

  const handleReset = () => {
    clearTick();
    accumulatedRef.current = 0;
    startRef.current = 0;
    setElapsedMs(0);
    setRunning(false);
    setActive(false);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        role="timer"
        aria-live="off"
        className="font-mono text-6xl tabular-nums tracking-tight text-black dark:text-zinc-50"
      >
        {formatTime(elapsedMs)}
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleStartPause}
          className="flex h-12 w-28 items-center justify-center rounded-full bg-foreground px-5 text-background font-medium transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          type="button"
          onClick={handleReset}
          disabled={!active}
          className="flex h-12 w-28 items-center justify-center rounded-full border border-solid border-black/[.08] px-5 font-medium transition-colors hover:border-transparent hover:bg-black/[.04] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
