# Saiberian 

* 2024.7.13 Details coming soon...

A framework for SPA (Single-Page-Action) that can be installed on Web, Android, and iOS.

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
    L index.js
    L init.d.ts
    L tsconfig.json
```

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