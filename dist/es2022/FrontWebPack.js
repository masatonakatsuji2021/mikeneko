"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const WebPackComponent_1 = require("WebPackComponent");
globalThis.webpack = true;
// @ts-ignore
globalThis.use = (wppath) => {
    if (!WebPackComponent_1.WebPackComponent[wppath])
        throw Error("Module NOt Found \"" + wppath + "\”");
    return WebPackComponent_1.WebPackComponent[wppath];
};
// @ts-ignore
globalThis.useExists = (wppath) => {
    if (WebPackComponent_1.WebPackComponent[wppath])
        return true;
    return false;
};
window.onload = () => {
    const st = use("Startor");
    new st.Startor();
};
