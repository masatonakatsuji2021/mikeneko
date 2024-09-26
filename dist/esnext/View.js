"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const Routes_1 = require("Routes");
const Response_1 = require("Response");
/**
 * ***View*** : Main class for each screen.
 */
class View {
    /**
     * ***myMjs*** : Virtual Dom for content.
     */
    myMjs;
    /**
     * ***mjs**** : Virtual DOM List of ModernJS Classes.
     */
    mjs;
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***sendData*** :
     */
    sendData;
    /**
     * ***beginStatus*** :
     */
    beginStatus = false;
    /**
     * ***view*** : Change the view name to be displayed.
     * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
     */
    view = null;
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
     * ***template*** :
     * If you have a template HTML file, specify it here.
     */
    template = null;
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
     * ***head*** : If there is a UI to set in the head tag, you can specify it.
     */
    head;
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
     * ***header*** : If there is a UI to set in the header tag, you can specify it.
     */
    header;
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
     * ***footer*** : If there is a UI to set in the footer tag, you can specify it.
     */
    footer;
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
