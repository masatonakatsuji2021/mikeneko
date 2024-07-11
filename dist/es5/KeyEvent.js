"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyEvent = void 0;
var KeyEvent = /** @class */ (function () {
    function KeyEvent() {
        this._callback_down = {};
        this._callback_up = {};
        var cont = this;
        document.addEventListener("keydown", function (e) {
            var keyCode = e.code;
            if (cont._callback_down[keyCode]) {
                cont._callback_down[keyCode](e);
            }
        });
        document.addEventListener("keyup", function (e) {
            var keyCode = e.code;
            if (cont._callback_up[keyCode]) {
                cont._callback_up[keyCode](e);
            }
        });
    }
    KeyEvent.prototype.on = function (fullKeyName, keyDownCallback, keyUpCallback) {
        this._callback_down[fullKeyName] = keyDownCallback;
        if (keyUpCallback) {
            this._callback_up[fullKeyName] = keyUpCallback;
        }
        return this;
    };
    KeyEvent.prototype.onArrowUp = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowUp", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowDown = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowDown", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowLeft = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowLeft", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onArrowRight = function (keyDownCallback, keyUpCallback) {
        return this.on("ArrowRight", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onEnter = function (keyDownCallback, keyUpCallback) {
        return this.on("Enter", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onSpace = function (keyDownCallback, keyUpCallback) {
        return this.on("Space", keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onChar = function (keyword, keyDownCallback, keyUpCallback) {
        return this.on("Key" + keyword, keyDownCallback, keyUpCallback);
    };
    KeyEvent.prototype.onNumber = function (number, keyDownCallback, keyUpCallback) {
        return this.on("Number" + number, keyDownCallback, keyUpCallback);
    };
    return KeyEvent;
}());
exports.KeyEvent = KeyEvent;
