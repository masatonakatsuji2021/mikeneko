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
    static back(index) {
        if (!index)
            index = 1;
        if (Response.lock)
            return false;
        if (this.isBack)
            return false;
        this.isBack = true;
        if (Data_1.Data.get("backHandle")) {
            const backHandle = Data_1.Data.get("backHandle");
            Data_1.Data.remove("backHandle");
            backHandle();
            this.isBack = false;
            return true;
        }
        let hdata;
        for (let n = 0; n < index; n++) {
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
        const route = Routes_1.Routes.searchRoute(hdata.url.toString());
        Response.rendering(route, hdata.data).then(() => {
            this.isBack = false;
        });
        return true;
    }
    static next(url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        const hdata = {
            url: url,
            data: data,
        };
        Data_1.Data.push("history", hdata);
        const route = Routes_1.Routes.searchRoute(url.toString());
        Response.rendering(route, data);
        if (this.routeType == App_1.AppRouteType.web)
            location.href = "#" + url;
    }
    /**
     * ***addhistory*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string} url route path
     * @returns {void}
     */
    static addHistory(url, data) {
        if (Response.lock)
            return;
        this.isBack = false;
        const hdata = {
            url: url,
            data: data,
        };
        Data_1.Data.push("history", hdata);
    }
    /**
     * ***historyClear*** : Clear screen transition history
     * @returns {void}
     */
    static historyClear() {
        Data_1.Data.set("history", []);
    }
    /**
     * ***pop*** : Go back to the previous screen transition.
     * @returns {void}
     */
    static pop() {
        Data_1.Data.pop("history");
    }
    static replace(url, send) {
        this.pop();
        this.next(url, send);
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
    /**
     * ***nowView*** : Get the current View class object if there is one.
     */
    static get nowView() {
        if (Data_1.Data.get("beforeView"))
            return Data_1.Data.get("beforeView");
    }
    /**
     * ***nowController*** : Get the current Controller class object if there is one.
     */
    static get nowController() {
        if (Data_1.Data.get("beforeController"))
            return Data_1.Data.get("beforeController");
    }
    // rendering....
    static rendering(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const MyApp = require("app/config/App").MyApp;
            // Controller & View Leave 
            const befCont = Data_1.Data.get("beforeController");
            if (befCont) {
                const befContAction = Data_1.Data.get("beforeControllerAction");
                const res = yield befCont.handleLeave(befContAction);
                if (typeof res == "boolean" && res === false)
                    return;
                if (this.isBack) {
                    const resBack = yield befCont.handleLeaveBack(befContAction);
                    if (typeof resBack == "boolean" && resBack === false)
                        return;
                }
                if (this.isNext) {
                    const resNext = yield befCont.handleLeaveNext(befContAction);
                    if (typeof resNext == "boolean" && resNext === false)
                        return;
                }
            }
            const befView = Data_1.Data.get("beforeView");
            if (befView) {
                const res = yield befView.handleLeave();
                if (typeof res == "boolean" && res === false)
                    return;
                if (this.isBack) {
                    const resBack = yield befView.handleLeaveBack();
                    if (typeof resBack == "boolean" && resBack === false)
                        return;
                }
                if (this.isNext) {
                    const resNext = yield befView.handleLeaveNext();
                    if (typeof resNext == "boolean" && resNext === false)
                        return;
                }
            }
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationOpenClassName);
            if (MyApp.delay)
                yield Lib_1.Lib.sleep(MyApp.delay);
            if (route.mode == Routes_1.DecisionRouteMode.Notfound) {
                if (MyApp.notFoundView) {
                    route.view = MyApp.notFoundView;
                    yield Response.renderingOnView(route, data);
                }
                throw ("Page Not found. \"" + route.url + "\"");
            }
            if (route.controller) {
                yield Response.renderingOnController(route, data);
            }
            else if (route.view) {
                yield Response.renderingOnView(route, data);
            }
        });
    }
    static renderingOnController(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
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
            if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
                Data_1.Data.set("beforeControllerPath", controllerPath);
                cont.beginStatus = true;
            }
            yield cont.handleBefore();
            if (vw)
                yield vw.handleBefore();
            Data_1.Data.set("beforeController", cont);
            Data_1.Data.set("beforeControllerAction", route.action);
            Data_1.Data.set("beforeView", null);
            Data_1.Data.set("beforeViewPath", null);
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
    static renderingOnView(route, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const viewName = Lib_1.Lib.getModuleName(route.view + "View");
            const viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
            if (!useExists(viewPath)) {
                throw ("\"" + viewName + "\" Class is not found.");
            }
            const View_ = use(viewPath);
            const vm = new View_[viewName]();
            vm.sendData = data;
            if (Data_1.Data.get("beforeViewPath") != viewPath) {
                Data_1.Data.set("beforeViewPath", viewPath);
                if (vm.handleBegin)
                    yield vm.handleBegin();
            }
            Data_1.Data.set("beforeView", vm);
            Data_1.Data.set("beforeController", null);
            Data_1.Data.set("beforeControllerPath", null);
            Data_1.Data.set("beforeControllerAction", null);
            Data_1.Data.set("childClasss", {});
            yield vm.handleBefore();
            yield vm.handleAfter();
            yield Response.__rendering(route, vm);
            const MyApp = require("app/config/App").MyApp;
            if (MyApp.animationCloseClassName)
                (0, VirtualDom_1.dom)("main").removeClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, VirtualDom_1.dom)("main").addClass(MyApp.animationOpenClassName);
            vm.myMjs = (0, VirtualDom_1.dom)("main article");
            yield vm.handleRenderBefore();
            // is next page..
            if (Response.isNext) {
                if (route.args) {
                    yield vm.handleNext(...route.args);
                }
                else {
                    yield vm.handleNext();
                }
            }
            // is back page...
            if (Response.isBack) {
                if (route.args) {
                    yield vm.handleBack(...route.args);
                }
                else {
                    yield vm.handleBack();
                }
            }
            if (route.args) {
                yield vm.handle(...route.args);
            }
            else {
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
            main.html = "<article>" + viewHtml + "</article>";
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
