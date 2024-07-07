import { Routes } from "Routes";

export class View {

    /**
     * ***view*** : Change the view name to be displayed.  
     * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
     */
    public view : string = null;

    /**
     * ***setView*** :  
     * Set the page view path to display.  
     * If not specified, automatically determined by "{Controller Name}/{action name}"  
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     */
    public setView(value : string)  : void{
        this.view = value;
        const routes = Routes.getRoute();
        // Response.__rendering(routes, this);
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
        // Response.__rendering(routes, this);
    }

    /**
     * ***handle*** : 
     * An event handler that runs automatically when the view is drawn on the screen.  
     * This event is executed only when rendered.
     */
    handle(...aregment : Array<string>) : void{}

    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.  
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() : void{}

    handleBegin() : void{}

    handleBefore(beginStatus? : boolean) : void{}
    
    handleAfter(beginStatus? : boolean) : void{}

    handleRenderBefore(beginStatus? : boolean) : void{}

    handleRenderAfter(beginStatus? : boolean) :void{}

    handleLeave() : void{}

}