import { dt, type DateString } from "@/lib/date";

import type { Subscription } from "../types/subscription.types";

export function isSubscriptionDueOn(subscription: Subscription, date: DateString): boolean {
  const startDate = subscription.startDate;

  if (dt.isBefore(date, startDate)) return false;

  const dayOfMonth = dt.getDate(startDate);

  switch (subscription.billingCycle) {
    case "monthly":
      return dt.getDate(date) === dayOfMonth;
    case "yearly":
      return dt.getDate(date) === dayOfMonth && dt.getMonth(date) === dt.getMonth(startDate);
  }
}
