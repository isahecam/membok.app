const WEEK_DAYS = [
  { short: "Lun", full: "Lunes" },
  { short: "Mar", full: "Martes" },
  { short: "Mié", full: "Miércoles" },
  { short: "Jue", full: "Jueves" },
  { short: "Vie", full: "Viernes" },
  { short: "Sáb", full: "Sábado" },
  { short: "Dom", full: "Domingo" },
] as const;

export function CalendarDaysWeek() {
  return (
    <div className="@container/calendar-week grid w-full grid-cols-7 gap-px">
      {WEEK_DAYS.map(({ short, full }) => (
        <div
          key={full}
          aria-label={full}
          className="min-w-0 rounded-3xl bg-accent px-1 py-1 text-center text-xs font-medium text-muted-foreground @min-[26rem]/calendar-week:px-2">
          <span className="@min-[26rem]/calendar-week:hidden">{short}</span>
          <span className="hidden @min-[26rem]/calendar-week:inline">{full}</span>
        </div>
      ))}
    </div>
  );
}
