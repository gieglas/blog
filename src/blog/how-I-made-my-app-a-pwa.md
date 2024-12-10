---
title: How I made my app a PWA
date: 2019-07-29
summary: A guide on through how I turned my last app into a PWA.
image: Code-PWA.png
tags:
  - dev
  - pwa
---
I have [previously posted on why](../why-i-made-my-app-a-pwa/) I made my [app](../intellectual-and-industrial-property-eservices/) a Progressive Web App (or simply [PWA](https://developers.google.com/web/progressive-web-apps/){target="_blank"} ) and in this post I will try and explain _how_ I turned my app into a PWA.

Note that the code I am presenting in this post is just a sample. It is for educational purposes and will definitely not work if you simply copy and paste it. I just want to present some ideas around service workers and to show how easy it is to create a PWA and serve offline content. For other aspects of how I made the app check out [Online search registry (cRegistry)](../online-search-registry-cregistry/).

In my post I will focus on the 3 mandatory steps which are:

1. add a **[service worker](https://developers.google.com/web/fundamentals/primers/service-workers/){target="_blank"}**
2. add a **[manifest](https://developers.google.com/web/fundamentals/web-app-manifest/){target="_blank"}** file 
3. use **https**

### 1. Service Worker

As I mentioned in my previous post, the most important thing to transform your app into a PWA is the service worker.

#### App.js

The service worker is independent of the web page so the code must be on a separate file. There has to be a way though to connect your app with the service worker and that is better done while loading the page. In my code below I use the `jQuery on load` function to register the service worker. I also added an `EventListener`, to listen for messages from the service worker. In my example I simply get a message from the service worker that the user is offline so I can display an alert.

```js
$(window).on('load', function() {   
// ... 
registerSW();
});
 
function registerSW() { 
  if ('serviceWorker' in navigator) { 
    try {
        //register listener for messages
        navigator.serviceWorker.addEventListener('message', function(event) {
            //If message is offline        
            if (event.data == "Offline") {
                //custom function to show offline alert
                showGenericAlert("Offline","You are currently not connected to the internet. You can still use the site, but if you wish to use search service, you will need to reconnect to the internet.");
            } else if (event.data == "Online") {
                //custom function to hide offline alert
                hideGenericAlert();
            }
        });
        //register service worker code
        navigator.serviceWorker.register('./sw.js'); 
    } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.'); 
    }
  }
}
```

One note about the location of the service worker file. The service worker file (`sw.js` in this case) is located in the root of the domain as it defines it’s scope, meaning it will receive `fetch` events for everything on this domain.
#### sw.js

In my service worker I used a very simplistic approach for caching. I simply have a list of content that I wish to cache, add them to the cache on install and then serve that content on fetch. To break it down, I have added the following event listeners on the service worker (check out this [introduction on service worker](https://developers.google.com/web/fundamentals/primers/service-workers/){target="_blank"} for more information on the life cycle):

**Install**

During the install event, all the content that is defined in the “`staticAssets`” array are added to the cache with name “`cacheName`“.

Note that in order to force the browser to renew the cache, say in case we changed some static content, I would have to change the “`cacheName`“.

**Activate**

During the activate event, if the “`cacheName`” has changed, the old cache is deleted from the user’s browser.

**Fetch**

All the magic is done in the fetch event. The event will be fired whenever a resource is requested by the client and by calling call the `respondWith()` method, we get to change the HTTP response and update it with whatever you want. In our case, we want to enforce a cacheFirst policy, where we return a resource from the cache if found, else allow the fetch from the network. Also in the fetch event, I sent the message to the page (mentioned above) that the user is offline or online.

```js
const cacheName = 'pwa-conf-v6';
const offlineUrl = 'tmpl/offline/scripts.js';
// add static assets to be precached
const staticAssets = [
  '.',
  'favicon.ico',
  'index.html',
  'manifest.json',
  //JS
  'js/app.js',
  'js/bootstrap.js',
  'js/bootstrap.min.js',
  'js/jquery-3.2.1.min.js',
  'js/loading.gif',
  'js/loadingoverlay.min.js',
  'js/parsley.min.js',
  'js/sammy.js',
  //css
  'css/style.css',
  'css/bootstrap.min.css',
  //fonts
  'fonts/glyphicons-halflings-regular.woff2',
  //imgages
  'img/DRCOR.jpg',
  'img/icon-72x72.png',
  'img/icon-96x96.png',
  'img/icon-128x128.png',
  'img/icon-144x144.png',
  'img/icon-152x152.png',
  'img/icon-192x192.png',
  'img/icon-384x384.png',
  'img/icon-512x512.png',
  'img/loading.gif',
  'img/responsive.png',
  'img/thyreos.gif',
  'img/design.png',
  'img/newspaper.png',
  'img/patent.png',
  'img/publication.png',
  'img/trademark.png',
  'img/file.png',
  'img/pdf-file-format-symbol.png',
  'img/pdf-file-format-symbol_24.png',
  'img/file_24.png',
  'img/application_24.png',
  'img/upload_24.png',
  //templates
  'tmpl/headfoot.html',
  'tmpl/local.js',
  'tmpl/home/content.html',
  'tmpl/home/local.js',
  'tmpl/home/scripts.js',
  'tmpl/trademark/local.js',
  'tmpl/trademark/content.html',
  'tmpl/trademark/scripts.js',
  'tmpl/publications/local.js',
  'tmpl/publications/content.html',
  'tmpl/publications/scripts.js',
];
 
//install event
self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName); 
    await cache.addAll(staticAssets); 
});
 
//activate event
self.addEventListener('activate', event => {
  // delete any caches that aren't in expectedCaches
  // which will get rid of old cache version
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (!cacheName.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log("new version now ready to handle fetches!");
    })
  );
});
 
//fetch event
self.addEventListener("fetch", async event => {
  const req = event.request;
  event.respondWith(cacheFirst(req,navigator.onLine));  
});
 
async function cacheFirst(req,isOffline) {
    const cache = await caches.open(cacheName); 
  //used this to use ignoreSearch only on urls that have ? on url (because that makes everything slower)
  var hasQuery = req.url.indexOf("scripts.js?") != -1;
    const cachedResponse = await cache.match(req,{
        // ignore query section of the URL based on our variable
        ignoreSearch: hasQuery,
    });
   
  if (!isOffline){
    self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage("Offline");
    }));
  } else {
    self.clients.matchAll().then(all => all.forEach(client => {
        client.postMessage("Online");
    }));
  }
 
  if (cachedResponse == undefined) {console.log("Undefined:",req);  }
    return cachedResponse || fetch(req); 
}
```
### 2. Manifest

The manifest.json is a simple json file that simply explains to the browser how to install the app on the users’ device. It’s pretty much self explanatory, but do check out the [documentation](https://developer.mozilla.org/en-US/docs/Web/Manifest){target="_blank"} for more information.

```js
{
  "name": "DRCOR IP eServices",
  "short_name": "IP eServices",
  "start_url": ".",
  "display": "standalone",
  "background_color": "#E05830",
  "description": "Electronic Services of the Department of Registrar of Companies, Intellectual and Industrial Property Section",
  "theme_color": "#E05830",
  "icons": [
    {
      "src": "img/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "img/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "img/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "img/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "img/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "img/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```
### 3. HTTPS

There is no code involved in this step, other than making sure that all references to javascript files, image files, links and so on, are all in HTTPS. If just one of your references is not secure, then Chrome for example will not recognise your app as a PWA and will not show the message to your users to install the app. Check out [Why not padlock](https://www.whynopadlock.com/){target="_blank"} tool which gives you a nice analysis of your site’s security in respect to SSL and mixed content.

### Summary

The amount of effort involved to turn a Javascript App, or even any web site, into a PWA is not that big. The only challenge is understanding all the concepts that are used, especially when it comes to the service worker. I just hope my post helped shed some light this service worker concepts.