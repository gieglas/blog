---
title: Schedule stuff with PHP
date: 2013-10-11
summary: I needed a way to schedule notifications with PHP so I turned to the Internet and made a quick search. I couldn’t find a nice post on the subject so I thought I’d make one hoping to help a little bit.
image: Pasted%20image%2020241214183203.jpg
tags:
  - dev
---
Its been a while but I finally found some time to do some programming. I needed a way to schedule notifications with PHP so I turned to the Internet and made a quick search. I couldn’t find a nice post on the subject so I thought I’d make one hoping to help a little bit.

Ok people will tell you DO NOT USE PHP FOR AUTOMATION… and they are probably right. PHP works great with doing stuff with http requests but not so great on automating stuff… but doable.

The way to go is to call your php code from the command line using the

```shell
php.exe -f yourCode.php
```

You can then use some kind of scheduler for example Windows Schedule Tasks or cron and automate your code.

So what if you want to save your schedules information on a database (i.e. MySQL). Well then you’d have to do the work of the scheduler your self… and still use the OS scheduler to run your script every once in a while… say every minute. If you require a lot of precision on when a task is run DO NOT USE the solution described below.

Here’s what to do:

1. First of all you would need to store the schedule information. In the following example I use “**Frequency**“, “**Interval**“, “**Next Schedule Date**“. With these 3 basic schedule information you can build the basics of a scheduler… if you need more I would suggest reading [iCalendar Specification](http://www.kanzaki.com/docs/ical/ "iCalendar specs"){target="_blank"}. Frequency can have the following values: `“SECONDLY” | “MINUTELY” | “HOURLY” | “DAILY” | “WEEKLY” | “MONTHLY” | “YEARLY”`.

2. Then you would need to **get all the scheduled tasks with Next Schedule Date smaller or equal than the current date time**.

3. Then **for each** of those tasks

3.1 do the **actual task**

3.2 **update the Next Schedule Date** with the next calculated  date

 Here’s some sample php code for scheduled notifications to be run by the OS scheduler (cron):

```php
<?php// get notifications from the database 

$notifications = _getNotifications();
foreach($notifications as $res) {
    //…………
    //do your thing that needs to be done when notification is defined here
    //…………
    $freq = $res[“notify_freq”];
    $interval = $res[“notify_interval”];
    $next_date = new DateTime($res[“next_notify_date”]);
    $end_date = new DateTime($res[“now”]);
    while ($next_date < $end_date) {
        switch ($freq) {
            case ‘MINUTELY’:
                $next_date->modify(“+”.$interval.” minute”);
                break;
            case ‘HOURLY’:
                $next_date->modify(“+”.$interval.” hour”);
                break;
            case ‘DAILY’:
                $next_date->modify(“+”.$interval.” day”);
                break;
            case ‘WEEKLY’:
                $next_date->modify(“+”.$interval.” week”);
                break;
            case ‘MONTHLY’:
                $next_date->modify(“+”.$interval.” month”);
                break;
            case ‘YEARLY’:
                $next_date->modify(“+”.$interval.” year”);
                break;
            default:
                $next_date->modify(“+”.$interval.” hour”);
                break;
        }
    }
    // update the notification next date
    updateNotificationsNextDate($res[“id”],$next_date);
}

?>
```

These are the sqls used for `_getNotifications()` and `_updateNotificationNextDate`

```sql
SELECT now() as now
    ,id
    ,notify_freq
    ,notify_interval
    ,next_notify_date
    FROM notifications
    WHERE notify_enabled=1
    AND next_notify_date <= now()
UPDATE notifications SET next_notify_date = :nextDateIn WHERE id = :idIn
```

Well there you have it, hope it helps, and if I got it wrong of course please let me know 😊.