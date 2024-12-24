"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5View = void 0;
const View_1 = require("app/view/View");
const Page5Validation_1 = require("app/validation/Page5Validation");
const AlertDialog_1 = require("app/dialog/AlertDialog");
class Page5View extends View_1.View {
    handle() {
        this.title = "Page5";
        this.vdos.submit.onClick = () => {
            const post = {
                input1: this.vdos.input1.value,
                input2: this.vdos.input2.value,
                input3: this.vdos.input3.value,
                input4: this.vdos.input4.value,
                input5: this.vdos.input5.value,
            };
            const vres = Page5Validation_1.Page5Validation.verifyBind(this.vdos, post);
            if (!vres.status)
                return;
            AlertDialog_1.AlertDialog.open("Submit OK!", "OK", () => { });
        };
    }
}
exports.Page5View = Page5View;
