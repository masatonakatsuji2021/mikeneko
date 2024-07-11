"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
class Data {
    static __data = {};
    static get(name) {
        return this.__data[name];
    }
    static set(name, value) {
        this.__data[name] = value;
        return this;
    }
}
exports.Data = Data;
