"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailView = void 0;
const View_1 = require("app/view/View");
class DetailView extends View_1.View {
    handle(id) {
        this.title = "Page2(ID = " + id + ")";
    }
}
exports.DetailView = DetailView;
