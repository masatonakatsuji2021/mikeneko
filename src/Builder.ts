import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";
import * as UglifyJS  from "uglify-js";
import * as strip from "strip-comments";
import { execSync } from "child_process";

export interface BuildOption {
    platforms? :  Array<BuildPlatrom>,
    codeCompress? : boolean,
    tranceComplied? : boolean,
    resourceCached? : boolean,
    resourceMaxsize? : number,
}

export interface BuildPlatrom {
    type : "web" | "android" | "ios" | "windows",
    name? : string,
    path?: string,
    handleBuildStart? : (platform : BuildPlatrom) => void,
    handleBuildEnd? : (platform : BuildPlatrom) => void,
}

export class Builder {

    public static build(option? : BuildOption) {
        if (!option) {
            option = {
                platforms : [ { type: "web" } ]
            };
        }

        if (option.tranceComplied == undefined) option.tranceComplied = true;
        if (option.resourceCached == undefined) option.resourceCached = true;
        if (option.resourceMaxsize == undefined) option.resourceMaxsize = -1;

        console.log("saiberian build start");
        const rootDir : string = process.cwd();

        let tsType = "es6";
        if (option.tranceComplied) {
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
        }
        else {
            console.log("# TranceComplieType = " + tsType);
        }

        const buildDir : string = rootDir + "/output";
        this.outMkdir(buildDir);

        for (let n = 0 ; n < option.platforms.length ; n++) {
            const platform = option.platforms[n];
            if (!platform.name) platform.name = platform.type;
            if (!platform.path) platform.path = platform.type;

            if (platform.handleBuildStart) platform.handleBuildStart(platform);

            console.log("# platform = " + platform.name);
            let coreStr : string = "";

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
            coreStr += this.resourceContentMount(rootDir, platform.name);

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

            if (platform.handleBuildEnd) platform.handleBuildEnd(platform);
        }

        console.log("#");
        console.log("# ...... Complete!");
    }

    private static jsStart(tsType : string, platformName : string){
        console.log("# build Start");
        let content =  fs.readFileSync(path.dirname(__dirname) + "/dist/" + tsType + "/Front.js").toString();
        content = content.split("{{platform}}").join(platformName);
        return content;
    }

    private static setFn(name : string,  content, rawFlg? : boolean) {
        if (rawFlg) {
            return "sfa.setFn(\"" + name + "\", ()=>{" + content + "});";
        }
        else {
            return "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});";
        }
    }

    private static coreModuleMount(tsType : string, name : string) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath : string = path.dirname(__dirname) + "/dist/" + tsType + "/" + name + ".js"; 
        let contents : string = fs.readFileSync(fullPath).toString() ;
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        return this.setFn(name, contents, true);
    }

    private static localModuleMount(rootDir : string, platformName : string) {
        let targetPaths = [
            rootDir + "/src/app",
            rootDir + "/src_" + platformName + "/app",
        ];

        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                if (file.isDirectory()) return;
                if (path.extname(file.name) != ".js") return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "app/" + file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                let contents : string = fs.readFileSync(fullPath).toString() ;
                contents = "var exports = {};\n" + contents + ";\nreturn exports;";
                strs += this.setFn(basePath, contents, true);
                console.log("# local module".padEnd(30) +" " + basePath);
            });
        });
        return strs;
    }

    private static jsEnd() {
        console.log("# build End");
        return "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }

    private static resourceContentMount(rootDir : string, platformName : string) {
        let targetPaths = [
            rootDir + "/src/resource",
            rootDir + "/src_" + platformName + "/resource",
        ];

        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                if (file.isDirectory()) return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "resource/"+ fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                const mimeType = mime.lookup(basePath);
                strs += this.setFn(basePath,  "\"" + mimeType + "|" + contentB64 + "\"");
                console.log("# resource content mount ".padEnd(30) + " " + basePath);
            });
        });
        return strs;
    }

    private static renderingHtmMount(rootDir : string, platformName : string) {
        let targetPaths = [
            rootDir + "/src/rendering",
            rootDir + "/src_" + platformName + "/rendering",
        ];
        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                if (file.isDirectory()) return;
                const fullPath = file.path + "/" + file.name;
                let  basePath = "rendering/" + fullPath.substring((targetPath + "/").length);
                basePath = basePath.split("\\").join("/");
                basePath = basePath.split("//").join("/");
                const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
                strs += this.setFn(basePath, "\"" +  contentB64 + "\";");
                console.log("# render html  mount".padEnd(30) + " "+ basePath);
            });            
        });
        return strs;
    }

    private static search(target : string, callback) {
        if (!fs.existsSync(target)) return;
        if (!fs.statSync(target).isDirectory()) return;
        const list = fs.readdirSync(target, {
            withFileTypes: true,
            recursive: true,
        });
        for (let n = 0 ; n < list.length ; n++) {
            callback(list[n]);
        }
    }

    private static outMkdir(rootDir : string){
        let dirExists : boolean = false;
        if (fs.existsSync(rootDir)) {
            if (fs.statSync(rootDir).isDirectory()){
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

    private static codeCompress(code : string) {
        // Delete comment
        console.log("# delete commentout...");
        const strippedCode = strip(code);
        // Compress JavaScript code
        console.log("# code compress...");
        const result = UglifyJS.minify(strippedCode);
        if (result.error) throw result.error;
        return result.code;
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