"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.string = exports.Startor = void 0;
const Routes_1 = require("Routes");
const Data_1 = require("Data");
const Background_1 = require("Background");
const Response_1 = require("Response");
class Startor {
    constructor() {
        (async () => {
            window.addEventListener("click", (e) => {
                this.cliekHandleDelegate(e);
            });
            window.addEventListener("popstate", async (e) => {
                await this.popStateHandleDelegate(e);
            });
            await Background_1.Background.load();
            var route = Routes_1.Routes.searchRoute();
            Response_1.Response.rendering(route);
        })();
    }
    cliekHandleDelegate(e) {
        const target = e.target;
        // @ts-ignore
        if (target.localName !== "a")
            return;
        // @ts-ignore
        const href = target.getAttribute("href");
        if (!href)
            return;
        if (href.indexOf("#") !== 0)
            return;
        Data_1.Data.set("stepMode", true);
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
}
exports.Startor = Startor;
exports.string = Startor.toString();
