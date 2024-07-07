"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
class Builder {
    static build() {
        const rootDir = process.cwd();
        console.log("saiberian build start");
        let coreStr = "";
        // start head
        coreStr += this.jsStart();
        // core module mount
        coreStr += this.coreModuleMount("App");
        coreStr += this.coreModuleMount("Background");
        coreStr += this.coreModuleMount("Controller");
        coreStr += this.coreModuleMount("Data");
        coreStr += this.coreModuleMount("Dom");
        coreStr += this.coreModuleMount("Response");
        coreStr += this.coreModuleMount("Routes");
        coreStr += this.coreModuleMount("Startor");
        coreStr += this.coreModuleMount("Util");
        coreStr += this.coreModuleMount("View");
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
        console.log("# ...... Complete!");
    }
    static jsStart() {
        console.log("# build Start");
        return fs.readFileSync(__dirname + "/Front.js").toString();
    }
    static setFn(name, content, rawFlg) {
        if (rawFlg) {
            return "sfa.setFn(\"" + name + "\", ()=>{" + content + "});";
        }
        else {
            return "sfa.setFn(\"" + name + "\", ()=>{ return " + content + "});";
        }
    }
    static coreModuleMount(name) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath = path.dirname(__dirname) + "/bin/" + name + ".js";
        let contents = fs.readFileSync(fullPath).toString();
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        return this.setFn(name, contents, true);
    }
    static localModuleMount(rootDir) {
        const targetPath = rootDir + "/src/app";
        let strs = "";
        this.search(targetPath, (file) => {
            if (file.isDirectory())
                return;
            if (path.extname(file.name) != ".js")
                return;
            const fullPath = file.path + "/" + file.name;
            const baesPath = file.path.substring((targetPath + "/").length) + "/" + file.name.substring(0, file.name.length - path.extname(file.name).length);
            let contents = fs.readFileSync(fullPath).toString();
            contents = "var exports = {};\n" + contents + ";\nreturn exports;";
            strs += this.setFn("app/" + baesPath, contents, true);
            console.log("# local module".padEnd(30) + " app/" + baesPath);
        });
        return strs;
    }
    static jsEnd() {
        console.log("# build End");
        return "sfa.start(()=>{ const st = use(\"Startor\");  new st.Startor(); });";
    }
    static publicContentMount(rootDir) {
        const targetPath = rootDir + "/src/publics";
        let strs = "";
        this.search(targetPath, (file) => {
            if (file.isDirectory())
                return;
            const fullPath = file.path + "/" + file.name;
            const baesPath = fullPath.substring((targetPath + "/").length);
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            const mimeType = mime.lookup(baesPath);
            strs += this.setFn("public/" + baesPath, "\"data:" + mimeType + ";base64," + contentB64 + "\"");
            console.log("# public content mount ".padEnd(30) + " " + baesPath);
        });
        return strs;
    }
    static renderingHtmMount(rootDir) {
        const targetPath = rootDir + "/src/renderings";
        let strs = "";
        this.search(targetPath, (file) => {
            if (file.isDirectory())
                return;
            const fullPath = file.path + "/" + file.name;
            const baesPath = fullPath.substring((targetPath + "/").length);
            const contentB64 = Buffer.from(fs.readFileSync(fullPath)).toString("base64");
            strs += this.setFn("rendering/" + baesPath, "\"" + contentB64 + "\";");
            console.log("# render html  mount".padEnd(30) + " " + baesPath);
        });
        return strs;
    }
    static search(target, callback) {
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
        if (fs.existsSync(rootDir + "/output")) {
            if (fs.statSync(rootDir + "/output").isDirectory()) {
                dirExists = true;
            }
        }
        if (!dirExists) {
            console.log("# mkdir /rootdir");
            fs.mkdirSync(rootDir + "/output");
        }
    }
}
exports.Builder = Builder;
