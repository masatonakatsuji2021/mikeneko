"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Create = void 0;
const fs = require("fs");
const path = require("path");
const nktj_cli_1 = require("nktj_cli");
class Create {
    static create(argv) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn("# Create Project").br();
            let name;
            while (!name) {
                name = yield nktj_cli_1.CLI.in("Q. Project Name?");
                if (!name) {
                    nktj_cli_1.CLI.out("  [ERROR] ", nktj_cli_1.Color.Red).outn("Project name is empty. please retry.");
                    continue;
                }
                const rootDir = process.cwd() + "/" + name;
                let exists = false;
                if (fs.existsSync(rootDir)) {
                    if (fs.statSync(rootDir).isDirectory())
                        exists = true;
                }
                if (exists) {
                    nktj_cli_1.CLI.out("  [ERROR] ", nktj_cli_1.Color.Red).outn("A project directory for \"" + name + "\" has already been created.");
                    name = null;
                    continue;
                }
            }
            const status = yield nktj_cli_1.CLI.br().in("Do you want to create this project? [y/n] (y)");
            if (status.toLowerCase() == "n") {
                nktj_cli_1.CLI.br().outn(".... Canceld");
                return;
            }
            const rootDir = process.cwd() + "/" + name;
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "mkdir".padEnd(15) + " " + rootDir);
            fs.mkdirSync(rootDir);
            const defaultPath = path.dirname(__dirname) + "/default";
            this.search(defaultPath, (dirent) => {
                const targetpath = rootDir + dirent.path.substring(defaultPath.length) + "/" + dirent.name;
                if (dirent.isFile()) {
                    // is file
                    nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Copy".padEnd(15) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                    fs.copyFileSync(dirent.path + "/" + dirent.name, targetpath);
                }
                else {
                    // is directory
                    nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Mkdir".padEnd(15) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                    fs.mkdirSync(targetpath, {
                        recursive: true,
                    });
                }
            });
            this.calibrateTsConfig(rootDir);
            nktj_cli_1.CLI.br().outn("....... Create Complete!", nktj_cli_1.Color.Green);
        });
    }
    static search(target, callback) {
        const list = fs.readdirSync(target, {
            withFileTypes: true,
        });
        for (let n = 0; n < list.length; n++) {
            const l_ = list[n];
            if (l_.isDirectory()) {
                const dir = l_;
                dir.path = target;
                callback(l_);
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
    static calibrateTsConfig(rootDir) {
        const tsConfig = require(rootDir + "/tsconfig.json");
        tsConfig.compilerOptions.paths["*"] = [path.dirname(__dirname) + "/bin/*"];
        nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "calibrate ".padEnd(15) + " /tsconfig.json");
        fs.writeFileSync(rootDir + "/tsconfig.json", JSON.stringify(tsConfig, null, "  "));
    }
}
exports.Create = Create;
