"use client";

import { create } from "zustand";

import { dt, type DateString } from "@/lib/date";

import type { CalendarDay, CalendarState } from "./calendar.types";

// Helpers (fuera del store, testables de forma aislada)
function buildCalendarDays(currentDate: DateString): CalendarDay[] {
  const start = dt.startOfWeek(dt.startOfMonth(currentDate));
  const end = dt.endOfWeek(dt.endOfMonth(currentDate));

  return dt.eachDayOfInterval(start, end).map((date) => ({
    date,
    dayOfMonth: dt.getDate(date),
    isToday: dt.isToday(date),
    isCurrentMonth: dt.isSameMonth(date, currentDate),
  }));
}

function buildDerivedState(currentDate: DateString) {
  return {
    currentDate,
    month: dt.getMonth(currentDate),
    year: dt.getYear(currentDate),
    daysInMonth: dt.getDaysInMonth(currentDate),
    calendarDays: buildCalendarDays(currentDate),
  };
}

// Store
const useCalendarStore = create<CalendarState>((set) => {
  const today = dt.today();

  const actions = {
    goToPrevMonth: () => set((s) => buildDerivedState(dt.subMonths(s.currentDate, 1))),

    goToNextMonth: () => set((s) => buildDerivedState(dt.addMonths(s.currentDate, 1))),

    goToToday: () => set(buildDerivedState(dt.today())),

    goToDate: (date: DateString) => set(buildDerivedState(date)),
  };

  return {
    today,
    ...buildDerivedState(today),
    actions,
  };
});

// Selectors (custom hooks atómicos)
export const useToday = () => useCalendarStore((s) => s.today);
export const useCurrentDate = () => useCalendarStore((s) => s.currentDate);
export const useMonth = () => useCalendarStore((s) => s.month);
export const useYear = () => useCalendarStore((s) => s.year);
export const useDaysInMonth = () => useCalendarStore((s) => s.daysInMonth);
export const useCalendarDays = () => useCalendarStore((s) => s.calendarDays);

// Acciones: un solo hook que devuelve el objeto estable de acciones
export const useCalendarActions = () => useCalendarStore((s) => s.actions);
