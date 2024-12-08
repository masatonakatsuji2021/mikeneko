# Background Class

Backgroundはアプリ起動直後に自動実行するための機能です。  
各画面遷移ごとにハンドラを実行するViewやControllerとは別途で実行されます。

## # AppにおけるBackgroundの指定

BackgroundはBackground派生クラスを設置しただけでは実行されません。  
Appクラス(プロジェクトソース状では``src/app/config/App.ts``)にて  Backgroundを指定する必要があります。

```typescript
// Background list
public static backgrounds: Array<string> = [
    "bg1",
    "bg2",
    "bg3",
];
```

上記のように指定した場合、``bg1``,``bg2``,``bg3``の順に実施されます。

## # Backgroundの実行ハンドラ

下記コードのように``handle``メソッドを使って事前実行するコードを記述します。

```typescript
import { Background } from "Background";

export class Bg1 extends Background {

    public handle() {

        console.log("BG1 handle .....");

    }
}
```

