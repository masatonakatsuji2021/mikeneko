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


 -  **web** : Change the browser URL and move to the page.   
 You can go back by pressing the back button on the browser.    
 It is mainly intended to be used in a web browser.
 * **application*** : In this mode, the history of screen actions is stored internally,   
so you cannot press the back button on the browser.  
To go back to the previous screen, you need to add a button event and use ``Response.back()`` to go back to the previous screen.  
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

<div id="data"></div>

### : Data Class

<div id="exception"></div>

### : Exception Class

<div id="keyevent"></div>

### : KeyEvent Class

<div id="modernjs"></div>

### : ModernJS Class

<div id="response"></div>

### : Response Class

<div id="routes"></div>

### : Routes Class

The Routes class is used to set the destination of each screen and the Controller class or View class to be used.  
By performing routing, you can easily switch screens using a specified URL, and you can see at a glance the relationship between the URL and the Controller class or View class to be used.

This class is not used directly, but is used indirectly in the initial routing steps in the0 ``MyApp`` class.

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

#### :: Screen transitions using URLs and link buttons

The URL in routing corresponds to the identifier of each screen.  
Enter the key name starting with ``/`` as shown below.

```typescript
"/page1" : "c:name , a:page1",
```

If you want to transition between screens, you can easily specify the destination using this URL.  
For example, if you want to place a link button (a tag) on ​​a page that will transition to the above URL when pressed, write it as follows:

```html
<a href="#/page1">Page1</a>
```

The href attribute is the same as for normal page transitions, but here you must put ``#`` before it.   
By adding ``#``, it will be treated as an internal link, and when used on the web, the screen transition will be completed only within the page, without the browser performing page redirection operations.

#### :: Routing with Views

To associate a view class or view-rendered HTML with a specific URL, use the following:

```typescript
"/page1": "page1",
```

The view class is placed in ``src/app/view/Page1View.ts`` and the view rendering HTML is placed in ``src/rendering/view/page1.html``.

The ``Page1View.ts`` file contains the following code:   
[See About the View class](#view)

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {
        // Describe the action to be taken after the page transition here.
    }
}
```

``page1.html`` contains the following HTML tags:

```html
<h1>Page1 View....</h1>
```

When specifying a View class, you need to write the View class for each screen in a separate ts file, but by using a Controller instead, you can write multiple screens in a single ts file.  
(The method for specifying routing inthe Controller is described below.)

#### :: Routing with Controller

To associate a Controller class and action (public method) with a specific URL instead of the View class above, specify it as follows:

```typescript
"/page2": "c:page2, a:index",
```

``c:`` refers to the controller name, and ``a:`` refers to an action (public method) in the specified controller.

Then write the following code in ``src/app/controller/Page2Controller.ts``,  
[See About the Controller class](#controller)


```typescript
import { Controller } from "Controller";

export class Page2Controller extends Controller {

    public index() {
        // Describe the action to be taken after the page transition here.
    }
}
```

By using Controller, you can manage multiple screens with one Controller-derived class, for example as shown below.

```typescript
"/page2": "c:page2, a:index",
"/page2/sub1": "c:page2, a:sub1",
"/page2/sub2": "c:page2, a:sub2",
```

The code content of ``Page2Controller.ts`` in the above case is as follows.

```typescript
import { Controller } from "Controller";

export class Page2Controller extends Controller {

    public index() {
        // Describe the action to be taken after the page transition here.
    }

    public sub1() {
        // Describe the action to be taken after the page transition here.
    }

