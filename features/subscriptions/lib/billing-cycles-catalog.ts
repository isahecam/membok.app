export const BILLING_CYCLES = ["monthly", "yearly"] as const;

export type BillingCycle = (typeof BILLING_CYCLES)[number];

export type BillingCycleMetadata = {
  label: string;
  days: number;
};

export const BILLING_CYCLES_REGISTRY = {
  monthly: { label: "Mensual", days: 30 },
  yearly: { label: "Anual", days: 365 },
} satisfies Record<BillingCycle, BillingCycleMetadata>;

export function getBillingCycleMetadata(billingCycle: BillingCycle): BillingCycleMetadata {
  return BILLING_CYCLES_REGISTRY[billingCycle];
}
