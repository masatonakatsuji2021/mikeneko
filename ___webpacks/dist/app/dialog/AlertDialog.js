"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertDialog = void 0;
const Dialog_1 = require("Dialog");
/**
 * Alert Dialog Class
 */
class AlertDialog extends Dialog_1.Dialog {
    static open(arg1, arg2, arg3, arg4) {
        let title;
        let message;
        let closeText;
        let closeHandle;
        if (arg4 != undefined) {
            title = arg1;
            message = arg2;
            closeText = arg3;
            closeHandle = arg4;
        }
        else {
            if (typeof arg3 == "string") {
                title = arg1;
                message = arg2;
                closeText = arg3;
            }
            else {
                message = arg1;
                closeText = arg2;
                closeHandle = arg3;
            }
        }
        const context = this.show("alert");
        context.vdos.title.display = false;
        if (title) {
            context.vdos.title.display = true;
            context.vdos.title.text = title;
        }
        context.vdos.message.text = message;
        context.vdos.close.text = closeText;
        context.vdos.close.onClick = () => {
            if (closeHandle)
                closeHandle();
            context.close();
        };
    }
}
exports.AlertDialog = AlertDialog;
