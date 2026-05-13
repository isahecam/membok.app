import { z } from "zod";

import { BILLING_CYCLES } from "@/features/subscriptions/lib/billing-cycles-catalog";
import { PAYMENT_METHODS } from "@/features/subscriptions/lib/payment-methods-catalog";
import { SERVICES } from "@/features/subscriptions/lib/services-catalog";

export const SubscriptionSchema = z.object({
  name: z.string().nonempty("Establece el nombre de tu suscripción"),
  billingCycle: z.enum(BILLING_CYCLES),
  service: z.enum(SERVICES),
  startDate: z.iso.date({ error: "Establece la fecha de inicio de tu suscripción" }),
  amount: z
    .number({ error: "Establece el monto de tu suscripción" })
    .positive({ error: "Establece un monto mayor a 0" })
    .max(9_999_999, { error: "El monto es demasiado alto" })
    .multipleOf(0.01, { message: "Máximo 2 decimales" }),
  paymentMethod: z.enum(PAYMENT_METHODS),
  notes: z.string().nullish(),
});
