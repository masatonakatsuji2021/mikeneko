"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const nktj_cli_1 = require("nktj_cli");
const Create_1 = require("./Create");
const command = () => {
    const packageJson = require("../package.json");
    nktj_cli_1.CLI
        .outn("=====================================")
        .outn("Mikeneko CLI Version: " + packageJson.version)
        .outn("=====================================")
        .br();
    const args = nktj_cli_1.CLI.getArgs();
    if (args[0] == "create") {
        Create_1.Create.create(args);
    }
    else {
        nktj_cli_1.CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .br();
    }
};
exports.command = command;
