"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = void 0;
class Data {
    /**
     * get
     * Get the value from the specified name
     * @param {string} name
     * @returns
     */
    static get(name) {
        return this.__data[name];
    }
    /**
     * set
     * Hold the value statically for the specified name
     * @param {string} name
     * @param {any} value
     * @returns
     */
    static set(name, value) {
        this.__data[name] = value;
        return this;
    }
    /**
     * remove
     * Delete the value with the specified name
     * @param {string} name
     */
    static remove(name) {
        delete this.__data[name];
    }
    /**
     * push
     * Add and save a value in the specified name area
     * @param {string} name
     * @param {any} value
     * @returns
     */
    static push(name, value) {
        if (!this.__data[name])
            this.__data[name] = [];
        this.__data[name].push(value);
        return this;
    }
    static getLength(name) {
        if (!this.__data[name])
            return;
        return this.__data[name].length;
    }
    static pop(name) {
        if (!this.__data[name])
            return this;
        this.__data[name].pop();
        return this;
    }
    static now(name) {
        if (!this.__data[name])
            return;
        const length = this.__data[name].length;
        return this.__data[name][length - 1];
    }
}
exports.Data = Data;
Data.__data = {};
