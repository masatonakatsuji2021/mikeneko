"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialog = void 0;
const Dialog_1 = require("Dialog");
/**
 * Confirm Dialog Class
 */
class ConfirmDialog extends Dialog_1.Dialog {
    /**
     * ***open** : Opens an confirm dialog.
     * @param {string} message message
     * @param {string} nextText next button text
     * @param {string} closeText close button text
     * @param {() => void} nextHandle next button click handle
     * @param {() => void} closeHandle Close button click handle
     */
    static open(message, nextText, closeText, nextHandle, closeHandle) {
        const context = this.show("confirm");
        context.vdos.message.text = message;
        context.vdos.next.text = nextText;
        context.vdos.next.onClick = () => {
            nextHandle();
            context.close();
        };
        context.vdos.close.text = closeText;
        context.vdos.close.onClick = () => {
            closeHandle();
            context.close();
        };
    }
}
exports.ConfirmDialog = ConfirmDialog;
