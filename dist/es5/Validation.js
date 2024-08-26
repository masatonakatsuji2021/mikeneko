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
var ValidateResult = /** @class */ (function () {
    function ValidateResult() {
        this.status = true;
        this.fields = [];
        this.errors = {};
    }
    return ValidateResult;
}());
exports.ValidateResult = ValidateResult;
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.verify = function (data, rules) {
        var my = new this();
        if (rules)
            my.rules = rules;
        return my.verify(data);
    };
    Validation.prototype.verify = function (data) {
        var vm = new ValidateMethod(data, this);
        var c = Object.keys(this.rules);
        var result = new ValidateResult();
        var _loop_1 = function (n) {
            var name_1 = c[n];
            var rules = this_1.rules[name_1];
            result.fields.push(name_1);
            rules.forEach(function (rule) {
                if (!vm[rule.rule])
                    return;
                var value = data[name_1];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    value.forEach(function (v_, index) {
                        var status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            result.status = false;
                            if (!result.errors[name_1])
                                result.errors[name_1] = [];
                            result.errors[name_1].push({
                                rule: rule.rule,
                                index: index,
                                args: rule.args,
                                message: rule.message,
                            });
                        }
                    });
                }
                else {
                    var status_1 = vm[rule.rule](data[name_1], rule.args);
                    if (!status_1) {
                        result.status = false;
                        if (!result.errors[name_1])
                            result.errors[name_1] = [];
                        result.errors[name_1].push({
                            rule: rule.rule,
                            args: rule.args,
                            message: rule.message,
                        });
                    }
                }
            });
        };
        var this_1 = this;
        for (var n = 0; n < c.length; n++) {
            _loop_1(n);
        }
        return result;
    };
    return Validation;
}());
exports.Validation = Validation;
var ValidateMethod = /** @class */ (function () {
    function ValidateMethod(input, context) {
        this.input = input;
        this.context = context;
    }
    ValidateMethod.prototype.required = function (value) {
        if (value === undefined ||
            value === null ||
            value === "") {
            return false;
        }
        return true;
    };
    ValidateMethod.prototype.length = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = args[0];
        var targetMax = args[1];
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.value = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = args[0];
        var targetMax = args[1];
        if (value < targetMin)
            return false;
        if (value > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.selected = function (value, args) {
        if (!this.required(value))
            return true;
        if (args.indexOf(value) === -1)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLength = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = args[0];
        if (value.length > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = args[0];
        var targetMax = args[0];
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.confirmed = function (value, args) {
        return true;
    };
    ValidateMethod.prototype.alphaNumeric = function (value, args) {
        return true;
    };
    ValidateMethod.prototype.numeric = function (value, args) {
        return true;
    };
    ValidateMethod.prototype.isHiranaga = function (value, args) {
        return true;
    };
    ValidateMethod.prototype.isKatakana = function (value, args) {
        return true;
    };
    ValidateMethod.prototype.custom = function (value, args) {
        return true;
    };
    return ValidateMethod;
}());
exports.ValidateMethod = ValidateMethod;
