# Installation

To install, use the following npm command to install globally:

```
npm i -g git+https://github.com/masatonakatsuji2021/mikeneko.git
```

After installation, the ``mike`` command will be available.  
From now on, use the mike command to create projects and run builds.

We will proceed in the following order:

1. [Create Project](#create_project)
2. Modify and add project sources
3. [Build output from project](#build)

[I will explain point 2 later here,](structure.md) so I will explain points 1 and 3 first.

---


<div id="create_project"></div>

## 1. Create Project

First, create a project for the development environment.  
To create a project, just use the ``mike create`` command and enter the name of the project you want to create.

```
$ mike create test
```

In the above case, a ``test`` directory will be created in the current directory,  
and a set of default source files will be automatically generated in it.

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
            L background
            L config
            L controller
            L dialog
            L view
            ...
        L rendering
            L dialog
            L template
            L view
            L ui
        L resource
    L src_android
        ...
    L init.d.ts
    L package.json
    L tsconfig.json
```

For the structure of each directory, [see here](structure.md).

---
<div id="build"></div>

## 3. Build output from project

To build the project, run the ``mike build`` command.  
After that, the build will start automatically and the compiled html and js files will be output to the output directory.

```
$ mike build
```

After that, the console output will be displayed as shown below,
and transcompilation within the project will be automatically performed, and each set of source files will be integrated and optimized.

```console
mikeneko build start
# TranceComplieType = es6
# Trance Complie...
# ..OK
# already build data ... on delete.
# mkdir /home/nktj2024/desctop/test/mikeneko/build_test/output
# platform = web
# mkdir /home/nktj2024/desctop/test/mikeneko/build_test/output/web
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
