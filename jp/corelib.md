# コアライブラリクラス

Mikenekoにはプリセットされたコアライブラリクラスが存在します。  
コアライブラリクラスは、画面表示や仮想DOM操作、検証チェック用等の必要な機能を網羅した基本クラスのことです。

このコアライブラリクラスを静的クラスメソッドとして直接使用、
または継承元として派生クラスを作成する際に使用します。

コアライブラリクラスを使用するには下記``import``を使って使用するクラスを予め定義します。  
(下記はViewクラスを継承元としたMainViewクラスを作成する例)

```typescript
import { View } from "View";

export class MainView extends View {

    public handle() {

        console.log("Main View .... OK!");
    }
}
```

Mikenekoで用意されているコアライブラリクラスは下記一覧に示しています。

|クラス名|概要|
|:--|:--|
|[Ajax](ajax.md)|Ajaxによる外部リクエスト送受信を行うためのクラス|
|[App](app.md)|アプリの初期設定用クラス|
|[Background](background.md)|アプリ起動直後に自動実行用のクラス|
|[Controller](controller.md)|画面表示用クラス<br>1つのControllerを使って複数画面を操作・管理できる|
|[Data](data.md)|アプリ内データ共有用クラス|
|[Dialog](datdialoga.md)|ダイアログ表示用クラス|
|[KeyEvent](keyevent.md)|キー入力イベント用クラス|
|[VirtualDom](virtualdom.md)|仮想DOM制御用クラス|
|[Response](response)|画面遷移操作用クラス|
|[Routes](routes.md)|ルーティング用クラス|
|[Shortcode](shortcode.md)|ショートコード管理用クラス|
|[Storage](storage.md)|ストレージ(localStorage/SessionStorage)管理用クラス|
|[Template](template.md)|Template用クラス|
|[View](view.md)|画面表示用クラス|
|[UI](ui.md)|UIクラス<br>共通で使用するHTMタグを部品化して共通使用するためのもの|
|[Validation](validation.md)|入力データ等の検証チェック用クラス|

これ以外にも独自で設置が必要なタイプのクラスが発生した場合は任意に設置しても構いません。  
(例えば``Service``クラスや``Model```クラスなど)

設置場所は``src/app``ディレクトリ内に設置してください。  
それ以外の場所に設置した場合は、  
ビルド時にスクリプトファイルとして認識されないため、  
ビルドファイルに内包されません。