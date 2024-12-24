"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page3View = void 0;
const Dialog_1 = require("Dialog");
const View_1 = require("app/view/View");
const AlertDialog_1 = require("app/dialog/AlertDialog");
const ConfirmDialog_1 = require("app/dialog/ConfirmDialog");
const LoadingDialog_1 = require("app/dialog/LoadingDialog");
class Page3View extends View_1.View {
    handle() {
        this.title = "Page3";
        this.vdos.d1.onClick = () => {
            // open dialog (test dialog)
            const testDialog = Dialog_1.Dialog.show("test");
            testDialog.vdos.close.onClick = () => {
                testDialog.close();
            };
        };
        this.vdos.d2.onClick = () => {
            // open alert dialog1
            AlertDialog_1.AlertDialog.open("Dialog Title", "description text sample \n ... OK!", "Close");
        };
        this.vdos.d3.onClick = () => {
            // open alert dialog2
            AlertDialog_1.AlertDialog.open("alert dialog2 description text sample....", "Next", () => {
                AlertDialog_1.AlertDialog.open("ok", "close", () => { });
            });
        };
        this.vdos.d4.onClick = () => {
            // open confirm dialog
            ConfirmDialog_1.ConfirmDialog.open("Confirm dialog description text sample....", "Next", "Cancel", () => {
                AlertDialog_1.AlertDialog.open("OK", "close", () => { });
            }, () => { });
        };
        this.vdos.d5.onClick = () => {
            // loading dialog...
            const ld = LoadingDialog_1.LoadingDialog.open("Loading Test...");
            setTimeout(() => {
                ld.close();
            }, 4000);
        };
    }
}
exports.Page3View = Page3View;
