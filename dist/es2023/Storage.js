"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorage = exports.SessionStorage = void 0;
var SessionStorage = /** @class */ (function () {
    function SessionStorage() {
        this.__name = "sbn_";
        var MyApp = use("app/config/App").MyApp;
        if (MyApp.sessionStorage) {
            this.__name = MyApp.sessionStorage;
        }
    }
    SessionStorage.prototype._get = function () {
        var buff = sessionStorage.getItem(this.__name);
        return JSON.parse(buff);
    };
    SessionStorage.prototype.read = function (name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    };
    SessionStorage.prototype.write = function (name, value) {
        var buff = this._get();
        buff[name] = value;
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    SessionStorage.prototype.delete = function (name) {
        var buff = this._get();
        delete buff[name];
        sessionStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    return SessionStorage;
}());
exports.SessionStorage = SessionStorage;
var LocalStorage = /** @class */ (function () {
    function LocalStorage() {
        this.__name = "sbn";
        var MyApp = use("app/config/App").MyApp;
        if (MyApp.localStorage) {
            this.__name = MyApp.localStorage;
        }
    }
    LocalStorage.prototype._get = function () {
        var buff = localStorage.getItem(this.__name);
        return JSON.parse(buff);
    };
    LocalStorage.prototype.read = function (name) {
        var buff = this._get();
        if (buff[name]) {
            return buff[name];
        }
        else {
            return buff;
        }
    };
    LocalStorage.prototype.write = function (name, value) {
        var buff = this._get();
        buff[name] = value;
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    LocalStorage.prototype.delete = function (name) {
        var buff = this._get();
        delete buff[name];
        localStorage.setItem(this.__name, JSON.stringify(buff));
        return this;
    };
    return LocalStorage;
}());
exports.LocalStorage = LocalStorage;
