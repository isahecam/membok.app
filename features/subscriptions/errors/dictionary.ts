import { CommonActionErrorReason } from "@/features/subscriptions/errors/action.errors";
import { SubscriptionErrorReason } from "@/features/subscriptions/errors/subscription.errors";

type ErrorEntry = {
  title: string;
  message: string;
  severity: "error" | "warning" | "info";
};

const commonErrors: Record<CommonActionErrorReason, ErrorEntry> = {
  INVALID_DATA: {
    title: "Datos inválidos",
    message: "Revisa los campos del formulario e intenta de nuevo.",
    severity: "warning",
  },
  UNAUTHORIZED: {
    title: "Sesión requerida",
    message: "Inicia sesión para continuar.",
    severity: "warning",
  },
  FORBIDDEN: {
    title: "Sin permisos",
    message: "No tienes permiso para realizar esta acción.",
    severity: "error",
  },
};

// Errores específicos de subscriptions
const subscriptionErrors: Record<SubscriptionErrorReason, ErrorEntry> = {
  SUBSCRIPTION_LIMIT_REACHED: {
    title: "Límite alcanzado",
    message: "Has llegado al máximo de suscripciones de tu plan actual.",
    severity: "warning",
  },
  DUPLICATE_SUBSCRIPTION: {
    title: "Suscripción duplicada",
    message: "Ya tienes una suscripción activa con estos datos.",
    severity: "warning",
  },
  SUBSCRIPTION_NOT_FOUND: {
    title: "No encontrada",
    message: "No encontramos la suscripción que buscas.",
    severity: "info",
  },
  INTERNAL_ERROR: {
    title: "Error inesperado",
    message: "Algo salió mal. Intenta de nuevo en unos momentos.",
    severity: "error",
  },
};

// El diccionario unificado
export const errorDictionary = {
  ...commonErrors,
  ...subscriptionErrors,
  // ...otros features que vayas agregando
};

export type ErrorReason = keyof typeof errorDictionary;

// Fallback de seguridad
const fallbackError: ErrorEntry = {
  title: "Error inesperado",
  message: "Algo salió mal. Intenta de nuevo.",
  severity: "error",
};

export function getErrorEntry(reason: string): ErrorEntry {
  return errorDictionary[reason as ErrorReason] ?? fallbackError;
}
