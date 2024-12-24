globalThis.use = (path) => {

    try {
        return require(path);
    } catch(error){
        console.log(error);
        console.log(path);
    }

};
globalThis.useExists = (path)=>{

    try {
        const exists = require(path);
        return true;
    } catch(error) {}

    return false;
};
window.onload = ()=>{
    const st = require("Startor");  
    new st.Startor();
};