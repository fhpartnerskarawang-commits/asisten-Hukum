const C='lbh-v2';
const CORE=['./','index.html','manifest.json','icons/icon-192.png','icons/icon-512.png',
'https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.js','https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.4.2/mammoth.browser.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const r=e.request;if(r.method!=='GET'||r.url.includes('api.anthropic.com'))return;
 e.respondWith(caches.match(r).then(h=>h||fetch(r).then(n=>{const cp=n.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{});return n}).catch(()=>caches.match('index.html'))));
});
