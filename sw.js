// OSRS Buddy's service worker. One job: if an updated page has been stored (Settings: Update
// app from PC / from GitHub), answer the next page load with it, so it becomes the real document
// and its scripts run fresh. Nothing stored, nothing changes: every request goes to the app as
// built. It never caches anything on its own.
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || url.pathname === "/" || /\/(index|OSRS-Buddy(-dev)?)\.html$/.test(url.pathname);
  if(!isPage) return;
  e.respondWith(
    caches.open("osrs-page").then(c => c.match("current")).then(hit => hit || fetch(req)).catch(() => fetch(req))
  );
});
