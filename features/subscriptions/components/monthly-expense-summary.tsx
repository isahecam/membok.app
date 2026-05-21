import type { Subscription } from "@/features/subscriptions/types/subscription.types";
import { getMonthlyExpenseSummary } from "@/features/subscriptions/utils/get-monthly-expense-summary";
import { NativeCounterUp } from "@/shared/components/uitripled/native-counter-up-carbon";

interface Props {
  subscriptions: Subscription[];
}

export function MonthlyExpenseSummary({ subscriptions }: Props) {
  const { count, total } = getMonthlyExpenseSummary(subscriptions);

  return (
    <header className="grid grid-cols-2 items-center justify-between rounded-3xl bg-secondary p-4">
      <div className="flex flex-col gap-2 text-left">
        <p className="text-xs font-semibold text-pretty text-muted-foreground uppercase sm:text-sm">
          Gastos totales del mes
        </p>
        <NativeCounterUp value={total} className="text-2xl" prefix="$" decimals={2} />
      </div>
      <div className="flex flex-col gap-2 text-right">
        <p className="text-xs font-semibold text-pretty text-muted-foreground uppercase sm:text-sm">
          Suscripciones <span className="text-green-500">activas</span>
        </p>
        <NativeCounterUp value={count} className="text-2xl sm:text-3xl" />
      </div>
    </header>
  );
}
