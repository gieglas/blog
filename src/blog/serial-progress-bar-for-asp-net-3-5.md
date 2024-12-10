---
title: Serial Progress Bar for ASP.NET 3.5
date: 2011-08-01
summary: A guide to create an ASP.NET 3.5 serial progress barr
image: Pasted%20image%2020241210202425.jpg
tags:
  - dev
---
There are many user controls in ASP.NET for a progress bar, but not so many for a progress bar that shows you how many steps are finished and how many are left to be completed. I call that a **Serial Progress Bar**, hence the title of the post.

So since I had to go ahead and do it my self, I thought I’d share it. Now for the style, I had to have different styles for **finished** (`customSerialFlowBarFinished`) and **unfinished** steps (`customSerialFlowBarUnFinished`). I also added a little salt into it and made the steps look like arrows, so I needed four more styles with images… two for every step (finished and unfinished), which where the **start** and the **end** of the arrow.

![flowFinishedL image](../../img/flowFinishedL.png)
![flowFinishedR image](../../img/flowFinishedR.png)
![flowUnFinishedL image](../../img/flowUnFinishedL.png) 
![flowUnFinishedR image](../../img/flowUnFinishedR.png)

```css
/* Custom Serial Flow Bar*/
.customSerialFlowBar
{
}
.customSerialFlowBar .customSerialFlowBarFinished
{
    height:15px;
    font-size:1px;
    float:left;
}
.customSerialFlowBar .customSerialFlowBarFinished .customSerialFlowBarFinishedL
{
    height:15px;
    font-size:1px;
    float:left;
    background:url(‘Images/flowFinishedL.png’) no-repeat scroll left center #2080C0;
    width:49%;
}
.customSerialFlowBar .customSerialFlowBarFinished .customSerialFlowBarFinishedR
{
    height:15px;
    font-size:1px;
    float:left;
    background:url(‘Images/flowFinishedR.png’) no-repeat scroll right center #2080C0;
    width:49%;
}
.customSerialFlowBar .customSerialFlowBarUnFinished
{
    height:15px;
    font-size:1px;
    float:left;
}
.customSerialFlowBar .customSerialFlowBarUnFinished .customSerialFlowBarUnFinishedL
{
    height:15px;
    font-size:1px;
    float:left;
    background:url(‘Images/flowUnFinishedL.png’) no-repeat scroll left center #A6CAF0;
    width:49%;
}
.customSerialFlowBar .customSerialFlowBarUnFinished .customSerialFlowBarUnFinishedR
{
    height:15px;
    font-size:1px;
    float:left;
    background:url(‘Images/flowUnFinishedR.png’) no-repeat scroll right center #A6CAF0;
    width:49%;
}
```

After the style the logic behind the code is easy. In order to render the serial progress bar you need the **MaxValue** which is the number of steps and the **ItemValue** which is the step you currently are now. You only have to calculable the percentage of the width of each step and go ahead and render the code.

```aspnet
		Dim RtrnHtml As StringBuilder = New StringBuilder()
        Dim ProcessDivWidth As Double = 0
        Dim CssClassPrefix As String = “”
        RtrnHtml.Append(“<div class='” & BarStyleClass & “‘>”)
        Try
            ‘calculate div width for every step (percentage)
            ProcessDivWidth = Math.Round(((1) / (MaxValue) * 100)) – 1
            ‘for all steps
            For i = 1 To MaxValue Step 1
                ‘if step is in finished show finished
                If i <= ItemValue Then
                    CssClassPrefix = “customSerialFlowBarFinished”
                Else
                    CssClassPrefix = “customSerialFlowBarUnFinished”
                End If
                RtrnHtml.Append(“<div class='” & CssClassPrefix & “‘ style=’width:” & ProcessDivWidth & “%’>”)
                RtrnHtml.Append(“<div class='” & CssClassPrefix & “L’></div>”)
                RtrnHtml.Append(“<div class='” & CssClassPrefix & “R’></div></div>”)
            Next
            RtrnHtml.Append(“<div style=’clear:both;’></div>”)
        Catch ex As Exception
            RtrnHtml.Append(” “)
        End Try
        RtrnHtml.Append(“</div>”)
```

At the end you should end up with with something like this:
```html
<div class=”customSerialFlowBar”>
<div class=”customSerialFlowBarFinished” style=”width:32%”><div class=”customSerialFlowBarFinishedL”></div><div class=”customSerialFlowBarFinishedR”></div></div>
<div class=”customSerialFlowBarUnFinished” style=”width:32%”><div class=”customSerialFlowBarUnFinishedL”></div><div class=”customSerialFlowBarUnFinishedR”></div></div>
<div class=”customSerialFlowBarUnFinished” style=”width:32%”><div class=”customSerialFlowBarUnFinishedL”></div><div class=”customSerialFlowBarUnFinishedR”></div></div>
<div style=”clear:both;”></div>
</div>
```

Now this is not the best way to do it, but since we are doing it the .NET 3.5 way we used a custom control for it. The optimal way would be to render all html through Javascript (maybe use jQuery) and if you want to pass values from the server, you can pass them with JSON through AJAX.