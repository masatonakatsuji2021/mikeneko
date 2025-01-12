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
exports.Corelib = void 0;
const fs = require("fs");
const child_process_1 = require("child_process");
const nktj_cli_1 = require("nktj_cli");
const path = require("path");
class Corelib {
    static corelib() {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.outn("# Corelibrary").br();
            nktj_cli_1.CLI.outn("# Update/remove transpilation data for core libraries.");
            let tstype;
            while (!tstype) {
                tstype = (yield nktj_cli_1.CLI.in("Q. Select a transpilation type. (" + this.tstypes.join("/") + ") [es6]"));
                if (!tstype)
                    tstype = "es6";
                if (this.tstypes.indexOf(tstype) === -1) {
                    nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[ERROR] ", nktj_cli_1.Color.Red) + "Unsupported type. retry");
                    tstype = null;
                }
            }
            let mode;
            while (!mode) {
                mode = (yield nktj_cli_1.CLI.in("Q. Select the \"" + tstype + "\" transpilation type operation (" + this.modes.join("/") + ") [update]"));
                if (!mode)
                    mode = "update";
                if (this.modes.indexOf(mode) === -1) {
                    nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("[ERROR] ", nktj_cli_1.Color.Red) + "Operation unknown. retry");
                    mode = null;
                }
            }
            if (mode == "update") {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "CoreLIbrary Update (" + tstype + ")");
                try {
                    yield this.corelibUpdate(tstype);
                }
                catch (error) {
                    console.error(error);
                    return;
                }
                nktj_cli_1.CLI.br().outn("...... Complete!", nktj_cli_1.Color.Green);
            }
            else if (mode == "delete") {
                nktj_cli_1.CLI.outn(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "CoreLIbrary Delete (" + tstype + ")");
                this.corelibDelete(tstype);
                nktj_cli_1.CLI.br().outn("...... Complete!", nktj_cli_1.Color.Green);
            }
        });
    }
    static corelibUpdate(tstype) {
        nktj_cli_1.CLI.wait(nktj_cli_1.CLI.setColor("# ", nktj_cli_1.Color.Green) + "Core Library TranceComplie...");
        return new Promise((resolve, reject) => {
            (0, child_process_1.exec)("cd " + path.dirname(__dirname) + "/bin && tsc --project tsconfigs/" + tstype + ".json", (error, stdout, stderr) => {
                if (error)
                    return reject(error);
                if (stderr)
                    return reject(stderr);
                nktj_cli_1.CLI.waitClose("OK").br();
                resolve(true);
            });
        });
    }
    static corelibDelete(tstype) {
        const deletePath = path.dirname(__dirname) + "/dist/" + tstype;
        const lists = fs.readdirSync(deletePath);
        for (let n = 0; n < lists.length; n++) {
            const l_ = deletePath + "/" + lists[n];
            fs.unlinkSync(l_);
        }
        fs.rmdirSync(deletePath);
    }
}
exports.Corelib = Corelib;
Corelib.tstypes = [
    "es5",
    "es6",
    "es2016",
    "es2017",
    "es2018",
    "es2019",
    "es2020",
    "es2021",
    "es2022",
    "es2023",
    "esnext",
];
Corelib.modes = [
    "update",
    "delete",
];
