/**
 * CalendarWidget — Root component for the interactive wall calendar.
 *
 * Manages shared state (currentMonth, currentYear, selectedRange)
 * and composes all child components.
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

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prevMonth - 1;
    });
    // Reset selection when changing months
    setSelectedRange({ start: null, end: null });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prevMonth + 1;
    });
    // Reset selection when changing months
    setSelectedRange({ start: null, end: null });
  };

  const handleRangeChange = useCallback((range) => {
    setSelectedRange(range);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-xl shadow-[var(--shadow-calendar)] bg-[var(--color-surface-card)] overflow-hidden">
        <HeroImage month={currentMonth} year={currentYear} />
        <CalendarHeader
          month={currentMonth}
          year={currentYear}
          onPrev={handlePrevMonth}
          onNext={handleNextMonth}
        />
        <CalendarGrid
          month={currentMonth}
          year={currentYear}
          selectedRange={selectedRange}
          onRangeChange={handleRangeChange}
        />
        <NotesPanel
          selectedRange={selectedRange}
          month={currentMonth}
          year={currentYear}
        />
      </div>
    </div>
  );
};
