"use client";

import { useQueryState } from "nuqs";
import { Suspense } from "react";

import { getAuthErrorMessage } from "@/features/auth/lib/errors";
import { authSearchParamsParsers } from "@/features/auth/lib/search-params";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/shared/components/ui/alert-dialog";

function AuthErrorDialogInner() {
  const [error, setError] = useQueryState("error", authSearchParamsParsers.error);

  const message = getAuthErrorMessage(error);

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

export function AuthErrorDialog() {
  return (
    <Suspense fallback={null}>
      <AuthErrorDialogInner />
    </Suspense>
  );
}
