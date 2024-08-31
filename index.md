# Mikeneko 

* 2024.7.13 Details coming soon...

A framework for SPA (Single-Page-Action) that can be installed on Web, Android, and iOS.  

- [Installation](installation.md)
- [Structure](structure.md)

---

<div id="corelib"></div>

# Core Library Class

When building Mikeneko, the minimum classes required for operation are already provided.  
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
|Dialog|Class for displaying dialogs.<br>[Click here for details](#dialog)|
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
|UI|UI Class<br>[Click here for details](#ui)|

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
    public static appName : string = "Mikeneko App";

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
public static appName : string = "Mikeneko App";
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
public static sessionStorage : string = "mike_ss";
```

#### :: localStorage

 LocalStorage Identifiers.
 
 ```typescript
 public static localStorage : string = "mike_local";
 ```

<div id="background"></div>

## # Background Class

<div id="controller"></div>

## # Controller Class

The Controller class is a class that handles the routing for each screen.    
(Equivalent to "C" in the framework's "MVC conventions")

There is a similar class called ``View`` that operates on each screen,  
but while the ``VIew`` class can operate on a single screen,  
the Controller class can manage multiple screens together in a single code.  
[For more information about the View class, see here](#view)


### : Basic description

The Controller file should be written as follows in the specified path for each route.

For example, if you have the following route:

```typescript
"/main": "c:main, a:index",
```

Here, ``c`` is the Controller name, and ``a`` is the action name (public method).

Write the following code in the ``src/app/controller/MainController.ts`` file.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    public index(){
        console.log("main index .... ok");
    }
}
```

Now, when you access ``/main``, the ``index`` in the Page1View class above will be executed as an event handler and ``main index .... ok`` will be displayed in the console.

### : LifeCycle

The lifecycle of the Controller class is as follows:    
``{action name}`` is the action name (public method name).

```
{ Routing Decisions to Controller }
        |
Controller.handleBefore

Controller.before_{action name}
        |
Controller.handleAfter
        |
{ Start Rendering }
        |
Controller.handleRenderBefore
        |
Controller.{action name}
        |
Controller.handleRenderAfter
        |
     ........
        |
{ Decide to transition to another Controller }
        |
Controller.handleLeave
```

Specify an event handler according to the timing of an event from the lifecycle.

Generally, you use the handle method as an event handler, but if you create and inherit a parent Controller class,   
you can use the handleBefore method or handleRenderBefore method of the parent Controller class.

Use handleave if you need to include termination processing when transitioning from a Controller to another Controller or Controller.

### : Using Virtual Dom (ModernJS)

By using a virtual Dom, you can simplify element selection when performing complex Dom control.

For more information about Virtual Dom, [see here.](#modernjs)

In the Controller class, you can easily insert text into tags and set event control for elements using the public variable mjs.

For example, to display text from the Controller class on a page, write it as follows:

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    public index() {

        // set title
        this.mjs.title.text = "Main Index Text Sample ...";

        // set description
        this.mjs.description.text = "Main Index Description Text Sample ..... ";
    }
}
```

Write the following v attribute in the rendering HTML ``src/rendering/view/main/index.html``.

```html
<h1 v="title"></h1>
<div v="description"></div>
```

In the above case, ``Main Index Text Sample ...`` will be displayed in the h1 tag,   
and ``Main Index Description Text Sample .....`` will be displayed in the div tag.

### : Template settings

There are two ways to set a template as a rendering: ( For an explanation of templates, [see here](#template).)

One is to specify the public variable ``template``.   
This method is intended to be specified before rendering, so if you set it in an event  handler after rendering, for example, it will not be reflected immediately.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    // setting template
    public template : string = "default";

    public index() {

    }
}
```

The other is to use the ``setTemplate`` method inside each event handler.

This method will also take effect if you set it in the event handler after rendering.  
However, since it is a method call, it can only be specified on some event handler.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    public handleBefore() {
        // setting template
        this.setTemplate("default");
    }

    public index() {

    }
}
```

### : Changing the rendered HTML

There are two ways to change the rendered HTML (view):

One is to specify it using the public variable ``view``  
This method is intended to be specified before rendering, so if you set it in an event handler after rendering, for example, it will not be reflected immediately.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    // change rendering HTML (view)
    public view : string = "__page1";

    public index() {

    }
}
```

The other is to use the ``setView`` method inside each event handler.

This method will also take effect if you set it in the event handler after rendering.  
However, since it is a method call, it can only be specified on some event handler.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    public handleBefore() {
        // change rendering HTML (view)
        this.setView("__page1");
    }

    public index() {

    }
}
```

### : Head tag settings

By using the public variable ``head``, you can automatically set the rendering HTML of the UI in the head tag.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {
    
    public head : string = "head";

    public index() {

    }
}
```

