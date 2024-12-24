"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const View_1 = require("View");
const HeaderUI_1 = require("app/ui/HeaderUI");
class View extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.header = "header";
        this.head = "head";
    }
    /**
     * ***title*** : Sets the header title text.
     */
    set title(title) {
        HeaderUI_1.HeaderUI.setTitle = title;
    }
    /**
     * ***back*** : header Back button visibility flag.
     */
    set back(status) {
        HeaderUI_1.HeaderUI.setBack = status;
    }
    handleRenderBefore() {
        this.back = true;
    }
}
exports.View = View;
