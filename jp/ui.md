# UI 

UIは、各画面内において個別の機能を持つ部分を共通化及び部品化するための機能です。  
UIを使用することで、機能を部品化できるため他画面における機能の共通化を行うことができます。

## # 基本的な実装

UIはファイル別でレンダリングHTML(.html)と、スクリプトコードとしてのUIクラス(.ts)に切り分けられます。  
UIクラスは任意で必要に応じて準備してください。

例としてまず``rendering/ui/item.html``に下記コードを記述してUIのレンダリングを用意します。

```html
<div class="item">
    <div v="message"></div>
</div>
```

次に``app/ui/ItemUI.ts``にてUIクラスを作成して、  
バインドまたは追記された時のハンドラを準備します。

UIクラスの作成は任意です。  
レンダリングのみを準備しておくだけでも、指定箇所にバインド及び追記をすることは可能ですが  
その場合はハンドラが用意されないので、バインド後等の操作を別途実装する必要があります。

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {

        this.mjs.messsage.text = "Item Message Text....";
    }
}
```

UIの指定箇所への[バインド方法](#bind)と[追記方法](#append)についてはそれぞれを参照してください。

## # UIのHTML取得

以下対象UIのレンダリングHTML取得は大きく2つの方法があります。

- [UI.getHtmlメソッドで取得](#gethtml1)
- [UIクラスを作成して取得する](#gethtml2)

まず対象のUI``rendering/ui/item.html``を設置して、    
下記コードを記述します。

```html
<div class="item">
    <div v="message"></div>
</div>
```
<div id="gethtml1"></div>

### : UI.getHtmlメソッドで取得

コアライブラリにある``UI``クラスを使って直接レンダリングHTMLを取得できます。  
下記のように``UI.getHtml``メソッドを実行するだけです。

引数には対象UI名を指定してください。

これにより対象UIのレンダリングHTMLが取得されます。

```typescript
import { View } from "View";
import { UI } from "UI";

export class HomeView extends View {

    public handle() {
        // get item ui html content...
        console.log(UI.getHtml("item"));
    }
}
```

<div id="gethtml2"></div>

### : UIクラスを作成して取得する

tsファイル``app/ui/ItemUI.ts``を設置して、下記コードを記述します。  
これによりItemUIクラスが準備されます。

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {}
}
```

上記で設置した``ItemUI``クラスを使って直接レンダリングHTMLを取得します。
下記のように``UI.getHtml``メソッドを実行するだけです。  
(この場合``UI``クラスのときとは違い引数名は不要になります。)

```typescript
import { View } from "View";
import { ItemUI } from "app/ui/ItemUI";

export class HomeView extends View {

    public handle() {
        // get item ui html content...
        console.log(ItemUI.getHtml());
    }
}
```

<div id="bind"></div>

## # UIのバインド

対象UIをView等に表示させるにはバインド機能を使うと便利です。

以下指定箇所へのUIのバインド方法を解説しています。  
必ずバインド先の仮想DOMとなる要素が必要になります。  

``rendering/view/home.html``等に下記のようなコードでバインド先の仮想DOM要素を指定します。

```html
<div v="bind"></div>
```

バインド方法には大きく2つの方法がありますのでそちらを参照してください。

