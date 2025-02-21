import { CLI } from "nktj_cli";
import { Create } from "./Create";
import { PluginCmd } from "./PluginCmd";
import { PlatformCmd } from "./PlatformCmd";

export const command = ()=>{

    const packageJson = require("../package.json");

    CLI
        .outn("=====================================")
        .outn("Mikeneko CLI Version: " + packageJson.version)
        .outn("=====================================")
        .br()
    ;

    const args = CLI.getArgs();

    if (args[0] == "create") {
        Create.create(args);
    }
    else if (args[0] == "plugin") {
        if (args[1] == "add") {
            if (args[2]) {
                PluginCmd.add(args[2]);
            }
            else {
                PluginCmd.add();
            }
        }
        else if (args[1] == "remove") {
            if (args[2]) {
                PluginCmd.remove(args[2]);
            }
            else {
                PluginCmd.remove();
            }
        }
        else if (args[1] == "list") {
            PluginCmd.list();
        }
    }
    else if (args[0] == "platform") {
        if (args[1] == "add") {
            PlatformCmd.add();
        }
        else if (args[1] == "remove") {
            PlatformCmd.remove(args[3]);
        }
        else if (args[1] == "list") {
            PlatformCmd.list();
        }
    }
    else {
        CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .br()
        ;
    }
};