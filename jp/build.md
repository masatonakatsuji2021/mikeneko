# プロジェクトのビルド

ビルドはプロジェクトのディレクトリにカレントディレクトリを移してから  
下記コマンド``mike build``を実行します。

下記はプロジェクトのディレクトリであるproject1にカレントディレクトリを移動し、  
そこでビルドコマンドを実行しています。

```
$ cd project1
$ mike build
```

ビルド実行中は下記のようにコンソールが出力されます。

```
$ cd project1
$ mike build
=====================================
Mikeneko CLI
=====================================

mikeneko build start
# TranceComplieType = es6
# Trance Complie...
# ..OK
# mkdir /********************/project1/output
# platform = web
# mkdir ********************/project1/output/web
# already directory .... clear
# build Start
# core module mount            Ajax
# core module mount            App
..
..
..
# write index.js
# write index.html
# ........ platform = web ok
#
# ...... Complete!
```

``Complete``が出力されたらビルドは正常に完了しています。

ビルド出力先``/output/web``ディレクトリ内に ``index.html``と``index.js``ファイルが設置されているので  
``index.html``をブラウザ等で開いてみてください。

メイン画面が表示されていれば正常にビルド出力が成功しています。

## # ビルドに失敗する場合

ビルドに失敗する場合は下記の内容を確認してください。

### : ts形式ファイルに問題がある場合

プロジェクト内で``tsc``コマンドを実行して、エラーが出力されているかどうかを確認して見る必要があります。

もしtscコマンドでエラーが表示され  
その内容が構文エラーであればコードの内容を修正してみてください。

または型定義エラーの場合はプロジェクト内の``init.d.ts``ファイルの一部肩定義をコメントアウトするか  
``init.d.ts``ファイルそのものを無効化してみる必要はあります。

## # ビルドバンドルについて

Miekenkoでビルド(Webビルド)する際に下記のビルドバンドルが使用できます。

- WebBuilder (デフォルト)
- Webpack

``WebBuilder``はMikeneko専用のビルドバンドルで、デフォルトでこちらでビルドされます。  
一方で``WebPack``にも対応しており、ビルドする環境においてWebpackがグローバルインストールされていることが必須です。

WebPackについてはこちらを参照  
[https://webpack.js.org/](https://webpack.js.org/)

WebPackを使ってビルドする場合は、``package.json``にて下記のように  
プラットフォーム別の設定で``build``の項目を``webpack``に指定してビルド実行します。

ビルド時にWebpack用の``webpack.config.js``などの設定ファイルが自動的に設置されます。  
[package.jsonについてはこちらを参照](packagejson.md)

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app",
                "build": "webpack",
                "debug": true
            }
        ]
    }
}
```

## # オプションコマンド

オプションコマンドを追加することで、詳細名設定でのビルドが可能です。

### : プラットフォームを指定してビルド

特定のプラットフォームのみに対してビルドを行う場合は、  
``--platform``を使ってラットフォーム名を指定します。

```
$ cd project1
$ mike build --platform [platform_name]
```

