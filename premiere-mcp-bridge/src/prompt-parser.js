export function parsePrompt(text = "") {
  const t = String(text).toLowerCase();

  const eventMap = [
    ["haldi", "haldi"],
    ["mehndi", "mehndi"],
    ["sangeet", "sangeet"],
    ["baraat", "baraat"],
    ["pheras", "pheras"],
    ["phera", "pheras"],
    ["vidaai", "vidaai"],
    ["vidai", "vidaai"],
    ["reception", "reception"],
    ["reel", "reel"]
  ];

  const event = eventMap.find(([key]) => t.includes(key))?.[1] || "generic";

  const tone =
    t.includes("emotional") || t.includes("sad") ? "emotional" :
    t.includes("energetic") || t.includes("high") ? "energetic" :
    t.includes("cinematic") ? "cinematic" :
    t.includes("fun") ? "playful" :
    "balanced";

  const faceMode =
    t.includes("photo") || t.includes("face") || t.includes("person") ? "face-bin" : "normal";

  const referenceMode =
    t.includes("instagram") || t.includes("youtube") || t.includes("link") || t.includes("reference")
      ? "reference-link"
      : "direct";

  const hasSfx = t.includes("sfx") || t.includes("sound") || t.includes("effects");
  const exportRequested = t.includes("export") || t.includes("render") || t.includes("save");

  return {
    event,
    tone,
    faceMode,
    referenceMode,
    hasSfx,
    exportRequested,
    raw: text
  };
}
