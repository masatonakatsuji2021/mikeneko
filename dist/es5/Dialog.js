"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
var Dialog = /** @class */ (function () {
    function Dialog() {
    }
    Object.defineProperty(Dialog.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Dialog.prototype, "vdos", {
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
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} sendData
     * @returns {void}
     */
    Dialog.prototype.handle = function (sendData) { };
    /**
     * ***close*** : Method for closing the dialog.
     */
    Dialog.prototype.close = function () {
        var _this = this;
        this.myMjs.removeClass("open");
        setTimeout(function () {
            _this.myMjs.remove();
        }, 300);
    };
    return Dialog;
}());
exports.Dialog = Dialog;
