// Mortimeter's service worker. One job, on the phone only: if an updated page has been stored
// (Settings: Update app from PC / from GitHub), answer the next page load with it, so it becomes
// the real document and its scripts run fresh. Nothing stored, nothing changes.
//
// On a desktop it must not exist at all. One got registered in the Windows app and served a stale
// page from GitHub over the built-in one, so off Android this worker throws the stored page away
// and removes itself the moment it activates.
const ANDROID = /Android/i.test(self.navigator.userAgent || "");
self.addEventListener("install", e => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(
  ANDROID ? self.clients.claim()
          : caches.delete("osrs-page").then(() => self.registration.unregister()).then(() => self.clients.claim())
));
self.addEventListener("fetch", e => {
  if(!ANDROID) return;
  const req = e.request;
  if(req.method !== "GET") return;
  const url = new URL(req.url);
  const isPage = req.mode === "navigate" || url.pathname === "/" || /\/(index|OSRS-Buddy(-dev)?)\.html$/.test(url.pathname);
  if(!isPage) return;
  e.respondWith(
    caches.open("osrs-page").then(c => c.match("current")).then(hit => hit || fetch(req)).catch(() => fetch(req))
  );
});
