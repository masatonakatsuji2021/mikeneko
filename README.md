# mikeneko

<br><img src="mikeneko.png"><br><br>

mikeneko is a SPA (Single-Page-Action) framework that supports web and terminal applications.  
It is composed of TypeScript (JavaScript).

## # How to install

### ## Required environment

The following environment is required

- Node.js (ver20.18.1 or later)
- npm (ver10.8.2 or later)
- VisualStudioCode (Editor with TypeScript completion)
- TypeScript (5.7.2 or later)

### ## Installing mikeneko

Install mikeneko with the following npm command.

```
$ npm i -g mikeneko
```

After the installation is complete, the following ``mike`` command will be available.

```
$ mike
```

The ``mike`` command is a function for creating projects and managing the plugin platform in mikeneko.
[For details on commands, see here](#mike)

### ## Preparing the environment from project sources

Prepare a test sample in the following Git repository.

[https://github.com/masatonakatsuji2021/mikeneko_sample](https://github.com/masatonakatsuji2021/mikeneko_sample)

## # Create a project

To create a project, use the following command:  
After that, the project name etc. are set interactively.

```
$ mike create
```

If the project name is already set, you can specify it directly using the following command:

```
$ mike create project1
```

### ## Project file/directory structure

Below is an example.

```
|- dist
    ....
|- output
    ....
|- src
    |-app 
        |- config
            |- App.ts
        |- ui
            |- HeaderUI.ts
        |- view
            |- View.ts
            |- HomeView.ts
    |-rendering
        |- ui
            |- header.html
        |- view
            |- home.html
        |- template
            |- default.html
    |- resource
        |- css
            |- style.css
        |- img
            |- logo.png
|- index.js
|- package.json
|- mikeneko.json
|- tsconfig.json
```

See below for an overview of the files and directories in the source code.

|||
|:--|:--|
|dist|*1  Directory for intermediate sources during build|
|output|*1  Build generated directories|
|node_modules|*1 Directory for local installation of npm packages|
|src|Directory for storing all source files|
|..app|Directory for TypeScript (ts) format script files|
|..rendering|Directory for rendering HTML files|
|..resource|Directory for static content files such as css and images|
|index.js|Build js file|
|package.json|Project package.json|
|mikeneko.json|Build options configuration file|
|tsconfig.json|TypeScript configuration file|

*1 No need to create it as it will be generated automatically.

## # Build and Build Options

Move the current directory to the project directory and execute the following command to build the project:

```
$ cd project1
$ node . 
```

Build options can be set by
- specifying them as arguments to the ``Builder.build`` method
- specifying them in the configuration file ``mikeneko.json``

### ## Argument specification for Builder.build method

Build options can be specified as arguments to the ``Builder.build`` method for executing the build in ``index.js`` located directly under the project directory,  
as shown below.

```javascript
"use strict";
const { Builder } = require("mikeneko-build");
Builder.build({
    platforms: [
        {
            name: "web",
            debug: true,
        },
    ],
});
```

### ## Specification by configuration file mikeneko.json

How to specify build options in the configuration file mikeneko.json.

```json
{
    "platforms": [
        {
            "name": "web",
            "debug": true,
        },
    ],
}
```

## # Main build options

### ## Platform Settings

If you want to add two or more platforms to ``mikeneko.json``,   
list them as follows:

```json
{
    "platforms": [
        {
            "name": "app1",
        },
        {
            "name": "app2",
        },
        {
            "name": "app3",
        },
    ],
}
```

If you have multiple platforms,  
running the following command will build all platforms.

```
$ node .
```

To build only the app2 platform,   
execute the following command:

```
$ node . --platform app2
```

### ## Build options

#### ### Debug log output

Set debug to true in mikeneko.json.

```json
{
    "platforms": [
        {
            "name": "app",
            "debug": true        // <= Output debug log
        }
    ]
});
```

#### ### View Mappings

Set mapping to true in mikeneko.json.

```json
{
    "platforms": [
        {
            "name": "app",
            "mapping": true        // <= Mapping Output
        }
    ]
}
```

#### ### Code Obfuscation

Set ``obfuscated`` to ``true`` in ``mikeneko.json``.

```json
{
    "platforms": [
        {
            "name": "app",
            "obfuscated": true   // <= Code Obfuscation
        }
    ]
}
```

#### ### Code compression

Set ``codeCompress`` to ``true`` in ``mikeneko.json``.

```json
{
    "platforms": [
        {
            "name": "app",
            "codeCompress": true   // <= Code compression
        }
    ]
}
```

#### ### Force build of core libraries

If the core library is updated,   
it will be updated with the following command.

```
$ node . --force
```

#### ### Change transpiled version

Change the target in ``tsconfig.json``.

```json
{
  "compilerOptions": {
    "target": "es2022",        // <= Change Target
    "module": "commonjs",
    "lib": ["es2022","dom"],   // <= Change Target
    .....
  }
}
```

#### ### Build with WebPack

Specify ``build`` to ``webpack`` in ``mikeneko.json``.  
(Note that WebPack is installed globally.)

```json
{
    "platforms": [
        {
            "name": "app",
            "build": "webpack"   // <= Specify build to webpack
        }
    ]
}
```
<div id="app"></div>

## # Initial Setup

Open ``src/app/config/App.ts`` and make sure the code is written as below.

```typescript
import { App, AppRouteType } from "App";
import { RouteMap, RouteMaps } from "RouteMap";
import { Maps } from "app/config/Maps";

export class MyApp extends App {

    // routeType
    public static routeType: AppRouteType = AppRouteType.web;
    
    // route maps
    public static maps : RouteMaps = Maps;

    // Not Found View
    public static notFoundView: RouteMap = Maps.notFound;

    // Rendring Delay 
    public static delay: number = 300;

    // animation class selector
    public static animationClassSelector: AnimationClassSelector = {
        // When switching screens (next or move)
        next: {
            open: "nextOpen",
            close: "nextClose",
        },
        // When switching screens (back)
        back: {
            open: "backOpen",
            close: "backClose",
        },
        // When switching screens (stack)
        stack: {
            open: "stackOpen",
            close: "stackClose",
        },
    };
}
```

### ## Root Method

There are two options, ``web`` and ``application``, so select one.

|||
|:--|:--|
|web|Use for viewing in a web browser etc. URL can be specified.|
|application|Mainly used in smartphone apps and desktop apps.|

```typescript
// routeType
public static routeType: AppRouteType = AppRouteType.web;
```

### ## routing

Specify the routing settings for each screen below  
For more information on routing, [see here.](#routes)

The following is the case when using the RouteMap method.

```typescript
// route maps
public static maps : RouteMaps = Maps;
```

### ## Specifying the NotFound screen

Specify the screen to be displayed if a screen does not exist or the file class for the screen is insufficient.  
Can be specified by view name or RouteMap class.  
For the RouteMap, [see here](#routemap)

```typescript
// Not Found View
public static notFoundView: RouteMap = Maps.notFound;
```

### ## Screen transition delay settings

Specify this if you need a slight delay when performing animations during screen transitions.  
The unit is ms.

```typescript
// Rendring Delay 
public static delay: number = 300;
```

### ## Class settings for screen transition animation

When performing animation display, etc., you can use the member variable   
``animationClassSelector`` to specify class attributes for when various screens are displayed and when they end.

The specified class attribute name will be placed in the ``article`` tag for each screen.

For animation display,  
it is recommended to use CSS animations using animation or transition in CSS.  
So here we use the class attribute to switch animations.

```typescript
public static animationClassSelector: AnimationClassSelector = {
    // When switching screens (next or move)
    next: {
        open: "nextOpen",
        close: "nextClose",
    },
    // When switching screens (back)
    back: {
        open: "backOpen",
        close: "backClose",
    },
    // When switching screens (stack)
    stack: {
        open: "stackOpen",
        close: "stackClose",
    },
};
```

### ## Background Processing Settings

You can enumerate background processes that run simultaneously when the app is launched.    
The order will be the execution order of each background class.

```typescript
public static background = [
    "Background1",
    "Background2",
    "Background3",
    ....
];
```

For background, [see here](#background)

<div id="routes"></div>

## # Routing

Routing is information that links the screen class (View) and URL that are applied when transitioning between screens.    
In mikeneko, screen transitions and switching are basically performed by specifying a URL with routing or the ``RouteMap`` class.

There are two main methods for routing:
- Routing with URL path and View specified as literal string.
- Routing with RouteMap

### ## Routing with URL path and View

Specify the View name (View derived class name) to be used by using the URL as a key.    

This is the simplest method,   
but because the URL and view name are literal values,   
care must be taken when using and managing them,   
such as when modifying code.

The method is to write the code as follows in ``src/app/config/App.ts``.  
If you have a lot of routing content,   
it is better to make it a separate module and import it.

```typescript
public static routes = {
    "/": "home",
    "/faq": "faq/main",
    "/page1": {
        "/": "page1/main",
        "/{id}": "page1/detail",
        "/add": "page1/add",
    },
};
```

#### ### Specifying the URL and View

The key value (left side) is the URL (path) and the value (right side) is the view name to be used.    
In the example below, HomeView(``src/app/view/HomeView.ts``) is specified as the screen (TOP) that appears immediately after the app is launched.

```typescript
"/": "home",
```

View can also specify subdirectories.  
In the following example, the MainView(``src/app/view/faq/MainView.ts``) will be specified for the URL ``/faq``.

```typescript
"/faq": "faq/main",
```

For information on how to set up the View class and HTML content, [see here.](#view)

When transitioning between screens, use the Transition class to specify the URL as shown below.  
For more information on Transition, [see here](#transition)

```typescript
Transition.next("/faq");
```

#### ### URL Scope

If the same path exists for multiple routes at the beginning of the URL,   
it can be written in the scope.

```typescript
"/page1": {
    "/": "page1/main",
    "/{id}": "page1/detail",
    "/add": "page1/add",
},
```

In the above case, ``/page1`` is omitted, and it will be the same as below.

```typescript
"/page1": "page1/main",
"/page1/{id}": "page1/detail",
"/page1/add": "page1/add",
```

Scope can also be specified by nesting as follows:

```typescript
"/offline": {
    "/page1": {
        "/": "offline/page1/main",
        "/{id}": "offline/page1/detail",
        "/add": "offline/page1/add",
    },
},
```

#### ### When to specify dynamic/arbitrary values ​​in the URL

Use the ``{}`` notation when specifying dynamic or arbitrary values ​​in the URL.

```typescript
"/page1/{id}": "page1/detail",
```

In the above case, the same routing will be applied to the following URLs:

```
/page1/1
/page1/2
/page1/3
```

Dynamic values ​​can be obtained as arguments in the View class.    
For details, [see here](#view_handle)

Multiple dynamic values ​​can be specified.

```typescript
"/page1/{id1}/{id2}/{id3}": "page1/detail",
```

In the above case, the following URL also applies:

```
/page1/1/2/3
```

However, since the value is required,   
if even one value is missing as shown below,   
it will not be applied.

```
/page1/1/2
```

Use ``{?}`` to make some values ​​optional.

```typescript
"/page1/{id}/{option?}": "page1/detail",
```

This will apply the routing in the above case.

```
/page1/1
/page1/2/1
```

<div id="routemap"></div>

### ## Routing with RouteMap

``RouteMap`` is a method that emphasizes complementary functions more than the above routing methods.  
The method is to instantiate the URL and View class name in the ``RouteMap`` class and use it.

To instantiate it, use the ``RMap`` method in the ``RouteMap`` module:

Write the following code in ``src/app/config/App.ts``:

```typescript
import { RMap } from "RouteMap";

public static maps = {
    home: RMap({ url: "/", view: "home" }),
    faq: RMap({ url: "/faq", view: "faq/main" }),
    page1: {
        main: RMap({ url: "/page1", view: "page1/main" }),
        main: RMap({ url: "/page1/{id}", view: "page1/detail" }),
        main: RMap({ url: "/page1/add", view: "page1/add" }),
    },
};
```

The ``RMap`` method instantiates the ``RouteMap`` class and takes a view name or URL as an argument.

The global variable ``maps`` can be used as a definition when transitioning between screens using ``Transition``, etc.,   
and it is possible to specify only the routing defined by the completion function in Visual Studio Code, etc.

```typescript
import { MyApp } from "app/config/App";

...

Transition.next(MyApp.maps.faq);
```

If the ``routeType`` is ``application``,   
you do not need to specify the URL and can just specify the view name.

```typescript
import { RMap } from "RouteMap";

public static maps = {
    home: RMap({ view: "home" }),
    faq: RMap({ view: "faq/main" }),
    page1: {
        main: RMap({ view: "page1/main" }),
        main: RMap({ view: "page1/detail" }),
        main: RMap({ view: "page1/add" }),
    },
};
```

* When using RouteMap, the first specified route is applied to the TOP immediately after the app is launched.

## # About the Core Library

In mikeneko, the standard functions available are collectively called core libraries.  
The core libraries provided are:

||||
|:--|:--|:--|
|App|[Initial setting class](#app)||
|Transition|[Method class for screen transition](#transition)||
|VirtualDom|[Virtual DOM manipulation classes](#virtualdom)||
|Lib|[Commonly Used Method Classes](#lib)||
|Render|[Drawing classes](#render)|Classes not used directly|
|View|[Display class for each screen](#view)||
|UI|[Class for parts to be displayed commonly on each screen](#ui)||
|Template|[Template Classes](#template)||
|Background|[Background processing classes](#background)||

In addition to this, functions such as dialog display (``Dialog``) and input validation check (``Validation``) can be used by installing them as separate plugins.

[For more information, see About Plugins.](#plugin)

<div id="transition"></div>

## # Transition Class

``Transition`` is a class mainly used for screen transitions, etc.  
To use it, you need to import the module with the following import.

```typescript
import { Transition } from "Transition";
```

### ## Transition to another screen (next)

You can use the ``next`` method to navigate to another screen.  
When this method is used, the screen transition history is stored inside the app.

For example, specify the destination URL as an argument as follows:

```typescript
Transition.next("/faq");    // <= Go to /faq page
```

You can also set temporary data for the destination screen in the arguments.  
(However, this method cannot be used if RouteType is used on the web.)

```typescript
Transition.next("/faq", { id: 2 });    // <= Go to /faq page
```

The above data is obtained by ``sendData`` in the View class.

```typescript
import { View } from "View";

export class FaqView extends View {

    public handle() {

        console.log(this.sendData);    // <= Output information for { id: 2 }
    }
}
```

You can specify a ``RouteMap`` instance instead of a URL.

```typescript
import { RMap } from "RouteMap";

Transition.next(RMap("faq"));    // <= Go to the FaqView screen
```

If you are using RouteMap routing, you can specify it as follows:  
First, you need to create an instance of RouteMap in ``MyApp.maps.faq``.

```typescript
import { MyApp } from "app/config/App";

Transition.next(MyApp.maps.faq);    // <= Go to the RouteMap information screen specified in MyApp.maps.faq
```

If the URL has dynamic values ​​specified in the RouteMap, specify the values ​​in the second argument.  
For example, if the following routing is specified in app/config/App.ts

```typescript
export class MyApp extends App {
    ...
    public static Maps = {
        ....
        anypage: RMap({url: "/any/{id1}/{id2}/{id3}", view: "anypage" })
        ....
    },
}
```

Specify the value to be assigned as an argument when transitioning between screens as follows:

```typescript
import { MyApp } from "app/config/App";

Transition.next(MyApp.maps.anypage, [ 1, 2, 3]);   // <= /any/1/2/3 to switch screens
```

If you want to set temporary data instead of a URL in RouteMap, specify it in the third argument.  
In this case, the second argument is specified as ``null``.

```typescript
import { MyApp } from "app/config/App";

Transition.next(MyApp.maps.other, null, { id: 2 });    // <= Go to the RouteMap information screen specified in MyApp.maps.other
```

### ## Screen transition with RouteMap specified (move)

To use RouteMap to transition between screens, use the ``move`` method.  
The usage is the same as using the ``next`` method.  
(However, you cannot specify a URL path.)

```typescript
import { MyApp } from "app/config/App";

Transition.move(MyApp.maps.faq);    // <= Go to the RouteMap information screen specified in MyApp.maps.faq
```

### ## Temporarily change screen (stack)

You can temporarily navigate to another screen using the ``stack`` method.  
(This is a wrapper function for ``View.stackOpen``) 

It looks similar to ``next`` and ``move``,   
but while ``next`` and others erase the previous screen before switching to the new one,  
``stack`` leaves the previous screen intact and brings the new screen to the foreground when switching between screens. 

Therefore, if you go back, the previous screen will remain as it is.  
(However, handlers such as ``handleLeave`` on the returned screen will not be executed at all.)

As an example, prepare a selection screen and display it temporarily.  
After selecting a value on the selection screen,   
some value can be returned, so you can receive it.

```typescript
// Temporarily display the selection screen
const res = await Transition.stack(maps.select);
console.log(res);
```

When receiving, you can specify the value to be passed as a return value by using the  
``handleLeaveStackClose`` event on the view side of the selection screen.  
For details, [see here](#view_stackopen)

### ## Return to previous screen (back)

To go back to the previous screen, use the ``back`` method.

```typescript
Transition.back();
```

The number of screens to go back can be specified by an argument.

```typescript
Transition.back(2); // <= Go back two
```

### ## Display another screen (replace)

To switch between different screens, use the ``replace`` method.  

It is similar to ``next`` and ``move``, but the big difference is that it can switch between different screens without leaving a history of screen transitions.  
Therefore, if you go back to the previous screen, you will be returned to the screen before the switch, so please be careful.

```typescript
Transition.replace("/other2");
```

You can specify a RouteMap instance instead of a URL.

```typescript
import { RMap } from "RouteMap";

Transition.replace(RMap("faq"));    // <= Go to the FaqView screen
```

If you are using RouteMap routing, you can specify it as follows:  
First, you need to create an instance of RouteMap in ``MyApp.maps.faq``.

```typescript
import { MyApp } from "app/config/App";

Transition.replace(MyApp.maps.faq);    // <= Go to the RouteMap information screen specified in MyApp.maps.faq
```

If the URL has dynamic values ​​specified in the RouteMap, specify the values ​​in the second argument.  
For example, if the following routing is specified in ``app/config/App.ts``.

```typescript
export class MyApp extends App {
    ...
    public static Maps = {
        ....
        anypage: RMap({url: "/any/{id1}/{id2}/{id3}", view: "anypage" })
        ....
    },
}
```

Specify the value to be assigned as an argument when transitioning between screens as follows:

```typescript
import { MyApp } from "app/config/App";

Transition.replace(MyApp.maps.anypage, [ 1, 2, 3 ]);   // <= /any/1/2/3 to switch screens
```

If you want to set temporary data instead of a URL in RouteMap, specify it in the third argument.  
In this case, the second argument is specified as ``null``

```typescript
import { MyApp } from "app/config/App";

Transition.replace(MyApp.maps.other, null, { id: 2 });    // <= Go to the RouteMap information screen specified in MyApp.maps.other
```

The screen behavior after switching (such as the life cycle of the View) is the same as when transitioning using ``next`` or ``move``.

### ## Delete screen history (historyClear)

To delete all screen transition history within an app, use the ``historyClear`` method.

```typescript
Transition.historyClear();
```

### ## Adding Screen History (historyAdd)

If you want to add an optional history of screen transitions within the app, use the ``historyAdd`` method.

```typescript
Transition.historyAdd("/");             // <= Add TOP page
Transition.historyAdd(MyApp.maps.faq);  // <= Added FAQ screen in RouteMap format
```

### ## Obtaining the transition state (isNext/isBack)

To get the screen transition status (back or forward) in a view, use ``isNext`` or ``isBack``.  
``isNext`` and ``isBack`` are opposites, so you can use either one.

For example, if you return from the previous screen, the following is the result:

```typescript
if (Transition.isBack) {
    // Processing when returning from the previous screen.....
}
```

If you proceed from the previous screen, the following will be determined:

```typescript
if (Transition.isNext) {
    // Processing when proceeding from the previous screen.....
}
```

### ## Lock screen transitions (lock)

By using ``lock``, you can temporarily disable a series of screen transitions,   
such as transitions using ``next``, ``move``, ``replace``,   
or returning to the previous screen using ``back``.

Used to disable screen transitions when a dialog is displayed.

```typescript
// Lock screen transitions
Transition.lock = true;
```

```typescript
// Unlocking screen transitions
Transition.lock = false;
```

Be sure to unlock the app at the end, otherwise it will stop working.

### ## Displaying the UI (bindUI)

The ``bindUI`` method allows you to bind and display a UI to a specified virtual DOM element.  
This method is a wrapper function for ``UI.bind``.  
[Learn more about ``UI.bind``](#ui_bind)

As shown in the code below,   
by specifying the virtual DOM and UI name to be bound to,   
the HTML content of the UI will be placed and displayed in the tag of the virtual DOM to be bound to.

The return value is an instance of ``UI``,  
or if a class with the specified UI name exists,   
an instance of that class (``ItemUI`` in the example below) is returned.

```typescript
const itemUI = Transition.bindUI(this.vdos.item, "item");
```

It is also possible to specify temporary data for the bound UI as shown below.    
For how to extract the data, please refer to [About UI Class](#ui)

```typescript
const itemUI = Transition.bindUI(this.vdos.item, "item", { id: 3 });
```

### ## Addition of UI (appendUI)

The ``appendUI`` method allows you to append a UI to a specified virtual DOM element.  
* This method is a wrapper function for ``UI.append``.    
[Learn more about ``UI.append``](#ui_append)

As shown in the code below, by specifying the destination virtual DOM and UI name as arguments,   
the HTML content of the UI will be added to the tag of the destination virtual DOM.

The return value is an instance of ``UI``,  
or if a class with the specified UI name exists,   
an instance of that class (``ListItemUI`` in the example below) is returned.

```typescript
const listeItemUI = Transition.appendUI(this.vdos.list, "listItem");
```

It is also possible to specify temporary data for the destination UI as shown below.    
For how to extract the data, please refer to [About UI Class](#ui)

```typescript
const listeItemUI = Transition.appendUI(this.vdos.list, "listItem", { id: 3 });
```

<div id="virtualdom"></div>

## # VirtualDom Class

The ``VirtualDom`` class is a class for operating the virtual Dom,   
which is necessary to set the text display of the HTML content part and the event operation when a button is pressed.

### ## Setting up and operating a Virtual Dom

First, in the HTML part such as ``View`` or ``UI``,   
you need to place the tag to be applied as a virtual DOM and specify the attribute name.  

Attribute names can be specified in any tag with ``v={attribute name}``.

For example,   
set up a HomeView and set a tag to display the title on the rendering HTML side as shown below.

```html
<div v="title"></div>
```

In the HomeView class,  
you can specify the title text via the member variable ``vdos`` with the following code.

```typescript
import { View } from "View";

export class HomeView extends View {

    public handle() {

        // Show title
        this.vdos.title.text = "Title Sample";
    }
}
```

In addition, when a tag with the v attribute is loaded once on the screen,   
the attribute itself is deleted and the tag is virtualized.

If you want to perform DOM operations on the entire screen in a view or on the entire element in a UI,   
use the member variable ``vdo``.

For example,   
if you specify the following in View,   
the entire screen will be displayed with a black background.

```typescript
this.vdo.style({ background: "black" });
```

The v attribute can also specify multiple tags with the same attribute name.

```html
<div v="test1"></div>
<div v="test1"></div>
<div v="test1"></div>
<div v="test1"></div>
```

The following code will display the same text for all tags that have ``test1`` defined.

```typescript
this.vdos.test1.text = "Test1 Sample...";
```

### ## Chaining DOM Manipulation

The v attribute can be used to perform chain operations using the ``.`` separator.

For example,   
you can add tags to your HTML like this:

```html
<div v="chain.a"></div>
<div v="chain.b"></div>
<div v="chain.c"></div>
```

To display text for the v attribute ``chain``,   
write the following code:

```typescript
this.vdos.chain.text = "Chain Test";
```

Then, the following will be displayed in the browser:

```
Chain Test
Chain Test
Chain Test
```

If you want to change the text only for tags chained with ``a`` in the ``v`` attribute,  
use ``childs`` as shown in the code below.

```typescript
this.vdos.chain.childs.a.text = "Chain A Text";
```

Then, the following will be displayed in the browser:

```
Chain A Text
Chain Test
Chain Test
```

Chaining allows you to manipulate elements by categorization.

### ## Parent element operations

To get the parent element, use ``parent``.  
Parent elements can be obtained and operated without specifying the v attribute.

```typescript
this.vdos.test.parent.text = "Parent Text";
```

### ## Multi-element operations

The ``VirtualDom`` class provides methods (setter/getter) to operate on multiple elements in one virtual DOM.

#### ### Get the number of target elements

The number of target elements is obtained with ``length``.

```typescript
console.log(this.vdos.test.length);
```

#### ### Specify the first element

The first element is obtained with ``first``.

```typescript
this.vdos.test.first.text = "Test Sample (First)";
```

#### ### Specify the last element

The last element is obtained with ``last``.

```typescript
this.vdos.test.last.text = "Test Sample (Last)";
```

#### ### Specify the nth element

The nth element can be obtained by specifying the index number as an argument using the ``index`` method.

```typescript
this.vdos.test.index(2).text = "Test Sample (2)";
```

#### ### Specify the previous element

To get the adjacent element before an element, use ``prev``.  
If the virtual DOM itself has multiple elements,   
it gets the adjacent element before the first element.

```typescript
this.vdos.test.prev.text = "Prev Text";
```

#### ### Specify the following element:

To get the next adjacent element of an element, use ``next``.  
If the virtual DOM itself has multiple elements,   
it gets the next adjacent element from the first element.

```typescript
this.vdos.test.next.text = "Next Text";
```

### ## Search within an element (querySelector)

Using the ``querySelector`` method,  
you can retrieve elements that match a selector or selectors specified within an element in the ``VirtualDOM`` object.  
(``querySelector`` is used when searching by selectors such as class attributes or ID attributes.)

For example, prepare the following HTML in View etc.

```html
<div v="area">
    <div class="name">Name</div>
    <div class="description">description</div>
</div>
```

If you want to get the description for the tag with the v attribute ``area``,  
use ``querySelector`` and write it as follows.

```typescript
console.log(this.vdos.area.querySelector(".description").text);
```

### ## Creating a new virtual DOM (VirtualDom.create)

Using the ``VirtualDom.create`` method,  
a virtual DOM (``VirtualDom`` class object) can be created without applying the v attribute to HTML content.

Below is an example of this:   
Specify the content as an argument.

```typescript
const newDOm = VirtualDom.create("new Dom Text...");
newDom.style({ color: "orange" });
this.vdos.target.html = newDom;
```

The second argument can be any DOM tag name.  
(If not specified, it will default to the ``div`` tag.)

```typescript
const newDOm = VirtualDom.create("new Dom Text...", "h1");
newDom.style({ color: "orange" });
this.vdos.target.html = newDom;
```

### ## Get/specify text (text)

Use ``text``(setter/getter) to set and get text.  

To set the text, use the following code:

```typescript
this.vdos.sample.text = "Sample Text....";
```

To get the displayed text, use the following code:

```typescript
const sampleText = this.vdos.sample.text;
console.log(sampletext);
```

### ## Get/Set HTML Tags (html)

Use ``html`` (setter/getter) to set and retrieve HTML tag content (innerHTML).  
To set HTML tags, use the following code:

```typescript
this.vdos.sample.html = "<h1>Sample Text....</h1>";
```

You can also create a new virtual DOM object and specify it.

```typescript
const newDOm = VirtualDom.create("new Dom Text...");
this.vdos.target.html = newDom;
```

To get the HTML tag,   
use the following code:  

```typescript
const sampleHtml = this.vdos.sample.html;
console.log(sampleHtml);
```

### ## Adding content (append)

To append HTML content to a string or a virtual DOM object, use the append method:  
``append`` adds to the end of the tag element.

To specify a string (HTML text), use the following:

```typescript
const addHtml = "<H1>add Html Content...</h1>";
this.vdos.list.append(addHtml);
```

You can also create a new virtual DOM object and specify it.

```typescript
const newDom = VirtualDom.create("New VDom Text ....");
this.vdos.list.append(newDom);
```

### ## Add to the beginning of the content (afterBegin)

To append HTML content to the beginning of a string or virtual DOM object, use the afterBegin method:  
``append`` appends downwards to the bottom of the tag, whereas ``afterBegin`` appends upwards to the top of the tag.

To specify a string (HTML text), use the following:

```typescript
const addHtml = "<H1>add Html Content...</h1>";
this.vdos.list.afterBegin(addHtml);
```

You can also create a new virtual DOM object and specify it.

```typescript
const newDom = VirtualDom.create("New VDom Text ....");
this.vdos.list.afterBegin(newDom);
```

### ## Get/set css (style sheet) (style)

To get or set stylesheet (css) values, use the ``style`` method.

The css settings are written in the following code.

```typescript
this.vdos.sample.style({ background: "black" });
```

You can also set the style sheet properties all at once like this:

```typescript
this.vdos.sample.style({
    background: "black",
    color: "white",
    "font-size": "15px",    
});
```

### ## Get the setting value of css (style sheet) (getStyle)

The style sheet settings are obtained with ``getStyle``.

```typescript
const bgColor = this.vdos.sample.getStyle("background");
console.log(bgColor);
```

### ## Get/Set Attributes (attr)

Use ``attr`` to specify or retrieve attribute values ​​for an element tag.

To specify an attribute value, use the following:

```typescript
this.vdos.sample.attr("name", "sample");
```

The name attribute is added as follows:

```html
<div name="sample"></div>
```

To get the attribute value:

```typescript
const name = this.vdos.sample.attr("name");
cosnole.log(name);
```

### ## Deleting an attribute (removeAttr)

If you want to remove attribute information, use ``removeAttr``.

```typescript
this.vdos.sample.removeAttr("name");
```

### ## Easy retrieval/setting of attribute values

Among the attribute values, the most frequently used attribute information can be easily obtained/set using the following.

#### ### Get/set src

Use ``src`` to get and set the src attribute used for image paths, etc.

To get the src attribute value:

```typescript
const src = this.vdos.image.src;
console.log(src);
```

To set the src attribute value, use the following:

```typescript
this.vdos.image.src = "img/sample.png";
```

#### ### Get/set placeHolder

Use ``placeholder`` to get and set the placeholder attribute

To get the placeholder attribute value, use the following:

```typescript
const placeholder = this.vdos.image.placeholder;
console.log(placeholder);
```

To set the placeholder attribute value, use the following:

```typescript
this.vdos.image.placeholder = "Placeholder Sample....";
```

#### ### Get/set href

Use ``href`` to get and set the href attribute used in link tags, etc.

To get the href attribute value, use the following:

```typescript
const href = this.vdos.link.href;
console.log(href);
```

To set the href attribute value, use the following:

```typescript
this.vdos.link.href = "linkurl";
```

#### ### Get/set name

Use ``name`` to get and set the name attribute.

To get the name attribute value, use the following:

```typescript
const name = this.vdos.input.name;
console.log(name);
```

To set the input attribute value, use the following:

```typescript
this.vdos.input.name = "yourname";
```

#### ### Get/set id

Use ``id`` to get and set the id attribute.

To get the id attribute value, use the following:

```typescript
const id = this.vdos.sample.id;
console.log(id);
```

To set the id attribute value, use the following:

```typescript
this.vdos.sample.id = "sample";
```

### ## Adding a class attribute (addClass)

If you want to add a specific class attribute, use ``addClass``.

```typescript
this.vdos.sample.addClass("open");
```

### ## Removing a class attribute (removeClass)

If you want to remove a specific class attribute, use ``removeClass``.

```typescript
this.vdos.sample.removeClass("open");
```

### ## Getting/setting temporary data (data)

To get or set temporary data on a VirtualDom, use the ``data`` method:  
The value set by this ``data`` method is confidential because it is information that is not included in the actual HTML tag.

In addition, the data types that can be set include strings, objects other than numbers, etc.

The temporary data settings are as follows:  
The arguments are the data name and the setting value, in that order.

```typescript
this.vdos.button.data("id", 23);
```

You can retrieve data by specifying only the data name as an argument.

```typescript
const id = this.vdos.button.data("id");
console.log(id);
```

### ## Delete temporary data (removeData)

To remove temporary data, use ``removeData``.  
Specify only the data name as an argument

```typescript
this.vdos.button.removeData("id");
```

### ## Setting the Event Handler (on)

To set an event handler, use the ``on`` method:  

Specify the event name and the callback function for the event as arguments as shown below.

```typescript
this.vdos.button.on("click", () => {
    console.log("button click event");
});
```

In terms of specifications, it is similar to the native JavaScript ``addEventlistner``,   
but there are some differences in the arguments to the callback function.

The first argument is the target information, just like ``addEventlistner``, 
but the second argument is the virtual DOM object that executed the event.

```typescript
this.vdos.button.on("click", (e, my) => {
    console.log(e);
    console.log(my);    // <= VirtualDom Class Object
});
```

By using the second argument,  
you can set any data to the button as shown below,   
and retrieve the set data when you press it.

```typescript
this.vdos.button
    .data("data", { id: 23 })       // <= Set the data to be passed
    .on("click", (e, my) => {

        // Get Data
        const data = my.data("data");

        console.log(data);          // <= Outputs { id: 23 }
    })
;
```

Among the events in the ``on`` method,   
the simple set method that can be written is listed below.

#### ### When an element is pressed (onClick)

Set an event handler for when an element is clicked or tapped.  

```typescript
this.vdos.button.onClick = () => {
    console.log("button click event");
};
```

#### ### When you double-click an element (onDblClick)

Set an event handler for double-clicking an element.

```typescript
this.vdos.button.onDblClick = () => {
    console.log("button DoubleClick event");
};
```

#### ### When an element is changed (onChange)

Set an event handler when an element (input value or selected value) is changed.

```typescript
this.vdos.button.onChange = () => {
    console.log("button Change event");
};
```

#### ### When the focus of an element changes (onFocus)

Set an event handler for when focus changes to an element.

```typescript
this.vdos.button.onFocus = () => {
    console.log("button Focus event");
};
```

#### ### When the mouse click begins (onMouseDown)

Sets an event handler for when the mouse button is pressed within an element.

```typescript
this.vdos.button.onMouseDown = () => {
    console.log("button Mouse Down event");
};
```

#### ### When the mouse click ends (onMouseUp)

Sets an event handler for when the mouse button is released within an element.

```typescript
this.vdos.button.onMouseUp = () => {
    console.log("button Mouse Up event");
};
```

#### ### When the mouse cursor moves (onMouseMove)

Set an event handler for when the mouse cursor moves within an element.

```typescript
this.vdos.button.onMouseMove = () => {
    console.log("button Mouse Move event");
};
```

### ## Event Execution (dispatch)

To execute an event arbitrarily, use the ``dispatch`` method.

Specify the name of the event to be implemented as an argument.

```typescript
this.vdos.button.dispatch("click");
```

### ## Get/Set Input Value (value)

If the element is an input field or a pull-down menu,   
use ``value`` (setter/getter) to get and set the value.

As an example, prepare the following input field on the HTML side.

```html
<input type="text" v="name">
```

The input value can be obtained as follows:

```typescript
const name = this.vdos.name.value;
```

To set the input value, use the following:

```typescript
this.vdos.name.value = "input area..";
```

#### ## Get/Set Checkbox Selection Value

In the case of checkboxes, the get/set type is an array value.  
For example, if you specify a check box in HTML as follows:

```html
<label><input type="checkbox" v="checkbox" value="0">0</label>
<label><input type="checkbox" v="checkbox" value="1">1</label>
<label><input type="checkbox" v="checkbox" value="2">2</label>
<label><input type="checkbox" v="checkbox" value="3">3</label>
```

You can get the selection state with the following code:

```typescript
console.log(this.vdos.checkbox.value);
```

However, the retrieved value is not a string,  
but the selected checkbox values ​​are returned as an array value, as shown below.

```
[ 0, 2 ]
```

When setting, specify the value as an array.

```typescript
this.vdos.checkbox.value = [ 1, 2 ];
```

#### ### Get file selection

If the input field is a file selection, the data is returned as a buffer.

```html
<input type="file" v="file">
```

After selecting a file from the file selection field above,   
retrieve it with the following code

```typescript
console.log(this.vdos.file.value);
```

The retrieved data is in the form of the VirtualDomFile interface,   
which is an extension of the FILE interface.  
[For details about the File interface, see the official MDN page.](https://developer.mozilla.org/ja/docs/Web/API/File)

``result`` contains the file data converted to base64,  
so use this when handling file data.

The results are as follows:  

```
{
    name: "file.jpg",
    lastModified : "2025-0101 T 00:00:00",
    lastModifiedDate : "2025-0101 T 00:00:00",
    result: "***************************...",
    ...
}
```

### ## Get/change checkbox selection state (checked)

You can use ``checked`` to get and change the selection state of a single checkbox.

To get the selection status of a checkbox:   
The boolean type is returned. If the item is selected,  
 ``true`` is returned. If the item is not selected, ``false`` is returned.

```typescript
console.log(this.vdos.checkbox.checked);
```

To change the selection state of a check box, use the following:   
Can be forced to ``true`` or ``false``

```typescript
this.vdos.checkbox.checked = true;
```

### ## Adding options to the drop-down menu (selectAddParam)

Use ``selectAddParam`` if the element is a drop-down menu and you want to add options to it.

Specify the object as follows:

```typescript
this.vdos.select.selectAddParam({
    0: "Option A",
    1: "Option B",
    2: "Option C",
    3: "Option D",
});
```

In reality, it is set as follows:

```html
<select>
    <option value="0">Option A</option>
    <option value="1">Option B</option>
    <option value="2">Option C</option>
    <option value="3">Option D</option>
</select>
```

If you specify nesting as shown below, it will be placed in ``optgroup``.

```typescript
this.vdos.select.selectAddParam({
    0: "Option A",
    1: "Option B",
    2: "Option C",
    3: "Option D",
    "Option E and onwards": {
        4: "Option E",
        5: "Option F",
        6: "Option G",
    },
});
```

In the above case, it will be set as follows:

```html
<select>
    <option value="0">Option A</option>
    <option value="1">Option B</option>
    <option value="2">Option C</option>
    <option value="3">Option D</option>
    <optgroup label="Option E and onwards">
        <option value="4">Option E</option>
        <option value="5">Option F</option>
        <option value="6">Option G</option>
    </optgroup>
</select>
```

### ## Display when no pull-down menu is selected (selectEmpty)

Use ``selectEmpty`` to display when an element is not selected in a pull-down menu.

```typescript
this.vdos.select.selectEmpty("------");
```

In reality, it is set as follows:

```html
<select>
    <option>------</option>
</select>
```

### ## Clear the selection in the drop-down menu (selectResetParam)

Use ``selectResetParam`` if the element is a dropdown menu and you want to clear all options.

```typescript
this.vdos.select.selectResetParam();
```

### ## Get the display text of the options in the pull-down menu (selectedText)

To get the text that an element displays in addition to the selected value in a drop-down menu, use ``selectedText``.

```typescript
console.log(this.vdos.select.selectedText);
```

### ## Switching between displaying and hiding on the screen (display)

Use ``display`` to easily show or hide elements.

If you want to display it, specify ``true`` as shown below.

```typescript
this.vdos.button.display = true;
```

If you want to hide it, set it to ``false`` as shown below.

```typescript
this.vdos.button.display = false;
```

### ## Enable/disable elements (disable)

To enable or disable an element (such as an input field), use ``disable``.

To disable it, specify ``true`` as shown below.

```typescript
this.vdos.button.disable = true;
```

To enable it again, set it to false as shown below.

```typescript
this.vdos.button.disable = false;
```

<div id="render"></div>

## # Render Class

The Render class is the base class for drawing.  
This class is not used directly,   
but is used as the base class for functions such as ``View``, ``UI``, ``Template``, ``Dialog``, etc.

<div id="lib"></div>

## # Lib class

The ``Lib`` class is a class that compiles commonly available functions into class methods.  
To use it, you need to import the module with the following import.  

```typescript
import { Lib } from "Lib";
```

### ## Check if resource file exists

To check if a resource file exists, use the ``existResource`` method:  
The resource files that can be specified here are those placed in the src/resource directory.

Specify the path of the target resource file as an argument.  
The return value is a boolean, 
if it exists it will return true, if it doesn't it will return false.

```typescript
const exists = Lib.existResource("img/sampleA.jpg");
console.log(exists);
```

### ## Getting resource files

To get a resource file, use the ``getResource`` method:  
The resource files that can be specified here are those placed in the ``src/resource`` directory.

Specify the path of the target resource file as an argument.  

Please note that the return value will change depending on the format of the specified file.  
For example, images are returned as binary,   
while text such as css and html are returned as strings.

```typescript
const data = Lib.getResource("css/sample.css");
console.log(data);
```

### ## Get DataURL of resource file

To get the resource file as a DataURL, use the ``getResourceDataUrl`` method:  
The resource files that can be specified here are those placed in the ``src/resource`` directory.

Specify the path of the target resource file as an argument.  

The return value is a string (dataURL format).

```typescript
const dataUrl = Lib.getResourceDataUrl("img/sample.jpg");
console.log(dataUrl);
```

Because it is in data URL format,   
it can be used to display images in img tags or add separate CSS.

### ## Get MimeType of resource file

To get the mimeType of a resource file, use the ``getResourceMimeType`` method:  
The resource files that can be specified here are those placed in the ``src/resource`` directory.

Specify the path of the target resource file as an argument.  

The return value is a string (MimeType).

```typescript
const mime = Lib.getResourceMimeType("img/sample.jpg");
console.log(mime);
```

### ## Decoding from base64 format (base64Decode)

To decode base64 data, use the ``base64Decode`` method:  
Specify base64 format data as an argument.

The returned value is the result decoded from base64 format.

```typescript
const content = Lib.base64Decode("YWJjZGVmZw==");
console.log(content);   // Output abcdefg
```

### ## Encode to base64 format (base64Encode)

To convert data to base64 format, use the ``base64Encode`` method.  
Specify the data to be converted as an argument.

The returned value is the result encoded in base64 format.

```typescript
const content = Lib.base64Decode("abcdefg");
console.log(content);   // Outputs YWJjZGVmZw==
```

### ## Creating a unique identifier (uniqId)

Unique identifiers can be easily created using the ``uniqID`` method:  
The created identifier will be a random string consisting of alphanumeric characters (including uppercase and lowercase letters).

```typescript
const id = Lib.uniqId();
console.log(id);
```

If no argument is specified, a string of 64 characters will be created,  
but the length can be changed by specifying the length of the string to be created as an argument.

```typescript
// Create a 128 character identifier
const id = Lib.uniqId(128);
console.log(id);
```

### ## Retrieving Object Data by Value (passByValue)

In TypeScript (JavaScript), if you duplicate the object data itself,   
it is passed by reference,   
so if you want to create a copy of the data by passing it by value instead of passing it by reference, use the ``passByValue`` method.

It is mainly used when separating data into main and temporary (buffer) data within an app,   
and when you want to make it so that even if some of the temporary data changes,   
it does not affect the main data.

```typescript
const origin = {
    name: "your name",
    age: 39,
    language: "Japan",
};
// Copy by value to variable copy
const copy = Lib.passByValue(origin);
copy.name = "change name";
console.log({ origin, copy });      // <= The origin name is printed unchanged.
```

### ## Stop at a specified time (sleep)

To sleep for a certain period of time, use the ``sleep`` method.  

This method supports ``async/await``, so if you want to use it, 
it must be in a function that has already been asynced, 
as shown below, and you must execute it with await.

```typescript
(async () => {

    console.log("Sleep...");

    // Wait just 1 second
    await Lib.sleep(1000);

    console.log("...OK");
})();
```

### ## Loading external JS scripts (importResourceScript)

If some JavaScript source exists as a resource file (in the ``src/resources`` directory),  
it cannot be used as is in the TypeScript source.

Therefore, to use it,   
you need to import it using the ``importResourceScript`` method.

```typescript
const sample = Lib.importResourceScript("js/sample.js");
console.log(sample);
```

### ## Getting the date and time (datetime)

``datetime`` is provided as a method for obtaining the date and time.  
The return value of ``datetime`` alone is a dedicated class object (``MDateTime``).

If no argument is given, the current time is obtained.

```typescript
const dt = Lib.dateTime();
```

You can specify the date and time as an argument as follows:

```typescript
const dt = Lib.dateTime("1999/07/01 22:00:22");
```

The returned value is the ``MDateime`` class, which is derived from the standard JavaScript ``Date`` class,   
so you can use ``Date`` class methods such as ``getFullYear``.  
[For details on dates, see here](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)

```typescript
console.log(Lib.dateTime().getFullYear());
```

Below is an explanation of the methods provided specifically for the ``MDateTime`` class.

#### ### Getting the date and time in a format

To display a date and time with a specified format, use the ``format`` method.  
The date and time information is replaced with each assigned character such as ``YYYY`` or ``MM``.

```typescript
console.log(Lib.dateTime().format("YYYY/MM/DD HH:II:SS"));　// Output the current date and time
```

The assigned letters and their contents are as follows:

|||
|:--|:--|
|YYYY|Display the year (4 digits)|
|MM|Display the month (4 digits)|
|M|Display the month|
|DD|Display the day (2 digits)|
|D|Display the day|
|HH|Display the hour (2 digits)|
|H|Display the hour|
|II|Display the minute (2 digits)|
|I|Display the minute|
|SS|Display seconds (2 digits)|
|S|Display seconds|
|W|Show day of the week|
|LDD|Last day of the month<br>(Displayed with 2 digits padded with zeros)|
|LD|Last day of the month|
|LW|Last day of the week|
|U|Show elapsed time in milliseconds|

#### ### Get the last day of the month (getLastDate)

Use the ``getLastDate`` method to get the last day of a specified month.

```typescript
console.log(Lib.dateTime().getLastDate());
```

#### ### Get the last day of the month (getLastDay)

Use the ``getLastDay`` method to get the day of the week that is the last day of a specified month and year.

```typescript
console.log(Lib.dateTime().getLastDay());
```

#### ### Get tomorrow's information (nextDate)

Use the ``nextDate`` method to get tomorrow's information.   
The return value is an ``MDateTime`` class object.

In the following case, tomorrow's date will be obtained.

```typescript
console.log(Lib.dateTime().nextDate().format("YYYY/MM/DD"));
```

#### ### Get the previous day's information (prevDate)

Use the ``prevDate`` method to get information about the previous day.   
The return value is an ``MDateTime`` class object.

In the following cases, the previous day's date will be obtained.

```typescript
console.log(Lib.dateTime().prevDate().format("YYYY/MM/DD"));
```

#### ### Get next month's information (nextMonth)

Use the ``nextMonth`` method to get information about the next month.  
The return value is an ``MDateTime`` class object.

In the following cases, the next month's year and month will be obtained.

```typescript
console.log(Lib.dateTime().nextMonth().format("YYYY/MM"));
```

#### ### Get previous month's information (prevMonth)

Use the ``prevMonth`` method to get information about the previous month.  
The return value is an ``MDateTime`` class object.

In the following cases, the previous month will be obtained.

```typescript
console.log(Lib.dateTime().prevMonth().format("YYYY/MM"));
```

<div id="view"></div>

## # View Class

``View`` is a base class for performing operations and processes related to screen display.  
Create a ``View`` derived class for each screen,   
and add events and processing for when buttons are pressed or other operations are performed here.

When using View, the screen transition history is basically retained.  
(However, this does not include cases such as when switching with ``Transition.replace``.)

### ## Placement of View class file

As an example, the following shows how to set up the ``HomeView`` class.  
Create a ts file in the path ``src/app/view/HomeView.ts`` and write the code.  

The prerequisite is that the file name (excluding the extension (.ts)) and the class name must match, and that it inherits from the ``View`` class.

```typescript
import { View } from "View";

export class HomeView extends VIew {}
```

### ## Setting HTML content

There are two main ways to set up HTML content that includes HTML tags:
- Place HTML content directly in the View-derived class
- Install a dedicated rendering HTML file

#### ### Place HTML content directly in the View-derived class

Putting HTML content directly into the ``HomeView`` class.  
Write the HTML tags to be displayed in the member variable ``html``

```typescript
import { View } from "View";

export class HomeView extends VIew {

    // Specify HTML content
    public html = `<div>Hallo World!</div>`;
}
```

This is the simplest method, but it has the following problems,  
so we recommend that you install a separate HTML file for rendering.

- In normal editors, HTML statements are not highlighted,   
so you cannot use the completion function for HTML tags themselves.
- HTML tags may become bloated, which may reduce the readability of the TypeScript code itself.
- It is not possible to switch between multiple screen display patterns.   
(This is possible if you install the following HTML file separately.)

#### ### Setting the rendering HTML file (Recommendation)

How to separate HTML content into separate files.  
Considering the complexity of the code, this is recommended.

First, create a ``home.html`` file with the following directory structure:

```
src
  |- app
      |- view
           |- HomeView.ts
  |- rendering
      |- view
           |- home.html
```

Write HTML in ``home.html``.

```html
<div>Hallo World!</div>
```

The target rendering HTML file is the View name (starting in lowercase and omitting ``View``) by default,  
but it is also possible to prepare multiple HTML files and separate the display for each case.  
For more information, [see Changing the Rendered HTML.](#view_view)

If you have already specified the member variable ``html`` in each View class,   
the HTML information of the ``html`` variable will be displayed first.

### ## Main life cycle

The ``View`` class provides many handlers that are executed when the screen is displayed,   
and their life cycles are shown in the table below.

```
{ Routing to the specified view is confirmed. }
        |
View.handleBefore 
        |
View.handleAfter
        |
{ Screen switching by rendering execution }
        |
        |
        |  A template was specified/changed
        |--------------------------- View.handleTemplateChanged
        |
        |
        |  head was specified/changed
        |--------------------------- View.handleHeadChanged
        |
        |
        |  Header was specified/changed
        |--------------------------- View.handleHeaderChanged
        |
        |
        |  footer was specified/changed
        |--------------------------- View.handleFooterChanged
        |
        |
View.handleRenderBefore
        |
View.handle
        |
        |  Proceed from the previous screen
        |--------------------------- View.handleNext
        |
        | 
        |  Returned from the previous screen
        |--------------------------- View.handleBack
        |
        |
View.handleRenderAfter
        |
     ........
        |
{ Move to another View is confirmed }
        |
View.handleLeave
        |
        |
        |  Proceed from the previous screen
        |--------------------------- View.handleLeaveNext
        |
        |
        |  Returned from the previous screen
        |--------------------------- View.handleLeaveBack
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    |
    |  Use Transition.stack or stackOpen to return to 
    |  the previous screen after a temporary display
    |
    |------------------------------- view.handleLeaveStackClose

```

<div id="view_handle"></div>

#### ### The handle method

``handle`` is the handler that is executed after the screen is displayed.  
Basically, various operations and processing are described inside this.

```typescript
import { View } from "View";

export class HomeView extends VIew {

    public handle() {

        console.log("Hallo World!");
    }
}
```

``handle`` can obtain dynamic values ​​from URLs, etc. as arguments.

For example, if you specify the URL as ``/sample/{id}`` in the routing,  
you can get the dynamic value from the URL as the variable id as follows:

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle(id : number) {

        console.log("Hallow No = " + id);
    }
}
```

#### ### The handleNext method

``handleNext`` is a handler that is executed only when you move on from the previous screen using ``Transition.next`` etc.  
Executed after ``handle`` method.

```typescript
import { View } from "View";

export class HomeView extends VIew {

    public handle() {

        console.log("Hallo World!");
    }
    
    public handleNext() {

        console.log("handle Next ... OK!");
    }
}
```

``handleNext`` can get dynamic values ​​from URLs, etc. as arguments.

For example, if you specify the URL as ``/sample/{id}`` in the routing,  
you can get the dynamic value from the URL as the variable id as follows:

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {

        console.log("Hallo World!");
    }
    
    public handleNext(id : number) {

        console.log("handle Next No = " + id);
    }
}
```

#### ### The handleBack method

``handleBack`` is a handler that is executed only when you return to the previous screen using ``Transition.back`` etc.  
Executed after ``handle`` method.

```typescript
import { View } from "View";

export class HomeView extends VIew {

    public handle() {

        console.log("Hallo World!");
    }
    
    public handleBack() {

        console.log("handle back ... OK!");
    }
}
```

``handleBack`` can get dynamic values ​​from the URL etc. as arguments.

For example, if you specify the URL as ``/sample/{id}`` in the routing,   
you can get the dynamic value from the URL as the variable id as follows:

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {

        console.log("Hallo World!");
    }
    
    public handleBack(id : number) {

        console.log("handle back No = " + id);
    }
}
```

#### ### handleBefore/handleAfter Methods

``handleBefore`` and ``handleAfter`` are handlers that run before the screen is displayed.  
Mainly used for preparing variable data before displaying on the screen.  
Since this is executed before the screen is displayed,   
it is not possible to control events such as when a button is pressed.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    private keep = "keep data";

    public handleBefore() {
        // Initialize the variable keep to null.
        this.keep = null;
    }

    public handle() {

        console.log(this.keep);     // null is output.
    }
}
```

#### ### The handleRenderBefore method

The ``handleRenderBefore`` method is an event that is executed after the screen is displayed by rendering and before ``handle`` method.  
Mainly used when sharing among multiple views.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handleRenderBefore() {
        console.log("handle render before .... ok");
    }

    public handle() {
        console.log("Hallo World!");
    }
}
```

#### ### The handleRenderBAfter method

The ``handleRenderBefore`` method is an event that is executed after the screen is displayed by rendering.  
Mainly used when sharing among multiple views.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {
        console.log("Hallo World!");
    }

    public handleRenderAfter() {
        console.log("handle render after .... ok");
    }
}
```

#### ### The handleLeave method

The ``handleLeave`` method executes an event when you leave the current screen.
 
If you need to stop a process that is running at regular intervals only within the view,   
use this to stop it.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    private tick;

    public handle() {

        // Carried out at regular intervals....
        this.tick = setInterval(()=>{
            console.log("tick....");
        }, 1000);
    }

    public handleLeave() {
        // Stopping implementation at fixed time intervals
        clearInterval(this.tick);
    }
}
```

#### ### The handleLeaveNext method

The ``handleleavenext`` method is an event that is executed when you leave the current screen by proceeding to the next screen using ``Transition.next`` etc.  
Executed after ``handleLeave`` method.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {
        console.log("Hallo World!");
    }

    public handleLeaveNext() {
        console.log("handle Leave next .... ok");
    }
}
```

#### ### The handleLeaveBack method

The ``handleaveback`` method is an event that is executed when you leave the current screen and return to the previous screen using ``Transition.back`` etc.  
Executed after ``handleLeave`` method.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {
        console.log("Hallo World!");
    }

    public handleLeaveBack() {
        console.log("handle Leave back .... ok");
    }
}
```

#### ### The handleLeaveStackClose method

The ``handleavestackclose`` method is an event that is executed when a view is temporarily displayed using the ``Transition.stack`` or ``stackOpen`` method and then returns to the original screen.  
Since it is a temporary display (displayed in front while the previous screen remains in the background),  
you can use the return value to pass the value when returning to the original screen.

For more information on temporary display using the ``stackOpen`` method, [see here.](#view_stackopen)

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {
        console.log("Hallo World!");
    }

    public handleLeaveStackClose() {
        // Return value 21 on previous screen
        return 21;
    }
}
```

#### ### The handleTemplateChanged method

The ``handleTemplateChanged`` method is an event that is executed when the ``template`` variable is set or changed.  
For details about the function using the template variable, [see Template Settings.](#view_template)

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public template = "default";

    public handle() {
        console.log("Hallo World!");
    }

    public handleTemplateChanged() {
        console.log("handle template changed .... ok");
    }
}
```

#### ### The handleHeadChanged method

The ``handleHeadChanged`` method is an event that is executed when the head variable is set or changed.  
For details on the function using the head variable, [see About setting head](#view_head).

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public template = "default";

    public handle() {
        console.log("Hallo World!");
    }

    public handleHeadChanged() {
        console.log("handle head changed .... ok");
    }
}
```

#### ### The handleHeaderChanged method

The ``handleHeaderChanged`` method is an event that is executed when the header variable is set or changed.  
For details on the function using the variable header, [see About header settings](#view_header).

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public template = "default";

    public handle() {
        console.log("Hallo World!");
    }

    public handleHeaderChanged() {
        console.log("handle header changed .... ok");
    }
}
```

#### ### The handleFooterChanged method

The ``handleFooterChanged`` method is an event that is executed when the footer variable is set or changed.  
For details on the function using the variable footer, [see About setting footer](#view_footer).

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public template = "default";

    public handle() {
        console.log("Hallo World!");
    }

    public handleHeaderChanged() {
        console.log("handle header changed .... ok");
    }
}
```

### ## Manipulating the Virtual DOM

The virtual Doms that can be specified in a View are broadly divided into the following:
- ``vdo`` : Whole-screen elements (``VirtualDom``)
- ``vdos`` : v attribute element on screen (``VirtualDomLIst``)

Use ``vdo`` to operate Dom on the entire screen.  
For example, the following code will be displayed with a black background:

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {

        this.vdo.style({ background: "black" });
    }
}
```

``vdos`` allows you to manipulate the v attribute on the screen as a virtual DOM.

As an example, prepare the following tag in the rendering HTML.

```html
<div v="title"></div>
```

In the ``handle`` method of the ``SampleView`` class,   
write the code below to set the text for the above title tag.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public handle() {

        this.vdos.title.text = "Title Text ...";
    }
}
```

This allows Dom operations for each tag.  
For information on how to operate in a virtual Dom, [see here](#virtualdom).

<div id="view_template"></div>

### ## Template settings

If the member variable ``template`` is specified, the specified template will be used.  
For more information about templates, [see here](#template).

For example, define the member variable ``template`` on the View side as shown below.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public template = "default";
}
```

Place the ``src/rendering/template/default.html`` file and add the following HTML:  
Place the ``main`` tag to display the HTML content of each screen.

```html
<header>Header Area...</header>
<main></main>
<footer>Footer Area...</footer>
```

This will display the screen based on the specified template.

<div id="view_head"></div>

### ## Head settings

By specifying the member variable ``head``, you can bind the UI to the head tag.  

For example, define the member variable ``head`` on the View side as shown in the code below.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public head = "head";
}
```

Write the following code in ``src/rendering/ui/head.html``.

```html
<title>Page Title Sample</title>
```

This sets the UI HTML specified in the head tag.

<div id="view_header"></div>

### ## Header settings

By specifying the member variable ``header``, you can bind the UI to the header tag.  

For example, define the member variable ``header`` on the View side as shown in the code below.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public header = "header";
}
```

Write the following code in ``src/rendering/ui/header.html``.

```html
<h1>Header Area...</h1>
```

This sets the HTML of the UI specified in the header tag.

<div id="view_footer"></div>

### ## Footer Settings

By specifying the member variable ``footer``, you can bind the UI to the footer tag.  

For example, define the member variable ``footer`` on the View side as shown in the code below.

```typescript
import { View } from "View";

export class SampleView extends VIew {

    public footer = "footer";
}
```

Write the following code in ``src/rendering/ui/footer.html``.

```html
<h1>Fooer Area...</h1>
```

This sets the HTML of the UI specified in the footer tag.

<div id="view_view"></div>

### ## Changing the rendered HTML

If you want to change the rendering HTML file to a different name,   
you can do so by changing the member variable ``view``.

Please note that you cannot make changes to handlers that are executed after the screen rendering has already been completed,   
such as the ``handle`` method.  

Changes can be made by defining member variables or in handlers (``handleBefore`` or ``handleAfter``) before screen drawing (rendering) begins.

```typescript
import { View } from "View";

export class TestView extends VIew {

    public handleBefore() {
        this.view = "testCase1";
    }
}
```

In the above case, the HTML in ``src/rendering/view/testCase1.html`` will be applied.

<div id="view_stackopen"></div>

### ## Temporary display of screen (stackOpen)

The ``stackOpen`` method brings a screen to the front temporarily.

At first glance, it looks the same as a normal screen transition,  
but in the case of ``Transition.next`` etc., the previous screen is erased and then switched to the new screen,  
whereas when using ``stackOpen``, the previous screen remains and the new screen is displayed in front.

```
[ HomeView ]
    |
    |　SelectView.stackOpen()
    |--------------------------
    |                         |
    .                         |
    .                   [ SelectView ]
    .                         |
    .                         |  Return to previous screen
    |                         |
    |--------------------------
    |
    |
( Get return value of SelectView.handleLeaveStackClose  )
```

Therefore, if you go back, the previous screen will remain as it is.  
(However, handlers such as ``handleLeave`` on the returned screen will not be executed at all.)

As an example, prepare a selection screen and display it temporarily.  
After selecting a value on the selection screen, some value can be returned,  
so you can receive it.

```typescript
// Temporarily display the selection screen
const res = await SelectView.stackOpen();
console.log(res);       // The selected value is output.
```

When receiving, you can specify the value to be passed as a return value by using the ``handleLeaveStackClose`` event on the view side of the selection screen.

```typescript
import { View } from "View";

export class SelectView extends VIew {

    public handle() {

    }

    public handleLeaveStackClose() {
        // Return 21 as the value on the previous screen
        return 21;
    }
}
```

<div id="ui"></div>

## # UI Class

``UI`` is a class for displaying and operating each part on each screen.  
Used to modularize the most complex part of the screen display, such as the operation logic.   
(Examples of where a UI is needed include slider controls and common input forms.)

By modularizing the UI, operations and displays can be unified, improving maintainability.

Create a ``UI`` derived class for each screen,   
and add events and processing for when buttons are pressed or other operations are performed here.

### ## How to specify the UI

There are the following ways to specify the UI:
- Show UI class files only
- UI rendering HTML only
- Place both UI class files and rendering HTML (Recommendation)

#### ### Show UI class files only

How to install and display only UI derived class.  
The simplest way

For example,   
place the ``app/ui/SampleUI.ts`` file and write the HTML tag to display in the member variable ``html`` as shown in the code below.

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

    public html = "<div>Sample UI Test...</div>";
}
```

Then, bind the DOM element to be displayed in the View, etc.  
For information on binding, [see here](#ui_bind).

```typescript
import { View } from "View";
import { SampleUI } from "app/ui/SampleUI";

export class HomeView extends View {

    public handle() {

        // Bind SampleUI to a specified DOM
        SampleUI.bind(this.vdos.target);
    }
}
```

This is the simplest method, but it has the following problems:

- In normal editors, HTML statements are not highlighted, so you cannot use the completion function for HTML tags themselves.
- HTML tags may become bloated, which may reduce the readability of the TypeScript code itself.

#### ### UI rendering HTML only

How to separate the HTML content of the UI into a separate file.  
The method is simple: write HTML in ``app/rendering/ui/sample.html``

```html
<div>Sample UI Test...</div>
```

After that, bind to the specified DOM etc.  
In this method, since we do not have a UI derived class, we use the ``Transition.bindUI`` method.

```typescript
import { View } from "View";
import { Transition } from "Transition";

export class HomeView extends View {

    public handle() {

        // Bind to a specified DOM
        Transition.bindUI(this.vdos.target, "sample");
    }
}
```

This is also the simplest method, but it has the following problems:

- Since only HTML tags are installed,  
UI button operations must be performed using a screen view displayed by binding, etc.

#### ### Place both UI class files and rendering HTML (Recommendation)

How to place both the above UI class file and rendering HTML file  
Various files are placed in the following directory structure.

```
src
    |- app
        |- ui
            |- SampleUI.ts
    |- rendering
        |- ui
            |- sample.html
```

The code for the UI class file ``src/app/ui/SampleUI.ts`` is as follows:

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

}
```

The HTML tags for the rendering HTML ``src/rendering/ui/sample.html`` are as follows:

```html
<div>Sample UI Test...</div>
```

This approach solves both the problem of UI class files and rendering HTML.  

If you have already specified the member variable ``html`` in each UI class,   
the HTML information in the ``html`` variable will be displayed first.

<div id="ui_bind"></div>

### ## Displaying the UI (bind)

To display the UI in a specific DOM element (VirautlDom), use the ``UI.bind`` method.

The display image is as follows:

```html
<div v="{target virtual dom name}">{UI rendering HTML}</div>
```

For example, if you want to display SampleUI for the v attribute ``target`` of ``HomeView``, bind it with the following code in the ``HomeView`` class.  
The return value will be an instance of ``SampleUI``.

```typescript
import { View } from "View";
import { SampleUI } from "app/ui/SampleUI";

export class HomeView extends View {

    public handle() {

        // Bind SampleUI
        const sampleUI = SampleUI.bind(this.vdos.target);
    }
}
```

You can also use the ``Transition.bindUI`` method to display the UI.  
This requires the UI name to be specified as an argument.

```typescript
import { View } from "View";
import { Transition } from "Transition";

export class HomeView extends View {

    public handle() {

        // Bind SampleUI
        const sampleUI = Transition.bindUI(this.vdos.target, "sample");
    }
}
```

The bound UI class object is returned as the return value,   
so if you want to manipulate the DOM inside the UI, write the following code:

```typescript
import { View } from "View";
import { SampleUI } from "app/ui/SampleUI";

export class HomeView extends View {

    public handle() {

        // Bind SampleUI
        const sampleUI = SampleUI.bind(this.vdos.target);

        // Displayed with a red background
        sampleUI.vdo.style({ background: "red" });
    }
}
```

<div id="ui_append"></div>

### ## UI Addition Display (append)

To append and display the UI at the bottom of a specified DOM element (VirautlDom),  
use the ``append`` method.  
Mainly used for list display etc.

The display image is as follows:

```html
<div v="{target virtual dom name}">
    {Append UI rendering HTML(0)}
    {Append UI rendering HTML(1)}
    ...
    {Append UI rendering HTML(n)}
</div>
```

For example, if you want to add a ``LIstItemUI`` to the v attribute ``list`` of ``HomeView``,  
add it with the following code in the ``HomeView`` class.  
Because the loop is performed five times, five HTML entries for the ``LISTItemUI`` are added and displayed.

The return value is an instance of ``ListItemUI``.

```typescript
import { View } from "View";
import { ListItemUI } from "app/ui/ListItemUI";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++) {

            // Added ListItemUI
            const listItemUI = ListItemUI.append(this.vdos.list);
        }
    }
}
```

You can also add an additional display using the ``Transition.appendUI`` method.  
This requires the UI name to be specified as an argument.

```typescript
import { View } from "View";
import { Transition } from "Transition";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++){
            
            // Added ListItemUI
            const listItemUI = Transition.appendUI(this.vdos.list, "listItem");
        }
    }
}
```

The return value is the added UI class object.  
To manipulate the DOM inside the added UI, write the following code.

```typescript
import { View } from "View";
import { SampleUI } from "app/ui/SampleUI";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++) {

            // Added ListItemUI
            const listItemUI = ListItemUI.append(this.vdos.list);

            // Specify the display text
            listItemUI.vdos.name.text = "index = " + n;
        }
    }
}
```

### ## UI Addition Display (afterBegin)

To add and display the UI at the top of a specified DOM element (VirautlDom), use the ``afterBegin`` method.  
Unlike the ``append`` method, if you display the list in order, it will be in reverse order.

The display image is as follows:

```html
<div v="{target virtual dom name}">
    {afterBegin UI rendering HTML(n)}
    ...
    {afterBegin UI rendering HTML(1)}
    {afterBegin UI rendering HTML(0)}
</div>
```

For example, if you want to add ``LIstItemUI`` to the top of the ``HomeView`` v attribute ``list``,  
add it with the following code in the ``HomeView`` class.  
Because the loop is performed five times, five HTML entries for the ``LISTItemUI`` are added and displayed.

The return value is an instance of ``ListItemUI``.

```typescript
import { View } from "View";
import { ListItemUI } from "app/ui/ListItemUI";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++) {

            // Added ListItemUI
            const listItemUI = ListItemUI.afterBegin(this.vdos.list);
        }
    }
}
```

You can also add additional text using the ``Transition.afterBegin`` method.  
This requires the UI name to be specified as an argument.

```typescript
import { View } from "View";
import { Transition } from "Transition";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++){
            
            // Added ListItemUI
            const listItemUI = Transition.afterBegin(this.vdos.list, "listItem");
        }
    }
}
```

The return value is the added UI class object.  
To manipulate the DOM inside the added UI, write the following code.

```typescript
import { View } from "View";
import { SampleUI } from "app/ui/SampleUI";

export class HomeView extends View {

    public handle() {

        // 5 loops
        for (let n = 0 ; n < 5 ; n++) {

            // Added ListItemUI
            const listItemUI = ListItemUI.afterBegin(this.vdos.list);

            // Specify the display text
            listItemUI.vdos.name.text = "index = " + n;
        }
    }
}
```

### ## Event handlers when displaying the UI (handle)

You can use ``handle`` to set an event handler for UI display or post-append display.

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

    public handle() {

        // Event contents after SampleUI is displayed

    }
}
```

For example, you can write the settings for event handlers after display in ``handle`` as shown below.

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

    public handle() {

        // When you click SampleUI
        this.vdo.onClick = () => {

            alert("SampleUI Button Click");
        };
    }
}
```

### ## Manipulating the Virtual DOM

The virtual Doms that can be specified in the UI are broadly divided into the following:
- ``vdo`` : Target UI elements  (※ Only valid when ``bind`` is used)
- ``vdos`` : v attribute element in the target UI

Use ``vdo`` to perform Dom operations on the entire target UI.  
For example, in the code below, the entire SampleUI will be displayed with a black background.

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

    public handle() {

        // Display the entire SampleUI on a black background
        this.vdo.style({ background: "black" });
    }
}
```

``vdos`` allows you to manipulate the v attribute in the target UI as a virtual DOM.

For example, prepare the following tag in the rendering HTML of ``SampleUI``.

```html
<div v="text"></div>
```

In the ``handle`` method, write the code to set the text for the text tag as follows:

```typescript
import { UI } from "UI";

export class SampleUI extends UI {

    public handle() {

        this.vdos.text.text = "Sample UI Text ...";
    }
}
```

This allows Dom operations for each tag.

For details on how to operate in a Virtual Dom, [see here](#virtualdom).

<div id="template"></div>

## # Template Class

``Template`` is a base class for handling layouts that are displayed before the screen is displayed in a View.

If you do not use a template, only the view will be displayed,   
but you can use a template to set up parts of the view that do not affect the screen switching.

The relationship can be summarized as follows:

```
Template -> View
    |         |
    |         |-> UI (listitem ete)
    |
    |
    |-> UI (header, footer ete)
```

HTML tags placed in a template are basically retained as is until the template or template is no longer used,   
so mainly place parts that are not affected by screen transitions by the view, such as headers and footers,   
in the template, or call various UIs from the template class.

### ## Setting the template to use

The template to be used is determined by the member variable ``template`` in the view when the screen is displayed.

In the following case, ``DefaultTemplate`` is applied.

```typescript
import { View } from "View";

export class HomeView extends View {

    public template = "default";
}
```

Even if you transition to a different view screen,  
as long as the same template is applied,  
the HTML tags displayed in the template will not change.

```typescript
import { View } from "View";

export class Page1View extends View {

    public template = "default";
}
```

If the template has changed from the previous screen,   
or if no template is specified, the template display will be changed or reset.

```typescript
import { View } from "View";

export class Page2View extends View {

    // Change Template to default2
    public template = "default2";
}
```

### ## How to specify a template

There are the following ways to specify a template:
- Display only template class files
- Template rendering: Display only HTML
- Place both the template class file and the rendering HTML

#### ### Display only template class files

How to display only Template-derived classes.  
The simplest way.

For example,  
place the ``app/template/DefaultTemplate.ts`` file and write the HTML tag to display in the member variable ``html`` as shown in the code below.

Please note that the HTML for each screen view is included.  

- Make sure to put a ``main`` tag somewhere.  
If there is no ``main`` tag, a ``main`` tag will be automatically generated,   
but it will be placed at the end of the body tag.

```typescript
import { Template } from "Template";

export class DefaultTemplate extends Template {

    public html = `<header><div v="title"></div></header><main></main><footer>Footer</footer>`;
}
```

Then, set the member variable ``template`` on the View side.  

```typescript
import { View } from "View";

export class HomeView extends View {

    public template = "default";

    public handle() {

    }
}
```

This is the simplest method, but it has the following problems:

- In normal editors, HTML statements are not highlighted, so you cannot use the completion function for HTML tags themselves.
- HTML tags may become bloated, which may reduce the readability of the TypeScript code itself.

#### ### Template rendering: Display only HTML

How to separate the HTML content of the template into a separate file.  
The method is simple: write HTML in ``app/rendering/template/default.html``

```html
<header><div v="title"></div></header>
<main></main>
<footer>Footer</footer>
```

Then, set the member variable ``template`` on the View side.  

```typescript
import { View } from "View";

export class HomeView extends View {

    public template = "default";

    public handle() {

    }
}
```

This is also the simplest method, but it has the following problems:

- Since only HTML tags are set,   
button operations in the template must be performed using a screen view displayed by binding, etc.

#### ### Place both the template class file and the rendering HTML

How to place both the above Template class file and the rendered HTML.  
Various files are arranged in the following directory structure.

```
src
    |- app
        |- template
            |- DefaultTemplate.ts
    |- rendering
        |- template
            |- default.html
```

The code for the Template class file ``src/app/template/DefaultTemplate.ts`` is as follows:

```typescript
import { Template } from "Template";

export class DefaultTemplate extends Template {

}
```

The HTML tag of the rendering HTML ``src/rendering/template/default.html`` is as follows:

```html
<header><div v="title"></div></header>
<main></main>
<footer>Footer</footer>
```

Then, set the member variable ``template`` on the View side.  

```typescript
import { View } from "View";

export class HomeView extends View {

    public template = "default";

    public handle() {

    }
}
```

This approach solves both the problems with template class files and rendering HTML.  

If you have already specified the member variable ``html`` in each Template class,  
the HTML information in the ``html`` variable will be displayed first.

### ## Event handler when Template is displayed (handle)

Use ``handle`` to set an event handler in the template's HTML.

```typescript
import { Template } from "Template";

export class DefaultTemplate extends Template {

    public handle() {

        // Event handler when displaying DefaultTemplate

    }
}
```

For example,  
you can write the settings for event handlers after display in ``handle`` as shown below.

```typescript
import { Template } from "Template";

export class DefaultTemplate extends Template {

    public handle() {

        // Change the title display in the header
        this.vdos.header.text = "Header Title";
    }
}
```

<div id="background"></div>

## # Background Class

The ``Background`` class is a base class for executing processes immediately after the app is launched or viewed in a browser.  
Processes that you want to perform in the background, separate from screen transitions and button operations,   
are written here.

### ## How to use Background

First, to prepare a TestBackground,  
write the following code in the ``app/background/TestBackground.ts`` file:

```typescript
import { Background } from "Background";

export class TestBackground extends Background {

    public handle() {

        // The process to be performed immediately after the application is launched is described here....

    }
}
```

To execute the ``TestBackground`` class prepared above immediately after the app starts,  
in the initial setting class ``app/config/App.ts``,  
list the Background name in the member variable ``background``.

```typescript
import { App as _ } from "App";

export class MyApp extends App {
    ...
    public backgrounds : Array<string> = [
        "Test",
    ];
}
```

The order of background execution is the order listed in the ``background`` variable above. In the following example,   ``Test1Background`` -> ``Test2Background`` -> ``Test3Background`` will be executed in that order.

```typescript
import { App as _ } from "App";

export class MyApp extends App {
    ...
    public backgrounds : Array<string> = [
        "Test1",
        "Test2",
        "Test3",
        ...
    ];
}
```

<div id="plugin"></div>

## # About Plugins

Mikeneko has the ability to add and use plugins that can extend functions beyond the standard functions of the core library.

The plugin is provided as an npm package.  
(Package name format of ``mikeneko-plugin-xxxx``)

[Currently available plugins are listed here](plugins.md).

### ## Installing the plugin

To safely install a plugin,   
use the ``mike plugin add`` command in the current directory of your project.  
[More details about the command are available here](#mike_plugin_add)

For example, to install mikeneko-plugin-dialog, use the following:

```
$ mike plugin add mikeneko-plugin-dialog
```

When you perform the above, 
the necessary dependent packages will be installed and the settings required to add plugins will be automatically performed.

### ## Remove plugin

To safely remove an installed plugin,  
use the ``mike plugin remove`` command in the current directory of your project.  
[More details about the command are available here](#mike_plugin_remove)

For example, to delete the plugin ``mikeneko-plugin-dialog``, use the following:

```
$ mike plugin remove mikeneko-plugin-dialog
```

When you perform the above,   
the necessary dependent packages will be uninstalled and the settings required to remove the plugin will be automatically performed.

### ## Checking installed plugins

To see all installed plugins,   
run the command ``mike plugin list`` in the current directory of your project.

```
$ mike plugin list
```

The installed plugins will be displayed in a list as shown below.

```
$ mike plugin list

- mikeneko-plugin-dialog (1.0.0)
- mikeneko-plugin-validation (1.0.0)

```

## # Console mike command

``mike`` is a function for mikeneko to create projects and manage the plugin platform.  
Can be executed on the console as a CUI command.

```
$ mike 
```

Details about each function are listed below.

### ## Create a project

To create a project, use the ``mike create`` command.  
Enter the name of your project in {project-name}.

```
$ mike create {project-name}
```

After execution, the project directory, the initial source code,   
and the minimum npm packages required for building will be installed.

### ## Adding a platform

To add a platform for the build output, use the ``mike plugin add`` command.  
``{platform-name}`` is the name of the platform you want to add.

```
$ mike platform add {platform-name}
```

Additional platforms will be set after implementation.

### ## Removing a Platform

To remove a platform that is a build output destination, use the ``mike plugin remove`` command.  
For ``{platform-name}``, enter the name of the platform you want to delete.

```
$ mike platform remove {platform-name}
```

The settings for the specified platform will be erased after execution.  
Any remaining build data for the platform will be deleted.

<div id="mike-plugin-add"></div>

### ## Adding Plugins

To add a plugin to your project, use the ``mike plugin add`` command:  
``{plugin-name}`` is the name of the plugin you want to add.

```
$ mike plugin add {plugin-name}
```

After execution, the plugin and its dependent packages will be installed,  
and additional settings for the plugin will be made.

### ## Remove plugin

To remove a plugin from your project, use the ``mike plugin remove`` command:  
Replace {plugin-name} with the name of the plugin you want to remove.

```
$ mike plugin remove {plugin-name}
```

After this is done, the plugins to be deleted will be uninstalled and the plugin settings will be erased.

### ## View Added Plugins

To see the plugins installed in your project, use the ``mike plugin list`` command:

```
$ mike plugin list
```

## # Others

### ## Supported versions of dependent packages

The contents described in the document are supported for the following dependent package versions and later:

|||
|:--|:--|
|mikeneko|1.1.3|
|mikeneko-build|1.0.2|
|mikeneko-corelib|1.0.3|

### ## Developer of this package

- Author : masato Nakatsuji

