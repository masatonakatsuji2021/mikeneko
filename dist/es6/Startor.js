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
exports.string = exports.Startor = void 0;
const App_1 = require("App");
const Render_1 = require("Render");
const Lib_1 = require("Lib");
const View_1 = require("View");
const UI_1 = require("UI");
const Template_1 = require("Template");
const Background_1 = require("Background");
const Response_1 = require("Response");
const Shortcode_1 = require("Shortcode");
class Startor {
    constructor() {
        console.log(history);
        const MyApp = require("app/config/App");
        if (!MyApp) {
            throw Error("App Class is not found.");
        }
        if (!MyApp.MyApp) {
            throw Error("App Class is not found.");
        }
        this.MyApp = MyApp.MyApp;
        this.setShortcode();
        (() => __awaiter(this, void 0, void 0, function* () {
            /*
            window.addEventListener("click", (e: MouseEvent) => {
                return this.clickHandleDelegate(e);
            });
            
            window.addEventListener("popstate", async (e : PopStateEvent) => {
                await this.popStateHandleDelegate(e);
            });
        */
            yield Background_1.Background.load();
            let url = this.MyApp.beginURL;
            if (this.MyApp.routeType == App_1.AppRouteType.web) {
                if (location.hash)
                    url = location.hash.substring(1);
            }
            Response_1.Response.next(url);
        }))();
    }
    /*
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
    
            Response.next(url);
        }
    */
    setShortcode() {
        Shortcode_1.Shortcode.add("rendering", (args) => {
            if (!args.path)
                return;
            return Render_1.Render.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("view", (args) => {
            if (!args.path)
                return;
            return View_1.View.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("ui", (args) => {
            if (!args.path)
                return;
            return UI_1.UI.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("template", (args) => {
            if (!args.path)
                return;
            return Template_1.Template.getHtml(args.path);
        });
        Shortcode_1.Shortcode.add("resource", (args) => {
            if (!args.url)
                return;
            return Lib_1.Lib.getResource(args.url);
        });
        Shortcode_1.Shortcode.add("resource_dataurl", (args) => {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceDataUrl(args.url);
        });
        Shortcode_1.Shortcode.add("resource_mimtype", (args) => {
            if (!args.url)
                return;
            return Lib_1.Lib.getResourceMimeType(args.url);
        });
        Shortcode_1.Shortcode.add("uniqId", (args) => {
            if (!args.length)
                args.length = "";
            return Lib_1.Lib.uniqId(parseInt(args.length));
        });
    }
}
exports.Startor = Startor;
exports.string = Startor.toString();
