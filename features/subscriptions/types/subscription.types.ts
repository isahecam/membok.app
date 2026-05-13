import { z } from "zod";

import { SubscriptionSchema } from "@/features/subscriptions/schemas/subscription.schema";

export type SubscriptionPayload = z.infer<typeof SubscriptionSchema>;
