/**
 * REAL FORGE generation provider.
 * Swap look-dev for a live API inside generateImage().
 * Do not call this from the UI directly — use GenerationService.
 */
const ForgeProvider = {
  name: "lookdev",
  async enhancePrompt(idea, opts) {
    return RealityEngine.enhancePrompt(idea, opts);
  },
  async generateImage({ idea, enhanced }) {
    // Replace this block with xAI Imagine / other provider.
    // Keep the return shape: { url, kind }
    await new Promise((r) => setTimeout(r, 600));
    return {
      url: "https://picsum.photos/seed/" + encodeURIComponent((idea || "forge").slice(0, 32)) + "/1600/900",
      kind: "image",
      provider: this.name,
      prompt: enhanced || idea,
    };
  },
};
