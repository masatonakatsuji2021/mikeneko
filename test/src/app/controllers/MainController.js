"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainController = void 0;
const Controller_1 = require("Controller");
class MainController extends Controller_1.Controller {
    handleBefore(beginStatus) {
        console.log("Main Controller Before .... OK");
    }
    handleAfter(beginStatus) {
        console.log("Main Controller After .... OK");
    }
    index() {
        console.log("Main Controller Index ...OK");
    }
}
exports.MainController = MainController;
