import { SubscriptionError } from "@/features/subscriptions/errors/subscription.errors";

export type CommonActionErrorReason = "INVALID_DATA" | "UNAUTHORIZED" | "FORBIDDEN";

export type CommonActionError = {
  reason: CommonActionErrorReason;
  cause?: unknown;
};

export type SubscriptionActionError = CommonActionError | SubscriptionError;
