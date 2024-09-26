import { ModernJS, ModernJSList } from "ModernJS";

export class UI {

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
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    public handle(sendData? : any) : void { }
}