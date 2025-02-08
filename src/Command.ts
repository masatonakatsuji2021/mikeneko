import { CLI } from "nktj_cli";
import { Create } from "./Create";

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
    else {
        CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .br()
        ;
    }
};