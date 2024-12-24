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
exports.Type2View = void 0;
const Response_1 = require("Response");
const View_1 = require("app/view/View");
const Data_1 = require("Data");
class Type2View extends View_1.View {
    handle() {
        this.title = "Page1 (Type2)";
        console.log(Data_1.Data.get("history"));
        this.vdos.resetBtn.onClick = () => __awaiter(this, void 0, void 0, function* () {
            Response_1.Response.back();
        });
    }
}
exports.Type2View = Type2View;
