"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UI = void 0;
const Render_1 = require("Render");
/**
 * **UI** : Used when sharing individual display areas in HTML rendering.
 * Used to standardize buttons, list displays, and input fields.
 */
class UI extends Render_1.Render {
    /**
     * ***handle*** : Event handler for when the UI is displayed.
     * @param {any} sendData? Transmission data contents
     * @returns {void}
     */
    handle(sendData) { }
    static bind(mjs, UIName, sendData) {
        if (UIName)
            UIName = "ui/" + UIName;
        return super.bind(mjs, UIName, sendData, this);
    }
    static append(mjs, UIName, sendData) {
        if (UIName)
            UIName = "ui/" + UIName;
        return super.append(mjs, UIName, sendData, this);
    }
}
exports.UI = UI;
UI.type = "UI";
