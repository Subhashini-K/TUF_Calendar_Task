import { CalendarWidget } from "./components/CalendarWidget";

const App = () => {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 sm:p-8 bg-[var(--color-surface-off-white)]">
      <CalendarWidget />
    </main>
  );
};

export default App;