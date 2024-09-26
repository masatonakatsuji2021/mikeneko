"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
/**
 * ***Template*** : Template classes
 * If there is anything you want to execute before using the template, prepare it here.
 */
var Template = /** @class */ (function () {
    function Template() {
    }
    Object.defineProperty(Template.prototype, "vdo", {
        /**
         * ***vdo*** : Virtual Dom for content.
         */
        get: function () {
            return this.myMjs;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Template.prototype, "vdos", {
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
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    Template.prototype.handle = function (sendData) { };
    return Template;
}());
exports.Template = Template;
