# Response Class

The Response class is used to control rendering HTML operations and screen transitions such as Template, UI, and Dialog.

When using it, be sure to load the Response class with import as shown below.

```typescript
import { Response } from "Response";
```

---

<div id="response_ui"></div>

## # load UI (Response.UI)

Use the ``Response.UI`` method to get the HTML tag of the UI.  
Be sure to specify the UI name as an argument.

```typescript
const test : string = Response.UI("test");
```

In the above case, the HTML tag information of ``rendering/ui/test.html`` is obtained.

---

<div id="response_bindui"></div>

## # Bind UI (Response.bindUI)

The ``Response.bindUI`` method binds a specified UI to a specified element (VirtualDom class).
The event handler is executed immediately after binding,   
so if the specified UI inheritance class exists and has a ``handle`` method,  
then that method will be executed.

The return value is the instantiated UI class or, if a derived UI class exists, the instance class.

```typescript
import { TestUI } from "app/ui/TestUI";

// ....

const testUI : TestUI = Response.bindUI(this.vdios.target, "test");
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

---

<div id="response_appendui"></div>

## # Append UI (Response.appendUI)

The ``Response.appendUI`` method appends to a specified element (VirtualDom class).  
While ``Response.bindUI`` overwrites the tag information of the specified UI, this is added.  
This method is mainly suitable for displaying list information.


```typescript
import { ItemUI } from "app/ui/ItemUI";

// ....

const itemUI : ItemUI = Response.appendUI(this.vdios.list, "item");
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