interface AuthErrorMeta {
  reason: string;
  description?: string;
}

export const AUTH_ERROR_MESSAGES: Record<string, AuthErrorMeta> = {
  access_denied: {
    reason: "No pudimos conectar tu cuenta de Google",
    description:
      "Tus datos están seguros, pero hubo un problema al intentar sincronizar la información. Por favor, intenta nuevamente.",
  },
  default: {
    reason: "Ocurrió un error al iniciar sesión.",
  },
};

export function getAuthErrorMessage(error?: string) {
  if (!error) return null;
  return AUTH_ERROR_MESSAGES[error] ?? AUTH_ERROR_MESSAGES.default;
}
