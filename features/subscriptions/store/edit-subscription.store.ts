"use client";

import { create } from "zustand";

import type { Subscription } from "../types/subscription.types";
import { useDaySubscriptionsActions } from "./day-subscriptions.store";

type EditSubscriptionState = {
  isOpen: boolean;
  subscription: Subscription | null;
  actions: {
    open: (subscription: Subscription) => void;
    close: () => void;
  };
};

const initialState = {
  isOpen: false,
  subscription: null,
};

export const useEditSubscriptionStore = create<EditSubscriptionState>((set) => ({
  ...initialState,
  actions: {
    open: (subscription) => {
      // Cierra el modal del día si estaba abierto
      useDaySubscriptionsActions().close();

      // Abre este modal con la suscripción a editar
      set({ isOpen: true, subscription });
    },
    close: () => set(initialState),
  },
}));

export const useEditSubscriptionIsOpen = () => useEditSubscriptionStore((s) => s.isOpen);
export const useEditSubscriptionTarget = () => useEditSubscriptionStore((s) => s.subscription);
export const useEditSubscriptionActions = () => useEditSubscriptionStore((s) => s.actions);
