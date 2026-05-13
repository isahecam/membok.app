import { subscriptionRepository } from "@/features/subscriptions/services/subscription.repository";
import { SubscriptionPayload, SubscriptionRepository } from "@/features/subscriptions/types/subscription.types";
import { err, ok } from "@/shared/lib/result";

class SubscriptionService {
  constructor(private readonly subscriptionRepository: SubscriptionRepository) {}

  async createSubscription(data: SubscriptionPayload, userId: string) {
    const [limitError, subscriptions] = await this.subscriptionRepository.findByUserId(userId);

    if (limitError) {
      console.error("[Service.createSubscription] findByUserId:", limitError);
      return err({ reason: "INTERNAL_ERROR" });
    }

    if (subscriptions.length >= 3) {
      return err({ reason: "SUBSCRIPTION_LIMIT_REACHED" });
    }

    const [createError, subscription] = await this.subscriptionRepository.create({
      ...data,
      userId,
    });

    // Caso previsto: traducir a error de dominio
    if (createError?.reason === "UNIQUE_VIOLATION") {
      console.error("[Service.createSubscription] duplicate:", createError);
      return err({ reason: "DUPLICATE_SUBSCRIPTION" });
    }

    // Catch-all: log con cause + genérico
    if (createError) {
      console.error("[Service.createSubscription] create failed:", createError);
      return err({ reason: "INTERNAL_ERROR" });
    }

    return ok(subscription);
  }
}

export const subscriptionService = new SubscriptionService(subscriptionRepository);
