"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SbnDateTime = exports.Util = void 0;
var Util = /** @class */ (function () {
    function Util() {
    }
    /**
     * ***getHtml*** : Gets the prepared rendering data for each
     * @param {string} path rendering data path
     * @returns {string}
     */
    Util.getHtml = function (path) {
        var mainView = use("rendering/" + path + ".html");
        mainView = this.base64Decode(mainView);
        return mainView;
    };
    Util.existPublic = function (path) {
        return useExists("public/" + path);
    };
    /**
     * ***getPublic*** : Get prepared static content data
     * Content is retrieved in dataURL format
     * @param {string} path static content data path
     * @returns {string}
     */
    Util.getPublic = function (path) {
        return use("public/" + path);
    };
    Util.getModulePath = function (path) {
        var paths = path.split("/");
        paths.forEach(function (p_, index) {
            if (index == paths.length - 1) {
                p_ = p_.substring(0, 1).toUpperCase() + p_.substring(1);
                paths[index] = p_;
            }
        });
        return paths.join("/");
    };
    Util.getModuleName = function (string) {
        var strings = string.split("/");
        var string2 = strings[strings.length - 1];
        return string2.substring(0, 1).toUpperCase() + string2.substring(1);
    };
    /**
     * ***base64Decode*** : Decode base64 text to plaintext.
     * @param {string} b64text base64 text
     * @returns {string} plain text content
     */
    Util.base64Decode = function (b64text) {
        return decodeURIComponent(escape(atob(b64text)));
    };
    Util.uniqId = function (length) {
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
    Util.datetime = function (datetime) {
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
    Util.sleep = function (time) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve();
            }, time);
        });
    };
    return Util;
}());
exports.Util = Util;
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
