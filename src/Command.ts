import { Builder, BuildOption } from "./Builder";
import { Create } from "./Create";

export const command = ()=>{

    const argv = process.argv;

    argv.shift();
    argv.shift();

    console.log("=====================================");
    console.log("Saiberian CLI");
    console.log("=====================================");
    console.log("");

    if (argv[0] == "create") {
        Create.create(argv);
    }
    else if(argv[0] == "build") {
        try {
            const configPath = process.cwd() + "/package.json";
            const config = require(configPath);
            const BuildOption : BuildOption = config.saiberianBuild;
            Builder.build(BuildOption);
        }catch(error){
            console.error(error);
        }
    }
    else {
        console.log("[Command List]");
        console.log("");
        console.log("  create [project_name]".padEnd(30) + " : Create project source data.");
        console.log("");
        console.log("  build".padEnd(30) + " : Build the project sources.");
        console.log("");
    }
};