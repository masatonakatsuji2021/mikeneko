# Data Class

## # データのセット

```typescript
Data.set("value01", { name: "your name", age: 25 });
```

## # データの取得

```typescript
const value01 = Data.get("value01");
```

## # データの削除

```typescript
Data.remove("value01");
```

## # データ(リスト)の追記

```typescript
Data.push("value01", { name: "your name", age: 25 });
```

## # データ(リスト)の件数取得

```typescript
const length = Data.getLength("value01");
```

## # データ(リスト)のpop

```typescript
const get = Data.pop("value01");
```