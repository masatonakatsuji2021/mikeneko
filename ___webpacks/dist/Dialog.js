"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
const Render_1 = require("Render");
const Lib_1 = require("Lib");
const VirtualDom_1 = require("VirtualDom");
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
class Dialog extends Render_1.Render {
    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} _sendData
     * @returns {void}
     */
    handle(_sendData) { }
    /**
     * ***handleClose*** : Handler executed when the dialog is closed.
     * @returns {void}
     */
    handleClose() { }
    /**
     * ***close*** : Method for closing the dialog.
     */
    close() {
        this.myMjs.removeClass("open");
        this.handleClose();
        setTimeout(() => {
            this.myMjs.remove();
        }, 300);
    }
    static addDialog(dialog) {
        const id = Lib_1.Lib.uniqId();
        this.__openDialogs[id] = dialog;
    }
    /**
     * ***forceClose*** : Forces all open dialogs to close.
     */
    static forceClose() {
        const c = Object.keys(this.__openDialogs);
        for (let n = 0; n < c.length; n++) {
            const id = c[n];
            const dialog = this.__openDialogs[id];
            dialog.close();
            delete this.__openDialogs[id];
        }
    }
    static bind(mjs, dialogName, sendData) {
        if (dialogName)
            dialogName = "dialog/" + dialogName;
        return super.bind(mjs, dialogName, sendData, this);
    }
    static append(mjs, dialogName, sendData) {
        if (dialogName)
            dialogName = "dialog/" + dialogName;
        return super.append(mjs, dialogName, sendData, this);
    }
    static show(..._) {
        let option = {};
        let dialogName;
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
        const dialogStr = "<dwindow>" + this.getHtml(dialogName) + "</dwindow>";
        const dialogMjs = VirtualDom_1.VirtualDom.create(dialogStr, "dialog");
        if (option.class) {
            if (typeof option.class == "string")
                option.class = [option.class];
            option.class.forEach((c) => {
                dialogMjs.addClass(c);
            });
        }
        (0, VirtualDom_1.dom)("body").append(dialogMjs, true);
        dialogMjs.reload();
        setTimeout(() => {
            dialogMjs.addClass("open");
        }, 100);
        const dialog = this.loadClass(dialogMjs, dialogName, option.sendData, this);
        Dialog.addDialog(dialog);
        if (option.handle)
            option.handle(dialog);
        return dialog;
    }
    static setDialogCss() {
        if ((0, VirtualDom_1.dom)("head").querySelector("link[m=dl]").length > 0)
            return;
        let style = require("CORERES/dialog/style.css");
        if (!globalThis.webpack) style = "data:text/css;base64," + style;
        (0, VirtualDom_1.dom)("head").afterBegin("<link rel=\"stylesheet\" m=\"dl\" href=\"" + style + "\">");
    }
}
exports.Dialog = Dialog;
Dialog.type = "Dialog";
Dialog.__openDialogs = {};
