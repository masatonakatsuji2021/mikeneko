# プロジェクトの作成

プロジェクトの新規作成をするには``mike create``コマンドを使います。  
{project_name}には任意で作成するプロジェクト名を指定します。

```
$ mike create
```

このコマンド実行により、対話形式で入力が進められ  
カレントディレクトリ上にプロジェクト名のディレクトリと最低限必要なソースファイルの設置などが行われます。  

コマンドが正常に動作している場合は、下記のようにコンソールが流れます。

```
$ mike create {project_name}
=====================================
Mikeneko CLI Version: 1.1.0
=====================================


# Create Project


Q. Project Name? :project01


Do you want to create this project? [y/n] (y) :
# mkdir           ********************/project01
# Copy            init.d.ts
# Copy            package.json
# Mkdir           src
# Mkdir           /srcapp
..
..
# calibrate       /tsconfig.json

....... Create Complete!
```

``Create Complete!``が表示されて、プロジェクトの作成が完了します。

プロジェクトの作成が完了後、 ビルドコマンドにより  
ビルドが実行されてビルド出力がされているかどうかを確認してください。

ビルドの方法については[こちらを参照](build.md)