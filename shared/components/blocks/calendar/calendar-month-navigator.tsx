import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { dt } from "@/lib/date";
import { useCalendarActions, useCurrentDate } from "@/shared/components/blocks/calendar/use-calendar";
import { Button } from "@/shared/components/ui/button";

export function CalendarMonthNavigator() {
  const currentDate = useCurrentDate();
  const { goToPrevMonth, goToNextMonth } = useCalendarActions();

  const label = dt.format(currentDate, "LLLL yyyy");

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <Button variant="ghost" size="icon-sm" onClick={goToPrevMonth} aria-label="Previous month">
        <ChevronLeftIcon />
      </Button>
      <h2 className="text-sm font-semibold">{label}</h2>
      <Button variant="ghost" size="icon-sm" onClick={goToNextMonth} aria-label="Next month">
        <ChevronRightIcon />
      </Button>
    </div>
  );
}
