# Validation クラス (検証チェック)

## # 簡単な検証チェック

```typescript
import { View } from "View";
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormView extends View {

    public handle() {

        this.vdos.send.onClick = () => {

            const post = {
                name: this.vdos.name.value,
            };

            const rules = {
                name: [
                    {
                        rule: ValidateRule.required,
                    },
                    {
                        rule: ValidateRule.lengthMax,
                        args: [ 64 ] ,
                    }
                ],
            };

            const vres = Validation.verify(post, rules);

            console.log(vres.status);
        };
    }
}
```

## # Validation派生クラスを使った検証チェック

``src/app/validation/FormValidation.ts``

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            {
                rule: ValidateRule.required,
            },
            {
                rule: ValidateRule.lengthMax,
                args: [ 64 ] ,
            },
        ],

    };
}
```

``src/app/view/FormView.ts``

```typescript
import { View } from "View";
import { FormValidation } from "FormValidation";

export class FormView extends View {

    public handle() {

        this.vdos.send.onClick = () => {

            const post = {
                name: this.vdos.name.value,
            };

            const vres = FormValidation.verify(post, rules);

            console.log(vres.status);
        };
    }
}
```

## # 検証チェックエラー詳細内容の取得

```typescript
import { View } from "View";
import { FormValidation } from "FormValidation";

export class FormView extends View {

    public handle() {

        this.vdos.send.onClick = () => {

            const post = {
                name: this.vdos.name.value,
            };

            const vres = FormValidation.verify(post, rules);

            console.log(vres.get());
        };
    }
}
```

## # 検証チェックエラーメッセージの設定と取得

``src/app/validation/FormValidation.ts``

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            {
                rule: ValidateRule.required,
                message: "Name is not entered.",
            },
            {
                rule: ValidateRule.lengthMax,
                args: [ 64 ] ,
                message: "Exceeds 64 characters.",
            },
        ],

    };
}
```

``src/app/view/FormView.ts``

```typescript
import { View } from "View";
import { FormValidation } from "FormValidation";

export class FormView extends View {

    public handle() {

        this.vdos.send.onClick = () => {

            const post = {
                name: this.vdos.name.value,
            };

            const vres = FormValidation.verify(post, rules);

            console.log(vres.get());
        };
    }
}
```

## # bindを使ったエラーメッセージの表示

``src/rendering/view/form.html``

```html
<input type="text" v="name">
<div v="error.name">

<button v="send">Send</button>
```

``src/app/view/FormView.ts``

```typescript
import { View } from "View";
import { FormValidation } from "FormValidation";

export class FormView extends View {

    public handle() {

        this.vdos.send.onClick = () => {

            const post = {
                name: this.vdos.name.value,
            };

            const vres = FormValidation.verify(post, rules);

            vres.bind(this.vdos);
        };
    }
}
```

## # プリセットされている検証チェックルール

### : 未入力

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 名前が未入力
            {
                rule: ValidateRule.required,
            },
        ],
    };
}
```

### : 値(文字列)が指定長さでない

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 64文字でない
            {
                rule: ValidateRule.length,
                args: [ 64 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定長さ未満

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 4文字未満
            {
                rule: ValidateRule.lengthMin,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定長さ以上

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 128文字以上
            {
                rule: ValidateRule.lengthMin,
                args: [ 128 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定長さの範囲外

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 4～128文字の範囲外
            {
                rule: ValidateRule.lengthBetween,
                args: [ 4, 128 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定バイト長さでない

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // バイト数が64byteでない
            {
                rule: ValidateRule.byteLength,
                args: [ 64 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定バイト長さ未満

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // バイト数が4byte未満
            {
                rule: ValidateRule.byteLengthMin,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定バイト長さ以上

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // バイト数が128nyte以上
            {
                rule: ValidateRule.byteLengthMax,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値(文字列)が指定バイト長さの範囲外

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // バイト数が4～128byteの範囲外
            {
                rule: ValidateRule.byteLengthBetween,
                args: [ 4, 128 ],
            },
        ],
    };
}
```

### : 値が指定値でない

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 値が64でない
            {
                rule: ValidateRule.value,
                args: [ 64 ],
            },
        ],
    };
}
```

### : 値が指定値未満

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 値が4未満
            {
                rule: ValidateRule.valueMin,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値が指定値以上

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 値が128以上
            {
                rule: ValidateRule.valueMax,
                args: [ 128 ],
            },
        ],
    };
}
```

