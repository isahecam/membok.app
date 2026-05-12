export type DateString = string;

export interface DateAdapter {
  // Base
  today(): DateString;
  isValid(input: string): boolean;
  format(date: DateString, formatStr: string): string;

  // Manipulación
  addDays(date: DateString, amount: number): DateString;
  addMonths(date: DateString, amount: number): DateString;
  addYears(date: DateString, amount: number): DateString;
  subDays(date: DateString, amount: number): DateString;
  subMonths(date: DateString, amount: number): DateString;

  // Extracción (ISO 8601)
  getDay(date: DateString): number; // día de la semana 0-6 (0 = lunes, 6 = domingo)
  getDate(date: DateString): number; // día del mes 1-31
  getMonth(date: DateString): number; // mes 0-11
  getYear(date: DateString): number; // año

  // Mes/Semana información (ISO: semana empieza en lunes)
  getDaysInMonth(date: DateString): number;
  startOfMonth(date: DateString): DateString;
  endOfMonth(date: DateString): DateString;
  startOfWeek(date: DateString): DateString;
  endOfWeek(date: DateString): DateString;

  // Intervalos
  eachDayOfInterval(start: DateString, end: DateString): DateString[];

  // Comparación
  isBefore(date: DateString, dateToCompare: DateString): boolean;
  isAfter(date: DateString, dateToCompare: DateString): boolean;
  isEqual(date: DateString, dateToCompare: DateString): boolean;
  isSameMonth(date: DateString, dateToCompare: DateString): boolean;
  isSameDay(date: DateString, dateToCompare: DateString): boolean;
  isToday(date: DateString): boolean;

  // Diferencias (dateLeft - dateRight, positivo si dateLeft es posterior)
  differenceInDays(dateLeft: DateString, dateRight: DateString): number;
  differenceInMonths(dateLeft: DateString, dateRight: DateString): number;
}
