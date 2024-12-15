---
title: PHP PDO Connect Everywhere
date: 2015-02-24
summary: We all know how cool PHP is. What is even cooler is using PHP with PDO to connect to … well basically everywhere.
image: Pasted%20image%2020241215120754.png
tags:
  - dev
---
Back to programming. We all know how cool PHP is. What is even cooler is using PHP with PDO to connect to … well basically everywhere. Now that I suddenly remembered my coding days, I thought I’d share a little guide on using PHP with PDO on windows.

Yes I know, coding on windows… are you nuts? Ok fair enough but some people do that and turns out there are not may resources out there. Am not going to get into describing how to use PDO, there are tons of articles out there.

Now the coolest thing about PDO is being able to connect to different database technologies from the same machine, but as I discovered it’s not as easy as it sounds on windows. So here is a set of notes I gathered regarding the databases I have encountered so far with a xampp installation:

## MySQL
**MySQL** using **PDO_MYSQL** extension seemed to be installed on xampp by default didn’t have to do much work. Here is the code I used for the connection:

```php
$connStr = "mysql:host=".$myServer.";dbname=".$myDB; 
$conn = new PDO($connStr,$myUser,$myPass);
```

## Microsoft SQL Server
**Microsoft SQL Server** using **PDO_SQLSRV** followed the instructions on [Using php 5.3 with mssql pdo on windows/](http://craigballinger.com/blog/2011/08/usin-php-5-3-with-mssql-pdo-on-windows/){target="_blank"}. Here is the code I used:

```php
$connStr = "sqlsrv:Server=".$myServer.";Database=".$myDB; 
$conn = new PDO($connStr,$myUser,$myPass);
```
## Oracle
**Oracle** with **PDO_OCI**. Download and install the proper Oracle Instant Client on your windows machine for example instantclient_12_1 and add its path to PATH in SYSTEM Environmental Variables. Note Oracle supports only 2 versions down so select your client version properly. Do that and then restart your Apache. Here is the code I used:

```php
$tns = "(DESCRIPTION=(ADDRESS_LIST = (ADDRESS = (PROTOCOL = TCP)(HOST = ".$myServer.")(PORT = 1521)))(CONNECT_DATA=(SID=".$myDB.")))"; 
$connStr = "oci:dbname=".$tns;      
$conn = new PDO($connStr,$myUser,$myPass);
```
## Sybase
**Sybase** with **PDO_ODBC** Must have Sybase ASE ODBC Driver which comes with the SDK. Here is the code I used:
```php
$connStr = "odbc:Driver={Adaptive Server Enterprise};server=".$myServer.";port=".$myPort.";db=".$myDB;
$conn = new PDO($connStr,$myUser,$myPass);
```

Hope it helps.