"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Type1View = void 0;
const Response_1 = require("Response");
const Lib_1 = require("Lib");
const View_1 = require("app/view/View");
const Routes_1 = require("app/config/Routes");
const SelectMenuView_1 = require("app/view/SelectMenuView");
class Type1View extends View_1.View {
    handle() {
        this.title = "Page1 (Type1)";
        this.vdos.throwBtn.onClick = () => {
            throw Error("ERROR TEST!");
        };
        // SelectMenuBtn on click event handle....
        this.vdos.selectMenuBtn.onClick = () => __awaiter(this, void 0, void 0, function* () {
            // Open StackMenuView in a stack.
            // When returning, the return value is returned after the selection.
            const value = yield SelectMenuView_1.SelectMenuView.stackOpen(this.selectValue);
            this.selectValue = value;
            this.vdos.selectValue.text = "";
            if (value != undefined)
                this.vdos.selectValue.text = "(" + value + ")";
            this.title = "Page1 (Type1)";
        });
        // When you press the type2 button
        this.vdos.type2Btn.onClick = () => {
            // move to Type2
            Response_1.Response.next(Routes_1.RURL.Page1.Type2);
        };
        this.setDateTime();
        this.stt = setInterval(() => {
            this.setDateTime();
        }, 250);
    }
    setDateTime() {
        this.vdos.datetime.text = Lib_1.Lib.datetime().format("YYYY/MM/DD HH:II:SS");
    }
    handleLeave() {
        console.log("stop timer");
        clearInterval(this.stt);
    }
}
exports.Type1View = Type1View;
