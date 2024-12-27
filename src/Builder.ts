import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import * as UglifyJS  from "uglify-js";
import * as strip from "strip-comments";
import { exec, execSync } from "child_process";
import * as obfucator from "javascript-obfuscator";
import { BuildHandle } from "mikeneko";
import { PlatformBase } from "mikeneko/src/PlatformBase";
import { CLI, Color } from "nktj_cli";

export enum BuildType {

    WebBuilder = "webBuilder",

    webpack = "webpack",
}

export interface BuildOption {

    /**
     * ***debug*** : debug mode.
     */
    debug? : boolean,

    /**
     * ***rootDir*** : Root Directory.
     */
    rootDir? : string,

    /**
     * ***platforms*** : Platform specific settings.
     */
    platforms? :  Array<BuildPlatform>,

    /**
     * ***codeCompress*** : code compress.
     */
    codeCompress? : boolean,

    /**
     * ***tranceComplied*** : Tyepscript trance complie.
     */
    tranceComplied? : boolean,

    tscType? : string,

    /**
     * ***obfuscated*** : javascript obfuscate.
     */
    obfuscated? : boolean,
}

export enum BuildPlatformType {

    /** Web */
    Web = "web",

    /** Cordova */
    Cordova = "cordova",

    /** Capacitor */
    Capacitor = "capacitor",

    /** Electro */
    Electron = "electron",
}

export interface BuildPlatform {

    /**
     * ***disable*** : If you set this to true, the build will not include it.
     */
    disable? : boolean,

    /**
     * ***name*** : platform name
     */
    name? : string,

    /**
     * ***build*** : build type
     */
    build?: BuildType,

    /**
     * ***buildType*** : 
     */
    buildType? : BuildPlatformType,

    path?: string,

    outPath? : string,

    /**
     * ***debug*** : debug mode
     */
    debug? : boolean,
    
    /**
     * ***codeCompress*** : code compress.
     */
    codeCompress? : boolean,

    /**
     * ***outOptionDir*** : output option directory
     */
    optionDir?: string,

    /**
     * ***obfuscated*** : javascript obfuscate.
     */
    obfuscated? : boolean,

    /**
     * ***mapping*** : Enable source mapping with browsers like Chrome.
     */
    mapping?: boolean,
}

export class Builder {

