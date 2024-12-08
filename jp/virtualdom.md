# VirtualDomクラス (仮想DOM)

## # 仮想DOMの設定方法

```html
<div>
    <div v="title"></div>
</div>
```

```typescript
import { View } from "View";

export class HomeView extends View {

    public handle() {

        this.vdios.title.text = "Title Text Sample .....";
    }
}
```

### : 仮想DOMの子要素設定

```html
<div>
    <div v="text.area1"></div>
    <div v="text.area2"></div>
</div>
```

```typescript
// text.area1 へのテキスト指定
this.vdios.text.childs.area1.text = "Area1 Text ....";

// text.area2 へのテキスト指定
this.vdios.text.childs.area2.text = "Area2 Text ....";
```

## # 仮想DOMの指定要素の操作方法

### : 対象の要素の件数を取得

```html
<div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
</div>
```

```typescript
const length : number = this.vdios.item.length;
```


### : 一番最初の要素を操作

```typescript
this.vdios.item.first.text = "First Item";
```

```html
<div>
    <div v="item">First Item</div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
</div>
```

### : 一番最後の要素を操作

```typescript
this.vdios.item.last.text = "Last Item";
```

```html
<div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item">Last Item</div>
</div>
```

### : 指定インデックスの要素を操作

```typescript
// 2番目の要素にテキスト設定
this.vdios.item.index(2).text = "Index Item (2)";
```

```html
<div>
    <div v="item"></div>
    <div v="item"></div>
    <div v="item">Index Item (3)</div>
    <div v="item"></div>
    <div v="item"></div>
</div>
```

### : 1つ前の要素を操作

```typescript
this.vdios.now.prev.text = "Prev Text ....";
```

```html
<div>
    <div>Prev Text ....</div>
    <div v="now"></div>
</div>
```

### : 1つ先の要素を操作

```typescript
this.vdios.now.next.text = "Next Text ....";
```

```html
<div>
    <div v="now"></div>
    <div>Next Text ....</div>
</div>
```

### : 親の要素を操作

```typescript
this.vdios.now.parent.append("Parent Text ....");
```

```html
<div>
    <div v="now"></div>
    Parent Text ....
</div>
```

### : 一番最後の要素を操作

```typescript
this.vdios.item.last.text = "First Item";
```

## # テキストの設定・取得

### : テキストの設定

```html
<div>
    <div v="title"></div>
</div>
```

```typescript
this.vdios.title.text = "Title Text Sample .....";
```

テキストは複数の要素を配置しても対応が可能

```html
<div>
    <div v="title"></div>
    <div v="title"></div>
    <div v="title"></div>
    <div v="title"></div>
    <div v="title"></div>
</div>
```

```typescript
this.vdios.title.text = "Title Text Sample .....";
```

### : テキストの取得

```html
<div>
    <div v="title">Text Sample ..... OK</div>
</div>
```

```typescript
console.log(this.vdios.title.text);   // <= "Text Sample ..... OK"を出力
```

## # HTMLタグの設定/取得

### : HTMLタグの設定

```html
<div>
    <div v="htmlContent"></div>
</div>
```

```typescript
this.vdios.htmlContent.html = "<h2>HTML Content .....</h2>";
```

テキストは複数の要素を配置しても対応が可能

```html
<div>
    <div v="htmlContent"></div>
    <div v="htmlContent"></div>
    <div v="htmlContent"></div>
    <div v="htmlContent"></div>
    <div v="htmlContent"></div>
</div>
```

```typescript
this.vdios.htmlContent.html = "<h2>HTML Content .....</h2>";
```

### : HTMLタグの取得

```html
<div>
    <div v="htmlContent"><h2>HTML Content ......</h2></div>
</div>
```

```typescript
console.log(this.vdios.htmlContent.html);   // <= "<h2>HTML Content ......</h2>"を出力
```

## # OuterHTMLタグの取得

```typescript
const outerHtml : string = this.vdios.htmlContent.outerHtml;
```

## # 仮想DOM内の要素取得 (querySelector)

```html
<div v="target">
    <div></div>
    <div></div>
    <div></div>
    <div class="subclass"></div>
</div>
```

```typescript
const subClass : VirtualDom = this.vdios.target.querySelector(".subclass");
subClass.text = "SubClass Text";
```

## # 仮想DOMへのHTMLタグ追記 (afterBegin)

```html
<div v="list"></div>
```

```typescript
this.vdios.list.afterBegin("<div>After Begin1...</div>");
this.vdios.list.afterBegin("<div>After Begin2...</div>");
this.vdios.list.afterBegin("<div>After Begin3...</div>");
```

```html
<div v="list">
    <div>AFter Begin3...</div>
    <div>AFter Begin2...</div>
    <div>AFter Begin1...</div>
</div>
```

