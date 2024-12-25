"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = exports.BuildPlatformType = exports.BuildType = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const UglifyJS = require("uglify-js");
const strip = require("strip-comments");
const child_process_1 = require("child_process");
const obfucator = require("javascript-obfuscator");
const mikeneko_1 = require("mikeneko");
const nktj_cli_1 = require("nktj_cli");
var BuildType;
(function (BuildType) {
    BuildType["WebBuilder"] = "webBuilder";
    BuildType["WebPack"] = "webPack";
})(BuildType || (exports.BuildType = BuildType = {}));
var BuildPlatformType;
(function (BuildPlatformType) {
    /** Web */
    BuildPlatformType["Web"] = "web";
    /** Cordova */
    BuildPlatformType["Cordova"] = "cordova";
    /** Capacitor */
    BuildPlatformType["Capacitor"] = "capacitor";
    /** Electro */
    BuildPlatformType["Electron"] = "electron";
})(BuildPlatformType || (exports.BuildPlatformType = BuildPlatformType = {}));
class Builder {
    static build(option) {
        const argsOption = nktj_cli_1.CLI.getArgsOPtion();
        if (argsOption["platform"] || argsOption["p"]) {
            let selectPlatform;
            if (argsOption["platform"])
                selectPlatform = argsOption["platform"];
            if (argsOption["p"])
                selectPlatform = argsOption["p"];
            for (let n = 0; n < option.platforms.length; n++) {
                const platform = option.platforms[n];
                if (platform.name != selectPlatform) {
                    platform.disable = true;
                }
            }
        }
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
        nktj_cli_1.CLI.outn("** mikeneko build start **");
        const rootDir = option.rootDir;
        // typescript trance complie
        let tsType = "es6";
        try {
            if (option.tranceComplied) {
                option.tscType = tsType;
                tsType = this.typescriptComplie(rootDir);
            }
        }
        catch (error) {
            nktj_cli_1.CLI.outn("[TypeScript TrancePlie Error]", nktj_cli_1.Color.Red);
            nktj_cli_1.CLI.outn(error.stdout.toString());
            nktj_cli_1.CLI.outn("...... " + nktj_cli_1.CLI.setColor("Failed!", nktj_cli_1.Color.Red));
            return;
        }
        // mkdir
        const buildDir = rootDir + "/output";
        this.outMkdir(buildDir);
        for (let n = 0; n < option.platforms.length; n++) {
            // platforms building 
            let platform = option.platforms[n];
            if (platform.disable)
                continue;
            if (!platform.build)
                platform.build = BuildType.WebBuilder;
            if (!platform.buildType)
                platform.buildType = BuildPlatformType.Web;
            let platformOptionClass;
            try {
                const pbName = "Platform" + platform.buildType.substring(0, 1).toUpperCase() + platform.buildType.substring(1);
                const pbModuleName = "mikeneko-platform-" + platform.buildType;
                const pbPath = require.resolve(pbModuleName);
                const pb_ = require(pbModuleName);
                if (pb_[pbName]) {
                    platformOptionClass = pb_[pbName];
                    platformOptionClass.__dirname = pbPath;
                }
            }
            catch (error) { }
            if (platformOptionClass) {
                const p_ = platformOptionClass.handleBuildBegin(platform);
                if (p_)
                    platform = p_;
            }
            let buildhandle = mikeneko_1.BuildHandle;
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
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "platform = " + platform.name + ", buildType = " + platform.buildType);
            // create platform directory
            let platformDir = buildDir + "/" + platform.name;
            if (platform.optionDir)
                platformDir += "/" + platform.optionDir;
            if (platform.build == BuildType.WebPack) {
                this.buildWebPack(platformDir, option.tscType, platform, platformOptionClass, buildhandle);
                return;
            }
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
            this.BuildCoreList.forEach((core) => {
                // core module mount
                this.coreModuleMount(codeList, tsType, core);
            });
            if (platformOptionClass) {
                const addModule = (name, modulePath) => {
                    if (!modulePath)
                        modulePath = name;
                    console.log("# core module mount".padEnd(20) + " " + name);
                    const fullPath = path.dirname(platformOptionClass.__dirname) + "/dist/" + tsType + "/" + modulePath + ".js";
                    let contents = fs.readFileSync(fullPath).toString();
                    contents = "var exports = {};\n" + contents + ";\nreturn exports;";
                    codeList[name] = this.setFn(name, contents, true);
                };
                platformOptionClass.handleCoreModuleMount(addModule);
            }
            // core resource mount
            this.coreResourceMount(codeList, rootDir);
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
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "write index.html");
            let indexHTML = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
            if (platformOptionClass) {
                const htmlBuffer = platformOptionClass.handleCreateIndexHTML();
                if (htmlBuffer)
                    indexHTML = htmlBuffer;
            }
            fs.writeFileSync(platformDir + "/index.html", indexHTML);
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Web Build Comlete.");
            if (platformOptionClass) {
                platformOptionClass.handleWebBuildCompleted(platform);
            }
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "........ platform = " + platform.name + " ok");
            // build handle platform  complete
            buildhandle.handleComplete(platform);
        }
        nktj_cli_1.CLI.br();
        nktj_cli_1.CLI.outn("...... Complete!", nktj_cli_1.Color.Green);
    }
    static jsStart(codeList, tsType, platformName, debugMode) {
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "build Start");
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
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mount core".padEnd(20) + " " + name);
        const fullPath = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js";
        let contents = fs.readFileSync(fullPath).toString();
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        codeList[name] = this.setFn(name, contents, true);
    }
    static coreResourceMount(codeList, tsType) {
        const targetPath = path.dirname(__dirname) + "/bin/res";
        this.search(targetPath, (file) => {
            const fullPath = file.path + "/" + file.name;
            let basePath = "CORERES/" + fullPath.substring((targetPath + "/").length);
            basePath = basePath.split("\\").join("/");
            basePath = basePath.split("//").join("/");
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            codeList[basePath] = this.setFn(basePath, "\"" + contentB64 + "\"");
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mount coreres".padEnd(20) + " " + basePath);
        });
    }
    static localModuleMount(codeList, rootDir, platformName) {
        let targetPaths = [
            rootDir + "/dist/src/app",
            rootDir + "/dist/src_" + platformName + "/app",
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
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mount local".padEnd(20) + " " + basePath);
            });
        });
        return strs;
    }
    static jsEnd(codeList) {
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "build End");
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
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mount localres".padEnd(20) + " " + basePath);
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
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mount render".padEnd(20) + " " + basePath);
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
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "TranceComplieType = " + tsType);
        nktj_cli_1.CLI.out(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Trance Complie...");
        (0, child_process_1.execSync)("tsc --pretty");
        nktj_cli_1.CLI.out("OK").br();
        return tsType;
    }
    static outMkdir(rootDir, alreadyDeleted) {
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mkdir " + rootDir);
        if (alreadyDeleted) {
            if (fs.existsSync(rootDir)) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "already directory .... clear");
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
    static buildWebPack(platformDir, tscType, platform, platformOptionClass, buildhandle) {
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "webpack build..");
        this.setWebPackDist(platformDir, tscType);
        this.setWebpackComponent(platformDir);
        try {
            console.log((0, child_process_1.execSync)("cd output/" + platform.name + " && webpack").toString());
        }
        catch (error) {
            console.log(error.stdout.toString());
        }
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "write index.html");
        let indexHTML = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
        if (platformOptionClass) {
            const htmlBuffer = platformOptionClass.handleCreateIndexHTML();
            if (htmlBuffer)
                indexHTML = htmlBuffer;
        }
        fs.writeFileSync(platformDir + "/www/index.html", indexHTML);
        nktj_cli_1.CLI.outn(".....EXIT!");
    }
    static setWebPackDist(platformDir, tscType) {
        const distDir = platformDir + "/dist";
        if (fs.existsSync(distDir)) {
            let lists = fs.readdirSync(distDir, { recursive: true });
            for (let n = 0; n < lists.length; n++) {
                const l_ = distDir + "/" + lists[n];
                if (fs.statSync(l_).isFile())
                    fs.unlinkSync(l_);
            }
        }
        else {
            fs.mkdirSync(distDir);
        }
        this.BuildCoreList.push("FrontWebPack");
        for (let n = 0; n < this.BuildCoreList.length; n++) {
            const coreName = this.BuildCoreList[n];
            fs.copyFileSync(path.dirname(__dirname) + "/dist/" + tscType + "/" + coreName + ".js", distDir + "/" + coreName + ".js");
        }
        // CORERES set
        if (!fs.existsSync(distDir + "/CORERES")) {
            fs.mkdirSync(distDir + "/CORERES");
        }
        const coreresDir = path.dirname(__dirname) + "/bin/res";
        const coreresLIsts = fs.readdirSync(coreresDir, { recursive: true });
        for (let n = 0; n < coreresLIsts.length; n++) {
            const l_ = coreresLIsts[n];
            const fulll_ = coreresDir + "/" + coreresLIsts[n];
            if (fs.statSync(fulll_).isDirectory()) {
                if (!fs.existsSync(distDir + "/CORERES/" + l_)) {
                    fs.mkdirSync(distDir + "/CORERES/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/CORERES/" + l_);
            }
        }
        // app list set
        if (!fs.existsSync(distDir + "/app")) {
            fs.mkdirSync(distDir + "/app");
        }
        const appDistDir = path.dirname(path.dirname(platformDir)) + "/dist/src/app";
        const appLists = fs.readdirSync(appDistDir, { recursive: true });
        for (let n = 0; n < appLists.length; n++) {
            const l_ = appLists[n];
            const fulll_ = appDistDir + "/" + appLists[n];
            if (fs.statSync(fulll_).isDirectory()) {
                if (!fs.existsSync(distDir + "/app/" + l_)) {
                    fs.mkdirSync(distDir + "/app/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/app/" + l_);
            }
        }
        // rendering set
        if (!fs.existsSync(distDir + "/rendering")) {
            fs.mkdirSync(distDir + "/rendering");
        }
        const renderingDir = path.dirname(path.dirname(platformDir)) + "/src/rendering";
        const renderingLists = fs.readdirSync(renderingDir, { recursive: true });
        for (let n = 0; n < renderingLists.length; n++) {
            const l_ = renderingLists[n];
            const fulll_ = renderingDir + "/" + renderingLists[n];
            if (fs.statSync(fulll_).isDirectory()) {
                if (!fs.existsSync(distDir + "/rendering/" + l_)) {
                    fs.mkdirSync(distDir + "/rendering/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/rendering/" + l_);
            }
        }
        // resource set
        if (!fs.existsSync(distDir + "/resource")) {
            fs.mkdirSync(distDir + "/resource");
        }
        const resourceDir = path.dirname(path.dirname(platformDir)) + "/src/resource";
        const resourceLIsts = fs.readdirSync(resourceDir, { recursive: true });
        for (let n = 0; n < resourceLIsts.length; n++) {
            const l_ = resourceLIsts[n];
            const fulll_ = resourceDir + "/" + resourceLIsts[n];
            if (fs.statSync(fulll_).isDirectory()) {
                if (!fs.existsSync(distDir + "/resource/" + l_)) {
                    fs.mkdirSync(distDir + "/resource/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/resource/" + l_);
            }
        }
    }
    static setWebpackComponent(platformDir) {
        let str = "export const WebPackComponent = {\n";
        const list = fs.readdirSync(platformDir + "/dist", { recursive: true });
        for (let n = 0; n < list.length; n++) {
            const dirBase = platformDir + "/dist/" + list[n];
            if (fs.statSync(dirBase).isDirectory())
                continue;
            const dir = (dirBase).split("\\").join("/");
            let dirPath = dir.substring((platformDir + "/dist/").length);
            if (path.extname(dirPath) === ".js") {
                dirPath = dirPath.replace(/(\.[\w\d]+)$/i, '');
            }
            str += "\"" + dirPath + "\" : require(\"" + dirPath + "\"),\n";
        }
        str += "};";
        fs.writeFileSync(platformDir + "/dist/WebPackComponent.js", str);
        nktj_cli_1.CLI.outn("# set webpack components");
        if (!fs.existsSync(platformDir + "/webpack.config.js")) {
            nktj_cli_1.CLI.outn("# make webpack.config.js");
        }
        if (!fs.existsSync(platformDir + "/custom-loader.js")) {
            nktj_cli_1.CLI.outn("# make custom-loader.js");
        }
    }
}
exports.Builder = Builder;
Builder.BuildCoreList = [
    "Ajax",
    "App",
    "Background",
    "Controller",
    "Data",
    "Dialog",
    "VirtualDom",
    "Exception",
    "KeyEvent",
    "Response",
    "Routes",
    "Render",
    "Startor",
    "Storage",
    "Shortcode",
    "Template",
    "Lib",
    "Validation",
    "View",
    "UI",
    "Core",
];
