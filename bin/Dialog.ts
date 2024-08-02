import { ModernJS, ModernJSList } from "ModernJS";

export interface DialogOption {

    handle? : (dialog : Dialog) => void,

    class? : Array<string> | string,
}

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