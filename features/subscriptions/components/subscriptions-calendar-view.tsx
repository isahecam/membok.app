"use client";

import { SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import { useDaySubscriptionsActions } from "@/features/subscriptions/store/day-subscriptions.store";
import { useWizardActions } from "@/features/subscriptions/store/subscription-wizard.store";
import { Subscription } from "@/features/subscriptions/types/subscription.types";
import { isSubscriptionDueOn } from "@/features/subscriptions/utils/is-subscription-due-on";
import {
  CalendarCell,
  CalendarDaysWeek,
  CalendarGrid,
  CalendarMonthNavigator,
} from "@/shared/components/blocks/calendar";
import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface Props {
  subscriptions: Subscription[];
}

export function SubscriptionsCalendarView({ subscriptions }: Props) {
  const { open } = useWizardActions();
  const { open: openDaySubscriptions } = useDaySubscriptionsActions();

  function handleCellClick(date: string, hasSubscriptions: boolean) {
    if (hasSubscriptions) {
      openDaySubscriptions(date);
    } else {
      open(date);
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-1 p-4">
      <CalendarMonthNavigator />
      <CalendarDaysWeek />
      <CalendarGrid>
        {(day) => {
          const subsForDay = subscriptions.filter((s) => isSubscriptionDueOn(s, day.date));
          return (
            <Button
              variant="secondary"
              disabled={!day.isCurrentMonth}
              className={cn("size-full")}
              onClick={() => handleCellClick(day.date, subsForDay.length > 0)}>
              <CalendarCell day={day}>
                <AvatarGroup>
                  {subsForDay.map((sub) => {
                    const service = sub.service ? SERVICES_REGISTRY[sub.service] : null;
                    if (!service) return null;

                    return (
                      <Avatar key={sub.id} className="bg-white">
                        <AvatarImage src={service.logoUrl} alt={service.name} />
                        <AvatarFallback>{service.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    );
                  })}
                </AvatarGroup>
              </CalendarCell>
            </Button>
          );
        }}
      </CalendarGrid>
    </div>
  );
}
