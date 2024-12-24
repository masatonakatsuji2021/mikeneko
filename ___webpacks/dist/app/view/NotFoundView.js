"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundView = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
class NotFoundView extends View_1.View {
    handle() {
        this.title = "NOT FOUND PAGE!";
        this.mjs.backBtn.onClick = () => {
            Response_1.Response.back();
        };
    }
}
exports.NotFoundView = NotFoundView;
