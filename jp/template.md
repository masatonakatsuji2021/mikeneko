# Template

テンプレートは各画面ごとに共通で使用するHTMLレンダリングを操作するための機能で、  
Templateはそのテンプレートごとにロジックを実装できるクラスです。

## # テンプレートHTMLの準備

テンプレート用HTMLファイルは``src/rendering/template``ディレクトリに設置してください。

例えばテンプレート名を``default``とする場合は  
設置パスは``src/rendering/template/default.html``となります。

```html
<header></header>
<main></main>
<footer></footer>
```

テンプレート用のHTMLで重要なことは、  
各画面のコンテンツ部分が``main``タグ内に挿入されるため  
必ずコンテンツ部分用の``main``タグをどこかに記述することです。

## # ViewまたはControllerでのテンプレート使用

ViewまたはControllerにてテンプレートを指定するには方法が2種類あります。

一つはpublic変数``template``で定義する方法です。
この場合は下記のように使用するテンプレート名を指定するだけで、テンプレートが適用されます。

```typescript
import { View } from "View";

export class Page1View extends View {

    public template : string = "default";

    public handle() {
        console.log("handle .... OK");
    }
}
```

テンプレートを決定する場合は、この方法が一番簡単な方法です。
ただしライフサイクルが開始されて、handleBefore/handleAfter以後ですでに画面切替が終わっている場合は  
public変数にてテンプレートを切り替えることはできません。

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {
        // ↓ ✕ 切り替えれない 
        this.template = "default";

        console.log("handle .... OK");
    }
}
```

setTemplateメソッドを使う場合は下記のように、  
各イベントハンドラ内にて使用するテンプレート名を引数に代入するタイプのため、  
すでに画面切替が終わっている場合でもテンプレートを切り替えることができます。

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {
        this.setTemplate("default");

        console.log("handle .... OK");
    }
}
```

## # Templateクラスの設置

基本的にテンプレートのHTMLファイルを``src/rendering/template/{テンプレート名}.html``に設置するだけで  
あとは使用するテンプレート名をViewまたはController上で定義するだけでテンプレートを利用できますが、  
テンプレートを表示する際にイベント処理等の特別な操作をしなければならない場合はtsファイルにてTemplateクラスを  
定義する必要があります。

Templateクラスの設置場所は``src/app/template/{テンプレート名}Template.ts``のファイルパス名で下記のコードで設置します。  
例えばテンプレート名を``default``とする場合は、ファイルパスは``src/app/template/DefaultTemplate.ts``です。

```typescript
import { Template } from "Template";

export class DefaultTemplate extends Template {

    public handle() {
        console.log("Default Template Handle .... OK");
    }
}
```

``handle``メソッドがテンプレートが表示された時のイベントハンドラとなります。  


### - Templateクラスを使ったイベント制御

上記のようにTemplateクラスを別途設置することにより、  
テンプレート内でのボタンを押した際のイベント処理内容を設定することができます。

これのメリットは本来View内でコード記述しなければならないイベント処理等を  
Templateに切り分けることができる点です。

例として下記のテンプレートHTML  
``src/rendering/template/default.html``を用意するとします。

```html
<header>
    <a v-child="back">Back</a>
    <div>Main Title</div>
</header>
<main></main>
<footer></footer>
```

Templateクラス``src/app/template/DefaultTemplate.ts``に下記コードを記述します。

```typescript
import { Template} from "Template";
import { Response } from "Response";

export class DefaultTemplate extends Template {

    public handle() {

        this.mjs.back.onClick = () => {
            Response.back();
        };
    }
}
```

これによりbackボタンを押すと前画面に戻ることができます。

<div id="handleTemplateChanged"></div>

### - View/Controllerでの代理実行 (handleTemplateChanged)

上記のようにTemplateクラスを用意できなかった場合でも、  
ViewおよびControllerにて``handleTemplateChanged``メソッドを設置して  
テンプレート表示時のイベントハンドラを代理で設定することはできます

例として下記のテンプレートHTML  
``src/rendering/template/default.html``を用意するとします。

```html
<header>
    <a v-child="back">Back</a>
    <div>Main Title</div>
</header>
<main></main>
<footer></footer>
```

あとはViewにて下記コードを記述します。  

```typescript
import { View } from "View";
import { Template} from "Template";

export class Page1View extends View {

    public template : string = "default";

    public handle() {
        console.log("handle .... OK");
    }

    // Templateイベントハンドラの代理実行
    public handleTemplateChanged(template : Template) {
        this.mjs.back.onClick = () => {
            Response.back();
        };
    }
}
```

``handleTemplateChanged``メソッドはテンプレートが指定したものに切り替わった際に実行される代理のイベントハンドラです。
引数にはTemplateクラスが渡されるので、 その変数を基にイベント処理などが行えます。


