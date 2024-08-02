"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dialog = void 0;
var Dialog = /** @class */ (function () {
    function Dialog() {
    }
    Dialog.prototype.handle = function () { };
    Dialog.prototype.close = function () {
        var _this = this;
        this.myMjs.removeClass("open");
        setTimeout(function () {
            _this.myMjs.remove();
        }, 300);
    };
    return Dialog;
}());
exports.Dialog = Dialog;
