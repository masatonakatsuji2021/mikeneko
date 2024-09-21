# HTMLレンダリング

画面の表示用に使用するHTMLは拡張子``.html``にてプロジェクト内の``rendering``ディレクトリに設置してください。

レンダリングするタイプにより``rendering``ディレクトリからのサブディレクトリの位置が異なります。

## # 画面コンテンツ用HTML (View/Controller)

Viewクラス、及びControllerのpublicメソッド(アクション)ごとに対する
各画面のコンテンツ部分のHTMLは``rendering/view``ディレクトリ内に設置します。  

ViewとControllerのいずれかで設置場所が若干異なります。

Viewからの場合は、基本的に``rendering/view/{Viewクラス名}.html``の場所に設置します。

例えば``HomeView``クラスの場合は、``rendering/view/home.html``の場所に設置します。  

```
src
    L app
        L view
            L HomeView.ts
            ...
        ...
    L rendering
        L view
            L home.html
        ...
    ...
```

Controllerの場合はController名を挟んでpublicメソッド名の場所に設置します。  
例えば``MainController``クラスの``index``メソッドの場合は、  
``rendering/view/main/index.html``に設置します。

```
src
    L app
        L controller
            L MainController.ts
            ...
        ...
    L rendering
        L view
            L main
                L index.html
                ...
            ...
        ...
    ...
```

上記viewの設置場所とは異なり、別のviewファイルに変更することもできます。  
[詳細はこちらを参照](view.md#view)

## # テンプレート画面HTML (Template)

各画面で共通利用するテンプレート(Template)については  
``rendering/template``ディレクトリ内に設置します。  

例えばテンプレート名が``default``の場合は``rendering/template/default.html``に設置してください。

```
src
    ...
    L rendering
        L template
            L default.html
        ...
    ...
```

テンプレートの指定についてはViewまたはControllerクラス上で  
下記のようにメンバ変数``template``に使用するテンプレート名を指定します。  
(下記はViewクラスでの例ですが、Controller上でも同様です。)

```typescript
import { View } from "View";

export class HomeView extends View {

    public template : string = "default";

}
```

## # UI用HTML (UI)

UIは各画面ごとで共通で使用するHTMLタグ(HTMLの部品化)のことを指します。  
例としてはリスト表示項目セルの部分や、特殊な表示内容・入力内容などが挙げられます。

UIの設置場所は``rendering/ui``ディレクトリ内に設置してください。  
例えばリスト表示に使用する項目セルを設置する場合は  
``rendering/ui/item.html``の場所に設置します。  

設置後はそれをViewやController上から読込をして任意の場所に表示します。

UIの読込方法、または任意の場所への設置方法などは[こちらを参照](rendering.md#ui)


## # ダイアログ用HTML (Dialog)

ダイアログ表示用のHTMLタグを``rendering/dialog``ディレクトリ内に設置することができます。

ダイアログの詳細については[こちらを参照](dialog.md)