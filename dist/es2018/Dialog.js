"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
class Dialog {
    handle() { }
    close() {
        this.myMjs.removeClass("open");
        setTimeout(() => {
            this.myMjs.remove();
        }, 300);
    }
}
exports.Dialog = Dialog;
