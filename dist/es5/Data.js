"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
var Data = /** @class */ (function () {
    function Data() {
    }
    /**
     * get
     * Get the value from the specified name
     * @param {string} name
     * @returns
     */
    Data.get = function (name) {
        return this.__data[name];
    };
    /**
     * set
     * Hold the value statically for the specified name
     * @param {string} name
     * @param {any} value
     * @returns
     */
    Data.set = function (name, value) {
        this.__data[name] = value;
        return this;
    };
    /**
     * remove
     * Delete the value with the specified name
     * @param {string} name
     */
    Data.remove = function (name) {
        delete this.__data[name];
    };
    /**
     * push
     * Add and save a value in the specified name area
     * @param {string} name
     * @param {any} value
     * @returns
     */
    Data.push = function (name, value) {
        if (!this.__data[name])
            this.__data[name] = [];
        this.__data[name].push(value);
        return this;
    };
    Data.getLength = function (name) {
        if (!this.__data[name])
            return;
        return this.__data[name].length;
    };
    Data.pop = function (name) {
        if (!this.__data[name])
            return this;
        this.__data[name].pop();
        return this;
    };
    Data.now = function (name) {
        if (!this.__data[name])
            return;
        var length = this.__data[name].length;
        return this.__data[name][length - 1];
    };
    Data.__data = {};
    return Data;
}());
exports.Data = Data;
