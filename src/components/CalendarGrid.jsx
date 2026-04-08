/**
 * CalendarGrid — Renders a 7-column calendar grid for the given month/year.
 * Display only — no selection logic (added in Step 5).
 *
 * Props:
 *   month — 0-indexed month number (0 = January)
 *   year  — full year (e.g. 2026)
 */

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/**
 * Returns the number of days in a given month/year.
 */
const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * Returns the weekday index (0 = Monday .. 6 = Sunday)
 * for the first day of the given month/year.
 */
const getFirstDayOffset = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  // JS getDay(): 0=Sun, 1=Mon ... 6=Sat
  // We want: 0=Mon, 1=Tue ... 6=Sun
  return day === 0 ? 6 : day - 1;
};

/**
 * Builds the full grid of day cells including overflow from
 * the previous and next months.
 */
const buildCalendarDays = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOffset(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  const cells = [];

  // Previous month overflow days
  for (let i = firstDayOffset - 1; i >= 0; i--) {
    cells.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isOverflow: true,
    });
  }

  // Current month days
  const today = new Date();
  const isCurrentMonthYear = today.getMonth() === month && today.getFullYear() === year;

  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({
      day: d,
      isCurrentMonth: true,
      isOverflow: false,
      isToday: isCurrentMonthYear && today.getDate() === d,
      isWeekend: false, // will be set below based on position
    });
  }

  // Next month overflow days (fill remaining cells to complete last row)
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({
        day: d,
        isCurrentMonth: false,
        isOverflow: true,
      });
    }
  }

  // Mark weekends based on grid position (columns 5 & 6 = Sat & Sun)
  cells.forEach((cell, index) => {
    const colIndex = index % 7;
    cell.isWeekend = colIndex === 5 || colIndex === 6;
  });

  return cells;
};

export const CalendarGrid = ({ month, year }) => {
  const days = buildCalendarDays(year, month);

  return (
    <div className="px-3 pb-4 sm:px-5 sm:pb-5" role="grid" aria-label="Calendar grid">
      {/* ── Day-of-week headers ── */}
      <div
        className="grid grid-cols-7 mb-1"
        role="row"
      >
        {DAY_LABELS.map((label, index) => {
          const isWeekendHeader = index === 5 || index === 6;
          return (
            <div
              key={label}
              role="columnheader"
              aria-label={label}
              className={`
                py-2 text-center text-xs sm:text-sm font-semibold uppercase tracking-wider
                ${isWeekendHeader
                  ? "text-[var(--color-weekend-text)]"
                  : "text-[var(--color-text-muted)]"
                }
              `}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* ── Day cells grid ── */}
      <div
        className="grid grid-cols-7 gap-[1px] bg-[var(--color-border-light)] rounded-lg overflow-hidden"
        role="rowgroup"
      >
        {days.map((cell, index) => {
          // Build class list for the day cell
          const baseClasses = `
            relative flex items-center justify-center
            aspect-square
            text-sm sm:text-base font-medium
            bg-[var(--color-surface-white)]
            transition-colors duration-[var(--transition-fast)]
          `;

          let stateClasses = "";

          if (cell.isOverflow) {
            stateClasses = "text-[var(--color-text-light)]";
          } else if (cell.isToday) {
            stateClasses = "text-[var(--color-primary-blue)] font-bold";
          } else if (cell.isWeekend) {
            stateClasses = "text-[var(--color-weekend-text)]";
          } else {
            stateClasses = "text-[var(--color-text-dark)]";
          }

          return (
            <div
              key={`${cell.isOverflow ? "overflow" : "current"}-${cell.day}-${index}`}
              role="gridcell"
              aria-label={
                cell.isCurrentMonth
                  ? `${cell.day}`
                  : undefined
              }
              className={`${baseClasses} ${stateClasses}`}
            >
              <span className="relative z-10">{cell.day}</span>

              {/* Today indicator dot */}
              {cell.isToday && (
                <span
                  className="
                    absolute bottom-1 left-1/2 -translate-x-1/2
                    w-1 h-1 sm:w-1.5 sm:h-1.5
                    rounded-full
                    bg-[var(--color-today-accent)]
                  "
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
