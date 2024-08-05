import { ModernJS, ModernJSList } from "ModernJS";

export interface DialogOption {

    handle? : (dialog : Dialog) => void,

    class? : Array<string> | string,

    sendData?: any,
}

export class Dialog {

    public myMjs : ModernJS;

    public mjs : ModernJSList;

    public handle(sendData?: any) : void {}

    public close() {
        this.myMjs.removeClass("open");
        setTimeout(()=>{
            this.myMjs.remove();
        }, 300);
    }
}