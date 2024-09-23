import { Routes } from "Routes";
import { Response } from "Response";
import { Template } from "Template";
import { UI } from "UI";
import { ModernJS, ModernJSList } from "ModernJS";

/**
 * ***View*** : Main class for each screen.
 */
export class View {

    /**
     * ***myMjs*** : Virtual Dom for content.
     */
    public myMjs : ModernJS;
    
    /**
     * ***mjs**** : Virtual DOM List of ModernJS Classes.
     */
    public mjs : ModernJSList;
    
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
     * ***handle*** : 
     * An event handler that runs automatically when the view is drawn on the screen.  
     * This event is executed only when rendered.
     */
    public handle(...aregment : Array<string | number>) : void{}

    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.  
     * This event is always executed even if the same View has already been rendered..
     */
    public handleAlways() : void | Promise<void> {}

    /**
     * ***handleBegin*** : Event handler executed just before transitioning to the page.
     */
    public handleBegin() : void | Promise<void> {}

    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    public handleBefore(beginStatus? : boolean) : void | Promise<void> {}
    
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    public handleAfter(beginStatus? : boolean) : void | Promise<void> {}

    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    public handleRenderBefore(beginStatus? : boolean) : void | Promise<void> {}

    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    public handleRenderAfter(beginStatus? : boolean) :void | Promise<void> {}

    /**
     * ***handleLeave*** : Event handler executed when leaving the page.
     */
    public handleLeave() : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleTemplateChanged*** : An event handler that runs when the template specified in the member variable template changes.
     */
    public handleTemplateChanged(template? : Template) : void | Promise<void> {}

    /**
     * ***handleHeadChanged*** : An event handler that runs when the template specified in the member variable head tag changes.
     */
    public handleHeadChanged(head? : UI) : void | Promise<void> {}

    /**
     * ***handleHeaderChanged*** : An event handler that runs when the template specified in the member variable header tag changes.
     */
    public handleHeaderChanged(header? : UI) : void | Promise<void> {}
    
    /**
     * ***handleFooterChanged*** : An event handler that runs when the template specified in the member variable footer tag changes.
     */
    public handleFooterChanged(footer? : UI) : void | Promise<void> {}
}