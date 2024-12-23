import { App, AppRouteType } from "App";
import { Routes, DecisionRoute, DecisionRouteMode } from "Routes";
import { Lib } from "Lib";
import { Data } from "Data";
import { Controller } from "Controller";
import { View } from "View";
import { Template } from "Template";
import { UI } from "UI";
import { dom} from "VirtualDom";

export interface PageHistory {

    url: string | number,

    data?: any,
}

export class Response {

    /**
     * ***isBack*** : A flag that determines if you are back from the previous screen.  
     * True if you return from the previous screen, false if you proceed from the previous screen
     */
    public static isBack : boolean = false;

    /**
     * ***lock*** : Flag to lock screen transition operations.  
     * If set to true, back operations such as Response.back will be temporarily disabled.
     */
    public static lock : boolean = false;

    private static get routeType() : AppRouteType {
        const MyApp : typeof App = require("app/config/App").MyApp;
        return MyApp.routeType;
    }

    /**
     * ***back*** : Return to the previous screen.  
     * However, this cannot be used if there is no history of the previous screen  
     * or if screen transitions are disabled using lock.  
     * The return value indicates whether the return to the previous screen was successful.
     * @returns {boolean} 
     */
    public static back() : boolean;


    /**
     * ***back*** : Return to the previous screen.  
     * However, this cannot be used if there is no history of the previous screen  
     * or if screen transitions are disabled using lock.  
     * The return value indicates whether the return to the previous screen was successful.
     * @param {number} index Number of screens to go back.
    * @returns {boolean} 
     */
    public static back(index : number) : boolean;

    public static back(index? : number) : boolean {
        if (!index) index = 1;
        if (Response.lock) return false;
        if (this.isBack) return false;

        this.isBack = true;

        if (Data.get("backHandle")) {
            const backHandle = Data.get("backHandle");
            Data.remove("backHandle");
            backHandle();
            this.isBack = false;
            return true;
        }

        let hdata : PageHistory;
        for (let n = 0 ; n < index ; n++) {
            if (this.routeType == AppRouteType.application) {
                if (Data.getLength("history") == 1) return false;
                Data.pop("history");
                hdata= Data.now("history");
            }
            else if(this.routeType == AppRouteType.web) {
                history.back();
            }    
        }

        if(this.routeType == AppRouteType.web) return true;
       
        const route : DecisionRoute = Routes.searchRoute(hdata.url.toString());
        Response.rendering(route, hdata.data).then(()=>{
            this.isBack = false;
        });

        return true;
    }

    /**
     * ***next*** : Transition to the specified URL (route path)  
     * It cannot be used if screen transitions are disabled by lock, etc.  
     * @param {string} url route path
     * @returns {void}
     */
    public static next(url : string | number) : void;

    /**
     * ***next*** : Transition to the specified URL (route path)  
     * It cannot be used if screen transitions are disabled by lock, etc.  
     * @param {string} url route path
     * @param {any?} data Transmission data contents
     * @returns {void}
     */
    public static next(url : string | number, data : any) : void;

    public static next(url : string | number, data? : any) : void {
        if (Response.lock) return;
        this.isBack = false;
        const hdata : PageHistory= {
            url: url,
            data: data,
        };
        Data.push("history", hdata);
        const route : DecisionRoute = Routes.searchRoute(url.toString());
        Response.rendering(route, data);
        if (this.routeType == AppRouteType.web) location.href = "#" + url;
    }

    /**
     * ***addhistory*** : Add root path to screen transition history.  
     * It will only be added to the history and will not change the screen.
     * @param {string} url route path
     * @returns {void}
     */
    public static addHistory(url : string, data?: any) : void {
        if (Response.lock) return;
        this.isBack = false;
        const hdata : PageHistory= {
            url: url,
            data: data,
        };
        Data.push("history", hdata);
    }

    /**
     * ***historyClear*** : Clear screen transition history
     * @returns {void}
     */
    public static historyClear() : void {
        Data.set("history", []);
    }

    /**
     * ***pop*** : Go back to the previous screen transition.
     * @returns {void}
     */
    public static pop() : void {
        Data.pop("history");
    }

    /**
     * ***replace*** : Overwrite the screen transition history and move to the specified root path.  
     * @param {string} url route path
     * @returns {void}
     */
    public static replace(url : string) : void;

    /**
     * ***replace*** : Overwrite the screen transition history and move to the specified root path.  
     * @param {string} url route path
     * @param {any} send Transmission data contents
     * @returns {void}
     */
    public static replace(url : string, send: any) : void;
    
    public static replace(url : string, send?: any) : void {
        this.pop();
        this.next(url, send);
    }

    /**
     * ***now*** : Get current route path.
     * @returns {string}
     */
    public static now() : string {
        return Routes.getRoute().url;
    }

    /**
     * ***isNext*** : A flag that determines if you have proceeded from the next screen.
     */
    public static get isNext() : boolean {
        return !this.isBack;
    }

    /**
     * ***nowView*** : Get the current View class object if there is one.
     */
    public static get nowView() : View {
        if (Data.get("beforeView")) return Data.get("beforeView");
    }
    
    /**
     * ***nowController*** : Get the current Controller class object if there is one.
     */
    public static get nowController() : Controller {
        if (Data.get("beforeController")) return Data.get("beforeController");
    }

