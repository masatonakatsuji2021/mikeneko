import { ModernJS, ModernJSList } from "ModernJS";

export enum ValidateRule {
    /**
     * ***required*** : If no value is entered, an error is detected.
     *   
     * ```typescript
     * {
     *   rule: ValidateRule.required,
     * }
     * ```
     */
    required = "required",
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
    length = "length",
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
    lengthMin = "lengthMin",
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
    lengthMax = "lengthMax",
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
    lengthBetween = "lengthBetween",
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
    byteLength = "byteLength",
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
    byteLengthMin = "byteLengthMin",
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
    byteLengthMax = "byteLengthMax",
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
    byteLengthBetween = "byteLengthBetween",
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
    value = "value",
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
    valueMin = "valueMin",
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
    valueMax = "valueMax",
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
    valueBetween = "valueBetween",
    /**
     * ***selected*** : If the value is not one of the options, an error occurs.
     */
    selected = "selected",
    /**
     * ***selectedLength*** : If the value (array value) is not the specified number, an error is detected.
     */
    selectedLength = "selectedLength",
    /**
     * ***selectedLengthMin*** : If the value (array value) is less than the specified number, an error is detected.
     */
    selectedLengthMin = "selectedLengthMin",
    /**
     * ***selectedLengthMax*** : If the value (array value) is greater than or equal to the specified number, an error occurs.
     */
    selectedLengthMax = "selectedLengthMax",
    /**
     * ***selectedLengthBetween*** : If the value (array value) is outside the specified range, an error is detected.
     */
    selectedLengthBetween = "selectedLengthBetween",
    /**
     * ***confirmed*** : If the value is not the same as the specified value, an error occurs.
     */
    confirmed = "confirmed",
    /**
     * ***like*** : If the value does not contain the specified string, an error occurs.
     */
    like = "like",

    /**
     * ***characterExists*** : If the value contains characters that do not exist in the specified string, an error occurs..
     */
    characterExists = "characterExists",
    /**
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    alphaNumeric = "alphaNumeric",
    /**
     * ***alphaNumericLower*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    alphaNumericLower = "alphaNumericLower",
    /**
     * ***alphaNumericUpper*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    alphaNumericUpper = "alphaNumericUpper",
    /**
     * ***alpha*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    alpha = "alpha",
    /**
     * ***alphaLower*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    alphaLower = "alphaLower",
    /**
     * ***alphaUpper*** : An error is detected if the value contains any characters other than half-width English characters and the specified special characters.
     */
    alphaUpper = "alphaUpper",
    /**
     * ***alphaNumeric*** : If the value contains any characters other than alphanumeric characters and the specified special characters, an error is detected.
     */
    numeric = "numeric",
    /**
     * ***isHiranaga*** : If the value contains hiragana and any other characters than the specified special characters, an error is detected.
     */
    isHiranaga = "isHiranaga",
    /**
     * ***isKatakana*** : If the value contains katakana and any characters other than the specified special characters, an error is detected.
     */
    isKatakana = "isKatakana",
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
    custom = "custom",
}

export interface ValidateRuleMaps {
    [name : string]: Array<ValidateRuleMap>,
}

export interface ValidateRuleMap {
    rule : ValidateRule,

    index?: number,

    args? : Array<string | number>,

    message? : string,
}

export class ValidateErrorResult {

    public status : boolean = true;

    public fields : Array<string> = [];

    public fieldIndexs: {[name: string] : number} = {};

    public errors : ValidateRuleMaps = {};

    public get() : {[name : string] : Array<string>};

    public get(name : string) : Array<string>;

    public get(name : string, index : number) : Array<string>;

    public get(name? : string, index? : number) : Array<string> | {[name : string] : Array<string>} {
        let res;
        if (name) {
            res = [];
            const errors = this.errors[name];
            if (!errors) return;
            errors.forEach((error)=>{
                if (index && index != error.index) return;
                let message = error.message;
                if (!message) {
                    message = "rule = " + error.rule;
                    if (error.args) message += ", args = [" + error.args.join(",") + "]";
                    if (index) message += ", index = " + index;
                }
                res.push(message);
            });
        }
        else {
            res = {};
            this.fields.forEach((field) => {
                const fieldCount = this.fieldIndexs[field];
                if (fieldCount) {
                    for(let n = 0 ; n < fieldCount ; n++) {
                        const buffer = this.get(field, n);
                        if (buffer) {
                            if (!res[field]) res[field] = [];
                            res[field] = buffer;
                        }
                    }
                }
                else {
                    const buffer = this.get(field);
                    if (buffer) {
                        res[field] = buffer;
                    }
                }
            });
        }
        return res;
    }

    public bind(mjs : ModernJSList) : void;

    public bind(mjs : ModernJSList, name : string) : void;

    public bind(mjs : ModernJSList, name : string, index : number) : void;

    public bind(mjs : ModernJSList, name? : string, index? : number) : void {
        if (name) {
            const errorName = "error." + name;
            if (!mjs[errorName]) return;
            let target : ModernJS = mjs[errorName];
            let result;
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

            if (!target) return;

            if (result) {
                target.addClass("active").text = result.join("\n");
            }
            else {
                target.removeClass("active").text = "";
            }
        }
        else {
            this.fields.forEach((field) => {
                if (this.fieldIndexs[field]) {
                    const fieldCount = this.fieldIndexs[field];
                    for(let n = 0 ; n < fieldCount ; n++) {
                        this.bind(mjs, field, n);
                    }
                }
                else {
                    this.bind(mjs, field);
                }
            });
        }
    }
}

