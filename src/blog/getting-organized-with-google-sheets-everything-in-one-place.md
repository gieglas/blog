---
title: Getting Organized with Google Sheets – Everything in one place
date: 2019-03-03
summary: A nice hack on how to Get Organized with Google Sheets and have Everything in one place.
image: Screenshot-17.png
tags:
  - dev
  - google-sheets
---
Lately I have been experimenting with Google App Scripts for Google Sheets and in the back of my mind I always had the possibility of having all our digital organization in one place. Things finally feel into place and here I am presenting how to Get Organized with Google Sheets and have Everything in one place.

My approach uses Google Sheets as the Business Intelligence tool for all our Getting Things Done, [Issues Tracking](../trello-kanban-like-board-for-issues-and-tasks-tracking/) and [Project Management](../prince2-project-management-with-google-sheets/) stuff. To do that I used Google App Scripts to:

1.  [Import my stuff from other services like Trello](../google-sheets-script-for-trello/) (and other services that provide an APi) and
2. Scripts to [Present on the Web](../google-sheets-script-for-web-apps/) and [Send Emails](../google-sheets-script-for-email-report/) Google Sheets.

![Google sheets getting organized flow](../../img/Google-Sheets-Organized.png){.img-fluid .pop-small .govcy-mb-3}

The business analysis part is done by utilising the powerful Google Sheet Formulas and Functions. With a combination of the [IMPORTAGE](https://support.google.com/docs/answer/3093340){target="_blank"} and [QUERY](https://support.google.com/docs/answer/3093343?hl=en){target="_blank"} functions, you can pretty much do any kind of analysis you like. The analysis then can be either sent by email (we even have a script to dynamically select who the email is sent to) or view it as a web app. Below are some real examples we use, like keeping track of our tasks from different Trello boards, having summaries on our orders and their status and so on.

![Google sheets getting screenshot 1](../../img/Screenshot-18.png){.img-fluid .pop-small .govcy-mb-3}

![Google sheets getting screenshot 2](../../img/Screenshot-19.png){.img-fluid .pop-small .govcy-mb-3}

![Google sheets getting screenshot 3](../../img/Screenshot-22.png){.img-fluid .pop-small .govcy-mb-3}

![Google sheets getting screenshot 4](../../img/Screenshot-23.png){.img-fluid .pop-small .govcy-mb-3}
