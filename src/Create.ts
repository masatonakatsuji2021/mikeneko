import * as fs from "fs";
import * as path from "path";

export class Create {

    public static create(argv : Array<string>) {
        console.log("# Create Project");

        const rootDir = process.cwd() + "/" + argv[1];

        let exists : boolean = false;
        if (fs.existsSync(rootDir)) {
            if (fs.statSync(rootDir).isDirectory()) exists = true;
        }

        if (exists){
            console.error("[Error] already create project directory.");
            return;
        }

        console.log("# mkdir " + argv[1]);
        fs.mkdirSync(rootDir);

        const defaultPath = path.dirname(__dirname) + "/default";

        this.search(defaultPath, (dirent : fs.Dirent)=>{
            const targetpath = rootDir + dirent.path.substring(defaultPath.length) + "/"+ dirent.name;
            if (dirent.isFile()) {
                // is file
                console.log("# Copy".padEnd(25) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                fs.copyFileSync(dirent.path + "/" + dirent.name, targetpath);
            }
            else {
                // is directory
                console.log("# Mkdir".padEnd(25) + " " + dirent.path.substring(defaultPath.length) + dirent.name);
                fs.mkdirSync(targetpath, {
                    recursive: true,
                });
            }
        });

        this.calibrateTsConfig(rootDir);

        console.log("#\n# ............ Create Complete!");
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
        console.log("# calibrate ".padEnd(25) + " /tsconfig.json");
        fs.writeFileSync(rootDir + "/tsconfig.json", JSON.stringify(tsConfig, null, "  "));
    }
}