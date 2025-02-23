import { CLI } from "nktj_cli";
import { Create } from "./Create";
import { PluginCmd } from "./PluginCmd";
import { PlatformCmd } from "./PlatformCmd";
import { Info } from "./Info";

export const command = ()=>{

    const packageJson = require("../package.json");

    CLI
        .outn("Mikeneko CLI Version: " + packageJson.version)
        .br()
    ;

    const args = CLI.getArgs();

    if (args[0] == "create") {
        Create.create(args);
    }
    else if (args[0] == "plugin") {
        if (args[1] == "add") {
            PluginCmd.add(args[2]);
        }
        else if (args[1] == "remove") {
            PluginCmd.remove(args[2]);
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
            PlatformCmd.remove(args[2]);
        }
        else if (args[1] == "list") {
            PlatformCmd.list();
        }
    }
    else {
        Info.info();
    }
};