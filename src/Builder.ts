import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import * as UglifyJS  from "uglify-js";
import * as strip from "strip-comments";
import { execSync } from "child_process";
import * as obfucator from "javascript-obfuscator";
import { BuildHandle } from "mikeneko";
import { PlatformBase } from "mikeneko/src/PlatformBase";
import { CLI, Color } from "nktj_cli";

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

    disable? : boolean,

    /**
     * ***name*** : platform name
     */
    name? : string,

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

    public static build(option? : BuildOption) {
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
            if (option.tranceComplied) tsType = this.typescriptComplie(rootDir);
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
                 this.coreModuleMount(codeList, tsType, core);
             });

             if (platformOptionClass) {
                const addModule = (name : string, modulePath? : string) => {
                    if (!modulePath) modulePath = name;
                    console.log("# core module mount".padEnd(20) + " " + name);
                    const fullPath : string = path.dirname(platformOptionClass.__dirname) + "/dist/" + tsType + "/" + modulePath + ".js"; 
                    let contents : string = fs.readFileSync(fullPath).toString() ;
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

    private static setFn(name : string,  content, rawFlg? : boolean) {
        if (rawFlg) {
            return "sfa.setFn(\"" + name + "\", ()=>{" + content + "});\n";
        }
        else {
            return "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});\n";
        }
    }

    private static coreModuleMount(codeList : {[name : string] : string}, tsType : string, name : string) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "mount core".padEnd(20) + " " + name);
        const fullPath : string = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js"; 
        let contents : string = fs.readFileSync(fullPath).toString() ;
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        codeList[name] = this.setFn(name, contents, true);
    }

    private static coreResourceMount(codeList : {[name : string] : string}, tsType : string) {
        const targetPath = path.dirname(__dirname) + "/bin/res";
        this.search(targetPath, (file) => {
            const fullPath = file.path + "/" + file.name;
            let basePath = "CORERES/"+ fullPath.substring((targetPath + "/").length);
            basePath = basePath.split("\\").join("/");
            basePath = basePath.split("//").join("/");
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            codeList[basePath] = this.setFn(basePath,  "\"" + contentB64 + "\"") ;
            CLI.outn(CLI.setColor("# ", Color.Green) + "mount coreres".padEnd(20) + " " + basePath);
        });
    }

    private static localModuleMount(codeList : {[name : string] : string}, rootDir : string, platformName : string) {
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
                codeList[basePath] = this.setFn(basePath, contents, true);
                CLI.outn(CLI.setColor("# ", Color.Green) + "mount local".padEnd(20) +" " + basePath);
            });
        });
        return strs;
    }

    private static jsEnd(codeList : {[name : string] : string}) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "build End");
        codeList.___FOOTER = "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }

    private static resourceContentMount(codeList : {[name : string] : string}, rootDir : string, platformName : string) {
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
                codeList[basePath] = this.setFn(basePath,  "\"" + mimeType + "|" + contentB64 + "\"") ;
                CLI.outn(CLI.setColor("# ", Color.Green) + "mount localres".padEnd(20) + " " + basePath);
            });
        });
        return strs;
    }

    private static renderingHtmMount(codeList : {[name : string] : string}, rootDir : string, platformName : string) {
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
                codeList[basePath] = this.setFn(basePath, "\"" +  contentB64 + "\";");
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

    private static typescriptComplie(rootDir : string) : string {
        let tsType = "es6";
        tsType = this.getTsType(rootDir);
        if (!tsType) tsType = "es6";
        CLI.outn(CLI.setColor("# ", Color.Green) + "TranceComplieType = " + tsType);
        CLI.out(CLI.setColor("# ", Color.Green) + "Trance Complie...");
        execSync("tsc --pretty");
        CLI.out("OK").br();
        return tsType;
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
}