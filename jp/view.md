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

### - handleTemplateChanged イベント

public変数``template``にて、指定テンプレート名が変更された場合にのみ実行されるイベントハンドラです。  


### - handleHeadChanged イベント

public変数``head``にて、指定head名(実際はheadタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  


### - handleHeaderChanged イベント

public変数``header``にて、指定header名(実際はheaderタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  

### - handleFooterChanged イベント

public変数``footer``にて、指定footer名(実際はfooterタグに使用するUI)が変更された場合にのみ実行されるイベントハンドラです。  

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