export class Validation {

    public rules : ValidateRuleMaps;

    public static verify(data: any) : ValidateErrorResult;

    public static verify(data: any, rules : ValidateRuleMaps) : ValidateErrorResult;

    public static verify(data: any, rules? : ValidateRuleMaps) : ValidateErrorResult {
        const my = new this();
        if (rules) my.rules = rules;
        return my.verify(data);
    }

    public verify(data : any) : ValidateErrorResult {
        const vm = new ValidateMethod(data, this);
        const c = Object.keys(this.rules);

        let result = new ValidateErrorResult();

        for (let n = 0 ; n < c.length ; n++) {
            const name = c[n];
            const rules = this.rules[name];

            result.fields.push(name);

            rules.forEach((rule) => {

                if (!vm[rule.rule]) return;

                const value = data[name];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    result.fieldIndexs[name] = value.length;

                    value.forEach((v_, index) => {
                        const status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            if (!result.errors[name]) result.errors[name] = []; 
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
                        if (!result.errors[name]) result.errors[name] = []; 
                        result.errors[name].push({
                            rule: rule.rule,
                            args: rule.args,
                            message: rule.message,
                        });
                    }
                }
            });
        }

        if (Object.keys(result.errors).length) result.status = false;

        return result;
    }

    public static verifyBind(mjs: ModernJSList, data: any, rules? : ValidateRuleMaps) : ValidateErrorResult {
        const my = new this();
        if (rules) my.rules = rules;
        return my.verifyBind(mjs, data);
    }

    public verifyBind(mjs: ModernJSList, data : any) : ValidateErrorResult {
        const result = this.verify(data);
        result.bind(mjs);
        return result;
    }


}

export class ValidateMethod {

    private input : any;

    private context : Validation;

    public constructor(input : any, context : Validation) {
        this.input = input;
        this.context = context;
    }

    private getArgValue(args : Array<string>, index : number) {
        if (!args) return;
        if (!args[index]) return;
        if (args[index].toString().indexOf("@") === 0) {
            return this.input[args[index].toString().substring(0)];
        }
        return args[index];
    }

    public required(value : any) : boolean {
        if (
            value === undefined ||
            value === null ||
            value === "" 
        ) {
            return false;
        }
        return true;
    }

    public length(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length !== target) return false;
        return true;
    }

    public lengthMin(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length < target) return false;
        return true;
    }

    public lengthMax(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length > target) return false;
        return true;
    }

    public lengthBetween(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin) return false;
        if (value.length > targetMax) return false;
        return true;
    }

    public byteLength(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength !== target) return false;
        return true;
    }

    public byteLengthMin(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < target) return false;
        return true;
    }

    public byteLengthMax(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength > target) return false;
        return true;
    }

    public byteLengthBetween(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        const byteValue = new TextEncoder().encode(value);
        if (byteValue.byteLength < targetMin) return false;
        if (byteValue.byteLength > targetMax) return false;
        return true;
    }

    public value(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value !== target) return false;
        return true;
    }

    public valueMin(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value < target) return false;
        return true;
    }

    public valueMax(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value > target) return false;
        return true;
    }

    public valueBetween(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value < targetMin) return false;
        if (value > targetMax) return false;
        return true;
    }

    public selected(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        if(args.indexOf(value) === -1) return false;
        return true;
    }

    public selectedLength(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length !== target) return false;
        return true;
    }
    
    public selectedLengthMin(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length < target) return false;
        return true;
    }

    public selectedLengthMax(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.length > target) return false;
        return true;
    }

    public selectedLengthBetween(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = this.getArgValue(args, 0);
        const targetMax = this.getArgValue(args, 1);
        if (value.length < targetMin) return false;
        if (value.length > targetMax) return false;
        return true;
    }

    public confirmed(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value != target) return false;
        return true;
    }

    public like(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        if (value.indexOf(target) === -1) return false;
        return true;
    }

    public characterExists(value : any, args: Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = this.getArgValue(args, 0);
        let status : boolean = true;
        for (let n = 0 ; n < value.toString().length ; n++) {
            const v = value.toString()[n];
            if (target.indexOf(v) === -1) {
                status = false;
                break;
            }
        }
        return status;
    }

    public alphaNumeric(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public alphaNumericLower(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "abcdefghijklmnopqrstuvwxyz";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public alphaNumericUpper(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public alpha(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public alphaLower(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "abcdefghijklmnopqrstuvwxyz";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public alphaUpper(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public numeric(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "0123456789";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public isHiranaga(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "あいうえおかきくけこがぎぐげござじずぜそただちつてとだぢづでとなにぬねのはひふへほばびぶべぼぱぴぷぺぽまみむめもやゆよらりるれろわをん";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public isKatakana(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const addChars = this.getArgValue(args, 0);
        let target = "アイウエオカキクケコガギグゲゴザジズゼソタダチツテトダヂヅデトナニヌネノハヒフヘホバビブベボパピプペポマミムメモヤユヨラリルレロワヲン";
        if (addChars) target += addChars;
        return this.characterExists(value, [target]);
    }

    public custom(value : any, args : Array<any>) : boolean {
        const custom = this.context[args[0]];
        if (!custom) return true;
        return custom(value, args, this);
    }
}