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
exports.PlatformCmd = void 0;
const fs = require("fs");
const nktj_cli_1 = require("nktj_cli");
class PlatformCmd {
    static add(platformName) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn("* Platform Add");
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
                let exist = false;
                if (mikeneko.platforms) {
                    for (let n = 0; n < mikeneko.platforms.length; n++) {
                        const platform = mikeneko.platforms[n];
                        if (platform.name == platformName)
                            exist = true;
                    }
                }
                if (exist)
                    throw Error("Platform \"" + platformName + "\" is already configured");
                // mikeneko.json add plugin name
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"mikeneko.json\" platforms add \"" + platformName + "\"");
                this.mikenekoJsonAddPlatform(platformName, mikeneko);
            }
            catch (error) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[Plugin Error] " + error, nktj_cli_1.Color.Red));
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("..... Failed!", nktj_cli_1.Color.Red));
                return;
            }
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor(" ..... Complete!", nktj_cli_1.Color.Green));
        });
    }
    static remove(platformName) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.out("* Platform remove ... " + platformName);
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
                let exist = false;
                if (mikeneko.platforms) {
                    for (let n = 0; n < mikeneko.platforms.length; n++) {
                        const platform = mikeneko.platforms[n];
                        if (platform.name == platformName)
                            exist = true;
                    }
                }
                if (!exist)
                    throw Error("Platform \"" + platformName + "\" is not exists.");
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Delete Plugin Data.");
                this.removePlatformFileDirectory(platformName);
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "\"mikeneko.json\" platforms remove \"" + platformName + "\"");
                this.mikenekoJsonRemovePlatform(platformName, mikeneko);
            }
            catch (error) {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[Plugin Error] " + error, nktj_cli_1.Color.Red));
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("..... Failed!", nktj_cli_1.Color.Red));
                return;
            }
            nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor(" ..... Complete!", nktj_cli_1.Color.Green));
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.out("* Platform list");
        });
    }
    static mikenekoJsonAddPlatform(platformName, mikeneko) {
        if (!mikeneko.platforms)
            mikeneko.platforms = [];
        const option = nktj_cli_1.CLI.getArgsOPtion();
        let platform = {
            name: platformName,
            debug: undefined,
            mapping: undefined,
            build: undefined,
            handles: undefined,
        };
        if (option.debug)
            platform.debug = true;
        if (option.mapping)
            platform.mapping = true;
        if (option.webpack)
            platform.build = "webpack";
        if (option.handles && typeof option.handles == "string")
            platform.handles = option.handles;
        mikeneko.platforms.push(platform);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }
    static removePlatformFileDirectory(platformName) {
        const search = (path) => {
            let files = [];
            let dirs = [];
            const list = fs.readdirSync(path);
            for (let n = 0; n < list.length; n++) {
                const p_ = path + "/" + list[n];
                if (fs.statSync(p_).isDirectory()) {
                    const buffer = search(p_);
                    for (let n = 0; n < buffer.files.length; n++) {
                        const f_ = buffer.files[n];
                        files.push(f_);
                    }
                    for (let n = 0; n < buffer.dirs.length; n++) {
                        const d_ = buffer.dirs[n];
                        dirs.push(d_);
                    }
                    dirs.push(p_);
                }
                else {
                    files.push(p_);
                }
            }
            return { files, dirs };
        };
        if (!fs.existsSync(process.cwd() + "/output/" + platformName))
            return;
        const list = search(process.cwd() + "/output/" + platformName);
        for (let n = 0; n < list.files.length; n++) {
            const f_ = list.files[n];
            fs.unlinkSync(f_);
        }
        for (let n = 0; n < list.dirs.length; n++) {
            const d_ = list.dirs[n];
            fs.rmdirSync(d_);
        }
        fs.rmdirSync(process.cwd() + "/output/" + platformName);
    }
    static mikenekoJsonRemovePlatform(platformName, mikeneko) {
        let platforms = [];
        for (let n = 0; n < mikeneko.platforms.length; n++) {
            const platform = mikeneko.platforms[n];
            if (platform.name != platformName)
                platforms.push(platform);
        }
        mikeneko.platforms = platforms;
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }
}
exports.PlatformCmd = PlatformCmd;
