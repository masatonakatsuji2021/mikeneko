"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Util_1 = require("Util");
const Data_1 = require("Data");
const ModernJS_1 = require("ModernJS");
const Shortcode_1 = require("Shortcode");
const Dialog_1 = require("Dialog");
class Response {
    static back() {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return false;
            Data_1.Data.pop("history");
            const backUrl = Data_1.Data.now("history");
            const route = Routes_1.Routes.searchRoute(backUrl);
            Response.rendering(route).then(() => {
                Data_1.Data.set("stepMode", false);
            });
        }
        else if (MyApp.routeType == App_1.AppRouteType.web) {
            history.back();
        }
        return true;
    }
    static next(url) {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            Data_1.Data.push("history", url);
            const route = Routes_1.Routes.searchRoute(url);
            Response.rendering(route).then(() => {
                Data_1.Data.set("stepMode", false);
            });
        }
        else {
            location.hash = "#" + url;
        }
    }
    static async rendering(route) {
        try {
            // Controller & View Leave 
            const befCont = Data_1.Data.get("beforeController");
            if (befCont) {
                await befCont.handleLeave(Data_1.Data.get("beforeControllerAction"));
            }
            const befView = Data_1.Data.get("beforeView");
            if (befView)
                await befView.handleLeave();
            if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                throw ("Page Not found");
            if (route.controller) {
                await Response.renderingOnController(route);
            }
            else if (route.view) {
                await Response.renderingOnView(route);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    static async renderingOnController(route) {
        const controllerName = Util_1.Util.getModuleName(route.controller + "Controller");
        const controllerPath = "app/controller/" + Util_1.Util.getModulePath(route.controller + "Controller");
        if (!useExists(controllerPath)) {
            throw ("\"" + controllerPath + "\" Class is not found.");
        }
        const controllerClass = use(controllerPath);
        const cont = new controllerClass[controllerName]();
        const viewName = route.action + "View";
        const viewPath = "app/view/" + route.controller + "/" + Util_1.Util.getModulePath(viewName);
        let vw;
        if (useExists(viewPath)) {
            const View_ = use(viewPath);
            if (!View_[Util_1.Util.getModuleName(viewName)]) {
                console.error("[WARM] \"" + Util_1.Util.getModuleName(viewName) + "\"View Class not exists.");
            }
            else {
                vw = new View_[Util_1.Util.getModuleName(viewName)]();
            }
        }
        let beginStatus = false;
        if (Data_1.Data.get("beforeControllerPath") != controllerPath) {
            Data_1.Data.set("beforeControllerPath", controllerPath);
            beginStatus = true;
        }
        await cont.handleBefore(beginStatus);
        if (vw)
            await vw.handleBefore(beginStatus);
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
        await cont.handleAfter(beginStatus);
        if (vw)
            await vw.handleAfter(beginStatus);
        await Response.__rendering(route, cont);
        await cont.handleRenderBefore(beginStatus);
        if (vw)
            await vw.handleRenderBefore(beginStatus);
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
        await cont.handleRenderAfter(beginStatus);
        if (vw)
            await vw.handleRenderAfter(beginStatus);
    }
    static async renderingOnView(route) {
        const viewName = Util_1.Util.getModuleName(route.view + "View");
        const viewPath = "app/view/" + Util_1.Util.getModulePath(route.view + "View");
        if (!useExists(viewPath)) {
            throw ("\"" + viewName + "\" Class is not found.");
        }
        const View_ = use(viewPath);
        const vm = new View_[viewName]();
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
                Data_1.Data.set("beforeTemplate", context.template);
                const templateHtml = Response.template(context.template);
                (0, ModernJS_1.dom)("body").html = templateHtml;
                context.mjs = ModernJS_1.ModernJS.reload();
                if (context.handleTemplateChanged)
                    await context.handleTemplateChanged();
                //                await Response.loadRenderingClass("Template", context.template);
            }
            const viewHtml = Response.view(context.view);
            (0, ModernJS_1.dom)("content").html = viewHtml;
            context.mjs = ModernJS_1.ModernJS.reload();
        }
        else {
            Data_1.Data.set("beforeTemplate", null);
            const viewHtml = Response.view(context.view);
            (0, ModernJS_1.dom)("body").html = viewHtml;
            context.mjs = ModernJS_1.ModernJS.reload();
        }
        const beforeHead = Data_1.Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data_1.Data.set("beforeHead", context.head);
            if (context.head) {
                const headHtml = Response.viewPart(context.head);
                (0, ModernJS_1.dom)("head").html = headHtml;
                context.mjs = ModernJS_1.ModernJS.reload();
                if (context.handleHeadChanged)
                    await context.handleHeadChanged();
            }
            else {
                (0, ModernJS_1.dom)("head").html = "";
                context.mjs = ModernJS_1.ModernJS.reload();
            }
        }
        const beforeHeader = Data_1.Data.get("beforeHeader");
        if (beforeHeader != context.header) {
            Data_1.Data.set("beforeHeader", context.header);
            if (context.header) {
                const headerHtml = Response.viewPart(context.header);
                (0, ModernJS_1.dom)("header").html = headerHtml;
                context.mjs = ModernJS_1.ModernJS.reload();
                if (context.handleHeaderChanged)
                    await context.handleHeaderChanged();
            }
            else {
                (0, ModernJS_1.dom)("header").html = "";
                context.mjs = ModernJS_1.ModernJS.reload();
            }
        }
        const beforeFooter = Data_1.Data.get("beforeFooter");
        if (beforeFooter != context.footer) {
            Data_1.Data.set("beforeFooter", context.footer);
            if (context.footer) {
                const foooterHtml = Response.viewPart(context.footer);
                (0, ModernJS_1.dom)("footer").html = foooterHtml;
                context.mjs = ModernJS_1.ModernJS.reload();
                if (context.handleFooterChanged)
                    await context.handleFooterChanged();
            }
            else {
                (0, ModernJS_1.dom)("footer").html = "";
                context.mjs = ModernJS_1.ModernJS.reload();
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
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        ;
        return content;
    }
    /**
     * *** view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        return this.renderHtml("view/" + viewName);
    }
    /**
     * ***bindView***
     * @param mjs
     * @param viewName
     * @param sendData
     * @returns
     */
    static bindView(mjs, viewName, sendData) {
        mjs.html = this.view(viewName);
        mjs.reload();
        return this.loadClass("View", viewName, mjs, sendData);
    }
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        return this.renderHtml("template/" + templateName);
    }
    /**
     * ***bindTemplate***
     * @param mjs
     * @param templateName
     * @param sendData
    * @returns
     */
    static bindTemplate(mjs, templateName, sendData) {
        mjs.html = this.template(templateName);
        mjs.reload();
        return this.loadClass("Template", templateName, mjs, sendData);
    }
    /**
     * ***viewPart*** :
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    static viewPart(viewPartName) {
        return this.renderHtml("viewpart/" + viewPartName);
    }
    /**
     * ***bindViewPart***
     * @param mjs
     * @param viewPartName
     * @param sendData
     * @returns
     */
    static bindViewPart(mjs, viewPartName, sendData) {
        mjs.html = this.viewPart(viewPartName);
        mjs.reload();
        return this.loadClass("ViewPart", viewPartName, mjs, sendData);
    }
    /**
     * ***appendViewPart***
     * @param mjs
     * @param viewPartName
     * @param sendData
     * @returns
     */
    static appendViewPart(mjs, viewPartName, sendData) {
        mjs.append(this.viewPart(viewPartName), true);
        const myMjs = new ModernJS_1.ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("ViewPart", viewPartName, myMjs, sendData);
    }
    /**
     * ***dialog***
     * @param dialogName
     * @returns
     */
    static dialog(dialogName) {
        return this.renderHtml("dialog/" + dialogName);
    }
    /**
     * ***openDialog***
     * @param dialogName
     * @param option
     * @returns
     */
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
        (0, ModernJS_1.dom)("body").append(dialogMjs);
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
    static setDialogCss() {
        if ((0, ModernJS_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        const style = require("CORERES/dialog/style.css");
        (0, ModernJS_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    }
    static loadClass(classType, loadClassName, mjs, sendData) {
        const className = Util_1.Util.getModuleName(loadClassName + classType);
        const classPath = Util_1.Util.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
        let classObj;
        try {
            const classObj_ = require(classPath);
            classObj = new classObj_[className]();
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }
        catch (error) {
            return;
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
            if (!Util_1.Util.existResource(href))
                return;
            const resource = Util_1.Util.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });
        // image tag check...
        const imgs = el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Util_1.Util.existResource(src))
                return;
            const resource = Util_1.Util.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });
        // shortcode analysis
        el0.innerHTML = Shortcode_1.Shortcode.analysis(el0.innerHTML);
        return el0.innerHTML;
    }
}
exports.Response = Response;
