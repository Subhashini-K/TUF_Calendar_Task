/**
 * CalendarGrid — Renders a 7-column calendar grid with day range selection.
 *
 * Props:
 *   month         — 0-indexed month number (0 = January)
 *   year          — full year (e.g. 2026)
 *   selectedRange — { start: Date | null, end: Date | null }
 *   onRangeChange — callback({ start, end }) emitted on selection change
 */

import { useState, useCallback, useMemo } from "react";
import { getHoliday } from "../lib/holidays";

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
  return day === 0 ? 6 : day - 1;
};

/**
 * Checks if two Date objects represent the same calendar day.
 */
const isSameDay = (dateA, dateB) => {
  if (!dateA || !dateB) return false;
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};

/**
 * Checks if a date falls between two other dates (inclusive).
 */
const isInRange = (date, start, end) => {
  if (!date || !start || !end) return false;
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

/**
 * Builds the full grid of day cells including overflow from
 * the previous and next months.
 */
const buildCalendarDays = (year, month) => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOffset(year, month);
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const cells = [];

  // Previous month overflow days
  for (let i = firstDayOffset - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const dateObj = new Date(prevYear, prevMonth, day);
    cells.push({
      day,
      date: dateObj,
      isCurrentMonth: false,
      holiday: getHoliday(dateObj),
    });
  }

  // Current month days
  const today = new Date();
  const isCurrentMonthYear = today.getMonth() === month && today.getFullYear() === year;

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    cells.push({
      day: d,
      date: dateObj,
      isCurrentMonth: true,
      isToday: isCurrentMonthYear && today.getDate() === d,
      holiday: getHoliday(dateObj),
    });
  }

  // Next month overflow days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const dateObj = new Date(nextYear, nextMonth, d);
      cells.push({
        day: d,
        date: dateObj,
        isCurrentMonth: false,
        holiday: getHoliday(dateObj),
      });
    }
  }

  // Mark weekends based on grid position
  cells.forEach((cell, index) => {
    const colIndex = index % 7;
    cell.isWeekend = colIndex === 5 || colIndex === 6;
  });

  return cells;
};

