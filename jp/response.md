# Response

Responseは、主に画面遷移の操作等を行うためのクラスです。  
基本的にResponseはすべて静的メソッドのため  
``View``や``UI``とは異なり、派生クラスを作成することはありません。

よって使用するにはimpoertを行った後、直接静的メソッドを使用する形となります。

```typescript
import { View } from "View";
import { Response } from "Response";

export class HomeView extends View {

    public handle() {

        this.vdios.link1.onClick = () => {
            // link1 のボタンを押したときに、別画面(/page1)に移動
            Response.next("/page1");
        };
    }
}
```

## # 指定画面に移動

指定の画面に移動(画面遷移)するには``Response.next``メソッドを使用します。  
引数にルーティングにて設置したルーティングパスを指定してください。
[ルーティングについてはこちらを参照](app.md#routes)

```typescript
Response.next("/subpage");
```

画面移動後は画面遷移の履歴が追加されるため、  
``Response.back``等を使って前画面に戻ることもできます。

## # 指定画面に切替

指定の画面に切り替える場合は``Response.replace``メソッドを使用します。  
引数にルーティングにて設置したルーティングパスを指定してください。
[ルーティングについてはこちらを参照](app.md#routes)

```typescript
Response.replace("/subpage");
```

``Response.next``に似ているようですが、  
現画面の履歴が切り替え後のものに置き換わるだけとなるため   
画面移動後は画面遷移の履歴は追加されます。

よって``Response.back``等を使って前画面に戻った場合は切替魔の画面より前の画面に戻ることとなります。

## # 前画面に戻る

前画面に戻る場合は``Response.back``メソッドを使用します。  
(引数は不要です。)

```typescript
Response.back();
```

画面遷移の履歴がある場合はその履歴に基づいて前画面に戻ります。  
この場合戻り値として@``true``を返します
前画面の履歴が存在しない場合は、何も動作は起こりませんが  
戻り値として``false``を返してそれを判定することも可能。

## # 画面遷移のロック

画面遷移のロックは``Response.lock``を使用します。  
``true``の場合は画面遷移の実行(``Response.next``や``Response.back``等)は一切行えなくなります。

```typescript
Response.lock = true;
```

画面遷移のロックを解除するには``false``を必ず指定してください。  

```typescript
Response.lock = false;
```

## # 画面遷移履歴の追加

``Response.addHistory``を使うと画面遷移の履歴を``Response.next``を使用せずに追加できます。  
このメソッドを使用すると実際には画面移動は行われず、履歴のみが追加されます。

```typescript
Response.addHistory("/subpage2");
```

## # 現画面の履歴のみをクリア

現在表示している画面の履歴をクリアにするには``Response.pop``メソッドを使用します。

```typescript
Response.pop();
```

## # 画面遷移履歴をクリア

画面遷移の履歴をすべてクリアにするには``Response.historyClear``メソッドを使用します。

```typescript
Response.historyClear();
```

## # 画面遷移状態の取得

画面遷移の状態を取得することもできます。  

<div id="isback"></div>

### : 前画面からの戻りかどうかの判定

前画面から戻ってきた場合は``isBack``にて判定ができます。  
戻ってきている場合は``true``、それ以外は``false``となります。

```typescript
console.log(Response.isBack);
```

<div id="isnext"></div>

### : 前画面からの進みかどうかの判定

前画面から進んでいる場合は``isBack``にて判定ができます。  
進んでいる場合は``true``、それ以外は``false``となります。

```typescript
console.log(Response.isNext);
```

## # 現画面のルーティングパスの取得

現画面のルーティングパスの取得は``Response.now``を使用して取得できます。

```typescript
console.log(Response.now());
```

## # 現画面のViewクラスオブジェクトの取得

現画面のViewクラスオブジェクトは``Response.nowView``を使用して取得できます。

```typescript
console.log(Response.nowView);
```

## # 現画面のControllerクラスオブジェクトの取得

現画面のControllerクラスオブジェクトは``Response.nowView``を使用して取得できます。

```typescript
console.log(Response.nowController);
```