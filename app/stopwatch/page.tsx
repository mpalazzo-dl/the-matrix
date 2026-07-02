import type { Metadata } from "next";
import Stopwatch from "../components/stopwatch";

export const metadata: Metadata = {
  title: "Stopwatch",
  description: "A simple stopwatch with start, pause, and reset.",
};

export default function StopwatchPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-12 py-32 px-16">
        <h1 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Stopwatch
        </h1>
        <Stopwatch />
      </main>
    </div>
  );
}
