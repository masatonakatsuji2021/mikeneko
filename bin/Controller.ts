import { Routes } from "Routes";
import { Template } from "Template";
import { UI } from "UI";
import { Response } from "Response";
import { ModernJS, ModernJSList } from "ModernJS";

/**
 * ***Controller*** : Main class for each screen.  
 * handlers for multiple screens can be managed collectively using public methods.
 */
export class Controller {

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
     * ***sendData*** : 
     */
    public sendData: any;

    /**
     * ***beginStatus*** : 
     */
    public beginStatus : boolean = false;

    /**
     * ***view*** : Change the view name to be displayed.  
     * If not specified, the "rendering/View/{ControllerName}/{ActionName}.html" file will be displayed as the HTML source by default.
     */
    public view : string = null;

    /**
     * ***setView*** : Set the page view path to display.  
     * If not specified, automatically determined by "{Controller Name}/{action name}"  
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     * @param {string} viewName view name
     * @returns {void}
     */
    public setView(viewName : string)  : void{
        this.view = viewName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***template*** : If you have a template HTML file, specify it here.
     */
    public template : string = null;

    /**
     * ***setTemplate*** : Specifies the template name to use on the displayed page.  
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.  
     * @param {string} templateName template name
     * @returns {void}
    */
    public setTemplate(templateName : string){
        this.template = templateName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***head*** : If there is a UI to set in the head tag, you can specify it.  
     */
    public head : string;

    /**
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.  
     * @param headName 
     */
    public setHead(headName : string) {
        this.head = headName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***header*** : If there is a UI to set in the header tag, you can specify it.  
     */
    public header : string;

    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.  
     * @param headerName 
     */
    public setHeader(headerName : string) {
        this.header = headerName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***footer*** : If there is a UI to set in the footer tag, you can specify it.  
     */
    public footer : string;

    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it. 
     * @param footerName 
     */
    public setFooter(footerName : string) {
        this.header = footerName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    public handleBefore() : void | Promise<void> { }

    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    public handleAfter() : void | Promise<void> {}

    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    public handleRenderBefore() : void | Promise<void> {}

    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    public handleRenderAfter() : void | Promise<void> {}

    /**
     * ***handleLeave*** : A handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    public handleLeave(action? : string) : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     * @param {string} action before access controller action name
     */
    public handleLeaveBack(action? : string) : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     * @param {string} action before access controller action name
     */
    public handleLeaveNext(action? : string) : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    public handleTemplateChanged(template? : Template) : void | Promise<void> {}

    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    public handleHeadChanged(head? : UI) : void | Promise<void> {}

    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    public handleHeaderChanged(header? : UI) : void | Promise<void> {}

    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    public handleFooterChanged(footer? : UI) : void | Promise<void> {}
}