    public sub2() {
        // Describe the action to be taken after the page transition here.
    }
}
```

#### :: URL description using scope

You can simplify the description of the routing URL by specifying a range (scoping) for a part of it.

For example, in the following case, ``/page2`` will be duplicated in each route.

```typescript
"/page2": "c:page2, a:index",
"/page2/sub1": "c:page2, a:sub1",
"/page2/sub2": "c:page2, a:sub2",
```

It can be written as follows to have the same meaning as above:

```typescript
"/page2": {
    "/": "c:page2, a:index",
    "/sub1": "c:page2, a:sub1",
    "/sub2": "c:page2, a:sub2",
},
```

Scoping can be done at any stage.

```typescript
"/page2": {
    "/": "c:page2, a:index",
    "/sub1": "c:page2, a:sub1",
    "/sub2": "c:page2, a:sub2",
    "/mode" : {
        "/": "c:page2, a:mode", 
        "/pattern1": "c:page2, a:modePattern1", 
        "/pattern2": "c:page2, a:modePattern2", 
    },
},
```

#### :: Dynamic support for some URLs

To make the URL dynamic, use ``{}``.

```typescript
"/page3/{}": "page3",
```

For clarity, you can also specify names within ``{}``.

```typescript
"/page3/{id}": "page3",
```

Whatever value is entered in the item corresponding to the above ``{id}``, it will be routed.

For example, if you want to access the above routing by clicking a link tag, you can access it as follows:

```html
<!-- // OK--->
<a href="#/page3/111">Page3(111)</a>
<a href="#/page3/222">Page3(222)</a>
<a href="#/page3/333">Page3(333)</a>
```

However, if you omit the following items, you will not be able to access the page because it will not be routed.

```html
<!-- // NG--->
<a href="#/page3">Page3</a>
```

If you want to get the above items in the View or Controller, you can get them as arguments.

For example, in the case of View:

```typescript
import { View } from "View";

export class Page3View extends View {

    public handle($id : string) {
        console.log("id = " + $id);
    }
}
```

The same applies if it is a Controller.

```typescript
import { Controller } from "Controller";

export class Page3Controller extends Controller {

    public index($id : string) {
        console.log("id = " + $id);
    }
}
```

You can also specify it not only at the end of the URL but also in the middle as shown below.

```typescript
"/page3/{id}/detail": "page3Detail",
```

#### :: Dynamic support for some URLs (Optional)

To make a part of the URL correspond to an arbitrary value, write it using ``{?}``.  
This allows you to route regardless of whether there is a value in the ``{?}`` section.

```typescript
"/page4/{?}": "page3",
```

For clarity, you can also specify names within the ``{?}``.

```typescript
"/page4/{?id}": "page3",
```

If you want to access the above routing by clicking the link tag, you can access it as follows:

```html
<!-- // OK--->
<a href="#/page4">Page3</a>
<a href="#/page4/222">Page3(222)</a>
<a href="#/page4/333">Page3(333)</a>
```

If you want to retrieve the above items in the View or Controller, you can retrieve them as arguments   
(however, please assume that they will be omitted).

For example, in the case of Vie:

```typescript
import { View } from "View";

export class Page3View extends View {

    public handle($id : string) {
        console.log("id = " + $id);
    }
}

```

The same applies if it is a Controller.

```typescript
import { Controller } from "Controller";

export class Page3Controller extends Controller {

    public index($id : string) {
        console.log("id = " + $id);
    }
}
```

<div id="shortcode"></div>

### : Shortcode Class

<div id="storage"></div>

### : Storage Class

<div id="template"></div>

### : Template Class

<div id="view"></div>

### : View Class

The View class is a class for specifying the processing content before and after each screen display.  
This mainly involves setting up event handlers that are executed before and after the screen is displayed, and configuring the template to be used.

#### :: Basic description

The view file should be written as follows in the specified path for each route:

For example, if you have the following route:

```typescript
"/page1": "page1",
```
Write the following code in the ``src/app/view/Page1View.ts`` file.

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle(){
        console.log("page1 .... ok");
    }
}
```

Now, when you access ``/page1``, the ``handle`` in the Page1View class above will be executed as an event handler and ``page1 .... ok`` will be displayed in the console.

#### :: LifeCycle

The lifecycle of the View class is as follows:

