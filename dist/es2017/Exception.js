"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const View_1 = require("View");
class Exception extends View_1.View {
    constructor() {
        super(...arguments);
        this.view = "exception";
    }
    /**
     * ***handle*** :
     * Event handler when an error occurs.
     * @param {Exception} exception Error Exception
     * @returns {void}
    */
    handle(exception) { }
}
exports.Exception = Exception;
