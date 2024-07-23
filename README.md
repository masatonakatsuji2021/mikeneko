# Saiberian 

* 2024.7.13 Details coming soon...

A framework for SPA (Single-Page-Action) that can be installed on Web, Android, and iOS.  
([The Japanese version of the document is here](https://github.com/masatonakatsuji2021/saiberian/wiki/Saiberian(%E6%97%A5%E6%9C%AC%E8%AA%9E%E3%83%9A%E3%83%BC%E3%82%B8)))

## # How to use

We will proceed in the following order:

1. [Create Project](#create_project)
2. [Modify and add project sources](#source)
3. [Build output from project](#build)

---

<div id="create_project"></div>

### 1. Create Project

* 2024.7.13 Project creation commands not implemented  
Instead, we have prepared a test sample below, so please refer to it here
[https://github.com/masatonakatsuji2021/saiberian_build_sample](https://github.com/masatonakatsuji2021/saiberian_build_sample)
This will be explained later in the test sample.

The actual test sample deployment results are as follows:  
(The details are omitted.)

```
{project directory}
    L output
        L android
        L web
    L src
        L app
            L config
            L controller
            L view
        L rendering
            L template
            L view
        L viewpart
        L resource
    L src_android
        ...
    L init.d.ts
    L package.json
    L tsconfig.json
```

For the structure of each directory, [see here](#structure).

---

<div id="source"></div>

### 2. Modify and add project sources

* 2024.7.13 Details coming soon...
---
<div id="build"></div>

### 3. Build output from project

* 2024.7.13 Details coming soon...

Execute the following command in the path directly under the project.  
(Make sure that the build file ``index.js`` exists directly under the project directory.)

```console
node .
```

After that, the console output will be displayed as shown below,
and transcompilation within the project will be automatically performed, and each set of source files will be integrated and optimized.

```console
saiberian build start
# TranceComplieType = es6
# Trance Complie...
# ..OK
# already build data ... on delete.
# mkdir /home/nktj2024/desctop/test/saiberian/build_test/output
# platform = web
# mkdir /home/nktj2024/desctop/test/saiberian/build_test/output/web
# build Start
# core module                  App
.....
# local module                 app/config/App
.....
# render html  mount           rendering/template/default.html
.....
# resource content mount       resource/css/style.css
.....
# build End
# write index.js
# write index.html
# ........ platform = web ok
# platform = android
......
# build End
# write index.js
# write index.html
# ........ platform = android ok
#
# ...... Complete!
```

The build files are generated in the ``output`` directory.  
The directories are divided according to platform, so if the ``index.html`` and ``index.js`` are created, the build is successful.

```
$ cd output/web
$ ls
index.html      index.js
```

After that, just move this build data to the deployment location.

---

<div id="structure"></div>

## # Structure

For an explanation of each file and directory area, see below.  
For the terms used in each directory, see [Terminology](#term).

|name|explanation|
|:--|:--|
|output|Build output directory.<br>Generated automatically after the build is executed.|
|src|Source Code directory.|
| - app|Script source directory|
| -  -  config|Directory for various setting classes. [Explanation here](#config)|
| -  - controller|Controller placement directory. [Explanation here](#controller)|
| - -  view|View class directory.[Explanation here](#view)|
| - rendering|Rendering HTML placement directory|
| - - template|Directory for placing template HTML. [Explanation here](#template)|
| - - view|Directory for placing HTML for View. [Explanation here](#view_html)|
| - - viewpart|Directory for placing HTML for ViewPart. [Explanation here](#viewpart)|
|〜resource|Directory for placing resource contents. [Explanation here](#resource)|
|src_{platform_name}|Platform-specific source code directories<br>If you want to place or change code information at build time for each platform, add it here.|
|init.d.ts|Type definition file for TypeScript|
|package.json|Build setting json.  [Explanation here](#package.json)|
|tsconfig.json|TypeScript transpilation configuration json|

<div id="config"></div>

### : Config (App Class)

<div id="controller"></div>

### : Controller (Class)



<div id="view"></div>

### : View (Class)


<div id="temlate"></div>

### : Template (HTML)

<div id="view_html"></div>

### : View (HTML)


<div id="viewpart"></div>

### : ViewPart (HTML)


<div id="resource"></div>

### : Resource


<div id="package.json"></div>

### : package.json



<a id="term">

## # Terminology

### : 