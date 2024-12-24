"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingDialog = void 0;
const Dialog_1 = require("Dialog");
/**
 * Loading Icon Dialog Class
 */
class LoadingDialog extends Dialog_1.Dialog {
    /**
     * ***open** : Opens an loading Icon dialog.
     * @param message
     * @returns
     */
    static open(message) {
        const loadingDialog = this.show("loading");
        if (message)
            loadingDialog.vdos.message.text = message;
        return loadingDialog;
    }
    /** set message  */
    set message(message) {
        this.vdos.message.text = message;
    }
}
exports.LoadingDialog = LoadingDialog;
