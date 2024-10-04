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
exports.Template = void 0;
var Render_1 = require("Render");
/**
 * ***Template*** : Template classes
 * If there is anything you want to execute before using the template, prepare it here.
 */
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    Template.prototype.handle = function (sendData) { };
    Template.bind = function (mjs, TemplateName, sendData) {
        if (TemplateName)
            TemplateName = "template/" + TemplateName;
        return _super.bind.call(this, mjs, TemplateName, sendData, this);
    };
    Template.append = function (mjs, TemplateName, sendData) {
        if (TemplateName)
            TemplateName = "template/" + TemplateName;
        return _super.append.call(this, mjs, TemplateName, sendData, this);
    };
    Template.type = "Template";
    return Template;
}(Render_1.Render));
exports.Template = Template;
