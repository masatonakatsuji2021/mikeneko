"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Routes_1 = require("Routes");
const Response_1 = require("Response");
/**
 * ***View*** : Main class for each screen.
 */
class View {
    constructor() {
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
    /**
     * ***setView*** :
     * Set the page view path to display.
     * If not specified, automatically determined by "{viewName}"
     * If you use it, place the HTML file in the path "rendering/View/{viewName}.html".
     */
    setView(value) {
        this.view = value;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setTemplate*** :
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    setTemplate(value) {
        this.template = value;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.
     * @param headName
     */
    setHead(headName) {
        this.head = headName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.
     * @param headerName
     */
    setHeader(headerName) {
        this.header = headerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it.
     * @param footerName
     */
    setFooter(footerName) {
        this.header = footerName;
        const routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    }
    /**
     * ***handle*** :
     * An event handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    handle(...aregment) { }
    /**
     * ***handleAlways*** : An event handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    handleAlways() { }
    /**
     * ***handleBegin*** : Event handler executed just before transitioning to the page.
     */
    handleBegin() { }
    /**
     * ***handleBefore*** : Event handler executed just before transitioning to the page.
     */
    handleBefore(beginStatus) { }
    /**
     * ***handleAfter*** : Event handler executed immediately after transitioning to the page
     */
    handleAfter(beginStatus) { }
    /**
     * ***handleRenderBefore*** : Event handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore(beginStatus) { }
    /**
     * ***handleRenderAfter*** : Event handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter(beginStatus) { }
    /**
     * ***handleLeave*** : Event handler executed when leaving the page.
     */
    handleLeave() { }
    /**
     * ***handleTemplateChanged*** : An event handler that runs when the template specified in the member variable template changes.
     */
    handleTemplateChanged() { }
    /**
     * ***handleHeadChanged*** : An event handler that runs when the template specified in the member variable head tag changes.
     */
    handleHeadChanged() { }
    /**
     * ***handleHeaderChanged*** : An event handler that runs when the template specified in the member variable header tag changes.
     */
    handleHeaderChanged() { }
    /**
     * ***handleFooterChanged*** : An event handler that runs when the template specified in the member variable footer tag changes.
     */
    handleFooterChanged() { }
}
exports.View = View;
