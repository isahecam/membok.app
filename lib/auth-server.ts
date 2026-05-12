import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { err, ok } from "@/shared/lib/result";

export async function getServerSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireAuth() {
  const session = await getServerSession();

  if (!session) return err({ reason: "UNAUTHORIZED" });

  return ok(session);
}
