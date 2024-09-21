# Package.jsonの設定

``package.json``はnpmパッケージの設定情報や依存パッケージのリストを行うための設定ファイルですが、  
Mikenekoではビルド用の設定を行うことができます。

ビルドは主にWebアプリを基本形に、  
AndroidやiOSなどのスマートフォンアプリケーション,   
さらにはWindowsやMacなどのデスクトップアプリケーションなどの  
個別でのプラットフォーム(環境依存)に応じたビルドに対応が可能です。

TypeScriptでのトランスパイル設定については[tsconfig.jsonの設定](tsconfig.md)を参照してください。

package.jsonがnpmパッケージの設定と併用するため  
MIkeneko用のビルド設定を行うには、予め``mikenekoBuild``の領域をセットする必要が有ります。  
この中に下記のようにプラットフォーム別でのビルド設定などを行ってください。  

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app",
                "debug": true
            }
        ]
    }
}
```

## # プラットフォーム別のビルド

```platforms``にてプラットフォーム別でのビルド設定を行います。　　
例えばプラットフォーム名を``app``とする場合は下記のように``package.json``内部に記述します

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app"
            }
        ]
    }
}
```

``mikenekoBuild``および``platforms``を指定しない場合は自動的に``web``のプラットフォームでビルドされます。  
なおビルドの場所はプロジェクトディレクトリ内の``output/{プラットフォーム名}``ディレクトリで自動生成されます。

プラットフォームは任意の名称で、複数設定することも可能です。
例えばプラットフォーム名``app1``と``app2``それぞれを設定する場合は``package.json``にて下記のように記述してください。

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app1"
            },
                        { 
                "name": "app2"
            }
        ]
    }
}
```

プラットフォームを複数作成することで、  
コンソール出力の有効/無効、またはビルドファイル圧縮、難読化の設定などをプラットフォーム別で切り分けることができます。
これはデバッグモードとリリースモード(本番用)それぞれをビルドすることと同様です。

## # ビルド場所のオプション設定

各プラットフォーム用ディレクトリの直下にビルドされますが、  
Cordova等を使用する場合、そこから任意のディレクトリに設置する必要がある場合は  
``optionDir``を使ってサブディレクトリ以降のパスを指定できます。

下記の場合はプラットフォーム``app2``は``output/app2/www``ディレクトリにビルドされます。

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app1"
            },
                        { 
                "name": "app2",
                "optionDir": "www"
            }
        ]
    }
}
```

## # コンソール出力の有効/無効

ここでのコンソール出力とは``console.log``が意図的に指定されている場合に開発者モードにてコンソール出力の有効/無効の設定です。  
ただし``console.error``などは出力されます。

各プラットフォームにて``debug``を下記のように指定します。  　
デフォルトで何も指定がない場合は、コンソール出力はされません。 

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app1"
            },
            { 
                "name": "app2",
                "debug": true,
            }
        ]
    }
}
```

## # ビルドファイルの圧縮

ビルドファイルの圧縮を行うには``codeCompress``をtrueで指定します。  
圧縮時はコード内に記載されているコメントアウトはすべて削除された状態となります。

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app1"
            },
            { 
                "name": "app2",
                "codeCompress": true,
            }
        ]
    }
}
```

## # コードの難読化

ビルドファイルからコードの秘匿化を行う方法として、コードの難読化を行うことができます。  
難読化を行うには``obfuscated``をtrueで指定します。  

ただし上記のコード圧縮``codeCompress``と併用する場合、  
コードの圧縮率が下がる可能性があります。

```json
{
    "mikenekoBuild": {
        "platforms": [
            { 
                "name": "app1"
            },
            { 
                "name": "app2",
                "obfuscated": true,
            }
        ]
    }
}
```
