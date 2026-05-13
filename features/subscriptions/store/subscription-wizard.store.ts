import { create } from "zustand";

import { Service } from "@/features/subscriptions/lib/services-catalog";
import type { DateString } from "@/lib/date";

export const SUBSCRIPTION_WIZARD_STEPS = [
  {
    id: "services",
    name: "Selecciona un servicio",
    description: "Elige el servicio que deseas añadir a tu registro de suscripciones",
  },
  {
    id: "form",
    name: "Añade tu suscripción",
    description: "Completa los datos de tu suscripción para agregarla a tu registro",
  },
] as const;

export type SubscriptionWizardStep = (typeof SUBSCRIPTION_WIZARD_STEPS)[number];
export type SubscriptionWizardStepId = SubscriptionWizardStep["id"];

export function getStepById(id: SubscriptionWizardStepId): SubscriptionWizardStep {
  return SUBSCRIPTION_WIZARD_STEPS.find((s) => s.id === id)!;
}

type WizardState = {
  isOpen: boolean;
  stepId: SubscriptionWizardStepId;
  selectedDate: DateString | null;
  selectedService: Service | null;
  actions: {
    open: (date: DateString) => void;
    selectService: (service: Service) => void;
    goBackToServices: () => void;
    close: () => void;
  };
};

const initialState = {
  isOpen: false,
  stepId: "services" as SubscriptionWizardStepId,
  selectedDate: null,
  selectedService: null,
};

const useWizardStore = create<WizardState>((set) => ({
  ...initialState,
  actions: {
    open: (date) => set({ isOpen: true, stepId: "services", selectedDate: date }),
    selectService: (service) => set({ stepId: "form", selectedService: service }),
    goBackToServices: () => set({ stepId: "services", selectedService: null }),
    close: () => set(initialState),
  },
}));

// Selectores atómicos
export const useWizardIsOpen = () => useWizardStore((s) => s.isOpen);
export const useWizardStep = () => useWizardStore((s) => getStepById(s.stepId));
export const useWizardSelectedDate = () => useWizardStore((s) => s.selectedDate);
export const useWizardSelectedService = () => useWizardStore((s) => s.selectedService);
export const useWizardActions = () => useWizardStore((s) => s.actions);
