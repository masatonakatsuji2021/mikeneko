const platform : string = "{{platform}}";
class FrontControl {
    private  __fn = {};
    private  __fn_static = {};
    public setFn(name : string, callback : Function) {
        this.__fn[name] = callback;
    }
    public getFn(name : string) {
        if (this.__fn_static[name]) return this.__fn_static[name];
        if (!this.__fn[name]) throw("No data available. Check if the file exists in the source file \"" + name + "\".")
        let buffer = this.__fn[name]();
        if (this.__fn_static[name] == undefined) this.__fn_static[name] = buffer;
        return buffer;
    }
    public exists(name : string) : boolean {
        if (this.__fn_static[name]) return true;
        if(this.__fn[name]) return true;
        return false;
    }
    public start(callback : Function) {
        window.onload = ()=>{
            if (callback) {
                callback.bind(this)();
            }
            else{
                use("app/index");
            }    
        };
    }
}
const use= (name : string) => {
    return sfa.getFn(name);
};
const useExists = (name: string) => {
    return sfa.exists(name);
};
// @ts-ignore
require = use;
/*
const uses = (names) => {
    var buffers = {};
    names.forEach((n) => {
        var buff = use(n);
        var name = n.split("/");
        name = name[name.length - 1];
        buffers[name] = buff;
    });

    return buffers;
};
*/

let sfa = new FrontControl();