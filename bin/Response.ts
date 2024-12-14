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

    route: DecisionRoute,

    controller?: Controller,

    view?: View,

    data?: any,

    drawingRequired? : boolean,

    callback? : Function,
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
    public static back() : Promise<boolean> ;


    /**
     * ***back*** : Return to the previous screen.  
     * However, this cannot be used if there is no history of the previous screen  
     * or if screen transitions are disabled using lock.  
     * The return value indicates whether the return to the previous screen was successful.
     * @param {number} index Number of screens to go back.
    * @returns {boolean} 
     */
    public static back(index : number) : Promise<boolean> ;

    /**
     * ***back*** : Return to the previous screen.  
     * However, this cannot be used if there is no history of the previous screen  
     * or if screen transitions are disabled using lock.  
     * The return value indicates whether the return to the previous screen was successful.
     * @param {string} searchURI The URI to return
    * @returns {boolean} 
     */
    public static back(searchURI : string) : Promise<boolean> ;

    public static async back(indexOrSearchURI? : number | string) : Promise<boolean> {
        if (Response.lock) return false;
        if (this.isBack) return false;

        let index;
        if (indexOrSearchURI) {
            if (typeof indexOrSearchURI == "string") {
                index = 0;
                const histories = Data.get("history");
                for(let n = 0 ; n < histories.length ; n++) {
                    const h_ : PageHistory = histories[histories.length - (n + 1)];
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
        await this.loadLeaveHandle();

        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.animationCloseClassName) dom("main").addClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").removeClass(MyApp.animationOpenClassName);
        if (MyApp.delay) await Lib.sleep(MyApp.delay);

        let hdata : PageHistory;
        for (let n = 0 ; n < index ; n++) {
            if (this.routeType == AppRouteType.application) {
                Data.pop("history");
                hdata= Data.now("history");
                if (hdata) {
                    if (hdata.drawingRequired) {
                        await this.rendering(hdata.route, hdata, hdata.data);
                    }
                    else {
                        dom("main article:last-child").remove();
                    }
                }
            }
            else if(this.routeType == AppRouteType.web) {
                history.back();
            }
        }

        const nowHistory = Data.now("history");
        if (nowHistory.view) {
            if (nowHistory.route.args) {
                await nowHistory.view.handleAlways(...nowHistory.route.args);
            }
            else {
                await nowHistory.view.handleAlways();
            }    
        }

        if (MyApp.animationCloseClassName) dom("main").removeClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").addClass(MyApp.animationOpenClassName);

        console.log("back url=" + hdata.route.url);

        this.isBack = false;
        return true;
    }

    /**
     * ***next*** : Transition to the specified URL (route path)  
     * It cannot be used if screen transitions are disabled by lock, etc.  
     * @param {string} url route path
     * @returns {void}
     */
    public static next(url : string | number) : Promise<any>;

    /**
     * ***next*** : Transition to the specified URL (route path)  
     * It cannot be used if screen transitions are disabled by lock, etc.  
     * @param {string} url route path
     * @param {any?} data Transmission data contents
     * @returns {void}
     */
    public static next(url : string | number, data : any) : Promise<any>;

    public static next(url : string | number, data : any, replaced: boolean) : Promise<any>;

    public static next(url : string | number, data? : any, replaced? : boolean) : Promise<any> {
        return new Promise(async (resolve)=>{
            if (Response.lock) return;
            this.isBack = false;
            const route : DecisionRoute = Routes.searchRoute(url.toString());
            if(route.mode == DecisionRouteMode.Notfound) {
                this.notFoundView(route);
                return;
            }

            let pageHistory : PageHistory= {
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
            await this.loadLeaveHandle();
            pageHistory.callback = resolve;
            Data.push("history", pageHistory);
            console.log("next url=" + route.url);
            await Response.rendering(route, pageHistory, data);
            if (this.routeType == AppRouteType.web) location.href = "#" + url;

            if (replaced) {
                
                const get : Array<PageHistory> = Data.get("history");
                let after = [];
                for(let n = 0 ; n < get.length ; n++){
                    if (n != get.length - 2) {
                        after.push(get[n]);
                    }
                }
                console.log(after);
                Data.set("history", after);
                dom("main article").last.prev.remove();
            }

        });
    }

    private static loadController(route: DecisionRoute, data? : any) : {Controller: Controller, view: View} {
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

        return {
            Controller: cont,
            view: vw,
        };
    }

    private static loadView(route : DecisionRoute, data? : any) : View {
        const viewName : string = Lib.getModuleName(route.view + "View");
        const viewPath : string = "app/view/" + Lib.getModulePath(route.view + "View");

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_[viewName]();
        vm.sendData = data;

        return vm;
    }

    private static notFoundView(route: DecisionRoute, data? : any) {
        const MyApp : typeof App = require("app/config/App").MyApp;
        if (MyApp.notFoundView) {
            route.view = MyApp.notFoundView;
            const errorPageHistory : PageHistory = {
                route: route,
                view: this.loadView(route, data),
            };
            Data.push("history", errorPageHistory);
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
    public static historyAdd(url : string | number, data?: any) : void {
        if (Response.lock) return;
        this.isBack = false;
        const route : DecisionRoute = Routes.searchRoute(url.toString());
        if (route.mode == DecisionRouteMode.Notfound) {
            this.notFoundView(route);
            return;
        }
        let pageHistory : PageHistory= {
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
        Data.push("history", pageHistory);
    }

    /**
     * ***historyAllClear*** : Clear screen transition history
     * @returns {void}
     */
    public static historyAllClear() : void;

    /**
     * ***historyAllClear*** : Clear screen transition history
     * @param {string | number} url back page URL
     * @returns {void}
     */
    public static historyAllClear(url : string | number) : void;

    public static historyAllClear(url? : string | number) : void {
        dom("main archive").remove();
        Data.set("history", []);
        if (url) this.next(url);
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
        this.next(url, send, true);
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

    private static async loadLeaveHandle() {

        const prevHistory : PageHistory = Data.now("history");

        if (prevHistory){
            // Controller & View Leave 
            if(prevHistory.controller){

                const res = await prevHistory.controller.handleLeave(prevHistory.route.action);
                if (prevHistory.callback) {
                    prevHistory.callback(res);
                }

                if (this.isBack) {
                    const res = await prevHistory.controller.handleLeaveBack(prevHistory.route.action);
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }
                    }

                if (this.isNext) {
                    const res = await prevHistory.controller.handleLeaveNext(prevHistory.route.action);
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }
                    }
            }

            if(prevHistory.view) {

                const res = await prevHistory.view.handleLeave();
                if (prevHistory.callback) {
                    prevHistory.callback(res);
                }

                if (this.isBack) {
                    const res = await prevHistory.view.handleLeaveBack();
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }   
                }

                if (this.isNext) {
                    const res = await prevHistory.view.handleLeaveNext();
                    if (prevHistory.callback) {
                        prevHistory.callback(res);
                    }
                }
            }
        }
    }

    // rendering....
    public static async rendering (route: DecisionRoute, pageHistory : PageHistory, data? : any) {

        const MyApp : typeof App = require("app/config/App").MyApp;

        if (MyApp.animationCloseClassName) dom("main").addClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").removeClass(MyApp.animationOpenClassName);
        if (MyApp.delay) await Lib.sleep(MyApp.delay);

        if(route.controller){
            await Response.renderingOnController(route, pageHistory);
        }
        else if(route.view){
            await Response.renderingOnView(route, pageHistory);
        }
    }

    private static async renderingOnController(route : DecisionRoute, pageHistory: PageHistory) {

        const cont : Controller = pageHistory.controller;
        const vw : View = pageHistory.view;

        await cont.handleBefore();
        if(vw) await vw.handleBefore();

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


    private static async renderingOnView(route : DecisionRoute, pageHistory: PageHistory) {

        const vm : View = pageHistory.view;

        Data.set("childClasss",  {});

        await vm.handleBefore();

        await vm.handleAfter();

        await Response.__rendering(route, vm);

        const MyApp : typeof App = require("app/config/App").MyApp;

        if (MyApp.animationCloseClassName) dom("main").removeClass(MyApp.animationCloseClassName);
        if (MyApp.animationOpenClassName) dom("main").addClass(MyApp.animationOpenClassName);

        vm.myMjs = dom("main article:last-child");

        await vm.handleRenderBefore();

        if(route.args){
            await vm.handleAlways(...route.args);
            await vm.handle(...route.args);
        }
        else{
            await vm.handleAlways();
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
        main.append("<article>" + viewHtml + "</article>");
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