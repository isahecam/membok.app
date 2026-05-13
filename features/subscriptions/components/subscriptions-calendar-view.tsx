"use client";

import { SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import { useWizardActions } from "@/features/subscriptions/store/subscription-wizard.store";
import { Subscription } from "@/features/subscriptions/types/subscription.types";
import { isSubscriptionDueOn } from "@/features/subscriptions/utils/is-subscription-due-on";
import {
  CalendarCell,
  CalendarDaysWeek,
  CalendarGrid,
  CalendarMonthNavigator,
} from "@/shared/components/blocks/calendar";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";

interface Props {
  subscriptions: Subscription[];
}

export function SubscriptionsCalendarView({ subscriptions }: Props) {
  const { open } = useWizardActions();

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
              onClick={() => open(day.date)}>
              <CalendarCell day={day}>
                <AvatarGroup>
                  {subsForDay.map((sub) => {
                    const service = sub.service ? SERVICES_REGISTRY[sub.service] : null;
                    if (!service) return null;

                    return (
                      <Avatar key={sub.id}>
                        <AvatarImage src={service.logoUrl} alt={service.name} />
                        <AvatarFallback>{service.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    );
                  })}
                  {subsForDay.length > 1 && <AvatarGroupCount>{subsForDay.length}</AvatarGroupCount>}
                </AvatarGroup>
              </CalendarCell>
            </Button>
          );
        }}
      </CalendarGrid>
    </div>
  );
}
