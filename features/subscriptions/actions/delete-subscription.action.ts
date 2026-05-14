"use server";

import { z } from "zod";

import { subscriptionService } from "@/features/subscriptions/services/subscription.service";
import { requireAuth } from "@/lib/auth-server";
import { err, ok } from "@/shared/lib/result";

const SubscriptionIdSchema = z.uuid();

export async function deleteSubscriptionAction(subscriptionId: string) {
  const parsed = SubscriptionIdSchema.safeParse(subscriptionId);

  if (!parsed.success) return err({ reason: "INVALID_DATA" });

  const [authError, session] = await requireAuth();

  if (authError) return err({ reason: "UNAUTHORIZED" });

  const [serviceError] = await subscriptionService.deleteSubscription(parsed.data, session.user.id);

  if (serviceError) {
    console.error("[Action] deleteSubscription:", serviceError);
    return err({ reason: serviceError.reason });
  }

  return ok(undefined);
}
