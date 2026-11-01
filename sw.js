/* خدمة إشعارات ثمرة */
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};try{d=e.data.json()}catch(_){d={body:e.data?e.data.text():''}}
  e.waitUntil(self.registration.showNotification(d.title||'ثمرة',{body:d.body||'',icon:'icon-192.png',badge:'favicon-32.png',dir:'rtl',lang:'ar',data:{url:d.url||self.registration.scope}}))});
self.addEventListener('notificationclick',e=>{
  e.notification.close();const u=(e.notification.data&&e.notification.data.url)||self.registration.scope;
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{
    for(const c of l){if(c.url.startsWith(self.registration.scope)){return c.focus().then(()=>c.navigate?c.navigate(u):c)}}
    return self.clients.openWindow(u)}))});
