import { z } from "zod";

import { subscriptions } from "@/db/schema/subscriptions";
import { RepositoryError } from "@/features/subscriptions/errors/repository.errors";
import { SubscriptionSchema } from "@/features/subscriptions/schemas/subscription.schema";
import { Result } from "@/shared/lib/result";

export type Subscription = typeof subscriptions.$inferSelect;
export type NewSubscription = typeof subscriptions.$inferInsert;
export type SubscriptionPayload = z.infer<typeof SubscriptionSchema>;

export interface SubscriptionRepository {
  create(data: NewSubscription): Promise<Result<RepositoryError, Subscription>>;
  findByUserId(userId: string): Promise<Result<RepositoryError, Subscription[]>>;
  findById(id: string): Promise<Result<RepositoryError, Subscription>>;
  delete(id: string): Promise<Result<RepositoryError, void>>;
}
