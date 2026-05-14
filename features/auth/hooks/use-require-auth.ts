import { useQueryState } from "nuqs";
import { useCallback } from "react";

export function useRequireAuth(isAuthenticated: boolean) {
  const [, setAuth] = useQueryState("auth");

  return useCallback(
    (callback: () => void) => {
      if (!isAuthenticated) {
        setAuth("required");
        return;
      }
      callback();
    },
    [isAuthenticated, setAuth],
  );
}
