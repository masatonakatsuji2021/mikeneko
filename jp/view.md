# Viewクラス

Viewクラスは、各画面表示にて前後の処理内容を設置するためのクラスです。  
主に、画面表示の前後に実行されるイベントハンドラの設定、
画面上のタグの操作(仮想DOMを使った操作)、
使用するテンプレートの設定を行います。

同じ動きをするクラスとして[Controller](controller.md)がありますが、  
違いとしては1つのControllerに対してpublicメソッドを複数設置することで、
複数画面を一度に管理することができる点があるのに対して  
Viewは1つのViewクラスに対して単一の画面しか管理することができません。

但し複数画面を1つのViewで操作できない代わりに、  
構造が単純化されているためコードの管理がしやすくなります。

## # 基本的な実装

例えば、``src/app/config/App.ts``の静的変数routesにて下記のルートがあるとした場合

```typescript
"/page1": "page1",
```

``src/app/view/Page1View.ts`` ファイルに次のコードを記述します。

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle(){

        console.log("page1 .... ok");
    }
}
```

``Page1View``は必ず``View``の派生クラスとします。

これにより「/page1」にアクセスまたはそれに該当する画面に遷移したときは、
上記のPage1Viewクラスの``handle``がメインのイベントハンドラとして実行され、　　
コンソール上に``page1 .... ok``が表示されます。

この画面にV属性が``button``のボタンを用意した場合、  
それを押すと``button click!``を表示させるには下記のように  
コード記述を変更します。

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle(){

        this.mjs.button.onClick = () => {
            alert("button click!");
        };
    }
}
```

このようにして各画面ごとに指定されているViewファイルを作成し、  
それらの画面表示時の挙動を記述していきます。

## # Viewのライフサイクル

基本的にViewのメインのイベントハンドラは``handle``ですが、  
それ以外のViewのライフサイクルは下記のとおりです。

````
{ 指定Viewへのルーティングが確定した場合 }
        |
View.handleBefore を実行
        |
View.handleAfter を実行
        |
{ レンダリング実行により画面切替 }
        |
        |
        |       templateが指定/変更された場合
        |----------------------------------- View.handleTemplateChanged を実行
        |
        |
        |       headが指定/変更された場合
        |----------------------------------- View.handleHeadChanged を実行
        |
        |
        |       headerが指定/変更された場合
        |----------------------------------- View.handleHeaderChanged を実行
        |
        |
        |       footerが指定/変更された場合
        |----------------------------------- View.handleFooterChanged を実行
        |
        |
        |
View.handleRenderBefore を実行
        |
View.handle を実行
        |
View.handleRenderAfter を実行
        |
     ........
        |
{ 他のViewまたはControllerに移動が確定した場合 }
        |
View.handleLeave を実行
````

各イベントハンドラの解説を下記に示します。

### - handleBefore / handleAfter イベント

指定Viewへのルーティングが確定した場合に一番最初に実行されるイベントハンドラです。  
この時点では画面切替がまだ行われていないので動的なテキスト挿入などの仮想DOM操作などには注意が必要です。

```typescript
import { View } from "View";

export class Page1View extends View {

    public handle() {
        console.log("handle .... OK");
    }

    public handleBefore(){
        console.log("handle Before ..... OK");
    }
}
```

### - handleTemplateChanged イベント

public変数``template``にて、指定テンプレート名が変更された場合にのみ実行されるイベントハンドラです。  
使用方法については[こちらで解説しています。](template.md#handleTemplateChanged);


引数にテンプレート内のUIクラスオブジェクトが渡されるため、  
下記のように仮想VOMを直接操作することも可能です。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }

    public handleTemplateChanged(template : UI) {
        template.mjs.title.text = "Page Title Text...";
    }
}
```

### - handleHeadChanged イベント

public変数``head``にて、指定head名(実際はheadタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  
(headについては[こちらで解説](#head))

引数にheadタグのUIクラスオブジェクトが渡されるため、  
下記のようにheadタグ内の仮想VOMを直接操作することも可能です。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }

    public handleHeadChanged(head : UI) {
        head.mjs.title.text = "Page Title Text...";
    }
}
```

### - handleHeaderChanged イベント

