import { eq } from "drizzle-orm";

import { db } from "@/db";
import { subscriptions } from "@/db/schema";
import { isUniqueViolation } from "@/features/subscriptions/errors/postgres-errors";
import { NewSubscription, SubscriptionRepository } from "@/features/subscriptions/types/subscription.types";
import { err, ok } from "@/shared/lib/result";

class DrizzleSubscriptionRepository implements SubscriptionRepository {
  async create(data: NewSubscription) {
    try {
      const [result] = await db.insert(subscriptions).values(data).returning();
      if (!result) return err({ reason: "DATABASE_ERROR" });
      return ok(result);
    } catch (error) {
      console.error("[Repo.create] caught:", error);
      if (isUniqueViolation(error)) {
        return err({ reason: "UNIQUE_VIOLATION", cause: error });
      }
      return err({ reason: "DATABASE_ERROR", cause: error });
    }
  }

  async findByUserId(userId: string) {
    try {
      const results = await db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
      return ok(results);
    } catch (error) {
      console.error("[Repo.findByUserId] caught:", error);
      return err({ reason: "DATABASE_ERROR", cause: error });
    }
  }

  async findById(id: string) {
    try {
      const [result] = await db.select().from(subscriptions).where(eq(subscriptions.id, id)).limit(1);
      if (!result) return err({ reason: "NOT_FOUND" });
      return ok(result);
    } catch (error) {
      return err({ reason: "DATABASE_ERROR", cause: error });
    }
  }

  async delete(id: string) {
    try {
      const [result] = await db.delete(subscriptions).where(eq(subscriptions.id, id)).returning();
      if (!result) return err({ reason: "NOT_FOUND" });
      return ok(undefined);
    } catch (error) {
      console.error("[Repo.deleteById] caught:", error);
      return err({ reason: "DATABASE_ERROR", cause: error });
    }
  }
}

export const subscriptionRepository = new DrizzleSubscriptionRepository();
