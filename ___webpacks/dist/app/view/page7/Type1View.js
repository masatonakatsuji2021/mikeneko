"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type1View = void 0;
const View_1 = require("app/view/View");
class Type1View extends View_1.View {
    handle() {
        this.title = "Page1 Type1";
        this.setDt();
        this.interval = setInterval(() => {
            this.setDt();
        }, 1000);
    }
    setDt() {
        const d_ = new Date();
        this.vdos.datetime.text = "DateTime = " +
            d_.getFullYear() + "/" +
            ("00" + (d_.getMonth() + 1)).slice(-2) + "/" +
            ("00" + d_.getDate()).slice(-2) + " " +
            ("00" + d_.getHours()).slice(-2) + ":" +
            ("00" + d_.getMinutes()).slice(-2) + ":" +
            ("00" + d_.getSeconds()).slice(-2);
    }
    // Screen-off handler.
    handleLeave() {
        // Interval Stop.
        clearInterval(this.interval);
    }
}
exports.Type1View = Type1View;
