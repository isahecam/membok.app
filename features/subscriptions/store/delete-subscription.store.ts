// features/subscriptions/store/delete-subscription.store.ts
import { create } from "zustand";

import type { Subscription } from "../types/subscription.types";
import { useDaySubscriptionsStore } from "./day-subscriptions.store";

type DeleteSubscriptionState = {
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

const useDeleteSubscriptionStore = create<DeleteSubscriptionState>((set) => ({
  ...initialState,
  actions: {
    open: (subscription) => {
      // Cierra el modal del día si estaba abierto
      useDaySubscriptionsStore.getState().actions.close();

      // Abre este dialog con la suscripción a eliminar
      set({ isOpen: true, subscription });
    },
    close: () => set(initialState),
  },
}));

export const useDeleteSubscriptionIsOpen = () => useDeleteSubscriptionStore((s) => s.isOpen);
export const useDeleteSubscriptionTarget = () => useDeleteSubscriptionStore((s) => s.subscription);
export const useDeleteSubscriptionActions = () => useDeleteSubscriptionStore((s) => s.actions);
