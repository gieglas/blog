---
title: PRINCE2 Project Management with Google Sheets
date: 2014-10-13
summary: I thought it would be nice to setup some Google Sheets to better manage the project. The idea was to create all my PRINCE2 Registers and Logs on Google Sheets and then have a Dashboard like Sheet (as in the picture above) to easily review the Project and create my Reports (such as Highlight reports). It all seems to have worked out nicely for me, so I thought I’d share my setup.
image: Prince2Dashboard.jpg
tags:
  - dev
---
Recently I was assigned to manage a PRINCE2 IT project, so I thought it would be nice to setup some Google Sheets to better manage the project. The idea was to create all my PRINCE2 Registers and Logs on Google Sheets and then have a Dashboard like Sheet (as in the picture above) to easily review the Project and create my Reports (such as Highlight reports). It all seems to have worked out nicely for me, so I thought I’d share my setup. I have links below to all the Google Sheets templates based on my setup to view or download if you like.

![Quality register screenshot](../../img/Prince2QualityRegister.jpg){.img-fluid .pop-small .govcy-mb-3}

I created all my PRINCE2 Records as follows:

| Prince2 Record                 | Technology   | Notes                                                                                                                                                                                                                                              | Link                                                                                                                                                                                                                         |
| ------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Configuration Item Records** | Google Sheet | Called it **Products and Acceptance Register** and also added additional information about the products and acceptance. Has a tab where you can produce **Product Status Account** and **Product** **Descriptions** from the data of the register. | [View](https://drive.google.com/open?id=1XevecBQLZdNjtKJCIMqlnOfrrwdl9M7BJN4Dbup8UQM){target="_blank"} [Copy](https://docs.google.com/spreadsheets/d/1XevecBQLZdNjtKJCIMqlnOfrrwdl9M7BJN4Dbup8UQM/copy){target="_blank"}     |
| **Daily log**                  | Text File    | Plain text file                                                                                                                                                                                                                                    |                                                                                                                                                                                                                              |
| **Issue Register**             | Google Sheet | Both **Issues** and **Exceptions** are registered in here. Has a tab where you can produce **Issue / Exception Reports** from the data of the register.                                                                                            | [View](https://drive.google.com/open?id=1at8kCJ1fDeqLNae1VeQKGakyAZxD8nmS1xnenmIfP64){target="_blank"} [Copy](https://docs.google.com/spreadsheets/d/1at8kCJ1fDeqLNae1VeQKGakyAZxD8nmS1xnenmIfP64/copy){target="_blank"}     |
| **Lessons Log**                | Text File    | Plain text File                                                                                                                                                                                                                                    |                                                                                                                                                                                                                              |
| **Quality Register**           | Google Sheet | All quality records. Has a tab where you can produce **Quality Activity Reports** from the data of the register.                                                                                                                                   | [View](https://drive.google.com/open?id=1KmlC0PXI5VyE-g80EltgjEkpOBW5KAEzQlyq_OJu44M){target="_blank"} [Copy](https://docs.google.com/spreadsheets/d/1KmlC0PXI5VyE-g80EltgjEkpOBW5KAEzQlyq_OJu44M/copy){target="_blank"}<br> |
| **Risk Register**              | Google Sheet | All risk records. Has a tab where you can produce **Risk Reports** and a **Probability Impact Grid** from the data of the register.                                                                                                                | [View](https://drive.google.com/open?id=1jX9qD_gJ9vTzejeEyzaGSr73oBpxAWQwlPDcPMrsZJM){target="_blank"} [Copy](https://docs.google.com/spreadsheets/d/1jX9qD_gJ9vTzejeEyzaGSr73oBpxAWQwlPDcPMrsZJM/copy){target="_blank"}     |

{.govcy-table}

Here are some screenshots of reports that are created automatically from the data of the registers.

![Risk report screenshot](../../img/Prince2RiskReport.jpg){.img-fluid .pop-small .govcy-mb-3}

![Risk issue report screenshot](../../img/Prince2IssueReport.jpg){.img-fluid .pop-small .govcy-mb-3}

![Product description screenshot](../../img/Prince2ProductDescription.jpg){.img-fluid .pop-small .govcy-mb-3}

![Product status account screenshot](../../img/Prince2ProductStatusAccount.jpg){.img-fluid .pop-small .govcy-mb-3}

Then I created the **Dashboard** like spreadsheet that gathers data from all of the above google sheets to produce the **dashboard** with useful data to manage a project, some **early warning signs** based on the data in hand and sections of the **highlight reports** (have to change the period dates on the dashboard sheet) that concern **Issues**, **Products**, **Risks** and **Quality Activities**.

In the Dashboard spreadsheet, I also added a tab for **Tasks** but the data for the Tasks I gather (simply copy paste 🙂 ) from custom reports from MS Project. For the rest of the registers all the Project Manager has to do is:

- update the first tab of each register file with the actual registry data (i.e.  add Issues in the Issue Register) and the rest are created automatically
- change the settings of the dashboard (has a dedicated tab) to point to the correct Google Sheet Id (see image below) for the respected registers. The Google Sheet Id is the value between “/d” and “/edit” in the URL of a spreadsheet i.e. https://docs.google.com/spreadsheets/d/**1at8kCJ1fDeqLNae1VeQKGakyAZxD8nmS1xnenmIfP64**/edit#gid=0.

![Dashboard settings screenshot](../../img/Prince2DashSettings.jpg){.img-fluid .pop-small .govcy-mb-3}

Note that when linking the Google Sheets, you might get an “#REF!” error message because you have not explicitly allowed access to get data from the specific spreadsheets. This is standard feature of Google Sheets when linking data using the “importage” function. To allow access, hover your mouse over the cell, and you’ll see the box below appear asking you to “allow access”.

![Allow access screenshot](../../img/GoogleSheetAllowAccess.png){.img-fluid .pop-small .govcy-mb-3}

All of the above spreadsheets are in [This Google Drive Folder](https://drive.google.com/open?id=1lVXwPzkBjuWPIDepRrNJx0wvmQC5EWi8){target="_blank"}.