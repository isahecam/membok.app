"use server";

import { SubscriptionSchema } from "@/features/subscriptions/schemas/subscription.schema";
import { subscriptionService } from "@/features/subscriptions/services/subscription.service";
import { SubscriptionPayload } from "@/features/subscriptions/types/subscription.types";
import { requireAuth } from "@/lib/auth-server";
import { err, ok } from "@/shared/lib/result";

export async function createSubscriptionAction(data: SubscriptionPayload) {
  const { success } = SubscriptionSchema.safeParse(data);

  if (!success) return err({ reason: "INVALID_DATA" });

  const [authError, session] = await requireAuth();

  if (authError) return err({ reason: "UNAUTHORIZED" });

  const [serviceError, subscription] = await subscriptionService.createSubscription(data, session.user.id);

  if (serviceError) {
    console.error("[Action] service returned error:", serviceError);
    return err({ reason: serviceError.reason });
  }

  return ok(subscription);
}
