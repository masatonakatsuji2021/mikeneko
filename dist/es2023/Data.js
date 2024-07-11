"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.get = function (name) {
        return this.__data[name];
    };
    Data.set = function (name, value) {
        this.__data[name] = value;
        return this;
    };
    Data.__data = {};
    return Data;
}());
exports.Data = Data;
