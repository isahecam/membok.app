"use client";

import { getDemoSubscriptions } from "@/features/landing/mocks/demo-subscriptions";
import { SubscriptionsCalendarView } from "@/features/subscriptions/components/subscriptions-calendar-view";

export function LandingCalendarPreview() {
  const subscriptions = getDemoSubscriptions();

  return <SubscriptionsCalendarView subscriptions={subscriptions} isAuthenticated={false} />;
}
