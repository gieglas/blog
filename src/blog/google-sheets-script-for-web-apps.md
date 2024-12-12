---
title: Google Sheets Script for Web Apps
date: 2019-03-01
summary: Another Google App Script to show HTML as a web app following the same rules as in my previous post.
image: Sheet-to-Web-App.png
tags:
  - dev
  - google-sheets
  - productivity
---
Following on the post for [Google Sheets Script for email Report](../google-sheets-script-for-email-report/), I wrote another Google App Script to also show HTML as a web app following the same rules as in my previous post.

To publish the Google App Script I used the “[Publish as Web App](https://developers.google.com/apps-script/guides/web)” functionality.

![Publish web app screenshot](../../img/Google-App-Script-Publish-Web-App.png){.img-fluid .pop-small .govcy-mb-3}

See below the actual script I used.

```js
/**************************************************************************/
/**
 * Send email, displays HTML or send dynamic notifications of the sheet contents based on the options defined in the "Options" sheet.
 *
 * The "Options" sheet, must have the following values in row 6
 * |name    | title | headersAtRow  | display   | columnsToSend | Email Addresses Column | Current Date | Emails addresses  | Message Prefix    | Message PostFix   | Subject
 * 
 * The first 5 columns concern Information about which sheets to send the email and what content. Can have more that 1 row for each sheet to send. 1 row for each sheet. 
 * Email Addresses to send the notifications
 * The next 5 columns concern Information about the notification email header. Only 1 row of options is valid
 *
 * More details about the columns of "Email Options" sheet:
 * - name:               The name of the sheet (per sheet)
 * - title:              The Title of the sheet to be displayed in the email (per sheet)
 * - headersAtRow:       Where is the header row located in the sheet. The header will contain the titles of the columns and the next row will contain the data (Row 1 is 0) (per sheet)
 * - display:            The display format of the content in the email. Can be 1 of the following formats: table, list, numbered, lines, boxes1, boxes2, boxes3, 
 *                           chart_bar, chart_column, chart_line, chart_scatter, chart_area, chart_pie, chart_table, title (Not linked to a sheet) ,paragraph (Not linked to a sheet) (per sheet)
 * - columnsToSend:      Which columns to include in the contents of the email, separated by comma. (Column A is 0). Example 0,1,2 (per sheet)
 * - Email Addresses Column: Column with Email Addresses to send the notifications. Separate emails with a comma on dynamic emails
 * - Current Date:       The current date (No need to change this)
 * - Emails addresses:   Email addresses to send the notifications. Separate emails with a comma
 * - Message Prefix:     The notification message header (in HTML Format)
 * - Message PostFix:    The notification email footer (in HTML Format)
 * - Subject:            The subject of the enail
 */
 
function dynamicEmail(emailOptionsSheet,enableStackdriverLogging, logingName, replaceLinks) {
  try {  
    if (enableStackdriverLogging) console.time(logingName + " - dynamicEmail");
    if (enableStackdriverLogging) console.log(logingName + " - dynamicEmail STARTED");
   
  //default values
    if (emailOptionsSheet == null) emailOptionsSheet="Email Options";
    if (enableStackdriverLogging == null) enableStackdriverLogging=false;
    if (logingName == null) logingName = "";
    if (replaceLinks == null) replaceLinks = false;
 
    // get active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetUrl = ss.getUrl();
     
    //get Options start---------------------------
    var sOptions2=ss.getSheetByName(emailOptionsSheet);
    var sOptions2range = sOptions2.getDataRange();
    var sOptions2values = sOptions2range.getDisplayValues();    
     
    //get header options    
    var email = sOptions2values[5][7];  
    var messageSubject = sOptions2values[5][10];
    var message = "";
     
    //get HTML message 
    var templData = prepareTemplateData(emailOptionsSheet,enableStackdriverLogging, logingName,replaceLinks);
    var countEmails = 0;
    var dynamicEmailObj = {};
    //for each section evaluate the template
    for (var i = 0; i < templData.sections.length; i++)  {      
      //for every email in dynamic emails
      for (var j = 0; j < templData.sections[i].dynamicEmails.length; j++)  {
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        //check if is email
        if(emailPattern.test(templData.sections[i].dynamicEmails[j]) == false) {
          if (enableStackdriverLogging) console.log(logingName + " dynamicEmail: Email NOT VALID -  " + templData.sections[i].dynamicEmails[j]); 
        } else {
          //if new email initialize
          if (!dynamicEmailObj[templData.sections[i].dynamicEmails[j]]) {
            dynamicEmailObj[templData.sections[i].dynamicEmails[j]] = [];
          }
           
          var dynamicEmailObjData = {"data":templData.sections[i].data[j],"headers":templData.sections[i].headers, "style":templData.sections[i].style[j]};
          dynamicEmailObj[templData.sections[i].dynamicEmails[j]].push(dynamicEmailObjData);
        }
      }
    }
    //get the object keys (basically emails) 
    var objKeys = Object.keys(dynamicEmailObj);
    for (var i = 0; i < objKeys.length; i++)  {
      //create template based on display
      var t = HtmlService.createTemplateFromFile("templ_dynamicEmail");
      t.title = templData.title;
      t.messagePreFix = templData.messagePreFix;
      t.messagePostFix = templData.messagePostFix;
      t.data = dynamicEmailObj[objKeys[i]];
      var ht= t.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1');//.getContent();
        
      //send email
      MailApp.sendEmail({
          to: objKeys[i],
          subject: templData.title ,
          htmlBody: ht.getContent()});      
    }
     
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " dynamicEmail ERROR: " + e);    
  } finally {    
    if (enableStackdriverLogging) console.log(logingName + " - dynamicEmail ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - dynamicEmail");
  }
 
}
 
/** Send email of the sheet contents based on the options defined in the "Email Options" sheet.
 *
 * @param {string} emailOptionsSheet the sheet name for the Email Options. Default is "Email Options"
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @param {boolean} replaceLinks True to replace links with <a href...> tags. Default is false
 * @return {void} Not applicable.
 */
function emailSheetContent(emailOptionsSheet,enableStackdriverLogging, logingName, replaceLinks) {
  try {
    //default values
    if (emailOptionsSheet == null) emailOptionsSheet="Email Options";
    if (enableStackdriverLogging == null) enableStackdriverLogging=false;
    if (logingName == null) logingName = "";
    if (replaceLinks == null) replaceLinks = false;
     
    if (enableStackdriverLogging) console.time(logingName + " - emailSheetContent");
    if (enableStackdriverLogging) console.log(logingName + " - emailSheetContent STARTED");
     
    // get active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetUrl = ss.getUrl();
     
    //get Options start---------------------------
    var sOptions2=ss.getSheetByName(emailOptionsSheet);
    var sOptions2range = sOptions2.getDataRange();
    var sOptions2values = sOptions2range.getDisplayValues();    
     
    //get header options    
    var email = sOptions2values[5][7];  
    var messageSubject = sOptions2values[5][10];
    var message = "";
    //get Options end---------------------------
     
    //Sheet to HTML
    message = htmlSheetContent(emailOptionsSheet,enableStackdriverLogging, logingName, replaceLinks, "templ_email").getContent();
     
    //if message is generated send email
    if (message != "") {
      MailApp.sendEmail({
        to: email,
        subject: messageSubject,
        htmlBody: message});
    }
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);    
  } finally {    
    if (enableStackdriverLogging) console.log(logingName + " - emailSheetContent ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - emailSheetContent");
  }
 
}
 
/**
 * Include contents of an HTML file in another. Usefull when including stylesheets or JS
 *
 * @param {string} filename The filename of the file to be included in HTML
 * @return {string} The HTML.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
/***************************************************************************************************************************/
/**
 * Create the HtmlOutput based on a sheet contents defined in the "Email Options" sheet. Information about options in function "emailSheetContent"
 *
 * @param {string} emailOptionsSheet the sheet name for the Email Options. Default is "Email Options"
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @param {boolean} replaceLinks True to replace links with <a href...> tags. Default is false
 * @param {string} masterTemplate master Template name 
 * @return {HtmlOutput} The HTML Output
 */
function htmlSheetContent(emailOptionsSheet,enableStackdriverLogging, logingName, replaceLinks, masterTemplate) { 
  var ht = null;
  try {
     
    //default values
    if (emailOptionsSheet == null) emailOptionsSheet="Email Options";
    if (enableStackdriverLogging == null) enableStackdriverLogging=false;
    if (logingName == null) logingName = "";
    if (replaceLinks == null) replaceLinks = false;
    if (masterTemplate == null) masterTemplate = "templ_index";
     
    var t = HtmlService.createTemplateFromFile(masterTemplate); 
     
    if (enableStackdriverLogging) console.time(logingName + " - htmlSheetContent");
    if (enableStackdriverLogging) console.log(logingName + " - htmlSheetContent STARTED");
     
    // get active spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetUrl = ss.getUrl();    
     
    //get HTML message 
    var templData = prepareTemplateData(emailOptionsSheet,enableStackdriverLogging, logingName,replaceLinks);
 
    var sectionsHTML = "";
    //for each section evaluate the template
    for (var i = 0; i < templData.sections.length; i++)  {
      var templateName = 'templ_' + templData.sections[i].display;
      var chart = null;
      //Charts      
      if (templData.sections[i].display.indexOf("chart")>-1) {
        //create chart object
        switch(templData.sections[i].display) {
          case "chart_bar":
          chart = Charts.newBarChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_column":
          chart = Charts.newColumnChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_line":
          chart = Charts.newLineChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_scatter":
          chart = Charts.newScatterChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_area":
          chart = Charts.newAreaChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_pie":
          chart = Charts.newPieChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_table":
          chart = Charts.newTableChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
          case "chart_table":
          chart =  Charts.newTableChart().setDataTable(templData.sections[i].data).setDimensions(750, 600).build();
          break;
             
        }
        //output html from chart object      
        var htmlOutput = HtmlService.createHtmlOutput().setTitle(templData.sections[i].title);
        var imageData = Utilities.base64Encode(chart.getAs('image/png').getBytes());
        var html = "<img class='img-responsive' alt='If you cannot see the image your applications does not suport it.' border=\"1\" src=\"" + "data:image/png;base64," + encodeURI(imageData)+ "\">";
         
        templData.sections[i].data = html;        
        templateName = "templ_chart_bar";        
      }       
      //create template based on display
      var templ_section = HtmlService.createTemplateFromFile(templateName);
      templ_section.templDataSection = templData.sections[i];
      sectionsHTML = sectionsHTML + templ_section.evaluate().getContent();
       
    }
     
    //Create template
    var templ_index = t;
    t.messagePreFix = templData.messagePreFix;
    t.messagePostFix = templData.messagePostFix;
    t.data =sectionsHTML;
    t.title=templData.title;
    ht = t.evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1');
    ht.setTitle(templData.title);
     
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);    
    ht = false;
  } finally {    
    if (enableStackdriverLogging) console.log(logingName + " - htmlOutput: " + ht.getContent()); 
    if (enableStackdriverLogging) console.log(logingName + " - htmlSheetContent ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - htmlSheetContent");
    return ht;
  }
}
 
 
/**
 * Prepares the data for the templates based on a sheet contents defined in the "Email Options" sheet. Information about options in function "emailSheetContent"
 *
 * @param {string} emailOptionsSheet the sheet name for the Email Options. Default is "Email Options"
 * @param {boolean} enableStackdriverLogging True to enable Stackdriver Logging. Default is false
 * @param {string} logingName logging name to be appended in the message. Default is ""
 * @param {boolean} replaceLinks True to replace links with <a href...> tags. Default is false
 * @return {json} The Template data.
 */
function prepareTemplateData(emailOptionsSheet,enableStackdriverLogging, logingName,replaceLinks) {
  //template Data ********************************************* Init
  var templData = {"messagePreFix" : "", "messagePostFix" : "", "title":"", "sections" : []};
  try {
    //default values
    if (emailOptionsSheet == null) emailOptionsSheet="Email Options";
    if (enableStackdriverLogging == null) enableStackdriverLogging=false;
    if (logingName == null) logingName = "";
     
    if (enableStackdriverLogging) console.time(logingName + " - prepareTemplateData");
    if (enableStackdriverLogging) console.log(logingName + " - prepareTemplateData STARTED");
     
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
      sheetsToEmail[f-5] = {name: "" + sOptions2values[f][0], title: sOptions2values[f][1], headersAtRow : parseInt(sOptions2values[f][2],10)
                            , display: sOptions2values[f][3], columnsToSend: sOptions2values[f][4].split(",")
                            , emailColumn: sOptions2values[f][5]};      
    }    
     
    if (enableStackdriverLogging) console.log(logingName + " - prepareTemplateData Options set");
     
    //get header options    
    //var email = sOptions2values[5][7];  
    var messagePreFix = sOptions2values[5][8];
    var messagePostFix = sOptions2values[5][9];
    var messageSubject = sOptions2values[5][10];
     
    templData.messagePreFix = messagePreFix;
    templData.messagePostFix = messagePostFix;
    templData.title = messageSubject;
    //get Options end---------------------------
     
    // fop each Sheet defined in body options
    for (var h=0; h<sheetsToEmail.length; h++) {
      if (!sheetsToEmail[h].display) {break;}      
       
      //template Data ********************************************* title and display
      var templDataSection = {"title" :"", "display" : "", "headers" : [], "data" : [], "style" : [], 'dynamicEmails' : []};   
      templDataSection.title=sheetsToEmail[h].title;
      templDataSection.display=sheetsToEmail[h].display;      
             
      if ((sheetsToEmail[h].display != "title") && (sheetsToEmail[h].display != "paragraph")) {
        //Get sheet 
        var sheet = ss.getSheetByName(sheetsToEmail[h].name);
        var range = sheet.getDataRange();
        var values = range.getDisplayValues();
        var backgrounds = range.getBackgrounds();
        var color = range.getFontColors();
        var fontWeights = range.getFontWeights();
        var fontStyles = range.getFontStyles();
        var fontLines = range.getFontLines();
        var lastRow = range.getLastRow();
         
         
        //template Data ********************************************* Headers
        for (var g = 0; g < sheetsToEmail[h].columnsToSend.length; g++)  {
          templDataSection.headers[g] = values[sheetsToEmail[h].headersAtRow][sheetsToEmail[h].columnsToSend[g]];          
        }            
         
         
        var countRows=0;
 
        //Charts
        if (templDataSection.display.indexOf("chart")>-1) {
           templDataSection.data = ss.getRange(sheetsToEmail[h].columnsToSend);
        } else {
           
          //for each row in sheet
          for (var i = sheetsToEmail[h].headersAtRow + 1; i < lastRow; i++)  {       
            //template Data ********************************************* Data and style inir
            templDataSection.data[countRows] = [];
            templDataSection.style[countRows] = [];
             
            //for each columnsToSend
            for (var j = 0; j < sheetsToEmail[h].columnsToSend.length; j++)  {
              //Write values ---- MESSAGE ---
              var cssStyle="background-color:" + backgrounds[i][sheetsToEmail[h].columnsToSend[j]] 
              + ";color:" + color[i][sheetsToEmail[h].columnsToSend[j]] 
              + ";font-weight:" + fontWeights[i][sheetsToEmail[h].columnsToSend[j]] 
              + ";font-style:" + fontStyles[i][sheetsToEmail[h].columnsToSend[j]] 
              + ";text-decoration:" + fontLines[i][sheetsToEmail[h].columnsToSend[j]] 
              + "";             
              //template Data ********************************************* Data and style 
              var valueData = values[i][sheetsToEmail[h].columnsToSend[j]];
              //replace html with links
              if (replaceLinks) {
                //var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
                var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])(?![^<>]*>(?:(?!<\/?a\b).)*<\/a>)/ig;
                valueData=valueData.replace(exp, "<a href='$1'>$1</a>");
                valueData=valueData.replace(/\n/g,"<br />");
              }
              templDataSection.data[countRows][j] = valueData;
              templDataSection.style[countRows][j] = cssStyle;
            }
            //to be used in dynamic emails
            if (!isNaN(sheetsToEmail[h].emailColumn)) {
              templDataSection.dynamicEmails[countRows] = values[i][sheetsToEmail[h].emailColumn];
            }
            countRows++;
          }
        }
      }
      // END IF HERE
             
      //template Data ********************************************* 
      templData.sections[h] = templDataSection;
    }        
     
     
         
  } catch (e) {
    if (enableStackdriverLogging) console.error(logingName + " ERROR: " + e);
    templData = null;
  } finally {
    if (enableStackdriverLogging) console.log({message: 'logingName + " - prepareTemplateData', initialData: templData});
    if (enableStackdriverLogging) console.log(logingName + " - prepareTemplateData ENDED");
    if (enableStackdriverLogging) console.timeEnd(logingName + " - prepareTemplateData");
    return templData;
  }
}
```

I also created different HTML Files to be used as templates for the different display options. See below an example template:

```html
<h3><?!= templDataSection.title ?></h3>
<div class="row">
<? //for all data rows
for (var i = 0; i < templDataSection.data.length; i++)  { ?> 
<div class="col-md-4"><div style="border-radius: 3px;    
    margin-bottom: 10px;
    border: 1px solid #ffffff;
    text-align: center;">
<? //for all data columns
  for (var j = 0; j < templDataSection.data[i].length; j++)  { ?>
    <div style='<?!=templDataSection.style[i][j]?>;<? if (j==1){?>font-size:45px;<?}else{?>font-size: 16px;<?}?>line-height: 1.5;padding: 5px;'><?!=templDataSection.data[i][j]?></div>
<? }  ?>
</div></div>
<? if ((i+1) %3 == 0)  {?>
</div>
<div class="row">
<? }  ?>
<? }  ?>
</div>
```