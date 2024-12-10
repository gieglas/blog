---
title: Google Sheets Script for email report
date: 2018-08-26
summary: A general purpose script to send the emails from contents of a specific sheet. When combining the script, with Google Spreadsheet build in functions and event triggers (in my case Time Driven triggers), you can pretty much automate any kind of report you like.
image: GoogleSheetEmail.png
tags:
  - dev
  - google-sheets
---
After working a little bit with Google Sheets and seeing it’s power in action, we thought it would be nice to automate email reports / notifications or even reminders. So once again I tried to make a general purpose script that we could reuse whenever we need to send the contents of a specific sheet. When combining the script, with Google Spreadsheet build in functions and event triggers (in my case Time Driven triggers), you can pretty much automate any kind of report you like.

An example of this type of automation is related to my previous post [Google Sheets script for Trello](../google-sheets-script-for-trello/), where we import data from Trello Boards and apply different filters on separate sheets. Using the script and a weekly event trigger, we have a weekly summary email automatically sent for the TODO and DOING tasks.

## Approach

I wrote a script for my Google Sheet using Google Apps Script, to send emails based on the options defined on a specific sheet (See screenshoot below).

![Email sheet screenshot](../../img/GoogleSheetEmailOptions-1.png){.img-fluid .pop-small .govcy-mb-3}

The “Email Options” sheet, must have the following values in row 6.

1. **name**: The name of the sheet (per sheet)
2. **title**: The Title of the sheet to be displayed in the email (per sheet)
3. **headersAtRow**: Where is the header row located in the sheet. The header will contain the titles of the columns and the next row will contain the data (Row 1 is 0) (per sheet)
4. **display**: The display format of the content in the email. Can be 1 of the following formats: table, list,numbered,lines, title (Not linked to a sheet Data), paragraph (Not linked to a sheet Data)
5. **columnsToSend**: Which columns to include in the contents of the email, separated by comma. (Column A is 0). Example 0,1,2 (per sheet)
6. **Current Date**: The current date (No need to change this)
7. **Emails addresses**: Email addresses to send the notifications. Separate emails with a comma
8. **Message Prefix**: The notification message header (in HTML Format)
9. **Message PostFix**: The notification email footer (in HTML Format)
10. **Subject**: The subject of the email

The first 5 columns concern Information about which sheets to send the email and what content. Can have more that 1 row for each sheet to send. 1 row for each sheet.

Then there is an empty column

The next 5 columns concern Information about the notification email header. Only 1 row of options is valid

The script went something like this:

