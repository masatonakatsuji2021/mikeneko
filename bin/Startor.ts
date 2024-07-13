import { Routes, Route, DecisionRoute  } from "Routes";
import { Util } from "Util";
import { Data } from "Data";
import { Background } from "Background";
import { Response } from "Response";
import { Shortcode } from "Shortcode";

export class Startor {

    public constructor() {

        this.setShortcode();

        (async ()=>{
            window.addEventListener("click", (e: MouseEvent) => {
                this.cliekHandleDelegate(e);
            });
            window.addEventListener("popstate", async (e : PopStateEvent) => {
                await this.popStateHandleDelegate(e);
            });
        
            await Background.load();
    
            var route : DecisionRoute = Routes.searchRoute();
            Response.rendering(route);
        })();
    }

    private cliekHandleDelegate(e : MouseEvent){
        const target : EventTarget = e.target;
        // @ts-ignore
        if(target.localName !== "a") return;

        // @ts-ignore
        const href = target.getAttribute("href");
        if(!href) return;
        if(href.indexOf("#") !== 0) return;

        Data.set("stepMode",  true);
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