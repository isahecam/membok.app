import { create } from "zustand";

import type { DateString } from "@/lib/date";

import { useWizardStore } from "./subscription-wizard.store";

type DaySubscriptionsState = {
  isOpen: boolean;
  selectedDate: DateString | null;
  actions: {
    open: (date: DateString) => void;
    close: () => void;
    addNew: () => void;
  };
};

const initialState = {
  isOpen: false,
  selectedDate: null,
};

export const useDaySubscriptionsStore = create<DaySubscriptionsState>((set, get) => ({
  ...initialState,
  actions: {
    open: (date) => set({ isOpen: true, selectedDate: date }),
    close: () => set(initialState),
    addNew: () => {
      const { selectedDate } = get();
      if (!selectedDate) return;

      set(initialState);

      useWizardStore.getState().actions.open(selectedDate);
    },
  },
}));

export const useDaySubscriptionsIsOpen = () => useDaySubscriptionsStore((s) => s.isOpen);
export const useDaySubscriptionsSelectedDate = () => useDaySubscriptionsStore((s) => s.selectedDate);
export const useDaySubscriptionsActions = () => useDaySubscriptionsStore((s) => s.actions);
