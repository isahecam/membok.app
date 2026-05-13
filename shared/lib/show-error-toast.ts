import { getErrorEntry } from "@/features/subscriptions/errors/dictionary";
import { gooeyToast } from "@/shared/components/ui/goey-toaster";

export function showErrorToast(reason: string) {
  const { title, message, severity } = getErrorEntry(reason);

  const toastFn = {
    error: gooeyToast.error,
    warning: gooeyToast.warning,
    info: gooeyToast.info,
  }[severity];

  toastFn(title, { description: message, showTimestamp: false });
}
