export const PAYMENT_METHODS = ["credit-card", "debit-card", "bank-transfer", "cash"] as const;

export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

export type PaymentMethodMetadata = {
  label: string;
};

export const PAYMENT_METHODS_REGISTRY = {
  "credit-card": { label: "Tarjeta de crédito" },
  "debit-card": { label: "Tarjeta de débito" },
  "bank-transfer": { label: "Transferencia bancaria" },
  cash: { label: "Efectivo" },
} satisfies Record<PaymentMethod, PaymentMethodMetadata>;

export function getPaymentMethodMetadata(paymentMethod: PaymentMethod): PaymentMethodMetadata {
  return PAYMENT_METHODS_REGISTRY[paymentMethod];
}
