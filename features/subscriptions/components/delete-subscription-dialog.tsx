"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteSubscriptionAction } from "@/features/subscriptions/actions/delete-subscription.action";
import { SERVICES_REGISTRY } from "@/features/subscriptions/lib/services-catalog";
import {
  useDeleteSubscriptionActions,
  useDeleteSubscriptionIsOpen,
  useDeleteSubscriptionTarget,
} from "@/features/subscriptions/store/delete-subscription.store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { gooeyToast } from "@/shared/components/ui/goey-toaster";
import { Spinner } from "@/shared/components/ui/spinner";
import { showErrorToast } from "@/shared/lib/show-error-toast";

export function DeleteSubscriptionDialog() {
  const router = useRouter();
  const isOpen = useDeleteSubscriptionIsOpen();
  const subscription = useDeleteSubscriptionTarget();
  const { close } = useDeleteSubscriptionActions();
  const [isPending, startTransition] = useTransition();

  if (!subscription) return null;

  const service = SERVICES_REGISTRY[subscription.service];

  function handleConfirm() {
    if (!subscription) return;

    startTransition(async () => {
      const [error] = await deleteSubscriptionAction(subscription.id);

      if (error) {
        showErrorToast(error.reason);
        return;
      }

      gooeyToast.success("Suscripción eliminada correctamente", {
        showTimestamp: false,
      });

      close();
      router.refresh();
    });
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Eliminar esta suscripción?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de eliminar <strong>{service.name}</strong>. Esta acción no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending} onClick={() => !isPending && close()}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isPending} variant="destructive">
            {isPending ? (
              <>
                <Spinner /> Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
