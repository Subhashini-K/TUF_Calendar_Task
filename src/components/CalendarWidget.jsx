/**
 * CalendarWidget — Root component for the interactive wall calendar.
 *
 * Composes the full calendar layout:
 *   Desktop: left panel = HeroImage, right panel = Header + Grid + Notes
 *   Mobile:  stacked — HeroImage → Header → Grid → Notes
 *
 * Manages all shared state: currentMonth, currentYear, selectedRange.
 */

import { useState, useCallback } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { HeroImage } from "./HeroImage";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";

export const CalendarWidget = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedRange, setSelectedRange] = useState({ start: null, end: null });

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prevMonth - 1;
    });
    setSelectedRange({ start: null, end: null });
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prevMonth + 1;
    });
    setSelectedRange({ start: null, end: null });
  }, []);

  const handleRangeChange = useCallback((range) => {
    setSelectedRange(range);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-0">
      <div
        className="
          rounded-xl overflow-hidden
          shadow-[var(--shadow-calendar)]
          bg-[var(--color-surface-card)]
          transition-shadow duration-[var(--transition-normal)]
          hover:shadow-[var(--shadow-calendar-hover)]
          flex flex-col
        "
      >
        {/* ── Top Panel: Hero Image (Full Width) ── */}
        <HeroImage month={currentMonth} year={currentYear} />

        {/* ── Middle Panel: Header ── */}
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />

        {/* Subtle separator */}
        <div className="mx-5 h-[1px] bg-[var(--color-border-light)] shrink-0" />

        {/* ── Bottom Panel: Notes (Left) + Grid (Right) ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] lg:grid-cols-[1fr_2fr] gap-4 sm:gap-0 pt-2 sm:pt-4">
          <div className="h-full">
            {/* Notes Panel */}
            <NotesPanel
              selectedRange={selectedRange}
              month={currentMonth}
              year={currentYear}
            />
          </div>

          <div className="h-full border-t sm:border-t-0 sm:border-l border-[var(--color-border-light)]">
            {/* Calendar Grid */}
            <CalendarGrid
              month={currentMonth}
              year={currentYear}
              selectedRange={selectedRange}
              onRangeChange={handleRangeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
