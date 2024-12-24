"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page5Validation = void 0;
const Validation_1 = require("Validation");
class Page5Validation extends Validation_1.Validation {
    constructor() {
        super(...arguments);
        this.rules = {
            input1: [
                {
                    rule: Validation_1.ValidateRule.required,
                    message: "未入力です",
                },
            ],
            input2: [
                {
                    rule: Validation_1.ValidateRule.length,
                    args: [4],
                    message: "4文字で入力してください",
                },
            ],
            input3: [
                {
                    rule: Validation_1.ValidateRule.lengthMin,
                    args: [4],
                    message: "4文字以上で入力してください",
                },
            ],
            input4: [
                {
                    rule: Validation_1.ValidateRule.lengthMax,
                    args: [4],
                    message: "4文字以下で入力してください",
                },
            ],
            input5: [
                {
                    rule: Validation_1.ValidateRule.lengthBetween,
                    args: [4, 12],
                    message: "4 - 12文字の範囲で入力してください",
                },
            ],
        };
    }
}
exports.Page5Validation = Page5Validation;
