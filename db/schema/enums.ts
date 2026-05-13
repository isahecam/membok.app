import { pgEnum } from "drizzle-orm/pg-core";

import { BILLING_CYCLES } from "@/features/subscriptions/lib/billing-cycles-catalog";
import { PAYMENT_METHODS } from "@/features/subscriptions/lib/payment-methods-catalog";
import { SERVICES } from "@/features/subscriptions/lib/services-catalog";

export const serviceEnum = pgEnum("service_enum", SERVICES);
export const billingCycleEnum = pgEnum("billing_cycle_enum", BILLING_CYCLES);
export const paymentMethodEnum = pgEnum("payment_method_enum", PAYMENT_METHODS);
