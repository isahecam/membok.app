"use client";

import { useQueryState } from "nuqs";
import { Suspense } from "react";

import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { getAuthErrorMessage } from "@/features/auth/lib/errors";
import { authSearchParamsParsers } from "@/features/auth/lib/search-params";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
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
          <AlertDialogCancel variant="outline" onClick={() => setError(null)}>
            Cerrar
          </AlertDialogCancel>
          <GoogleAuthButton variant="default" size="default">
            Reintentar
          </GoogleAuthButton>
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
