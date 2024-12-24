"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page1View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const Routes_1 = require("app/config/Routes");
/**
 * Page1 View Class
 */
class Page1View extends View_1.View {
    handleLeaveBack() {
        console.log("Page1 Leave Back ... OK");
    }
    handle() {
        this.title = "Page1";
        // When you press the next button
        this.vdos.btn.childs.next.onClick = () => {
            // move to type1
            Response_1.Response.next(Routes_1.RURL.Page1.Type1);
        };
        // When you press the replace button
        this.vdos.btn.childs.replace.onClick = () => {
            // move to type1 (replace)
            Response_1.Response.replace(Routes_1.RURL.Page1.Type1);
        };
    }
}
exports.Page1View = Page1View;
