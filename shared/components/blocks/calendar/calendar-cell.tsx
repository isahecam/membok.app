"use client";

import { HTMLAttributes } from "react";

import { Badge } from "@/shared/components/ui/badge";

import type { CalendarDay } from "./calendar.types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  day: CalendarDay;
}

export function CalendarCell({ day, children, ...props }: Props) {
  return (
    <div className="relative min-h-24 w-full text-xs text-zinc-500" {...props}>
      <Badge variant={day.isToday ? "default" : "ghost"} className="absolute right-0 bottom-3 size-6 text-xs">
        {day.dayOfMonth}
      </Badge>
      {children}
    </div>
  );
}
