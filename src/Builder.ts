import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";

export interface BuildOption {
    platform? : {[name : string] : string},
}

export class Builder {

    public static build(option? : BuildOption) {
        if (!option) {
            option = {
                platform : {
                    normal: "normal",
                },
            };
        }

        console.log("saiberian build start");

        const rootDir : string = process.cwd();

        const buildDir : string = rootDir + "/output";
        this.outMkdir(buildDir);

        const c = Object.keys(option.platform);
        for (let n = 0 ; n < c.length ; n++) {
            const platformName = c[n];
            const platformPath = option.platform[platformName];

            console.log("# platform = " + platformName);
            let coreStr : string = "";

            const platformDir = buildDir + "/" + platformPath;
            this.outMkdir(platformDir);

            // start head
            coreStr += this.jsStart(platformName);

            // core module mount
            coreStr += this.coreModuleMount("App");
            coreStr += this.coreModuleMount("Background");
            coreStr += this.coreModuleMount("Controller");
            coreStr += this.coreModuleMount("Data");
            coreStr += this.coreModuleMount("Dom");
            coreStr += this.coreModuleMount("Exception");
            coreStr += this.coreModuleMount("KeyEvent");
            coreStr += this.coreModuleMount("Response");
            coreStr += this.coreModuleMount("Routes");
            coreStr += this.coreModuleMount("Startor");
            coreStr += this.coreModuleMount("Storage");
            coreStr += this.coreModuleMount("Template");
            coreStr += this.coreModuleMount("Util");
            coreStr += this.coreModuleMount("View");
            coreStr += this.coreModuleMount("ViewPart");

            // local module mount
            coreStr += this.localModuleMount(rootDir, platformName, platformPath);

            // public content mount
            coreStr += this.publicContentMount(rootDir, platformName, platformPath);

            // rendering html mount
            coreStr += this.renderingHtmMount(rootDir, platformName, platformPath);

            // end foot
            coreStr += this.jsEnd();

            console.log("# write index.js");
            fs.writeFileSync(platformDir + "/index.js", coreStr);
    
            console.log("# write index.html");
            fs.writeFileSync(platformDir + "/index.html", "<!DOCTYPE html><head><script src=\"index.js\"></script></head><body></body></html>");
    
            console.log("# ........ platform = " + platformName + " ok");
        }

        console.log("#");
        console.log("# ...... Complete!");
    }

    private static jsStart(platformName : string){
        console.log("# build Start");
        let content =  fs.readFileSync(__dirname + "/Front.js").toString();
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

    private static coreModuleMount(name : string) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath : string = path.dirname(__dirname) + "/bin/" + name + ".js"; 
        let contents : string = fs.readFileSync(fullPath).toString() ;
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        return this.setFn(name, contents, true);
    }

    private static localModuleMount(rootDir : string, platformName : string, platformPath : string) {
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

    private static publicContentMount(rootDir : string, platformName : string, platformPath : string) {
        let targetPaths = [
            rootDir + "/src/public",
            rootDir + "/src_" + platformName + "/public",
        ];

        let strs : string = "";
        targetPaths.forEach((targetPath : string) => {
            this.search(targetPath, (file)=>{
                if (file.isDirectory()) return;
                const fullPath = file.path + "/" + file.name;
                let basePath = "public/"+ fullPath.substring((targetPath + "/").length);
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

    private static renderingHtmMount(rootDir : string, platformName : string, platformPath : string) {
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
                dirExists = true;
            }
        }

        if (!dirExists) {
            console.log("# mkdir " + rootDir);
            fs.mkdirSync(rootDir);
        }
    }
}