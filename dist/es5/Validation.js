"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMethod = exports.Validation = exports.ValidateErrorResult = exports.ValidateRule = void 0;
/**
 * ***ValidateRule*** : Validation check rule enumeration.
 */
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
     * ***byteLength*** : If the length of the value (string) is not the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is not 20 byte.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLength,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["byteLength"] = "byteLength";
    /**
     * ***byteLengthMin*** : If the length of the value (string) is less than the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 10 byte or less.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthMin,
     *   args: [ 20 ],
     * }
     * ```
     */
    ValidateRule["byteLengthMin"] = "byteLengthMin";
    /**
     * ***byteLengthMax*** : If the length of the value (string) is greater than or equal to the specified byte length, an error is detected.
     *
     * Below is an example of an error being detected if the value is 128 byte or more.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthMax,
     *   args: [ 128 ],
     * }
     * ```
     */
    ValidateRule["byteLengthMax"] = "byteLengthMax";
    /**
     * ***byteLengthBetween*** : If the length of the value (string) is outside the specified byte length range, an error is detected.
     *
     * Below is an example of an error being detected if the value is outside the range of 10 to 128 byte.
     * ```typescript
     * {
     *   rule: ValidateRule.byteLengthBetween,
     *   args: [ 10, 128 ],
     * }
     * ```
     */
    ValidateRule["byteLengthBetween"] = "byteLengthBetween";
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
     * ```typescript
     * {
     *    rule: ValidateRule.selected,
     *    args: [ "apple", "orange", "kiwi", "banana" ],
     * }
     * ```
     */
    ValidateRule["selected"] = "selected";
    /**
     * ***selectedLength*** : If the value (array value) does not select the specified number of items, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLength,
     *    args: [ 3 ],
     * }
     * ```
     */
    ValidateRule["selectedLength"] = "selectedLength";
    /**
     * ***selectedLengthMin*** : If the number of values ​​(array values) selected is less than the specified number, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthMin,
     *    args: [ 4 ],
     * }
     * ```
     */
    ValidateRule["selectedLengthMin"] = "selectedLengthMin";
    /**
     * ***selectedLengthMax*** : If the number of selected values ​​(array values) is greater than the specified number, an error will occur.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthMax,
     *    args: [ 10 ],
     * }
     * ```
    */
    ValidateRule["selectedLengthMax"] = "selectedLengthMax";
    /**
     * ***selectedLengthBetween*** : If you select a number of values ​​(array values) outside the specified range, an error will be detected.
     * ```typescript
     * {
     *    rule: ValidateRule.selectedLengthBetween,
     *    args: [ 5, 10 ],
     * }
     * ```
    */
    ValidateRule["selectedLengthBetween"] = "selectedLengthBetween";
    /**
     * ***confirmed*** : If the value is not the same as the specified value, an error occurs.
     * ```typescript
     * {
     *    rule: ValidateRule.confirmed,
     *    args: [ "password" ],
     * }
     * ```
     */
    ValidateRule["confirmed"] = "confirmed";
    /**
     * ***like*** : If the value does not contain the specified string, an error occurs.
     * ```typescript
     * {
     *    rule: ValidateRule.like,
     *    args: [ "word" ],
     * }
     * ```
     */
    ValidateRule["like"] = "like";
    /**
     * ***characterExists*** : If the value contains characters that do not exist in the specified string, an error occurs..
     * ```typescript
     * {
     *    rule: ValidateRule.characterExists,
     *    args: [ "0123456789" ],
     * }
     * ```
    */
    ValidateRule["characterExists"] = "characterExists";
    /**
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumeric,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumeric,
     *    args: [ "-_=+/.," ],
     * }
     * ```
    */
    ValidateRule["alphaNumeric"] = "alphaNumeric";
    /**
     * ***alphaNumericLower*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * Lowercase letters are allowed, but uppercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericLower,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericLower,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaNumericLower"] = "alphaNumericLower";
    /**
     * ***alphaNumericUpper*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     * Uppercase letters are allowed, but lowercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericUpper,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaNumericUpper,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaNumericUpper"] = "alphaNumericUpper";
    /**
     * ***alpha*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * ```typescript
     * {
     *    rule: ValidateRule.alpha,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alpha,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alpha"] = "alpha";
    /**
     * ***alphaLower*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * Lowercase letters are allowed, but uppercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaLower,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaLower,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaLower"] = "alphaLower";
    /**
     * ***alphaUpper*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     * Uppercase letters are allowed, but lowercase letters are not allowed.
     * ```typescript
     * {
     *    rule: ValidateRule.alphaUpper,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.alphaUpper,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["alphaUpper"] = "alphaUpper";
    /**
     * ***numeric*** : If the value contains any characters other than numeric characters and the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.numeric,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.numeric,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["numeric"] = "numeric";
    /**
     * ***isHiranaga*** : If the value contains hiragana and any other characters than the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.isHiranaga,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.isHiranaga,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["isHiranaga"] = "isHiranaga";
    /**
     * ***isKatakana*** : If the value contains katakana and any characters other than the specified special characters, an error is detected.
     * ```typescript
     * {
     *    rule: ValidateRule.isKatakana,
     * }
     * ```
     * Special characters can be allowed in args
     * ```typescript
     * {
     *    rule: ValidateRule.isKatakana,
     *    args: [ "-_=+/.," ],
     * }
     * ```
     */
    ValidateRule["isKatakana"] = "isKatakana";
    /**
     * ***custom*** : For custom validation
     * Execute validation using the specified function.
     *
     * ```typescript
     * {
     *   rule: ValidateRule.custom,
     *   args: [ "customValidate" ],
     * }
     * ```
     *
     * Then, place the customValidate method in the Validation-derived class as follows:
     *
     * ```typescript
     * public customValidate (value : string, args :Array<string>, context : ValidateMethod) {
     *    if (value === "custom value") {
     *        return true;
     *    }
     * }
     * ```
     *
     */
    ValidateRule["custom"] = "custom";
})(ValidateRule || (exports.ValidateRule = ValidateRule = {}));
var ValidateErrorResult = /** @class */ (function () {
    function ValidateErrorResult() {
        /**
         * ***status*** : Verification check result flag.
         * ``false`` means there is an error,  ``true`` means there is no error
         */
        this.status = true;
        this.fields = [];
        this.fieldIndexs = {};
        this.errors = {};
    }
    ValidateErrorResult.prototype.get = function (name, index) {
        var _this = this;
        var res;
        if (name) {
            res = [];
            var errors = this.errors[name];
            if (!errors)
                return;
            errors.forEach(function (error) {
                if (index && index != error.index)
                    return;
                var message = error.message;
                if (!message) {
                    message = "rule = " + error.rule;
                    if (error.args)
                        message += ", args = [" + error.args.join(",") + "]";
                    if (index)
                        message += ", index = " + index;
                }
                res.push(message);
            });
        }
        else {
            res = {};
            this.fields.forEach(function (field) {
                var fieldCount = _this.fieldIndexs[field];
                if (fieldCount) {
                    for (var n = 0; n < fieldCount; n++) {
                        var buffer = _this.get(field, n);
                        if (buffer) {
                            if (!res[field])
                                res[field] = [];
                            res[field] = buffer;
                        }
                    }
                }
                else {
                    var buffer = _this.get(field);
                    if (buffer) {
                        res[field] = buffer;
                    }
                }
            });
        }
        return res;
    };
    ValidateErrorResult.prototype.bind = function (mjs, name, index) {
        var _this = this;
        if (name) {
            if (!mjs.error)
                return;
            if (!mjs.error.childs[name])
                return;
            var target = mjs.error.childs[name];
            var result = void 0;
            if (index) {
                if (target.index(index)) {
                    target = target.index(index);
                    result = this.get(name, index);
                }
                else {
                    result = this.get(name);
                }
            }
            else {
                result = this.get(name);
            }
            if (!target)
                return;
            if (result) {
                target.addClass("active").text = result.join("\n");
            }
            else {
                target.removeClass("active").text = "";
            }
        }
        else {
            this.fields.forEach(function (field) {
                if (_this.fieldIndexs[field]) {
                    var fieldCount = _this.fieldIndexs[field];
                    for (var n = 0; n < fieldCount; n++) {
                        _this.bind(mjs, field, n);
                    }
                }
                else {
                    _this.bind(mjs, field);
                }
            });
        }
    };
    return ValidateErrorResult;
}());
exports.ValidateErrorResult = ValidateErrorResult;
/**
 * ***Validation*** : Class used for input data validation checks.
 * There are two ways to set validation check rules:
 * Create a Validation derived class in the ``app/validation`` directory and place it there, or
 * Specify validation check rules directly using the ``verify`` method, etc.
 */
