"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMethod = exports.Validation = exports.ValidateResult = exports.ValidateRule = void 0;
var ValidateRule;
(function (ValidateRule) {
    /**
     * ***required*** : If no value is entered, an error is detected.
     *
     * ```typescript
     * {
     *   rule: ValidateRule.required,
     * }
     * ```
     */
    ValidateRule["required"] = "required";
    /**
     * ***length*** : If the length of the value (string) is not the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is not 20 characters.
     * ```typescript
     * {
     *   rule: ValidateRule.length,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["length"] = "length";
    /**
     * ***lengthMin*** : If the length of the value (string) is less than the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 10 characters or less.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthMin,
     *   args: [ 10 ],
     * }
     * ```
     */
    ValidateRule["lengthMin"] = "lengthMin";
    /**
     * ***lengthMax*** : If the length of the value (string) is greater than or equal to the specified length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 128 characters or more.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthMax,
     *   args: [ 128 ],
     * }
     * ```
     */
    ValidateRule["lengthMax"] = "lengthMax";
    /**
     * ***lengthBetween*** : If the length of the value (string) is outside the specified length range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 128 characters.
     * ```typescript
     * {
     *   rule: ValidateRule.lengthBetween,
     *   args: [ 10, 128 ],
     * }
     * ```
     */
    ValidateRule["lengthBetween"] = "lengthBetween";
    /**
     * ***value*** : If the value is not equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is other than 20.
     * ```typescript
     * {
     *   rule: ValidateRule.value,
     *   args: [ 30 ],
     * }
     * ```
     */
    ValidateRule["value"] = "value";
    /**
     * ***valueMin*** : If the value is less than or equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is less than 10.
     * ```typescript
     * {
     *   rule: ValidateRule.valueMin,
     *   args: [ 10 ],
     * }
     * ```
     */
    ValidateRule["valueMin"] = "valueMin";
    /**
     * ***valueMax*** : If the value is greater than or equal to the specified value, an error occurs.
     *
     * Below is an example of an error being detected if the value is 255 or more.
     * ```typescript
     * {
     *   rule: ValidateRule.valueMax,
     *   args: [ 255 ],
     * }
     * ```
     */
    ValidateRule["valueMax"] = "valueMax";
    /**
     * ***valueBetween*** : If the value is outside the specified range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 255.
     * ```typescript
     * {
     *   rule: ValidateRule.valueBetween,
     *   args: [ 10, 255 ],
     * }
     * ```
     */
    ValidateRule["valueBetween"] = "valueBetween";
    /**
     * ***selected*** : If the value is not one of the options, an error occurs.
     */
    ValidateRule["selected"] = "selected";
    /**
     * ***selectedLength*** : If the value (array value) is not the specified number, an error is detected.
     */
    ValidateRule["selectedLength"] = "selectedLength";
    /**
     * ***selectedLengthMin*** : If the value (array value) is less than the specified number, an error is detected.
     */
    ValidateRule["selectedLengthMin"] = "selectedLengthMin";
    /**
     * ***selectedLengthMax*** : If the value (array value) is greater than or equal to the specified number, an error occurs.
     */
    ValidateRule["selectedLengthMax"] = "selectedLengthMax";
    /**
     * ***selectedLengthBetween*** : If the value (array value) is outside the specified range, an error is detected.
     */
    ValidateRule["selectedLengthBetween"] = "selectedLengthBetween";
    /**
     * ***confirmed*** : If the value is not the same as the specified value, an error occurs.
     */
    ValidateRule["confirmed"] = "confirmed";
    /**
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    ValidateRule["alphaNumeric"] = "alphaNumeric";
    /**
     * ***alphaNumeric*** : If the value contains any characters other than alphanumeric characters and the specified special characters, an error is detected.
     */
    ValidateRule["numeric"] = "numeric";
    /**
     * ***isHiranaga*** : If the value contains hiragana and any other characters than the specified special characters, an error is detected.
     */
    ValidateRule["isHiranaga"] = "isHiranaga";
    /**
     * ***isKatakana*** : If the value contains katakana and any characters other than the specified special characters, an error is detected.
     */
    ValidateRule["isKatakana"] = "isKatakana";
    /**
     * ***custom*** : For custom validation
     * Execute validation using the specified function
     */
    ValidateRule["custom"] = "custom";
})(ValidateRule || (exports.ValidateRule = ValidateRule = {}));
class ValidateResult {
    constructor() {
        this.status = true;
        this.fields = [];
        this.errors = {};
    }
}
exports.ValidateResult = ValidateResult;
class Validation {
    static verify(data, rules) {
        const my = new this();
        if (rules)
            my.rules = rules;
        return my.verify(data);
    }
    verify(data) {
        const vm = new ValidateMethod(data, this);
        const c = Object.keys(this.rules);
        let result = new ValidateResult();
        for (let n = 0; n < c.length; n++) {
            const name = c[n];
            const rules = this.rules[name];
            result.fields.push(name);
            rules.forEach((rule) => {
                if (!vm[rule.rule])
                    return;
                const value = data[name];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    value.forEach((v_, index) => {
                        const status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            result.status = false;
                            if (!result.errors[name])
                                result.errors[name] = [];
                            result.errors[name].push({
                                rule: rule.rule,
                                index: index,
                                args: rule.args,
                                message: rule.message,
                            });
                        }
                    });
                }
                else {
                    const status = vm[rule.rule](data[name], rule.args);
                    if (!status) {
                        result.status = false;
                        if (!result.errors[name])
                            result.errors[name] = [];
                        result.errors[name].push({
                            rule: rule.rule,
                            args: rule.args,
                            message: rule.message,
                        });
                    }
                }
            });
        }
        return result;
    }
}
exports.Validation = Validation;
class ValidateMethod {
    constructor(input, context) {
        this.input = input;
        this.context = context;
    }
    required(value) {
        if (value === undefined ||
            value === null ||
            value === "") {
            return false;
        }
        return true;
    }
    length(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length !== target)
            return false;
        return true;
    }
    lengthMin(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length < target)
            return false;
        return true;
    }
    lengthMax(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length > target)
            return false;
        return true;
    }
    lengthBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = args[0];
        const targetMax = args[1];
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    }
    value(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value !== target)
            return false;
        return true;
    }
    valueMin(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value < target)
            return false;
        return true;
    }
    valueMax(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value > target)
            return false;
        return true;
    }
    valueBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = args[0];
        const targetMax = args[1];
        if (value < targetMin)
            return false;
        if (value > targetMax)
            return false;
        return true;
    }
    selected(value, args) {
        if (!this.required(value))
            return true;
        if (args.indexOf(value) === -1)
            return false;
        return true;
    }
    selectedLength(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length !== target)
            return false;
        return true;
    }
    selectedLengthMin(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length < target)
            return false;
        return true;
    }
    selectedLengthMax(value, args) {
        if (!this.required(value))
            return true;
        const target = args[0];
        if (value.length > target)
            return false;
        return true;
    }
    selectedLengthBetween(value, args) {
        if (!this.required(value))
            return true;
        const targetMin = args[0];
        const targetMax = args[0];
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    }
    confirmed(value, args) {
        return true;
    }
    alphaNumeric(value, args) {
        return true;
    }
    numeric(value, args) {
        return true;
    }
    isHiranaga(value, args) {
        return true;
    }
    isKatakana(value, args) {
        return true;
    }
    custom(value, args) {
        return true;
    }
}
exports.ValidateMethod = ValidateMethod;
