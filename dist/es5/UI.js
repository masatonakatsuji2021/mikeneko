"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
var Render_1 = require("Render");
/**
 * **UI** : Used when sharing individual display areas in HTML rendering.
 * Used to standardize buttons, list displays, and input fields.
 */
var UI = /** @class */ (function (_super) {
    __extends(UI, _super);
    function UI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    UI.prototype.handle = function (sendData) { };
    UI.bind = function (mjs, UIName, sendData) {
        if (UIName)
            UIName = "ui/" + UIName;
        return _super.bind.call(this, mjs, UIName, sendData, this);
    };
    UI.append = function (mjs, UIName, sendData) {
        if (UIName)
            UIName = "ui/" + UIName;
        return _super.append.call(this, mjs, UIName, sendData, this);
    };
    UI.type = "UI";
    return UI;
}(Render_1.Render));
exports.UI = UI;