## # 仮想DOMへのHTMLタグ追記 (append)

```html
<div v="list"></div>
```

```typescript
this.vdios.list.append("<div>Append1...</div>");
this.vdios.list.append("<div>Append2...</div>");
this.vdios.list.append("<div>Append3...</div>");
```

```html
<div v="list">
    <div>Append1...</div>
    <div>Append2...</div>
    <div>Append3...</div>
</div>
```

## # 仮想DOMの削除 (remove)

```html
<div v="delTarget">Delete Target...</div>
```

```typescript
this.vdios.delTarget.remove();
```

## # スタイルシートの設定

```html
<div v="target">Style Sheet Test.</div>
```

```typescript
this.vdios.target.style({ color: "red" });
```

```html
<div v="target" style="color:red">Style Sheet Test.</div>
```

## # スタイルシートのセレクター値取得

```html
<div v="target" style="color:red">Style Sheet Test.</div>
```

```typescript
console.log(this.vdios.target.getStyle("color")); // <= redを出力
```

## # 属性値の設定/取得

### : 属性値の設定

```html
<div v="target"></div>
```

```typescript
this.vdios.target.attr("data-id", "sample-data");
```

```html
<div v="target" data-id="sample-data"></div>
```

### : 属性値の取得

```html
<div v="target" data-id="sample-data"></div>
```

```typescript
console.log(this.vdios.target.attr("data-id"));      // <= "data-id" を出力
```

## # 属性値の存在可否

```html
<div v="target" data-id="sample-data"></div>
```

```typescript
console.log(this.vdios.target.isAttr("data-id"));      // <= 存在している場合は true を出力
```

## # 属性値の削除

```html
<div v="target" data-id="sample-data"></div>
```

```typescript
this.vdios.target.removeAttr("data-id");
```

```html
<div v="target"></div>
```

## # src値の設定/取得

### : src値の設定

```html
<img v="image">
```

```typescript
this.vdios.target.src = "img/sample.png";
```

```html
<img v="image" src="img/sample.png">
```

### : src値の取得

```typescript
console.log(this.vdios.target.src);
```

## # placeHolderの設定/取得

### : placeHolderの設定

```html
<input type="text">
```

```typescript
this.vdios.target.placeHolder = "placeHolder text";
```

```html
<input type="text" placeholder="placeHolder text">
```

### : placeHolderの取得

```typescript
console.log(this.vdios.target.placeholder);
```

## # hrefの設定/取得

### : hrefの設定

```html
<link rel="stylesheet" v="target">
```

```typescript
this.vdios.target.href = "style.css";
```

```html
<link rel="stylesheet" v="target" href="style.css">
```

### : hrefの取得

```typescript
console.log(this.vdios.target.href);
```

## # idの設定/取得

### : idの設定

```html
<div v="target"></div>
```

```typescript
this.vdios.target.id = "id1";
```

```html
<div v="target" id="id1"></div>
```

### : idの取得

```typescript
console.log(this.vdios.target.id);
```

## # nameの設定/取得

### : nameの設定

```html
<div v="target"></div>
```

```typescript
this.vdios.target.name = "name1";
```

```html
<div v="target" name="name1"></div>
```

### : nameの取得

```typescript
console.log(this.vdios.target.name);
```

## # 要素の表示/非表示の切替操作

```html
<div v="target"></div>
```

```typescript
// 要素を表示
this.vdios.target.display = true;     

// 要素を非表示
this.vdios.target.display = false;
```

## # class属性の存在可否

```html
<div v="target" class="class1"></div>
```

```typescript
console.log(this.vdios.target.isClass("class1"));          // <= 存在する場合は true を出力
```

## # class属性の追加

```html
<div v="target" class="class1"></div>
```

```typescript
this.vdios.target.addClass("open");
```

```html
<div v="target" class="class1 open"></div>
```

## # class属性の削除


```html
<div v="target" class="class1 open"></div>
```

```typescript
this.vdios.target.removeClass("open");
```

```html
<div v="target" class="class1"></div>
```

## # 仮想DOMのデータ受渡

### : データの設定

```html
<div v="target"></div>
```

```typescript
this.vdios.target.data("value", 123);
```

### : データの取得

```typescript
console.log(this.vdios.target.data("value"));
```

## # 仮想DOMのデータ削除

```typescript
this.vdios.target.removeData("value");
```

## # イベントハンドラの設定

```html
<button v="btn"></button>
```

```typescript
this.vdios.btn.on("click", () => {
    console.log("Button Click....");
});
```

### : ハンドラの引数

```typescript
this.vdios.btn.on("click", (e : Event) => {
    console.log(e);
});
```

```typescript
this.vdios.btn.data("value", 2345);

this.vdios.btn.on("click", (_, my: VirtualDom) => {
    console.log(my.data("value"));      // <= 2345 を出力
});
```

