"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
/**
 * ***Controller*** : Main class for each screen.
 * handlers for multiple screens can be managed collectively using public methods.
 */
class Controller {
    /**
     * ***myMjs*** : Virtual Dom for content.
     */
    myMjs;
    /**
     * ***mjs**** : Virtual DOM List of VirtualDom Classes.
     */
    mjs;
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of VirtualDom Classes.
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
     * If not specified, the "rendering/View/{ControllerName}/{ActionName}.html" file will be displayed as the HTML source by default.
     */
    view = null;
    /**
     * ***template*** : If you have a template HTML file, specify it here.
     */
    template = null;
    /**
     * ***head*** : If there is a UI to set in the head tag, you can specify it.
     */
    head;
    /**
     * ***header*** : If there is a UI to set in the header tag, you can specify it.
     */
    header;
    /**
     * ***footer*** : If there is a UI to set in the footer tag, you can specify it.
     */
    footer;
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    handleBefore() { }
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    handleAfter() { }
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    handleRenderBefore() { }
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    handleRenderAfter() { }
    /**
     * ***handleLeave*** : A handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    handleLeave(action) { }
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     * @param {string} action before access controller action name
     */
    handleLeaveBack(action) { }
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     * @param {string} action before access controller action name
     */
    handleLeaveNext(action) { }
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
exports.Controller = Controller;
