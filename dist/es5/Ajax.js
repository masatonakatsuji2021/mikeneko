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
var Ajax = /** @class */ (function () {
    function Ajax() {
    }
    Ajax.send = function (params) {
    };
    return Ajax;
}());
exports.Ajax = Ajax;
