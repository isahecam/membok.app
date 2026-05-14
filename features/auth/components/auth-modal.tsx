"use client";

import { useQueryState } from "nuqs";
import { useCallback } from "react";

import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { authClient } from "@/lib/auth-client";
import { MembokLogo } from "@/shared/components/layout/membok-logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";

export function AuthModal() {
  const { data: session, isPending } = authClient.useSession();
  const [auth, setAuth] = useQueryState("auth");

  const isOpen = !isPending && !session && auth === "required";

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) setAuth(null);
    },
    [setAuth],
  );

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <MembokLogo className="mb-4" />
          <DialogTitle className="text-center">Controla tus suscripciones</DialogTitle>
          <DialogDescription className="text-center">
            Registra y organiza todos tus servicios en un solo lugar.
          </DialogDescription>
        </DialogHeader>
        <GoogleAuthButton />
      </DialogContent>
    </Dialog>
  );
}
