---
title: PHP Notificator
date: 2015-02-25
summary: We have been looking for an easy way to programmatically send email notifications to customers and came up with small php application to do just that.
image: Pasted%20image%2020241215121336.png
tags:
  - dev
---
We have been looking for an easy way to programmatically send email notifications to customers and came up with small php application to do just that. As it turned out we never used it but hey since I made it might as well share it.

I know, there are lots of services and applications out there that do just that, but where’s the fun in that right. Besides our requirements were a bit restrictive, we needed to automatically send emails based on a table’s entries in our database (populated by other software that handle workflows). Now in our case we use a Sybase Database, but given the fact that we have lots of different databases for all sorts of stuff in our organisation we though it would be best to implement a [PHP + PDO connect everywhere](../php-pdo-connect-everywhere/) application, you know just in case we wanted to use it again somewhere. Besides PDO, we used [mustache](http://mustache.github.io/){target="_blank"} as Template Engine and [swift](http://swiftmailer.org/%20 "swift"){target="_blank"} as Email Engine.

Checkout all the code at [<i class="bi bi-github govcy-text-body"></i> Notificator: Send email notifications](https://github.com/gieglas/Notificator){target="_blank"} 
## Description
Sends notifications depending on a database table. The input data must have the following format:
```php
'id' => NUMBER,
'from' => 'EMAIL@ADDRESS.COM',
'to' => 'EMAIL@ADDRESS.COM',
'subject' => 'STRING',
'notification_method' => 'email', (NOTE, for now only "email" notification method is supported)
'template' => 'NAME OF TEMPLARE FILE WITHOUT THE .mustache EXTENSION', (NOTE: ALL TEMPLATES MUST EXIST UNDER "templates" FOLDER)
'data_json'=> 'JSON STING WITH DATA SPECIFIC TO THE TEMPLATE'
```
This program will send all the emails that are derived from the `selectquery` in the `config.php` which checks records with `status = 0`. It then runs the `updatequerystatus1` which updates the status to 1. Then it sends the notification using a mustache template. It then updates the status of the send email to 2 (which means notification was send). If an error occurs the status of the record is set to 3

The program **will not** populate the database table, it will only read, send notification and mark as send.

It can connect to either Oracle, MySQL, Microsoft SQL Server, Sybase using PDO.
```
Template engine is mustache ( http://mustache.github.io/ ).
Email engine is swift ( http://swiftmailer.org/ )
```

**Note** Example of data_json:

```json
[
	{"word":"watachikita"},
	{"word":"triskitsikitsikita"},
	{"word":"anginara"}
]
```

**Note** Example template:

```html
{% raw %}
<!DOCTYPE html>
    <head>
    </head>
    <body>
        <h4> Data </h4>
        {{#.}}
        <p> {{word}} </p>
        {{/.}}
        <hr>
        <span>Powered by Notificator.<br></span>
    </body>
</html>
{% endraw %}
```

## Prerequisites

Requires at least PHP 5.2.x to run, but works great in 5.3, 5.4 and 5.5, too.
## Installation

- Install PHP 5.2.x or later
    - Make sure the desired PDO extensions are enabled on php.ini, for example for mysql:`extension=php_pdo_mysql.dll`
- Copy the notificator folder on your machine
## Basic Usage
1. The notificator table on the desired database can be populated by a 3rd party application or service. In order to send the notfication the new records must be marked with `status=0`.
2. Run the php from the command line. For example:

```shell
 C:\php\php.exe -f C:\code\notificator\notify.php 
```
## Config File
The config file defines the email server and the database server. The program can connect to any type of database as described above.
```php
$notify_options = array(
        "mailserveraddress" => "smtpmail.example.com",   // smtp server location
        "mailserverport" => "25",                           //  smtp server port
        "connection" => array (
            "server" => "10.10.10.10",  // Location
            "port" => "5000",           // Port
            "user" => "user",           // Database user
            "pass" => "password",       // Password
            "name" => "dbname",         // Database name
            "provider" => "SYBASE"      // available providers are mysql,sqlsrv,SYBASE,oci
        ),
        "convertencoding" => true,      // Convert encoding for subject and json_data?
        "in_charset" => "ISO-8859-7",   // Input character set (same as database)
        "out_charset" => "UTF-8",       // Output character set
        "table" => "notificator",
        "selectquery" => "select id, notif_from, notif_to, subject, notification_method, template, data_json from notificator where status = 1", // Do not change unless you know what you are doing
        "updatequerystatus1" => "update notificator set status=1, send_date=getDate() where status=0", // Do not change unless you know what you are doing
        "updatequerystatus2" => "update notificator set status=2, send_date=getDate() where status=1", // Do not change unless you know what you are doing
        "updatequerystatus3" => "update notificator set status=3, send_date=getDate() where status=1", // Do not change unless you know what you are doing
        "updatequerystatusid" => "update notificator set status=2, send_date=getDate() where id=:id" // Do not change unless you know what you are doing
    );
```
## Database Table used
```sql
create table notificator (
      id                   int              identity  ,
      notif_from           varchar(1000)    not null  ,
      notif_to             varchar(1000)    not null  ,
      subject              varchar(1000)    not null  ,
      notification_method  varchar(100)     not null  ,
      template             varchar(100)     not null  ,
      data_json            varchar(3000)        null  ,
      create_date          datetime         not null  ,
      send_date            datetime             null  ,
      status               tinyint       DEFAULT  0 not null
  )
```