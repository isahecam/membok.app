// shared/lib/postgres-errors.ts

/**
 * Detecta errores específicos de Postgres por su código SQLSTATE.
 * Solo agregar helpers para errores que queramos DISTINGUIR en la UX.
 * Los códigos están documentados en:
 * https://www.postgresql.org/docs/current/errcodes-appendix.html
 */
type PostgresError = { code: string };

function isPostgresError(error: unknown): error is PostgresError {
  return (
    typeof error === "object" && error !== null && "code" in error && typeof (error as PostgresError).code === "string"
  );
}

export function isUniqueViolation(error: unknown): boolean {
  return isPostgresError(error) && error.code === "23505";
}

export function isForeignKeyViolation(error: unknown): boolean {
  return isPostgresError(error) && error.code === "23503";
}
