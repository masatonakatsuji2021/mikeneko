"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const UglifyJS = require("uglify-js");
const strip = require("strip-comments");
const child_process_1 = require("child_process");
const obfucator = require("javascript-obfuscator");
const saiberian_1 = require("saiberian");
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
        if (option.platforms == undefined)
            option.platforms = [{ name: "web" }];
        console.log("saiberian build start");
        const rootDir = option.rootDir;
        // typescript trance complie
        let tsType = "es6";
        if (option.tranceComplied)
            tsType = this.typescriptComplie(rootDir);
        // mkdir
        const buildDir = rootDir + "/output";
        this.outMkdir(buildDir);
        for (let n = 0; n < option.platforms.length; n++) {
            // platforms building 
            const platform = option.platforms[n];
            let buildhandle = saiberian_1.BuildHandle;
            try {
                buildhandle = require(rootDir + "/src/BuildHandle").BuildHandle;
            }
            catch (error) { }
            if (!buildhandle) {
                try {
                    buildhandle = require(rootDir + "/src_" + platform.name + "/BuildHandle").BuildHandle;
                }
                catch (error) { }
            }
            console.log("# platform = " + platform.name);
            // create platform directory
            let platformDir = buildDir + "/" + platform.name;
            if (platform.optionDir)
                platformDir += "/" + platform.optionDir;
            this.outMkdir(platformDir, true);
            platform.outPath = platformDir;
            platform.path = buildDir + "/" + platform.name;
            // build handle begin
            buildhandle.handleBegin(platform);
            // code set
            let codeList = {};
            // start head
            let debug = option.debug;
            if (platform.debug != undefined)
                debug = platform.debug;
            this.jsStart(codeList, tsType, platform.name, debug);
            // core module mount
            const coreList = [
                "Ajax",
                "App",
                "Background",
                "Controller",
                "Data",
                "ModernJS",
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
            // code compress
            let codeCompress = option.codeCompress;
            if (platform.codeCompress != undefined)
                codeCompress = platform.codeCompress;
            if (codeCompress)
                coreStr = this.codeCompress(coreStr);
            // code obfuscated
            let obfuscated = option.obfuscated;
            if (platform.obfuscated != undefined)
                obfuscated = platform.obfuscated;
            if (obfuscated)
                coreStr = this.codeObfuscate(coreStr);
            console.log("# write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
            console.log("# write index.html");
            let indexHTML = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
            if (platform.buildType == "cordova") {
                indexHTML = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"cordova.js\"></script><script src=\"index.js\"></script></head><body></body></html>";
            }
            fs.writeFileSync(platformDir + "/index.html", indexHTML);
            console.log("# ........ platform = " + platform.name + " ok");
            // build handle platform  complete
            buildhandle.handleComplete(platform);
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
    static typescriptComplie(rootDir) {
        let tsType = "es6";
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
        return tsType;
    }
    static outMkdir(rootDir, alreadyDeleted) {
        console.log("# mkdir " + rootDir);
        if (alreadyDeleted) {
            if (fs.existsSync(rootDir)) {
                console.log("# already directory .... clear");
                fs.rmSync(rootDir, {
                    recursive: true,
                });
            }
        }
        fs.mkdirSync(rootDir, {
            recursive: true,
        });
    }
    static codeCompress(code) {
        // Delete comment
        console.log("# code compress ... ");
        console.log("# delete commentout...");
        const strippedCode = strip(code);
        // Compress JavaScript code
        console.log("# code compress...");
        const result = UglifyJS.minify(strippedCode);
        if (result.error)
            throw result.error;
        return result.code;
    }
    static codeObfuscate(code) {
        console.log("# code obfuscate .... ");
        code = obfucator.obfuscate(code).getObfuscatedCode();
        return code;
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