var Validation = /** @class */ (function () {
    function Validation() {
    }
    Validation.verify = function (data, rules, options) {
        var my = new this();
        if (rules) {
            if (typeof rules == "string") {
                if (my[rules])
                    my.rules = my[rules];
            }
            else {
                my.rules = rules;
            }
        }
        return my.verify(data);
    };
    /**
     * ***verify*** : Runs validation checks on given input data.
     * @param {any} data Input data
     * @param {ValidateOption} options Validate Options
     * @returns {ValidateErrorResult}
     */
    Validation.prototype.verify = function (data, options) {
        if (!options)
            options = {};
        var vm = new ValidateMethod(data, this);
        var c = Object.keys(this.rules);
        var result = new ValidateErrorResult();
        var _loop_1 = function (n) {
            var name_1 = c[n];
            var rules = this_1.rules[name_1];
            result.fields.push(name_1);
            rules.forEach(function (rule) {
                if (!vm[rule.rule])
                    return;
                var value = data[name_1];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    result.fieldIndexs[name_1] = value.length;
                    value.forEach(function (v_, index) {
                        var status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            if (!result.errors[name_1])
                                result.errors[name_1] = [];
                            var errors = {
                                rule: rule.rule,
                                index: index,
                                args: rule.args,
                                message: rule.message,
                            };
                            if (options.oneMessage) {
                                result.errors[name_1][0] = errors;
                            }
                            else {
                                result.errors[name_1].push(errors);
                            }
                        }
                    });
                }
                else {
                    var status_1 = vm[rule.rule](data[name_1], rule.args);
                    if (!status_1) {
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
        if (Object.keys(result.errors).length)
            result.status = false;
        return result;
    };
    Validation.verifyBind = function (mjs, data, rules) {
        var my = new this();
        if (rules)
            my.rules = rules;
        return my.verifyBind(mjs, data);
    };
    /**
     * ***verifyBind*** : After checking the input data for validity, the error content is automatically bound using the virtual DOM.
     * @param {ModernJSList} mjs Virtual DOM Class List
     * @param {any} data input data
     * @returns {ValidateErrorResult}
     */
    Validation.prototype.verifyBind = function (mjs, data) {
        var result = this.verify(data);
        result.bind(mjs);
        return result;
    };
    return Validation;
}());
exports.Validation = Validation;
/**
 * ***ValidateMethod*** : Preset functions for validation checks.
 */
var ValidateMethod = /** @class */ (function () {
    function ValidateMethod(input, context) {
        this.input = input;
        this.context = context;
    }
    ValidateMethod.prototype.getArgValue = function (args, index) {
        if (!args)
            return;
        if (!args[index])
            return;
        if (args[index].toString().indexOf("@") === 0) {
            return this.input[args[index].toString().substring(0)];
        }
        return args[index];
    };
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
        var target = this.getArgValue(args, 0);
        if (value.length !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value.length < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value.length > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.lengthBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = this.getArgValue(args, 0);
        var targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.byteLength = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        var byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.byteLengthMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        var byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.byteLengthMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        var byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.byteLengthBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = this.getArgValue(args, 0);
        var targetMax = this.getArgValue(args, 1);
        var byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < targetMin)
            return false;
        if (byteValue.byteLength > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.value = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.valueBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = this.getArgValue(args, 0);
        var targetMax = this.getArgValue(args, 1);
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
        var target = this.getArgValue(args, 0);
        if (value.length !== target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthMin = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value.length < target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthMax = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value.length > target)
            return false;
        return true;
    };
    ValidateMethod.prototype.selectedLengthBetween = function (value, args) {
        if (!this.required(value))
            return true;
        var targetMin = this.getArgValue(args, 0);
        var targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin)
            return false;
        if (value.length > targetMax)
            return false;
        return true;
    };
    ValidateMethod.prototype.confirmed = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value != target)
            return false;
        return true;
    };
    ValidateMethod.prototype.like = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        if (value.indexOf(target) === -1)
            return false;
        return true;
    };
    ValidateMethod.prototype.characterExists = function (value, args) {
        if (!this.required(value))
            return true;
        var target = this.getArgValue(args, 0);
        var status = true;
        for (var n = 0; n < value.toString().length; n++) {
            var v = value.toString()[n];
            if (target.indexOf(v) === -1) {
                status = false;
                break;
            }
        }
        return status;
    };
    ValidateMethod.prototype.alphaNumeric = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.alphaNumericLower = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "0123456789abcdefghijklmnopqrstuvwxyz";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.alphaNumericUpper = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.alpha = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.alphaLower = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "abcdefghijklmnopqrstuvwxyz";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.alphaUpper = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.numeric = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "0123456789";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.isHiranaga = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "あいうえおかきくけこがぎぐげござじずぜそただちつてとだぢづでとなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.isKatakana = function (value, args) {
        if (!this.required(value))
            return true;
        var addChars = this.getArgValue(args, 0);
        var target = "アイウエオカキクケコガギグゲゴザジズゼソタダチツテトダヂヅデトナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲン";
        if (addChars)
            target += addChars;
        return this.characterExists(value, [target]);
    };
    ValidateMethod.prototype.custom = function (value, args) {
        var custom = this.context[args[0]];
        if (!custom)
            return true;
        return custom(value, args, this);
    };
    return ValidateMethod;
}());
exports.ValidateMethod = ValidateMethod;
