"use client";

import { User } from "better-auth";
import { goeyToast } from "goey-toast";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Spinner } from "@/shared/components/ui/spinner";
import { getUserInitials } from "@/shared/utils/get-user-initials";

interface Props {
  user: User;
}

export function UserMenuDropdown({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      goeyToast.promise(
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.refresh();
            },
          },
        }),
        {
          loading: "Cerrando sesión...",
          error: "No se pudo cerrar la sesión. Intenta de nuevo.",
          success: "Sesión cerrada correctamente",
          showTimestamp: false,
        },
      );
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto max-w-[min(100%,16rem)] gap-2 rounded-lg px-2 py-1.5">
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <Avatar size="lg">
              <AvatarImage src={user.image ?? undefined} alt="Avatar del usuario" />
              <AvatarFallback>{getUserInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom" sideOffset={4}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut} disabled={isPending}>
            {isPending ? (
              <>
                <Spinner />
                Cerrando sesión...
              </>
            ) : (
              <>
                <LogOut />
                Cerrar sesión
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
