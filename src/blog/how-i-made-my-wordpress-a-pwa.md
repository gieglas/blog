---
title: How I made my wordpress a PWA
date: 2019-07-31
summary: " I discovered that it is fairly simple to convert your wordpress into a Progressive Web App, so I thought I’d share my experience"
image: wordpress-PWA.png
tags:
  - dev
---
Keeping up with the [PWA](https://developers.google.com/web/progressive-web-apps/){target="_blank"} frency, I discovered that it is fairly simple to convert your wordpress into a Progressive Web App, so I thought I’d share my exprerience.

Remember all you need to do to turn your WordPress site into a PWA are the 3 basic steps (for more on PWAs check out my posts about [why](../why-i-made-my-app-a-pwa/) and [how](../how-i-made-my-app-a-pwa/) I made my app a PWA) :

1. add a **[service worker](https://developers.google.com/web/fundamentals/primers/service-workers/){target="_blank"}**
2. add a **[manifest](https://developers.google.com/web/fundamentals/web-app-manifest/){target="_blank"}** file 
3. use **https**

Seems like there are a lot of ways to satisfy at least the first 2 steps. For the https step, you would have to take care of that with your hosting company, but remember to reference only HTTPS resources in your site.

So back to the ways to add a service worker and a manifest. You could use functionality in themes, custom javascript code, plugins and so on. I found that [Super Progressive Web Apps](https://superpwa.com/){target="_blank"} plugin is dead simple and to the point. You can set the options for the manifest and lets you define an offline page from the plugin’s admin page. Also as far as caching is concerned, every page you visit gets cached. Finally if you make a new post or change a post, the plugin takes care of it and make’s sure the visitors see the updated version of your site.

![Super Progressive Web Apps Screenshot 1](../../img/Super-Progressive-Web-Apps-1.png){.img-fluid .pop-small .govcy-mb-3}

![Super Progressive Web Apps Screenshot 2](../../img/Super-Progressive-Web-Apps-2.png){.img-fluid .pop-small .govcy-mb-3}

![Super Progressive Web Apps Screenshot 3](../../img/Super-Progressive-Web-Apps-3.png){.img-fluid .pop-small .govcy-mb-3}