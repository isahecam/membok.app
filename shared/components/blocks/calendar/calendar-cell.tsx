"use client";

import type { ReactNode } from "react";

import type { CalendarDay } from "./calendar.types";

interface Props {
  day: CalendarDay;
  children?: ReactNode;
}

export function CalendarCell({ day, children }: Props) {
  return (
    <div
      className={`flex min-h-24 flex-col gap-1 bg-white p-2 dark:bg-zinc-950 ${
        day.isCurrentMonth ? "" : "opacity-40"
      } ${day.isToday ? "ring-2 ring-blue-500 ring-inset" : ""}`}>
      <span className="text-xs text-zinc-500">{day.dayOfMonth}</span>
      {children}
    </div>
  );
}
