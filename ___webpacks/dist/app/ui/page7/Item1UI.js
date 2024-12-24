"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item1UI = void 0;
const UI_1 = require("UI");
class Item1UI extends UI_1.UI {
    handle() {
        this.vdos.title.text = "Item1 Title Text...";
        this.vdos.description.text = "Description Text Sample Text Text Text Text Text Text Text Text ...";
    }
}
exports.Item1UI = Item1UI;
