import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * CalendarHeader — Displays the current month name + year
 * with previous/next navigation arrows.
 *
 * Props:
 *   month  — 0-indexed month number (0 = January)
 *   year   — full year (e.g. 2026)
 *   onPrev — callback when left arrow is clicked
 *   onNext — callback when right arrow is clicked
 */

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

export const CalendarHeader = ({ month, year, onPrev, onNext }) => {
  const monthName = MONTH_NAMES[month];

  return (
    <header className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 select-none">
      {/* Previous Month Button */}
      <button
        id="calendar-prev-month"
        onClick={onPrev}
        aria-label={`Go to previous month`}
        className="
          group flex items-center justify-center
          w-9 h-9 sm:w-10 sm:h-10
          rounded-full
          text-[var(--color-text-muted)]
          hover:bg-[var(--color-range-bg)]
          hover:text-[var(--color-primary-blue)]
          active:scale-95
          transition-all duration-[var(--transition-fast)]
          cursor-pointer
        "
      >
        <ChevronLeft
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-[var(--transition-fast)] group-hover:-translate-x-0.5"
          strokeWidth={2.5}
        />
      </button>

      {/* Month + Year Display */}
      <div className="flex flex-col items-center gap-0.5">
        <h2
          className="
            font-[var(--font-display)]
            text-xl sm:text-2xl md:text-3xl
            font-extrabold tracking-tight
            text-[var(--color-text-dark)]
            leading-tight
          "
          aria-live="polite"
          aria-atomic="true"
        >
          {monthName}
        </h2>
        <span
          className="
            text-xs sm:text-sm
            font-semibold tracking-widest uppercase
            text-[var(--color-primary-blue)]
          "
        >
          {year}
        </span>
      </div>

      {/* Next Month Button */}
      <button
        id="calendar-next-month"
        onClick={onNext}
        aria-label={`Go to next month`}
        className="
          group flex items-center justify-center
          w-9 h-9 sm:w-10 sm:h-10
          rounded-full
          text-[var(--color-text-muted)]
          hover:bg-[var(--color-range-bg)]
          hover:text-[var(--color-primary-blue)]
          active:scale-95
          transition-all duration-[var(--transition-fast)]
          cursor-pointer
        "
      >
        <ChevronRight
          className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-[var(--transition-fast)] group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      </button>
    </header>
  );
};
