"use client";

import type { ReactNode } from "react";

import type { CalendarDay } from "./calendar.types";
import { useCalendarDays } from "./use-calendar";

interface Props {
  children: (day: CalendarDay) => ReactNode;
}

export function CalendarGrid({ children }: Props) {
  const calendarDays = useCalendarDays();

  return (
    <div className="grid grid-cols-7 gap-px">
      {calendarDays.map((day) => (
        <div key={day.date}>{children(day)}</div>
      ))}
    </div>
  );
}