Specify the content of the head tag in ``src/rendering/ui/head.html`` as shown below.

```html
<title>Application Title</title>
<link rel="stylesheet" href="style.css">
```

### : Setting the heaerd tag

By using the public variable ``header``, you can automatically set the rendering HTML of the UI in the header tag.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {
    
    public header : string = "header";

    public index() {

    }
}
```

Specify the content of the header tag in ``src/rendering/ui/header.html`` as shown below.

```html
<h1>Header Title</h1>
```

### : Setting the footer tag

By using the public variable ``footer``, you can automatically set the rendering HTML of the UI in the footer tag.

```typescript
import { Controller } from "Controller";

export class MainController extends Controller {

    public footer : string = "footer";

    public index() {
        
    }
}
```

Specify the content of the footer tag in ``src/rendering/ui/footer.html`` as shown below.

```html
<p>(C) xxxxxxx 2024</p>
```

<div id="data"></div>

## # Data Class

<div id="dialog"></div>

## # Dialog Class

<div id="exception"></div>

## # Exception Class

<div id="keyevent"></div>

## # KeyEvent Class

<div id="modernjs"></div>

## # ModernJS Class

<div id="response"></div>

## # Response Class

The Response class is used to control rendering HTML operations and screen transitions such as Template, UI, and Dialog.

When using it, be sure to load the Response class with import as shown below.

```typescript
import { Response } from "Response";
```

<div id="response_ui"></div>

### : load UI (Response.UI)

Use the ``Response.UI`` method to get the HTML tag of the UI.  
Be sure to specify the UI name as an argument.

```typescript
const test : string = Response.UI("test");
```

In the above case, the HTML tag information of ``rendering/ui/test.html`` is obtained.

<div id="response_bindui"></div>

### : Bind UI (Response.bindUI)

The ``Response.bindUI`` method binds a specified UI to a specified element (ModernJS class).
The event handler is executed immediately after binding,   
so if the specified UI inheritance class exists and has a ``handle`` method,  
then that method will be executed.

The return value is the instantiated UI class or, if a derived UI class exists, the instance class.

```typescript
import { TestUI } from "app/ui/TestUI";

// ....

const testUI : TestUI = Response.bindUI(this.mjs.target, "test");
```

In the above case, if you place the ``app/ui/TestUI.ts`` file containing the following code,   
the ``handle`` method will be executed immediately after binding.  

```typescript
import { UI } from "UI";

export class TestUI extends UI {

    public handle() {

        // Event handler after binding is completed...
    }
}
```

<div id="response_appendui"></div>

### : Append UI (Response.appendUI)

The ``Response.appendUI`` method appends to a specified element (ModernJS class).  
While ``Response.bindUI`` overwrites the tag information of the specified UI, this is added.  
This method is mainly suitable for displaying list information.


```typescript
import { ItemUI } from "app/ui/ItemUI";

// ....

const itemUI : ItemUI = Response.appendUI(this.mjs.list, "item");
```

In the above case, if you place the ``app/ui/TestUI.ts`` file containing the following code,   
the ``handle`` method will be executed immediately after binding.  

```typescript
import { UI } from "UI";

export class TestUI extends UI {

    public handle() {

        // Event handler after binding is completed...
    }
}
```

In the above case, if you place the ``app/ui/ItemUI.ts`` file containing the following code,   
the ``handle`` method will be executed immediately after binding.  

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {

        // Event handler after binding is completed...
    }
}
```

<div id="routes"></div>

## # Routes Class

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

### : Screen transitions using URLs and link buttons

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

### : Routing with Views

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

### : Routing with Controller

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

### : URL description using scope

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

### : Dynamic support for some URLs

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

### : Dynamic support for some URLs (Optional)

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

## # Shortcode Class

<div id="storage"></div>

## # Storage Class

<div id="template"></div>

## # Template Class

