import * as fs from "fs";
import * as path from "path";
import * as mime from "mime-types";

export class Builder {

    public static build() {

        const rootDir : string = process.cwd();

        console.log("saiberian build start");

        let coreStr : string = "";
        // start head
        coreStr += this.jsStart();

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
        coreStr += this.localModuleMount(rootDir);

        // public content mount
        coreStr += this.publicContentMount(rootDir);

        // rendering html mount
        coreStr += this.renderingHtmMount(rootDir);

        // end foot
        coreStr += this.jsEnd();

        this.outMkdir(rootDir);

        console.log("# write index.js");
        fs.writeFileSync(rootDir + "/output/index.js", coreStr);

        console.log("# write index.html");
        fs.writeFileSync(rootDir + "/output/index.html", "<!DOCTYPE html><head><script src=\"index.js\"></script></head><body></body></html>");

        console.log("# ...... Complete!");
    }

    private static jsStart(){
        console.log("# build Start");
        return fs.readFileSync(__dirname + "/Front.js").toString();
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

    private static localModuleMount(rootDir : string) {
        const targetPath = rootDir + "/src/app";
        let strs : string = "";
        this.search(targetPath, (file)=>{
            if (file.isDirectory()) return;
            if (path.extname(file.name) != ".js") return;
            const fullPath = file.path + "/" + file.name;
            let basePath = file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
            basePath = basePath.split("\\").join("/");
            let contents : string = fs.readFileSync(fullPath).toString() ;
            contents = "var exports = {};\n" + contents + ";\nreturn exports;";
            strs += this.setFn("app/" + basePath, contents, true);
            console.log("# local module".padEnd(30) + " app/" + basePath);
        });
        return strs;
    }

    private static jsEnd() {
        console.log("# build End");
        return "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }

    private static publicContentMount(rootDir) {
        const targetPath = rootDir + "/src/publics";
        let strs : string = "";
        this.search(targetPath, (file)=>{
            if (file.isDirectory()) return;

            const fullPath = file.path + "/" + file.name;
            let basePath = fullPath.substring((targetPath + "/").length);
            basePath = basePath.split("\\").join("/");
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            const mimeType = mime.lookup(basePath);
            strs += this.setFn("public/"+ basePath, "\"data:" + mimeType + ";base64," + contentB64 + "\"");
            console.log("# public content mount ".padEnd(30) + " " + basePath);
        });
        return strs;
    }

    private static renderingHtmMount(rootDir : string) {
        const targetPath = rootDir + "/src/renderings";
        let strs : string = "";
        this.search(targetPath, (file)=>{
            if (file.isDirectory()) return;

            const fullPath = file.path + "/" + file.name;
            let  basePath = fullPath.substring((targetPath + "/").length);
            basePath = basePath.split("\\").join("/");
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");

            strs += this.setFn("rendering/"+ basePath, "\"" +  contentB64 + "\";");
            console.log("# render html  mount".padEnd(30) + " "+ basePath);
        });
        return strs;
    }

    private static search(target : string, callback) {
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
        if (fs.existsSync(rootDir + "/output")) {
            if (fs.statSync(rootDir + "/output").isDirectory()){
                dirExists = true;
            }
        }

        if (!dirExists) {
            console.log("# mkdir /rootdir");
            fs.mkdirSync(rootDir + "/output");
        }
    }
}