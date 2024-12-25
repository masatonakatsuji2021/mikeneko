"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Lib = void 0;
const Shortcode_1 = require("Shortcode");
class Lib {
    /**
     * ***existResource** :Determine whether resource data exists in the specified path.
     * @param {string} path
     * @returns
     */
    static existResource(path) {
        return useExists("resource/" + path);
    }
    /**
     * ***getResource*** : Get prepared static content data
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string}
     */
    static getResource(path) {
        const data = use("resource/" + path);
        if (globalThis.webpack) return data;
        const datas = data.split("|");
        const mimeType = datas[0];
        let content = datas[1];
        content = this.base64Decode(content);
        if (mimeType == "text/css" ||
            mimeType == "text/plain" ||
            mimeType == "text/html" ||
            mimeType == "application/json" ||
            mimeType == "text/javascript") {
            content = Shortcode_1.Shortcode.analysis(content);
        }
        return content;
    }
    /**
     * ***getResourceDataUrl*** :
     * @param path
     * @returns
     */
    static getResourceDataUrl(path) {
        const data = use("resource/" + path);
        if (globalThis.webpack) return data;
        const datas = data.split("|");
        const mimeType = datas[0];
        let content = datas[1];
        if (mimeType == "text/css" ||
            mimeType == "text/plain" ||
            mimeType == "text/html" ||
            mimeType == "application/json" ||
            mimeType == "text/javascript") {
            content = this.base64Decode(content);
            content = Shortcode_1.Shortcode.analysis(content);
            content = this.base64Encode(content);
        }
        return "data:" + mimeType + ";base64," + content;
    }
    /**
     * ***getResourceMimeType*** :
     * @param path
     * @returns
     */
    static getResourceMimeType(path) {
        const data = use("resource/" + path);
        return data.split("|")[0];
    }
    static getModulePath(path) {
        const paths = path.split("/");
        paths.forEach((p_, index) => {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    }
    static getRenderingPath(path, type) {
        const paths = path.split("/");
        paths.forEach((p_, index) => {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toLowerCase() + p_.substring(1);
                p_ = p_.substring(0, p_.length - type.length);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    }
    static getModuleName(string) {
        const strings = string.split("/");
        const string2 = strings[strings.length - 1];
        return string2.substring(0, 1).toUpperCase() + string2.substring(1);
    }
    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    static base64Decode(b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    }
    /**
     * ***base64Encode*** :  Encode the text to base64 format.
     * @param {string} text text content
     * @returns {string} base64 encode content
     */
    static base64Encode(text) {
        return btoa(unescape(encodeURIComponent(text)));
    }
    static uniqId(length) {
        if (!length)
            length = 64;
        const lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let str = "";
        for (var n = 0; n < length; n++) {
            let index = parseInt((Math.random() * 10000).toString());
            let s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    }
    static datetime(datetime) {
        return new SbnDateTime(datetime);
    }
    /**
     * passByValue
     * @param {any} values
     * @returns
     */
    static passByValue(values) {
        return this._passByValue(values);
    }
    static _passByValue(values) {
        let buffers = {};
        const c = Object.keys(values);
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const value = values[name];
            if (typeof value == "object") {
                const value_ = this._passByValue(value);
                buffers[name] = value_;
            }
            else {
                buffers[name] = value;
            }
        }
        return buffers;
    }
    /**
     * ***sleep*** :  Stop processing for a certain period of time.(Synchronous processing)
     * This method is synchronized by executing it with await inside the asynced function.
     *
     * Example)
     * ```typescript
     * await sleep(1000);        // <= Stop processing for 1000ms
     * ```
     * @param {number} time Stop time
     * @returns {promise<unknown>} Promise Object
     */
    static sleep(time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    }
    static importResourceScript(scriptName, resultVars) {
        let script = this.getResource(scriptName);
        if (resultVars) {
            if (typeof resultVars == "string")
                resultVars = [resultVars];
            script += "\n evalRes = {" + resultVars.join(",") + "};";
        }
        let evalRes;
        eval(script);
        return evalRes;
    }
}
exports.Lib = Lib;
class SbnDateTime {
    constructor(datetime) {
        if (datetime) {
            this.d = new Date(datetime);
        }
        else {
            this.d = new Date();
        }
    }
    format(format) {
        if (format == undefined)
            format = "YYYY/MM/DD HH:II:SS";
        format = format.split("YYYY").join(this.getYear());
        format = format.split("MM").join(this.getMonth());
        format = format.split("DD").join(this.getDate());
        format = format.split("W").join(this.getDay());
        format = format.split("HH").join(this.getHours());
        format = format.split("II").join(this.getMinutes());
        format = format.split("SS").join(this.getSeconds());
        format = format.split("U").join(this.getTime());
        return format;
    }
    getYear() {
        return this.d.getFullYear().toString();
    }
    ;
    getMonth() {
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    }
    getDate() {
        return ("00" + this.d.getDate()).slice(-2);
    }
    getDay() {
        return this.d.getDay().toString();
    }
    getHours() {
        return ("00" + this.d.getHours()).slice(-2);
    }
    getMinutes() {
        return ("00" + this.d.getMinutes()).slice(-2);
    }
    getSeconds() {
        return ("00" + this.d.getSeconds()).slice(-2);
    }
    getTime() {
        return this.d.getTime().toString();
    }
}
exports.SbnDateTime = SbnDateTime;
