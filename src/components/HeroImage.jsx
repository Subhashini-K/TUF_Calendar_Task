/**
 * HeroImage — Displays a full-width hero panel for the current month
 * with a seasonal gradient background, motivational quote,
 * month+year overlay badge, and a spiral binding effect at the top.
 *
 * Props:
 *   month — 0-indexed month number (0 = January)
 *   year  — full year (e.g. 2026)
 */

const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

/**
 * Motivational quotes — one per month, calligraphy style.
 */
const MONTH_QUOTES = [
  { text: "New Beginnings\nStart Here", author: "— embrace the fresh start" },
  { text: "Love Is\nWhat You Do", author: "— not what you say" },
  { text: "In Difficulty Lies\nOpportunity", author: "— Albert Einstein" },
  { text: "Every Flower Must\nGrow Through Dirt", author: "— keep rising" },
  { text: "Bloom Where\nYou Are Planted", author: "— grow boldly" },
  { text: "Chase The Sun\nFear No Storm", author: "— summer awaits" },
  { text: "Stars Can't Shine\nWithout Darkness", author: "— embrace the night" },
  { text: "Be The Light\nYou Wish To See", author: "— shine on" },
  { text: "How Beautiful\nTo Let Things Go", author: "— autumn wisdom" },
  { text: "Life Starts Over\nWhen It Gets Crisp", author: "— F. Scott Fitzgerald" },
  { text: "Gratitude Turns\nEnough Into Abundance", author: "— be thankful" },
  { text: "And So The\nAdventure Begins", author: "— welcome wonder" },
];

/**
 * Seasonal gradient backgrounds — curated color pairs per month.
 */
const MONTH_GRADIENTS = [
  /* Jan  */ "from-slate-700 via-blue-900 to-indigo-950",
  /* Feb  */ "from-pink-400 via-rose-500 to-fuchsia-600",
  /* Mar  */ "from-emerald-400 via-green-500 to-teal-600",
  /* Apr  */ "from-pink-300 via-rose-400 to-pink-500",
  /* May  */ "from-violet-500 via-purple-500 to-indigo-600",
  /* Jun  */ "from-amber-400 via-orange-400 to-rose-500",
  /* Jul  */ "from-cyan-400 via-sky-500 to-blue-600",
  /* Aug  */ "from-yellow-400 via-amber-500 to-orange-500",
  /* Sep  */ "from-orange-500 via-amber-600 to-yellow-700",
  /* Oct  */ "from-red-600 via-orange-700 to-amber-800",
  /* Nov  */ "from-amber-700 via-yellow-800 to-orange-900",
  /* Dec  */ "from-blue-800 via-indigo-900 to-slate-900",
];

/**
 * Decorative SVG patterns per season for visual interest.
 */
const getSeasonalDecor = (month) => {
  const season = Math.floor(((month + 1) % 12) / 3); // 0=winter, 1=spring, 2=summer, 3=fall

  switch (season) {
    case 0: // Winter — snowflake dots
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${4 + (i % 5) * 3}px`,
                height: `${4 + (i % 5) * 3}px`,
                top: `${(i * 17 + 5) % 90}%`,
                left: `${(i * 23 + 10) % 95}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      );
    case 1: // Spring — floating petals
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15" aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <div
              key={i}
              className="absolute w-3 h-4 rounded-full bg-white/80 rotate-45"
              style={{
                top: `${(i * 19 + 8) % 85}%`,
                left: `${(i * 27 + 5) % 90}%`,
              }}
            />
          ))}
        </div>
      );
    case 2: // Summer — sun rays
      return (
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[120%] pointer-events-none opacity-10" aria-hidden="true">
          <div className="w-full h-full rounded-full bg-white blur-3xl" />
        </div>
      );
    case 3: // Fall — leaf shapes
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-15" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="absolute w-4 h-5 rounded-[50%_50%_50%_0] bg-white/70"
              style={{
                top: `${(i * 21 + 12) % 80}%`,
                left: `${(i * 29 + 8) % 88}%`,
                transform: `rotate(${i * 36}deg)`,
              }}
            />
          ))}
        </div>
      );
    default:
      return null;
  }
};

/** Number of spiral holes to render */
const SPIRAL_HOLE_COUNT = 15;

export const HeroImage = ({ month, year }) => {
  const monthName = MONTH_NAMES[month];
  const quote = MONTH_QUOTES[month];
  const gradient = MONTH_GRADIENTS[month];

  return (
    <div className="relative w-full select-none">
      {/* ── Spiral Binding ── */}
      <div
        className="
          relative z-10 flex items-center justify-center
          w-full h-8 sm:h-10
          bg-[var(--color-surface-off-white)]
        "
        aria-hidden="true"
      >
        {/* Shadow strip below binding */}
        <div className="absolute top-full left-0 right-0 h-2 bg-gradient-to-b from-black/10 to-transparent z-10" />

        <div className="flex items-center justify-center gap-[clamp(8px,2.5vw,20px)] px-4">
          {Array.from({ length: SPIRAL_HOLE_COUNT }, (_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Ring */}
              <div
                className="
                  w-4 h-4 sm:w-5 sm:h-5
                  rounded-full
                  border-2 border-[var(--color-border-medium)]
                  bg-[var(--color-surface-off-white)]
                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]
                "
              />
              {/* Wire connector */}
              <div
                className="
                  w-[2px] h-2 sm:h-3
                  bg-[var(--color-border-medium)]
                  rounded-b-full
                "
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Hero Panel ── */}
      <div className={`relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-gradient-to-br ${gradient}`}>
        {/* Seasonal decorative elements */}
        {getSeasonalDecor(month)}

        {/* Quote text — calligraphy style */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 sm:px-16 z-10">
          <blockquote className="text-center">
            <p
              className="
                font-[var(--font-display)]
                text-2xl sm:text-4xl md:text-5xl
                font-extrabold text-white
                leading-snug tracking-tight
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]
                whitespace-pre-line
              "
            >
              {quote.text}
            </p>
            <footer
              className="
                mt-3 sm:mt-4
                text-xs sm:text-sm
                text-white/70 font-medium
                tracking-wider italic
              "
            >
              {quote.author}
            </footer>
          </blockquote>
        </div>

        {/* Subtle gradient overlay for depth */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"
        />

        {/* Diagonal accent shape (bottom-right) */}
        <div
          className="absolute bottom-0 right-0 w-[55%] h-[35%] pointer-events-none"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 200 100"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <polygon
              points="60,0 200,0 200,100 0,100"
              fill="var(--color-primary-blue)"
              opacity="0.85"
            />
          </svg>
        </div>

        {/* Month + Year Badge */}
        <div className="absolute bottom-3 right-4 sm:bottom-5 sm:right-6 text-right z-10">
          <p
            className="
              text-white/90 text-xs sm:text-sm
              font-semibold tracking-widest uppercase
              leading-none mb-0.5
            "
          >
            {year}
          </p>
          <h3
            className="
              text-white text-lg sm:text-2xl md:text-3xl
              font-extrabold uppercase tracking-wide
              leading-none
              font-[var(--font-body)]
            "
          >
            {monthName}
          </h3>
        </div>
      </div>
    </div>
  );
};
