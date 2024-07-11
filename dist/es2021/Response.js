"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
const Routes_1 = require("Routes");
const Util_1 = require("Util");
const Data_1 = require("Data");
const Dom_1 = require("Dom");
class Response {
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
            vw = new View_();
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
        console.log("rendring ready?");
        await Response.__rendering(route, cont);
        console.log("rendring?");
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
                (0, Dom_1.Dom)("body").html = templateHtml;
                //                await Response.loadRenderingClass("Template", context.template);
            }
            const viewHtml = Response.view(context.view);
            (0, Dom_1.Dom)("content").html = viewHtml;
        }
        else {
            Data_1.Data.set("beforeTemplate", null);
            const viewHtml = Response.view(context.view);
            (0, Dom_1.Dom)("body").html = viewHtml;
        }
        const beforeHead = Data_1.Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data_1.Data.set("beforeHead", context.head);
            if (context.head) {
                const headHtml = Response.viewPart(context.head);
                (0, Dom_1.Dom)("head").html = headHtml;
            }
        }
        const beforeHeader = Data_1.Data.get("beforeHeader");
        if (beforeHeader != context.header) {
            Data_1.Data.set("beforeHeader", context.header);
            if (context.header) {
                const headerHtml = Response.viewPart(context.header);
                (0, Dom_1.Dom)("header").html = headerHtml;
            }
        }
        const beforeFooter = Data_1.Data.get("beforeFooter");
        if (beforeFooter != context.footer) {
            Data_1.Data.set("beforeFooter", context.footer);
            if (context.footer) {
                const foooterHtml = Response.viewPart(context.footer);
                (0, Dom_1.Dom)("footer").html = foooterHtml;
            }
        }
        //      Response.setBindView();
        //        Response.setBindTemplate();
        //      Response.setBindViewPart();
        (0, Dom_1.VDom)().refresh();
    }
    /**
     * *** view *** :
     * Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    static view(viewName) {
        const viewPath = "rendering/view/" + viewName + ".html";
        if (!useExists(viewPath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>";
        }
        let content = use(viewPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        return content;
    }
    /**
     * ***template*** :
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    static template(templateName) {
        const templatePath = "rendering/template/" + templateName + ".html";
        if (!useExists(templatePath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>";
        }
        let content = use(templatePath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        return content;
    }
    /**
     * ***viewPart*** :
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    static viewPart(viewPartName) {
        const viewPartPath = "rendering/viewpart/" + viewPartName + ".html";
        if (!useExists(viewPartPath)) {
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        let content = use(viewPartPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        const vw = document.createElement("template");
        vw.innerHTML = content;
        //        Response.setBindViewPart(vw);
        return vw.innerHTML;
    }
    static renderConvert(content) {
        const contentDom = document.createElement("div");
        contentDom.innerHTML = content;
        // link tag check...
        const links = contentDom.querySelectorAll("link");
        for (let n = 0; n < links.length; n++) {
            const link = links[n];
            const href = link.attributes["href"].value;
            if (!Util_1.Util.existPublic(href))
                continue;
            const resource = Util_1.Util.getPublic(href);
            link.setAttribute("href", resource);
        }
        // image tag check...
        const imgs = contentDom.querySelectorAll("img");
        for (let n = 0; n < imgs.length; n++) {
            const img = imgs[n];
            const src = img.attributes["src"].value;
            if (!Util_1.Util.existPublic(src))
                continue;
            const resource = Util_1.Util.getPublic(src);
            img.setAttribute("src", resource);
        }
        content = contentDom.innerHTML;
        return content;
    }
}
exports.Response = Response;
