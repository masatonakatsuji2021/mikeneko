import { ModernJS, ModernJSList } from "ModernJS";

export class Dialog {

    public myMjs : ModernJS;

    public mjs : ModernJSList;

    public handle() : void {}

    public close() {
        this.myMjs.removeClass("open");
        setTimeout(()=>{
            this.myMjs.remove();
        }, 300);
    }
}