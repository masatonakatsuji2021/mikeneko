# App Class

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

## # appName

Name of the application. 

```typescript
public static appName : string = "Mikeneko App";
```

## # routeType

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

## # routes

This is the routing setting item.<br>
Specify each path during screen transition, the destination view or controller, and the action name (public method name).

For information on setting up routing, [see here](routes.md)

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
## # backgrounds

Background class list to run.   
Execution will begin in the order specified in the list.

For an overview of the Background class, [see here](background.md)

```typescript
public static backgrounds: Array<string> = [
    "Background",
];
```

## # sessionStorage

SessionStorage Identifier.  
For an overview of the session-storage, [see here](storage.md#session)

```typescript
public static sessionStorage : string = "mike_ss";
```

## # localStorage

LocalStorage Identifiers.  
For an overview of the local-storage, [see here](storage.md#local)

```typescript
public static localStorage : string = "mike_local";
```

## # Delay during screen transitions

Set this variable if you want to delay temporarily when transitioning to another screen.  
The unit is specified in milliseconds.  
(The default is 100ms.)

 ```typescript
 public static delay : number = 100;
 ```

## # Not Found View
 
If there is no screen transition destination available and you want to display a dedicated NotFound page, specify the View class name to display here.
 
 
```typescript
public static notFoundView : string = "NotFoundPage";
```
 
After specifying the view name, write the class code and set the HTML based on [View class](view.md).
 
## # beginURL 
 
You can optionally specify the URL to display when the app is launched.  
If you do not specify a URL, the View or Controller screen specified by ``/`` in the routing will be displayed.
 
```typescript
public static beginURL : string = "/home";
```
 
## # Animation Xlass Name
 
If you want to add a class attribute to the article tag before and after a screen transition, use
``animationOpenClassName`` or ``animationCloseClassName``.
 
By using this, you can use CSS to animate the screen when switching between screens.
 
```typescript
// open class attribute
public static animationOpenClassName : string = "open";
 
// close class attribute
public static animationCloseClassName : string = "close";
```
