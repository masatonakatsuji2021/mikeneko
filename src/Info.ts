import { CLI, Color} from "nktj_cli";

export class Info {

    public static info() {

        CLI
        .outn("[Command List]")
        .br()
        .outn("  create [project_name]".padEnd(30) + " : Create project source data.")
        .outn("  plugin add [plugin_name]".padEnd(30) + " : Adding the plugin to your project.")
        .outn("  plugin remove [plugin_name]".padEnd(30) + " : Removing the plugin to your project.")
        .br()
    ;
    }

}