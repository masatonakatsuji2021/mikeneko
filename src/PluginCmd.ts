import { CLI, Color} from "nktj_cli";

export class PluginCmd {

    public static async add(pluginName?: string) {
        CLI.out("* Plugin Add");
        if (pluginName) CLI.outn(" ... " + pluginName);

    }
    
    public static async remove(pluginName?: string) {
        CLI.outn("* Plugin Remove ... " + pluginName);

    }

    public static async list() {
        CLI.outn("* Plugin List");

    }
}
