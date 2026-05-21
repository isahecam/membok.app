"use client";

import { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/utils";

import type { CalendarDay } from "./calendar.types";

interface Props extends HTMLAttributes<HTMLDivElement> {
  day: CalendarDay;
}

export function CalendarCell({ day, children, ...props }: Props) {
  return (
    <div className="relative grid min-h-24 w-full place-items-center-safe" {...props}>
      <time
        dateTime={day.date}
        className={cn(
          "absolute top-3 left-0 max-w-max text-[10px] font-medium text-muted-foreground proportional-nums sm:text-xs",
          day.isToday && "rounded-full bg-primary p-0.5 text-primary-foreground sm:p-1",
        )}>
        {day.dayOfMonth}
      </time>
      {children}
    </div>
  );
}
