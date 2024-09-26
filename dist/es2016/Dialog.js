"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
/**
 * ***Dialog*** : A class for displaying or manipulating a dialog screen.
 */
class Dialog {
    /**
     * ***vdo*** : Virtual Dom for content.
     */
    get vdo() {
        return this.myMjs;
    }
    /**
     * ***vdos*** : Virtual DOM List of ModernJS Classes.
     */
    get vdos() {
        return this.mjs;
    }
    /**
     * ***handle*** : An event handler that runs when the dialog is opened.
     * @param {any} sendData
     * @returns {void}
     */
    handle(sendData) { }
    /**
     * ***close*** : Method for closing the dialog.
     */
    close() {
        this.myMjs.removeClass("open");
        setTimeout(() => {
            this.myMjs.remove();
        }, 300);
    }
}
exports.Dialog = Dialog;
