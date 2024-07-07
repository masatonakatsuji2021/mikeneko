import { Routes, Route, DecisionRoute  } from "Routes";
import { Data } from "Data";
import { Background } from "Background";
import { Response } from "Response";

export class Startor {

    public constructor() {
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
}
export const string =  Startor.toString();