"use client";

import { useQueryState } from "nuqs";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";
import { getAuthErrorMessage } from "@/shared/errors/auth-errors";

export function AuthErrorDialog() {
  const [error, setError] = useQueryState("error");

  const message = getAuthErrorMessage(error ?? undefined);

  if (!error || !message) return null;

  return (
    <AlertDialog open>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{message.reason}</AlertDialogTitle>
          <AlertDialogDescription>{message.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setError(null)}>Cerrar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
