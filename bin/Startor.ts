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
                return this.clickHandleDelegate(e);
            });
            window.addEventListener("popstate", async (e : PopStateEvent) => {
                await this.popStateHandleDelegate(e);
            });
        
            await Background.load();
            let url : string = "/";
            if (this.MyApp.routeType == AppRouteType.web) {
                if (location.hash) url = location.hash.substring(1);
            }
            Response.next(url);
        })();
    }

    private clickHandleDelegate(e : MouseEvent){
        if (Response.lock) return false;
        // @ts-ignore
        let target : HTMLElement = e.target;
        for (let n = 0 ; n < 10; n++) {
            try {
                if(!target.tagName) return;
            }catch(error) { return; }
            if (target.tagName == "A") break;
            // @ts-ignore
            target = target.parentNode;
        }
        try {
            if (!target.attributes) return;
        }catch(error) { return; }
        if (!target.attributes["url"]) return;

        // @ts-ignore
        let url = target.getAttribute("url");
        if(!url) return;

        Response.next(url);
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
        Response.rendering(route).then(()=>{
            Response.isBack = false;
        });
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

        Shortcode.add("ui", (args : {[name : string] : string}) : string => {
            if(!args.path) return;
            return Response.UI(args.path);
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