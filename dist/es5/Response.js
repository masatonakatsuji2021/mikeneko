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
            var MyApp = require("app/config/App").MyApp;
            return MyApp.routeType;
        },
        enumerable: false,
        configurable: true
    });
    Response.back = function (indexOrSearchURI) {
        return __awaiter(this, void 0, void 0, function () {
            var index, histories, n, h_, MyApp, hdata, n, nowHistory;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (Response.lock)
                            return [2 /*return*/, false];
                        if (this.isBack)
                            return [2 /*return*/, false];
                        if (indexOrSearchURI) {
                            if (typeof indexOrSearchURI == "string") {
                                index = 0;
                                histories = Data_1.Data.get("history");
                                for (n = 0; n < histories.length; n++) {
                                    h_ = histories[histories.length - (n + 1)];
                                    if (h_.route.url == indexOrSearchURI) {
                                        break;
                                    }
                                    else {
                                        index++;
                                    }
                                }
                            }
                            else {
                                index = indexOrSearchURI;
                            }
                        }
                        else {
                            index = 1;
                        }
                        this.isBack = true;
                        return [4 /*yield*/, this.loadLeaveHandle()];
                    case 1:
                        _b.sent();
                        MyApp = require("app/config/App").MyApp;
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
                        if (!MyApp.delay) return [3 /*break*/, 3];
                        return [4 /*yield*/, Lib_1.Lib.sleep(MyApp.delay)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        n = 0;
                        _b.label = 4;
                    case 4:
                        if (!(n < index)) return [3 /*break*/, 10];
                        if (!(this.routeType == App_1.AppRouteType.application)) return [3 /*break*/, 8];
                        Data_1.Data.pop("history");
                        hdata = Data_1.Data.now("history");
                        if (!hdata) return [3 /*break*/, 7];
                        if (!hdata.drawingRequired) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.rendering(hdata.route, hdata, hdata.data)];
                    case 5:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        (0, VirtualDom_1.dom)("main article:last-child").remove();
                        _b.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (this.routeType == App_1.AppRouteType.web) {
                            history.back();
                        }
                        _b.label = 9;
                    case 9:
                        n++;
                        return [3 /*break*/, 4];
                    case 10:
                        nowHistory = Data_1.Data.now("history");
                        if (!nowHistory.view) return [3 /*break*/, 14];
                        if (!nowHistory.route.args) return [3 /*break*/, 12];
                        return [4 /*yield*/, (_a = nowHistory.view).handleAlways.apply(_a, nowHistory.route.args)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 14];
                    case 12: return [4 /*yield*/, nowHistory.view.handleAlways()];
                    case 13:
                        _b.sent();
                        _b.label = 14;
                    case 14:
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                        console.log("back url=" + hdata.route.url);
                        this.isBack = false;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    Response.next = function (url, data, replaced) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var route, pageHistory, res, get, after, n;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (Response.lock)
                            return [2 /*return*/];
                        this.isBack = false;
                        route = Routes_1.Routes.searchRoute(url.toString());
                        if (route.mode == Routes_1.DecisionRouteMode.Notfound) {
                            this.notFoundView(route);
                            return [2 /*return*/];
                        }
                        pageHistory = {
                            route: route,
                            data: data,
                        };
                        if (route.controller) {
                            res = this.loadController(route, data);
                            pageHistory.controller = res.Controller;
                            pageHistory.view = res.view;
                        }
                        else if (route.view) {
                            pageHistory.view = this.loadView(route, data);
                        }
                        return [4 /*yield*/, this.loadLeaveHandle()];
                    case 1:
                        _a.sent();
                        pageHistory.callback = resolve;
                        Data_1.Data.push("history", pageHistory);
                        console.log("next url=" + route.url);
                        return [4 /*yield*/, Response.rendering(route, pageHistory, data)];
                    case 2:
                        _a.sent();
                        if (this.routeType == App_1.AppRouteType.web)
                            location.href = "#" + url;
                        if (replaced) {
                            get = Data_1.Data.get("history");
                            after = [];
                            for (n = 0; n < get.length; n++) {
                                if (n != get.length - 2) {
                                    after.push(get[n]);
                                }
                            }
                            console.log(after);
                            Data_1.Data.set("history", after);
                            (0, VirtualDom_1.dom)("main article").last.prev.remove();
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Response.loadController = function (route, data) {
        var controllerName = Lib_1.Lib.getModuleName(route.controller + "Controller");
        var controllerPath = "app/controller/" + Lib_1.Lib.getModulePath(route.controller + "Controller");
        if (!useExists(controllerPath)) {
            throw ("\"" + controllerPath + "\" Class is not found.");
        }
        var controllerClass = use(controllerPath);
        var cont = new controllerClass[controllerName]();
        cont.sendData = data;
        var viewName = route.action + "View";
        var viewPath = "app/view/" + route.controller + "/" + Lib_1.Lib.getModulePath(viewName);
        var vw;
        if (useExists(viewPath)) {
            var View_ = use(viewPath);
            if (!View_[Lib_1.Lib.getModuleName(viewName)]) {
                console.error("[WARM] \"" + Lib_1.Lib.getModuleName(viewName) + "\"View Class not exists.");
            }
            else {
                vw = new View_[Lib_1.Lib.getModuleName(viewName)]();
                vw.sendData = data;
            }
        }
        return {
            Controller: cont,
            view: vw,
        };
    };
    Response.loadView = function (route, data) {
        var viewName = Lib_1.Lib.getModuleName(route.view + "View");
        var viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
        if (!useExists(viewPath)) {
            throw ("\"" + viewName + "\" Class is not found.");
        }
        var View_ = use(viewPath);
        var vm = new View_[viewName]();
        vm.sendData = data;
        return vm;
    };
    Response.notFoundView = function (route, data) {
        var MyApp = require("app/config/App").MyApp;
        if (MyApp.notFoundView) {
            route.view = MyApp.notFoundView;
            var errorPageHistory = {
                route: route,
                view: this.loadView(route, data),
            };
            Data_1.Data.push("history", errorPageHistory);
            Response.renderingOnView(route, errorPageHistory);
        }
        throw Error("Page Not found. \"" + route.url + "\"");
    };
    /**
     * ***historyAdd*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string | number} url route path
     * @param {any} data send data
     * @returns {void}
     */
    Response.historyAdd = function (url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        var route = Routes_1.Routes.searchRoute(url.toString());
        if (route.mode == Routes_1.DecisionRouteMode.Notfound) {
            this.notFoundView(route);
            return;
        }
        var pageHistory = {
            route: route,
            data: data,
            drawingRequired: true,
        };
        if (route.controller) {
            var res = this.loadController(route, data);
            pageHistory.controller = res.Controller;
            pageHistory.view = res.view;
        }
        else if (route.view) {
            pageHistory.view = this.loadView(route, data);
        }
        Data_1.Data.push("history", pageHistory);
    };
    Response.historyAllClear = function (url) {
        (0, VirtualDom_1.dom)("main archive").remove();
        Data_1.Data.set("history", []);
        if (url)
            this.next(url);
    };
    Response.replace = function (url, send) {
        this.next(url, send, true);
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
    Response.loadLeaveHandle = function () {
        return __awaiter(this, void 0, void 0, function () {
            var prevHistory, res, res_1, res_2, res, res_3, res_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prevHistory = Data_1.Data.now("history");
                        if (!prevHistory) return [3 /*break*/, 10];
                        if (!prevHistory.controller) return [3 /*break*/, 5];
                        return [4 /*yield*/, prevHistory.controller.handleLeave(prevHistory.route.action)];
                    case 1:
                        res = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                        if (!this.isBack) return [3 /*break*/, 3];
                        return [4 /*yield*/, prevHistory.controller.handleLeaveBack(prevHistory.route.action)];
                    case 2:
                        res_1 = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res_1);
                        }
                        _a.label = 3;
                    case 3:
                        if (!this.isNext) return [3 /*break*/, 5];
                        return [4 /*yield*/, prevHistory.controller.handleLeaveNext(prevHistory.route.action)];
                    case 4:
                        res_2 = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res_2);
                        }
                        _a.label = 5;
                    case 5:
                        if (!prevHistory.view) return [3 /*break*/, 10];
                        return [4 /*yield*/, prevHistory.view.handleLeave()];
                    case 6:
                        res = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                        if (!this.isBack) return [3 /*break*/, 8];
                        return [4 /*yield*/, prevHistory.view.handleLeaveBack()];
                    case 7:
                        res_3 = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res_3);
                        }
                        _a.label = 8;
                    case 8:
                        if (!this.isNext) return [3 /*break*/, 10];
                        return [4 /*yield*/, prevHistory.view.handleLeaveNext()];
                    case 9:
                        res_4 = _a.sent();
                        if (prevHistory.callback) {
                            prevHistory.callback(res_4);
                        }
                        _a.label = 10;
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    // rendering....
    Response.rendering = function (route, pageHistory, data) {
        return __awaiter(this, void 0, void 0, function () {
            var MyApp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        if (!route.controller) return [3 /*break*/, 4];
                        return [4 /*yield*/, Response.renderingOnController(route, pageHistory)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        if (!route.view) return [3 /*break*/, 6];
                        return [4 /*yield*/, Response.renderingOnView(route, pageHistory)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    Response.renderingOnController = function (route, pageHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var cont, vw, method, method;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cont = pageHistory.controller;
                        vw = pageHistory.view;
                        return [4 /*yield*/, cont.handleBefore()];
                    case 1:
                        _a.sent();
                        if (!vw) return [3 /*break*/, 3];
                        return [4 /*yield*/, vw.handleBefore()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
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
    Response.renderingOnView = function (route, pageHistory) {
        return __awaiter(this, void 0, void 0, function () {
            var vm, MyApp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vm = pageHistory.view;
                        Data_1.Data.set("childClasss", {});
                        return [4 /*yield*/, vm.handleBefore()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, vm.handleAfter()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Response.__rendering(route, vm)];
                    case 3:
                        _a.sent();
                        MyApp = require("app/config/App").MyApp;
                        if (MyApp.animationCloseClassName)
                            (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
                        if (MyApp.animationOpenClassName)
                            (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
                        vm.myMjs = (0, VirtualDom_1.dom)("main article:last-child");
                        return [4 /*yield*/, vm.handleRenderBefore()];
                    case 4:
                        _a.sent();
                        if (!route.args) return [3 /*break*/, 7];
                        return [4 /*yield*/, vm.handleAlways.apply(vm, route.args)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, vm.handle.apply(vm, route.args)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 7: return [4 /*yield*/, vm.handleAlways()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, vm.handle()];
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
                        main.append("<article>" + viewHtml + "</article>");
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
