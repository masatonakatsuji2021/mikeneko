"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const nktj_cli_1 = require("nktj_cli");
const Builder_1 = require("./Builder");
const Create_1 = require("./Create");
const Corelib_1 = require("./Corelib");
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
    else if (args[0] == "build") {
        try {
            const configPath = process.cwd() + "/package.json";
            const config = require(configPath);
            const BuildOption = config.mikenekoBuild;
            Builder_1.Builder.build(BuildOption);
        }
        catch (error) {
            console.error(error);
        }
    }
    else if (args[0] == "corelib") {
        Corelib_1.Corelib.corelib();
    }
    else {
        nktj_cli_1.CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .br()
            .outn("  build".padEnd(30) + " : Build the project sources.")
            .br();
    }
};
exports.command = command;
