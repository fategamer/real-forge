const RealityEngine = {
  async enhancePrompt(idea, opts = {}) {
    const text = (idea || "").trim();
    const style = opts.style || "Cinematic";
    const camera = opts.camera || "Medium shot";
    const lens = opts.lens || "50mm";
    const lighting = opts.lighting || "Cinematic lighting";
    const atmosphere = opts.atmosphere || "Dramatic";
    const lower = text.toLowerCase();
    let environment = "an environment inferred from the idea";
    if (lower.includes("nairobi")) environment = "busy Nairobi street with realistic urban architecture";
    if (lower.includes("watch")) environment = "dark volcanic stone surface in a controlled studio";
    if (lower.includes("savanna") || lower.includes("landscape")) environment = "open African landscape after rainfall";
    if (lower.includes("car") || lower.includes("tunnel")) environment = "neon-lit tunnel with wet asphalt";
    if (lower.includes("woman") && lower.includes("city")) environment = "futuristic city at sunrise";
    const enhanced = [
      text.replace(/\.$/, ""),
      environment,
      lighting.toLowerCase(),
      "realistic skin texture where people are present",
      "accurate fabric and material detail",
      "cinematic " + lens + " lens",
      camera.toLowerCase(),
      "shallow depth of field",
      "natural shadows",
      atmosphere.toLowerCase() + " mood",
      style.toLowerCase() + " photorealistic commercial cinematography",
    ].filter(Boolean).join(", ") + ".";
    return {
      enhancedPrompt: enhanced,
      negativePrompt: "blurry details, distorted hands, extra fingers, unnatural eyes, warped objects, unreadable text, plastic skin, low resolution",
    };
  },
};
const GenerationService = {
  sizeFor(aspect) {
    const map = { "1:1": [1024, 1024], "16:9": [1280, 720], "9:16": [768, 1344], "4:5": [1024, 1280] };
    return map[aspect] || [1280, 720];
  },
  async generateImage({ idea, enhanced, mode, aspect }) {
    const prompt = (enhanced || idea || "photoreal cinematic commercial still").slice(0, 900);
    const [w, h] = this.sizeFor(aspect);
    const url = "https://image.pollinations.ai/prompt/" + encodeURIComponent(prompt) +
      "?width=" + w + "&height=" + h + "&nologo=true&model=flux&seed=" + Date.now();
    return { url, kind: /video|t2v|i2v/.test(mode || "") ? "video" : "image" };
  },
  analyzeQuality() {
    return { score: 90, checks: [["Lighting", "ok"], ["Hands", "watch"]] };
  },
};
