/**
 * CalendarWidget — Root component for the interactive wall calendar.
 *
 * Manages shared state (currentMonth, currentYear, selectedRange)
 * and composes all child components:
 *   - CalendarHeader
 *   - HeroImage
 *   - CalendarGrid
 *   - NotesPanel
 */

export const CalendarWidget = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Components will be composed here in Step 7 */}
      <div className="rounded-xl shadow-[var(--shadow-calendar)] bg-[var(--color-surface-card)] p-6">
        <p className="text-[var(--color-text-muted)] text-center font-medium tracking-wide">
          Calendar Widget
        </p>
      </div>
    </div>
  );
};
