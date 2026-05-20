import type { Subscription } from "@/features/subscriptions/types/subscription.types";
import { getMonthlyExpenseSummary } from "@/features/subscriptions/utils/get-monthly-expense-summary";
import { NativeCounterUp } from "@/shared/components/uitripled/native-counter-up-carbon";

interface Props {
  subscriptions: Subscription[];
}

export function MonthlyExpenseSummary({ subscriptions }: Props) {
  const { count, total } = getMonthlyExpenseSummary(subscriptions);

  return (
    <header className="flex items-center justify-between rounded-3xl bg-muted p-4">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold text-muted-foreground uppercase">Gastos totales del mes</p>
        <NativeCounterUp value={total} className="text-4xl" prefix="$" decimals={2} />
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="text-sm font-semibold text-muted-foreground uppercase">Suscripciones Activas</p>
        <NativeCounterUp value={count} className="text-4xl" />
      </div>
    </header>
  );
}
