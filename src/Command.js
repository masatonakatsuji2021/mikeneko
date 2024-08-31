"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const Builder_1 = require("./Builder");
const Create_1 = require("./Create");
const command = () => {
    const argv = process.argv;
    argv.shift();
    argv.shift();
    console.log("=====================================");
    console.log("Mikeneko CLI");
    console.log("=====================================");
    console.log("");
    if (argv[0] == "create") {
        Create_1.Create.create(argv);
    }
    else if (argv[0] == "build") {
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
    else {
        console.log("[Command List]");
        console.log("");
        console.log("  create [project_name]".padEnd(30) + " : Create project source data.");
        console.log("");
        console.log("  build".padEnd(30) + " : Build the project sources.");
        console.log("");
    }
};
exports.command = command;
