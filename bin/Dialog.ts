import { Render } from "Render";
import { ModernJS, dom } from "ModernJS";

/**
 * ***DialogOption*** : Option settings when the dialog is displayed
 */
export interface DialogOption {

    name? : string,

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
export class Dialog extends Render {

    protected static type : string = "Dialog";

    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} _sendData 
     * @returns {void}
     */
    public handle(_sendData?: any) : void {}

    /**
     * ***handleClose*** : Handler executed when the dialog is closed.
     * @returns {void}
     */
    public handleClose() : void {}

    /**
     * ***close*** : Method for closing the dialog.
     */
    public close() {
        this.myMjs.removeClass("open");
        this.handleClose();
        setTimeout(() => {
            this.myMjs.remove();
        }, 300);
    }
    
    /**
     * ***bind*** : Bind the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @returns {View}
     */
    public static bind(mjs: ModernJS) : Dialog;

    /**
     * ***bind*** : Bind the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @param {string} dialogName Dialog Name
     * @returns {Dialog}
     */
    public static bind(mjs: ModernJS, dialogName : string) : Dialog;

    /**
     * ***bind*** : Bind the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @param {string} dialogName Dialog Name
     * @param {any} sendData Transmission data contents
     * @returns {Dialog}
     */
    public static bind(mjs: ModernJS, dialogName : string, sendData : any) : Dialog;

    public static bind(mjs: ModernJS, dialogName? : string, sendData? : any) : Dialog {
        if(dialogName) dialogName = "dialog/" + dialogName;
        return super.bind(mjs, dialogName, sendData, this) as Dialog;
    }

    /**
     * ***append*** : Appends the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS) : Dialog;

    /**
     * ***append*** : Appends the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @param {string} dialogName Dialog name
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS, dialogName : string) : Dialog;
    
    /**
     * ***append*** : Appends the Dialog content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @param {string} dialogName Dialog name
     * @param {any} sendData Transmission data contents
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS, dialogName : string, sendData : any) : Dialog;
    
    public static append(mjs: ModernJS, dialogName? : string, sendData? : any) : Dialog {
        if(dialogName) dialogName = "dialog/" + dialogName;
        return super.append(mjs, dialogName, sendData, this) as Dialog;
    }

    /**
     * ***show*** : Displays the specified dialog.
     * @returns {Dialog}
     */
    public static show() : Dialog;

    /**
     * ***show*** : Displays the specified dialog.
     * @param {DialogOption} option dialog options
     * @returns {Dialog}
     */
    public static show(option : DialogOption) : Dialog;

    /**
     * ***show*** : Displays the specified dialog.
     * @param {string} dialogName Dialog Name
     * @returns {Dialog}
     */
    public static show(dialogName: string) : Dialog;

    /**
     * ***show*** : Displays the specified dialog.
     * @param {string} dialogName Dialog Name
     * @param {DialogOption} option dialog options
     * @returns {Dialog}
     */
    public static show(dialogName: string, option : DialogOption) : Dialog;

    public static show(..._ : any) : Dialog {
        let option : DialogOption = {};
        let dialogName: string;
        if (_ != undefined) {
            if (_[0]) {
                if (_[1]) {
                    dialogName = _[1] as string;
                    option = _[0] as DialogOption;
                }
                else {
                    dialogName = _[0] as string;
                }
            }    
        }

        if (dialogName) dialogName = "dialog/" + dialogName;
        if (!option) option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + this.getHtml(dialogName) + "</dwindow>";
        const dialogMjs = ModernJS.create(dialogStr, "dialog");
        
        if (option.class) {
            if (typeof option.class == "string") option.class = [ option.class ];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }

        dom("body").append(dialogMjs, true);
        dialogMjs.reload();
        setTimeout(()=>{
            dialogMjs.addClass("open");
        }, 100);
        const dialog : Dialog = this.loadClass(dialogMjs, dialogName, option.sendData, this);
        if (option.handle) option.handle(dialog);
        return dialog;
    }

    private static setDialogCss(){
        if (dom("head").querySelector("link[m=dl]").length > 0)  return;
        const style = require("CORERES/dialog/style.css");
        dom("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    }
}