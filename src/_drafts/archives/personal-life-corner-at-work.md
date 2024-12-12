---
title: Personal life corner (at work)
date: 2012-06-11
summary: Personal life corner (at work)
image: 
tags:
  - dev
---
![](../../img/Pasted%20image%2020241212140532.jpg)

Everyone talks about accessing your work stuff from everywhere and being connected, but what about your personal stuff. What if you want to access your personal drobox or evernote account instead of your professional one? How can you protect your personal stuff from being downloaded on your work pc?

The answer is of course through **web apps**. Web apps have gone a long way and are now mature, quick and very user friendly. There is of course a trade-off in efficiency, since native applications are always more efficient (think about dropbox on your desktop compared with it’s web application), but then again we gain in mobility. Also we minimize the data stored locally (again think of the dropbox example). The thing is that we use some of those web apps with professional accounts, and for people that like to separate work from personal data (and life), this is is a big problem. Some web apps provide access to several accounts at the same time, like gmail. For all the rest you can use **chrome’s incognito mode**.

Incognito mode does not leave any trace on your PC (other than downloads and bookmarks) so it protects the personal data from being downloaded on your work pc. Most importantly it **creates a separate session** on your browser so you can log in with a **different account**. There are of course different plug-ins for different browsers that can do that and even more, but I prefer to use the browse’s default functionality.

At my work PC I used the `**Create Application Shortcut**` and created chrome applications for each of my personal life web apps so that they are treated more like desktop apps rather than web apps. Here’s a walk through on how to do that on windows 7:

1.  Navigate to the website of your choice with chrome.
2. Click the wrench icon and click on `Tools/Create Application Shortcut` and select to create shortcut on your desktop.  
    You will now see the shortcut on your desktop.
3. Right click on your shortcut and click on `Properties`. Under the `Target` option include the `/incognito` parameter, for example: `chrome.exe **/incognito** –app=http://gmail.com`

There you go, you can now create your own personal corner on you work desktop. It should be noted though that the **incognito mode does not protect you data entirely**. It simply takes care of the data that would normally be stored on your pc, If your organization have any monitoring services they will be able to view your data.