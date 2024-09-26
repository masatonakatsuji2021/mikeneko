"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
/**
 * ***Template*** : Template classes
 * If there is anything you want to execute before using the template, prepare it here.
 */
class Template {
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
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
}
exports.Template = Template;
