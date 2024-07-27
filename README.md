# Saiberian 

* 2024.7.13 Details coming soon...

A framework for SPA (Single-Page-Action) that can be installed on Web, Android, and iOS.  
([The Japanese version of the document is here](https://github.com/masatonakatsuji2021/saiberian/wiki/Saiberian(%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%9A%E3%83%BC%E3%82%B8)))

## # How to use

We will proceed in the following order:

1. [Create Project](#create_project)
2. [Modify and add project sources](#source)
3. [Build output from project](#build)

---

<div id="create_project"></div>

### 1. Create Project

* 2024.7.13 Project creation commands not implemented  
Instead, we have prepared a test sample below, so please refer to it here
[https://github.com/masatonakatsuji2021/saiberian_build_sample](https://github.com/masatonakatsuji2021/saiberian_build_sample)
This will be explained later in the test sample.

The actual test sample deployment results are as follows:  
(The details are omitted.)

```
{project directory}
    L output
        L android
        L web
    L src
        L app
            L background
            L config
            L controller
            L view
            ...
        L rendering
            L template
            L view
            L viewpart
        L resource
    L src_android
        ...
    L init.d.ts
    L package.json
    L tsconfig.json
```

For the structure of each directory, [see here](#structure).

---

<div id="source"></div>

### 2. Modify and add project sources

* 2024.7.13 Details coming soon...
---
<div id="build"></div>

### 3. Build output from project

* 2024.7.13 Details coming soon...

Execute the following command in the path directly under the project.  
(Make sure that the build file ``index.js`` exists directly under the project directory.)

```console
node .
```

After that, the console output will be displayed as shown below,
and transcompilation within the project will be automatically performed, and each set of source files will be integrated and optimized.

```console
saiberian build start
# TranceComplieType = es6
# Trance Complie...
# ..OK
# already build data ... on delete.
# mkdir /home/nktj2024/desctop/test/saiberian/build_test/output
# platform = web
# mkdir /home/nktj2024/desctop/test/saiberian/build_test/output/web
# build Start
# core module                  App
.....
# local module                 app/config/App
.....
# render html  mount           rendering/template/default.html
.....
# resource content mount       resource/css/style.css
.....
# build End
# write index.js
# write index.html
# ........ platform = web ok
# platform = android
......
# build End
# write index.js
# write index.html
# ........ platform = android ok
#
# ...... Complete!
```

The build files are generated in the ``output`` directory.  
The directories are divided according to platform, so if the ``index.html`` and ``index.js`` are created, the build is successful.

```
$ cd output/web
$ ls
index.html      index.js
```

After that, just move this build data to the deployment location.

---

<div id="structure"></div>

## # Structure

For an explanation of each file and directory area, see below.  
For the terms used in each directory, see [Terminology](#term).

|name|explanation|
|:--|:--|
|output|Build output directory.<br>Generated automatically after the build is executed.|
|src|Source Code directory.|
| - app|Script source directory<br>Basically, the source is placed in a ts file for each class. <br>Regarding class names, you can set derived classes inherited from preset core library classes and your own classes.<br>For the preset core library classes, [see here](#corelib)|
| - -  background|Background class directory.[Explanation here](#background)|
| -  - config|Directory for various setting classes. [Explanation here](#config)|
| -  - controller|Controller placement directory. [Explanation here](#controller)|
| - -  view|View class directory.[Explanation here](#view)|
| - rendering|Rendering HTML placement directory|
| - - template|Directory for placing template HTML. [Explanation here](#template)|
| - - view|Directory for placing HTML for View. [Explanation here](#view_html)|
| - - viewpart|Directory for placing HTML for ViewPart. [Explanation here](#viewpart)|
|〜resource|Directory for placing resource contents. [Explanation here](#resource)|
|src_{platform_name}|Platform-specific source code directories<br>If you want to place or change code information at build time for each platform, add it here.|
|init.d.ts|Type definition file for TypeScript|
|package.json|Build setting json.  [Explanation here](#package.json)|
|tsconfig.json|TypeScript transpilation configuration json|

<div id="config"></div>

### : Config (App Class)

Currently being adjusted...

<div id="temlate"></div>

### : Template (HTML)

Currently being adjusted...

<div id="view_html"></div>

### : View (HTML)

Currently being adjusted...

<div id="viewpart"></div>

### : ViewPart (HTML)

Currently being adjusted...

<div id="resource"></div>

### : Resource

Currently being adjusted...

<div id="package.json"></div>

### : package.json

Currently being adjusted...

<div id="corelib"></div>

## # Core Library Class

When building Saiberian, the minimum classes required for operation are already provided.  
By using this class, you can easily set page settings or click events.

To use it, load it first in any ts file using ``import`` or ``require``.

The method for loading using ``import`` is as follows (calling the View class as an example).

```typescript
import { View } extends View;
```

If you use ``require``, use the following:

```typescript
const View_ = require("View");
const View = View_.View;
```

The available core library classes are:

|name|explanation|
|:--|:--|
|Ajax|This class is used for Ajax communication.<br>[Click here for details](#ajax)|
|App|This is the class for initial setup of the app.<br>Please make sure to install this inherited class ``MyApp``.<br>[Click here for details](#app)|
|Background|Classes to run when the app starts.<br>[Click here for details](#background)|
|Controller|Class to be executed when transitioning between pages.<br>Multiple pages can be managed by a single Controller class.<br>[Click here for details](#controller)|
|Data|Data sharing management class.<br>[Click here for details](#data)|
|Exception|Class when an error occurs.<br>[Click here for details](#exception)|
|KeyEvent|Class for key operation events.<br>[Click here for details](#keyevent)|
|ModernJS|Virtual DOM or modern JS classes for DOM manipulation.<br>[Click here for details](#modernjs)|
|Response|Response manipulation class.<br>[Click here for details](#response)|
|Routes|Routing Classes.<br>[Click here for details](#routes)|
|Shortcode|Class for managing shortcodes.<br>[Click here for details](#shortcode)|
|Storage|Storage operation classes.<br>[Click here for details](#storage)|
|Template|Template class.<br>[](#template)|
|Util|A class that provides methods for basic operations.<br>[Click here for details](#util)|
|View|View Class<br>[Click here for details](#view)|
|ViewPart|ViewPart Class<br>[Click here for details](#viewpart)|

<div id="ajax"></div>

### : Ajax Class

<div id="app"></div>

### : App Class

The App class is the initial setting class for the project.  
Specify the routing for each screen and the Background class to be used.

The App class is written in the project source ``src/app/config/App.ts`` with the following code.  
(Make sure to name the class ``MyApp``)

```typescript
import { App, Routes, AppRouteType } from "App";

export class MyApp extends App {

    // Application Name
    public static appName : string = "Saiberian App";

    // Route Type
    public static routeType : AppRouteType = AppRouteType.application;
    
    // Routing
    public static routes : Routes = {
        "/" : "c:main, a:index",
        "/page1" : "c:main, a:page1",
        "/page2/{id}" : "c:main, a:page2",
        "/page3/{id1}/{id2?" : "c:main, a:page3",
        "/page4/{?id}" : "c:main, a:page4",
        "/view_test" : "viewTest",
    };

    // Background list
    public static backgrounds: Array<string> = [
        "Background",
    ];
}
```

#### :: appName

Name of the application. 

```typescript
public static appName : string = "Saiberian App";
```

#### :: routeType

 Method for page transition.  


 -  **web** : Change the browser URL and move to the page. You can go back by pressing the back button on the browser.  <br>It is mainly intended to be used in a web browser.
 * **application*** : In this mode, the history of screen actions is stored internally, so you cannot press the back button on the browser.
To go back to the previous screen, you need to add a button event and use ``Response.back()`` to go back to the previous screen.<br>
This mode is for Android/iOS/Windows apps.

```typescript
public static routeType : AppRouteType = AppRouteType.web;
```

#### :: routes

This is the routing setting item.<br>
Specify each path during screen transition, the destination view or controller, and the action name (public method name).

For information on setting up routing, [see here](#routes)

```typescript
// Routing
public static routes : Routes = {
    "/" : "c:main, a:index",
    "/page1" : "c:main, a:page1",
    "/page2/{id}" : "c:main, a:page2",
    "/page3/{id1}/{id2?" : "c:main, a:page3",
    "/page4/{?id}" : "c:main, a:page4",
    "/view_test" : "viewTest",
};
```
#### :: backgrounds

Background class list to run.   
Execution will begin in the order specified in the list.

```typescript
public static backgrounds: Array<string> = [
    "Background",
];
```

#### :: sessionStorage

 SessionStorage Identifier

```typescript
public static sessionStorage : string = "sab_ss";
```

#### :: localStorage

 LocalStorage Identifiers.
 
 ```typescript
 public static localStorage : string = "sab_local";
 ```

<div id="background"></div>

### : Background Class

<div id="controller"></div>

### : Controller Class


<div id="term"></div>

## # Terminology

Currently being adjusted...