### : 値が指定値の範囲外

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        name : [
            // 値が4～128の範囲外
            {
                rule: ValidateRule.valueBetween,
                args: [ 4, 128 ],
            },
        ],
    };
}
```

### : 値に指定の項目以外が入っている

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        select : [
            // 値に指定項目(apple, orange, kiwi, banana)以外が設定されている
            {
                rule: ValidateRule.selected,
                args: [ "apple", "orange", "kiwi", "banana" ],
            },
        ],
    };
}
```

### : 値(リスト)の件数が指定件数以外

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        select : [
            // 値(リスト)が4件でない
            {
                rule: ValidateRule.selectedLength,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値(リスト)の件数が指定件数未満

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        select : [
            // 値(リスト)の件数が4件未満
            {
                rule: ValidateRule.selectedLengthMin,
                args: [ 4 ],
            },
        ],
    };
}
```

### : 値(リスト)の件数が指定件数以上

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        select : [
            // 値(リスト)の件数が128件以上
            {
                rule: ValidateRule.selectedLengthMax,
                args: [ 128 ],
            },
        ],
    };
}
```

### : 値(リスト)の件数が指定件数の範囲外

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        select : [
            // 値(リスト)の件数が4～128件の範囲外
            {
                rule: ValidateRule.selectedLengthBetween,
                args: [ 4, 128 ],
            },
        ],
    };
}
```

### : 値が指定項目と同一でない

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        password1 : [
            // password1がpassword2の値と同一でない
            {
                rule: ValidateRule.confirmed,
                args: [ "password2" ],
            },
        ],
    };
}
```

### : 値(文字列)に指定文字列が含まれていない

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {

        description : [
            // 値(文字列)に"word"の文字列が含まれていない
            {
                rule: ValidateRule.like,
                args: [ "word" ],
            },
        ],
    };
}
```

### : 値に指定文字以外の文字を使用している

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に abcd 以外の文字が含まれている
            {
                rule: ValidateRule.characterExists,
                args: [ "abcd" ],
            },
        ],
    };
}
```

### : 半角英数字以外が含まれている

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字以外の文字が含まれている
            {
                rule: ValidateRule.alphaNumeric,
            },
        ],
    };
}
```

#### :: 指定の特殊文字以外が含まれている場合

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字と
            // 特殊文字(- = _ ,)以外の文字が含まれている
            {
                rule: ValidateRule.alphaNumeric,
                args: [ "-=_," ],
            },
        ],
    };
}
```

### : 半角英数字(英宇は小文字のみ)以外が含まれている

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字(英宇は小文字のみ)以外が
            // 含まれている
            {
                rule: ValidateRule.alphaNumericLower,
            },
        ],
    };
}
```

#### :: 指定の特殊文字以外が含まれている場合


```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字(英宇は小文字のみ)と
            // 特殊文字(- = _ ,)以外の文字が含まれている
            {
                rule: ValidateRule.alphaNumericLower,
                args: [ "-=_," ],
            },
        ],
    };
}
```

### : 半角英数字(英宇は大文字のみ)以外が含まれている

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字(英宇は大文字のみ)以外が
            // 含まれている
            {
                rule: ValidateRule.alphaNumericUpper,
            },
        ],
    };
}
```

#### :: 指定の特殊文字以外が含まれている場合

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英数字(英宇は大文字のみ)と
            // 特殊文字(- = _ ,)以外の文字が含まれている
            {
                rule: ValidateRule.alphaNumericUpper,
                args: [ "-=_," ],
            },
        ],
    };
}
```

### : 半角英字以外が含れている

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英字以外が含まれている
            {
                rule: ValidateRule.alpha,
            },
        ],
    };
}
```

#### :: 指定の特殊文字以外が含まれている場合

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        description : [
            // 値(文字列)に 半角英字と
            // 特殊文字(- = _ ,)以外の文字が含まれている
            {
                rule: ValidateRule.alpha,
                args: [ "-=_," ],
            },
        ],
    };
}
```

### : 半角英字(小文字のみ)以外が含まれている

alphaLower

### : 半角英字(大文字のみ)以外が含まれている

alphaUpper

### : 半角数字以外が含まれている

numeric

### : 全角ひらがな以外が含まれている

isHiranaga

### : 全角カタカナ以外が含まれている

isKatakana

## # カスタムバリデーションの実装

```typescript
import { Validation, ValidateRule, ValidateRuleMaps } from "Validation";

export class FormValidation extends Validation {

    public rules : ValidateRuleMaps = {
        xxxxx : [
            {
                rule: ValidateRule.custom,
                args : [ "customValidate" ],
            },
        ],

    };

    public customValidate(value : string, args :Array<string>) : boolean {
        if (value === "custom value") {
            return true;  
        }
    }
}
```