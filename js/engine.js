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
    const enhanced = [text.replace(/\.+$/, ""), environment, lighting.toLowerCase(), "cinematic " + lens + " lens", camera.toLowerCase(), atmosphere.toLowerCase() + " mood", style.toLowerCase() + " photorealistic commercial cinematography"].join(", ") + ".";
    return {
      enhancedPrompt: enhanced,
      suggested: { style, camera, lens, lighting, atmosphere, aspect: opts.aspect || "16:9" },
      negativePrompt: "blurry details, distorted hands, extra fingers, unnatural eyes, warped objects, duplicate subjects, unreadable text, oversaturated colors, plastic skin, low resolution"
    };
  }
};
const GenerationService = {
  pickFrame(idea) {
    const t = (idea || "").toLowerCase();
    if (t.includes("watch")) return "images/product-watch.jpg";
    if (t.includes("car")) return "images/product-auto.jpg";
    if (t.includes("woman")) return "images/character-amara.jpg";
    if (t.includes("landscape") || t.includes("rainfall")) return "images/scene-savanna.jpg";
    return "images/hero-nairobi.jpg";
  },
  async generateImage({ idea }) {
    await new Promise((r) => setTimeout(r, 900));
    return { url: this.pickFrame(idea), kind: "image" };
  },
  analyzeQuality() {
    return { score: 92, checks: [["Face structure","ok"],["Lighting consistency","ok"],["Background stability","ok"],["Hand detail","watch"]] };
  }
};
