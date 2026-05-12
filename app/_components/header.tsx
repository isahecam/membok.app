import { GoogleAuthButton } from "@/features/auth/components/google-auth-button";
import { UserMenuDropdown } from "@/features/profile/components/user-menu-dropdown";
import { getServerSession } from "@/lib/auth-server";
import { MembokLogo } from "@/shared/components/layout/membok-logo";

export async function Header() {
  const session = await getServerSession();

  return (
    <header>
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <MembokLogo />
        <nav className="flex items-center gap-2">
          {session ? <UserMenuDropdown user={session.user} /> : <GoogleAuthButton />}
        </nav>
      </div>
    </header>
  );
}
