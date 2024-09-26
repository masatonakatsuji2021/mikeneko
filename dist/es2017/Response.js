"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Lib_1 = require("Lib");
const Data_1 = require("Data");
const UI_1 = require("UI");
const ModernJS_1 = require("ModernJS");
const Shortcode_1 = require("Shortcode");
const Dialog_1 = require("Dialog");
class Response {
    static get routeType() {
        const MyApp = require("app/config/App").MyApp;
        return MyApp.routeType;
    }
    /**
     * ***back*** : Return to the previous screen.
     * However, this cannot be used if there is no history of the previous screen
     * or if screen transitions are disabled using lock.
     * The return value indicates whether the return to the previous screen was successful.
     * @returns {boolean}
     */
    static back() {
        if (Response.lock)
            return false;
        if (this.isBack)
            return false;
        this.isBack = true;
        let backUrl;
        if (this.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return false;
            Data_1.Data.pop("history");
            backUrl = Data_1.Data.now("history");
        }
        else if (this.routeType == App_1.AppRouteType.web) {
            history.back();
            return true;
        }
        const route = Routes_1.Routes.searchRoute(backUrl);
        Response.rendering(route).then(() => {
            this.isBack = false;
        });
        return true;
    }
    static next(url, send) {
        if (Response.lock)
            return;
        this.isBack = false;
        Data_1.Data.push("history", url);
        const route = Routes_1.Routes.searchRoute(url);
        Response.rendering(route, send);
        if (this.routeType == App_1.AppRouteType.web)
            location.href = "#" + url;
    }
    /**
     * ***addhistory*** : Add root path to screen transition history.
     * It will only be added to the history and will not change the screen.
     * @param {string} url route path
     * @returns {void}
     */
    static addHistory(url) {
        if (Response.lock)
            return;
        this.isBack = false;
        Data_1.Data.push("history", url);
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
    static async rendering(route, send) {
        const MyApp = require("app/config/App").MyApp;
        try {
            // Controller & View Leave 
            const befCont = Data_1.Data.get("beforeController");
            if (befCont) {
                const befContAction = Data_1.Data.get("beforeControllerAction");
                const res = await befCont.handleLeave(befContAction);
                if (typeof res == "boolean" && res === false)
                    return;
                if (this.isBack) {
                    const resBack = await befCont.handleLeaveBack(befContAction);
                    if (typeof resBack == "boolean" && resBack === false)
                        return;
                }
                if (this.isNext) {
                    const resNext = await befCont.handleLeaveNext(befContAction);
                    if (typeof resNext == "boolean" && resNext === false)
                        return;
                }
            }
            const befView = Data_1.Data.get("beforeView");
            if (befView) {
                const res = await befView.handleLeave();
                if (typeof res == "boolean" && res === false)
                    return;
                if (this.isBack) {
                    const resBack = await befView.handleLeaveBack();
                    if (typeof resBack == "boolean" && resBack === false)
                        return;
                }
                if (this.isNext) {
                    const resNext = await befView.handleLeaveNext();
                    if (typeof resNext == "boolean" && resNext === false)
                        return;
                }
            }
            if (MyApp.animationCloseClassName)
                (0, ModernJS_1.dom)("main").addClass(MyApp.animationCloseClassName);
            if (MyApp.animationOpenClassName)
                (0, ModernJS_1.dom)("main").removeClass(MyApp.animationOpenClassName);
            if (MyApp.delay)
                await Lib_1.Lib.sleep(MyApp.delay);
            if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                throw ("Page Not found");
            if (route.controller) {
                await Response.renderingOnController(route, send);
            }
            else if (route.view) {
                await Response.renderingOnView(route, send);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    static async renderingOnController(route, send) {
        const controllerName = Lib_1.Lib.getModuleName(route.controller + "Controller");
        const controllerPath = "app/controller/" + Lib_1.Lib.getModulePath(route.controller + "Controller");
        if (!useExists(controllerPath)) {
            throw ("\"" + controllerPath + "\" Class is not found.");
        }
        const controllerClass = use(controllerPath);
        const cont = new controllerClass[controllerName]();
        cont.sendData = send;
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
                vw.sendData = send;
            }
        }
        if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
            Data_1.Data.set("beforeControllerPath", controllerPath);
            cont.beginStatus = true;
        }
        await cont.handleBefore();
        if (vw)
            await vw.handleBefore();
        Data_1.Data.set("beforeController", cont);
        Data_1.Data.set("beforeControllerAction", route.action);
        Data_1.Data.set("beforeView", null);
        Data_1.Data.set("beforeViewPath", null);
        Data_1.Data.set("childClasss", {});
        if (cont["before_" + route.action]) {
            const method = "before_" + route.action;
            if (route.args) {
                await cont[method](...route.args);
            }
            else {
                await cont[method]();
            }
        }
        await cont.handleAfter();
        if (vw)
            await vw.handleAfter();
        await Response.__rendering(route, cont);
        await cont.handleRenderBefore();
        if (vw)
            await vw.handleRenderBefore();
        if (cont[route.action]) {
            const method = route.action;
            if (route.args) {
                await cont[method](...route.args);
            }
            else {
                await cont[method]();
            }
        }
        if (vw) {
            if (route.args) {
                await vw.handle(...route.args);
            }
            else {
                await vw.handle();
            }
        }
        await cont.handleRenderAfter();
        if (vw)
            await vw.handleRenderAfter();
    }
    static async renderingOnView(route, send) {
        const viewName = Lib_1.Lib.getModuleName(route.view + "View");
        const viewPath = "app/view/" + Lib_1.Lib.getModulePath(route.view + "View");
        if (!useExists(viewPath)) {
            throw ("\"" + viewName + "\" Class is not found.");
        }
        const View_ = use(viewPath);
        const vm = new View_[viewName]();
        vm.sendData = send;
        if (Data_1.Data.get("beforeViewPath") != viewPath) {
            Data_1.Data.set("beforeViewPath", viewPath);
            if (vm.handleBegin)
                await vm.handleBegin();
        }
        Data_1.Data.set("beforeView", vm);
        Data_1.Data.set("beforeController", null);
        Data_1.Data.set("beforeControllerPath", null);
        Data_1.Data.set("beforeControllerAction", null);
        Data_1.Data.set("childClasss", {});
        await vm.handleBefore();
        await vm.handleAfter();
        await Response.__rendering(route, vm);
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.animationCloseClassName)
            (0, ModernJS_1.dom)("main").removeClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName)
            (0, ModernJS_1.dom)("main").addClass(MyApp.animationOpenClassName);
        await vm.handleRenderBefore();
        if (route.args) {
            await vm.handle(...route.args);
        }
        else {
            await vm.handle();
        }
        await vm.handleRenderAfter();
    }
    static async __rendering(route, context) {
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
                const template = this.bindTemplate((0, ModernJS_1.dom)("body"), context.template);
                //                context.mjs = ModernJS.reload();
                if (context.handleTemplateChanged)
                    await context.handleTemplateChanged(template);
            }
        }
        else {
            Data_1.Data.set("beforeTemplate", null);
        }
        // View Rendering...
        const viewHtml = Response.view(context.view);
        if (!(0, ModernJS_1.dom)("main").length)
            (0, ModernJS_1.dom)("body").append("<main></main>");
        const main = (0, ModernJS_1.dom)("main");
        main.html = "<article>" + viewHtml + "</article>";
        context.mjs = main.childs;
        const beforeHead = Data_1.Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data_1.Data.set("beforeHead", context.head);
            if (context.head) {
                const head = this.bindUI((0, ModernJS_1.dom)("head"), context.head);
                //                context.mjs = ModernJS.reload();
                if (context.handleHeadChanged)
                    await context.handleHeadChanged(head);
            }
            else {
                (0, ModernJS_1.dom)("head").html = "";
                //              context.mjs = ModernJS.reload();
            }
        }
        const beforeHeader = Data_1.Data.get("beforeHeader");
        if (beforeHeader != context.header) {
            Data_1.Data.set("beforeHeader", context.header);
            if (context.header) {
                const header = this.bindUI((0, ModernJS_1.dom)("header"), context.header);
                //          context.mjs = ModernJS.reload();
                if (context.handleHeaderChanged)
                    await context.handleHeaderChanged(header);
            }
            else {
                (0, ModernJS_1.dom)("header").html = "";
                //            context.mjs = ModernJS.reload();
            }
        }
        const beforeFooter = Data_1.Data.get("beforeFooter");
        if (beforeFooter != context.footer) {
            Data_1.Data.set("beforeFooter", context.footer);
            if (context.footer) {
                const footer = this.bindUI((0, ModernJS_1.dom)("footer"), context.footer);
                //        context.mjs = ModernJS.reload();
                if (context.handleFooterChanged)
                    await context.handleFooterChanged(footer);
            }
            else {
                (0, ModernJS_1.dom)("footer").html = "";
                //      context.mjs = ModernJS.reload();
            }
        }
    }
    /**
     * ***renderHtml** : Get Rendering HTML content information.
     * @param {string} renderName rendering html Name
     * @returns {string}
     */
    static renderHtml(renderName) {
        const renderPath = "rendering/" + renderName + ".html";
        if (!useExists(renderPath)) {
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.");
            return;
        }
        let content = use(renderPath);
        content = Lib_1.Lib.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    }
    /**
     * ***view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        return this.renderHtml("view/" + viewName);
    }
    static bindView(mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        //        mjs.reload();
        return this.loadClass("View", viewName, mjs, sendData);
    }
    /**
     * ***template*** : Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        return this.renderHtml("template/" + templateName);
    }
    static bindTemplate(mjs, templateName, sendData) {
        mjs.html = this.template(templateName);
        //        mjs.reload();
        return this.loadClass("Template", templateName, mjs, sendData);
    }
    /**
     * ***UI*** : Get UI content information.
     * @param {string} uiName UI Name
     * @returns {string} UI contents
     */
    static UI(uiName) {
        return this.renderHtml("ui/" + uiName);
    }
    static bindUI(mjs, UIName, sendData) {
        mjs.html = this.UI(UIName);
        //        mjs.reload();
        return this.loadClass("UI", UIName, mjs, sendData);
    }
    static appendUI(mjs, UIName, sendData) {
        mjs.append(this.UI(UIName), true);
        const myMjs = new ModernJS_1.ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("UI", UIName, myMjs, sendData);
    }
    /**
     * ***dialog*** : Get Dialog content information.
     * @param {string} dialogName dialog name
     * @returns {string}
     */
    static dialog(dialogName) {
        return this.renderHtml("dialog/" + dialogName);
    }
    static openDialog(dialogName, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + this.dialog(dialogName) + "</dwindow>";
        const dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs, true);
        dialogMjs.reload();
        setTimeout(() => {
            dialogMjs.addClass("open");
        }, 100);
        let dialog = this.loadClass("Dialog", dialogName, dialogMjs, option.sendData);
        if (!dialog) {
            dialog = new Dialog_1.Dialog();
            dialog.myMjs = dialogMjs;
            dialog.mjs = dialogMjs.childs;
        }
        if (option.handle)
            option.handle(dialog);
        return dialog;
    }
    static openDialogOrigin(dialogHtml, option) {
        if (!option)
            option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + dialogHtml + "</dwindow>";
        const dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs);
        setTimeout(() => {
            dialogMjs.addClass("open");
        }, 100);
        let dialog = new Dialog_1.Dialog();
        dialog.myMjs = dialogMjs;
        dialog.mjs = dialogMjs.childs;
        if (option.handle)
            option.handle(dialog);
        return dialog;
    }
    static setDialogCss() {
        if ((0, ModernJS_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        const style = require("CORERES/dialog/style.css");
        (0, ModernJS_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    }
    static loadClass(classType, loadClassName, mjs, sendData) {
        const className = Lib_1.Lib.getModuleName(loadClassName + classType);
        const classPath = Lib_1.Lib.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
        let classObj;
        try {
            const classObj_ = require(classPath);
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
    }
    static renderConvert(content) {
        let tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0)
            tagName = "tbody";
        let el0 = document.createElement(tagName);
        el0.innerHTML = content;
        // link tag check...
        const links = el0.querySelectorAll("link");
        links.forEach((el) => {
            const href = el.attributes["href"].value;
            if (!Lib_1.Lib.existResource(href))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        const imgs = el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Lib_1.Lib.existResource(src))
                return;
            const resource = Lib_1.Lib.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
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
