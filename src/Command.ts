import { CLI } from "nktj_cli";
import { Builder, BuildOption } from "./Builder";
import { Create } from "./Create";
import { Corelib } from "./Corelib";

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
    else if(args[0] == "build") {
        try {
            const configPath = process.cwd() + "/package.json";
            const config = require(configPath);
            const BuildOption : BuildOption = config.mikenekoBuild;
            Builder.build(BuildOption);
        }catch(error){
            console.error(error);
        }
    }
    else if(args[0] == "corelib") {
        Corelib.corelib();
    }
    else {
        CLI
            .outn("[Command List]")
            .br()
            .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
            .br()
            .outn("  build".padEnd(30) + " : Build the project sources.")
            .br()
        ;
    }
};