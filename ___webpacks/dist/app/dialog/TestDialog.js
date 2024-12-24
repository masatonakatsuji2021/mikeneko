"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestDialog = void 0;
const Dialog_1 = require("Dialog");
class TestDialog extends Dialog_1.Dialog {
    handle() {
        this.vdos.close.onClick = () => {
            this.close();
        };
    }
}
exports.TestDialog = TestDialog;