public変数``header``にて、指定header名(実際はheaderタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  
(headerについては[こちらで解説](#header))

引数にheaderタグのUIクラスオブジェクトが渡されるため、  
下記のようにheaderタグ内の仮想VOMを直接操作することも可能です。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }

    public handleHeaderChanged(header : UI) {
        header.mjs.title.text = "Page Title Text...";
    }
}
```

### - handleFooterChanged イベント

public変数``footer``にて、指定footer名(実際はfooterタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  
(footerについては[こちらで解説](#footer))

引数にfooterタグのUIクラスオブジェクトが渡されるため、  
下記のようにfooterタグ内の仮想VOMを直接操作することも可能です。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }

    public handlefooterChanged(footer : UI) {
        footer.mjs.title.text = "Page Title Text...";
    }
}
```

### - handleRenderBefore イベント

画面切替が完了した直後に実行されるイベントハンドラです。  

``handle``とライフサイクルとしての位置は同じですが  
こちらは複数のViewで継承元としている共通Viewにて  
共通実行させたい内容がある場合にのみ使用してください。

### - handle イベント

画面切替が完了した直後に実行されるイベントハンドラです。  
これがメインのイベントハンドラとなるため、迷いがない場合はこちらを優先的に使用します。

### - handleRenderAfter イベント

画面切替が完了し、かつ``handle``イベントも終了後に実行されるイベントハンドラです。  

### - handleLeave イベント

他のViewまたはControllerに画面移動が確定した直後に実行されるイベントハンドラです。

特定の処理を画面表示中にのみ実施して、それを破棄・または終了させる場合は  
このイベントハンドラ上で指定してください。

例えば下記のように一定時間間隔でカウントアップしている処理などは、  
このイベント上で停止させる必要があります。

```typescript
import { VIew } from "View";

export class Page1View extends View {

    private interval;

    public handle() {

        // 定期実行を開始
        this.interval = setInterval(()=>{
            console.log("interval .... !");
        }, 1000);

    }

    // 画面から離れる場合
    public handleLeave() {
        // 定期実行を停止
        clearInterval(this.interval);
    }

}
```

## # 仮想DOM操作

```html
<a v="button">Button</a>
```

```typescript
import { VIew } from "View";

export class Page1View extends View {

    public handle() {

        this.mjs.button.onClick = () => {
            // buttonが押されたときのイベント
            console.log("Button Click .... OK");
        };
    }
}
```
    
## # sendData: any;
 
## # beginStatus : boolean = false;
    
## # view : string = null;

     setView(value : string)  : void{
        this.view = value;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }

<div id="template"></div>

## # テンプレートの指定

Viewでは各画面で共通で使用する使用するテンプレートを指定することができます。  
public変数``template``にて使用するテンプレート名を指定します。

```typescript
import { View } from "View";

export class Page1View extends View {

    public template : string = "default";

    public handle() {
        console.log("handle .... OK");
    }
}
```

テンプレートを使用しない場合は``null``を記述してください。

```typescript
import { View } from "View";

export class Page1View extends View {

    public template : string = null;

    public handle() {
        console.log("handle .... OK");
    }
}
```

テンプレートについては[こちらで詳しく解説しています](template.md)

<div id="head"></div>

## # head : string;

Viewではheadタグ内に挿入するUIを指定することができます。  
UIについては[こちらで解説。](ui.md)

まず挿入するheadタグHTMLを``src/app/ui/head.html``に下記内容で準備します。

```html
<meta charset="utf-8">
<title v-child="title"></title>
```

public変数``head``にてheadタグに挿入するUIを指定します。  
(上記の場合は``head``で指定。)

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }
}
```

headタグに何もUIを使用しない場合は``null``を記述してください。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = null;

    public handle() {
        console.log("handle .... OK");
    }
}
```

``handleHeadChanged``メソッドを使用することで、headタグ内が変更された際に実行されるイベントハンドラを指定できます。  
引数にheadタグのUIクラスオブジェクトが渡されるため、  
例えば下記のように仮想VOMを使ってtitleタグの内容を変更することもできます。

```typescript
import { View } from "View";

export class Page1View extends View {

    public head : string = "head";

    public handle() {
        console.log("handle .... OK");
    }

    public handleHeadChanged(head : UI) {
        head.mjs.title.text = "Page Title Text...";
    }
}
```

## # header : string;

Viewではheaerdタグ内に挿入するUIを指定することができます。  
UIについては[こちらで解説。](ui.md)

public変数``header``にてheadタグに挿入するUIを指定します。  

```typescript
import { View } from "View";

export class Page1View extends View {

    public header : string = "header";

    public handle() {
        console.log("handle .... OK");
    }
}
```


headerタグに何もUIを使用しない場合は``null``を記述してください。

```typescript
import { View } from "View";

export class Page1View extends View {

    public header : string = null;

    public handle() {
        console.log("handle .... OK");
    }
}
```

## # footer : string;

    public setFooter(footerName : string) {
        this.header = footerName;
        const routes = Routes.getRoute();
        Response.__rendering(routes, this);
    }