export const CalendarGrid = ({ month, year, selectedRange, onRangeChange }) => {
  const [hoveredDate, setHoveredDate] = useState(null);

  const days = useMemo(() => buildCalendarDays(year, month), [year, month]);

  const startDate = selectedRange?.start || null;
  const endDate = selectedRange?.end || null;

  /**
   * Determines the preview end date for hover highlighting.
   * Only shows when we have a start but no end yet.
   */
  const previewEnd = useMemo(() => {
    if (startDate && !endDate && hoveredDate) {
      return hoveredDate.getTime() >= startDate.getTime() ? hoveredDate : null;
    }
    return null;
  }, [startDate, endDate, hoveredDate]);

  /**
   * Handles day click for range selection:
   * - No start: set start
   * - Start exists, no end: set end (if >= start), or reset if before start
   * - Both exist: reset and set new start
   */
  const handleDayClick = useCallback(
    (cell) => {
      if (!cell.isCurrentMonth) return;

      const clickedDate = cell.date;

      if (!startDate || (startDate && endDate)) {
        // First click or third click (reset)
        onRangeChange?.({ start: clickedDate, end: null });
      } else {
        // Second click — start exists, no end
        if (clickedDate.getTime() >= startDate.getTime()) {
          onRangeChange?.({ start: startDate, end: clickedDate });
        } else {
          // Clicked before start — reset to new start
          onRangeChange?.({ start: clickedDate, end: null });
        }
      }
    },
    [startDate, endDate, onRangeChange]
  );

  const handleDayMouseEnter = useCallback((cell) => {
    if (cell.isCurrentMonth) {
      setHoveredDate(cell.date);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredDate(null);
  }, []);

  /**
   * Computes the visual state classes for a given day cell.
   */
  const getDayClasses = useCallback(
    (cell, index, daysLength) => {
      const classes = [];

      // Base styles
      classes.push(
        "relative flex items-center justify-center",
        "aspect-square",
        "text-sm sm:text-base font-medium",
        "bg-[var(--color-surface-white)]",
        "transition-all duration-[var(--transition-fast)]"
      );

      // Apply border radius to the extreme corners of the grid
      if (index === 0) classes.push("rounded-tl-lg");
      if (index === 6) classes.push("rounded-tr-lg");
      if (index === daysLength - 7) classes.push("rounded-bl-lg");
      if (index === daysLength - 1) classes.push("rounded-br-lg");

      if (!cell.isCurrentMonth) {
        classes.push("text-[var(--color-text-light)]", "cursor-default");
        return classes.join(" ");
      }

      // Interactive — current month days are clickable
      classes.push("cursor-pointer");

      const isStart = isSameDay(cell.date, startDate);
      const isEnd = isSameDay(cell.date, endDate);
      const inSelectedRange =
        startDate && endDate && isInRange(cell.date, startDate, endDate);
      const inPreviewRange =
        startDate && !endDate && previewEnd && isInRange(cell.date, startDate, previewEnd);

      // Selection states (priority order: start/end > in-range > today > weekend > default)
      if (isStart || isEnd) {
        classes.push(
          "!bg-[var(--color-selected-bg)] text-[var(--color-selected-text)]",
          "font-bold",
          "z-10"
        );
        // Note: within selection, applying explicit rounding for selection boundaries inside the grid
        if (isStart) classes.push("rounded-l-lg");
        if (isEnd) classes.push("rounded-r-lg");
        if (isStart && isEnd) classes.push("rounded-lg");
      } else if (inSelectedRange) {
        classes.push(
          "!bg-[var(--color-range-bg)] text-[var(--color-primary-blue)]",
          "font-semibold"
        );
      } else if (inPreviewRange) {
        classes.push(
          "!bg-[var(--color-range-hover)] text-[var(--color-primary-blue)]",
          "font-semibold"
        );
      } else if (cell.isToday) {
        classes.push("text-[var(--color-primary-blue)] font-bold");
      } else if (cell.isWeekend) {
        classes.push("text-[var(--color-weekend-text)]");
      } else {
        classes.push("text-[var(--color-text-dark)]");
      }

      // Hover effect for non-selected current month days
      if (!isStart && !isEnd && !inSelectedRange) {
        classes.push("hover:bg-[var(--color-surface-off-white)]");
      }

      return classes.join(" ");
    },
    [startDate, endDate, previewEnd]
  );

  return (
    <div
      className="px-3 pb-4 sm:px-5 sm:pb-5"
      role="grid"
      aria-label="Calendar grid"
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Day-of-week headers ── */}
      <div className="grid grid-cols-7 mb-1" role="row">
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
        className="grid grid-cols-7 gap-[1px] bg-[var(--color-border-light)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--color-primary-blue)] focus-within:ring-opacity-50 transition-all"
        role="rowgroup"
      >
        {days.map((cell, index) => {
          const isStart = cell.isCurrentMonth && isSameDay(cell.date, startDate);
          const isEnd = cell.isCurrentMonth && isSameDay(cell.date, endDate);

          const handleKeyDown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault(); // Prevent page scroll on Space
              handleDayClick(cell);
            }
          };

          return (
            <div
              key={`${cell.date.toISOString()}-${index}`}
              role="gridcell"
              tabIndex={cell.isCurrentMonth ? 0 : -1}
              aria-label={
                cell.isCurrentMonth
                  ? `${cell.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}${cell.isToday ? ", today" : ""}${isStart ? ", range start" : ""}${isEnd ? ", range end" : ""}`
                  : undefined
              }
              aria-selected={isStart || isEnd || undefined}
              aria-current={cell.isToday ? "date" : undefined}
              className={`${getDayClasses(cell, index, days.length)} group hover:z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--color-primary-blue)] focus-visible:z-20`}
              onClick={() => handleDayClick(cell)}
              onKeyDown={cell.isCurrentMonth ? handleKeyDown : undefined}
              onMouseEnter={() => handleDayMouseEnter(cell)}
            >
              <span className="relative z-10 select-none">{cell.day}</span>

              {/* Special Indicators Container */}
              <div className="absolute bottom-1 sm:bottom-1.5 left-0 right-0 flex justify-center gap-1">
                {/* Today indicator dot */}
                {cell.isToday && !isStart && !isEnd && (
                  <span
                    className="
                      w-1 h-1 sm:w-1.5 sm:h-1.5
                      rounded-full
                      bg-[var(--color-today-accent)]
                    "
                    aria-hidden="true"
                  />
                )}

                {/* Holiday indicator dot */}
                {cell.holiday && cell.isCurrentMonth && (
                  <span
                    className={`
                      w-1 h-1 sm:w-1.5 sm:h-1.5
                      rounded-full
                      ${isStart || isEnd ? 'bg-white' : 'bg-emerald-500'}
                    `}
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Holiday Tooltip */}
              {cell.holiday && cell.isCurrentMonth && (
                <div
                  className="
                    absolute bottom-full mb-2 left-1/2 -translate-x-1/2
                    hidden group-hover:block z-50
                    px-2 py-1
                    bg-gray-900 text-white text-xs font-medium
                    rounded shadow-lg whitespace-nowrap
                    pointer-events-none opacity-0 group-hover:opacity-100
                    transition-opacity duration-200
                  "
                >
                  {cell.holiday}
                  {/* Tooltip caret */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-gray-900" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Selection summary ── */}
      {startDate && (
        <div className="mt-3 text-center text-xs sm:text-sm text-[var(--color-text-muted)]">
          {endDate ? (
            <span>
              Selected: <strong className="text-[var(--color-primary-blue)]">
                {startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </strong>
              {" — "}
              <strong className="text-[var(--color-primary-blue)]">
                {endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              </strong>
            </span>
          ) : (
            <span className="italic">Click another day to complete range selection</span>
          )}
        </div>
      )}
    </div>
  );
};
