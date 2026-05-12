"use client";

import { goeyToast } from "goey-toast";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/lib/auth-client";
import { Google } from "@/shared/components/icons/google";
import { Button } from "@/shared/components/ui/button";
import { Spinner } from "@/shared/components/ui/spinner";

export function GoogleAuthButton() {
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () => {
    startTransition(() => {
      goeyToast.promise(
        authClient.signIn.social({
          provider: "google",
          callbackURL: "/",
          errorCallbackURL: "/",
          fetchOptions: {
            query: params,
          },
        }),
        {
          loading: "Redirigiendo...",
          error: "No pudimos conectar con Google. Intenta de nuevo.",
          success: "Redirección exitosa",
          showTimestamp: false,
        },
      );
    });
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleSignIn} aria-label="Continuar con Google" disabled={isPending}>
      {isPending ? (
        <>
          <Spinner />
          Redirigiendo...
        </>
      ) : (
        <>
          <Google />
          Continuar con Google
        </>
      )}
    </Button>
  );
}
