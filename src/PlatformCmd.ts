import { CLI, Color} from "nktj_cli";

export class PlatformCmd {

    public static async add() {
        CLI.out("* Platform Add");

    }

    public static async remove(platformName : string) {
        CLI.out("* Platform remove ... " + platformName);

    }

    public static async list() {
        CLI.out("* Platform list");
        
    }
}