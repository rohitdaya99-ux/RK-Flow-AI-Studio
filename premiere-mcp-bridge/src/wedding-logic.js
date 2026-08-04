export function getWeddingPlan(parsed) {
  const plans = {
    haldi: {
      story: "bright, playful, family-driven",
      shots: ["haldi application", "laughs", "family reactions", "details"],
      music: "upbeat festive",
      sfx: ["whoosh", "pop", "hit"],
      color: "warm yellow"
    },
    mehndi: {
      story: "intimate, detail-rich, graceful",
      shots: ["mehndi hands", "closeups", "smiles", "decor"],
      music: "light festive",
      sfx: ["sparkle", "soft whoosh"],
      color: "green warm"
    },
    sangeet: {
      story: "high energy, beat-driven",
      shots: ["dance floor", "crowd cheers", "fast cuts", "bass moments"],
      music: "high energy",
      sfx: ["bass hit", "rise", "impact"],
      color: "punchy cinematic"
    },
    baraat: {
      story: "movement, entry, celebration",
      shots: ["entry", "drums", "crowd motion", "hero walk"],
      music: "celebratory",
      sfx: ["boom", "hit", "rise"],
      color: "rich contrast"
    },
    pheras: {
      story: "ritual, sacred, calm",
      shots: ["fire", "couple closeups", "ritual details", "family blessings"],
      music: "soft devotional",
      sfx: ["subtle swell"],
      color: "gold calm"
    },
    vidaai: {
      story: "emotional farewell",
      shots: ["tears", "hugs", "blessings", "slow closeups"],
      music: "emotional slow",
      sfx: ["soft swell", "gentle rise"],
      color: "soft warm"
    },
    reception: {
      story: "glamour and polished energy",
      shots: ["stage entry", "smiles", "couple posing", "guest reactions"],
      music: "modern elegant",
      sfx: ["light hit", "sparkle"],
      color: "clean luxe"
    },
    reel: {
      story: "reference driven short form",
      shots: ["best cuts", "hook moment", "beat changes", "ending punch"],
      music: "match reference",
      sfx: ["match reference"],
      color: "auto"
    },
    generic: {
      story: "best moments compiled",
      shots: ["best clips", "hero shots"],
      music: "balanced",
      sfx: ["light whoosh"],
      color: "auto"
    }
  };

  return plans[parsed.event] || plans.generic;
}
