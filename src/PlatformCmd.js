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
const nktj_cli_1 = require("nktj_cli");
class PlatformCmd {
    static add() {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.out("* Platform Add");
        });
    }
    static remove(platformName) {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.out("* Platform remove ... " + platformName);
        });
    }
    static list() {
        return __awaiter(this, void 0, void 0, function* () {
            nktj_cli_1.CLI.out("* Platform list");
        });
    }
}
exports.PlatformCmd = PlatformCmd;
