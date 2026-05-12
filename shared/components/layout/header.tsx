import { getServerSession } from "@/lib/auth-server";
import { GoogleAuthButton } from "@/shared/components/auth/google-auth-button";
import { MembokLogo } from "@/shared/components/layout/membok-logo";
import { UserMenuDropdown } from "@/shared/components/profile/user-menu-dropdown";

export async function Header() {
  const session = await getServerSession();

  return (
    <header>
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <MembokLogo />
        <nav className="flex items-center gap-2">
          {session && <UserMenuDropdown user={session.user} />}
          {!session && <GoogleAuthButton />}
        </nav>
      </div>
    </header>
  );
}
