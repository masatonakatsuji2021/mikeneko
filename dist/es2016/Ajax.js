"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    static send(params) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
}
exports.Ajax = Ajax;
