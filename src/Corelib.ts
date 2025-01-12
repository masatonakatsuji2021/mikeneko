import * as fs from "fs";
import { exec } from "child_process";
import { CLI, Color } from "nktj_cli";
import path = require("path");

export class Corelib {

    private static tstypes = [
        "es5",
        "es6",
        "es2016",
        "es2017",
        "es2018",
        "es2019",
        "es2020",
        "es2021",
        "es2022",
        "es2023",
        "esnext",
    ];

    private static modes = [
        "update",
        "delete",
    ];

    public static async corelib() {

        CLI.outn("# Corelibrary").br();
        CLI.outn("# Update/remove transpilation data for core libraries.");

        let tstype: string;
        while(!tstype) {
            tstype = await CLI.in("Q. Select a transpilation type. (" + this.tstypes.join("/") + ") [es6]") as string;
            if (!tstype) tstype = "es6";
            if (this.tstypes.indexOf(tstype) === -1){
                CLI.outn(CLI.setColor("[ERROR] ", Color.Red) + "Unsupported type. retry");
                tstype = null;
            }
        }

        let mode: string;
        while(!mode) {
            mode = await CLI.in("Q. Select the \"" + tstype + "\" transpilation type operation (" + this.modes.join("/") + ") [update]") as string;
            if (!mode) mode = "update";
            if (this.modes.indexOf(mode) === -1){
                CLI.outn(CLI.setColor("[ERROR] ", Color.Red) + "Operation unknown. retry");
                mode = null;
            }
        }

        if (mode == "update") {
            CLI.outn(CLI.setColor("# ", Color.Green) + "CoreLIbrary Update (" + tstype + ")");

            try {
                await this.corelibUpdate(tstype);
            } catch (error) {
                console.error(error);
                return;
            }

            CLI.br().outn("...... Complete!", Color.Green);
        }
        else if (mode == "delete") {
            CLI.outn(CLI.setColor("# ", Color.Green) + "CoreLIbrary Delete (" + tstype + ")");
            this.corelibDelete(tstype);
            CLI.br().outn("...... Complete!", Color.Green);
        }
    }

    private static corelibUpdate(tstype: string) {
        
        CLI.wait(CLI.setColor("# ", Color.Green) + "Core Library TranceComplie...");
        return new Promise((resolve, reject) => {
            exec("cd " + path.dirname(__dirname) + "/bin && tsc --project tsconfigs/" + tstype + ".json", (error, stdout, stderr)=>{
                if (error) return reject(error);
                if (stderr) return reject(stderr);
                CLI.waitClose("OK").br();
                resolve(true);
            });
        });
    }

    private static corelibDelete(tstype: string) {
        const deletePath = path.dirname(__dirname) + "/dist/" + tstype;
        const lists = fs.readdirSync(deletePath);

        for(let n = 0 ; n < lists.length; n++){
            const l_ = deletePath + "/" + lists[n];            
            fs.unlinkSync(l_);
        }
        fs.rmdirSync(deletePath);
    }
}