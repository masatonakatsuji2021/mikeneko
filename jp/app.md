# Appクラス

App クラスは、プロジェクトの初期設定クラスです。  
各画面のルーティング設定などを指定します。

App クラスは、プロジェクト内の``src/app/config/App.ts`` に下記のコードで記述します。  
(クラス名は必ず``MyApp``にしてください)

```typescript
import { App, Routes, AppRouteType } from "App";

export class MyApp extends App {

    // Application Name
    public static appName : string = "Mikeneko App";

    // Route Type
    public static routeType : AppRouteType = AppRouteType.application;
    
    // Routing
    public static routes : Routes = {
        "/" : "c:main, a:index",
        "/page1" : "c:main, a:page1",
        "/page2/{id}" : "c:main, a:page2",
        "/page3/{id1}/{id2?" : "c:main, a:page3",
        "/page4/{?id}" : "c:main, a:page4",
        "/view_test" : "viewTest",
    };

    // Background list
    public static backgrounds: Array<string> = [
        "Background",
    ];
}
```

## # appName

アプリの名称を指定できます。

```typescript
public static appName : string = "Mikeneko App";
```

## # routeType

画面遷移の方式を指定します。  

列挙型である``AppRouteType``で指定することができます。  
実際に指定できる方式は下記のとおりです。

 -  **web** : Webブラウザなどを使った閲覧が可能な方式。　
実際にURLでアクセスしてルーティングの通りの画面に移動できます。     
ブラウザの戻るボタンを押すと戻ることができます。    
 * **application*** : 主にスマホアプリやデスクトップアプリなどに使用する方式。  
このモードでは、画面操作の履歴が内部に保存されるため、ブラウザの戻るボタンを押すことはできません。  
前の画面に戻るには、ボタン イベントを追加して``Response.back``メソッドなどを使用して前の画面に戻る必要があります。  

```typescript
public static routeType : AppRouteType = AppRouteType.web;
```

## # routes

ルーティング設定用です。  
画面遷移時の各パス、遷移先のView  
またはControllerとアクション名(publicメソッド名)を指定します。

ルーティング設定の詳細については、[こちら](routes.md)を参照してください。

```typescript
// Routing
public static routes : Routes = {
    "/" : "c:main, a:index",
    "/page1" : "c:main, a:page1",
    "/page2/{id}" : "c:main, a:page2",
    "/page3/{id1}/{id2?" : "c:main, a:page3",
    "/page4/{?id}" : "c:main, a:page4",
    "/view_test" : "viewTest",
};
```
## # backgrounds

実行するBackgroundクラスのリストをここに列挙します。  
実行はリストに指定された順序で開始されます。

Background クラスの概要については、[こちら](background.md) を参照してください。

```typescript
public static backgrounds: Array<string> = [
    "Background",
];
```

## # sessionStorage

Storageクラスで使用するsessionStorageの識別子を指定できます。  
SessionStorageの概要については、[こちら](storage.md#session) を参照してください。

```typescript
public static sessionStorage : string = "mike_ss";
```

## # localStorage

Storageクラスで使用するlocalStorageの識別子を指定できます。  
localStorageの概要については、[こちら](storage.md#local) を参照してください。

```typescript
public static localStorage : string = "mike_local";
```

## # 画面遷移時の遅延時間(delay)

別画面に遷移するときに一時的に遅延させたい場合は、  
この変数を設定します。 

単位はミリ秒で指定します。  
(デフォルトは 100 ミリ秒です。)

```typescript
public static delay : number = 100;
```

## # Not Found View

繊維後に遷移先のViewまたはルーティングが指定されておらず、  
専用の画面を表示させたい場合は、  
ここで表示する View クラス名を指定します。

```typescript
public static notFoundView : string = "NotFoundPage";
```

View名を指定後の、ViewクラスやHTMLの設置については[Viewクラス](view.md) を参照。

## # beginURL 

アプリの起動時に表示するURL(ルーティング)を指定できます。  
URLを指定しない場合は、ルーティング内の「/」で指定されたViewまたはController画面が表示されます。

```typescript
public static beginURL : string = "/home";
```

## # Animation Class Name

画面遷移の前後にarticleタグにクラス属性を追加する場合は、  
``animationOpenClassName`` または ``animationCloseClassName`` を使用します。

これを使うと、画面切替時にCSSを使ってアニメーション操作をさせることができます。

```typescript
// open class attribute
public static animationOpenClassName : string = "open";

// close class attribute
public static animationCloseClassName : string = "close";
```

