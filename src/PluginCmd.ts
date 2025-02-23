import * as fs from "fs";
import { CLI, Color} from "nktj_cli";
import { exec } from "child_process";

export class PluginCmd {

    public static async add(pluginName: string) {
        CLI.outn(CLI.setColor("# ", Color.Green) + "Plugin Add \"" + pluginName + "\"");

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

            CLI.wait(CLI.setColor("# ", Color.Green) + "Plugin Check \"" + pluginName + "\" ... ");
            try {
                await this.pluginNpmView(pluginName);
            } catch (error) {
                CLI.waitClose(CLI.setColor("NG", Color.Red));
                throw Error("An error occurred in npm package \"" + pluginName + "\".\n" + error.toString());
            }
            CLI.waitClose(CLI.setColor("OK", Color.Green));

            CLI.wait(CLI.setColor("# ", Color.Green) + "Plugin Install \"" + pluginName + "\" ... ");
            try {
                await this.pluginNpmInstall(pluginName);
            }
            catch(error) {
                CLI.waitClose(CLI.setColor("NG", Color.Red));
                throw Error("Install Failed.\n" + error.toString());
            }
            CLI.waitClose(CLI.setColor("OK", Color.Green));

            // mikeneko.json add plugin name
            CLI.outn(CLI.setColor("# ", Color.Green) + "\"mikeneko.json\" plugins add \"" + pluginName + "\"");
            this.mikenekoJsonAddPlugin(pluginName, mikeneko);

            // tsconfig.json add plugin name path
            CLI.outn(CLI.setColor("# ", Color.Green) + "\"tsconfig.json\" paths add \"" + pluginName + "\"");
            this.tsconfigJsonAddPluginPath(pluginName);
        
        } catch (error) {
            CLI.outn(CLI.setColor("[Plugin Error] " + error,Color.Red));
            CLI.outn(CLI.setColor("..... Failed!", Color.Red));
        }

        CLI.br().outn(CLI.setColor(".... Complete!", Color.Green));
    }

    public static async remove(pluginName: string) {
        CLI.outn("* Plugin Remove ... " + pluginName);

        try {

            if (!(
                fs.existsSync(process.cwd() + "/mikeneko.json") &&
                fs.existsSync(process.cwd() + "/mikeneko.json")
            )) {
                throw Error("Not found \"mikeneko.json\" or \"tsconfig.json\".");
            }

            let mikeneko;
            try {
                mikeneko = require(process.cwd() + "/mikeneko.json");
            } catch (error) {
                throw Error("Could not load file \"mikeneko.json\".\n" + error.toString());
            }
    
            let exists : boolean = false;
            if (mikeneko.plugins) {
                if (mikeneko.plugins.indexOf(pluginName) > -1) exists = true;
            }
    
            if (!exists) throw Error("The specified plugin \"" + pluginName + "\" is not currently included.");

            // npm remove plugin
            CLI.wait(CLI.setColor("# ", Color.Green) + "npm remove \"" + pluginName + "\" ... ");
            try {
                await this.pluginNpmRemove(pluginName);
            } catch (error) {
                CLI.waitClose(CLI.setColor("NG", Color.Red));
                throw Error("Remove Failed \"mikeneko.json\".\n" + error.toString());
            }
            CLI.waitClose(CLI.setColor("OK", Color.Green));

            // mikeneko.json remove plugin name
            CLI.outn(CLI.setColor("# ", Color.Green) + "\"mikeneko.json\" plugins remove \"" + pluginName + "\"");
            this.mikenekoJsonRemovePlugin(pluginName, mikeneko);

            // tsconfig.json remove plugin name path
            CLI.outn(CLI.setColor("# ", Color.Green) + "\"tsconfig.json\" paths remove \"" + pluginName + "\"");
            this.tsconfigJsonRemovePluginPath(pluginName);

        } catch (error) {
            CLI.outn(CLI.setColor("[Plugin Remove Error] " + error,Color.Red));
            CLI.outn(CLI.setColor("..... Failed!", Color.Red));
            return;
        }

        CLI.br().outn(CLI.setColor(".... Complete!", Color.Green));

    }

    public static async list() {
        CLI.outn("* Plugin List");

    }

    private static async pluginNpmView(pluginName: string) {
        return new Promise((resolve, reject) => {
            exec("npm view " + pluginName, (error, stdout, stderr)=>{
                if (error){
                    reject(stderr);
                    return;
                }
                resolve(true);
            }); 
        });
    }

    private static pluginNpmInstall(pluginName : string) {
        return new Promise((resolve, reject) => {
            exec("npm i " + pluginName, (error, stdout, stderr)=>{
                if (error){
                    reject(stderr);
                    return;
                }
                resolve(true);
            }); 
        });
    }

    private static mikenekoJsonAddPlugin(pluginName: string, mikeneko) {
        if(!mikeneko.plugins) mikeneko.plugins = [];
        mikeneko.plugins.push(pluginName);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }

    private static tsconfigJsonAddPluginPath(pluginName: string) {
        const tsconfig = require(process.cwd() + "/tsconfig.json");
        if (!tsconfig.compilerOptions.paths) tsconfig.compilerOptions.paths = {};
        if (!tsconfig.compilerOptions.paths["*"]) tsconfig.compilerOptions.paths["*"] = [];;
        !tsconfig.compilerOptions.paths["*"].push("./node_modules/" + pluginName + "/bin/*");
        fs.writeFileSync(process.cwd() + "/tsconfig.json", JSON.stringify(tsconfig, null, "  "));
    }

    private static pluginNpmRemove(pluginName: string) {
        return new Promise((resolve, reject) => {
            exec("npm remove " + pluginName, (error, stdout, stderr)=>{
                if (error){
                    reject(stderr);
                    return;
                }
                resolve(true);
            }); 
        });
    }

    private static mikenekoJsonRemovePlugin(pluginName: string, mikeneko) {
        mikeneko.plugins.splice(mikeneko.plugins.indexOf(pluginName), 1);
        fs.writeFileSync(process.cwd() + "/mikeneko.json", JSON.stringify(mikeneko, null, "  "));
    }

    private static tsconfigJsonRemovePluginPath(pluginName: string) {
        const tsconfig = require(process.cwd() + "/tsconfig.json");
        tsconfig.compilerOptions.paths["*"].splice(tsconfig.compilerOptions.paths["*"].indexOf("./node_modules/" + pluginName + "/bin/*"), 1);
        fs.writeFileSync(process.cwd() + "/tsconfig.json", JSON.stringify(tsconfig, null, "  "));
    }
}
