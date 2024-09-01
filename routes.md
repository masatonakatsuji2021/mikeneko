
# Routes Class

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

---

## # Screen transitions using URLs and link buttons

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

---

## # Routing with Views

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

---

## # Routing with Controller

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

---

## # URL description using scope

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
---

## # Dynamic support for some URLs

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

---

## # Dynamic support for some URLs (Optional)

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