```js
function sendEmail() {
    try {
    //default values
    if (emailOptionsSheet == null) emailOptionsSheet="Email Options";
    if (enableStackdriverLogging == null) enableStackdriverLogging=false;
    if (logingName == null) logingName = "";
     
    if (enableStackdriverLogging) console.time(logingName + " - emailSheetContent");
    if (enableStackdriverLogging) console.log(logingName + " - emailSheetContent STARTED");
     
    var sheetsToEmail = [];
     
    // get active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetUrl = ss.getUrl();
     
    //get Options start---------------------------
    var sOptions2=ss.getSheetByName(emailOptionsSheet);
    var sOptions2range = sOptions2.getDataRange();
    var sOptions2values = sOptions2range.getDisplayValues();
    var sOptions2lastRow = sOptions2range.getLastRow();
     
    //for each row in body options sheet
    for (var f = 5; f < sOptions2lastRow; f++)  {
      sheetsToEmail[f-5] = {name: "" + sOptions2values[f][0], title: sOptions2values[f][1], headersAtRow : parseInt(sOptions2values[f][2],10), display: sOptions2values[f][3], columnsToSend: sOptions2values[f][4].split(",")};      
    }    
     
    //get header options    
    var email = sOptions2values[5][7];  
    var messagePreFix = sOptions2values[5][8];
    var messagePostFix = sOptions2values[5][9] + "<br />" + ss.getUrl();
    var messageSubject = sOptions2values[5][10];
    var message = messagePreFix + "<br /> ";
    //get Options end---------------------------
     
    //write message start ----------------------
    // fop each Sheet defined in body options
    for (var h=0; h<sheetsToEmail.length; h++) {
      // Start message with header with the title of each sheet ---- MESSAGE ---
      if (sheetsToEmail[h].display == "title") {
        message = message  + "<h2>" + sheetsToEmail[h].title + "</h2>";
      } else if (sheetsToEmail[h].display == "paragraph") {
        message = message + sheetsToEmail[h].title;
      }else {
        message = message  + "<h3>" + sheetsToEmail[h].title + "</h3>";
      }//---------------
       
      if ((sheetsToEmail[h].display != "title") && (sheetsToEmail[h].display != "paragraph")) {
        //Get sheet 
        var sheet = ss.getSheetByName(sheetsToEmail[h].name);
        var range = sheet.getDataRange();
        var values = range.getDisplayValues();      
        var lastRow = range.getLastRow();
         
        //begin table, list, numbered ---- MESSAGE ---
        if (sheetsToEmail[h].display == "table") {
          message = message + "<table><tr>";
          for (var g = 0; g < sheetsToEmail[h].columnsToSend.length; g++)  {
            message = message + "<td><b>" +values[sheetsToEmail[h].headersAtRow][sheetsToEmail[h].columnsToSend[g]] + "</b></td>";
          }
          message = message + "</tr>";
        } else if (sheetsToEmail[h].display == "list") {
          message = message + "<ul>";
        } else if (sheetsToEmail[h].display == "numbered" ) {
          message = message + "<ol>";
        }//---------------
         
        //for each row in sheet
        for (var i = sheetsToEmail[h].headersAtRow + 1; i < lastRow; i++)  {       
          //beginning each line ---- MESSAGE ---
          if (sheetsToEmail[h].display == "table") {
            message = message + "<tr>";
          } else if ((sheetsToEmail[h].display == "list") ||(sheetsToEmail[h].display == "numbered" )) {
            message = message + "<li>";
          }
          //for each columnsToSend
          for (var j = 0; j < sheetsToEmail[h].columnsToSend.length; j++)  {
            //Write values ---- MESSAGE ---
            if ((sheetsToEmail[h].display == "lines") ||(sheetsToEmail[h].display == "list") ||(sheetsToEmail[h].display == "numbered" )) {
              message = message 
                + (j > 0?"<br />":"")
                + "<b>" + values[sheetsToEmail[h].headersAtRow][sheetsToEmail[h].columnsToSend[j]]
                + ":</b> " + values[i][sheetsToEmail[h].columnsToSend[j]];
            } else if (sheetsToEmail[h].display == "table") {
              message = message 
                + "<td>" + values[i][sheetsToEmail[h].columnsToSend[j]] + "</td>";
            } 
          }
           
          //ending each line ---- MESSAGE ---
          if (sheetsToEmail[h].display == "lines") {
            message = message  + " <hr>";
          } else if (sheetsToEmail[h].display == "table") {
            message = message + "</tr>";
          } else if ((sheetsToEmail[h].display == "list") || (sheetsToEmail[h].display == "numbered" )) {
            message = message + "</li>";
          }
        }
      }
      // END IF HERE
       
      //edning Table, List for each sheet ---- MESSAGE ---
      if (sheetsToEmail[h].display == "table") {
        message = message + "</table>";
      } else if (sheetsToEmail[h].display == "list") {
        message = message + "</ul>";
      } else if (sheetsToEmail[h].display == "numbered" ) {
        message = message + "</ol>";
      }
      //message = message  + " <br />";
    }    
     
    // footer for message ---- MESSAGE ---
    message = message +  "<br /><br /> " + messagePostFix;
    //write message end ----------------------
    
    if (enableStackdriverLogging) console.info(logingName + " Message: " + message);
    //return false;
    MailApp.sendEmail({
      to: email,
      subject: messageSubject,
      htmlBody: message});
         
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);    
  } finally {    
    if (enableStackdriverLogging) console.log(logingName + " - emailSheetContent ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - emailSheetContent");
  }
}
```

The following variables must be defined

```js
/**
 * @param {string} emailOptionsSheet the sheet name for the Email Options. Default is "Email Options"
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @return {number} Not applicable.
 */
```

Links to a sample spreadsheet

- [View](https://drive.google.com/open?id=1_DcS39gq0B8T_Hn3lx8qPi1Ym4bqYt-Nhrbv84aApI8){target="_blank"}
- [Copy](https://docs.google.com/spreadsheets/d/1_DcS39gq0B8T_Hn3lx8qPi1Ym4bqYt-Nhrbv84aApI8/copy){target="_blank"}