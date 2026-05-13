export type RepositoryErrorReason = "DATABASE_ERROR" | "NOT_FOUND" | "UNIQUE_VIOLATION";

export type RepositoryError = {
  reason: RepositoryErrorReason;
  cause?: unknown;
};
