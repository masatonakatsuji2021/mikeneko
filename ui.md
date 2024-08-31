
# UI Class

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