# Structure

For an explanation of each file and directory area, see below.  
For the terms used in each directory, see [Terminology](term.md).

|name|explanation|
|:--|:--|
|output|Build output directory.<br>Generated automatically after the build is executed.|
|src|Source Code directory.|
| - app|Script source directory<br>Basically, the source is placed in a ts file for each class. <br>Regarding class names, you can set derived classes inherited from preset core library classes and your own classes.<br>For the preset core library classes, [see here](corelib.md)|
| - -  background|Background class directory.[Explanation here](background.md)|
| -  - config|Directory for various setting classes.[Explanation here](app.md)|
| -  - controller|Controller placement directory. [Explanation here](controller.md)|
| - -  dialog|Dialog class directory.[Explanation here](dialog.md)|
| - -  view|View class directory.[Explanation here](view.md)|
| - -  validation|Validation class directory.[Explanation here](validation.md)|
| - rendering|Rendering HTML placement directory|
| - - dialog|Directory for placing dialog HTML. [Explanation here](dialog.md)|
| - - template|Directory for placing template HTML. [Explanation here](template.md)|
| - - view|Directory for placing HTML for View. [Explanation here](view.md)|
| - - ui|Directory for placing HTML for UI. [Explanation here](ui.md)|
|〜resource|Directory for placing resource contents. [Explanation here](resource.md)|
|src_{platform_name}|Platform-specific source code directories<br>If you want to place or change code information at build time for each platform, add it here.[Explanation here](packagejson.md#platform)|
|init.d.ts|Type definition file for TypeScript|
|package.json|Build setting json.  [Explanation here](packagejson.md)|
|tsconfig.json|TypeScript transpilation configuration json|