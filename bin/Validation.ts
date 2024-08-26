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
     * ***alphaNumeric*** : If the value contains any characters other than half-width alphanumeric characters and specified special characters, an error is detected.
     */
    alphaNumeric = "alphaNumeric",
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
     * Execute validation using the specified function
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

export class ValidateResult {

    public status : boolean = true;

    public fields : Array<string> = [];

    public errors : ValidateRuleMaps = {};
}

export class Validation {

    public rules : ValidateRuleMaps;

    public static verify(data: any) : ValidateResult;

    public static verify(data: any, rules : ValidateRuleMaps) : ValidateResult;

    public static verify(data: any, rules? : ValidateRuleMaps) : ValidateResult {
        const my = new this();
        if (rules) my.rules = rules;
        return my.verify(data);
    }

    public verify(data : any) : ValidateResult {
        const vm = new ValidateMethod(data, this);
        const c = Object.keys(this.rules);

        let result = new ValidateResult();

        for (let n = 0 ; n < c.length ; n++) {
            const name = c[n];
            const rules = this.rules[name];

            result.fields.push(name);

            rules.forEach((rule) => {

                if (!vm[rule.rule]) return;

                const value = data[name];
                if (Array.isArray(value) && rule.rule.indexOf("selectedLength") === -1) {
                    value.forEach((v_, index) => {
                        const status = vm[rule.rule](v_, rule.args);
                        if (!status) {
                            result.status= false;
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
                        result.status= false;
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
        const target = args[0];
        if (value.length !== target) return false;
        return true;
    }

    public lengthMin(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value.length < target) return false;
        return true;
    }

    public lengthMax(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value.length > target) return false;
        return true;
    }

    public lengthBetween(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = args[0];
        const targetMax = args[1];
        if (value.length < targetMin) return false;
        if (value.length > targetMax) return false;
        return true;
    }

    public value(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value !== target) return false;
        return true;
    }

    public valueMin(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value < target) return false;
        return true;
    }

    public valueMax(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value > target) return false;
        return true;
    }

    public valueBetween(value: any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = args[0];
        const targetMax = args[1];
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
        const target = args[0];
        if (value.length !== target) return false;
        return true;
    }
    
    public selectedLengthMin(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value.length < target) return false;
        return true;
    }

    public selectedLengthMax(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const target = args[0];
        if (value.length > target) return false;
        return true;
    }

    public selectedLengthBetween(value : any, args : Array<any>) : boolean {
        if (!this.required(value)) return true;
        const targetMin = args[0];
        const targetMax = args[0];
        if (value.length < targetMin) return false;
        if (value.length > targetMax) return false;
        return true;
    }

    public confirmed(value : any, args : Array<any>) : boolean {

        return true;
    }

    public alphaNumeric(value : any, args : Array<any>) : boolean {

        return true;
    }

    public numeric(value : any, args : Array<any>) : boolean {

        return true;
    }

    public isHiranaga(value : any, args : Array<any>) : boolean {

        return true;
    }

    public isKatakana(value : any, args : Array<any>) : boolean {

        return true;
    }

    public custom(value : any, args : Array<any>) : boolean {

        return true;
    }
}