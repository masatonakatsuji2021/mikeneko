"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.Startor = void 0;
const App_1 = require("App");
const Routes_1 = require("Routes");
const Util_1 = require("Util");
const Data_1 = require("Data");
const Background_1 = require("Background");
const Response_1 = require("Response");
const Shortcode_1 = require("Shortcode");
class Startor {
    constructor() {
        const MyApp = require("app/config/App");
        if (!MyApp) {
            throw Error("App Class is not found.");
        }
        if (!MyApp.MyApp) {
            throw Error("App Class is not found.");
        }
        this.MyApp = MyApp.MyApp;
        this.setShortcode();
        (async () => {
            window.addEventListener("click", (e) => {
                return this.cliekHandleDelegate(e);
            });
            window.addEventListener("popstate", async (e) => {
                await this.popStateHandleDelegate(e);
            });
            if (this.MyApp.routeType == App_1.AppRouteType.application)
                Data_1.Data.push("history", "/");
            await Background_1.Background.load();
            var route = Routes_1.Routes.searchRoute();
            Response_1.Response.rendering(route);
        })();
    }
    cliekHandleDelegate(e) {
        // @ts-ignore
        let target = e.target;
        for (let n = 0; n < 10; n++) {
            if (!target.tagName)
                return;
            if (target.tagName == "A")
                break;
            // @ts-ignore
            target = target.parentNode;
        }
        // @ts-ignore
        let href = target.getAttribute("href");
        if (!href)
            return;
        if (href.indexOf("#") !== 0)
            return;
        href = href.substring(1);
        if (this.MyApp.routeType == "application") {
            e.preventDefault();
            Data_1.Data.push("history", href);
            const route = Routes_1.Routes.searchRoute(href);
            Response_1.Response.rendering(route).then(() => {
                Data_1.Data.set("stepMode", false);
            });
            return false;
        }
        else {
            Data_1.Data.set("stepMode", true);
            return true;
        }
    }
    async popStateHandleDelegate(e) {
        if (Data_1.Data.get("pageDisable")) {
            const beforeUrl = Data_1.Data.get("beforeUrl");
            if (beforeUrl) {
                history.pushState(null, null, beforeUrl);
            }
            else {
                history.pushState(null, null);
            }
            return false;
        }
        Data_1.Data.set("beforeUrl", location.hash);
        let url = location.hash.substring(1);
        if (!url)
            url = "/";
        const route = Routes_1.Routes.searchRoute(url);
        await Response_1.Response.rendering(route);
        Data_1.Data.set("stepMode", false);
    }
    setShortcode() {
        Shortcode_1.Shortcode.add("rendering", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.renderHtml(args.path);
        });
        Shortcode_1.Shortcode.add("view", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.view(args.path);
        });
        Shortcode_1.Shortcode.add("viewpart", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.viewPart(args.path);
        });
        Shortcode_1.Shortcode.add("template", (args) => {
            if (!args.path)
                return;
            return Response_1.Response.template(args.path);
        });
        Shortcode_1.Shortcode.add("resource", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResource(args.url);
        });
        Shortcode_1.Shortcode.add("resource_dataurl", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResourceDataUrl(args.url);
        });
        Shortcode_1.Shortcode.add("resource_mimtype", (args) => {
            if (!args.url)
                return;
            return Util_1.Util.getResourceMimeType(args.url);
        });
        Shortcode_1.Shortcode.add("uniqId", (args) => {
            if (!args.length)
                args.length = "";
            return Util_1.Util.uniqId(parseInt(args.length));
        });
    }
}
exports.Startor = Startor;
exports.string = Startor.toString();
