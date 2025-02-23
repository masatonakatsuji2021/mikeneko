"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const nktj_cli_1 = require("nktj_cli");
const Create_1 = require("./Create");
const PluginCmd_1 = require("./PluginCmd");
const PlatformCmd_1 = require("./PlatformCmd");
const Info_1 = require("./Info");
const command = () => {
    const packageJson = require("../package.json");
    nktj_cli_1.CLI
        .outn("Mikeneko CLI Version: " + packageJson.version)
        .br();
    const args = nktj_cli_1.CLI.getArgs();
    if (args[0] == "create") {
        Create_1.Create.create(args);
    }
    else if (args[0] == "plugin") {
        if (args[1] == "add") {
            PluginCmd_1.PluginCmd.add(args[2]);
        }
        else if (args[1] == "remove") {
            PluginCmd_1.PluginCmd.remove(args[2]);
        }
        else if (args[1] == "list") {
            PluginCmd_1.PluginCmd.list();
        }
    }
    else if (args[0] == "platform") {
        if (args[1] == "add") {
            PlatformCmd_1.PlatformCmd.add();
        }
        else if (args[1] == "remove") {
            PlatformCmd_1.PlatformCmd.remove(args[2]);
        }
        else if (args[1] == "list") {
            PlatformCmd_1.PlatformCmd.list();
        }
    }
    else {
        Info_1.Info.info();
    }
};
exports.command = command;
