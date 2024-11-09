"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ajax = exports.AjaxMethod = void 0;
var AjaxMethod;
(function (AjaxMethod) {
    AjaxMethod["GET"] = "GET";
    AjaxMethod["POST"] = "POST";
    AjaxMethod["PUT"] = "PUT";
    AjaxMethod["DELETE"] = "DELETE";
})(AjaxMethod || (exports.AjaxMethod = AjaxMethod = {}));
class Ajax {
    /**
     * ***send***
     * @param {AjaxOption} params Ajax Request Option
     * @returns
     */
    static async send(params) {
        let req = new XMLHttpRequest();
        if (params.headers) {
            const c = Object.keys(params.headers);
            for (let n = 0; n < c.length; n++) {
                const name = c[n];
                const value = params.headers[name];
                req.setRequestHeader(name, value.toString());
            }
        }
        if (params.responseType)
            req.responseType = params.responseType;
        if (!params.async)
            params.async = false;
        return new Promise((resolve, reject) => {
            req.onload = () => {
                const state = req.readyState;
                if (state == 200) {
                    resolve(req.responseText);
                }
                else {
                    reject(JSON.parse(req.response));
                }
            };
            req.open(params.method, params.url, params.async);
            req.send(null);
        });
    }
}
exports.Ajax = Ajax;
