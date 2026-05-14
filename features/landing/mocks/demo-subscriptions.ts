import type { Subscription } from "@/features/subscriptions/types/subscription.types";
import { dt } from "@/lib/date";

export function getDemoSubscriptions(): Subscription[] {
  const today = dt.today();

  return [
    {
      id: "demo-1",
      userId: "demo-user-1",
      name: "Netflix",
      amount: 219,
      billingCycle: "monthly",
      service: "netflix",
      startDate: today,
      paymentMethod: "credit-card",
      notes: "Suscripción de Netflix",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "demo-2",
      userId: "demo-user-2",
      name: "Spotify",
      amount: 115,
      billingCycle: "monthly",
      service: "spotify",
      startDate: today,
      paymentMethod: "credit-card",
      notes: "Suscripción de Spotify",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
    {
      id: "demo-3",
      userId: "demo-user-3",
      name: "Apple Music",
      amount: 49,
      billingCycle: "monthly",
      service: "apple-music",
      startDate: today,
      paymentMethod: "credit-card",
      notes: "Suscripción de Apple Music",
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
    },
  ];
}