- [UI.bindメソッドで直接バインドする](#bind1)
- [UIクラスを作成してバインドする](#bind2)

なおバインド機能を使用すると、対象UIのクラスが存在する場合に  
そのハンドラ(``handle``メソッド)を自動的に実行します。

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {
        // バインド時にここのハンドラが実施される
        console.log("item ui handler ...... OK");
    }
}
```

<div id="bind1"></div>

### : UI.bindメソッドで直接バインドする

コアライブラリにある``UI``クラスを使ってバインドを実施できます。    
下記のように``UI.bind``メソッドを実行するだけです。

引数には順にバインド先の仮想DOM、対象UI名を指定してください。　　
これにより対象UIのレンダリングHTMLが指定の仮想DOM用紙にバインドされます。

戻り値には``UI``クラスかもしくは対象UIクラスが準備されている場合はそのクラスオブジェクトが返されます。  
それによりUI内の仮想DOM操作を行うことも可能です。

```typescript
import { View } from "View";
import { UI } from "UI";

export class HomeView extends View {

    public handle() {

        // ItemUI Bind....
        const item : UI = UI.bind(this.mjs.bind, "item");
        item.mjs.message.text = "Item Message Text ..... OK";
    }
}
```
<div id="bind2"></div>

### : UIクラスを作成してバインドする

tsファイル``app/ui/ItemUI.ts``を設置して、下記コードを記述します。  
これによりItemUIクラスが準備されます。

``app/ui/ItemUI.ts``

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {

        this.mjs.messsage.text = "Item Message Text....";
    }
}
```

上記で設置した``ItemUI``クラスを使って直接バインドを実施します。
下記のように``ItemUI.bind``メソッドを実行するだけです。  
(この場合``UI``クラスのときとは違い引数名はバインド先の仮想DOMのみで十分となります。)

戻り値は対象UIのクラスオブジェクトが返されます。  
それによりバインド語にUI内の仮想DOM操作を行うことが任意で可能となります。

```typescript
import { View } from "View";
import { ItemUI } from "app/ui/ItemUI";

export class HomeView extends View {

    public handle() {

        // ItemUI Bind....
        const item : ItemUI = ItemUI.bind(this.mjs.bind);
        // 追加で文字色を変更
        item.mjs.message.style({ color : "orange" });
    }
}
```

## # UIの追記

UIの追記はバインドとは異なり、指定の仮想DOM要素内の下部に対象UIのレンダリングHTMLが順次追加されます。  
リスト表示などで同じ表示項目を連続で表示させるときなどに便利な機能です。

``rendering/view/home.html``等に下記のようなコードで追記先の仮想DOM要素を指定します。

```html
<div v="list"></div>
```

UIの追記方法は大きく2つの方法がありますのでそちらを参照してください。

- [UI.appendメソッドで直接追記する](#append1)
- [UIクラスを作成して追記する](#append2)

なお追記機能を使用すると、対象UIのクラスが存在する場合に  
そのハンドラ(``handle``メソッド)を自動的に実行します。

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {
        // 追記時にここのハンドラが実施される
        console.log("item ui append ...... OK");
    }
}
```

<div id="append1"></div>

### : UI.appendメソッドで直接追記する

コアライブラリにある``UI``クラスを使って追記を実施できます。    
下記のように``UI.append``メソッドを実行するだけです。

引数には順に追記先の仮想DOM、対象UI名を指定してください。　　
これにより対象UIのレンダリングHTMLが指定の仮想DOM要素に追記されます。

戻り値には``UI``クラスかもしくは対象UIクラスが準備されている場合はそのクラスオブジェクトが返されます。  
それにより追記後にUI内の仮想DOM操作を行うことも可能です。

```typescript
import { View } from "View";
import { UI } from "UI";

export class HomeView extends View {

    public handle() {

        // ItemUI append
        for (let n = 0 ; n < 4 ; n++) {
            // 4回追記する
            const item : UI = UI.append(this.mjs.list, "item");
            // 追記後にメッセージをセット
            item.mjs.message.text = "Item Message Text " + n + " ....";
        }
    }
}
```

<div id="append2"></div>

### : UIクラスを作成して追記する

tsファイル``app/ui/ItemUI.ts``を設置して、下記コードを記述します。  
これによりItemUIクラスが準備されます。

``app/ui/ItemUI.ts``

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

     public setIndex(index: number) {
        this.mjs.messsage.text = "Item Message Text " + index + " ....";
    }
}
```

上記で設置した``ItemUI``クラスを使って直接追記を実施します。
下記のように``ItemUI.append``メソッドを実行するだけです。  
(この場合``UI``クラスのときとは違い引数名は追記先の仮想DOMのみで十分となります。)

戻り値は対象UIのクラスオブジェクトが返されます。  
それにより追記後のUI内の仮想DOM操作を行うことが任意で可能となります。

```typescript
import { View } from "View";
import { ItemUI } from "app/ui/ItemUI";

export class HomeView extends View {

    public handle() {

        // ItemUI Bind....
        for (let n = 0 ; n < 4 ; n++) {
            // 4回追記する
            const item : ItemUI = ItemUI.append(this.mjs.bind);
            // メッセージ表示用に回数をセット
            item.setIndex(n);
        }
    }
}
```

## # 仮想DOM操作

レンダリングHTMLにて指定の要素に対してテキストの表示、及び押した際のイベントハンドラの実装等を行うには  
仮想DOMを使って操作を行うのが便利です。  
UIでの仮想DOMは対象UIが表示または非表示されるごとに自動的に仮想DOMの取得作成・破棄が行われます。

仮想DOM(ModernJS)についての詳細は[こちらで解説しています](modernjs.md)。

例としてある画面にてボタンを押した時の挙動を実装した例を下記に示しています。  
まずレンダリングHTMLにてv属性(仮想DOM名)を指定したボタンのタグを設置します。

```html
<a v="testButton">Button</a>
```

あとはViewクラスのハンドラにて指定の仮想DOMを押した時のイベントハンドラを設置するだけです。  
``this.mjs``にItemUIにて取得された仮想DOMリスト(ModernJSクラス)が格納されているので   
レンダリングHTMLにて指定した仮想DOM名をチェーンで指定します。

```typescript
import { UI } from "UI";

export class ItemUI extends UI {

    public handle() {

        this.mjs.testButton.onClick = () => {
            // buttonが押されたときのイベント
            console.log("Button Click .... OK");
        };
    }
}
```

なお仮想DOMは上記``mjs``と``vdos``でも同様に記述ができます。  

```typescript
import { UI } from "UI";

export class ItemUI extends View {

    public handle() {

        this.vdos.testButton.onClick = () => {
            // buttonが押されたときのイベント
            console.log("Button Click .... OK");
        };
    }
}
```
