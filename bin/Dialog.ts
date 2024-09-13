import { ModernJS, ModernJSList } from "ModernJS";

export interface DialogOption {

    handle? : (dialog : Dialog) => void,

    class? : Array<string> | string,

    sendData?: any,
}

export class Dialog {

    /**
     * ***myMjs*** : Dialog Body Virtual DOM.
     */
    public myMjs : ModernJS;

    /**
     * ***mjs*** : Virtual DOM List in Dialog.
     */
    public mjs : ModernJSList;

    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} sendData 
     */
    public handle(sendData?: any) : void {}

    /**
     * ***close*** : Method for closing the dialog.
     */
    public close() {
        this.myMjs.removeClass("open");
        setTimeout(()=>{
            this.myMjs.remove();
        }, 300);
    }
}