"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const UglifyJS = require("uglify-js");
const strip = require("strip-comments");
const child_process_1 = require("child_process");
class Builder {
    static build(option) {
        if (!option)
            option = {};
        if (option.debug == undefined)
            option.debug = false;
        if (option.rootDir == undefined)
            option.rootDir = process.cwd();
        if (option.tranceComplied == undefined)
            option.tranceComplied = true;
        if (option.resourceCached == undefined)
            option.resourceCached = true;
        if (option.resourceMaxsize == undefined)
            option.resourceMaxsize = -1;
        if (option.platforms == undefined)
            option.platforms = [{ type: "web" }];
        console.log("saiberian build start");
        const rootDir = option.rootDir;
        ;
        // typescript trance complie
        let tsType = "es6";
        if (option.tranceComplied) {
            tsType = this.getTsType(rootDir);
            if (!tsType)
                tsType = "es6";
            console.log("# TranceComplieType = " + tsType);
            console.log("# Trance Complie...");
            try {
                (0, child_process_1.execSync)("tsc");
            }
            catch (error) {
                console.log(error.stack);
                return;
            }
            console.log("# ..OK");
        }
        else {
            console.log("# TranceComplieType = " + tsType);
        }
        const buildDir = rootDir + "/output";
        this.outMkdir(buildDir);
        for (let n = 0; n < option.platforms.length; n++) {
            // platforms building 
            const platform = option.platforms[n];
            if (!platform.name)
                platform.name = platform.type;
            if (!platform.path)
                platform.path = platform.type;
            if (platform.handleBuildStart)
                platform.handleBuildStart(platform);
            console.log("# platform = " + platform.name);
            // create platform directory
            const platformDir = buildDir + "/" + platform.path;
            this.outMkdir(platformDir);
            // code set
            let codeList = {};
            // start head
            this.jsStart(codeList, tsType, platform.name, option.debug);
            // core module mount
            const coreList = [
                "App",
                "Background",
                "Controller",
                "Data",
                "Dom",
                "Exception",
                "KeyEvent",
                "Response",
                "Routes",
                "Startor",
                "Storage",
                "Shortcode",
                "Template",
                "Util",
                "View",
                "ViewPart",
            ];
            coreList.forEach((core) => {
                this.coreModuleMount(codeList, tsType, core);
            });
            // local module mount
            this.localModuleMount(codeList, rootDir, platform.name);
            // rendering html mount
            this.renderingHtmMount(codeList, rootDir, platform.name);
            // public content mount
            this.resourceContentMount(codeList, rootDir, platform.name);
            // end foot
            this.jsEnd(codeList);
            let coreStr = Object.values(codeList).join("");
            if (option.codeCompress) {
                coreStr = this.codeCompress(coreStr);
            }
            console.log("# write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
            console.log("# write index.html");
            fs.writeFileSync(platformDir + "/index.html", "<!DOCTYPE html><head><script src=\"index.js\"></script></head><body></body></html>");
            console.log("# ........ platform = " + platform.name + " ok");
            if (platform.handleBuildEnd)
                platform.handleBuildEnd(platform);
        }
        console.log("#");
        console.log("# ...... Complete!");
    }
    static jsStart(codeList, tsType, platformName, debugMode) {
        console.log("# build Start");
        let content = fs.readFileSync(path.dirname(__dirname) + "/dist/" + tsType + "/Front.js").toString();
        content = content.split("{{platform}}").join(platformName);
        if (!debugMode)
            content += "console.log=()=>{};\n";
        codeList.___HEADER = content;
    }
    static setFn(name, content, rawFlg) {
        if (rawFlg) {
            return "sfa.setFn(\"" + name + "\", ()=>{" + content + "});\n";
        }
        else {
            return "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});\n";
        }
    }
    static coreModuleMount(codeList, tsType, name) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js";
        let contents = fs.readFileSync(fullPath).toString();
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        codeList[name] = this.setFn(name, contents, true);
    }
    static localModuleMount(codeList, rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/app",
            rootDir + "/src_" + platformName + "/app",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                if (path.extname(file.name) != ".js")
                    return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "app/" + file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                let contents = fs.readFileSync(fullPath).toString();
                contents = "var exports = {};\n" + contents + ";\nreturn exports;";
                codeList[basePath] = this.setFn(basePath, contents, true);
                let plstr = "";
                if (targetPath != rootDir + "/src/app") {
                    plstr = " (" + platformName + ")";
                }
                console.log(("# local module" + plstr).padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }
    static jsEnd(codeList) {
        console.log("# build End");
        codeList.___FOOTER = "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }
    static resourceContentMount(codeList, rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/resource",
            rootDir + "/src_" + platformName + "/resource",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                const fullPath = file.path + "/" + file.name;
                let basePath = "resource/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                const mimeType = mime.lookup(basePath);
                let plstr = "";
                if (targetPath != rootDir + "/src/resource") {
                    plstr = "(" + platformName + ")";
                }
                codeList[basePath] = this.setFn(basePath, "\"" + mimeType + "|" + contentB64 + "\"");
                console.log(("# resource mount" + plstr).padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }
    static renderingHtmMount(codeList, rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/rendering",
            rootDir + "/src_" + platformName + "/rendering",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                const fullPath = file.path + "/" + file.name;
                let basePath = "rendering/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                let plstr = "";
                if (targetPath != rootDir + "/src/rendering") {
                    plstr = "(" + platformName + ")";
                }
                codeList[basePath] = this.setFn(basePath, "\"" + contentB64 + "\";");
                console.log(("# render mount" + plstr).padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }
    static search(target, callback) {
        if (!fs.existsSync(target))
            return;
        if (!fs.statSync(target).isDirectory())
            return;
        const list = fs.readdirSync(target, {
            withFileTypes: true,
        });
        for (let n = 0; n < list.length; n++) {
            const l_ = list[n];
            if (l_.isDirectory()) {
                this.search(target + "/" + l_.name, callback);
            }
            else {
                // node.js v14 under support.
                const file = l_;
                file.path = target;
                callback(l_);
            }
        }
    }
    static outMkdir(rootDir) {
        let dirExists = false;
        if (fs.existsSync(rootDir)) {
            if (fs.statSync(rootDir).isDirectory()) {
                console.log("# already build data ... on delete.");
                fs.rmSync(rootDir, {
                    recursive: true,
                });
            }
        }
        if (!dirExists) {
            console.log("# mkdir " + rootDir);
            fs.mkdirSync(rootDir);
        }
    }
    static codeCompress(code) {
        // Delete comment
        console.log("# delete commentout...");
        const strippedCode = strip(code);
        // Compress JavaScript code
        console.log("# code compress...");
        const result = UglifyJS.minify(strippedCode);
        if (result.error)
            throw result.error;
        return result.code;
    }
    static getTsType(rootDir) {
        let tsConfig, tsType;
        try {
            tsConfig = require(rootDir + "/tsconfig.json");
            if (!tsConfig.compilerOptions)
                return;
            if (!tsConfig.compilerOptions.target)
                return;
            tsType = tsConfig.compilerOptions.target;
        }
        catch (error) {
            return;
        }
        return tsType;
    }
}
exports.Builder = Builder;
