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
exports.Response = void 0;
var App_1 = require("App");
var Routes_1 = require("Routes");
var Lib_1 = require("Lib");
var Data_1 = require("Data");
var View_1 = require("View");
var Template_1 = require("Template");
var UI_1 = require("UI");
var VirtualDom_1 = require("VirtualDom");
var Response = /** @class */ (function () {
    function Response() {
    }
    Object.defineProperty(Response, "routeType", {
        get: function () {
            var MyApp = use("app/config/App").MyApp;
            return MyApp.routeType;
        },
        enumerable: false,
        configurable: true
    });
    Response.back = function (index) {
        var _this = this;
        if (!index)
            index = 1;
        if (Response.lock)
            return false;
        if (this.isBack)
            return false;
        this.isBack = true;
        if (Data_1.Data.get("backHandle")) {
            var backHandle = Data_1.Data.get("backHandle");
            Data_1.Data.remove("backHandle");
            backHandle();
            this.isBack = false;
            return true;
        }
        var hdata;
        for (var n = 0; n < index; n++) {
            if (this.routeType == App_1.AppRouteType.application) {
                if (Data_1.Data.getLength("history") == 1)
                    return false;
                Data_1.Data.pop("history");
                hdata = Data_1.Data.now("history");
            }
            else if (this.routeType == App_1.AppRouteType.web) {
                history.back();
            }
        }
        if (this.routeType == App_1.AppRouteType.web)
            return true;
        var route = Routes_1.Routes.searchRoute(hdata.url.toString());
        Response.rendering(route, hdata.data).then(function () {
            _this.isBack = false;
        });
        return true;
    };
    Response.next = function (url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        var hdata = {
            url: url,
            data: data,
        };
        Data_1.Data.push("history", hdata);
        var route = Routes_1.Routes.searchRoute(url.toString());
        Response.rendering(route, data);
        if (this.routeType == App_1.AppRouteType.web)
            location.href = "#" + url;
    };
    /**
     * ***addhistory*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string} url route path
     * @returns {void}
     */
    Response.addHistory = function (url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        var hdata = {
            url: url,
            data: data,
        };
        Data_1.Data.push("history", hdata);
    };
    /**
     * ***historyClear*** : Clear screen transition history
     * @returns {void}
     */
    Response.historyClear = function () {
        Data_1.Data.set("history", []);
    };
    /**
     * ***pop*** : Go back to the previous screen transition.
     * @returns {void}
     */
    Response.pop = function () {
        Data_1.Data.pop("history");
    };
    Response.replace = function (url, send) {
        this.pop();
        this.next(url, send);
    };
    /**
     * ***now*** : Get current route path.
     * @returns {string}
     */
    Response.now = function () {
        return Routes_1.Routes.getRoute().url;
    };
    Object.defineProperty(Response, "isNext", {
        /**
         * ***isNext*** : A flag that determines if you have proceeded from the next screen.
         */
        get: function () {
            return !this.isBack;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response, "nowView", {
        /**
         * ***nowView*** : Get the current View class object if there is one.
         */
        get: function () {
            if (Data_1.Data.get("beforeView"))
                return Data_1.Data.get("beforeView");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Response, "nowController", {
        /**
         * ***nowController*** : Get the current Controller class object if there is one.
         */
        get: function () {
            if (Data_1.Data.get("beforeController"))
                return Data_1.Data.get("beforeController");
        },
        enumerable: false,
        configurable: true
    });
    // rendering....
    Response.rendering = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            var MyApp, befCont, befContAction, res, resBack, resNext, befView, res, resBack, resNext;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        MyApp = use("app/config/App").MyApp;
                        befCont = Data_1.Data.get("beforeController");
                        if (!befCont) return [3 /*break*/, 5];
                        befContAction = Data_1.Data.get("beforeControllerAction");
                        return [4 /*yield*/, befCont.handleLeave(befContAction)];
                    case 1:
                        res = _a.sent();
                        if (typeof res == "boolean" && res === false)
                            return [2 /*return*/];
                        if (!this.isBack) return [3 /*break*/, 3];
                        return [4 /*yield*/, befCont.handleLeaveBack(befContAction)];
                    case 2:
                        resBack = _a.sent();
                        if (typeof resBack == "boolean" && resBack === false)
                            return [2 /*return*/];
                        _a.label = 3;
                    case 3:
                        if (!this.isNext) return [3 /*break*/, 5];
                        return [4 /*yield*/, befCont.handleLeaveNext(befContAction)];
                    case 4:
                        resNext = _a.sent();
                        if (typeof resNext == "boolean" && resNext === false)
                            return [2 /*return*/];
                        _a.label = 5;
                    case 5:
                        befView = Data_1.Data.get("beforeView");
                        if (!befView) return [3 /*break*/, 10];
                        return [4 /*yield*/, befView.handleLeave()];
                    case 6:
                        res = _a.sent();
                        if (typeof res == "boolean" && res === false)
                            return [2 /*return*/];
                        if (!this.isBack) return [3 /*break*/, 8];
                        return [4 /*yield*/, befView.handleLeaveBack()];
                    case 7:
                        resBack = _a.sent();
                        if (typeof resBack == "boolean" && resBack === false)
                            return [2 /*return*/];
                        _a.label = 8;
                    case 8:
                        if (!this.isNext) return [3 /*break*/, 10];
                        return [4 /*yield*/, befView.handleLeaveNext()];
                    case 9:
                        resNext = _a.sent();
                        if (typeof resNext == "boolean" && resNext === false)
                            return [2 /*return*/];
                        _a.label = 10;
                    case 10:
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                        if (!MyApp.delay) return [3 /*break*/, 12];
                        return [4 /*yield*/, Lib_1.Lib.sleep(MyApp.delay)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        if (!(route.mode == Routes_1.DecisionRouteMode.Notfound)) return [3 /*break*/, 15];
                        if (!MyApp.notFoundView) return [3 /*break*/, 14];
                        route.view = MyApp.notFoundView;
                        return [4 /*yield*/, Response.renderingOnView(route, data)];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: throw ("Page Not found. \"" + route.url + "\"");
                    case 15:
                        if (!route.controller) return [3 /*break*/, 17];
                        return [4 /*yield*/, Response.renderingOnController(route, data)];
                    case 16:
                        _a.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        if (!route.view) return [3 /*break*/, 19];
                        return [4 /*yield*/, Response.renderingOnView(route, data)];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnController = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            var controllerName, controllerPath, controllerClass, cont, viewName, viewPath, vw, View_, method, method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        controllerName = Lib_1.Lib.getModuleName(route.controller + "Controller");
                        controllerPath = "app/controller/" + Lib_1.Lib.getModulePath(route.controller + "Controller");
                        if (!useExists(controllerPath)) {
                            throw ("\"" + controllerPath + "\" Class is not found.");
                        }
                        controllerClass = use(controllerPath);
                        cont = new controllerClass[controllerName]();
                        cont.sendData = data;
                        viewName = route.action + "View";
                        viewPath = "app/view/" + route.controller + "/" + Lib_1.Lib.getModulePath(viewName);
                        if (useExists(viewPath)) {
                            View_ = use(viewPath);
                            if (!View_[Lib_1.Lib.getModuleName(viewName)]) {
                                console.error("[WARM] \"" + Lib_1.Lib.getModuleName(viewName) + "\"View Class not exists.");
                            }
                            else {
                                vw = new View_[Lib_1.Lib.getModuleName(viewName)]();
                                vw.sendData = data;
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
    Response.renderingOnView = function (route, data) {
        return __awaiter(this, void 0, void 0, function () {
            var viewName, viewPath, View_, vm, MyApp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        viewName = Lib_1.Lib.getModuleName(route.view + "View");
                        viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
                        if (!useExists(viewPath)) {
                            throw ("\"" + viewName + "\" Class is not found.");
                        }
                        View_ = use(viewPath);
                        vm = new View_[viewName]();
                        vm.sendData = data;
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
                        MyApp = use("app/config/App").MyApp;
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                        vm.myMjs = (0, VirtualDom_1.dom)("main article");
                        return [4 /*yield*/, vm.handleRenderBefore()];
                    case 6:
                        _a.sent();
                        if (!Response.isNext) return [3 /*break*/, 10];
                        if (!route.args) return [3 /*break*/, 8];
                        return [4 /*yield*/, vm.handleNext.apply(vm, route.args)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8: return [4 /*yield*/, vm.handleNext()];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        if (!Response.isBack) return [3 /*break*/, 14];
                        if (!route.args) return [3 /*break*/, 12];
                        return [4 /*yield*/, vm.handleBack.apply(vm, route.args)];
                    case 11:
                        _a.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, vm.handleBack()];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14:
                        if (!route.args) return [3 /*break*/, 16];
                        return [4 /*yield*/, vm.handle.apply(vm, route.args)];
                    case 15:
                        _a.sent();
                        return [3 /*break*/, 18];
                    case 16: return [4 /*yield*/, vm.handle()];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18: return [4 /*yield*/, vm.handleRenderAfter()];
                    case 19:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Response.__rendering = function (route, context) {
        return __awaiter(this, void 0, void 0, function () {
            var beforeTemplate, template, viewHtml, main, beforeHead, head, beforeHeader, header, beforeFooter, footer;
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
                        template = Template_1.Template.bind((0, VirtualDom_1.dom)("body"), context.template);
                        if (!context.handleTemplateChanged) return [3 /*break*/, 2];
                        return [4 /*yield*/, context.handleTemplateChanged(template)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        Data_1.Data.set("beforeTemplate", null);
                        _a.label = 4;
                    case 4:
                        viewHtml = View_1.View.getHtml("view/" + context.view);
                        if (!(0, VirtualDom_1.dom)("main").length)
                            (0, VirtualDom_1.dom)("body").append("<main></main>");
                        main = (0, VirtualDom_1.dom)("main");
                        main.html = "<article>" + viewHtml + "</article>";
                        context.mjs = main.childs;
                        beforeHead = Data_1.Data.get("beforeHead");
                        if (!(beforeHead != context.head)) return [3 /*break*/, 8];
                        Data_1.Data.set("beforeHead", context.head);
                        if (!context.head) return [3 /*break*/, 7];
                        head = UI_1.UI.bind((0, VirtualDom_1.dom)("head"), context.head);
                        if (!context.handleHeadChanged) return [3 /*break*/, 6];
                        return [4 /*yield*/, context.handleHeadChanged(head)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        (0, VirtualDom_1.dom)("head").html = "";
                        _a.label = 8;
                    case 8:
                        beforeHeader = Data_1.Data.get("beforeHeader");
                        if (!(beforeHeader != context.header)) return [3 /*break*/, 12];
                        Data_1.Data.set("beforeHeader", context.header);
                        if (!context.header) return [3 /*break*/, 11];
                        header = UI_1.UI.bind((0, VirtualDom_1.dom)("header"), context.header);
                        if (!context.handleHeaderChanged) return [3 /*break*/, 10];
                        return [4 /*yield*/, context.handleHeaderChanged(header)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10: return [3 /*break*/, 12];
                    case 11:
                        (0, VirtualDom_1.dom)("header").html = "";
                        _a.label = 12;
                    case 12:
                        beforeFooter = Data_1.Data.get("beforeFooter");
                        if (!(beforeFooter != context.footer)) return [3 /*break*/, 16];
                        Data_1.Data.set("beforeFooter", context.footer);
                        if (!context.footer) return [3 /*break*/, 15];
                        footer = UI_1.UI.bind((0, VirtualDom_1.dom)("footer"), context.footer);
                        if (!context.handleFooterChanged) return [3 /*break*/, 14];
                        return [4 /*yield*/, context.handleFooterChanged(footer)];
                    case 13:
                        _a.sent();
                        _a.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        (0, VirtualDom_1.dom)("footer").html = "";
                        _a.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * ***isBack*** : A flag that determines if you are back from the previous screen.
     * True if you return from the previous screen, false if you proceed from the previous screen
     */
    Response.isBack = false;
    /**
     * ***lock*** : Flag to lock screen transition operations.
     * If set to true, back operations such as Response.back will be temporarily disabled.
     */
    Response.lock = false;
    return Response;
}());
exports.Response = Response;
