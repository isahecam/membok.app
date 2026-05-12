import {
  addDays,
  addMonths,
  addYears,
  differenceInDays,
  differenceInMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDate,
  getDay,
  getDaysInMonth,
  getMonth,
  getYear,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  isValid,
  parseISO,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  type Locale,
} from "date-fns";

import type { DateAdapter, DateString } from "./adapter.interface";

const ISO_FORMAT = "yyyy-MM-dd";
const ISO_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export class DateFnsDateAdapter implements DateAdapter {
  constructor(private readonly locale: Locale) {}

  // Internal helpers (no expuestos en la interface)
  private toDate(input: DateString): Date {
    return parseISO(input);
  }

  private toString(date: Date): DateString {
    return format(date, ISO_FORMAT);
  }

  // Base
  today(): DateString {
    return this.toString(new Date());
  }

  isValid(input: string): boolean {
    return ISO_REGEX.test(input) && isValid(parseISO(input));
  }

  format(date: DateString, formatStr: string): string {
    return format(this.toDate(date), formatStr, { locale: this.locale });
  }

  // Manipulación
  addDays(date: DateString, amount: number): DateString {
    return this.toString(addDays(this.toDate(date), amount));
  }
  addMonths(date: DateString, amount: number): DateString {
    return this.toString(addMonths(this.toDate(date), amount));
  }
  addYears(date: DateString, amount: number): DateString {
    return this.toString(addYears(this.toDate(date), amount));
  }
  subDays(date: DateString, amount: number): DateString {
    return this.toString(subDays(this.toDate(date), amount));
  }
  subMonths(date: DateString, amount: number): DateString {
    return this.toString(subMonths(this.toDate(date), amount));
  }

  // Extracción (normalizado a ISO 8601)
  getDay(date: DateString): number {
    const day = getDay(this.toDate(date));
    return day === 0 ? 6 : day - 1; // 0=domingo en date-fns → 0=lunes en ISO
  }
  getDate(date: DateString): number {
    return getDate(this.toDate(date));
  }
  getMonth(date: DateString): number {
    return getMonth(this.toDate(date));
  }
  getYear(date: DateString): number {
    return getYear(this.toDate(date));
  }

  // Mes/Semana información (ISO: semana empieza en lunes)
  getDaysInMonth(date: DateString): number {
    return getDaysInMonth(this.toDate(date));
  }
  startOfMonth(date: DateString): DateString {
    return this.toString(startOfMonth(this.toDate(date)));
  }
  endOfMonth(date: DateString): DateString {
    return this.toString(endOfMonth(this.toDate(date)));
  }
  startOfWeek(date: DateString): DateString {
    return this.toString(startOfWeek(this.toDate(date), { weekStartsOn: 1 }));
  }
  endOfWeek(date: DateString): DateString {
    return this.toString(endOfWeek(this.toDate(date), { weekStartsOn: 1 }));
  }

  // Intervalos
  eachDayOfInterval(start: DateString, end: DateString): DateString[] {
    return eachDayOfInterval({
      start: this.toDate(start),
      end: this.toDate(end),
    }).map((d) => this.toString(d));
  }

  // Comparación
  isBefore(date: DateString, dateToCompare: DateString): boolean {
    return isBefore(this.toDate(date), this.toDate(dateToCompare));
  }
  isAfter(date: DateString, dateToCompare: DateString): boolean {
    return isAfter(this.toDate(date), this.toDate(dateToCompare));
  }
  isEqual(date: DateString, dateToCompare: DateString): boolean {
    return isEqual(this.toDate(date), this.toDate(dateToCompare));
  }
  isSameMonth(date: DateString, dateToCompare: DateString): boolean {
    return isSameMonth(this.toDate(date), this.toDate(dateToCompare));
  }
  isSameDay(date: DateString, dateToCompare: DateString): boolean {
    return isSameDay(this.toDate(date), this.toDate(dateToCompare));
  }
  isToday(date: DateString): boolean {
    return isToday(this.toDate(date));
  }

  // Diferencias
  differenceInDays(dateLeft: DateString, dateRight: DateString): number {
    return differenceInDays(this.toDate(dateLeft), this.toDate(dateRight));
  }
  differenceInMonths(dateLeft: DateString, dateRight: DateString): number {
    return differenceInMonths(this.toDate(dateLeft), this.toDate(dateRight));
  }
}
