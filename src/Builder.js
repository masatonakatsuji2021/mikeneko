"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Builder = void 0;
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
class Builder {
    static build(option) {
        if (!option) {
            option = {
                platform: {
                    normal: "normal",
                },
            };
        }
        console.log("saiberian build start");
        const rootDir = process.cwd();
        const buildDir = rootDir + "/output";
        this.outMkdir(buildDir);
        const c = Object.keys(option.platform);
        for (let n = 0; n < c.length; n++) {
            const platformName = c[n];
            const platformPath = option.platform[platformName];
            console.log("# platform = " + platformName);
            let coreStr = "";
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
    static jsStart(platformName) {
        console.log("# build Start");
        let content = fs.readFileSync(__dirname + "/Front.js").toString();
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
    static coreModuleMount(name) {
        console.log("# core module".padEnd(30) + " " + name);
        const fullPath = path.dirname(__dirname) + "/bin/" + name + ".js";
        let contents = fs.readFileSync(fullPath).toString();
        contents = "var exports = {};\n" + contents + ";\nreturn exports;";
        return this.setFn(name, contents, true);
    }
    static localModuleMount(rootDir, platformName, platformPath) {
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
    static publicContentMount(rootDir, platformName, platformPath) {
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
    static renderingHtmMount(rootDir, platformName, platformPath) {
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
                dirExists = true;
            }
        }
        if (!dirExists) {
            console.log("# mkdir " + rootDir);
            fs.mkdirSync(rootDir);
        }
    }
}
exports.Builder = Builder;
