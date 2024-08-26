"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.Response = void 0;
var App_1 = require("App");
var Routes_1 = require("Routes");
var Util_1 = require("Util");
var Data_1 = require("Data");
var UI_1 = require("UI");
var ModernJS_1 = require("ModernJS");
var Shortcode_1 = require("Shortcode");
var Dialog_1 = require("Dialog");
var Response = /** @class */ (function () {
    function Response() {
    }
    Response.back = function () {
        if (Response.lock)
            return false;
        var MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return false;
            Data_1.Data.pop("history");
            var backUrl = Data_1.Data.now("history");
            var route = Routes_1.Routes.searchRoute(backUrl);
            Response.rendering(route).then(function () {
                Data_1.Data.set("stepMode", false);
            });
        }
        else if (MyApp.routeType == App_1.AppRouteType.web) {
            history.back();
        }
        return true;
    };
    Response.next = function (url, send) {
        if (Response.lock)
            return;
        var MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            Data_1.Data.set("stepMode", true);
            Data_1.Data.push("history", url);
            var route = Routes_1.Routes.searchRoute(url);
            Response.rendering(route, send).then(function () {
                Data_1.Data.set("stepMode", false);
            });
        }
        else {
            location.hash = "#" + url;
        }
    };
    Response.historyClear = function () {
        Data_1.Data.set("history", []);
    };
    Response.isNext = function () {
        if (Data_1.Data.get("stepMode"))
            return true;
        return false;
    };
    Response.isBack = function () {
        return !this.isNext();
    };
    Response.rendering = function (route, send) {
        return __awaiter(this, void 0, void 0, function () {
            var MyApp, befCont, befView, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MyApp = require("app/config/App").MyApp;
                        if (!MyApp.delay) return [3 /*break*/, 2];
                        return [4 /*yield*/, Util_1.Util.sleep(MyApp.delay)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 11, , 12]);
                        befCont = Data_1.Data.get("beforeController");
                        if (!befCont) return [3 /*break*/, 4];
                        return [4 /*yield*/, befCont.handleLeave(Data_1.Data.get("beforeControllerAction"))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        befView = Data_1.Data.get("beforeView");
                        if (!befView) return [3 /*break*/, 6];
                        return [4 /*yield*/, befView.handleLeave()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                            throw ("Page Not found");
                        if (!route.controller) return [3 /*break*/, 8];
                        return [4 /*yield*/, Response.renderingOnController(route, send)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        if (!route.view) return [3 /*break*/, 10];
                        return [4 /*yield*/, Response.renderingOnView(route, send)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 12];
                    case 12: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnController = function (route, send) {
        return __awaiter(this, void 0, void 0, function () {
            var controllerName, controllerPath, controllerClass, cont, viewName, viewPath, vw, View_, method, method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controllerName = Util_1.Util.getModuleName(route.controller + "Controller");
                        controllerPath = "app/controller/" + Util_1.Util.getModulePath(route.controller + "Controller");
                        if (!useExists(controllerPath)) {
                            throw ("\"" + controllerPath + "\" Class is not found.");
                        }
                        controllerClass = use(controllerPath);
                        cont = new controllerClass[controllerName]();
                        cont.sendData = send;
                        viewName = route.action + "View";
                        viewPath = "app/view/" + route.controller + "/" + Util_1.Util.getModulePath(viewName);
                        if (useExists(viewPath)) {
                            View_ = use(viewPath);
                            if (!View_[Util_1.Util.getModuleName(viewName)]) {
                                console.error("[WARM] \"" + Util_1.Util.getModuleName(viewName) + "\"View Class not exists.");
                            }
                            else {
                                vw = new View_[Util_1.Util.getModuleName(viewName)]();
                                vw.sendData = send;
                            }
                        }
                        if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
                            Data_1.Data.set("beforeControllerPath", controllerPath);
                            cont.beginStatus = true;
                        }
                        return [4 /*yield*/, cont.handleBefore()];
                    case 1:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 3];
                        return [4 /*yield*/, vw.handleBefore()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        Data_1.Data.set("beforeController", cont);
                        Data_1.Data.set("beforeControllerAction", route.action);
                        Data_1.Data.set("beforeView", null);
                        Data_1.Data.set("beforeViewPath", null);
                        Data_1.Data.set("childClasss", {});
                        if (!cont["before_" + route.action]) return [3 /*break*/, 7];
                        method = "before_" + route.action;
                        if (!route.args) return [3 /*break*/, 5];
                        return [4 /*yield*/, cont[method].apply(cont, route.args)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, cont[method]()];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, cont.handleAfter()];
                    case 8:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 10];
                        return [4 /*yield*/, vw.handleAfter()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, Response.__rendering(route, cont)];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, cont.handleRenderBefore()];
                    case 12:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 14];
                        return [4 /*yield*/, vw.handleRenderBefore()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!cont[route.action]) return [3 /*break*/, 18];
                        method = route.action;
                        if (!route.args) return [3 /*break*/, 16];
                        return [4 /*yield*/, cont[method].apply(cont, route.args)];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, cont[method]()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        if (!vw) return [3 /*break*/, 22];
                        if (!route.args) return [3 /*break*/, 20];
                        return [4 /*yield*/, vw.handle.apply(vw, route.args)];
                    case 19:
                        _a.sent();
                        return [3 /*break*/, 22];
                    case 20: return [4 /*yield*/, vw.handle()];
                    case 21:
                        _a.sent();
                        _a.label = 22;
                    case 22: return [4 /*yield*/, cont.handleRenderAfter()];
                    case 23:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 25];
                        return [4 /*yield*/, vw.handleRenderAfter()];
                    case 24:
                        _a.sent();
                        _a.label = 25;
                    case 25: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnView = function (route, send) {
        return __awaiter(this, void 0, void 0, function () {
            var viewName, viewPath, View_, vm;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewName = Util_1.Util.getModuleName(route.view + "View");
                        viewPath = "app/view/" + Util_1.Util.getModulePath(route.view + "View");
                        if (!useExists(viewPath)) {
                            throw ("\"" + viewName + "\" Class is not found.");
                        }
                        View_ = use(viewPath);
                        vm = new View_[viewName]();
                        vm.sendData = send;
                        if (!(Data_1.Data.get("beforeViewPath") != viewPath)) return [3 /*break*/, 2];
                        Data_1.Data.set("beforeViewPath", viewPath);
                        if (!vm.handleBegin) return [3 /*break*/, 2];
                        return [4 /*yield*/, vm.handleBegin()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        Data_1.Data.set("beforeView", vm);
                        Data_1.Data.set("beforeController", null);
                        Data_1.Data.set("beforeControllerPath", null);
                        Data_1.Data.set("beforeControllerAction", null);
                        Data_1.Data.set("childClasss", {});
                        return [4 /*yield*/, vm.handleBefore()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, vm.handleAfter()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, Response.__rendering(route, vm)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, vm.handleRenderBefore()];
                    case 6:
                        _a.sent();
                        if (!route.args) return [3 /*break*/, 8];
                        return [4 /*yield*/, vm.handle.apply(vm, route.args)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, vm.handle()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [4 /*yield*/, vm.handleRenderAfter()];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Response.__rendering = function (route, context) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeTemplate, viewHtml, beforeHead, beforeHeader, beforeFooter;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!context.view) {
                            if (route.controller) {
                                context.view = route.controller + "/" + route.action;
                            }
                            else if (route.view) {
                                context.view = route.view;
                            }
                        }
                        if (!context.template) return [3 /*break*/, 3];
                        beforeTemplate = Data_1.Data.get("beforeTemplate");
                        if (!(beforeTemplate != context.template)) return [3 /*break*/, 2];
                        // Template Rendering...
                        Data_1.Data.set("beforeTemplate", context.template);
                        this.bindTemplate((0, ModernJS_1.dom)("body"), context.template);
                        context.mjs = ModernJS_1.ModernJS.reload();
                        if (!context.handleTemplateChanged) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.handleTemplateChanged()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        Data_1.Data.set("beforeTemplate", null);
                        _a.label = 4;
                    case 4:
                        viewHtml = Response.view(context.view);
                        if (!(0, ModernJS_1.dom)("main").length)
                            (0, ModernJS_1.dom)("body").append("<main></main>");
                        (0, ModernJS_1.dom)("main").html = "<article>" + viewHtml + "</article>";
                        context.mjs = ModernJS_1.ModernJS.reload();
                        beforeHead = Data_1.Data.get("beforeHead");
                        if (!(beforeHead != context.head)) return [3 /*break*/, 8];
                        Data_1.Data.set("beforeHead", context.head);
                        if (!context.head) return [3 /*break*/, 7];
                        this.bindUI((0, ModernJS_1.dom)("head"), context.head);
                        context.mjs = ModernJS_1.ModernJS.reload();
                        if (!context.handleHeadChanged) return [3 /*break*/, 6];
                        return [4 /*yield*/, context.handleHeadChanged()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        (0, ModernJS_1.dom)("head").html = "";
                        context.mjs = ModernJS_1.ModernJS.reload();
                        _a.label = 8;
                    case 8:
                        beforeHeader = Data_1.Data.get("beforeHeader");
                        if (!(beforeHeader != context.header)) return [3 /*break*/, 12];
                        Data_1.Data.set("beforeHeader", context.header);
                        if (!context.header) return [3 /*break*/, 11];
                        this.bindUI((0, ModernJS_1.dom)("header"), context.header);
                        context.mjs = ModernJS_1.ModernJS.reload();
                        if (!context.handleHeaderChanged) return [3 /*break*/, 10];
                        return [4 /*yield*/, context.handleHeaderChanged()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        (0, ModernJS_1.dom)("header").html = "";
                        context.mjs = ModernJS_1.ModernJS.reload();
                        _a.label = 12;
                    case 12:
                        beforeFooter = Data_1.Data.get("beforeFooter");
                        if (!(beforeFooter != context.footer)) return [3 /*break*/, 16];
                        Data_1.Data.set("beforeFooter", context.footer);
                        if (!context.footer) return [3 /*break*/, 15];
                        this.bindUI((0, ModernJS_1.dom)("footer"), context.footer);
                        context.mjs = ModernJS_1.ModernJS.reload();
                        if (!context.handleFooterChanged) return [3 /*break*/, 14];
                        return [4 /*yield*/, context.handleFooterChanged()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        (0, ModernJS_1.dom)("footer").html = "";
                        context.mjs = ModernJS_1.ModernJS.reload();
                        _a.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ***renderHtml** : Get Rendering HTML content information.
     * @param {string} renderName rendering html Name
     * @returns {string}
     */
    Response.renderHtml = function (renderName) {
        var renderPath = "rendering/" + renderName + ".html";
        if (!useExists(renderPath)) {
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.");
            return;
        }
        var content = use(renderPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    };
    /**
     * *** view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    Response.view = function (viewName) {
        return this.renderHtml("view/" + viewName);
    };
    /**
     * ***bindView***
     * @param mjs
     * @param viewName
     * @param sendData
     * @returns
     */
    Response.bindView = function (mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        mjs.reload();
        return this.loadClass("View", viewName, mjs, sendData);
    };
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    Response.template = function (templateName) {
        return this.renderHtml("template/" + templateName);
    };
    /**
     * ***bindTemplate***
     * @param mjs
     * @param templateName
     * @param sendData
    * @returns
     */
    Response.bindTemplate = function (mjs, templateName, sendData) {
        mjs.html = this.template(templateName);
        mjs.reload();
        return this.loadClass("Template", templateName, mjs, sendData);
    };
    /**
     * ***UI*** :
     * Get UI content information.
     * @param {string} uiName UI Name
     * @returns {string} UI contents
     */
    Response.UI = function (uiName) {
        return this.renderHtml("ui/" + uiName);
    };
    /**
     * ***bindUI***
     * @param mjs
     * @param UIName
     * @param sendData
     * @returns
     */
    Response.bindUI = function (mjs, UIName, sendData) {
        mjs.html = this.UI(UIName);
        mjs.reload();
        return this.loadClass("UI", UIName, mjs, sendData);
    };
    /**
     * ***appendUI***
     * @param mjs
     * @param UIName
     * @param sendData
     * @returns
     */
    Response.appendUI = function (mjs, UIName, sendData) {
        mjs.append(this.UI(UIName), true);
        var myMjs = new ModernJS_1.ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("UI", UIName, myMjs, sendData);
    };
    /**
     * ***dialog***
     * @param dialogName
     * @returns
     */
    Response.dialog = function (dialogName) {
        return this.renderHtml("dialog/" + dialogName);
    };
    /**
     * ***openDialog***
     * @param dialogName
     * @param option
     * @returns
     */
    Response.openDialog = function (dialogName, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        var dialogStr = "<dwindow>" + this.dialog(dialogName) + "</dwindow>";
        var dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach(function (c) {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs);
        setTimeout(function () {
            dialogMjs.addClass("open");
        }, 100);
        var dialog = this.loadClass("Dialog", dialogName, dialogMjs, option.sendData);
        if (!dialog) {
            dialog = new Dialog_1.Dialog();
            dialog.myMjs = dialogMjs;
            dialog.mjs = dialogMjs.childs;
        }
        if (option.handle)
            option.handle(dialog);
        return dialog;
    };
    Response.openDialogOrigin = function (dialogHtml, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        var dialogStr = "<dwindow>" + dialogHtml + "</dwindow>";
        var dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach(function (c) {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs);
        setTimeout(function () {
            dialogMjs.addClass("open");
        }, 100);
        var dialog = new Dialog_1.Dialog();
        dialog.myMjs = dialogMjs;
        dialog.mjs = dialogMjs.childs;
        if (option.handle)
            option.handle(dialog);
        return dialog;
    };
    Response.setDialogCss = function () {
        if ((0, ModernJS_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        var style = require("CORERES/dialog/style.css");
        (0, ModernJS_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    };
    Response.loadClass = function (classType, loadClassName, mjs, sendData) {
        var className = Util_1.Util.getModuleName(loadClassName + classType);
        var classPath = Util_1.Util.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
        var classObj;
        try {
            var classObj_ = require(classPath);
            classObj = new classObj_[className]();
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }
        catch (error) {
            if (classType == "UI") {
                classObj = new UI_1.UI();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            else if (classType == "Dialog") {
                classObj = new Dialog_1.Dialog();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            return classObj;
        }
        if (classObj.handle)
            classObj.handle(sendData);
        return classObj;
    };
    Response.renderConvert = function (content) {
        var tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0)
            tagName = "tbody";
        var el0 = document.createElement(tagName);
        el0.innerHTML = content;
        // link tag check...
        var links = el0.querySelectorAll("link");
        links.forEach(function (el) {
            var href = el.attributes["href"].value;
            if (!Util_1.Util.existResource(href))
                return;
            var resource = Util_1.Util.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        var imgs = el0.querySelectorAll("img");
        imgs.forEach(function (el) {
            var src = el.attributes["src"].value;
            if (!Util_1.Util.existResource(src))
                return;
            var resource = Util_1.Util.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    };
    Response.lock = false;
    return Response;
}());
exports.Response = Response;
