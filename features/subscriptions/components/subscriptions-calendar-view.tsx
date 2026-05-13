"use client";

import { useWizardActions } from "@/features/subscriptions/store/subscription-wizard.store";
import {
  CalendarCell,
  CalendarDaysWeek,
  CalendarGrid,
  CalendarMonthNavigator,
} from "@/shared/components/blocks/calendar";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

// interface Props {
//   subscriptions: Subscription[];
// }

export function SubscriptionsCalendarView(/* { subscriptions }: Props */) {
  const { open } = useWizardActions();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-1 p-4">
      <CalendarMonthNavigator />
      <CalendarDaysWeek />
      <CalendarGrid>
        {(day) => {
          // const subsForDay = subscriptions.filter((s) => dt.isSameDay(s.renewalDate, day.date));
          return (
            <Button
              variant="secondary"
              disabled={!day.isCurrentMonth}
              className={cn("size-full")}
              onClick={() => open(day.date)}>
              <CalendarCell day={day}></CalendarCell>
            </Button>
          );
        }}
      </CalendarGrid>
    </div>
  );
}
