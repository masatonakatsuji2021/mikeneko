# Flag Front

A web framework that allows you to easily and quickly deploy SPAs (Single Page Actions) for web apps and WebView-based client applications.

[https://masatonakatsuji2021.github.io/flag/](https://masatonakatsuji2021.github.io/flag/)

- [Run from console](#1)
- [Creating a SPA project](#2)
- [Run the build](#3)

<div id="1"></div>

## # Run from console

First, install the npm package ``@flagfw/flag`` globally using the following command.

```
$ npm i -g @flagfw/flag
```

Then run the ``flag front`` command.

```
@ flag front
```
<div id="2"></div>

## # Creating a SPA project

Open a terminal from any directory and run the following command.
Creating a SPA project begins interactively.

```
@ flag front create
```

The questions to be asked are below :

|||
|:--|:--|
|**Project Name**|Project name to create.  When creating a project, a directory with the project name is created in the current directory and initial source files are prepared there.|
|**Frameworks**|Framework name to build. If not specified, the initial state "web" will be generated at build time and the build results will be output there.|
|**TypeScript Complie**|When this is set to "true", TypeScript will be transcompiled immediately before building.|
|**Source Compress**|When this is set to "true", the js file (index.min.js) after building will be generated in a compressed form.|
|***Source Obfuscate***|(2023.12.21 Currently not set.) If this is set to "true", the script code will be obfuscated.|

---

<div id="3"></div>

## # Run the build

To build the SPA project, run the following command in the terminal inside the project.

```
@ flag front build
```

When building, TypeScript ts file transcompiler and script file are merged, etc.

The built files are output in units of framework names specified in the ``frameworks`` directory within the project.

