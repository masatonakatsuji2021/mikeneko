"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateMethod = exports.Validation = exports.ValidateErrorResult = exports.ValidateRule = void 0;
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
     * ***like*** : If the value does not contain the specified string, an error occurs.
     */
    ValidateRule["like"] = "like";
    /**
     * ***characterExists*** : If the value contains characters that do not exist in the specified string, an error occurs..
     */
    ValidateRule["characterExists"] = "characterExists";
    /**
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    ValidateRule["alphaNumeric"] = "alphaNumeric";
    /**
     * ***alphaNumericLower*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    ValidateRule["alphaNumericLower"] = "alphaNumericLower";
    /**
     * ***alphaNumericUpper*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    ValidateRule["alphaNumericUpper"] = "alphaNumericUpper";
    /**
     * ***alpha*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    ValidateRule["alpha"] = "alpha";
    /**
     * ***alphaLower*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    ValidateRule["alphaLower"] = "alphaLower";
    /**
     * ***alphaUpper*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    ValidateRule["alphaUpper"] = "alphaUpper";
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
    Validation.prototype.verifyBind = function (mjs, data) {
        var result = this.verify(data);
        result.bind(mjs);
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
