export type SubscriptionErrorReason =
  | "SUBSCRIPTION_LIMIT_REACHED"
  | "DUPLICATE_SUBSCRIPTION"
  | "SUBSCRIPTION_NOT_FOUND"
  | "INTERNAL_ERROR";

export type SubscriptionError = {
  reason: SubscriptionErrorReason;
  cause?: unknown;
};
