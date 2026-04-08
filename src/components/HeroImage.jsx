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
 * HeroImage — Displays the watercolor hero panel and calligraphy quote.
 */

const getMonthlyQuote = (month) => {
  const quotes = [
    // Jan
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Fresh</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Beginnings</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Start Here</span>
    </>,
    // Feb
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Love is</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Action</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Not Just Words</span>
    </>,
    // Mar
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Find Your</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Opportunity</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">In Every Challenge</span>
    </>,
    // Apr (Matches User's reference)
    <>
      <span className="font-sans font-black tracking-[0.3em] text-lg sm:text-xl uppercase text-gray-900 z-10">Good</span>
      <span className="font-calligraphy text-7xl sm:text-[110px] sm:leading-[0.8] -my-2 sm:-my-6 text-black z-20 drop-shadow-md">things</span>
      <span className="font-sans font-black tracking-[0.3em] text-lg sm:text-xl uppercase text-gray-900 z-10">Take</span>
      <span className="font-calligraphy text-7xl sm:text-[110px] sm:leading-[0.7] -mt-2 text-black z-20 drop-shadow-md">time</span>
    </>,
    // May
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Bloom</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Boldly</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Where You Stand</span>
    </>,
    // Jun
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Chase the</span>
      <span className="font-calligraphy text-7xl sm:text-[100px] sm:-my-4 -my-2 text-black z-20">Sun</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Fear No Storm</span>
    </>,
    // Jul
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Embrace</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">The Waves</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Of Adventure</span>
    </>,
    // Aug
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Be The</span>
      <span className="font-calligraphy text-7xl sm:text-[100px] sm:-my-4 -my-2 text-black z-20">Light</span>
    </>,
    // Sep
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Let</span>
      <span className="font-calligraphy text-7xl sm:text-[100px] sm:-my-4 -my-2 text-black z-20">It Go</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">With the Wind</span>
    </>,
    // Oct
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Life Starts</span>
      <span className="font-calligraphy text-7xl sm:text-[100px] sm:-my-4 -my-2 text-black z-20">Anew</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">When It Gets Crisp</span>
    </>,
    // Nov
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Find</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Gratitude</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">In Everything</span>
    </>,
    // Dec
    <>
      <span className="font-sans font-black tracking-[0.3em] text-xs sm:text-sm uppercase text-gray-800 z-10">Let The</span>
      <span className="font-calligraphy text-6xl sm:text-8xl -my-1 sm:-my-3 text-black z-20">Magic</span>
      <span className="font-sans font-bold tracking-[0.2em] text-xs sm:text-sm uppercase text-gray-800 z-10">Begin</span>
    </>,
  ];
  return quotes[month];
};

/** Number of spiral holes to render */
const SPIRAL_HOLE_COUNT = 32;

export const HeroImage = ({ month, year }) => {
  const monthName = MONTH_NAMES[month];

  return (
    <div className="relative w-full h-full select-none flex flex-col items-center">
      {/* ── Spiral Binding ── */}
      <div
        className="
          relative z-50 flex items-center justify-center
          w-full h-8 sm:h-10 shrink-0
          bg-white shadow-sm
        "
        aria-hidden="true"
      >
        <div className="absolute top-full left-0 right-0 h-[1px] bg-gray-200 z-10" />

        <div className="flex items-center justify-center gap-[clamp(4px,1vw,12px)] px-4">
          {Array.from({ length: SPIRAL_HOLE_COUNT }, (_, i) => {
            const isCenterHanger = i === Math.floor(SPIRAL_HOLE_COUNT / 2);

            return (
              <div key={i} className="relative flex flex-col items-center">
                {/* Center Wall Hanger Hook */}
                {isCenterHanger && (
                  <div className="absolute -top-6 w-8 h-10 -ml-4 flex flex-col items-center">
                    <div className="w-0.5 h-4 bg-gray-800" />
                    <div className="w-6 h-6 border-b-2 border-l-2 border-r-2 border-gray-800 rounded-b-lg rotate-180" />
                  </div>
                )}

                {/* Double Wire */}
                <div className="absolute -top-1 sm:-top-2 flex gap-[2px] sm:gap-[3px] z-20">
                  <div className="w-[1.5px] sm:w-[2px] h-[14px] sm:h-[18px] rounded-full bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" />
                  <div className="w-[1.5px] sm:w-[2px] h-[14px] sm:h-[18px] rounded-full bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 shadow-[1px_1px_1px_rgba(0,0,0,0.3)]" />
                </div>

                {/* Punched Hole */}
                <div
                  className="
                    w-2 h-2 sm:w-2.5 sm:h-2.5
                    rounded-full mt-1.5
                    bg-[var(--color-border-medium)]
                    shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]
                  "
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Watercolor Hero Panel ── */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:flex-1 lg:min-h-[420px] overflow-hidden bg-white">

        {/* Dynamic Watercolor Splashes using the active theme color */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden mix-blend-multiply opacity-50 sm:opacity-40 transition-opacity duration-1000">
          {/* Main big splash */}
          <div
            className="absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full blur-3xl transition-colors duration-1000"
            style={{ backgroundColor: "var(--color-primary-blue)" }}
            aria-hidden="true"
          />
          {/* Secondary splash (hue rotated to create an analogous color blend like real watercolor) */}
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] rounded-[100%_80%_90%_70%] blur-[60px] hue-rotate-30 opacity-70 transition-colors duration-1000"
            style={{ backgroundColor: "var(--color-primary-blue)" }}
            aria-hidden="true"
          />
          {/* Tertiary subtle splash offset */}
          <div
            className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full blur-[50px] -hue-rotate-30 opacity-40 transition-colors duration-1000"
            style={{ backgroundColor: "var(--color-primary-blue)" }}
            aria-hidden="true"
          />
        </div>

        {/* Quote Typography */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center text-center">
            {getMonthlyQuote(month)}
          </div>
        </div>

        {/* Filter overlay for textured paper feeling */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 mix-blend-multiply pointer-events-none z-30" />
      </div>
    </div>
  );
};
