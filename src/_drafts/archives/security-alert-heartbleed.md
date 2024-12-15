---
title: Security Alert – Heartbleed
date: 2014-04-10
summary: 
image: 
tags:
---
![](../../img/Pasted%20image%2020241215120350.png)
I have been receiving emails from various services telling me that they had been vulnerable to the [heartbleed bug](http://heartbleed.com/). This bug seems to have affected all services that use the OpenSSL cryptographic software library which is very very popular. For example some of the services that have been affected are [IFTTT](https://ifttt.com/), [wunderlist](https://www.wunderlist.com/), [mongolab](https://mongolab.com/welcome/). This bug enables attackers to get privileged information such as keys, usernames, passwords which would appear to be otherwise secure. The OpenSSL have released a fix but it is up to the service to implement the fix (the services mentioned above have implemented a fix). As you may not know which of your services is using OpenSSL and due to the popular nature of the library I suggest you consult your online services that are critical to you and ~~change your passwords~~ change your password as soon as the service has implemented a fix.

Consider backing up your data with Synology high quality NAS
