const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

export function CalendarDaysWeek() {
  return (
    <div className="grid grid-cols-7 gap-px bg-zinc-200 dark:bg-zinc-800">
      {DAYS.map((day) => (
        <div key={day} className="bg-white px-2 py-1 text-center text-xs font-medium text-zinc-500 dark:bg-zinc-950">
          {day}
        </div>
      ))}
    </div>
  );
}
