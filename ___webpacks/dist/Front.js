globalThis.webpack = true;
const wp1 = require("WebPackComponents");
globalThis.use = (wppath) => {
    if (!wp1.WebPackComponents[wppath]) throw Error("Module NOt Found \"" + wppath + "\”");
    return wp1.WebPackComponents[wppath];
};
globalThis.useExists = (wppath)=>{
    if(wp1.WebPackComponents[wppath]) return true;
    return false;
};
window.onload = ()=>{
    const st = use("Startor");  
    new st.Startor();
};