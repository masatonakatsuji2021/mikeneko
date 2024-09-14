import { ModernJS, ModernJSList } from "ModernJS";

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
     * ***handle*** : Event handler for when the template is displayed.
     * @returns {void}
     */
    public handle() : void;

    /**
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData Transmission data contents
     * @returns {void}
     */
    public handle(sendData: any) : void;

    public handle(sendData?: any) : void { }    
}