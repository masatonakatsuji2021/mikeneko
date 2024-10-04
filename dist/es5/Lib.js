"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Lib = void 0;
var Shortcode_1 = require("Shortcode");
var Lib = /** @class */ (function () {
    function Lib() {
    }
    /**
     * ***existResource** :Determine whether resource data exists in the specified path.
     * @param {string} path
     * @returns
     */
    Lib.existResource = function (path) {
        return useExists("resource/" + path);
    };
    /**
     * ***getResource*** : Get prepared static content data
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string}
     */
    Lib.getResource = function (path) {
        var data = use("resource/" + path);
        var datas = data.split("|");
        var mimeType = datas[0];
        var content = datas[1];
        content = this.base64Decode(content);
        if (mimeType == "text/css" ||
            mimeType == "text/plain" ||
            mimeType == "text/html" ||
            mimeType == "application/json" ||
            mimeType == "text/javascript") {
            content = Shortcode_1.Shortcode.analysis(content);
        }
        return content;
    };
    /**
     * ***getResourceDataUrl*** :
     * @param path
     * @returns
     */
    Lib.getResourceDataUrl = function (path) {
        var data = use("resource/" + path);
        var datas = data.split("|");
        var mimeType = datas[0];
        var content = datas[1];
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
    };
    /**
     * ***getResourceMimeType*** :
     * @param path
     * @returns
     */
    Lib.getResourceMimeType = function (path) {
        var data = use("resource/" + path);
        return data.split("|")[0];
    };
    Lib.getModulePath = function (path) {
        var paths = path.split("/");
        paths.forEach(function (p_, index) {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    };
    Lib.getRenderingPath = function (path, type) {
        var paths = path.split("/");
        paths.forEach(function (p_, index) {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toLowerCase() + p_.substring(1);
                p_ = p_.substring(0, p_.length - type.length);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    };
    Lib.getModuleName = function (string) {
        var strings = string.split("/");
        var string2 = strings[strings.length - 1];
        return string2.substring(0, 1).toUpperCase() + string2.substring(1);
    };
    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    Lib.base64Decode = function (b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    };
    /**
     * ***base64Encode*** :  Encode the text to base64 format.
     * @param {string} text text content
     * @returns {string} base64 encode content
     */
    Lib.base64Encode = function (text) {
        return btoa(unescape(encodeURIComponent(text)));
    };
    Lib.uniqId = function (length) {
        if (!length)
            length = 64;
        var lbn = "0123456789ABCDEFGHIJKNLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var str = "";
        for (var n = 0; n < length; n++) {
            var index = parseInt((Math.random() * 10000).toString());
            var s = lbn[index % lbn.length];
            str += s;
        }
        return str;
    };
    Lib.datetime = function (datetime) {
        return new SbnDateTime(datetime);
    };
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
    Lib.sleep = function (time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    };
    Lib.importResourceScript = function (scriptName, resultVars) {
        var script = this.getResource(scriptName);
        if (resultVars) {
            if (typeof resultVars == "string")
                resultVars = [resultVars];
            script += "\n evalRes = {" + resultVars.join(",") + "};";
        }
        var evalRes;
        eval(script);
        return evalRes;
    };
    return Lib;
}());
exports.Lib = Lib;
var SbnDateTime = /** @class */ (function () {
    function SbnDateTime(datetime) {
        if (datetime) {
            this.d = new Date(datetime);
        }
        else {
            this.d = new Date();
        }
    }
    SbnDateTime.prototype.format = function (format) {
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
    };
    SbnDateTime.prototype.getYear = function () {
        return this.d.getFullYear().toString();
    };
    ;
    SbnDateTime.prototype.getMonth = function () {
        return ("00" + (this.d.getMonth() + 1)).slice(-2);
    };
    SbnDateTime.prototype.getDate = function () {
        return ("00" + this.d.getDate()).slice(-2);
    };
    SbnDateTime.prototype.getDay = function () {
        return this.d.getDay().toString();
    };
    SbnDateTime.prototype.getHours = function () {
        return ("00" + this.d.getHours()).slice(-2);
    };
    SbnDateTime.prototype.getMinutes = function () {
        return ("00" + this.d.getMinutes()).slice(-2);
    };
    SbnDateTime.prototype.getSeconds = function () {
        return ("00" + this.d.getSeconds()).slice(-2);
    };
    SbnDateTime.prototype.getTime = function () {
        return this.d.getTime().toString();
    };
    return SbnDateTime;
}());
exports.SbnDateTime = SbnDateTime;
