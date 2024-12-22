import * as fs from "fs";
import * as path from "path";
import { CLI, Color} from "nktj_cli";

export class Create {

    public static async create(argv : Array<string>) {

        CLI.outn("# Create Project").br();

        let name;
        while(!name){
            name = await CLI.in("Q. Project Name?");

            if (!name) {
                CLI.out("  [ERROR] ", Color.Red).outn("Project name is empty. please retry.");
                continue;
            }

            const rootDir = process.cwd() + "/" + name;

            let exists : boolean = false;
            if (fs.existsSync(rootDir)) {
                if (fs.statSync(rootDir).isDirectory()) exists = true;
            }
    
            if (exists){
                CLI.out("  [ERROR] ", Color.Red).outn("A project directory for \"" + name + "\" has already been created.");
                name = null;
                continue;
            }
        }
        
        const status : string = await CLI.br().in("Do you want to create this project? [y/n] (y)") as string;

        if (status.toLowerCase() == "n") {
            CLI.br().outn(".... Canceld");
            return;
        } 

        const rootDir = process.cwd() + "/" + name;

        CLI.outn(CLI.setColor("# ", Color.Green) + "mkdir".padEnd(15) + " " + rootDir);
        fs.mkdirSync(rootDir);

        const defaultPath = path.dirname(__dirname) + "/default";

        this.search(defaultPath, (dirent : fs.Dirent)=>{
            const targetpath = rootDir + dirent.path.substring(defaultPath.length) + "/"+ dirent.name;
            if (dirent.isFile()) {
                // is file
                CLI.outn(CLI.setColor("# ", Color.Green) + "Copy".padEnd(15) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                fs.copyFileSync(dirent.path + "/" + dirent.name, targetpath);
            }
            else {
                // is directory
                CLI.outn(CLI.setColor("# ", Color.Green) + "Mkdir".padEnd(15) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                fs.mkdirSync(targetpath, {
                    recursive: true,
                });
            }
        });

        this.calibrateTsConfig(rootDir);

        CLI.br().outn("....... Create Complete!", Color.Green);
    }

    private static search(target : string, callback : (file : fs.Dirent) => void) {
        const list = fs.readdirSync(target, {
            withFileTypes:true,
        });

        for (let n = 0 ; n < list.length ; n++) {
            const l_ = list[n];
            if (l_.isDirectory()) {
                const dir : any = l_;
                dir.path = target;
                callback(l_);
                this.search(target + "/" + l_.name, callback);
            }
            else {
                // node.js v14 under support.
                const file : any = l_;
                file.path = target;
                callback(l_);
            }
        }
    }

    private static calibrateTsConfig(rootDir: string) {
        const tsConfig = require(rootDir + "/tsconfig.json");
        tsConfig.compilerOptions.paths["*"] = [ path.dirname(__dirname) + "/bin/*" ];
        CLI.outn(CLI.setColor("# ", Color.Green) + "calibrate ".padEnd(15) + " /tsconfig.json");
        fs.writeFileSync(rootDir + "/tsconfig.json", JSON.stringify(tsConfig, null, "  "));
    }
}