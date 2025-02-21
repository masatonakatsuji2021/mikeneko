"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const nktj_cli_1 = require("nktj_cli");
const Create_1 = require("./Create");
const PluginCmd_1 = require("./PluginCmd");
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
    else if (args[0] == "plugin") {
        if (args[1] == "add") {
            if (args[2]) {
                PluginCmd_1.PluginCmd.add(args[2]);
            }
            else {
                PluginCmd_1.PluginCmd.add();
            }
        }
        else if (args[1] == "remove") {
            if (args[2]) {
                PluginCmd_1.PluginCmd.remove(args[2]);
            }
            else {
                PluginCmd_1.PluginCmd.remove();
            }
        }
        else if (args[1] == "list") {
            PluginCmd_1.PluginCmd.list();
        }
    }
    else if (args[1] == "platform") {
        if (args[2] == "add") {
        }
        else if (args[2] == "remove") {
        }
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
