"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var Routes_1 = require("Routes");
var Response_1 = require("Response");
/**
 * ***Controller*** : Main class for each screen.
 * handlers for multiple screens can be managed collectively using public methods.
 */
var Controller = /** @class */ (function () {
    function Controller() {
        /**
         * ***beginStatus*** :
         */
        this.beginStatus = false;
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{ControllerName}/{ActionName}.html" file will be displayed as the HTML source by default.
         */
        this.view = null;
        /**
         * ***template*** : If you have a template HTML file, specify it here.
         */
        this.template = null;
    }
    Object.defineProperty(Controller.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Controller.prototype, "vdos", {
        /**
         * ***vdos*** : Virtual DOM List of ModernJS Classes.
         */
        get: function () {
            return this.mjs;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***setView*** : Set the page view path to display.
     * If not specified, automatically determined by "{Controller Name}/{action name}"
     * If you use it, place the HTML file in the path "rendering/View/{Controller Name}/{action Name}.html".
     * @param {string} viewName view name
     * @returns {void}
     */
    Controller.prototype.setView = function (viewName) {
        this.view = viewName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setTemplate*** : Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     * @param {string} templateName template name
     * @returns {void}
    */
    Controller.prototype.setTemplate = function (templateName) {
        this.template = templateName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.
     * @param headName
     */
    Controller.prototype.setHead = function (headName) {
        this.head = headName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.
     * @param headerName
     */
    Controller.prototype.setHeader = function (headerName) {
        this.header = headerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it.
     * @param footerName
     */
    Controller.prototype.setFooter = function (footerName) {
        this.header = footerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    Controller.prototype.handleBefore = function () { };
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    Controller.prototype.handleAfter = function () { };
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    Controller.prototype.handleRenderBefore = function () { };
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    Controller.prototype.handleRenderAfter = function () { };
    /**
     * ***handleLeave*** : A handler executed when leaving the page
     * @param {string} action before access controller action name
     */
    Controller.prototype.handleLeave = function (action) { };
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     * @param {string} action before access controller action name
     */
    Controller.prototype.handleLeaveBack = function (action) { };
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     * @param {string} action before access controller action name
     */
    Controller.prototype.handleLeaveNext = function (action) { };
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    Controller.prototype.handleTemplateChanged = function (template) { };
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    Controller.prototype.handleHeadChanged = function (head) { };
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    Controller.prototype.handleHeaderChanged = function (header) { };
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    Controller.prototype.handleFooterChanged = function (footer) { };
    return Controller;
}());
exports.Controller = Controller;
