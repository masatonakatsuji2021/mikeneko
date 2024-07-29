import { App, AppRouteType } from "App";
import { Routes, Route, DecisionRoute, DecisionRouteMode } from "Routes";
import { Util } from "Util";
import { Data } from "Data";
import { Controller } from "Controller";
import { View } from "View";
import { ModernJS, dom} from "ModernJS";
import { Shortcode } from "Shortcode";

export class Response {

    public static back() {
        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.routeType == AppRouteType.application) {
            if (Data.getLength("history") == 1) return;
            Data.pop("history");
            const backUrl= Data.now("history");
            
            const route : Route = Routes.searchRoute(backUrl);
            Response.rendering(route).then(()=>{
                Data.set("stepMode", false);
            });
        }
        else if (MyApp.routeType == AppRouteType.web ) {
            history.back();
        }
    }

    public static async rendering (route: DecisionRoute) {

        try{

            // Controller & View Leave 
            const befCont : Controller = Data.get("beforeController");
            if(befCont){
                await befCont.handleLeave(Data.get("beforeControllerAction"));
            }

            const befView = Data.get("beforeView");
            if(befView) await befView.handleLeave();

            if(route.mode == DecisionRouteMode.Notfound) throw("Page Not found");

            if(route.controller){
                await Response.renderingOnController(route);
            }
            else if(route.view){
                await Response.renderingOnView(route);
            }

        }catch(error) {
            console.error(error);

        }
    }

    private static async renderingOnController(route : DecisionRoute) {
        const controllerName : string = Util.getModuleName(route.controller + "Controller");
        const controllerPath : string = "app/controller/" + Util.getModulePath(route.controller + "Controller");
        if(!useExists(controllerPath)){
            throw("\"" + controllerPath + "\" Class is not found.");
        }

        const controllerClass = use(controllerPath);
        const cont : Controller = new controllerClass[controllerName]();

        const viewName = route.action + "View";
        const viewPath : string = "app/view/" + route.controller + "/" + Util.getModulePath(viewName);

        let vw : View; 
        if(useExists(viewPath)){
            const View_ = use(viewPath);
            if (!View_[Util.getModuleName(viewName)]) {
                console.error("[WARM] \"" + Util.getModuleName(viewName) + "\"View Class not exists.");
            }
            else {
                vw = new View_[Util.getModuleName(viewName)]();
            }
        }

        let beginStatus = false;
        if(Data.get("beforeControllerPath")  != controllerPath){
            Data.set("beforeControllerPath", controllerPath);
            beginStatus = true;
        }

        await cont.handleBefore(beginStatus);
        if(vw) await vw.handleBefore(beginStatus);

        Data.set("beforeController", cont);
        Data.set("beforeControllerAction", route.action);
        Data.set("beforeView", null);
        Data.set("beforeViewPath", null);
        Data.set("childClasss", {});
        
        if(cont["before_" + route.action]){
            const method : string = "before_" + route.action;
            if(route.args){
                await cont[method](...route.args);
            }
            else{
                await cont[method]();
            }
        }

        await cont.handleAfter(beginStatus);
        if(vw) await vw.handleAfter(beginStatus);
        await Response.__rendering(route, cont);

        await cont.handleRenderBefore(beginStatus);
        if(vw) await vw.handleRenderBefore(beginStatus);

        if(cont[route.action]){
            const method : string = route.action;
            if(route.args){
                await cont[method](...route.args);
            }
            else{
                await cont[method]();
            }
        }

        if(vw){
            if(route.args){
                await vw.handle(...route.args);
            }
            else{
                await vw.handle();
            }
        }

        await cont.handleRenderAfter(beginStatus); 
        if(vw) await vw.handleRenderAfter(beginStatus);
    }


    private static async renderingOnView(route : DecisionRoute) {
        const viewName : string = Util.getModuleName(route.view + "View");
        const viewPath : string = "app/view/" + Util.getModulePath(route.view + "View");

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_[viewName]();

        if(Data.get("beforeViewPath") != viewPath){
            Data.set("beforeViewPath", viewPath);
            if(vm.handleBegin) await vm.handleBegin();
        }

        Data.set("beforeView", vm);
        Data.set("beforeController", null);
        Data.set("beforeControllerPath", null);
        Data.set("beforeControllerAction", null);
        Data.set("childClasss",  {});

        await vm.handleBefore();

        await vm.handleAfter();

        await Response.__rendering(route, vm);

        await vm.handleRenderBefore();

        if(route.args){
            await vm.handle(...route.args);
        }
        else{
            await vm.handle();
        }

        await vm.handleRenderAfter();
    }

    public static async __rendering(route : DecisionRoute, context : Controller | View){

        if(!context.view){
            if(route.controller){
                context.view = route.controller + "/" + route.action;
            }
            else if(route.view){
                context.view = route.view;
            }
        }

        if(context.template){
            const beforeTemplate : string = Data.get("beforeTemplate");
            if(beforeTemplate != context.template){
                Data.set("beforeTemplate", context.template);
                const templateHtml = Response.template(context.template);
                dom("body").html = templateHtml;
                context.mjs = ModernJS.reload();
                if (context.handleTemplateChanged) await context.handleTemplateChanged();
//                await Response.loadRenderingClass("Template", context.template);
            }
            const viewHtml = Response.view(context.view);
            dom("content").html = viewHtml;
            context.mjs = ModernJS.reload();
        }
        else{
            Data.set("beforeTemplate", null);
            const viewHtml = Response.view(context.view);
            dom("body").html = viewHtml;
            context.mjs = ModernJS.reload();
        }

        const beforeHead = Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data.set("beforeHead", context.head);
            if (context.head){
                const headHtml =  Response.viewPart(context.head);
                dom("head").html = headHtml;
                context.mjs = ModernJS.reload();
                if (context.handleHeadChanged) await context.handleHeadChanged();
            }
            else {
                dom("head").html = "";
                context.mjs = ModernJS.reload();
            }
        }

        const beforeHeader = Data.get("beforeHeader");
        if (beforeHeader != context.header) {
            Data.set("beforeHeader", context.header);
            if (context.header){
                const headerHtml =  Response.viewPart(context.header);
                dom("header").html = headerHtml;
                context.mjs = ModernJS.reload();
                if (context.handleHeaderChanged) await context.handleHeaderChanged();
            }
            else {
                dom("header").html = "";
                context.mjs = ModernJS.reload();
            }
        }

        const beforeFooter = Data.get("beforeFooter");
        if (beforeFooter != context.footer) {
            Data.set("beforeFooter", context.footer);
            if (context.footer){
                const foooterHtml =  Response.viewPart(context.footer);
                dom("footer").html = foooterHtml;
                context.mjs = ModernJS.reload();
                if (context.handleFooterChanged) await context.handleFooterChanged();
            }
            else {
                dom("footer").html = "";
                context.mjs = ModernJS.reload();
            }
        }
    }

    /**
     * ***renderHtml** : Get Rendering HTML content information.
     * @param {string} renderName rendering html Name
     * @returns {string}
     */
    public static renderHtml(renderName : string) : string {

        const renderPath : string = "rendering/" + renderName + ".html";
        if(!useExists(renderPath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.</div>"; 
        }
        
        let content : string = use(renderPath);
        content = Util.base64Decode(content);
        let vw = this.createElement(content);
        this.renderConvert(vw);

        return vw.innerHTML;
    }

    /**
     * *** view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    public static view(viewName : string) : string{

        const viewPath : string = "rendering/view/" + viewName + ".html";
        if(!useExists(viewPath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] View data does not exist. Check if source file \"" + viewPath + "\" exists.</div>"; 
        }
        
        let content : string = use(viewPath);
        content = Util.base64Decode(content);
        let vw = this.createElement(content);
        this.renderConvert(vw);

        return vw.innerHTML;
    }

    /**
     * ***template*** : 
     * Get template content information.
     * @param {string} templateName Template Name
     * @returns {string} template contents
     */
    public static template(templateName : string) : string{

        const templatePath : string = "rendering/template/" + templateName + ".html";

        if(!useExists(templatePath)){
            return "<div style=\"font-weight:bold;\">[Rendering ERROR] Template data does not exist. Check if source file \"" + templatePath + "\" exists.</div>"; 
        }

        let content : string = use(templatePath);
        content = Util.base64Decode(content);
        let vw = this.createElement(content);
        this.renderConvert(vw);

        return vw.innerHTML;
    }

    /**
     * ***viewPart*** : 
     * Get viewPart content information.
     * @param {string} viewPartName ViewPart Name
     * @returns {string} viewPart contents
     */
    public static viewPart(viewPartName : string) : string{

        const viewPartPath : string = "rendering/viewpart/" + viewPartName + ".html";
        if(!useExists(viewPartPath)){
            return "<div style=\"font-weight:bold;\">ViewPart data does not exist. Check if source file \"" + viewPartPath + "\" exists.</div>";
        }
        
        let content = use(viewPartPath);
        content = Util.base64Decode(content);
        let vw = this.createElement(content);
        this.renderConvert(vw);
    
        return vw.innerHTML;
    }

    private static createElement(content : string) : HTMLElement {
        let tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0) tagName = "tbody";
        const newm = document.createElement(tagName);
        newm.innerHTML = content;
        return newm;
    }

    private static renderConvert(content : HTMLElement) {
        // link tag check...
        const links =content.querySelectorAll("link");
        links.forEach((el) => {
            const href = el.attributes["href"].value;
            if (!Util.existResource(href)) return;
            const resource = Util.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });

        // image tag check...
        const imgs =content.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Util.existResource(src)) return;
            const resource = Util.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });

        // shortcode analysis
        content.innerHTML = Shortcode.analysis(content.innerHTML);
    }
}