    private static BuildCoreList : Array<string> = [
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

    public static async build(option? : BuildOption) {
        const argsOption = CLI.getArgsOPtion();
        if (argsOption["platform"] || argsOption["p"]) {

            let selectPlatform : string;
            if (argsOption["platform"]) selectPlatform = argsOption["platform"];
            if (argsOption["p"]) selectPlatform = argsOption["p"];

            for(let n = 0 ; n< option.platforms.length ; n++) {
                const platform = option.platforms[n];
                if (platform.name != selectPlatform) {
                    platform.disable = true;
                }
            }
        }

        if (!option) option = {};
        if (option.debug == undefined) option.debug = false;
        if (option.rootDir == undefined) option.rootDir = process.cwd();
        if (option.tranceComplied == undefined) option.tranceComplied = true;
        if (option.platforms == undefined) option.platforms = [ { name: "web" } ];

        CLI.outn("** mikeneko build start **");
        const rootDir : string = option.rootDir;

        // typescript trance complie
        let tsType : string = "es6";
        try {
            if (option.tranceComplied) {
                option.tscType = tsType;
                tsType = await this.typescriptComplie(rootDir);
            }
        } catch (error) {
            CLI.outn("[TypeScript TrancePlie Error]", Color.Red);
            CLI.outn(error.stdout.toString());
            CLI.outn("...... " + CLI.setColor("Failed!", Color.Red));
            return;
        }

        // mkdir
        const buildDir : string = rootDir + "/output";
        this.outMkdir(buildDir);

        for (let n = 0 ; n < option.platforms.length ; n++) {
            // platforms building 
            let platform = option.platforms[n];
            if (platform.disable) continue;

            if (!platform.build) platform.build = BuildType.WebBuilder;

            if (!platform.buildType) platform.buildType = BuildPlatformType.Web;

            let platformOptionClass : typeof PlatformBase;
            try {
                const pbName = "Platform" + platform.buildType.substring(0,1).toUpperCase() + platform.buildType.substring(1);
                const pbModuleName = "mikeneko-platform-" + platform.buildType;
                const pbPath = require.resolve(pbModuleName);
                const pb_ = require(pbModuleName);
                if (pb_[pbName]) {
                    platformOptionClass = pb_[pbName];
                    platformOptionClass.__dirname = pbPath;
                }
            } catch(error) { }

            if (platformOptionClass) {
                const p_ = platformOptionClass.handleBuildBegin(platform);
                if (p_) platform = p_;
            }

            let buildhandle : typeof BuildHandle = BuildHandle;
            try {
                buildhandle = require(rootDir + "/src/BuildHandle").BuildHandle;
            }catch(error){}
            if (!buildhandle) {
                try {
                    buildhandle = require(rootDir + "/src_" + platform.name + "/BuildHandle").BuildHandle;
                }catch(error){}    
            }
            
            CLI.outn(CLI.setColor("# ", Color.Green) + "platform = " + platform.name + ", buildType = " + platform.buildType);
          
            // create platform directory
            let platformDir : string = buildDir + "/" + platform.name;
            if (platform.optionDir) platformDir += "/" + platform.optionDir;

            if (platform.build == BuildType.webpack) {
                this.buildWebPack(platformDir, option.tscType, platform, platformOptionClass, buildhandle);
                return;
            }

            this.outMkdir(platformDir, true);

            platform.outPath = platformDir;
            platform.path = buildDir + "/" + platform.name;

            // build handle begin
            buildhandle.handleBegin(platform);

            // code set
            let codeList : {[name : string] : string} = {};

            // start head
            let debug :boolean = option.debug;
            if (platform.debug != undefined) debug = platform.debug;                
            this.jsStart(codeList, tsType, platform.name, debug);

            // core module mount
            this.BuildCoreList.forEach((core : string) => {
                 // core module mount
                 this.coreModuleMount(codeList, tsType, core, platform);
             });

             if (platformOptionClass) {
                const addModule = (name : string, modulePath? : string) => {
                    if (!modulePath) modulePath = name;
                    console.log("# core module mount".padEnd(20) + " " + name);
                    const fullPath : string = path.dirname(platformOptionClass.__dirname) + "/dist/" + tsType + "/" + modulePath + ".js"; 
                    let contents : string = fs.readFileSync(fullPath).toString() ;
                    contents = "var exports = {};\n" + contents + ";\nreturn exports;";
                    codeList[name] = this.setFn(name, contents, true, platform);
                };
                platformOptionClass.handleCoreModuleMount(addModule);
             }

             // core resource mount
             this.coreResourceMount(codeList, platform);

            // local module mount
            this.localModuleMount(codeList, rootDir, platform.name, platform);

            // rendering html mount
            this.renderingHtmMount(codeList, rootDir, platform.name, platform);

            // public content mount
            this.resourceContentMount(codeList, rootDir, platform.name, platform);

            // end foot
            this.jsEnd(codeList, platform);

            let coreStr : string = Object.values(codeList).join("");

            // code compress
            let codeCompress : boolean = option.codeCompress;
            if (platform.codeCompress != undefined) codeCompress = platform.codeCompress;
            if (codeCompress) coreStr = this.codeCompress(coreStr);

            // code obfuscated
            let obfuscated : boolean = option.obfuscated;
            if (platform.obfuscated != undefined) obfuscated = platform.obfuscated;
            if (obfuscated) coreStr = this.codeObfuscate(coreStr);
            
            CLI.outn(CLI.setColor("# ", Color.Green) + "write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
    
            CLI.outn(CLI.setColor("# ", Color.Green) + "write index.html");
            let indexHTML : string = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
            if (platformOptionClass) {
                const htmlBuffer = platformOptionClass.handleCreateIndexHTML();
                if (htmlBuffer) indexHTML = htmlBuffer;
            }
            fs.writeFileSync(platformDir + "/index.html", indexHTML);
    
            CLI.outn(CLI.setColor("# ", Color.Green) + "Web Build Comlete.");

            if (platformOptionClass) {
                platformOptionClass.handleWebBuildCompleted(platform);
            }

            CLI.outn(CLI.setColor("# ", Color.Green) + "........ platform = " + platform.name + " ok");

            // build handle platform  complete
            buildhandle.handleComplete(platform);
        }

        CLI.br();
        CLI.outn("...... Complete!", Color.Green);
    }

    private static jsStart(codeList: {[name : string] : string}, tsType : string, platformName : string, debugMode : boolean){
        CLI.outn(CLI.setColor("# ", Color.Green) + "build Start");
        let content =  fs.readFileSync(path.dirname(__dirname) + "/dist/" + tsType + "/Front.js").toString();
        content = content.split("{{platform}}").join(platformName);
        if (!debugMode) content += "console.log=()=>{};\n"
        codeList.___HEADER = content;
    }

    private static setFn(name : string,  content, rawFlg : boolean, platform : BuildPlatform) {
        let afterContent : string;
        if (rawFlg) {
            afterContent = "sfa.setFn(\"" + name + "\", ()=>{" + content + "});\n";
        }
        else {
            afterContent = "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});\n";
        }

        if (platform.mapping) {
            afterContent = this.contentEvalReplace(afterContent);
            if (name.indexOf("app/") === -1 && name.indexOf("rendering") === -1 && name.indexOf("resource") === -1) {
                name = "libs/" + name;
            }
            else {
                name = "src/" + name;
            }
            afterContent += "//# sourceURL=mikeneko:///" + name;
            return "eval(\"" + afterContent + "\");\n";
        }

        return afterContent;
    }

    private static contentEvalReplace(content: string) {
        content = content.replace(/\\/g, '\\\\');
        content = content.replace(/\r/g, '\\r');
        content = content.replace(/\n/g, '\\n');
        content = content.replace(/\'/g, "\\'");
        content = content.replace(/\"/g, '\\"');
        content = content.replace(/\`/g, '\\`');
        return content;
    }

    private static coreModuleMount(codeList : {[name : string] : string}, tsType : string, name : string, platform : BuildPlatform) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "mount core".padEnd(20) + " " + name);
        const fullPath : string = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js"; 
        let contents : string = fs.readFileSync(fullPath).toString() ;
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        codeList[name] = this.setFn(name, contents, true, platform);
    }

    private static coreResourceMount(codeList : {[name : string] : string}, platform : BuildPlatform) {
        const targetPath = path.dirname(__dirname) + "/bin/res";
        this.search(targetPath, (file) => {
            const fullPath = file.path + "/" + file.name;
            let basePath = "CORERES/"+ fullPath.substring((targetPath + "/").length);
            basePath = basePath.split("\\").join("/");
            basePath = basePath.split("//").join("/");
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            codeList[basePath] = this.setFn(basePath,  "\"" + contentB64 + "\"", false, platform) ;
            CLI.outn(CLI.setColor("# ", Color.Green) + "mount coreres".padEnd(20) + " " + basePath);
        });
    }

    private static localModuleMount(codeList : {[name : string] : string}, rootDir : string, platformName : string, platform : BuildPlatform) {
        let targetPaths = [
            rootDir + "/dist/src/app",
            rootDir + "/dist/src_" + platformName + "/app",
        ];

        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                if (path.extname(file.name) != ".js") return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "app/" + file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                let contents : string = fs.readFileSync(fullPath).toString() ;
                contents = "var exports = {};\n" + contents + ";\nreturn exports;";                
                codeList[basePath] = this.setFn(basePath, contents, true, platform);
                CLI.outn(CLI.setColor("# ", Color.Green) + "mount local".padEnd(20) +" " + basePath);
            });
        });
        return strs;
    }

    private static jsEnd(codeList : {[name : string] : string}, platform : BuildPlatform) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "build End");
        codeList.___FOOTER = "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }

    private static resourceContentMount(codeList : {[name : string] : string}, rootDir : string, platformName : string, platform : BuildPlatform ) {
        let targetPaths = [
            rootDir + "/src/resource",
            rootDir + "/src_" + platformName + "/resource",
        ];

        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                const fullPath = file.path + "/" + file.name;
                let basePath = "resource/"+ fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                const mimeType = mime.lookup(basePath);
                let plstr = "";
                if (targetPath != rootDir + "/src/resource") {
                    plstr = "(" + platformName + ")";
                }
                codeList[basePath] = this.setFn(basePath,  "\"" + mimeType + "|" + contentB64 + "\"", false, platform) ;
                CLI.outn(CLI.setColor("# ", Color.Green) + "mount localres".padEnd(20) + " " + basePath);
            });
        });
        return strs;
    }

    private static renderingHtmMount(codeList : {[name : string] : string}, rootDir : string, platformName : string, platform: BuildPlatform) {
        let targetPaths = [
            rootDir + "/src/rendering",
            rootDir + "/src_" + platformName + "/rendering",
        ];
        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                const fullPath = file.path + "/" + file.name;
                let  basePath = "rendering/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                let plstr = "";
                if (targetPath != rootDir + "/src/rendering"){
                    plstr = "(" + platformName + ")";
                }
                codeList[basePath] = this.setFn(basePath, "\"" +  contentB64 + "\";", false , platform);
                CLI.outn(CLI.setColor("# ", Color.Green) + "mount render".padEnd(20) + " "+ basePath);
            });            
        });
        return strs;
    }

    private static search(target : string, callback) {
        if (!fs.existsSync(target)) return;
        if (!fs.statSync(target).isDirectory()) return;
        const list = fs.readdirSync(target, {
            withFileTypes: true,
        });
        for (let n = 0 ; n < list.length ; n++) {
            const l_ = list[n];
            if (l_.isDirectory()) {
                this.search(target + "/" + l_.name, callback);
            }
            else {
                // node.js v14 under support.
                const file : any = l_;
                file.path = target;
                callback(l_);
            }
        }
    }

    private static async typescriptComplie(rootDir : string) : Promise<string> {
        let tsType = "es6";
        tsType = this.getTsType(rootDir);
        if (!tsType) tsType = "es6";
        CLI.outn(CLI.setColor("# ", Color.Green) + "TranceComplieType = " + tsType);
        CLI.wait(CLI.setColor("# ", Color.Green) + "Trance Complie...");
        return new Promise((resolve, reject) => {
            exec("tsc --pretty", (error, stdout, stderr)=>{
                if (error) return reject(error);
                if (stderr) return reject(stderr);
                CLI.waitClose("OK").br();
                resolve(tsType);
            });
        });
    }

    private static outMkdir(rootDir : string, alreadyDeleted? : boolean) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "mkdir " + rootDir);
        if (alreadyDeleted) {
            if (fs.existsSync(rootDir)) {
                CLI.outn(CLI.setColor("# ", Color.Green) + "already directory .... clear");
                fs.rmSync(rootDir, {
                    recursive: true,
                });
            }    
        }
        fs.mkdirSync(rootDir, {
            recursive: true,
        });
    }

    private static codeCompress(code : string) {
        // Delete comment
        console.log("# code compress ... ");
        console.log("# delete commentout...");
        const strippedCode = strip(code);
        // Compress JavaScript code
        console.log("# code compress...");
        const result = UglifyJS.minify(strippedCode);
        if (result.error) throw result.error;
        return result.code;
    }

    private static codeObfuscate(code : string) {
        console.log("# code obfuscate .... ");
        code = obfucator.obfuscate(code).getObfuscatedCode();
        return code;
    }

    private static getTsType(rootDir : string) : string {
        let tsConfig, tsType;
        try {
            tsConfig = require(rootDir + "/tsconfig.json");
            if (!tsConfig.compilerOptions) return;
            if (!tsConfig.compilerOptions.target) return;
            tsType = tsConfig.compilerOptions.target;
        }catch(error){
            return;
        }
        return tsType;
    }

    private static buildWebPack(platformDir : string, tscType : string, platform : BuildPlatform, platformOptionClass : typeof PlatformBase, buildhandle : typeof BuildHandle) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "webpack build..");

        this.setWebPackDist(platformDir, tscType);

        this.setWebpackComponent(platformDir);

        try {
            console.log(execSync("cd output/" + platform.name + " && webpack",).toString());
        } catch(error){
            console.log(error.stdout.toString());
        }

        CLI.outn(CLI.setColor("# ", Color.Green) + "write index.html");
        let indexHTML : string = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
        if (platformOptionClass) {
            const htmlBuffer = platformOptionClass.handleCreateIndexHTML();
            if (htmlBuffer) indexHTML = htmlBuffer;
        }
        fs.writeFileSync(platformDir + "/www/index.html", indexHTML);

        CLI.outn(".....EXIT!");
    }

    private static setWebPackDist(platformDir : string, tscType : string) {

        if (!fs.existsSync(platformDir)){
            CLI.outn(CLI.setColor("# ", Color.Green) + "mkdir " + platformDir);
            fs.mkdirSync(platformDir);
        }

        const distDir = platformDir + "/dist";
        if (fs.existsSync(distDir)){
            let lists = fs.readdirSync(distDir, {recursive : true});
            for (let n = 0 ; n < lists.length ;n++) {
                const l_ = distDir + "/" + lists[n];
                if (fs.statSync(l_).isFile()) fs.unlinkSync(l_);
            }
        }
        else {
            fs.mkdirSync(distDir);
        }

        this.BuildCoreList.push("FrontWebPack");

        // core library set
        if (!fs.existsSync(distDir + "/core")){
            fs.mkdirSync(distDir + "/core");
        }

        for (let n = 0 ; n < this.BuildCoreList.length ; n++){
            const coreName = this.BuildCoreList[n];
            fs.copyFileSync(path.dirname(__dirname) + "/dist/" + tscType + "/" + coreName + ".js", distDir + "/core/" + coreName + ".js");
        }

        // CORERES set
        if (!fs.existsSync(distDir + "/CORERES")){
            fs.mkdirSync(distDir + "/CORERES");
        }
        const coreresDir = path.dirname(__dirname) + "/bin/res";
        const coreresLIsts = fs.readdirSync(coreresDir, { recursive : true });
        for (let n = 0 ; n < coreresLIsts.length ; n++){
            const l_  = coreresLIsts[n];
            const fulll_ = coreresDir + "/" + coreresLIsts[n];
            if (fs.statSync(fulll_).isDirectory()){
                if (!fs.existsSync(distDir + "/CORERES/" + l_)){
                    fs.mkdirSync(distDir + "/CORERES/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/CORERES/" + l_);
            }
        }


        // app list set
        
        if (!fs.existsSync(distDir + "/app")){
            fs.mkdirSync(distDir + "/app");
        }
        const appDistDir = path.dirname(path.dirname(platformDir)) + "/dist/src/app";
        const appLists = fs.readdirSync(appDistDir, { recursive : true });
        for (let n = 0 ; n < appLists.length ; n++){
            const l_  = appLists[n];
            const fulll_ = appDistDir + "/" + appLists[n];
            if (fs.statSync(fulll_).isDirectory()){
                if (!fs.existsSync(distDir + "/app/" + l_)){
                    fs.mkdirSync(distDir + "/app/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/app/" + l_);
            }
        }


        // rendering set
        if (!fs.existsSync(distDir + "/rendering")){
            fs.mkdirSync(distDir + "/rendering");
        }

        const renderingDir = path.dirname(path.dirname(platformDir)) + "/src/rendering";
        const renderingLists = fs.readdirSync(renderingDir, { recursive : true });
        for (let n = 0 ; n < renderingLists.length ; n++){
            const l_  = renderingLists[n];
            const fulll_ = renderingDir + "/" + renderingLists[n];
            if (fs.statSync(fulll_).isDirectory()){
                if (!fs.existsSync(distDir + "/rendering/" + l_)){
                    fs.mkdirSync(distDir + "/rendering/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/rendering/" + l_);
            }
        }

        // resource set
        
        if (!fs.existsSync(distDir + "/resource")){
            fs.mkdirSync(distDir + "/resource");
        }
        const resourceDir = path.dirname(path.dirname(platformDir)) + "/src/resource";
        const resourceLIsts = fs.readdirSync(resourceDir, { recursive : true });
        for (let n = 0 ; n < resourceLIsts.length ; n++){
            const l_  = resourceLIsts[n];
            const fulll_ = resourceDir + "/" + resourceLIsts[n];
            if (fs.statSync(fulll_).isDirectory()){
                if (!fs.existsSync(distDir + "/resource/" + l_)){
                    fs.mkdirSync(distDir + "/resource/" + l_);
                }
            }
            else {
                fs.copyFileSync(fulll_, distDir + "/resource/" + l_);
            }
        }
    }

    private static setWebpackComponent(platformDir : string){

        if (!fs.existsSync(platformDir + "/webpack.config.js")) {
            CLI.outn("# make webpack.config.js");
            fs.copyFileSync(path.dirname(__dirname) + "/res/webpack/webpack.config.js", platformDir + "/webpack.config.js");
        }

        if (!fs.existsSync(platformDir + "/custom-loader.js")) {
            CLI.outn("# make custom-loader.js");
            fs.copyFileSync(path.dirname(__dirname) + "/res/webpack/custom-loader.js", platformDir + "/custom-loader.js");
        }

        let str : string = "export const WebPackComponent = {\n";
        const list = fs.readdirSync(platformDir + "/dist", { recursive: true });
        for(let n = 0 ; n < list.length ; n++){
            const dirBase = platformDir + "/dist/" + list[n];
            if (fs.statSync(dirBase).isDirectory()) continue;
            const dir = (dirBase).split("\\").join("/");
            let dirPath = dir.substring((platformDir + "/dist/").length);
            if (path.extname(dirPath) === ".js") {
                dirPath = dirPath.replace(/(\.[\w\d]+)$/i, '');
            }
            if (dirPath.indexOf("core/") === 0) dirPath = dirPath.substring("core/".length);
            str += "\"" + dirPath + "\" : require(\"" +  dirPath  + "\"),\n";
        }
        str += "};";
        fs.writeFileSync(platformDir + "/dist/WebPackComponent.js", str);
        CLI.outn("# set webpack components");
    }
}