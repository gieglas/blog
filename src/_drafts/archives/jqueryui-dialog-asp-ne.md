---
title: jQuery UI Dialog for ASP.NET 3.5
date: 2011-06-22
summary: How to use a jQuery UI Dialog in ASP.NET 3.5
image: Pasted%20image%2020241210192248.jpg
tags:
  - dev
---
![](../../img/Pasted%20image%2020241210192248.jpg)
Its a bit tricky when you want to use jQuery UI components in ASP.NET projects. There are some things that are not aligned between the two technologies, even though one is client side and the other is server side.

For starters both have their own Ajax scripts, so when incorporating jQuery UI components on a page you would have to decide which script (or better workflow) to use. I decided to go along with the ASP.NET way so as to keep working in the same way we did with the rest of the pages. The drawback is that the jQuery way is much more efficient.

Another consideration is whether to use ASP.NET input components (including custom components), or use standard HTML Inputs (like the default buttons in a jQuery UI Dialog form). In the case when you want to do something on the browser like run a javascript function, its best to go with HTML inputs, but if you want to keep using the ASP.NET workflow, you better go with the ASP.NET components.

Having these considerations in mind we want to create a component that will easily display a jQuery UI dialog with data from the server after an Ajax request. The data within the dialog can be displayed using any ASP.NET UI component, so as to be able to incorporate the new functionality with existing code and to allow the developers to work the same way they always did. For example if a system uses a custom calendar component that was created by the developers, it is already ready to be displayed with a jQuery UI Dialog without changing the code. All that is needed is to include the code to be displayed in a `<div>`. Here is an example of what will be needed in the aspx page:

```aspnet
1. <div id=”modalDiv” class=”modalPopup” style=”display: none;”>
2. ANYTHING
3. </div>
4. <D:jQueryUIDialog runat=”server” HasCloseButton=”true” HasTitle=”true” Title=”Dialog Title” TargetDiv=”modalDiv” RedirectOnClose=”false” ID=”jQUIDialog” />
```

The custom component itself is not that big of a deal either. The key is the function that will load the dialog and some parameters such as the id of the target `<div>`. The Load function will have to create the javascript to create and display the dialog. In the following example code the component uses the “_TargetDiv_” parameter to define the div to be used for the dialog, “_Title_” and “_HasTitle_” to define the dialog’s title and “_RedirectOnClose_” and “_RedirectUrl_” to define whether to redirect to another page when close is clicked.
```aspnet
sStart = “$(function () {“ & _
”    “ & _
”    $(‘#” & _TargetDiv & “‘).dialog( ‘destory’ );  “ & _
”    $(‘#” & _TargetDiv & “‘).dialog({ “ & _
IIf(_HasTitle, ” title : ‘” & _Title & “‘,”, “dialogClass: ‘ui-dialog-customDialog’,”) & _
”        autoOpen: true, “ & _
”        modal: true, “ & _
”        resizable: false,  “ & _
”        draggable: false, “ & _
”        width: ‘auto’, “ & _
”        zIndex: 1000 , “ & _
”    }); “ & _
”    $(‘#” & _TargetDiv & “‘).parent().appendTo(jQuery(‘form:first’)); “ & _
“}); “
‘add redirect on close event
If _RedirectOnClose Then
sStart = sStart & ”    $(‘#” & _TargetDiv & “‘).dialog({ “ & _
“close: function(event, ui) {window.location='” & _RedirectUrl & “‘;}” & _
” }); “
Else
sStart = sStart & ”    $(‘#” & _TargetDiv & “‘).dialog({ “ & _
“close: function(event, ui) {$(this).remove();}” & _
” }); “
End If
ScriptManager.RegisterClientScriptBlock(Me.Page, Me.GetType, “jQueryDialog”, sStart, True)
```

Note that the last line registers the javascript code to the page.

Don’t forget to load the jQuery UI scripts on your page. You can download them at their site at [jqueryui](http://jqueryui.com/download)