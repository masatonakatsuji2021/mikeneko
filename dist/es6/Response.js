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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Lib_1 = require("Lib");
const Data_1 = require("Data");
const View_1 = require("View");
const Template_1 = require("Template");
const UI_1 = require("UI");
const VirtualDom_1 = require("VirtualDom");
class Response {
    static get routeType() {
        const MyApp = require("app/config/App").MyApp;
        return MyApp.routeType;
    }
    static back(indexOrSearchURI) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Response.lock)
                return false;
            if (this.isBack)
                return false;
            const MyApp = require("app/config/App").MyApp;
            let index = 1;
            if (indexOrSearchURI) {
                if (typeof indexOrSearchURI == "string") {
                    index = 0;
                    const histories = Data_1.Data.get("history");
                    for (let n = 0; n < histories.length; n++) {
                        const h_ = histories[histories.length - (n + 1)];
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
            yield this.loadLeaveHandle();
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
            if (MyApp.delay)
                yield Lib_1.Lib.sleep(MyApp.delay);
            let hdata;
            for (let n = 0; n < index; n++) {
                Data_1.Data.pop("history");
                hdata = Data_1.Data.now("history");
                if (hdata) {
                    if (hdata.drawingRequired) {
                        yield this.rendering(hdata.route, hdata, hdata.data);
                    }
                    else {
                        (0, VirtualDom_1.dom)("main article:last-child").remove();
                    }
                }
                if (this.routeType == App_1.AppRouteType.web)
                    history.back();
            }
            const nowHistory = Data_1.Data.now("history");
            if (nowHistory.view) {
                if (nowHistory.route.args) {
                    yield nowHistory.view.handleAlways(...nowHistory.route.args);
                }
                else {
                    yield nowHistory.view.handleAlways();
                }
            }
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
            console.log("back url=" + hdata.route.url);
            this.isBack = false;
            return true;
        });
    }
    static next(url, data, replaced) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            if (Response.lock)
                return;
            this.isBack = false;
            const route = Routes_1.Routes.searchRoute(url.toString());
            if (route.mode == Routes_1.DecisionRouteMode.Notfound) {
                this.notFoundView(route);
                return;
            }
            let pageHistory = {
                route: route,
                data: data,
            };
            if (route.controller) {
                const res = this.loadController(route, data);
                pageHistory.controller = res.Controller;
                pageHistory.view = res.view;
            }
            else if (route.view) {
                pageHistory.view = this.loadView(route, data);
            }
            yield this.loadLeaveHandle();
            pageHistory.callback = resolve;
            Data_1.Data.push("history", pageHistory);
            console.log("next url=" + route.url);
            yield Response.rendering(route, pageHistory, data);
            if (this.routeType == App_1.AppRouteType.web) {
                history.pushState({
                    route: pageHistory.route,
                    data: pageHistory.data,
                }, null, "#" + url);
            }
            if (replaced) {
                const get = Data_1.Data.get("history");
                let after = [];
                for (let n = 0; n < get.length; n++) {
                    if (n != get.length - 2) {
                        after.push(get[n]);
                    }
                }
                console.log(after);
                Data_1.Data.set("history", after);
                (0, VirtualDom_1.dom)("main article").last.prev.remove();
            }
        }));
    }
    static loadController(route, data) {
        const controllerName = Lib_1.Lib.getModuleName(route.controller + "Controller");
        const controllerPath = "app/controller/" + Lib_1.Lib.getModulePath(route.controller + "Controller");
        if (!useExists(controllerPath)) {
            throw ("\"" + controllerPath + "\" Class is not found.");
        }
        const controllerClass = use(controllerPath);
        const cont = new controllerClass[controllerName]();
        cont.sendData = data;
        const viewName = route.action + "View";
        const viewPath = "app/view/" + route.controller + "/" + Lib_1.Lib.getModulePath(viewName);
        let vw;
        if (useExists(viewPath)) {
            const View_ = use(viewPath);
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
    }
    static loadView(route, data) {
        const viewName = Lib_1.Lib.getModuleName(route.view + "View");
        const viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
        if (!useExists(viewPath)) {
            throw ("\"" + viewName + "\" Class is not found.");
        }
        const View_ = use(viewPath);
        const vm = new View_[viewName]();
        vm.sendData = data;
        return vm;
    }
    static notFoundView(route, data) {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.notFoundView) {
            route.view = MyApp.notFoundView;
            const errorPageHistory = {
                route: route,
                view: this.loadView(route, data),
            };
            Data_1.Data.push("history", errorPageHistory);
            Response.renderingOnView(route, errorPageHistory);
        }
        throw Error("Page Not found. \"" + route.url + "\"");
    }
    /**
     * ***historyAdd*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string | number} url route path
     * @param {any} data send data
     * @returns {void}
     */
    static historyAdd(url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        const route = Routes_1.Routes.searchRoute(url.toString());
        if (route.mode == Routes_1.DecisionRouteMode.Notfound) {
            this.notFoundView(route);
            return;
        }
        let pageHistory = {
            route: route,
            data: data,
            drawingRequired: true,
        };
        if (route.controller) {
            const res = this.loadController(route, data);
            pageHistory.controller = res.Controller;
            pageHistory.view = res.view;
        }
        else if (route.view) {
            pageHistory.view = this.loadView(route, data);
        }
        Data_1.Data.push("history", pageHistory);
    }
    static historyAllClear(url) {
        (0, VirtualDom_1.dom)("main archive").remove();
        Data_1.Data.set("history", []);
        if (url)
            this.next(url);
    }
    static replace(url, send) {
        this.next(url, send, true);
    }
    /**
     * ***now*** : Get current route path.
     * @returns {string}
     */
    static now() {
        return Routes_1.Routes.getRoute().url;
    }
    /**
     * ***isNext*** : A flag that determines if you have proceeded from the next screen.
     */
    static get isNext() {
        return !this.isBack;
    }
    static loadLeaveHandle() {
        return __awaiter(this, void 0, void 0, function* () {
            const prevHistory = Data_1.Data.now("history");
            if (prevHistory) {
                // Controller & View Leave 
                if (prevHistory.controller) {
                    const res = yield prevHistory.controller.handleLeave(prevHistory.route.action);
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }
                    if (this.isBack) {
                        const res = yield prevHistory.controller.handleLeaveBack(prevHistory.route.action);
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                    }
                    if (this.isNext) {
                        const res = yield prevHistory.controller.handleLeaveNext(prevHistory.route.action);
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                    }
                }
                if (prevHistory.view) {
                    const res = yield prevHistory.view.handleLeave();
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }
                    if (this.isBack) {
                        const res = yield prevHistory.view.handleLeaveBack();
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                    }
                    if (this.isNext) {
                        const res = yield prevHistory.view.handleLeaveNext();
                        if (prevHistory.callback) {
                            prevHistory.callback(res);
                        }
                    }
                }
            }
        });
    }
    // rendering....
    static rendering(route, pageHistory, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const MyApp = require("app/config/App").MyApp;
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
            if (MyApp.delay)
                yield Lib_1.Lib.sleep(MyApp.delay);
            if (route.controller) {
                yield Response.renderingOnController(route, pageHistory);
            }
            else if (route.view) {
                yield Response.renderingOnView(route, pageHistory);
            }
        });
    }
    static renderingOnController(route, pageHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            const cont = pageHistory.controller;
            const vw = pageHistory.view;
            yield cont.handleBefore();
            if (vw)
                yield vw.handleBefore();
            Data_1.Data.set("childClasss", {});
            if (cont["before_" + route.action]) {
                const method = "before_" + route.action;
                if (route.args) {
                    yield cont[method](...route.args);
                }
                else {
                    yield cont[method]();
                }
            }
            yield cont.handleAfter();
            if (vw)
                yield vw.handleAfter();
            yield Response.__rendering(route, cont);
            yield cont.handleRenderBefore();
            if (vw)
                yield vw.handleRenderBefore();
            if (cont[route.action]) {
                const method = route.action;
                if (route.args) {
                    yield cont[method](...route.args);
                }
                else {
                    yield cont[method]();
                }
            }
            if (vw) {
                if (route.args) {
                    yield vw.handle(...route.args);
                }
                else {
                    yield vw.handle();
                }
            }
            yield cont.handleRenderAfter();
            if (vw)
                yield vw.handleRenderAfter();
        });
    }
    static renderingOnView(route, pageHistory) {
        return __awaiter(this, void 0, void 0, function* () {
            const vm = pageHistory.view;
            Data_1.Data.set("childClasss", {});
            yield vm.handleBefore();
            yield vm.handleAfter();
            yield Response.__rendering(route, vm);
            const MyApp = require("app/config/App").MyApp;
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
            vm.myMjs = (0, VirtualDom_1.dom)("main article:last-child");
            yield vm.handleRenderBefore();
            if (route.args) {
                yield vm.handleAlways(...route.args);
                yield vm.handle(...route.args);
            }
            else {
                yield vm.handleAlways();
                yield vm.handle();
            }
            yield vm.handleRenderAfter();
        });
    }
    static __rendering(route, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!context.view) {
                if (route.controller) {
                    context.view = route.controller + "/" + route.action;
                }
                else if (route.view) {
                    context.view = route.view;
                }
            }
            if (context.template) {
                const beforeTemplate = Data_1.Data.get("beforeTemplate");
                if (beforeTemplate != context.template) {
                    // Template Rendering...
                    Data_1.Data.set("beforeTemplate", context.template);
                    const template = Template_1.Template.bind((0, VirtualDom_1.dom)("body"), context.template);
                    if (context.handleTemplateChanged)
                        yield context.handleTemplateChanged(template);
                }
            }
            else {
                Data_1.Data.set("beforeTemplate", null);
            }
            // View Rendering...
            const viewHtml = View_1.View.getHtml("view/" + context.view);
            if (!(0, VirtualDom_1.dom)("main").length)
                (0, VirtualDom_1.dom)("body").append("<main></main>");
            const main = (0, VirtualDom_1.dom)("main");
            main.append("<article>" + viewHtml + "</article>");
            context.mjs = main.childs;
            const beforeHead = Data_1.Data.get("beforeHead");
            if (beforeHead != context.head) {
                Data_1.Data.set("beforeHead", context.head);
                if (context.head) {
                    const head = UI_1.UI.bind((0, VirtualDom_1.dom)("head"), context.head);
                    if (context.handleHeadChanged)
                        yield context.handleHeadChanged(head);
                }
                else {
                    (0, VirtualDom_1.dom)("head").html = "";
                }
            }
            const beforeHeader = Data_1.Data.get("beforeHeader");
            if (beforeHeader != context.header) {
                Data_1.Data.set("beforeHeader", context.header);
                if (context.header) {
                    const header = UI_1.UI.bind((0, VirtualDom_1.dom)("header"), context.header);
                    if (context.handleHeaderChanged)
                        yield context.handleHeaderChanged(header);
                }
                else {
                    (0, VirtualDom_1.dom)("header").html = "";
                }
            }
            const beforeFooter = Data_1.Data.get("beforeFooter");
            if (beforeFooter != context.footer) {
                Data_1.Data.set("beforeFooter", context.footer);
                if (context.footer) {
                    const footer = UI_1.UI.bind((0, VirtualDom_1.dom)("footer"), context.footer);
                    if (context.handleFooterChanged)
                        yield context.handleFooterChanged(footer);
                }
                else {
                    (0, VirtualDom_1.dom)("footer").html = "";
                }
            }
        });
    }
}
exports.Response = Response;
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
