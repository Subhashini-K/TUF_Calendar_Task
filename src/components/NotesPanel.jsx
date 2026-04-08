/**
 * NotesPanel — A lined notepad-style textarea for monthly notes.
 *
 * Shows a range-aware header when a date range is selected,
 * otherwise displays a generic monthly header.
 * Persists notes to localStorage keyed by "YYYY-MM".
 *
 * Props:
 *   selectedRange — { start: Date | null, end: Date | null }
 *   month         — 0-indexed month number (0 = January)
 *   year          — full year (e.g. 2026)
 */

import { useState, useEffect, useCallback } from "react";

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

/**
 * Formats a Date as "Mon D" (e.g. "Apr 3").
 */
const formatShortDate = (date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

/**
 * Generates context (key, header) based on the selection state.
 */
const getNotesContext = (selectedRange, year, month) => {
  const start = selectedRange?.start;
  const end = selectedRange?.end;

  // 1. MONTHLY NOTES (no selection)
  if (!start && !end) {
    return {
      key: `notes-monthly-${year}-${String(month + 1).padStart(2, "0")}`,
      header: `Notes — ${MONTH_NAMES[month]}`,
      placeholder: `Jot down important reminders for ${MONTH_NAMES[month]}...`,
    };
  }

  // 2. DAILY NOTES (only start selected, or start == end)
  if (start && (!end || start.getTime() === end.getTime())) {
    const y = start.getFullYear();
    const m = String(start.getMonth() + 1).padStart(2, "0");
    const d = String(start.getDate()).padStart(2, "0");
    
    return {
      key: `notes-daily-${y}-${m}-${d}`,
      header: `Notes: ${formatShortDate(start)}`,
      placeholder: `What's happening on ${formatShortDate(start)}?`,
    };
  }

  // 3. DATE RANGE NOTES (start and end selected)
  if (start && end) {
    const startStr = `${start.getFullYear()}-${start.getMonth() + 1}-${start.getDate()}`;
    const endStr = `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`;
    
    return {
      key: `notes-range-${startStr}-to-${endStr}`,
      header: `Notes: ${formatShortDate(start)} – ${formatShortDate(end)}`,
      placeholder: `Planning for ${formatShortDate(start)} to ${formatShortDate(end)}...`,
    };
  }
};

export const NotesPanel = ({ selectedRange, month, year }) => {
  const [notes, setNotes] = useState("");
  
  // Determine current notes context dynamically
  const ctx = getNotesContext(selectedRange, year, month);

  // Load notes from localStorage when context (storage key) changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(ctx.key);
    setNotes(savedNotes || "");
  }, [ctx.key]);

  // Save notes to localStorage on change
  const handleNotesChange = useCallback(
    (event) => {
      const value = event.target.value;
      setNotes(value);
      localStorage.setItem(ctx.key, value);
    },
    [ctx.key]
  );

  return (
    <div className="px-3 pb-4 sm:px-5 sm:pb-5 h-full flex flex-col">
      {/* ── Header ── */}
      <h3
        className="
          text-sm sm:text-base font-bold
          text-[var(--color-text-dark)]
          mb-3 px-2 tracking-wide
        "
      >
        {ctx.header}
      </h3>

      {/* ── Lined Textarea ── */}
      <div className="relative flex-1 bg-transparent overflow-hidden">
        {/* Subtle Ruled lines background matching standard calendar styling */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, transparent, transparent 31px, var(--color-border-light) 31px, var(--color-border-light) 32px)",
            backgroundPositionY: "2px",
          }}
        />

        <textarea
          id="calendar-notes-textarea"
          value={notes}
          onChange={handleNotesChange}
          placeholder={ctx.placeholder}
          aria-label={ctx.header}
          className="
            relative z-10 w-full h-full
            px-2 py-1
            bg-transparent
            text-sm sm:text-base font-medium
            text-[var(--color-text-dark)]
            resize-none
            outline-none
            placeholder:text-[var(--color-text-light)]
            placeholder:italic
            placeholder:font-normal
          "
          style={{ lineHeight: "32px" }}
        />
      </div>

      {/* ── Footer ── */}
      <div
        className="
          flex items-center justify-between
          pt-3 px-2
          shrink-0
        "
      >
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-[var(--color-text-light)] italic transition-opacity">
          {notes && (
            <>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              <span>Saved</span>
            </>
          )}
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-[var(--color-text-muted)] tracking-wider uppercase">
          {notes.length} chars
        </span>
      </div>
    </div>
  );
};