    // rendering....
    public static async rendering (route: DecisionRoute, data? : any) {

        const MyApp : typeof App = require("app/config/App").MyApp;

        // Controller & View Leave 
        const befCont : Controller = Data.get("beforeController");
        if(befCont){
            const befContAction = Data.get("beforeControllerAction");
            const res = await befCont.handleLeave(befContAction);
            if (typeof res == "boolean" && res === false) return;

            if (this.isBack) {
                const resBack = await befCont.handleLeaveBack(befContAction);
                if (typeof resBack == "boolean" && resBack === false) return;
            }

            if (this.isNext) {
                const resNext = await befCont.handleLeaveNext(befContAction);
                if (typeof resNext == "boolean" && resNext === false) return;
            }
        }

        const befView = Data.get("beforeView");
        if(befView) {
            const res = await befView.handleLeave();
            if (typeof res == "boolean" && res === false) return;

            if (this.isBack) {
                const resBack = await befView.handleLeaveBack();
                if (typeof resBack == "boolean" && resBack === false) return;
            }

            if (this.isNext) {
                const resNext = await befView.handleLeaveNext();
                if (typeof resNext == "boolean" && resNext === false) return;
            }
        }

        if (MyApp.animationCloseClassName) dom("main").addClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").removeClass(MyApp.animationOpenClassName);

        if (MyApp.delay) await Lib.sleep(MyApp.delay);

        if(route.mode == DecisionRouteMode.Notfound) {
            if (MyApp.notFoundView) {
                route.view = MyApp.notFoundView;
                await Response.renderingOnView(route, data);
            }
            throw("Page Not found. \"" + route.url + "\"");
        }

        if(route.controller){
            await Response.renderingOnController(route, data);
        }
        else if(route.view){
            await Response.renderingOnView(route, data);
        }
    }

    private static async renderingOnController(route : DecisionRoute, data?: any) {
        const controllerName : string = Lib.getModuleName(route.controller + "Controller");
        const controllerPath : string = "app/controller/" + Lib.getModulePath(route.controller + "Controller");
        if(!useExists(controllerPath)){
            throw("\"" + controllerPath + "\" Class is not found.");
        }

        const controllerClass = use(controllerPath);
        const cont : Controller = new controllerClass[controllerName]();
        cont.sendData = data;

        const viewName = route.action + "View";
        const viewPath : string = "app/view/" + route.controller + "/" + Lib.getModulePath(viewName);

        let vw : View; 
        if(useExists(viewPath)){
            const View_ = use(viewPath);
            if (!View_[Lib.getModuleName(viewName)]) {
                console.error("[WARM] \"" + Lib.getModuleName(viewName) + "\"View Class not exists.");
            }
            else {
                vw = new View_[Lib.getModuleName(viewName)]();
                vw.sendData = data;
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


    private static async renderingOnView(route : DecisionRoute, data?: any) {
        const viewName : string = Lib.getModuleName(route.view + "View");
        const viewPath : string = "app/view/" + Lib.getModulePath(route.view + "View");

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_[viewName]();
        vm.sendData = data;
        
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

        const MyApp : typeof App = require("app/config/App").MyApp;

        if (MyApp.animationCloseClassName) dom("main").removeClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").addClass(MyApp.animationOpenClassName);

        vm.myMjs = dom("main article");
        
        await vm.handleRenderBefore();

        // is next page..
        if (Response.isNext) {
            if(route.args){                    
                await vm.handleNext(...route.args);
            }
            else {
                await vm.handleNext();
            }
        }

        // is back page...
        if (Response.isBack) {
            if(route.args){                    
                await vm.handleBack(...route.args);
            }
            else {
                await vm.handleBack();
            }
        }

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
                const template = Template.bind(dom("body"), context.template);
                if (context.handleTemplateChanged) await context.handleTemplateChanged(template);
            }
        }
        else{
            Data.set("beforeTemplate", null);
        }

        // View Rendering...
        const viewHtml = View.getHtml("view/" + context.view);
        if (!dom("main").length) dom("body").append("<main></main>");
        const main = dom("main");
        main.html = "<article>" + viewHtml + "</article>";
        context.mjs = main.childs;

        const beforeHead = Data.get("beforeHead");
        if (beforeHead != context.head) {
            Data.set("beforeHead", context.head);
            if (context.head){
                const head = UI.bind(dom("head"), context.head);
                if (context.handleHeadChanged) await context.handleHeadChanged(head);
            }
            else {
                dom("head").html = "";
            }
        }

        const beforeHeader = Data.get("beforeHeader");
        if (beforeHeader != context.header) {
            Data.set("beforeHeader", context.header);
            if (context.header){
                const header = UI.bind(dom("header"), context.header);
                if (context.handleHeaderChanged) await context.handleHeaderChanged(header);
            }
            else {
                dom("header").html = "";
            }
        }

        const beforeFooter = Data.get("beforeFooter");
        if (beforeFooter != context.footer) {
            Data.set("beforeFooter", context.footer);
            if (context.footer){
                const footer = UI.bind(dom("footer"), context.footer);
                if (context.handleFooterChanged) await context.handleFooterChanged(footer);
            }
            else {
                dom("footer").html = "";
            }
        }
    }
}