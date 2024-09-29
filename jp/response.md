# Responseクラス

```typescript
import { Response } from "Response";
```

## # 画面遷移のロック

```typescript
Response.lock = true;
```

```typescript
Response.lock = false;
```

## # 指定画面に移動

```typescript
Response.next("/subpage");
```

## # 前画面に戻る

```typescript
Response.back();
```

## # 画面遷移履歴の追加

```typescript
Response.addHistory("/subpage2");
```

## # 現画面の履歴のみをクリア

```typescript
Response.pop();
```

## # 画面遷移履歴をクリア

```typescript
Response.historyClear();
```

## # 画面遷移状態の取得

### : 前画面からの戻りかどうかの判定

```typescript
console.log(Response.isBack);
```

### : 前画面からの進みかどうかの判定

```typescript
console.log(Response.isNext);
```

## # 現画面のルーティングパスの取得

```typescript
console.log(Response.now());
```

## # 現画面のViewクラスオブジェクトの取得

```typescript
console.log(Response.nowView);
```

## # 現画面のControllerクラスオブジェクトの取得

```typescript
console.log(Response.nowController);
```

## # 指定ViewのHTML取得

``src/rendering/view/test1.html``

```html
<div>Test1 View...</div>
```

```typescript
console.log(Response.view("test1"));
```

## # 指定Viewのバインド

```html
<div v="bind"></div>
```

``src/rendering/view/test1.html``

```html
<div>Test1 View...</div>
```

```typescript
Response.bindView(this.mjs.bind, "test1");
```

## # 指定TemplateのHTML取得

``src/rendering/template/temp1.html``

```html
<div>Temp1 Text...</div>
```

```typescript
console.log(Response.template("temp1"));
```

## # 指定Templateのバインド


```html
<div v="bind"></div>
```

``src/rendering/template/temp1.html``

```html
<div>Temp1 View...</div>
```

```typescript
Response.bindTemplate(this.mjs.bind, "temp1");
```

## # 指定UIのHTML取得

``src/rendering/ui/ui1.html``

```html
<div>UI1 Text...</div>
```

```typescript
console.log(Response.UI("ui1"));
```

## # 指定UIのバインド

```html
<div v="bind"></div>
```

``src/rendering/ui/ui1.html``

```html
<div>UI1 Text...</div>
```

```typescript
Response.bindUI(this.mjs.bind, "ui1");
```

## # 指定UIの追加バインド

```html
<div v="bind"></div>
```

``src/rendering/ui/ui1.html``

```html
<div>UI1 Text...</div>
```

```typescript
Response.appendUI(this.mjs.bind, "ui1");
Response.appendUI(this.mjs.bind, "ui1");
Response.appendUI(this.mjs.bind, "ui1");
```

```html
<div v="bind">
    <div>UI1 Text...</div>
    <div>UI1 Text...</div>
    <div>UI1 Text...</div>
</div>
```

## # 指定DialogのHTML取得

``src/rendering/dialog/dialog1.html``

```html
<div>Diloag Text...</div>
```

```typescript
console.log(Response.dialog("dialog1"));
```

## # 指定Dialogの表示

``src/rendering/dialog/dialog1.html``

```html
<div>Diloag Text...</div>
```

```typescript
Response.openDialog("dialog1");
```

