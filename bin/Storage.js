"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = exports.SessionStorage = void 0;
// @ts-ignore
const App_1 = require("app/config/App");
class SessionStorage {
    constructor() {
        this.__name = "sbn_";
        if (App_1.MyApp.sessionStorage) {
            this.__name = App_1.MyApp.sessionStorage;
        }
    }
    _get() {
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    }
    read(name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    }
    write(name, value) {
        var buff = this._get();
        buff[name] = value;
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
    delete(name) {
        var buff = this._get();
        delete buff[name];
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}
exports.SessionStorage = SessionStorage;
class LocalStorage {
    constructor() {
        this.__name = "sbn";
        if (App_1.MyApp.localStorage) {
            this.__name = App_1.MyApp.localStorage;
        }
    }
    _get() {
        var buff = localStorage.getItem(this.__name);
        return JSON.parse(buff);
    }
    read(name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    }
    write(name, value) {
        var buff = this._get();
        buff[name] = value;
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
    delete(name) {
        var buff = this._get();
        delete buff[name];
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    }
}
exports.LocalStorage = LocalStorage;
