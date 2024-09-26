import { ModernJS, ModernJSList } from "ModernJS";

/**
 * ***Template*** : Template classes  
 * If there is anything you want to execute before using the template, prepare it here.
 */
export class Template {

    /**
     * ***myMjs*** : Virtual Dom for content.
     */
    public myMjs : ModernJS;

    /**
     * ***mjs**** : Virtual DOM List of ModernJS Classes.
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
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    public handle(sendData?: any) : void { }    
}