"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Render_1 = require("Render");
/**
 * ***View*** : Main class for each screen.
 */
class View extends Render_1.Render {
    constructor() {
        super(...arguments);
        /**
         * ***beginStatus*** :
         */
        this.beginStatus = false;
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
         */
        this.view = null;
        /**
         * ***template*** :
         * If you have a template HTML file, specify it here.
         */
        this.template = null;
    }
    static bind(mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return super.bind(mjs, ViewName, sendData, this);
    }
    static append(mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return super.append(mjs, ViewName, sendData, this);
    }
    /**
     * ***handle*** :
     * A handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * ***handleAlways*** : A handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    /**
     * ***handleBegin*** : A handler executed just before transitioning to the page.
     */
    handleBegin() { }
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus) { }
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus) { }
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus) { }
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus) { }
    /**
     * ***handleLeave*** : A handler executed when leaving the page.
     */
    handleLeave() { }
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     */
    handleLeaveBack() { }
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     */
    handleLeaveNext() { }
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged(template) { }
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged(head) { }
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged(header) { }
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    handleFooterChanged(footer) { }
}
exports.View = View;
View.type = "View";
