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
 * Generates the localStorage key for a given month/year.
 */
const getStorageKey = (year, month) => {
  const monthStr = String(month + 1).padStart(2, "0");
  return `calendar-notes-${year}-${monthStr}`;
};

/**
 * Formats a Date as "Mon D" (e.g. "Apr 3").
 */
const formatShortDate = (date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const NotesPanel = ({ selectedRange, month, year }) => {
  const [notes, setNotes] = useState("");
  const storageKey = getStorageKey(year, month);
  const monthName = MONTH_NAMES[month];

  // Load notes from localStorage when month/year changes
  useEffect(() => {
    const savedNotes = localStorage.getItem(storageKey);
    setNotes(savedNotes || "");
  }, [storageKey]);

  // Save notes to localStorage on change (debounced via the handler)
  const handleNotesChange = useCallback(
    (event) => {
      const value = event.target.value;
      setNotes(value);
      localStorage.setItem(storageKey, value);
    },
    [storageKey]
  );

  // Build the header text
  const hasRange = selectedRange?.start && selectedRange?.end;
  const headerText = hasRange
    ? `Notes for ${formatShortDate(selectedRange.start)} – ${formatShortDate(selectedRange.end)}`
    : `Monthly notes — ${monthName}`;

  return (
    <div className="px-3 pb-4 sm:px-5 sm:pb-5">
      <div
        className="
          rounded-lg overflow-hidden
          border border-[var(--color-border-light)]
          bg-[var(--color-surface-white)]
        "
      >
        {/* ── Header ── */}
        <div
          className="
            flex items-center gap-2
            px-4 py-2.5
            bg-[var(--color-surface-off-white)]
            border-b border-[var(--color-border-light)]
          "
        >
          <span className="text-base" aria-hidden="true">📝</span>
          <h3
            className="
              text-xs sm:text-sm font-semibold
              text-[var(--color-text-dark)]
              tracking-wide
            "
          >
            {headerText}
          </h3>
        </div>

        {/* ── Lined Textarea ── */}
        <div className="relative">
          {/* Ruled lines background */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent, transparent 31px, var(--color-border-light) 31px, var(--color-border-light) 32px)",
              backgroundPositionY: "7px",
            }}
          />

          {/* Red margin line */}
          <div
            className="
              absolute top-0 bottom-0 left-10
              w-[1px]
              bg-red-300/50
            "
            aria-hidden="true"
          />

          <textarea
            id="calendar-notes-textarea"
            value={notes}
            onChange={handleNotesChange}
            placeholder="Write your notes here..."
            aria-label={headerText}
            rows={6}
            className="
              relative z-10 w-full
              px-14 py-2
              bg-transparent
              text-sm sm:text-base
              text-[var(--color-text-dark)]
              leading-8
              resize-none
              outline-none
              placeholder:text-[var(--color-text-light)]
              placeholder:italic
            "
            style={{ lineHeight: "32px" }}
          />
        </div>

        {/* ── Footer with character count ── */}
        <div
          className="
            flex items-center justify-between
            px-4 py-1.5
            border-t border-[var(--color-border-light)]
            bg-[var(--color-surface-off-white)]
          "
        >
          <span className="text-[10px] sm:text-xs text-[var(--color-text-light)] italic">
            Auto-saved to browser
          </span>
          <span className="text-[10px] sm:text-xs text-[var(--color-text-light)]">
            {notes.length} chars
          </span>
        </div>
      </div>
    </div>
  );
};
