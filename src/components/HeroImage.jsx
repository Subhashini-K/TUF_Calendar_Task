/**
 * HeroImage — Displays a full-width hero image for the current month
 * with a month+year overlay badge and a spiral binding effect at the top.
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
 * Curated Unsplash images — one per month, themed seasonally.
 * Using Unsplash source URLs for reliable, high-quality images.
 */
const MONTH_IMAGES = [
  /* Jan  */ "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&h=500&fit=crop&q=80",
  /* Feb  */ "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=500&fit=crop&q=80",
  /* Mar  */ "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&h=500&fit=crop&q=80",
  /* Apr  */ "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=800&h=500&fit=crop&q=80",
  /* May  */ "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=800&h=500&fit=crop&q=80",
  /* Jun  */ "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=500&fit=crop&q=80",
  /* Jul  */ "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&h=500&fit=crop&q=80",
  /* Aug  */ "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&h=500&fit=crop&q=80",
  /* Sep  */ "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop&q=80",
  /* Oct  */ "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=500&fit=crop&q=80",
  /* Nov  */ "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=500&fit=crop&q=80",
  /* Dec  */ "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&h=500&fit=crop&q=80",
];

/** Number of spiral holes to render */
const SPIRAL_HOLE_COUNT = 15;

export const HeroImage = ({ month, year }) => {
  const imageSrc = MONTH_IMAGES[month];
  const monthName = MONTH_NAMES[month];
  const altText = `${monthName} ${year} — seasonal landscape`;

  return (
    <div className="relative w-full select-none">
      {/* ── Spiral Binding ── */}
      <div
        className="
          relative z-10 flex items-center justify-center gap-0
          w-full h-8 sm:h-10
          bg-[var(--color-surface-off-white)]
        "
        aria-hidden="true"
      >
        {/* Binding strip behind the holes */}
        <div className="absolute top-full left-0 right-0 h-2 bg-gradient-to-b from-black/10 to-transparent" />

        <div className="flex items-center justify-center gap-[clamp(8px,2.5vw,20px)] px-4">
          {Array.from({ length: SPIRAL_HOLE_COUNT }, (_, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* Ring / spiral loop */}
              <div
                className="
                  w-4 h-4 sm:w-5 sm:h-5
                  rounded-full
                  border-2 border-[var(--color-border-medium)]
                  bg-[var(--color-surface-off-white)]
                  shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]
                "
              />
              {/* Wire connector going down */}
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

      {/* ── Image Container ── */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden">
        {/* Main Image */}
        <img
          src={imageSrc}
          alt={altText}
          loading="lazy"
          className="
            w-full h-full object-cover
            transition-transform duration-[var(--transition-slow)]
            hover:scale-[1.02]
          "
        />

        {/* Subtle gradient overlay */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-t from-black/30 via-transparent to-transparent
            pointer-events-none
          "
        />

        {/* Diagonal accent shape (bottom-right) */}
        <div
          className="
            absolute bottom-0 right-0
            w-[55%] h-[35%]
            pointer-events-none
          "
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
        <div
          className="
            absolute bottom-3 right-4 sm:bottom-5 sm:right-6
            text-right z-10
          "
        >
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
