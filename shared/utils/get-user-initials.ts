export const getUserInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);

  return [parts.at(0), parts.at(-1)]
    .map((n) => n!.at(0))
    .join("")
    .toUpperCase();
};
