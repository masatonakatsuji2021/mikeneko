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
|Ajax|This class is used for Ajax communication.<br>[Click here for details](ajax.md)|
|App|This is the class for initial setup of the app.<br>Please make sure to install this inherited class ``MyApp``.<br>[Click here for details](app.md)|
|Background|Classes to run when the app starts.<br>[Click here for details](background.md)|
|Controller|Class to be executed when transitioning between pages.<br>Multiple pages can be managed by a single Controller class.<br>[Click here for details](controller.md)|
|Data|Data sharing management class.<br>[Click here for details](data.md)|
|Dialog|Class for displaying dialogs.<br>[Click here for details](dialog.md)|
|KeyEvent|Class for key operation events.<br>[Click here for details](keyevent.md)|
|VirtualDom|Virtual DOM or modern JS classes for DOM manipulation.<br>[Click here for details](virtualdom.md)|
|Response|Response manipulation class.<br>[Click here for details](response.md)|
|Routes|Routing Classes.<br>[Click here for details](routes.md)|
|Shortcode|Class for managing shortcodes.<br>[Click here for details](shortcode.md)|
|Storage|Storage operation classes.<br>[Click here for details](storage.md)|
|Template|Template class.<br>[](template.md)|
|Lib|A class that provides methods for basic operations.<br>[Click here for details](lib.md)|
|View|View Class<br>[Click here for details](view.md)|
|UI|UI Class<br>[Click here for details](ui.md)|
|Validation|Validation Class<br>[Click here for details](validation.md)|
