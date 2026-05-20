import type { Subscription } from "../types/subscription.types";
import { isSubscriptionActiveThisMonth } from "./is-subscription-active-this-month";

export function getMonthlyExpenseSummary(subscriptions: Subscription[]) {
  const activeThisMonth = subscriptions.filter((s) => isSubscriptionActiveThisMonth(s));

  return {
    count: activeThisMonth.length,
    total: activeThisMonth.reduce((sum, s) => sum + s.amount, 0),
  };
}
