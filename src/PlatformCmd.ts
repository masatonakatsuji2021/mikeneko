import * as fs from "fs";
import { CLI, Color} from "nktj_cli";

export class PlatformCmd {

    public static async add(platformName: string) {
        CLI.outn("* Platform Add");

        try {

            if (!(
                fs.existsSync(process.cwd() + "/mikeneko.json") &&
                fs.existsSync(process.cwd() + "/mikeneko.json")
            )) throw Error("Not found \"mikeneko.json\" or \"tsconfig.json\".");

            let mikeneko;
            try {
                mikeneko = require(process.cwd() + "/mikeneko.json");
            } catch (error) {
                throw Error("Could not load file \"mikeneko.json\\n" + error.toString());
            }

            let exist : boolean = false;
            if (mikeneko.platforms) {
                for(let n = 0 ; n < mikeneko.platforms.length ; n++) {
                    const platform = mikeneko.platforms[n];

                    if (platform.name == platformName) exist = true;
                }
            }
            if (exist) throw Error("Platform \"" + platformName + "\" is already configured");

            // mikeneko.json add plugin name
            CLI.outn(CLI.setColor("# ", Color.Green) + "\"mikeneko.json\" platforms add \"" + platformName + "\"");
            this.mikenekoJsonAddPlatform(platformName, mikeneko);

        } catch (error) {
            CLI.outn(CLI.setColor("[Plugin Error] " + error,Color.Red));
            CLI.outn(CLI.setColor("..... Failed!", Color.Red));
            return;
        }

        CLI.outn(CLI.setColor(" ..... Complete!", Color.Green));
    }

    public static async remove(platformName : string) {
        CLI.out("* Platform remove ... " + platformName);



    }

    public static async list() {
        CLI.out("* Platform list");
        
    }

    private static mikenekoJsonAddPlatform(platformName: string, mikeneko) {
        if(!mikeneko.platforms) mikeneko.platforms = [];
        const option = CLI.getArgsOPtion() as any;
        let platform = {
            name: platformName,
            debug: undefined,
            mapping: undefined,
            build: undefined,
            handles: undefined,
        };
        if (option.debug) platform.debug = true;
        if (option.mapping) platform.mapping = true;
        if (option.webpack) platform.build = "webpack";
        if (option.handles && typeof option.handles == "string") platform.handles = option.handles;
        mikeneko.platforms.push(platform);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }
}