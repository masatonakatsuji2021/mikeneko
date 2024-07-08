"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const Dom_1 = require("Dom");
const Controller_1 = require("Controller");
class MainController extends Controller_1.Controller {
    constructor() {
        super(...arguments);
        this.template = "default";
        this.head = "head";
    }
    handleBefore(beginStatus) {
        console.log("Main Controller Before .... OK");
    }
    handleAfter(beginStatus) {
        console.log("Main Controller After .... OK");
    }
    index() {
        console.log("Main Controller Index ...OK");
    }
    page1() {
        const a = (0, Dom_1.VDom)("button1");
        a.on("click", () => {
            alert("Page1 Click ... OK");
        });
    }
}
exports.MainController = MainController;
