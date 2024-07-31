import { App, AppRouteType } from "App";
import { Routes, Route, DecisionRoute  } from "Routes";
import { Util } from "Util";
import { Data } from "Data";
import { Background } from "Background";
import { Response } from "Response";
import { Shortcode } from "Shortcode";

export class Startor {

    private MyApp : typeof App;

    public constructor() {

        const MyApp = require("app/config/App");
        if (!MyApp){
            throw Error("App Class is not found.");
        }
        if (!MyApp.MyApp) {
            throw Error("App Class is not found.")
        }

        this.MyApp = MyApp.MyApp;

        this.setShortcode();

        (async ()=>{
            window.addEventListener("click", (e: MouseEvent) => {
                return this.cliekHandleDelegate(e);
            });
            window.addEventListener("popstate", async (e : PopStateEvent) => {
                await this.popStateHandleDelegate(e);
            });
        
            if (this.MyApp.routeType == AppRouteType.application) Data.push("history", "/");
            await Background.load();
    
            var route : DecisionRoute = Routes.searchRoute();
            Response.rendering(route);
        })();
    }

    private cliekHandleDelegate(e : MouseEvent){
        // @ts-ignore
        let target : HTMLElement = e.target;
        for (let n = 0 ; n < 10; n++) {
            if(!target.tagName) return;
            if (target.tagName == "A") break;
            // @ts-ignore
            target = target.parentNode;
        }

        if (!target.attributes["href"]) return;

        // @ts-ignore
        let href = target.getAttribute("href");
        if(!href) return;
        if(href.indexOf("#") !== 0) return;
        href = href.substring(1);

        if (this.MyApp.routeType == AppRouteType.application) {
            e.preventDefault();
            Data.push("history", href);

            const route : Route = Routes.searchRoute(href);
            Response.rendering(route).then(()=>{
                Data.set("stepMode", false);
            });

            return false;
        }
        else {
            Data.set("stepMode",  true);
            return true;
        }
    }

    private async popStateHandleDelegate(e : PopStateEvent){

        if (Data.get("pageDisable")) {
            const beforeUrl : string = Data.get("beforeUrl");
            if (beforeUrl) {
                history.pushState(null,null,beforeUrl);
            }
            else {
                history.pushState(null,null);
            }
            return false;
        }

        Data.set("beforeUrl", location.hash);        
        let url : string = location.hash.substring(1);
        if (!url) url = "/";

        const route : Route = Routes.searchRoute(url);
        await Response.rendering(route);

        Data.set("stepMode", false);
    }

    private setShortcode(){

        Shortcode.add("rendering", (args : {[name : string] : string}) : string => {
            if(!args.path) return;
            return Response.renderHtml(args.path);
        });

        Shortcode.add("view", (args : {[name : string] : string}) : string => {
            if(!args.path) return;
            return Response.view(args.path);
        });

        Shortcode.add("viewpart", (args : {[name : string] : string}) : string => {
            if(!args.path) return;
            return Response.viewPart(args.path);
        });

        Shortcode.add("template", (args : {[name : string] : string}) : string => {
            if(!args.path) return;
            return Response.template(args.path);
        });

        Shortcode.add("resource", (args : {[name : string] : string}) : string => {
            if(!args.url) return;
            return Util.getResource(args.url);
        });

        Shortcode.add("resource_dataurl", (args : {[name : string] : string}) : string => {
            if(!args.url) return;
            return Util.getResourceDataUrl(args.url);
        });

        Shortcode.add("resource_mimtype", (args : {[name : string] : string}) : string => {
            if(!args.url) return;
            return Util.getResourceMimeType(args.url);
        });

        Shortcode.add("uniqId", (args : {[name : string] : string}) : string => {
            if (!args.length) args.length = "";
            return Util.uniqId(parseInt(args.length));
        });
    }
}
export const string =  Startor.toString();