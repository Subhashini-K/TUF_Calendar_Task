/**
 * Global Holidays Dictionary (2026 optimized)
 * Keyed by "MM-DD" (0-indexed month for JS Date)
 */
export const HOLIDAYS = {
  // January
  "0-1": "New Year's Day",
  "0-26": "Republic Day (India)",

  // February
  "1-14": "Valentine's Day",

  // March
  "2-8": "International Women's Day",
  "2-17": "St. Patrick's Day",

  // April
  "3-1": "April Fool's Day",
  "3-7": "World Health Day",
  "3-22": "Earth Day",

  // May
  "4-1": "Labour Day",
  "4-15": "International Day of Families",

  // June
  "5-5": "World Environment Day",
  "5-21": "International Yoga Day",

  // July
  "6-4": "US Independence Day",
  "6-14": "Bastille Day",

  // August
  "7-12": "International Youth Day",
  "7-15": "Independence Day (India)",

  // September
  "8-5": "Teachers' Day (India)",
  "8-21": "International Day of Peace",

  // October
  "9-2": "Gandhi Jayanti",
  "9-31": "Halloween",

  // November
  "10-14": "Children's Day (India)",

  // December
  "11-25": "Christmas Day",
  "11-31": "New Year's Eve",
};

/**
 * Checks if a given Date object corresponds to a holiday.
 * @param {Date} date 
 * @returns {string|null} The holiday name, or null.
 */
export const getHoliday = (date) => {
  if (!date) return null;
  const key = `${date.getMonth()}-${date.getDate()}`;
  return HOLIDAYS[key] || null;
};
