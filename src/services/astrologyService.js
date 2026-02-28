const ZODIAC_DATA = [
  {
    name: "Capricorn",
    start: [12, 22],
    end: [1, 19],
    element: "Earth",
    rulingPlanet: "Saturn",
    traits: "Disciplined, practical, patient, and goal-oriented.",
  },
  {
    name: "Aquarius",
    start: [1, 20],
    end: [2, 18],
    element: "Air",
    rulingPlanet: "Uranus",
    traits: "Independent, innovative, humanitarian, and progressive.",
  },
  {
    name: "Pisces",
    start: [2, 19],
    end: [3, 20],
    element: "Water",
    rulingPlanet: "Neptune",
    traits: "Compassionate, intuitive, artistic, and empathetic.",
  },
  {
    name: "Aries",
    start: [3, 21],
    end: [4, 19],
    element: "Fire",
    rulingPlanet: "Mars",
    traits: "Bold, energetic, competitive, and action-driven.",
  },
  {
    name: "Taurus",
    start: [4, 20],
    end: [5, 20],
    element: "Earth",
    rulingPlanet: "Venus",
    traits: "Reliable, patient, grounded, and loyal.",
  },
  {
    name: "Gemini",
    start: [5, 21],
    end: [6, 20],
    element: "Air",
    rulingPlanet: "Mercury",
    traits: "Curious, expressive, adaptable, and quick-witted.",
  },
  {
    name: "Cancer",
    start: [6, 21],
    end: [7, 22],
    element: "Water",
    rulingPlanet: "Moon",
    traits: "Nurturing, emotional, protective, and intuitive.",
  },
  {
    name: "Leo",
    start: [7, 23],
    end: [8, 22],
    element: "Fire",
    rulingPlanet: "Sun",
    traits: "Confident, generous, creative, and charismatic.",
  },
  {
    name: "Virgo",
    start: [8, 23],
    end: [9, 22],
    element: "Earth",
    rulingPlanet: "Mercury",
    traits: "Analytical, practical, thoughtful, and detail-focused.",
  },
  {
    name: "Libra",
    start: [9, 23],
    end: [10, 22],
    element: "Air",
    rulingPlanet: "Venus",
    traits: "Balanced, diplomatic, social, and harmony-seeking.",
  },
  {
    name: "Scorpio",
    start: [10, 23],
    end: [11, 21],
    element: "Water",
    rulingPlanet: "Pluto",
    traits: "Passionate, determined, deep, and transformative.",
  },
  {
    name: "Sagittarius",
    start: [11, 22],
    end: [12, 21],
    element: "Fire",
    rulingPlanet: "Jupiter",
    traits: "Optimistic, adventurous, open-minded, and freedom-loving.",
  },
];

const LIFE_PATH_MEANINGS = {
  1: "Natural leader with strong independence and ambition.",
  2: "Diplomatic peacemaker who thrives in partnership.",
  3: "Creative communicator with expressive energy.",
  4: "Builder personality focused on structure and discipline.",
  5: "Freedom-seeker who adapts quickly to change.",
  6: "Responsible nurturer centered on care and harmony.",
  7: "Introspective thinker with spiritual and analytical depth.",
  8: "Driven achiever with business and leadership instincts.",
  9: "Compassionate idealist devoted to service and impact.",
};

const DEFAULT_COMPATIBILITY_DESCRIPTION =
  "A balanced match with space to grow through communication and mutual understanding.";

const COMPATIBILITY_MAP = {
  Aries: { Leo: "High", Cancer: "Low", Taurus: "Medium" },
  Taurus: { Virgo: "High", Aries: "Medium", Aquarius: "Low" },
  Gemini: { Libra: "High", Pisces: "Low", Scorpio: "Medium" },
  Cancer: { Pisces: "High", Aries: "Low", Sagittarius: "Medium" },
  Leo: { Aries: "High", Capricorn: "Low", Taurus: "Medium" },
  Virgo: { Taurus: "High", Gemini: "Medium", Sagittarius: "Low" },
  Libra: { Gemini: "High", Cancer: "Medium", Virgo: "Low" },
  Scorpio: { Cancer: "High", Aquarius: "Low", Gemini: "Medium" },
  Sagittarius: { Aries: "High", Virgo: "Low", Cancer: "Medium" },
  Capricorn: { Taurus: "High", Leo: "Low", Libra: "Medium" },
  Aquarius: { Gemini: "High", Taurus: "Low", Scorpio: "Medium" },
  Pisces: { Cancer: "High", Gemini: "Low", Leo: "Medium" },
};

const COMPATIBILITY_DETAILS = {
  High: {
    score: 85,
    description:
      "Strong natural alignment with supportive communication and long-term potential.",
  },
  Medium: {
    score: 65,
    description:
      "Moderate compatibility with good potential through patience and mutual effort.",
  },
  Low: {
    score: 40,
    description:
      "Different emotional styles may need consistent communication and compromise.",
  },
};

const isDateInRange = (month, day, start, end) => {
  const [startMonth, startDay] = start;
  const [endMonth, endDay] = end;

  if (startMonth > endMonth) {
    return (
      (month === startMonth && day >= startDay) ||
      (month === endMonth && day <= endDay) ||
      (month > startMonth || month < endMonth)
    );
  }

  if (month < startMonth || month > endMonth) {
    return false;
  }

  if (month === startMonth && day < startDay) {
    return false;
  }

  if (month === endMonth && day > endDay) {
    return false;
  }

  return true;
};

export const getZodiacSign = (day, month) => {
  const numericDay = Number(day);
  const numericMonth = Number(month);

  if (!numericDay || !numericMonth) {
    return null;
  }

  const sign = ZODIAC_DATA.find((entry) =>
    isDateInRange(numericMonth, numericDay, entry.start, entry.end)
  );

  if (!sign) {
    return null;
  }

  return {
    name: sign.name,
    element: sign.element,
    rulingPlanet: sign.rulingPlanet,
    traits: sign.traits,
  };
};

const reduceToSingleDigit = (value) => {
  let current = Number(value);

  while (current > 9) {
    current = String(current)
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  }

  return current;
};

export const calculateLifePathNumber = (dob) => {
  const digitsOnly = String(dob || "").replace(/\D/g, "");

  if (!digitsOnly) {
    return null;
  }

  const initialSum = digitsOnly
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);

  const lifePathNumber = reduceToSingleDigit(initialSum);

  if (lifePathNumber < 1 || lifePathNumber > 9) {
    return null;
  }

  return {
    lifePathNumber,
    meaning: LIFE_PATH_MEANINGS[lifePathNumber],
  };
};

export const getCompatibility = (sign1, sign2) => {
  const normalizedSign1 = String(sign1 || "").trim();
  const normalizedSign2 = String(sign2 || "").trim();

  if (!normalizedSign1 || !normalizedSign2) {
    return null;
  }

  const level =
    COMPATIBILITY_MAP[normalizedSign1]?.[normalizedSign2] ||
    COMPATIBILITY_MAP[normalizedSign2]?.[normalizedSign1] ||
    "Medium";

  const details = COMPATIBILITY_DETAILS[level] || {
    score: 65,
    description: DEFAULT_COMPATIBILITY_DESCRIPTION,
  };

  return {
    score: details.score,
    description: details.description,
  };
};
