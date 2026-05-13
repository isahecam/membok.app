"use client";

import { VariantProps } from "class-variance-authority";
import { goeyToast } from "goey-toast";
import { useSearchParams } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

import { authClient } from "@/lib/auth-client";
import { Google } from "@/shared/components/icons/google";
import { Button, buttonVariants } from "@/shared/components/ui/button";

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> & VariantProps<typeof buttonVariants>;

export function GoogleAuthButton({ children, variant = "ghost", size = "sm", disabled, ...props }: Props) {
  const params = useSearchParams();

  function handleSignIn() {
    const query = Object.fromEntries(params.entries());

    goeyToast.promise(
      authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/",
        fetchOptions: { query },
      }),
      {
        loading: "Redirigiendo...",
        error: "No pudimos conectar con Google. Intenta de nuevo.",
        success: "Redirección exitosa",
        showTimestamp: false,
      },
    );
  }

  return (
    <Button variant={variant} size={size} onClick={handleSignIn} disabled={disabled} {...props}>
      {children ?? (
        <>
          <Google />
          Continuar con Google
        </>
      )}
    </Button>
  );
}
