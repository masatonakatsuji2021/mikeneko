"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const View_1 = require("View");
class View extends View_1.View {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
        this.header = "header";
    }
    handleBefore() {
        console.log("handle before ... ok");
    }
}
exports.View = View;
