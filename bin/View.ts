import { Template } from "Template";
import { Render } from "Render";
import { ModernJS } from "ModernJS";
import { UI } from "UI";

/**
 * ***View*** : Main class for each screen.
 */
export class View extends Render {

    protected static type : string = "View";
    
    /**
     * ***bind*** : Bind the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @returns {View}
     */
    public static bind(mjs: ModernJS) : View;

    /**
     * ***bind*** : Bind the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @param {string} ViewName View Name
     * @returns {View}
     */
    public static bind(mjs: ModernJS, ViewName : string) : View;

    /**
     * ***bind*** : Bind the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Bind Virtual Dom
     * @param {string} ViewName View Name
     * @param {any} sendData Transmission data contents
     * @returns {View}
     */
    public static bind(mjs: ModernJS, ViewName : string, sendData : any) : View;

    public static bind(mjs: ModernJS, ViewName? : string, sendData? : any) : View {
        if(ViewName) ViewName = "view/" + ViewName;
        return super.bind(mjs, ViewName, sendData, this) as View;
    }

    /**
     * ***append*** : Appends the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS) : View;

    /**
     * ***append*** : Appends the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @param {string} ViewName View name
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS, ViewName : string) : View;
    
    /**
     * ***append*** : Appends the View content to the specified virtual DOM class.
     * @param {ModernJS} mjs Append Virtual Dom
     * @param {string} ViewName View name
     * @param {any} sendData Transmission data contents
     * @returns {Dialog}
     */
    public static append(mjs: ModernJS, ViewName : string, sendData : any) : View;
    
    public static append(mjs: ModernJS, ViewName? : string, sendData? : any) : View {
        if(ViewName) ViewName = "view/" + ViewName;
        return super.append(mjs, ViewName, sendData, this) as View;
    }

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
     * ***template*** : 
     * If you have a template HTML file, specify it here.
     */
    public template : string = null;

    /**
     * ***head*** : If there is a UI to set in the head tag, you can specify it.  
     */
    public head : string;

    /**
     * ***header*** : If there is a UI to set in the header tag, you can specify it.  
     */
    public header : string;

    /**
     * ***footer*** : If there is a UI to set in the footer tag, you can specify it.  
     */
    public footer : string;

    /**
     * ***handle*** : 
     * A handler that runs automatically when the view is drawn on the screen.  
     * This event is executed only when rendered.
     */
    public handle(...aregment : Array<string | number>) : void{}

    /**
     * handleNext
     * A handler that runs automatically when the screen is painted after advancing from the previous screen.
     */
    public handleNext(...aregment : Array<string | number>) : void{}

    /**
     * handleBack
     * A handler that runs automatically when painting after returning from the previous screen.
     */
    public handleBack(...aregment : Array<string | number>) :void {}

    /**
     * ***handleAlways*** : A handler that runs automatically when the View is displayed on screen.  
     * This event is always executed even if the same View has already been rendered..
     */
    public handleAlways() : void | Promise<void> {}

    /**
     * ***handleBegin*** : A handler executed just before transitioning to the page.
     */
    public handleBegin() : void | Promise<void> {}

    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    public handleBefore(beginStatus? : boolean) : void | Promise<void> {}
    
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    public handleAfter(beginStatus? : boolean) : void | Promise<void> {}

    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    public handleRenderBefore(beginStatus? : boolean) : void | Promise<void> {}

    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed, 
     * and after the event for each action is completed.
     */
    public handleRenderAfter(beginStatus? : boolean) :void | Promise<void> {}

    /**
     * ***handleLeave*** : A handler executed when leaving the page.
     */
    public handleLeave() : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     */
    public handleLeaveBack() : void | boolean | Promise<void> | Promise<boolean> {}

    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     */
    public handleLeaveNext() : void | boolean | Promise<void> | Promise<boolean> {}

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