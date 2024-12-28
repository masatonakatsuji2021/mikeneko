# Libクラス

Libは基本的な機能を使用するためのクラスです。  
base64形式のエンコード/デコードや、画像などのリソースデータの取得などを行うメソッドを  
あらかじめ用意しています。

```typescript
import { View } from "View";
import { Lib } from "Lib";

export class HomeView extends View {

    public async handle() {

        // 2秒間だけ停止
        await Lib.sleep(200);

        console.log("....OK"9;)
    }
}
```

## # リソースデータの存在可否

指定のリソースデータのパスが存在しているかを確認します。  
戻り値はboolean型で、存在している場合は``true``を返します。

```typescript
const exists = Lib.existResource("img/sample.png);
```

## # リソースデータの取得

指定パスのリソースデータを取得します。  
戻り値はbase64形式で返されます。

```typescript
const res = Lib.getResource("img/sample.png");
```

## # リソースデータの取得 (DataURI形式で取得)

指定パスのリソースデータをDataURI形式で取得します。  
戻り値はbDataURI形式で返されます。

```typescript
const res = Lib.getResourceDataUrl("img/sample.png");
```

## # リソースデータのMimeTypeを取得

指定パスのリソースデータのMimeTypeを取得します。

```typescript
const mimeType = Lib.getResourceMimeType("img/sample.png");
```

## # モジュールパスの取得

```typescript
const modulePath = Lib.getModulePath("app/view/HomeView");
```

## # レンダリングHTML用モジュールパスの取得

```typescript
const modulePath = Lib.getRenderingPath("DefaultTemplate", "Template");
```

## # モジュール名の取得

```typescript
const moduleName = Lib.getModuleName("app/view/HomeView");
```

## # Base64形式へエンコード

指定の文字列をBase64形式データにエンコードします。

```typescript
const resBase64 = Lib.base64Encode("ABCDEFG");     // <= QUJDREVGRw== に変換
```

## # Base64形式からデコード

指定のBase64形式データを文字列にデコードします。

```typescript
const resBase64 = Lib.base64Decode("QUJDREVGRw==");     // <= ABCDEFGに変換
```

## # 識別子の作成

一意の識別子を作成します。  
識別子は0～9およびA～Z(大文字・小文字含む)のランダムな文字で形成されます。

引数を指定しない場合は、デフォルトで64文字で作成されます。

```typescript
const id = Lib.uniqId();
```

引数で文字数を変更できます。  

```typescript
const id = Lib.uniqId(128);    // <= 128文字で識別子を作成
```

## # 値渡しで値を設定

オブジェクトデータまたはクラスインスタンスされた変数を  
参照渡しではなく値渡しとして他の変数などに渡す場合は  
``passByValue``メソッドを使用します。

主に値が変更された際に元の値に影響しない形にする際に使用します。

```typescript
const afterData = Lib.passByValue(beforeData);
```

## # 処理の一定時間停止

処理を一定時間だけ停止させる際に使用します。
このメソッドを使用する場所ですでにasyncであることが条件となります。

```typescript
await Lib.sleep(1000);      // 1秒間だけ停止
```

## # 日時の取得

``datetime``は日時を取得すときに使用します。  
引数を指定しない場合は現在日時が適用されます。

```typescript
console.log(Lib.datetime().format("YYYY/MM/DD HH:II:SS"));     // <= 2024/12/15 00:00:00 で出力
```

引数にて日時を任意で指定することも可能

```typescript
console.log(Lib.datetime("2019-01-25 18:19:19").format("YYYY/MM/DD HH:II:SS"));     // <= 2024/12/15 00:00:00 で出力
```

日付だけを取得する場合は下記。

```typescript
console.log(Lib.datetime().format("YYYY/MM/DDD"));
```

``getYear``メソッドでも指定可能。

```typescript
console.log(Lib.datetime().getYear());
```

## # 外部スクリプトの値を取得

```javascript
const evalRes = {
    name: "evalRes",
    description: "description text sample ....",
};
```

```typescript
const res = Lib.importResourceScript("js/sample.js");   // sample.js の evalResを取得
```