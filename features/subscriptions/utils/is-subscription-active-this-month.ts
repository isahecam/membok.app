import { dt, type DateString } from "@/lib/date";

import type { Subscription } from "../types/subscription.types";

export function isSubscriptionActiveThisMonth(
  subscription: Subscription,
  referenceDate: DateString = dt.today(),
): boolean {
  const endOfCurrentMonth = dt.endOfMonth(referenceDate);
  const currentMonth = dt.getMonth(referenceDate);

  if (!subscription.isActive) return false;
  if (dt.isAfter(subscription.startDate, endOfCurrentMonth)) return false;
  if (subscription.billingCycle === "monthly") return true;
  if (subscription.billingCycle === "yearly") return dt.getMonth(subscription.startDate) === currentMonth;
  return false;
}
