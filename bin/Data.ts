export class Data {
    public static __data : {[name : string] : any} = {};

    public static get(name : string) : any {
        return this.__data[name];
    }

    public static set(name : string, value: any) : Data {
        this.__data[name] = value;
        return this;
    }
}