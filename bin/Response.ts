import { DecisionRoute, DecisionRouteMode } from "Routes";
import { Util } from "Util";
import { Data } from "Data";
import { Controller } from "Controller";
import { View } from "View";

export class Response {

    public static async rendering (route: DecisionRoute) {

        try{

            // Controller & View Leave 
            const befCont : Controller = Data.get("beforeController");
            if(befCont){
                await befCont.handleLeave(Data.get("beforeControllerAction"));
            }

            const befView = Data.get("beforeView");
            if(befView){
                await befView.handleLeave();
            }

            if(route.mode == DecisionRouteMode.Notfound)throw("Page Not found");

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
        const controllerPath : string = "app/controllers/" + Util.getModulePath(route.controller + "Controller");
        if(!useExists(controllerPath)){
            throw("\"" + controllerPath + "\" Class is not found.");
        }

        const controllerClass = use(controllerPath);
        const cont : Controller = new controllerClass[controllerName]();

        const viewName = route.action + "View";
        const viewPath : string = "app/views/" + route.controller + "/" + Util.getModulePath(viewName);
        
        let vw : View; 
        if(useExists(viewPath)){
            const View_ = use(viewPath);
            vw = new View_();
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

        // await Response.__rendering(routes, cont);

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
        const viewName : string = Util.getModuleName(route.controller + "View");
        const viewPath : string = "app/views/" + Util.getModulePath(route.controller + "View");

        if(!useExists(viewPath)){
            throw("\"" + viewName + "\" Class is not found.");
        }

        const View_ = use(viewPath);
        const vm : View = new View_();

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

        // await Response.__rendering(route, vm);

        await vm.handleRenderBefore();

        if(route.args){
            await vm.handle(...route.args);
        }
        else{
            await vm.handle();
        }

        await vm.handleRenderAfter();
    }

}