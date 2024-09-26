"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
var UI = /** @class */ (function () {
    function UI() {
    }
    Object.defineProperty(UI.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UI.prototype, "vdos", {
        /**
         * ***vdos*** : Virtual DOM List of ModernJS Classes.
         */
        get: function () {
            return this.mjs;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    UI.prototype.handle = function (sendData) { };
    return UI;
}());
exports.UI = UI;
