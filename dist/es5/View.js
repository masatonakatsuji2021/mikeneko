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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
var Render_1 = require("Render");
var VirtualDom_1 = require("VirtualDom");
var Lib_1 = require("Lib");
var Data_1 = require("Data");
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
    View.stackOpen = function () {
        var _this = this;
        var aregments = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            aregments[_i] = arguments[_i];
        }
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var view, MyApp, article, main;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        view = new this();
                        MyApp = require("app/config/App").MyApp;
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                        if (!MyApp.delay) return [3 /*break*/, 2];
                        return [4 /*yield*/, Lib_1.Lib.sleep(MyApp.delay)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        article = VirtualDom_1.VirtualDom.create(this.getHtml(), "article");
                        main = (0, VirtualDom_1.dom)("main");
                        main.append(article);
                        view.mjs = main.childs;
                        Data_1.Data.set("backHandle", function () { return __awaiter(_this, void 0, void 0, function () {
                            var output;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (MyApp.animationCloseClassName)
                                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
                                        if (MyApp.animationOpenClassName)
                                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                                        if (!MyApp.delay) return [3 /*break*/, 2];
                                        return [4 /*yield*/, Lib_1.Lib.sleep(MyApp.delay)];
                                    case 1:
                                        _a.sent();
                                        _a.label = 2;
                                    case 2:
                                        (0, VirtualDom_1.dom)("main article:last-child").remove();
                                        if (MyApp.animationCloseClassName)
                                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                                        if (MyApp.animationOpenClassName)
                                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                                        return [4 /*yield*/, view.handleLeaveStackClose()];
                                    case 3:
                                        output = _a.sent();
                                        resolve(output);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                        if (!aregments) return [3 /*break*/, 4];
                        return [4 /*yield*/, view.handle.apply(view, aregments)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, view.handle()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        }); });
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
    /**
     * ***handleLeaveStackClose*** : Handler that is executed when the screen is removed after being temporarily displayed foreground using stackOpen
     * @returns
     */
    View.prototype.handleLeaveStackClose = function () { return; };
    View.type = "View";
    return View;
}(Render_1.Render));
exports.View = View;
