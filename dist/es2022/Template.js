"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const Render_1 = require("Render");
/**
 * ***Template*** : Template classes
 * If there is anything you want to execute before using the template, prepare it here.
 */
class Template extends Render_1.Render {
    static type = "Template";
    /**
     * ***handle*** : Event handler for when the template is displayed.
     * @param {any} sendData> Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
    static bind(mjs, TemplateName, sendData) {
        if (TemplateName)
            TemplateName = "template/" + TemplateName;
        return super.bind(mjs, TemplateName, sendData, this);
    }
    static append(mjs, TemplateName, sendData) {
        if (TemplateName)
            TemplateName = "template/" + TemplateName;
        return super.append(mjs, TemplateName, sendData, this);
    }
}
exports.Template = Template;
