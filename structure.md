Mikeneko ------------------------------------------------------

# Structure

For an explanation of each file and directory area, see below.  
For the terms used in each directory, see [Terminology](#term).

|name|explanation|
|:--|:--|
|output|Build output directory.<br>Generated automatically after the build is executed.|
|src|Source Code directory.|
| - app|Script source directory<br>Basically, the source is placed in a ts file for each class. <br>Regarding class names, you can set derived classes inherited from preset core library classes and your own classes.<br>For the preset core library classes, [see here](#corelib)|
| - -  background|Background class directory.[Explanation here](#background)|
| -  - config|Directory for various setting classes. [Explanation here](#config)|
| -  - controller|Controller placement directory. [Explanation here](#controller)|
| - -  dialog|Dialog class directory.[Explanation here](#dialog)|
| - -  view|View class directory.[Explanation here](#view)|
| - rendering|Rendering HTML placement directory|
| - - dialog|Directory for placing dialog HTML. [Explanation here](#dialog_html)|
| - - template|Directory for placing template HTML. [Explanation here](#template_html)|
| - - view|Directory for placing HTML for View. [Explanation here](#view_html)|
| - - ui|Directory for placing HTML for UI. [Explanation here](#ui)|
|〜resource|Directory for placing resource contents. [Explanation here](#resource)|
|src_{platform_name}|Platform-specific source code directories<br>If you want to place or change code information at build time for each platform, add it here.|
|init.d.ts|Type definition file for TypeScript|
|package.json|Build setting json.  [Explanation here](#package.json)|
|tsconfig.json|TypeScript transpilation configuration json|

<div id="config"></div>

## # Config (App Class)

Currently being adjusted...

<div id="temlate_html"></div>

## # Template (HTML)

Currently being adjusted...

<div id="view_html"></div>

## # View (HTML)

Currently being adjusted...

<div id="ui_html"></div>

##  #: UI (HTML)

Currently being adjusted...

<div id="dialog_html"></div>

## # Dialog (HTML)

Currently being adjusted...

<div id="resource"></div>

## # Resource

Currently being adjusted...

<div id="package.json"></div>

## # package.json

Currently being adjusted...