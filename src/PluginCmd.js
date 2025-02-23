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
exports.PluginCmd = void 0;
const fs = require("fs");
const nktj_cli_1 = require("nktj_cli");
const child_process_1 = require("child_process");
class PluginCmd {
    static add(pluginName) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Plugin Add \"" + pluginName + "\"");
            try {
                if (!(fs.existsSync(process.cwd() + "/mikeneko.json") &&
                    fs.existsSync(process.cwd() + "/mikeneko.json")))
                    throw Error("Not found \"mikeneko.json\" or \"tsconfig.json\".");
                let mikeneko;
                try {
                    mikeneko = require(process.cwd() + "/mikeneko.json");
                }
                catch (error) {
                    throw Error("Could not load file \"mikeneko.json\\n" + error.toString());
                }
                if (mikeneko.plugins) {
                    if (mikeneko.plugins.indexOf(pluginName) > -1)
                        throw Error("Plugin \"" + pluginName + "\" is already configured");
                }
                nktj_cli_1.CLI.wait(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Plugin Check \"" + pluginName + "\" ... ");
                try {
                    yield this.pluginNpmView(pluginName);
                }
                catch (error) {
                    nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("NG", nktj_cli_1.Color.Red));
                    throw Error("An error occurred in npm package \"" + pluginName + "\".\n" + error.toString());
                }
                nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("OK", nktj_cli_1.Color.Green));
                nktj_cli_1.CLI.wait(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Plugin Install \"" + pluginName + "\" ... ");
                try {
                    yield this.pluginNpmInstall(pluginName);
                }
                catch (error) {
                    nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("NG", nktj_cli_1.Color.Red));
                    throw Error("Install Failed.\n" + error.toString());
                }
                nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("OK", nktj_cli_1.Color.Green));
                // mikeneko.json add plugin name
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"mikeneko.json\" plugins add \"" + pluginName + "\"");
                this.mikenekoJsonAddPlugin(pluginName, mikeneko);
                // tsconfig.json add plugin name path
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"tsconfig.json\" paths add \"" + pluginName + "\"");
                this.tsconfigJsonAddPluginPath(pluginName);
            }
            catch (error) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[Plugin Error] " + error, nktj_cli_1.Color.Red));
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("..... Failed!", nktj_cli_1.Color.Red));
            }
            nktj_cli_1.CLI.br().outn(nktj_cli_1.CLI.setColor(".... Complete!", nktj_cli_1.Color.Green));
        });
    }
    static remove(pluginName) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn("* Plugin Remove ... " + pluginName);
            try {
                if (!(fs.existsSync(process.cwd() + "/mikeneko.json") &&
                    fs.existsSync(process.cwd() + "/mikeneko.json"))) {
                    throw Error("Not found \"mikeneko.json\" or \"tsconfig.json\".");
                }
                let mikeneko;
                try {
                    mikeneko = require(process.cwd() + "/mikeneko.json");
                }
                catch (error) {
                    throw Error("Could not load file \"mikeneko.json\".\n" + error.toString());
                }
                let exists = false;
                if (mikeneko.plugins) {
                    if (mikeneko.plugins.indexOf(pluginName) > -1)
                        exists = true;
                }
                if (!exists)
                    throw Error("The specified plugin \"" + pluginName + "\" is not currently included.");
                // npm remove plugin
                nktj_cli_1.CLI.wait(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "npm remove \"" + pluginName + "\" ... ");
                try {
                    yield this.pluginNpmRemove(pluginName);
                }
                catch (error) {
                    nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("NG", nktj_cli_1.Color.Red));
                    throw Error("Remove Failed \"mikeneko.json\".\n" + error.toString());
                }
                nktj_cli_1.CLI.waitClose(nktj_cli_1.CLI.setColor("OK", nktj_cli_1.Color.Green));
                // mikeneko.json remove plugin name
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"mikeneko.json\" plugins remove \"" + pluginName + "\"");
                this.mikenekoJsonRemovePlugin(pluginName, mikeneko);
                // tsconfig.json remove plugin name path
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"tsconfig.json\" paths remove \"" + pluginName + "\"");
                this.tsconfigJsonRemovePluginPath(pluginName);
            }
            catch (error) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[Plugin Remove Error] " + error, nktj_cli_1.Color.Red));
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("..... Failed!", nktj_cli_1.Color.Red));
                return;
            }
            nktj_cli_1.CLI.br().outn(nktj_cli_1.CLI.setColor(".... Complete!", nktj_cli_1.Color.Green));
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn("* Plugin List");
            try {
                if (!(fs.existsSync(process.cwd() + "/mikeneko.json") &&
                    fs.existsSync(process.cwd() + "/mikeneko.json"))) {
                    throw Error("Not found \"mikeneko.json\" or \"tsconfig.json\".");
                }
                let mikeneko;
                try {
                    mikeneko = require(process.cwd() + "/mikeneko.json");
                }
                catch (error) {
                    throw Error("Could not load file \"mikeneko.json\".\n" + error.toString());
                }
                nktj_cli_1.CLI.br();
                for (let n = 0; n < mikeneko.plugins.length; n++) {
                    const pluginName = mikeneko.plugins[n];
                    let pgData;
                    try {
                        pgData = require(pluginName + "/package.json");
                    }
                    catch (error) { }
                    nktj_cli_1.CLI.outn("- " + pgData.name.trim() + " (" + pgData.version.trim() + ")");
                }
            }
            catch (error) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[Plugin Error] " + error, nktj_cli_1.Color.Red));
            }
        });
    }
    static pluginNpmView(pluginName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, child_process_1.exec)("npm view " + pluginName, (error, stdout, stderr) => {
                    if (error) {
                        reject(stderr);
                        return;
                    }
                    resolve(true);
                });
            });
        });
    }
    static pluginNpmInstall(pluginName) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)("npm i " + pluginName, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                resolve(true);
            });
        });
    }
    static mikenekoJsonAddPlugin(pluginName, mikeneko) {
        if (!mikeneko.plugins)
            mikeneko.plugins = [];
        mikeneko.plugins.push(pluginName);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }
    static tsconfigJsonAddPluginPath(pluginName) {
        const tsconfig = require(process.cwd() + "/tsconfig.json");
        if (!tsconfig.compilerOptions.paths)
            tsconfig.compilerOptions.paths = {};
        if (!tsconfig.compilerOptions.paths["*"])
            tsconfig.compilerOptions.paths["*"] = [];
        ;
        !tsconfig.compilerOptions.paths["*"].push("./node_modules/" + pluginName + "/bin/*");
        fs.writeFileSync(process.cwd() + "/tsconfig.json", JSON.stringify(tsconfig, null, "  "));
    }
    static pluginNpmRemove(pluginName) {
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)("npm remove " + pluginName, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);
                    return;
                }
                resolve(true);
            });
        });
    }
    static mikenekoJsonRemovePlugin(pluginName, mikeneko) {
        mikeneko.plugins.splice(mikeneko.plugins.indexOf(pluginName), 1);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }
    static tsconfigJsonRemovePluginPath(pluginName) {
        const tsconfig = require(process.cwd() + "/tsconfig.json");
        tsconfig.compilerOptions.paths["*"].splice(tsconfig.compilerOptions.paths["*"].indexOf("./node_modules/" + pluginName + "/bin/*"), 1);
        fs.writeFileSync(process.cwd() + "/tsconfig.json", JSON.stringify(tsconfig, null, "  "));
    }
}
exports.PluginCmd = PluginCmd;
