import { Render } from "Render";
import { VirtualDom } from "VirtualDom";

/**
 * ***Template*** : Template classes  
 * If there is anything you want to execute before using the template, prepare it here.
 */
export class Template extends Render {

    protected static type : string = "Template";

    /**
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    public handle(sendData?: any) : void { }  

    /**
     * ***bind*** : Bind the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Bind Virtual Dom
     * @returns {Template}
     */
    public static bind(mjs: VirtualDom) : Template;

    /**
     * ***bind*** : Bind the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Bind Virtual Dom
     * @param {string} TemplateName Template Name
     * @returns {Template}
     */
    public static bind(mjs: VirtualDom, TemplateName : string) : Template;
    
    /**
     * ***bind*** : Bind the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Bind Virtual Dom
     * @param {string} TemplateName template Name
     * @param {any} sendData Transmission data contents
     * @returns {Template}
     */
    public static bind(mjs: VirtualDom, TemplateName : string, sendData : any) : Template;
    
    public static bind(mjs: VirtualDom, TemplateName? : string, sendData? : any) : Template {
        if(TemplateName) TemplateName = "template/" + TemplateName;
        return super.bind(mjs, TemplateName, sendData, this) as Template;
    }
    
    /**
     * ***append*** : Appends the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Append Virtual Dom
     * @returns {Template}
     */
    public static append(mjs: VirtualDom) : Template;
    
    /**
     * ***append*** : Appends the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Append Virtual Dom
     * @param {string} TemplateName Template name
     * @returns {Template}
     */
    public static append(mjs: VirtualDom, TemplateName : string) : Template;
        
    /**
     * ***append*** : Appends the Template content to the specified virtual DOM class.
     * @param {VirtualDom} mjs Append Virtual Dom
     * @param {string} TemplateName Template name
     * @param {any} sendData Transmission data contents
     * @returns {Template}
     */
    public static append(mjs: VirtualDom, TemplateName : string, sendData : any) : Template;
        
    public static append(mjs: VirtualDom, TemplateName? : string, sendData? : any) : Template {
        if(TemplateName) TemplateName = "template/" + TemplateName;
        return super.append(mjs, TemplateName, sendData, this) as Template;
    }
}