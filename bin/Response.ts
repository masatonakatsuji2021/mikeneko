import { App, AppRouteType } from "App";
import { Routes, Route, DecisionRoute, DecisionRouteMode } from "Routes";
import { Util } from "Util";
import { Data } from "Data";
import { Controller } from "Controller";
import { View } from "View";
import { Template } from "Template";
import { UI } from "UI";
import { ModernJS, dom} from "ModernJS";
import { Shortcode } from "Shortcode";
import { Dialog, DialogOption } from "Dialog";

export class Response {

    public static back() : boolean {
        if (Response.lock) return false;
        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.routeType == AppRouteType.application) {
            if (Data.getLength("history") == 1) return false;
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

        return true;
    }

    public static next(url : string) : void;

    public static next(url : string, send : any) : void;

    public static next(url : string, send? : any) : void {
        if (Response.lock) return;
        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.routeType == AppRouteType.application) {
            Data.set("stepMode",true);
            Data.push("history", url);
            const route : Route = Routes.searchRoute(url);
            Response.rendering(route, send).then(()=>{
                Data.set("stepMode", false);
            });
        }
        else {
            location.hash = "#" + url;
        }
    }

    public static historyClear() : void {
        Data.set("history", []);
    }

    public static isNext() : boolean {
        if (Data.get("stepMode")) return true;
        return false;
    }

    public static isBack() : boolean {
        return !this.isNext();
    }

    public static lock : boolean = false;

    public static async rendering (route: DecisionRoute, send? : any) {

        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.delay) await Util.sleep(MyApp.delay);

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
                await Response.renderingOnController(route, send);
            }
            else if(route.view){
                await Response.renderingOnView(route, send);
            }

        }catch(error) {
            console.error(error);

        }
    }

    private static async renderingOnController(route : DecisionRoute, send?: any) {
        const controllerName : string = Util.getModuleName(route.controller + "Controller");
        const controllerPath : string = "app/controller/" + Util.getModulePath(route.controller + "Controller");
        if(!useExists(controllerPath)){
            throw("\"" + controllerPath + "\" Class is not found.");
        }

        const controllerClass = use(controllerPath);
        const cont : Controller = new controllerClass[controllerName]();
        cont.sendData = send;

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
                vw.sendData = send;
            }
        }

        if(Data.get("beforeControllerPath")  != controllerPath){
            Data.set("beforeControllerPath", controllerPath);
            cont.beginStatus = true;
        }

        await cont.handleBefore();
        if(vw) await vw.handleBefore();

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

        await cont.handleAfter();
        if(vw) await vw.handleAfter();
        await Response.__rendering(route, cont);

        await cont.handleRenderBefore();
        if(vw) await vw.handleRenderBefore();

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

        await cont.handleRenderAfter(); 
        if(vw) await vw.handleRenderAfter();
    }


    private static async renderingOnView(route : DecisionRoute, send?: any) {
        const viewName : string = Util.getModuleName(route.view + "View");
        const viewPath : string = "app/view/" + Util.getModulePath(route.view + "View");

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_[viewName]();
        vm.sendData = send;
        
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
                // Template Rendering...
                Data.set("beforeTemplate", context.template);
                this.bindTemplate(dom("body"), context.template);
                context.mjs = ModernJS.reload();
                if (context.handleTemplateChanged) await context.handleTemplateChanged();
            }
        }
        else{
            Data.set("beforeTemplate", null);
        }

        // View Rendering...
        const viewHtml = Response.view(context.view);
        if (!dom("main").length) dom("body").append("<main></main>");
        dom("main").html = "<article>" + viewHtml + "</article>";
        context.mjs = ModernJS.reload();

        const beforeHead = Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data.set("beforeHead", context.head);
            if (context.head){
                this.bindUI(dom("head"), context.head);
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
                this.bindUI(dom("header"), context.header);
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
                this.bindUI(dom("footer"), context.footer);
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
            console.error("[Rendering ERROR] Rendering data does not exist. Check if source file \"" + renderPath + "\" exists.") 
            return;
        }
        
        let content : string = use(renderPath);
        content = Util.base64Decode(content);
        content = this.renderConvert(content);;

        return content;
    }

    /**
     * *** view *** : Get View's content information.
     * @param {string} viewName View Name
     * @returns {string} view contents
     */
    public static view(viewName : string) : string{
        return this.renderHtml("view/" + viewName);
    }

    /**
     * ***bindView*** 
     * @param mjs 
     * @param viewName 
     * @param sendData 
     * @returns 
     */
    public static bindView(mjs: ModernJS, viewName : string, sendData? : any) : View {
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
    public static template(templateName : string) : string{
        return this.renderHtml("template/" + templateName);
    }

    /**
     * ***bindTemplate***
     * @param mjs 
     * @param templateName 
     * @param sendData
    * @returns 
     */
    public static bindTemplate(mjs: ModernJS, templateName : string, sendData? : any) : Template {
        mjs.html = this.template(templateName);
        mjs.reload();
        return this.loadClass("Template", templateName, mjs, sendData);
    }

    /**
     * ***UI*** : 
     * Get UI content information.
     * @param {string} uiName UI Name
     * @returns {string} UI contents
     */
    public static UI(uiName : string) : string{
        return this.renderHtml("ui/" + uiName);
    }

    /**
     * ***bindUI***
     * @param mjs 
     * @param UIName 
     * @param sendData
     * @returns 
     */
    public static bindUI(mjs: ModernJS, UIName : string, sendData? : any) : UI {
        mjs.html = this.UI(UIName);
        mjs.reload();
        return this.loadClass("UI", UIName, mjs, sendData);
    }

    /**
     * ***appendUI***
     * @param mjs 
     * @param UIName 
     * @param sendData 
     * @returns 
     */
    public static appendUI(mjs: ModernJS, UIName : string, sendData?: any) : UI {
        mjs.append(this.UI(UIName), true);
        const myMjs = new ModernJS();
        mjs.reload(myMjs);
        return this.loadClass("UI", UIName, myMjs, sendData);
    }

    /**
     * ***dialog***
     * @param dialogName 
     * @returns 
     */
    public static dialog(dialogName : string) : string {
        return this.renderHtml("dialog/" + dialogName);
    }

    /**
     * ***openDialog***
     * @param dialogName 
     * @param option 
     * @returns 
     */
    public static openDialog(dialogName : string, option? : DialogOption) : Dialog {
        if (!option) option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + this.dialog(dialogName) + "</dwindow>";
        const dialogMjs = ModernJS.create(dialogStr, "dialog");
        
        if (option.class) {
            if (typeof option.class == "string") option.class = [ option.class ];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }

        dom("body").append(dialogMjs);
        setTimeout(()=>{
            dialogMjs.addClass("open");
        }, 100);
        let dialog : Dialog = this.loadClass("Dialog", dialogName, dialogMjs, option.sendData);
        if (!dialog) {
            dialog = new Dialog();
            dialog.myMjs = dialogMjs;
            dialog.mjs = dialogMjs.childs;
        }
        if (option.handle) option.handle(dialog);
        return dialog;
    }

    public static openDialogOrigin(dialogHtml : string, option? : DialogOption) : Dialog {
        if (!option) option = {};
        this.setDialogCss();
        const dialogStr = "<dwindow>" + dialogHtml + "</dwindow>";
        const dialogMjs = ModernJS.create(dialogStr, "dialog");

        if (option.class) {
            if (typeof option.class == "string") option.class = [ option.class ];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }

        dom("body").append(dialogMjs);
        setTimeout(()=>{
            dialogMjs.addClass("open");
        }, 100);
        let dialog = new Dialog();
        dialog.myMjs = dialogMjs;
        dialog.mjs = dialogMjs.childs;
        if (option.handle) option.handle(dialog);
        return dialog;
    }

    private static setDialogCss(){
        if (dom("head").querySelector("link[m=dl]").length > 0)  return;
        const style = require("CORERES/dialog/style.css");
        dom("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    }

    private static loadClass(classType : string, loadClassName : string, mjs : ModernJS, sendData? : any) {
        const className = Util.getModuleName(loadClassName + classType);
        const classPath = Util.getModulePath("app/" + classType.toLowerCase() + "/" + loadClassName + classType);
        let classObj;
        try {
            const classObj_ = require(classPath);
            classObj = new classObj_[className]();
            classObj.myMjs = mjs;
            classObj.mjs = mjs.childs;
        }catch(error){
            if (classType == "UI") {
                classObj = new UI();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            else if (classType == "Dialog") {
                classObj = new Dialog();
                classObj.myMjs = mjs;
                classObj.mjs = mjs.childs;
            }
            return classObj;
        }

        if (classObj.handle) classObj.handle(sendData);

        return classObj;
    }

    private static renderConvert(content : string) {
        let tagName = "div";
        if (content.indexOf("<tr") === 0 || content.indexOf("<td") === 0) tagName = "tbody";
        let el0 = document.createElement(tagName);
        el0.innerHTML = content;

        // link tag check...
        const links =el0.querySelectorAll("link");
        links.forEach((el) => {
            const href = el.attributes["href"].value;
            if (!Util.existResource(href)) return;
            const resource = Util.getResourceDataUrl(href);
            el.setAttribute("href", resource);
        });

        // image tag check...
        const imgs =el0.querySelectorAll("img");
        imgs.forEach((el) => {
            const src = el.attributes["src"].value;
            if (!Util.existResource(src)) return;
            const resource = Util.getResourceDataUrl(src);
            el.setAttribute("src", resource);
        });

        // shortcode analysis
        el0.innerHTML = Shortcode.analysis(el0.innerHTML);

        return el0.innerHTML;
    }
}