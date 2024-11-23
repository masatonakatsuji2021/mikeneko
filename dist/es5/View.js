"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var Render_1 = require("Render");
/**
 * ***View*** : Main class for each screen.
 */
var View = /** @class */ (function (_super) {
    __extends(View, _super);
    function View() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * ***beginStatus*** :
         */
        _this.beginStatus = false;
        /**
         * ***view*** : Change the view name to be displayed.
         * If not specified, the "rendering/View/{viewName}.html" file will be displayed as the HTML source by default.
         */
        _this.view = null;
        /**
         * ***template*** :
         * If you have a template HTML file, specify it here.
         */
        _this.template = null;
        return _this;
    }
    View.bind = function (mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return _super.bind.call(this, mjs, ViewName, sendData, this);
    };
    View.append = function (mjs, ViewName, sendData) {
        if (ViewName)
            ViewName = "view/" + ViewName;
        return _super.append.call(this, mjs, ViewName, sendData, this);
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
     * handleNext
     * A handler that runs automatically when the screen is painted after advancing from the previous screen.
     */
    View.prototype.handleNext = function () {
        var aregment = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aregment[_i] = arguments[_i];
        }
    };
    /**
     * handleBack
     * A handler that runs automatically when painting after returning from the previous screen.
     */
    View.prototype.handleBack = function () {
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
    View.type = "View";
    return View;
}(Render_1.Render));
exports.View = View;
