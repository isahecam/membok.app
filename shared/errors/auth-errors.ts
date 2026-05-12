interface AuthErrorMeta {
  reason: string;
  description?: string;
}

export const AUTH_ERROR_MESSAGES: Record<string, AuthErrorMeta> = {
  access_denied: {
    reason: "No se pudo acceder a la cuenta de Google.",
    description: "Algo salió mal al acceder a la cuenta de Google. Intenta nuevamente.",
  },
  default: {
    reason: "Ocurrió un error al iniciar sesión.",
  },
};

export function getAuthErrorMessage(error?: string) {
  if (!error) return null;
  return AUTH_ERROR_MESSAGES[error] ?? AUTH_ERROR_MESSAGES.default;
}
