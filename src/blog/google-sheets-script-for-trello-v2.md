---
title: Google Sheets script for Trello V2
date: 2019-07-16
summary: Since I have posted the Google Sheets script for Trello I made some updates to include members assigned to card and customfields value (power-up), so I thought I’d share the code.
image: Screen-Shot-08-23-18-at-10.13-AM.jpg
tags:
  - dev
  - google-sheets
  - trello
---
Since I have posted the [Google Sheets script for Trello](../google-sheets-script-for-trello/) I made some updates to include members assigned to card and customfields value (power-up), so I thought I’d share the code.

```js
/**
 * Loads the details from a Trello board using the Trello API v1, into a google sheet.
 *
 * Each time it is run the sheet gets cleared and the following data are downloaded from the Trello board 
 *"Date", "Task", "Desc", "Who", "List", "Link", "Labels","Label Colors","Checklists", "Due Date", "Due Complete","Task (Link)", "Members", "Comments"
 *
 * NOTE: Additional columns are created for custom fields if any
 *
 * Additionally the sheet for checklist gets cleared and the following data are downloaded from the Trello board 
 *"Card","Checklist", "Check Name", "State","Task","Who","Link","Labels","Due Date","Due Complete","List","Members"
 * 
 * Additionally the sheet for comments gets cleared and the following data are downloaded from the Trello board 
 *"Card","Date", "Who Commented", "Comment","Task","Who","Link","Labels","Due Date","Due Complete","List","Members"
 *
 * @param {string} api_key The Trello API Key (Get it from https://trello.com/app-key)
 * @param {string} api_token The Trello API token (Get it from https://trello.com/app-key)
 * @param {string} board_id The Trello Board ID who's cards will be downloaded (Get it from adding ".json" at the end of the board url)
 * @param {string} sheetName The name of the sheet in the active spreadsheet to update it's rows
 * @param {string} checklistSheetName The name of the sheet in the active spreadsheet to update it's rows for checklists
 * @param {string} commentsSheetName The name of the sheet in the active spreadsheet to update it's rows for comments
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @return {void} Not applicable. 
 */
function loadTrello(api_key,api_token,board_id,sheetName,checklistSheetName, commentsSheetName, enableStackdriverLogging, logingName) {
  try {
    if (enableStackdriverLogging) console.time(logingName + " - loadTrello");
    if (enableStackdriverLogging) console.log(logingName + " - Loading from Trello STARTED");
     
    var url = "https://api.trello.com/1/";
    var key_and_token = "key="+api_key+"&token="+api_token;    
    var cr = 2;
     
    // get sheet with name Trello, clear all contents, add titles
    var ss = SpreadsheetApp.getActive().getSheetByName(sheetName).clear();
    var trelloFiledHeaders = ["Date", "Task", "Desc", "Who", "List", "Link", "Labels","Label Colors","Checklists", "Due Date", "Due Complete", "Task (Link1)", "Members", "Comments"];
    // headers without custom fields
    var originalTrelloFiledHeadersCount = 14;
    // headers with custom fields
    var trelloFiledHeadersCount = originalTrelloFiledHeadersCount;
    //Get all custom fields from Trello API
    var response = UrlFetchApp.fetch(url + "boards/" + board_id + "/customFields?" + key_and_token);
    var boardCustomFields = JSON.parse((response.getContentText()));
    // for all custom fields
    for (var i=0; i < boardCustomFields.length; i++) {
      trelloFiledHeaders.push(boardCustomFields[i].name);
      //position in append array of custom fields
      boardCustomFields[i].pos=trelloFiledHeadersCount;
      trelloFiledHeadersCount++;
    }
    ss.appendRow(trelloFiledHeaders);
    ss.getRange(1,1,1,trelloFiledHeadersCount).setFontWeight("Bold");
     
    // get sheet for checklists, clear all contents, add titles
    var ssChecklist = SpreadsheetApp.getActive().getSheetByName(checklistSheetName).clear();
    ssChecklist.appendRow(["Card","Checklist", "Check Name", "State","Task","Who","Link","Labels","Due Date","Due Complete","List","Members"]);
    ssChecklist.getRange(1,1,1,12).setFontWeight("Bold");
     
    // get sheet for comments, clear all contents, add titles
    var ssComments = SpreadsheetApp.getActive().getSheetByName(commentsSheetName).clear();
    ssComments.appendRow(["Card","Date", "Who Commented", "Comment","Task","Who","Link","Labels","Due Date","Due Complete","List","Members"]);
    ssComments.getRange(1,1,1,12).setFontWeight("Bold");
     
    //Get all lists from Trello API
    var response = UrlFetchApp.fetch(url + "boards/" + board_id + "/lists?cards=all&" + key_and_token);
    var lists = JSON.parse((response.getContentText()));
     
    // for all lists 
    for (var i=0; i < lists.length; i++) {
      var list = lists[i];
      // Get all cards from Trello API
      // /?filter=all if we want archived as well (archived have closed:true)
      var response = UrlFetchApp.fetch(url + "list/" + list.id + "/cards/?actions=all&customFieldItems=true&" + key_and_token); 
      var cards = JSON.parse(response.getContentText());
      if(!cards) continue;
       
      // for all cards
      for (var j=0; j < cards.length; j++) {
        var appentArray = new Array(trelloFiledHeadersCount);
        //initialize custom fields values
        for (var jk=originalTrelloFiledHeadersCount; jk < trelloFiledHeadersCount; jk++) {
          appentArray[jk] = "";
        }
        var card = cards[j];
         
        var name = card.name;
        var link = card.shortUrl;
        var listname = list.name;
        var desc = card.desc;
        var duedate = card.due;
        var duecomplete = (card.dueComplete == true ? 'YES' : 'NO');
        var labels = "";
        var labelsColors = "";
        for (var l=0; l < card.labels.length; l++) {
          labels = labels + (labels == "" ? "" : ", ")  + card.labels[l].name;
          labelsColors = labelsColors + (labelsColors == "" ? "" : "\n")  + card.labels[l].color;
        }
        var namelink = '=HYPERLINK("' + link +'", "' + name + '")';
        for (var k=0; k < card.actions.length; k++) {
          // Get the rest of the card data
          var dato = card.actions[k].date;
          var fullname = card.actions[k].memberCreator.fullName;
        }
         
        // ------- Custom Fields  --------------------
        var customFieldItems = card.customFieldItems;
        for (var ck=0; ck < customFieldItems.length; ck++) {
          // get board custom field from id
          var boardCustomField = searchArray(customFieldItems[ck].idCustomField, boardCustomFields);
           
          var customFieldValueText = "";
          if (boardCustomField.type=="text") {
            customFieldValueText = customFieldItems[ck].value.text;
          } else if (boardCustomField.type=="checkbox") {
            customFieldValueText = customFieldItems[ck].value.checked; 
          }else if (boardCustomField.type=="date") {
            customFieldValueText = customFieldItems[ck].value.date; 
          }else if (boardCustomField.type=="number") {
            customFieldValueText = customFieldItems[ck].value.number; 
          }else if (boardCustomField.type=="list") {
            customFieldValueText = searchArray(customFieldItems[ck].idValue, boardCustomField.options).value.text; 
          }
            appentArray[boardCustomField.pos] = customFieldValueText;
        }
        // Get custom field items END -----
                
        //-------- Members  ----------------------
        //Get all Members frin API
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/members/?" + key_and_token);
        var membersdetails = JSON.parse(response.getContentText());
                 
        var membersstr = "";
         
        // For all checklists get Name
        for (var o=0; o < membersdetails.length; o++) {
          membersstr = membersstr + (membersstr == "" ? "" : ", \n") + membersdetails[o].fullName;
        }
         
        //-------- Checklists ----------------------
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
            //append row in checklist sheet            
            ssChecklist.appendRow([card.name,cardchecklists[m].name, cardchecklists[m].checkItems[n].name, cardchecklists[m].checkItems[n].state
              ,name + " - " +cardchecklists[m].checkItems[n].name,fullname,link,labels,duedate,duecomplete,listname,membersstr]);
          }
        }
         
        //-------- Comments ----------------------
        //Get all comments of card from Trello API
        var response = UrlFetchApp.fetch(url + "cards/" + card.id + "/?actions=commentCard&" + key_and_token);
        var cardcomments = JSON.parse(response.getContentText()).actions;
         
        var cardcommentsstr = "";
        // For all comments get Name
        for (var p=0; p < cardcomments.length; p++) {
          cardcommentsstr = cardcommentsstr + (cardcommentsstr == "" ? "" : "\n\n") + cardcomments[p].date + " --" + cardcomments[p].memberCreator.fullName + "\n --------- \n" + cardcomments[p].data.text;
          //append row in checklist sheet            
            ssComments.appendRow([card.name,cardcomments[p].date, cardcomments[p].memberCreator.fullName, cardcomments[p].data.text
              ,name,fullname,link,labels,duedate,duecomplete,listname,membersstr]);          
        }
               
      //Append row with data
      appentArray[0] = dato;
      appentArray[1] =  name;
      appentArray[2] =  desc;
      appentArray[3] =  fullname;
      appentArray[4] =  listname;
      appentArray[5] =  link;
      appentArray[6] =  labels;
      appentArray[7] =  labelsColors;
      appentArray[8] =  checkliststr;
      appentArray[9] =  duedate;
      appentArray[10] =  duecomplete;
      appentArray[11] =  namelink;
      appentArray[12] =  membersstr;
      appentArray[13] =  cardcommentsstr;
      ss.appendRow(appentArray);
       
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
 
/**
* Finds objects in an array of objects by obj.id 
*
* @param {string} idKey The id sting to find
* @param {Array} myArray The array that contains the objects
* @return {object} The object that is found. 
*/
function searchArray(idKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].id === idKey) {
            return myArray[i];
        }
    }
}
```