const V = "crucialrx-v2";
const PACKS = ["sl-ans_ad.js", "sl-ans_ch.js", "sl-ans_in.js", "sl-cns_ad.js", "sl-cns_an.js", "sl-cns_ap.js", "sl-cns_ep.js", "sl-cns_ga.js", "sl-cns_ic.js", "sl-cns_la.js", "sl-cns_mr.js", "sl-cns_pk.js", "sl-cns_se.js", "sl-cns_st.js", "sl-cv_an.js", "sl-cv_ar.js", "sl-cv_co.js", "sl-cv_dl.js", "sl-cv_du.js", "sl-cv_hf.js", "sl-cv_ht.js", "sl-gp_dd.js", "sl-gp_pd.js", "sl-gp_pg.js", "sl-gp_pk.js"];
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "favicon.ico", "apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("message", e => { if (e.data === "precache") e.waitUntil(caches.open(V).then(c => Promise.all(PACKS.map(p => c.match(p).then(m => m || c.add(p)).catch(() => 0))))); });
self.addEventListener("fetch", e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== "GET" || u.origin !== location.origin) return;
  if (r.mode === "navigate") { e.respondWith(fetch(r).then(x => { const c = x.clone(); caches.open(V).then(k => k.put("index.html", c)); return x; }).catch(() => caches.match("index.html"))); return; }
  e.respondWith(caches.match(r).then(h => h || fetch(r).then(x => { if (x.ok) { const c = x.clone(); caches.open(V).then(k => k.put(r, c)); } return x; })));
});
