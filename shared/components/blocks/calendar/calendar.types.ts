import type { DateString } from "@/lib/date";

export type CalendarDay = {
  date: DateString;
  dayOfMonth: number;
  isToday: boolean;
  isCurrentMonth: boolean;
};

export type CalendarActions = {
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  goToDate: (date: DateString) => void;
};

export type CalendarState = {
  today: DateString;
  currentDate: DateString;
  month: number;
  year: number;
  daysInMonth: number;
  calendarDays: CalendarDay[];
  actions: CalendarActions;
};
