# Controller Class

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