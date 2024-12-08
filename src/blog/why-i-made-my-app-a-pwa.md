---
title: Why I made my app a PWA
date: 2019-07-26
summary: A walk through why I developed the Intellectual and Industrial Property eServices app as a Progressive Web App (or simply PWA).
image: DRCOR_PWA.png
tags:
  - dev
---
In my previous post I talked about the [Intellectual and Industrial Property eServices](../intellectual-and-industrial-property-eservices/) app and in this post I will talk about why I developed it as a Progressive Web App (or simply PWA).

## PWA

I will not be going though on what PWA is, as there are tons of articles on the web on that, but ultimately they are just Javascript Apps, build in a specific way. So what are the steps to turn a Javascript app into a PWA? [Google has a big checklist](https://developers.google.com/web/progressive-web-apps/checklist){target="_blank"} but here are the mandatory steps:

- use **https**
- add a **[manifest](https://developers.google.com/web/fundamentals/web-app-manifest/){target="_blank"}** file 
- add a **[service worker](https://developers.google.com/web/fundamentals/primers/service-workers/){target="_blank"}**

Other than that I would argue that the following are important as well:

- make a **single page application** (remember that each app should have it own linkable URL)
- **responsive mobile first design** (UI frameworks can take care)
- **cross browser** (again UI frameworks can take care of that)
- some kind of **router** (I use [sammy.js](https://github.com/quirkey/sammy){target="_blank"} but google suggests using [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API){target="_blank"})
- **fast loading** (Cache API and Service Workers can help out here)

The big name in the list above is the [service worker](https://developers.google.com/web/fundamentals/primers/service-workers/){target="_blank"}, which is a piece of code that runs on the background, independent of the web page. You can think of it as a server that lives on your browser. The service worker has also access to some really cool and useful APIs, like [Cache](https://developer.mozilla.org/en-US/docs/Web/API/Cache){target="_blank"}, [Push](https://developer.mozilla.org/en-US/docs/Web/API/Push_API){target="_blank"}, [Notification](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API){target="_blank"} and [Background Sync](https://developers.google.com/web/updates/2015/12/background-sync){target="_blank"}.

Now what’s so great about these kind of apps? Here is what I like about them:

### Native App Like

Like I said, PWAs are basically apps written on Javascript that run on a browser, but if you do it right, it will look and feel like a native app. With a little help of UI frameworks such as [Bootstap](https://getbootstrap.com/){target="_blank"} or [Materialize](https://materializecss.com/){target="_blank"} your app can even be just like the ones you download on your iOS or Android device. 

I know, I make it seem really easy, but I learned to trust these UI frameworks and the steps to turn your javascript app into a PWA and it really works. 

I should also mention that some browsers like chrome [support Browser App Installation](https://developers.google.com/web/updates/2019/06/pwa-install-addressbar){target="_blank"}. If the user chooses to install the web app, an icon will appear in their Apps just like a native app and when loaded, it will appear in it’s own window (and not inside the browser)… again just like a native app. 

![Add to home screen](../../img/Pasted%20image%2020240522190825.png){.img-mobile-screenshoot .govcy-mb-3}

![Add to home pop up](../../img/Pasted%20image%2020240522190918.jpg){.img-mobile-screenshoot .govcy-mb-3}

![Home screen icon](../../img/Pasted%20image%2020240522191008.jpg){.img-mobile-screenshoot .govcy-mb-3}

![Site opens as native app](../../img/Pasted%20image%2020240522191043.jpg){.img-mobile-screenshoot .govcy-mb-3}
### Cross device/browser App

With the addition of Safari to the [list of browsers compatible](https://caniuse.com/#search=service%20worker){target="_blank"} with the Service worker, you can now build a PWA and serve it on almost all devices. This means you don’t have to write and maintain different code for different operating system, and especially if you come from a web developer background like I do, you will not have to learn new technologies for building Windows, Android or iOS apps. 

You will not find your app in that nice app/play store that you are used to, but that is not necessarily a bad thing. All your users need to do to interact with your app, is simply visit your web app from their browser and they are in. In our case, where we have a very specific target user group, all we had to do was simply give them a link to click on, whether that was from a Twitter post or from an email we send. That made it easier for us to market our app, rather than asking them to download the app from an app store. 

Also you keep control on updating your app. The users do not need to visit the app store to force an update,  you can simply control it from the service worker. The users don’t even have to know that the app has been updated. 

### Offline Capabilities

One of the cool things about the service worker is that you can control the cache off the browser [cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache){target="_blank"}. This means that content can now live on your users device, so there is no need to use the internet (at least for most things) which allows you to make your app work offline.

This has been the holy grail of  web development for a long time. Now there’s a whole new range of possibilities for web apps, which otherwise would have been impossible if you had to be connected to the web all the time. 

To be honest in my app I simply use caching to speed up my app and to show a nice offline message, but there are tons of use cases where offline capabilities are truly valuable to your business and to your users. In our business for example (Intellectual and Industrial Property Office) we could allow users to download PDFs, such as Application Forms or Instructions, while they are offline, thus providing them with an offline digital library. We could even allow them to fill in electronic forms, or view their previously submitted forms, without being bothered if they are connected to the internet or not.  

This means our users could go on working whether they are at a cafe with a crappy WiFi connection, at a client where they can’t connect to their network, or even on that long flight that never seems to end. 

### Fast Apps

All of the good things I mentioned above would not be worth it if your app is slow. But again, what usually make a web app slow, is the time it takes to load all of that static content, over and over again. Even though browsers have come a long way, and they can now decide by their selves whether to load content from the cache or memory, you can now make that decision your selves and have control, from your service worker.

## Summary

In general, PWAs have been marketed as the solution to big problems that existed in web development for a long time, such as offline capabilities, slow apps and so on. I would not go that far as to call them a game changer, but after building an app the PWA way, I have to admit that I am impressed with the result. Even though it is very early to get feedback from our users, am confident that the new features will be appreciated.