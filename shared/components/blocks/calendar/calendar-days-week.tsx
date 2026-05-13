const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function CalendarDaysWeek() {
  return (
    <div className="grid grid-cols-7 gap-px">
      {DAYS.map((day) => (
        <div
          key={day}
          className="rounded-4xl bg-accent px-2 py-1 text-center text-xs font-medium text-muted-foreground">
          {day}
        </div>
      ))}
    </div>
  );
}