<div id="view"></div>

## # View Class

The View class is a class for specifying the processing content before and after each screen display.  
This mainly involves setting up event handlers that are executed before and after the screen is displayed, and configuring the template to be used.

### : Basic description

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

### : LifeCycle

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

### : Using Virtual Dom (ModernJS)

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

### : Template settings

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

### : Changing the rendered HTML

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

### :: Head tag settings

By using the public variable ``head``, you can automatically set the rendering HTML of the UI in the head tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        
    }
}
```

Specify the content of the head tag in ``src/rendering/ui/head.htm``l as shown below.

```html
<title>Application Title</title>
<link rel="stylesheet" href="style.css">
```

### : Setting the heaerd tag

By using the public variable ``header``, you can automatically set the rendering HTML of the UI in the header tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public header : string = "header";

    public handle() {
        
    }
}
```

Specify the content of the header tag in ``src/rendering/ui/header.htm``l as shown below.

```html
<h1>Header Title</h1>
```

### :: Setting the footer tag

By using the public variable ``footer``, you can automatically set the rendering HTML of the UI in the footer tag.

```typescript
import { View } from "View";

export class Page1View extends View {

    public footer : string = "footer";

    public handle() {
        
    }
}
```

Specify the content of the footer tag in ``src/rendering/ui/footer.htm``l as shown below.

```html
<p>(C) xxxxxxx 2024</p>
```

<div id="UI"></div>

## # UI Class

The UI class is a class for modularizing individual HTML tags such as headers, footers, or tag information for each list item into a user interface.

By using UI classes, you can modularize common HTML tags and reuse them in various Controllers, Views, etc.

### : Basic description

For example, if you want to use form tags in common,
first write the HTML tag in ``rendering/ui/formtag.html`` as shown below.

```html
<form>
<div>Email</div>
<input type="text" v-child="email">
<div>Message</div>
<textarea v-child="message"></textarea>
<button v-child="send">Send</button>
</form>
```

Place the FormtagUI class in the ``app/ui/FormtagUI.ts`` file with the following code:  
The ``handle`` method is an event handler that runs when the UI is bound.  

```typescript
import { UI } from "UI";

export class FormtagUI extends UI {

    public handle() {

        this.mjs.send.onClick = () => {
            // When the Send button is pressed
            console.log({
                email: this.mjs.email.value,
                message: this.mjs.message.value,
            });
        };
    }
}
```

Define a virtual DOM(ModernJS) by specifying the ``v`` attribute on the tag where you want to apply this in the rendering HTML of the ``View`` or ``Controller``.

```html
<div v="form_area"></div>
```

Then, in the derived View class or derived Controller class, bind the UI to the applicable location as shown below.  
The easiest way to bind to the virtual Domain is to use the ``Response.bindUI`` method.  
(For more information on ``Response.bindUI``, [see here](#response_bindui))

```typescript
import { View } from "View";
import { Response } from "Response";

export class Form1View extends View {

    public handle() {

        // bind FormTag UI
        Response.bindUI(this.mjs.form_area, "formtag");
    }
}
```

You can also use the ``response.UI`` method to get and paste only the HTML tags as shown below:  
However, in this case, even if the form can be displayed, the ``FormtagUI.handle`` will not be executed.  
(For more information on ``Response.UI``, [see here](#response.ui))

```typescript
import { View } from "View";
import { Response } from "Response";

export class Form1View extends View {

    public handle() {

        // get FormTag UI
        const formTag : string = Response.UI("formtag");

        // bind FormTag
        this.mjs.form_area.html = formTag;
    }
}
```

### : Using Virtual Dom (ModernJS)

By using a virtual Dom, you can simplify element selection when performing complex Dom control.

For more information about Virtual Dom, [see here.](#modernjs)

In the UI class, you can easily insert text into tags and set event control for elements using the public variable ``mjs`.

For example, to display text from the View class on a page, write it as follows:

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {

        // title 
        this.mjs.title.text = "UI Item Text ....";

        // description
        this.mjs.description.text = "description Text Sample Text Sample Text Sample Text Sample ....";
    }
}
```

Write the following v attribute in the rendering HTML ``src/rendering/ui/item.html``.

```html
<h3 v-child="title"></h3>
<div v-child="description"></div>
```

---

<div id="term"></div>

# Terminology

Currently being adjusted...