````
{ Routing Decisions to Views }
        |
View.handleBefore
        |
View.handleAfter
        |
{ Start Rendering }
        |
View.handleRenderBefore
        |
View.handle
        |
View.handleRenderAfter
        |
     ........
        |
{ Decide to transition to another view }
        |
View.handleLeave
````

Specify event handlers according to the timing of events from the lifecycle.

Generally, the ``handle`` method is used as an event handler, but if you create your own parent View class and inherit it, you can use the ``handleBefore`` or ``handleRenderBefore`` method in the parent View class.

If you need to include termination processing when transitioning from a View to another Controller or View, use ``handleave``.

#### :: Using Virtual Dom (ModernJS)

By using a virtual Dom, you can simplify element selection when performing complex Dom control.

For more information about Virtual Dom, [see here.](#modernjs)

In the View class, you can easily insert text into tags and set event control for elements using the public variable ``mjs``.

For example, to display text from the View class on a page, write it as follows:

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {

        // set title
        this.mjs.title.text = "Page1 Text Sample ...";

        // set description
        this.mjs.description.text = "Page1 Description Text Sample ..... ";
    }
}
```

Write the following v attribute in the rendering HTML ``src/rendering/view/page1.html``.

```html
<div v="title"></div>
<div v="description"></div>
```

#### :: Template settings

There are two ways to set a template as a rendering:
( For an explanation of templates, [see here.](#template))  

One is to specify the public variable ``template``.  
This method is intended to be specified before rendering, so if you set it in an event handler after rendering, for example, it will not be reflected immediately.

```typescript
import { View } from "View";

export class Page1View extends View {

    // setting template
    public template : string = "default";

    public handle() {

    }
}
```

The other is to use the ``setTemplate`` method inside each event handler.

This method will also take effect if you set it in the event handler after rendering.  
However, since it is a method call, it can only be specified on some event handler.

```typescript
import { View } from "View";

export class Page1View extends View {

    public handleBefore() {
        // setting template
        this.setTemplate("default");
    }

    public handle() {

    }
}
```

#### :: Changing the rendered HTML

There are two ways to change the rendered HTML (view):

One is to specify it using the public variable ``view``  
This method is intended to be specified before rendering, so if you set it in an event handler after rendering, for example, it will not be reflected immediately.

```typescript
import { View } from "View";

export class Page1View extends View {

    // change rendering HTML (view)
    public view : string = "__page1";

    public handle() {

    }
}
```

The other is to use the ``setView`` method inside each event handler.

This method will also take effect if you set it in the event handler after rendering.  
However, since it is a method call, it can only be specified on some event handler.

```typescript
import { View } from "View";

export class Page1View extends View {

    public handleBefore() {
        // change rendering HTML (view)
        this.setView("__page1");
    }

    public handle() {

    }
}
```

#### :: Head tag settings

By using the public variable ``head``, you can automatically set the rendering HTML of the ViewPart in the head tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        
    }
}
```

Specify the content of the head tag in ``src/rendering/viewpart/head.htm``l as shown below.

```html
<title>Application Title</title>
<link rel="stylesheet" href="style.css">
```

#### :: Setting the heaerd tag

By using the public variable ``header``, you can automatically set the rendering HTML of the ViewPart in the header tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public header : string = "header";

    public handle() {
        
    }
}
```

Specify the content of the header tag in ``src/rendering/viewpart/header.htm``l as shown below.

```html
<h1>Header Title</h1>
```

#### :: Setting the footer tag

By using the public variable ``footer``, you can automatically set the rendering HTML of the ViewPart in the footer tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public footer : string = "footer";

    public handle() {
        
    }
}
```

Specify the content of the footer tag in ``src/rendering/viewpart/footer.htm``l as shown below.

```html
<p>(C) xxxxxxx 2024</p>
```

<div id="viewpart"></div>

### : ViewPart Class

<div id="term"></div>

## # Terminology

Currently being adjusted...