import { ModernJS, ModernJSList } from "ModernJS";

/**
 * ***DialogOption*** : Option settings when the dialog is displayed
 */
export interface DialogOption {

    /**
     * ***handle*** : Dialog opening event handler
     * @param {Dialog} dialog Dialog Class
     * @returns {void}
     */
    handle? : (dialog : Dialog) => void,

    /**
     * ***class*** : The class attribute name to add to the dialog tag.
     */
    class? : Array<string> | string,

    /**
     * ***sendData*** : Transmission data contents.
     */
    sendData?: any,
}

/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
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
     * ***vdo*** : Virtual Dom for content.
     */
    public get vdo() : ModernJS {
        return this.myMjs;
    }

    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    public get vdos() : ModernJSList {
        return this.mjs;
    }

    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} sendData 
     * @returns {void}
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