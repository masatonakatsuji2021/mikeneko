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
const Util_1 = require("Util");
const Data_1 = require("Data");
const ModernJS_1 = require("ModernJS");
const Shortcode_1 = require("Shortcode");
class Response {
    static back() {
        const MyApp = require("app/config/App").MyApp;
        if (MyApp.routeType == App_1.AppRouteType.application) {
            if (Data_1.Data.getLength("history") == 1)
                return;
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
    }
    static rendering(route) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Controller & View Leave 
                const befCont = Data_1.Data.get("beforeController");
                if (befCont) {
                    yield befCont.handleLeave(Data_1.Data.get("beforeControllerAction"));
                }
                const befView = Data_1.Data.get("beforeView");
                if (befView)
                    yield befView.handleLeave();
                if (route.mode == Routes_1.DecisionRouteMode.Notfound)
                    throw ("Page Not found");
                if (route.controller) {
                    yield Response.renderingOnController(route);
                }
                else if (route.view) {
                    yield Response.renderingOnView(route);
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    static renderingOnController(route) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield cont.handleBefore(beginStatus);
            if (vw)
                yield vw.handleBefore(beginStatus);
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
            yield cont.handleAfter(beginStatus);
            if (vw)
                yield vw.handleAfter(beginStatus);
            yield Response.__rendering(route, cont);
            yield cont.handleRenderBefore(beginStatus);
            if (vw)
                yield vw.handleRenderBefore(beginStatus);
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
            yield cont.handleRenderAfter(beginStatus);
            if (vw)
                yield vw.handleRenderAfter(beginStatus);
        });
    }
    static renderingOnView(route) {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield vm.handleRenderBefore();
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
                    Data_1.Data.set("beforeTemplate", context.template);
                    const templateHtml = Response.template(context.template);
                    (0, ModernJS_1.dom)("body").html = templateHtml;
                    context.mjs = ModernJS_1.ModernJS.reload();
                    if (context.handleTemplateChanged)
                        yield context.handleTemplateChanged();
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
                        yield context.handleHeadChanged();
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
                        yield context.handleHeaderChanged();
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
                        yield context.handleFooterChanged();
                }
            }
        });
    }
    /**
     * ***renderHtml** : Get Rendering HTML content information.
     * @param {string} renderName rendering html Name
     * @returns {string}
     */
    static renderHtml(renderName) {
        const renderPath = "rendering/" + renderName + ".html";
        if (!useExists(renderPath)) {
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.</div>";
        }
        let content = use(renderPath);
        content = Util_1.Util.base64Decode(content);
        content = this.renderConvert(content);
        return content;
    }
    /**
     * *** view *** : Get View's content information.
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
            if (!Util_1.Util.existResource(href))
                continue;
            const resource = Util_1.Util.getResourceDataUrl(href);
            link.setAttribute("href", resource);
        }
        // image tag check...
        const imgs = contentDom.querySelectorAll("img");
        for (let n = 0; n < imgs.length; n++) {
            const img = imgs[n];
            const src = img.attributes["src"].value;
            if (!Util_1.Util.existResource(src))
                continue;
            const resource = Util_1.Util.getResourceDataUrl(src);
            img.setAttribute("src", resource);
        }
        // shortcode analysis
        contentDom.innerHTML = Shortcode_1.Shortcode.analysis(contentDom.innerHTML);
        return contentDom.innerHTML;
    }
}
exports.Response = Response;
