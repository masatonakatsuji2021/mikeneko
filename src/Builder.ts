import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import * as UglifyJS  from "uglify-js";
import * as strip from "strip-comments";
import { execSync } from "child_process";
import * as obfucator from "javascript-obfuscator";
import { BuildHandle } from "saiberian";

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
    platforms? :  Array<BuildPlatrom>,

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

export interface BuildPlatrom {

    /**
     * ***name*** : platform name
     */
    name? : string,

    buildType? : "web" | "cordova" | "electron",

    cordova? : BuildCordova,

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

export interface BuildCordova {

    devices? : Array<"android" | "ios">,

    id? : string,

    name? : string,
}

export class Builder {

    public static build(option? : BuildOption) {
        if (!option) option = {};
        if (option.debug == undefined) option.debug = false;
        if (option.rootDir == undefined) option.rootDir = process.cwd();
        if (option.tranceComplied == undefined) option.tranceComplied = true;
        if (option.platforms == undefined) option.platforms = [ { name: "web" } ];

        console.log("saiberian build start");
        const rootDir : string = option.rootDir;

        // typescript trance complie
        let tsType : string = "es6";
        if (option.tranceComplied) tsType = this.typescriptComplie(rootDir);

        // mkdir
        const buildDir : string = rootDir + "/output";
        this.outMkdir(buildDir);

        for (let n = 0 ; n < option.platforms.length ; n++) {
            // platforms building 
            const platform = option.platforms[n];

            let buildhandle : typeof BuildHandle = BuildHandle;
            try {
                buildhandle = require(rootDir + "/src/BuildHandle").BuildHandle;
            }catch(error){}
            if (!buildhandle) {
                try {
                    buildhandle = require(rootDir + "/src_" + platform.name + "/BuildHandle").BuildHandle;
                }catch(error){}    
            }
            
            console.log("# platform = " + platform.name);

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
            const coreList : Array<string> = [
                "Ajax",
                "App", 
                "Background", 
                "Controller", 
                "Data", 
                "Dialog",
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
                "Validation",
                "View", 
                "UI", 
            ];

            coreList.forEach((core : string) => {
                 // core module mount
                 this.coreModuleMount(codeList, tsType, core);
             });

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
            
            console.log("# write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
    
            console.log("# write index.html");
            let indexHTML : string = "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"index.js\"></script></head><body></body></html>";
            if (platform.buildType == "cordova") {
                indexHTML =  "<!DOCTYPE html><head><meta charset=\"UTF-8\"><script src=\"cordova.js\"></script><script src=\"index.js\"></script></head><body></body></html>";
            }
            fs.writeFileSync(platformDir + "/index.html", indexHTML);
    
            console.log("# ........ platform = " + platform.name + " ok");

            // build handle platform  complete
            buildhandle.handleComplete(platform);
        }

        console.log("#");
        console.log("# ...... Complete!");
    }

    private static jsStart(codeList: {[name : string] : string}, tsType : string, platformName : string, debugMode : boolean){
        console.log("# build Start");
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
        console.log("# core module mount".padEnd(30) + " " + name);
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
            console.log(("# core resource mount").padEnd(30) + " " + basePath);
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
                let plstr = "";
                if (targetPath != rootDir + "/src/app") {
                    plstr = " (" + platformName + ")";
                }
                console.log(("# local module" + plstr).padEnd(30) +" " + basePath);
            });
        });
        return strs;
    }

    private static jsEnd(codeList : {[name : string] : string}) {
        console.log("# build End");
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
                console.log(("# resource mount" + plstr).padEnd(30) + " " + basePath);
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
                console.log(("# render mount" + plstr).padEnd(30) + " "+ basePath);
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
        console.log("# TranceComplieType = " + tsType);
        console.log("# Trance Complie...");
        try {
            execSync("tsc");
        }catch(error){
            console.log(error.stack);
            return;
        }
        console.log("# ..OK");
        return tsType;
    }

    private static outMkdir(rootDir : string, alreadyDeleted? : boolean) {
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