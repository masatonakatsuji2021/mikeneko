import { Routes } from "Routes";
import { Response } from "Response";
import { ModernJS, ModernJSList } from "ModernJS";

export class View {

    public myMjs : ModernJS;
    
    /**
     * ***mjs**** : Virtual DOM List of ModernJS Classes.
     */
    public mjs : ModernJSList;

    /**
     * ***view*** : Change the view name to be displayed.  
     * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
     */
    public view : string = null;

    /**
     * ***setView*** :  
     * Set the page view path to display.  
     * If not specified, automatically determined by "{viewName}"  
     * If you use it, place the HTML file in the path "rendering/View/{viewName}.html".
     */
    public setView(value : string)  : void{
        this.view = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***template*** : 
     * If you have a template HTML file, specify it here.
     */
    public template : string = null;

    /**
     * ***setTemplate*** : 
     * Specifies the template name to use on the displayed page.  
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.  
     */
    public setTemplate(value : string){
        this.template = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***head*** : 
     */
    public head : string;

    /**
     * ***setHead*** : 
     * @param headName 
     */
    public setHead(headName : string) {
        this.head = headName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***header*** : 
     */
    public header : string;

    /**
     * ***setHeader*** : 
     * @param headerName 
     */
    public setHeader(headerName : string) {
        this.header = headerName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***footer*** : 
     */
    public footer : string;

    /**
     * ***setFooter*** : 
     * @param footerName 
     */
    public setFooter(footerName : string) {
        this.header = footerName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

    /**
     * ***handle*** : 
     * An event handler that runs automatically when the view is drawn on the screen.  
     * This event is executed only when rendered.
     */
    public handle(...aregment : Array<string>) : void{}

    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.  
     * This event is always executed even if the same View has already been rendered..
     */
    public handleAlways() : void{}


    public handleBegin() : void{}

    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    public handleBefore(beginStatus? : boolean) : void{}
    
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    public handleAfter(beginStatus? : boolean) : void{}

    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    public handleRenderBefore(beginStatus? : boolean) : void{}

    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    public handleRenderAfter(beginStatus? : boolean) :void{}

    /**
     * ***handleLeave*** : Event handler executed when leaving the page.
     */
    public handleLeave() : void{}

    public handleTemplateChanged() : void{}

    public handleHeadChanged() : void{}

    public handleHeaderChanged() : void{}

    public handleFooterChanged() : void{}
}