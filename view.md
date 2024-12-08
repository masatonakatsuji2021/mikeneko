# View Class

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

### : Using Virtual Dom (VirtualDom)

By using a virtual Dom, you can simplify element selection when performing complex Dom control.

For more information about Virtual Dom, [see here.](#VirtualDom)

In the View class, you can easily insert text into tags and set event control for elements using the public variable ``vdios``.

For example, to display text from the View class on a page, write it as follows:

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {

        // set title
        this.vdios.title.text = "Page1 Text Sample ...";

        // set description
        this.vdios.description.text = "Page1 Description Text Sample ..... ";
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