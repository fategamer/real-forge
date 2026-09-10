const Store = {
  key: "realforge-mvp-v2",
  data() {
    const raw = localStorage.getItem(this.key);
    if (raw) return JSON.parse(raw);
    const seed = {
      user: null, session: null,
      settings: { simple: true, quality: "standard" },
      projects: [
        { id: "p1", title: "Nairobi Night Campaign", description: "Urban cinematic stills", cover: "images/hero-nairobi.jpg", notes: "", created: Date.now() },
        { id: "p2", title: "Luxury Watch Launch", description: "Product stills", cover: "images/product-watch.jpg", notes: "", created: Date.now() }
      ],
      currentProject: "p1", items: [], history: [], credits: 3, plan: "trial"
    };
    localStorage.setItem(this.key, JSON.stringify(seed));
    return seed;
  },
  save(d) { localStorage.setItem(this.key, JSON.stringify(d)); },
  user() { return this.data().session; },
  setUser(u) { const d = this.data(); d.user = u; d.session = u; this.save(d); },
  logout() { const d = this.data(); d.session = null; this.save(d); },
  addItem(item) { const d = this.data(); d.items.unshift(item); this.save(d); return item; },
  get(id) { return this.data().items.find((i) => i.id === id); },
  update(id, patch) { const d = this.data(); const it = d.items.find((i) => i.id === id); if (!it) return null; Object.assign(it, patch); this.save(d); return it; },
  remove(id) { const d = this.data(); d.items = d.items.filter((i) => i.id !== id); this.save(d); },
  items(filter) {
    let list = this.data().items.slice();
    if (filter === "favorites") list = list.filter((i) => i.favorite);
    else if (filter === "images") list = list.filter((i) => i.kind === "image");
    else if (filter === "videos") list = list.filter((i) => i.kind === "video");
    else if (filter === "prompts") list = list.filter((i) => i.kind === "prompt");
    else if (filter && filter.startsWith("project:")) list = list.filter((i) => i.projectId === filter.slice(8));
    return list;
  },
  search(q, filter, sort) {
    let list = this.items(filter === "all" ? null : filter);
    if (q) { const s = q.toLowerCase(); list = list.filter((i) => (i.idea || "").toLowerCase().includes(s) || (i.prompt || "").toLowerCase().includes(s)); }
    list.sort((a, b) => sort === "oldest" ? a.created - b.created : b.created - a.created);
    return list;
  },
  toggleFav(id) { const it = this.get(id); if (it) this.update(id, { favorite: !it.favorite }); },
  project(id) { return this.data().projects.find((p) => p.id === id); },
  setCurrentProject(id) { const d = this.data(); d.currentProject = id; this.save(d); },
  credits() { const d = this.data(); if (typeof d.credits !== "number") { d.credits = 3; this.save(d); } return d.credits; },
  spendCredit() { const d = this.data(); if (typeof d.credits !== "number") d.credits = 3; if (d.credits < 1) return false; d.credits -= 1; this.save(d); return true; }
};