## # イベントハンドラの省略形記述

### : クリック時 (onClick)

```html
<button v="btn">Click Button!</button>
```

```typescript
this.vdios.btn.onClick = (_, my : VirtualDom) => {
    console.log(my.text);
};
```

### : ダブルクリック時 (onDblClick)

```html
<button v="btn">Double Click Button!</button>
```

```typescript
this.vdios.btn.onDblClick = (_, my : VirtualDom) => {
    console.log(my.text);
};
```

### : フォーカス移動時 (onFocus)

```html
<input v="input">
```

```typescript
this.vdios.input.onFocus = (_, my : VirtualDom) => {
    console.log(my.value);
};
```

### : 入力値/選択肢変更時 (onChange)

```html
<input v="input">
```

```typescript
this.vdios.input.onChange = (_, my : VirtualDom) => {
    console.log(my.value);
};
```

### : マウスボタンクリック直後 (onMouseDown)

```html
<div v="target">Mouse Down...</div>
```

```typescript
this.vdios.target.onMouseDown = (_, my : VirtualDom) => {
    console.log(my.text);
};
```

### : マウスボタンクリック直後 (onMouseUp)

```html
<div v="target">Mouse Up...</div>
```

```typescript
this.vdios.target.onMouseUp = (_, my : VirtualDom) => {
    console.log(my.text);
};
```

### : マウス移動時 (onMouseMove)

```html
<div v="target">Mouse Move...</div>
```

```typescript
this.vdios.target.onMouseMove = (_, my : VirtualDom) => {
    console.log(my.text);
};
```

## # イベントの実行

```html
<button v="btn">Button</button>
```

```typescript
this.vdios.btn.onClick = () => {
    console.log("Button Click!");
};

this.vdios.btn.dispatch("click");
```

## # 入力値/選択値の設定

### : テキストボックス/テキストエリアの場合

```html
<input type="text" v="input1">
```

```typescript
this.vdios.input.value = "Input Text...">
```

### : プルダウンメニューの場合

```html
<select v="select">
    <option value="0">Select 0</option>
    <option value="1">Select 1</option>
    <option value="2">Select 2</option>
    <option value="3">Select 3</option>
</select>
```

```typescript
this.vdios.select.value = 1;
```

### : ラジオボタンの設定

```html
<label>
    <input type="radio" name="_" v="radio" value="0"> Radio 0
</label>
<label>
    <input type="radio" name="_" v="radio" value="1"> Radio 1
</label>
<label>
    <input type="radio" name="_" v="radio" value="2"> Radio 2
</label>
<label>
    <input type="radio" name="_" v="radio" value="3"> Radio 3
</label>
```

```typescript
this.vdios.radio.value = 1;
```

### : チェックボックス(単一)の場合

```html
<label>
    <input type="checkbox" name="_" v="agree"> I Agree
</label>
```

```typescript
this.vdios.agree.checked = true;
```

### : チェックボックス(複数)の場合

```html
<label>
    <input type="checkbox" name="_" v="checkbox" value="0"> Checkbox 0
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="1"> Checkbox 1
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="2"> Checkbox 2
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="3"> Checkbox 3
</label>
```

```typescript
this.vdios.checkbox.value = [ 1, 3 ];
```

## # 入力値/選択値の取得

```html
<input type="text" v="input1">
```

```typescript
conosle.log(this.vdios.input.value);
```

### : チェックボックス(単体)の場合

```html
<label>
    <input type="checkbox" name="_" v="agree"> I Agree
</label>
```

```typescript
conosle.log(this.vdios.agree.checked);
```

### : チェックボックス(複数)の場合

```html
<label>
    <input type="checkbox" name="_" v="checkbox" value="0"> Checkbox 0
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="1"> Checkbox 1
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="2"> Checkbox 2
</label>
<label>
    <input type="checkbox" name="_" v="checkbox" value="3"> Checkbox 3
</label>
```

```typescript
console.log(this.vdios.checkbox.value);
```

## # 入力値/選択値のクリア

```html
<input type="text" v="input1">
```

```typescript
this.vdios.input.reset();
```

## # (selectタグ) 項目選択肢の設定

```html
<select v="select"></select>
```

```typescript
this.vdios.select.selectAddParam({
    0: "Select 0",
    1: "Select 1",
    2: "Select 2",
    3: "Select 3",
    4: "Select 4",
});
```

## # (selectタグ) 項目選択肢のリセット

```typescript
this.vdios.select.selectResetParam();
```

## # (selectタグ) 未選択項目のセット

```typescript
this.vdios.select.selectEmpty("---- Select ----");
```

## # (selectタグ) 選択テキストの取得

```typescript
console.log(this.vdios.select.selectedText());
```
