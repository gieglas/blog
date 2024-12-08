---
title: Google Sheets script for Trello
date: 2018-08-23
summary: I thought it might be interesting to have a Google Sheet with all the Trello Cards. I started working on it and I ended up with an interesting script and Google Sheet template, so I thought I’d share it with the world.
image: Screen-Shot-08-23-18-at-10.13-AM.jpg
tags:
  - dev
---
I came accross this stackoverflow question about [Google Script to import Trello data to Google Sheets](https://stackoverflow.com/questions/35878813/google-script-to-import-trello-data-to-google-sheets){target="_blank"} and since we are using [Trello in our Team](../trello-kanban-like-board-for-issues-and-tasks-tracking/) and [Google Sheets for Project Management](../prince2-project-management-with-google-sheets/), I thought it might be interesting to have a Google Sheet with all the Trello Cards. I started working on it and I ended up with an interesting script and Google Sheet template, so I thought I’d share it with the world.  

The Objective was to get all the cards of a specific Trello Board in a Google Sheet and then create several filters or formulas to have dedicated views, such as “Todo”, “Doing”, “Statistics” and so on.

## Approach

I wrote a script for my Google Sheet using Google Apps Script, to load all the cards of a specific Trello Board in a named sheet. Each time the script is run the sheet gets cleared and the following data are downloaded from the Trello board “Date”, “Task”, “Desc”, “Who”, “List”, “Link”, “Labels”,”Label Colors”,”Checklists”, “Due Date”, “Due Complete”. The script went something like this:

```js
// trello variables
var api_key = "xxxxxxxxxxxxxxxxxxxxx";
var api_token = "xxxxxxxxxxxxxxxxxxxxxxx";
var board_id = "5665ca9e832a5e8de402213e"; //https://trello.com/b/cPC4jGzZ/project-manager-sample-board
var sheetName = "Trello"
var enableStackdriverLogging = true;
var logingName = "Demo Trello";
/**
 * Loads the details from a Trello board using the Trello API v1, into a google sheet.
 *
 * Each time it is run the sheet gets cleared and the following data are downloaded from the Trello board 
 *"Date", "Task", "Desc", "Who", "List", "Link", "Labels","Label Colors","Checklists", "Due Date", "Due Complete"
 * 
 * @param {string} api_key The Trello API Key (Get it from https://trello.com/app-key)
 * @param {string} api_token The Trello API token (Get it from https://trello.com/app-key)
 * @param {string} board_id The Trello Board ID who's cards will be downloaded (Get it from adding ".json" at the end of the board url)
 * @param {string} sheetName The name of the sheet in the active spreadsheet to update it's rows
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @return {void} Not applicable.
 */
function loadFromTrello() {
try {
    if (enableStackdriverLogging) console.time(logingName + " - loadTrello");
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello STARTED");
     
    var url = "https://api.trello.com/1/";
    var key_and_token = "key="+api_key+"&token="+api_token;    
    var cr = 2;
     
    // get sheet with name Trello, clear all contents, add titles
    var ss = SpreadsheetApp.getActive().getSheetByName(sheetName).clear();
    ss.appendRow(["Date", "Task", "Desc", "Who", "List", "Link", "Labels","Label Colors","Checklists", "Due Date", "Due Complete"]);
    ss.getRange(1,1,1,11).setFontWeight("Bold");
     
    //Get all lists from Trello API
    var response = UrlFetchApp.fetch(url + "boards/" + board_id + "/lists?cards=all&" + key_and_token);
    var lists = JSON.parse((response.getContentText()));
     
    // for all lists 
    for (var i=0; i < lists.length; i++) {
      var list = lists[i];
      // Get all cards from Trello API
      var response = UrlFetchApp.fetch(url + "list/" + list.id + "/cards?" + key_and_token);
      var cards = JSON.parse(response.getContentText());
      if(!cards) continue;
       
      // for all cards
      for (var j=0; j < cards.length; j++) {
        var card = cards[j];
        //Get all details of card from Trello API
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/?actions=all&" + key_and_token);
        var carddetails = JSON.parse(response.getContentText()).actions;
        if(!carddetails) continue;
         
        //Get all checklists of card from Trello API
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/checklists?action=all&" + key_and_token);
        var cardchecklists = JSON.parse(response.getContentText());
         
        var checkliststr = "";
        // For all checklists get Name
        for (var m=0; m < cardchecklists.length; m++) {
          checkliststr = checkliststr + (checkliststr == "" ? "" : "\n\n") + cardchecklists[m].name + "\n --------- \n";
          // For all checklists get Items
          for (var n=0; n < cardchecklists[m].checkItems.length; n++) {
            checkliststr = checkliststr + (checkliststr == "" ? "" : "\n") + (cardchecklists[m].checkItems[n].state == 'complete' ? "[x] ":"[ ] " ) + cardchecklists[m].checkItems[n].name;
          }
        }
        for (var k=0; k < carddetails.length; k++) {
          // Get the rest of the card data
          var dato = carddetails[k].date;
          var fullname = carddetails[k].memberCreator.fullName;
          var name = card.name;
          var link = card.shortUrl;
          var listname = list.name;
          var desc = card.desc;
          var duedate = card.due;
          var duecomplete = (card.dueComplete == true ? 'YES' : 'NO');
          var labels = "";
          var labelsColors = "";
          for (var l=0; l < card.labels.length; l++) {
            labels = labels + (labels == "" ? "" : "\n")  + card.labels[l].name;
            labelsColors = labelsColors + (labelsColors == "" ? "" : "\n")  + card.labels[l].color;
          }
      }
      //Append row with data
      ss.appendRow([dato, name, desc, fullname, listname, link, labels, labelsColors, checkliststr, duedate, duecomplete ]);
       
      //change labels color ---
      var labelsColor = labelsColors.split('\n');
      if (labelsColor[0] == "sky") {
        ss.getRange(cr, 8).setBackground("#87CEFA");
      } else {
        ss.getRange(cr, 8).setBackground(labelsColor[0]);
        if ((labelsColor[0] == "red") || (labelsColor[0] == "black") || (labelsColor[0] == "purple") || (labelsColor[0] == "green") || (labelsColor[0] == "blue")) {
          ss.getRange(cr, 8).setFontColor("white");
        }
      }
      //change labels color END ---
       
      cr++;
     }                                      
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);    
  } finally {
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - loadTrello");
  }
}
```

The following variables must be defined

```js
/** 
* @param {string} api_key The Trello API Key (Get it from https://trello.com/app-key)
* @param {string} api_token The Trello API token (Get it from https://trello.com/app-key)
* @param {string} board_id The Trello Board ID who's cards will be downloaded (Get it from adding ".json" at the end of the board url)
* @param {string} sheetName The name of the sheet in the active spreadsheet to update it's rows
*/
```

To run the function I created a Menu Item using the code below, and created a trigger to run the function every day. After having the data on my Google Sheet, I then created orther sheets for my dedicated views and a nice filter page using the Query()  function.

```js
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Update from Trello", functionName: "loadFromTrello"},
                     {name: "Send summary email", functionName: "sendEmail"}];
  ss.addMenu("Custom Functions", menuEntries);
 
}
```

![Project triggers screenshot](../../img/Screen-Shot-08-23-18-at-10.16-AM.jpg){.img-fluid .pop-small .govcy-mb-3}

![Google sheet query screenshot](../../img/Screen-Shot-08-23-18-at-10.11-AM-001.jpg){.img-fluid .pop-small .govcy-mb-3}