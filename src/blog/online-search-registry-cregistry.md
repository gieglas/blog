---
title: Online search registry (cRegistry)
date: 2018-04-17
summary: Recently I had a chance to create an online search system which can basically connect to any database type and search and display information. I tried to make the system as configurable as possible and it should be easy to adapt in any business environment so I thought I’d share my work. I called my system cRegistry (supposed to stand for Common Registry) :-).
image: cregistrylogo256.png
tags:
  - dev
---
Recently I had a chance to create an online search system which can basically connect to any database type and search and display information. I tried to make the system as configurable as possible and it should be easy to adapt in any business environment so I thought I’d share my work. I called my system **cRegistry** (supposed to stand for Common Registry) :-). You can visit a [demo here](http://gieglas.byethost10.com/cRegistry/?i=2){target="_blank"} and I have uploaded the [code here](https://www.dropbox.com/sh/y14kpexhg3w1ngf/AAA--Rb1bGR_KwpEMht4CXfba?dl=0){target="_blank"}. I didn’t create a git this time, rather just shared a Dropbox folder with the code as I don’t think I will be making many modifications.

## cRegistry Description

cRegistry is a system that can create search forms, display search results, details on selected items and even static pages, from different databases. The definitions of the search forms, display search results and details can be defined in configuration files without changing the code. Also the UI and static pages are controlled by templates again without changing the code.

## General Features

- API Based + javascript application
- Technology: PHP, Javascript, Slim Framework, JWT, mustache js
- Can connect to any database (MySQL, SQL Server, Oracle, Sybase)
- Keeps error log file with archiving rule
- Google Analytics
- Google invisible reCAPTCHA

See below some screenshots of the main type of pages supported by the system:

### Static pages

![Home page screen shot](../../img/ScreenShot01.jpg){.img-fluid .pop-small .govcy-mb-3}
### Search Forms, Search Results

![Search screen shot](../../img/ScreenShot02.jpg){.img-fluid .pop-small .govcy-mb-3}
### Details

![Details screen shot](../../img/ScreenShot03.jpg){.img-fluid .pop-small .govcy-mb-3}
## cRegistry Characteristics

**UI**

- Responsive, mobile first works on all devices
- Uses twitter bootstrap, best practices on UI
- Works on all modern browsers
- Complete control over Presentation
- Printer friendly
- Uses hashed variables (enable use of navigation functionality of browsers and direct access to information with links)
- Has maintenance mode

**Performance focused**

- All ajax minimum load time
- Data exchanges with the API with only minimum information

**Flexible**

- without changing the code
	- Can add more search services in both the API and Client app (configs)
	- can add more client applications to it
	- Can easily add static content
- Multi-language

**Security**

- read only on data
- connect to external databases
- Security against bots with invisible recaptcha + access tockens

**Cost**

- All open source no additional cost
- Can easily be maintained (small code)

**Business**

- Can reuse data from different sites and services and deploy within 1-2 months

**Restrictions**

- Javascript enable
- Search must be able to be executed with 1 select statement
- Does not handle replication of data (internal database to external) or images
- Database tables should be optimized
- Doesn’t handle payments
- Doesn’t handle logins
## Framework Explained

The system uses simple REST web services to show search results and details. Specifically it uses the following web services:

**getResults** : Handles requests the get search results requests

**getDetails** : Handles requests the get details requests

**getConfig** : Gets the configuration details for the client application

**auth** : for authentication based on the client id (in this case the JS application’s client id) and if enabled in the config file.

All system configuration is defined in the **api/config.php** file where the database connections, general settings, search and details queries and client application settings are defined.

On the client javascript application the **options.js** file is used to define the client id. Under the **tmpl** folder, the templates and localization text are defined for each service (that were defined in the config.php)

More details on the flow of the system is described in the diagram below:
![cRegistry flow diagram](../../img/ScreenShot04.jpg){.img-fluid .pop-small .govcy-mb-3}
## API Options

All of the system’s API Options are defined in the **api/config.php** file.

### cRegistryOptions - API Options

Options of the API define the details of the and the API requests. They are defined in the `api/config.php` under `$cRegistryOptions` variable array.

See below the details of the options file

<div class="govcy-table-responsive">

|Name|Description|Parent|Type|
|---|---|---|---|
|**proxy**|Proxy for connecting to the internet||url:port|
|**isMaintenance**|If true noting is returned http status is returned 503 and no data re returned by the API. Also a setting `doMaintenance` on the client side is set to true||Boolean|
|**searchActions**|All the API calls are defined here. Below the `getResults` and `getDetails` POST requests are defined which define a complete cRegistry service. Each element in the array is one service of getResults and getDetails. In the example below the `design` service is define||Array|

{.govcy-table}

</div>

**For each Service**

<div class="govcy-table-responsive">

|Name|Description|Parent|Type|
|---|---|---|---|
|**id**|The ID of the service. Must be the same as the parent element of the array|Service|String|
|**connection**|The connection id as defined in the `$connectionOptions` array|Service|String|
|**searchsqlbody**|The `select`, `from`, `joins` part of the search sql. It is the start for defining the `getResults` request|Service|SQL String|
|**searchsqlwhere**|The first `where` part. It must include the keyword `where` to work and it will be the first element in the where clause. The rest of the where clause will be constructed depending on the parameters passed and the `searchoptions` defined below|Service|SQL String|
|**searchsqlend**|The last part of the sql query. Usually the `order by` and `limit` keywords are included here.|Service|SQL String|
|**searchoptions**|The definition of the filter options that can be defined for this service. These sql where parts will be inclided in the where clause if a parameter is passed in the array of the request body array i.e. `[{"name":"InputName","value":"value"}]`|Service|Array|
|**detailssql**|The main sql query that will produce the results of the `getDetails` request, together with the `detailsarrayssql` results|Service|SQL String|
|**detailsarrayssql**|The results of these sql queries will be included in the `getDetails` request. Note that these sqls need a parameter ID to be passed (see `getDetails` API reference)|Service|Array of SQL String|

{.govcy-table}

</div>

**For each searchoptions**

<div class="govcy-table-responsive">

| Name         | Description                                        | Parent        | Type       |
| ------------ | -------------------------------------------------- | ------------- | ---------- |
| **addwhere** | The SQL where part that corresponds to that option | searchoptions | SQL String |
| **islike**   | If this is a `like`                                | searchoptions | Boolean    |

{.govcy-table}

</div>

**Example**

```php
$cRegistryOptions = array(
    'proxy' => '10.10.10.10:8080',
    'isMaintenance' => false,
    'searchActions' => array(
        //---------Design------------------
        'design' => array(
            'id' => 'design',
            'connection' => 'dsViewDB',
            'searchsqlbody' => 'SELECT DISTINCT a.APPLICATIONNUMBER, a.TYREGOFFICECODE, a.APPLICATIONNUMBER, a.REGISTRATIONNUMBER, a.DESCRIPTION, a.TYCURRENTSTATUSCODE, a.CYPRUSTYCURRENTSTATUSCODE FROM design a INNER JOIN designperson b ON a.DESIGNID=b.DESIGNID INNER JOIN person c ON b.PERSONID = c.PERSONID',
            'searchsqlwhere' => 'WHERE a.ACTIVEROW = 1',
            'searchsqlend' => ' ORDER BY a.APPLICATIONNUMBER desc LIMIT 1000',
            'searchoptions' => array(
                'Application_No' => array (
                    'addwhere' => 'AND a.APPLICATIONNUMBER like :Application_No',
                    'islike' => true
                ),'Description' => array (
                    'addwhere' => 'AND a.DESCRIPTION like :Description',
                    'islike' => true
                )
            ),
            'detailssql' => 'SELECT * FROM design a where a.APPLICATIONNUMBER = :id',
            'detailsarrayssql' => array (
                'DesignImages' => 'SELECT a.FILENAME as Filename FROM designimage a INNER JOIN design b ON a.DESIGNID=b.DESIGNID WHERE b.APPLICATIONNUMBER = :id AND a.ACTIVEROW = 1',
                'Classification' => 'SELECT a.CLASSIFICATIONNUMBER as Locarno_Classification FROM classification a INNER JOIN design b ON a.DESIGNID=b.DESIGNID WHERE b.APPLICATIONNUMBER = :id AND a.ACTIVEROW = 1'
            )
        )
    )
);
```
### cRegistryClientOptions – Client Options

The client options define the client applications that use the API. They reside on the server side under `api/config.php` under `$cRegistryClientOptions` variable array. The client application options can be retrieved by the `getConfig` request.

Each element in the root array defines a client application.

See below the details of the options file for each client.

<div class="govcy-table-responsive">

|Name|Description|Type|
|---|---|---|
|**key**|Key for signing the JWT’s, I suggest generate it with base64_encode(openssl_random_pseudo_bytes(64))|String|
|**issuer**|JWT Issuer|String|
|**audience**|JWT Audience|String|
|**refreshin**|When the client should refresh the JWT token|Number|
|**expire**|When the JWT token expires|Number|
|**doCaptcha**|true to do google recaptia authentication|Boolean|
|**captchaSecret**|google recapthca secret key|String|
|**captchaUrl**|google recaptcha url|String:Url|
|**simplePageRoutes**|Define the simple (Presentation) Pages. These pages may also include the search form. The template and localization for each page are defined in the folder `tmpl/pageRoute/`. See more under `??? Clinet side`|Array of Strings|
|**searchPageRoutes**|Define the search Pages. The template and localization for each page are defined in the folder `tmpl/pageRoute/`. See more under `??? Clinet side`|Array of Strings|
|**detailPageRoutes**|Define the search details Pages. The template and localization for each page are defined in the folder `tmpl/pageRoute/`. See more under `??? Clinet side`|Array of Strings|
|**allowedWebServices**|Define the web services `getResults` and `getDetails`. On the defined web services in this array will be allowed for the specific client.|Array of Strings|
|**doAnalytics**|True to send analytics details to google analytics|Boolean|
|**analyticsClientId**|The google analytics client id|String|
|**resourceVersion**|The resources (templates and localizations) version number. Change this when you want to force the client cache to be reset|Number|

{.govcy-table}

</div>

**Example**:

```php
= array(
    'xxxxxxxxx' => array(
        'key' => 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',    // Key for signing the JWT's, I suggest generate it with base64_encode(openssl_random_pseudo_bytes(64))
        'issuer' => 'DRCORRegistry', //JWT issuer
        'audience' => 'DRCORRegistry_clients', //JWT audience
        'refreshin' => '10', // Adding 15 minutes to refresh (when the client should refresh the token)
        'expire' => 60, // Adding 30 minutes to expire (When the JWT token expires)
        'doCaptcha' => false, //true to do google recaptia authentication
        'captchaSecret' => 'xxxxxxxxxxxxxxxxxxxxxx', //google recapthca secret key
        'captchaUrl' => 'https://www.google.com/recaptcha/api/siteverify', //google recaptcha url
        //define simple pages
        'simplePageRoutes' => array('trademark','design','publications','about','help','contact','disclaimer'),
        //define search pages
        'searchPageRoutes' => array('trademark','design','publications'),
        //define details pages
        'detailPageRoutes' => array('trademark','design','publications'),
        //define web services
        'allowedWebServices' => array('trademark','design','publications'),
        //google analytics
        'doAnalytics' => false,
        //google anlytics client id
        'analyticsClientId' => 'UA-102006363-1',
        //clinet resources version
        'resourceVersion' => '4'
    )
);
```
### connectionOptions – Connection Options

The connection options define database and file connections that the API uses. They are defined under `api/config.php` under `$connectionOptions` variable array.

Each element in the root array defines a data connection.

See below the details of the options file for each client.

<div class="govcy-table-responsive">

|Name|Description|Type|
|---|---|---|
|**id**|The id of the connection. Must be the same as the array element name|String|
|**server**|The server location (ip or domain)|String|
|**port**|The database connection port number|Number|
|**user**|The database connection user nane|String|
|**pass**|The database connection password|String|
|**name**|The database name OR the path in case of a filesystem provider|String|
|**provider**|The data provider. Note that specific driver must be installed. The providers that are supported are **mysql**, **sqlsrv**, **oci**, **sybase**, **filesystem** (This is not a database connection but for searching i files)|String|

{.govcy-table}

</div>

**example**:

```php
$connectionOptions = array (
    "dsViewDB" => array (
        "id" => "dsViewDB",
        "server" => "localhost",
        "port" => "",
        "user" => "user",
        "pass" => "password",
        "name" => "databasename", 
        "provider" => "mysql"
    )
);
```
## API Reference

Authorize and authenticate based on client id and response from google recaptcha (in the body of the request)

### auth

<div class="govcy-table-responsive">

| Name                | Value                                                 |
| ------------------- | ----------------------------------------------------- |
| **Request Method**  | POST                                                  |
| URL Breakdown       | api/**auth/**:**clientId**/**:language**              |
| **Request Headers** |                                                       |
| Authorization       | Bearer :JWT i.e. `xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx` |
| Content-Type        | application/json                                      |
| Accept              | text/plain                                            |
| **Request Body**    | \{“response” : “:reCapchaCode”}                       |

{.govcy-table}

</div>

Example Request:

```http
POST api/auth/99999999/el HTTP/1.1
Host: userver:8080
Connection: keep-alive
Origin: http://host:8080
Accept-Language: el
Authorization: Bearer xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx
Content-Type: application/json
Accept: text/plain
Cache-Control: no-cache
```

Sample Return:

```json
{"token":"xxxxxxxx.xxxxxxx.xxxxxxx","refreshin":"10"}
```

### getResults

Handles requests the get search results requests

<div class="govcy-table-responsive">

|Name|Value|
|---|---|
|**Request Method**|POST|
|URL Breakdown|api/**getResults**/**:action**/**:clientId**/**:language**|
|**Request Headers**||
|Authorization|Bearer :JWT i.e. `xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx`|
|Content-Type|application/json|
|Accept|application/json|
|**Request Body**|:FormValues i.e. `[{"name":"InputName","value":"value"}]`|

{.govcy-table}

</div>

Example Request:

```http
POST api/getResults/design/99999999/el HTTP/1.1
Host: userver:8080
Connection: keep-alive
Origin: http://host:8080
Accept-Language: el
Authorization: Bearer xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx
Content-Type: application/json
Accept: application/json
Cache-Control: no-cache
 
[{"name":"Application_No","value":""},{"name":"Registration_No","value":""},{"name":"Description","value":""},{"name":"Person_Id","value":""},{"name":"Person_Name","value":""}]

```

Sample Return:

```json
[
 {
 "applicationnumber": "78721 ",
 "verbalelement": "mas supermarkets",
 "tyfeature": "Combined",
 "tycurrentstatuscode": "Registered",
 "expirydate": "2017-10-26",
 "filename": "CY502010000078721"
 },
 {
 "applicationnumber": "42887 ",
 "verbalelement": "PS PHILIPS SUPERMARKET",
 "tyfeature": "Word",
 "tycurrentstatuscode": "Expired",
 "expirydate": null,
 "filename": null
 }
]
```
### getDetails

Handles requests the get details requests

<div class="govcy-table-responsive">

|Name|Value|
|---|---|
|** Request Method**|POST|
|URL Breakdown|api/**getDetails**/**:action**/**:id**/**:clientId**/**:language**|
|**Request Headers**||
|Authorization|Bearer :JWT i.e. `xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx`|
|Content-Type|application/json|
|Accept|text/plain|
|**Request Body**|Empty|

{.govcy-table}

</div>

Example Request:

```http
POST api/getDetails/design/201600018/99999999/el HTTP/1.1
Host: userver:8080
Connection: keep-alive
Origin: http://host:8080
Accept-Language: el
Authorization: Bearer xxxxxxxxx.xxxxxxxxxx.xxxxxxxxxxxxx
Content-Type: application/json
Accept: text/plain
Cache-Control: no-cache
```

Sample Return:

```json
[
 {
 "verbalelement": "mas supermarkets",
 "applicationnumber": "78721",
 "dtapplication": "2010-10-26",
 "registrationnumber": "78721",
 "recordals": [
 {
 "date": "2010-11-18",
 "event_description": "Η αίτηση καταχώρησης εμπορικού σήματος καταχωρήθηκε"
 },
 {
 "date": "2012-05-11",
 "event_description": "Awaiting for publication"
 },
 {
 "date": "2012-06-20",
 "event_description": "The Mark No. 78721 was published in gazette 4240, section Μέρος 2° - Υπηρεσίες, ΚΛΑΣΗ 36"
 }
 ]
 }
]
```