"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
class UI {
    /**
     * ***myMjs*** : Virtual Dom for content.
     */
    myMjs;
    /**
     * ***mjs**** : Virtual DOM List of ModernJS Classes.
     */
    mjs;
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
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
}
exports.UI = UI;
