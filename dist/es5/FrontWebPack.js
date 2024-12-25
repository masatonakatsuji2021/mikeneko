"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
var WebPackComponent_1 = require("WebPackComponent");
globalThis.webpack = true;
// @ts-ignore
globalThis.use = function (wppath) {
    if (!WebPackComponent_1.WebPackComponent[wppath])
        throw Error("Module NOt Found \"" + wppath + "\”");
    return WebPackComponent_1.WebPackComponent[wppath];
};
// @ts-ignore
globalThis.useExists = function (wppath) {
    if (WebPackComponent_1.WebPackComponent[wppath])
        return true;
    return false;
};
window.onload = function () {
    var st = use("Startor");
    new st.Startor();
};
