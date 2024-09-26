"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var Routes_1 = require("Routes");
var Response_1 = require("Response");
/**
 * ***View*** : Main class for each screen.
 */
var View = /** @class */ (function () {
    function View() {
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
    Object.defineProperty(View.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(View.prototype, "vdos", {
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
     * ***setView*** :
     * Set the page view path to display.
     * If not specified, automatically determined by "{viewName}"
     * If you use it, place the HTML file in the path "rendering/View/{viewName}.html".
     */
    View.prototype.setView = function (value) {
        this.view = value;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setTemplate*** :
     * Specifies the template name to use on the displayed page.
     * When using it, place the TML file for the template with the specified name in the "rendering/Template" directory.
     */
    View.prototype.setTemplate = function (value) {
        this.template = value;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHead*** : If there is a UI to set in the head tag, you can specify it.
     * @param headName
     */
    View.prototype.setHead = function (headName) {
        this.head = headName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setHeader*** : If there is a UI to set in the header tag, you can specify it.
     * @param headerName
     */
    View.prototype.setHeader = function (headerName) {
        this.header = headerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***setFooter*** : If there is a UI to set in the footer tag, you can specify it.
     * @param footerName
     */
    View.prototype.setFooter = function (footerName) {
        this.header = footerName;
        var routes = Routes_1.Routes.getRoute();
        Response_1.Response.__rendering(routes, this);
    };
    /**
     * ***handle*** :
     * A handler that runs automatically when the view is drawn on the screen.
     * This event is executed only when rendered.
     */
    View.prototype.handle = function () {
        var aregment = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aregment[_i] = arguments[_i];
        }
    };
    /**
     * ***handleAlways*** : A handler that runs automatically when the View is displayed on screen.
     * This event is always executed even if the same View has already been rendered..
     */
    View.prototype.handleAlways = function () { };
    /**
     * ***handleBegin*** : A handler executed just before transitioning to the page.
     */
    View.prototype.handleBegin = function () { };
    /**
     * ***handleBefore*** : A handler executed just before transitioning to the page.
     */
    View.prototype.handleBefore = function (beginStatus) { };
    /**
     * ***handleAfter*** : A handler executed immediately after transitioning to the page
     */
    View.prototype.handleAfter = function (beginStatus) { };
    /**
     * ***handleRenderBefore*** : A handler executed immediately after page transition and rendering process to the screen is completed
     */
    View.prototype.handleRenderBefore = function (beginStatus) { };
    /**
     * ***handleRenderAfter*** : A handler that is executed after page transition, after rendering process to the screen is completed,
     * and after the event for each action is completed.
     */
    View.prototype.handleRenderAfter = function (beginStatus) { };
    /**
     * ***handleLeave*** : A handler executed when leaving the page.
     */
    View.prototype.handleLeave = function () { };
    /**
     * ***handleLeaveBack*** : Handler that is executed when returning to the previous screen.
     */
    View.prototype.handleLeaveBack = function () { };
    /**
     * ***handleLeaveNext*** : Handler that runs when proceeding to the next screen
     */
    View.prototype.handleLeaveNext = function () { };
    /**
     * ***handleTemplateChanged*** : A handler that runs when the template specified in the member variable template changes.
     */
    View.prototype.handleTemplateChanged = function (template) { };
    /**
     * ***handleHeadChanged*** : A handler that runs when the template specified in the member variable head tag changes.
     */
    View.prototype.handleHeadChanged = function (head) { };
    /**
     * ***handleHeaderChanged*** : A handler that runs when the template specified in the member variable header tag changes.
     */
    View.prototype.handleHeaderChanged = function (header) { };
    /**
     * ***handleFooterChanged*** : A handler that runs when the template specified in the member variable footer tag changes.
     */
    View.prototype.handleFooterChanged = function (footer) { };
    return View;
}());
exports.View = View;
