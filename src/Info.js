"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const nktj_cli_1 = require("nktj_cli");
class Info {
    static info() {
        nktj_cli_1.CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .outn("  plugin add [plugin_name]".padEnd(30) + " : Adding the plugin to your project.")
            .outn("  plugin remove [plugin_name]".padEnd(30) + " : Removing the plugin to your project.")
            .br();
    }
}
exports.Info = Info;
