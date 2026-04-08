# Interactive Wall Calendar

A premium, interactive React-based wall calendar featuring a physical scrapbook aesthetic, dynamic contextual notetaking, and fluid CSS animations. Built as part of a Frontend Engineering challenge.

## ✨ Features

### 1. 🎨 Dynamic Graphic & Watercolor Hero Header
- Features a **watercolor splash aesthetic** using advanced CSS blending (`mix-blend-multiply`), filters (`blur-3xl`), and rotation transitions.
- The hero section elegantly blends **Calligraphy** (`Dancing Script`) and **Sans-Serif** typographic combinations for daily motivational quotes mapping nicely to an organic physical layout.
- An animated, dynamic diagonal **cut design** separates the Hero image cleanly from the rest of the UI.
- The UI color palette is driven by a bespoke JSON-like theme configuration (`lib/themes.js`) where every month defines its own specific primary and subtle accent hues. The background UI responds vividly as you transition months.

### 2. 📝 Context-Aware Memo Layout
A minimalist, lined notepad panel that dynamically shifts to match your selection state, saving data directly to your browser's persistent `localStorage`:
- **Monthly view**: Catch-all reminders for the active month.
- **Daily view**: Click any date to focus your notes only on that day.
- **Range view**: Select a date range (by clicking a start and end point) to automatically compartmentalize project-wide timelines and reminders.

### 3. 🎉 Global Holidays Integration
- Intelligently recognizes and highlights global standard holidays.
- Renders an emerald accent marker directly on the specific dates in the grid.
- Hovering reveals an interactive, styled tooltip directly overlapping adjacent calendar cells.

### 4. 🌀 Immersive 3D Page Flip
- Realistic **double-loop spiral binding** design utilizing pure CSS shadows, gradients, and a central wall-hanger hook.
- When traversing to the 'Next' or 'Previous' month, the calendar physically rotates on its X-axis resembling an actual page turning on the wall, complete with precise shadow and Z-index modifications.

### 5. ♿ Comprehensive Accessibility (A11y)
- Fully navigable purely by keyboard using `Tab`, `Arrow` keys, and `Space`/`Enter`.
- Extensive `aria-label`, `aria-live`, `aria-current`, and strict `role="grid"` logic handles screen reader clarity dynamically.
- Graceful visible focus-states utilizing `focus-within:ring-2` to never leave keyboard users lost.

## 🚀 Tech Stack Layer

- **Framework**: `React 19` + `Vite`
- **Styling**: `Tailwind CSS v4` + Standard CSS Keyframes
- **Icons**: `lucide-react`
- **Font Stack**: `Inter`, `Playfair Display`, `Dancing Script` (via Google Fonts)
- **Data Persistence**: Core `localStorage` Web API
- **Dates**: Pure Vanilla JavaScript `Date` operations (Zero bulky external date libraries)

## 📦 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and `npm` installed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Subhashini-K/TUF_Calendar_Task.git
   cd TUF_Calendar_Task
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the local development server**
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## 🛠 Project Structure

- `src/components/CalendarWidget.jsx`: The layout orchestrator and dynamic theme injector.
- `src/components/HeroImage.jsx`: Watercolor logic alongside the beautiful typographical quote engine.
- `src/components/CalendarGrid.jsx`: The matrix logic rendering the month, selection borders, holiday tooltips, and hover interactions!
- `src/components/NotesPanel.jsx`: Persistent custom-styled lined notepad component.
- `src/lib/holidays.js` & `src/lib/themes.js`: Hardcoded data dictionaries for dynamic UI logic.
- `src/index.css`: Tailwind configuration and complex CSS keyframe rules for the 3D-Flip animations.

---
*Built with ❤️ utilizing the elegance of Tailwind CSS v4.*
