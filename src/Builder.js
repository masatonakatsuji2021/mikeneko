"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const UglifyJS = require("uglify-js");
const strip = require("strip-comments");
class Builder {
    static build(option) {
        if (!option) {
            option = {
                platforms: [{ type: "web" }]
            };
        }
        console.log("saiberian build start");
        const rootDir = process.cwd();
        let tsType = "es6";
        if (!option.noTranceComplied) {
            tsType = this.getTsType(rootDir);
            if (!tsType)
                tsType = "es6";
        }
        console.log("# TranceComplieType = " + tsType);
        const buildDir = rootDir + "/output";
        this.outMkdir(buildDir);
        for (let n = 0; n < option.platforms.length; n++) {
            const platform = option.platforms[n];
            if (!platform.name)
                platform.name = platform.type;
            if (!platform.path)
                platform.path = platform.type;
            if (platform.handleBuildStart)
                platform.handleBuildStart(platform);
            console.log("# platform = " + platform.name);
            let coreStr = "";
            const platformDir = buildDir + "/" + platform.path;
            this.outMkdir(platformDir);
            // start head
            coreStr += this.jsStart(tsType, platform.name);
            // core module mount
            coreStr += this.coreModuleMount(tsType, "App");
            coreStr += this.coreModuleMount(tsType, "Background");
            coreStr += this.coreModuleMount(tsType, "Controller");
            coreStr += this.coreModuleMount(tsType, "Data");
            coreStr += this.coreModuleMount(tsType, "Dom");
            coreStr += this.coreModuleMount(tsType, "Exception");
            coreStr += this.coreModuleMount(tsType, "KeyEvent");
            coreStr += this.coreModuleMount(tsType, "Response");
            coreStr += this.coreModuleMount(tsType, "Routes");
            coreStr += this.coreModuleMount(tsType, "Startor");
            coreStr += this.coreModuleMount(tsType, "Storage");
            coreStr += this.coreModuleMount(tsType, "Template");
            coreStr += this.coreModuleMount(tsType, "Util");
            coreStr += this.coreModuleMount(tsType, "View");
            coreStr += this.coreModuleMount(tsType, "ViewPart");
            // local module mount
            coreStr += this.localModuleMount(rootDir, platform.name);
            // rendering html mount
            coreStr += this.renderingHtmMount(rootDir, platform.name);
            // public content mount
            coreStr += this.publicContentMount(rootDir, platform.name);
            if (option.codeCompress) {
                coreStr = this.codeCompress(coreStr);
            }
            // end foot
            coreStr += this.jsEnd();
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
    static jsStart(tsType, platformName) {
        console.log("# build Start");
        let content = fs.readFileSync(path.dirname(__dirname) + "/dist/" + tsType + "/Front.js").toString();
        content = content.split("{{platform}}").join(platformName);
        return content;
    }
    static setFn(name, content, rawFlg) {
        if (rawFlg) {
            return "sfa.setFn(\"" + name + "\", ()=>{" + content + "});";
        }
        else {
            return "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});";
        }
    }
    static coreModuleMount(tsType, name) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js";
        let contents = fs.readFileSync(fullPath).toString();
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        return this.setFn(name, contents, true);
    }
    static localModuleMount(rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/app",
            rootDir + "/src_" + platformName + "/app",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                if (file.isDirectory())
                    return;
                if (path.extname(file.name) != ".js")
                    return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "app/" + file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                let contents = fs.readFileSync(fullPath).toString();
                contents = "var exports = {};\n" + contents + ";\nreturn exports;";
                strs += this.setFn(basePath, contents, true);
                console.log("# local module".padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }
    static jsEnd() {
        console.log("# build End");
        return "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }
    static publicContentMount(rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/public",
            rootDir + "/src_" + platformName + "/public",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                if (file.isDirectory())
                    return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "public/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                const mimeType = mime.lookup(basePath);
                strs += this.setFn(basePath, "\"data:" + mimeType + ";base64," + contentB64 + "\"");
                console.log("# public content mount ".padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }
    static renderingHtmMount(rootDir, platformName) {
        let targetPaths = [
            rootDir + "/src/rendering",
            rootDir + "/src_" + platformName + "/rendering",
        ];
        let strs = "";
        targetPaths.forEach((targetPath) => {
            this.search(targetPath, (file) => {
                if (file.isDirectory())
                    return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "rendering/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                strs += this.setFn(basePath, "\"" + contentB64 + "\";");
                console.log("# render html  mount".padEnd(30) + " " + basePath);
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
            recursive: true,
        });
        for (let n = 0; n < list.length; n++) {
            callback(list[n]);
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
