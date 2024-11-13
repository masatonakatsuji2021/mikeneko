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
exports.Dialog = void 0;
var Render_1 = require("Render");
var Lib_1 = require("Lib");
var ModernJS_1 = require("ModernJS");
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} _sendData
     * @returns {void}
     */
    Dialog.prototype.handle = function (_sendData) { };
    /**
     * ***handleClose*** : Handler executed when the dialog is closed.
     * @returns {void}
     */
    Dialog.prototype.handleClose = function () { };
    /**
     * ***close*** : Method for closing the dialog.
     */
    Dialog.prototype.close = function () {
        var _this = this;
        this.myMjs.removeClass("open");
        this.handleClose();
        setTimeout(function () {
            _this.myMjs.remove();
        }, 300);
    };
    Dialog.addDialog = function (dialog) {
        var id = Lib_1.Lib.uniqId();
        this.__openDialogs[id] = dialog;
    };
    /**
     * ***forceClose*** : Forces all open dialogs to close.
     */
    Dialog.forceClose = function () {
        var c = Object.keys(this.__openDialogs);
        for (var n = 0; n < c.length; n++) {
            var id = c[n];
            var dialog = this.__openDialogs[id];
            dialog.close();
            delete this.__openDialogs[id];
        }
    };
    Dialog.bind = function (mjs, dialogName, sendData) {
        if (dialogName)
            dialogName = "dialog/" + dialogName;
        return _super.bind.call(this, mjs, dialogName, sendData, this);
    };
    Dialog.append = function (mjs, dialogName, sendData) {
        if (dialogName)
            dialogName = "dialog/" + dialogName;
        return _super.append.call(this, mjs, dialogName, sendData, this);
    };
    Dialog.show = function () {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _[_i] = arguments[_i];
        }
        var option = {};
        var dialogName;
        if (_ != undefined) {
            if (_[0]) {
                if (_[1]) {
                    dialogName = _[1];
                    option = _[0];
                }
                else {
                    dialogName = _[0];
                }
            }
        }
        if (dialogName)
            dialogName = "dialog/" + dialogName;
        if (!option)
            option = {};
        this.setDialogCss();
        var dialogStr = "<dwindow>" + this.getHtml(dialogName) + "</dwindow>";
        var dialogMjs = ModernJS_1.ModernJS.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach(function (c) {
                dialogMjs.addClass(c);
            });
        }
        (0, ModernJS_1.dom)("body").append(dialogMjs, true);
        dialogMjs.reload();
        setTimeout(function () {
            dialogMjs.addClass("open");
        }, 100);
        var dialog = this.loadClass(dialogMjs, dialogName, option.sendData, this);
        Dialog.addDialog(dialog);
        if (option.handle)
            option.handle(dialog);
        return dialog;
    };
    Dialog.setDialogCss = function () {
        if ((0, ModernJS_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        var style = require("CORERES/dialog/style.css");
        (0, ModernJS_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"data:text/css;base64," + style + "\">");
    };
    Dialog.type = "Dialog";
    Dialog.__openDialogs = {};
    return Dialog;
}(Render_1.Render));
exports.Dialog = Dialog;
