const path = require("path");
const fs = require("fs");

let entryList = [];

const __root = "./dist";
const list = fs.readdirSync(__root, { recursive: true});
for(let n = 0 ; n < list.length ; n++) {
  if (!fs.statSync(__root + "/" + list[n]).isFile()) continue;
  entryList.push(__root + "/" + list[n]);
}

module.exports = {
    mode: "development",
    entry: entryList,
    resolve: {
        modules: [
          __root + "/",
        ],
      },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'www'), // 出力先のディレクトリ
        assetModuleFilename: '[hash][ext][query]',  // 画像やリソースの保存場所
        publicPath: '/dist/', // 動的なパスを指定
    },
    module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg|gif|svg|css|html)$/,  // 対象となる画像ファイル
            type: 'asset',  // Webpack 5以降、asset moduleを使う
            parser: {
              dataUrlCondition: {
                maxSize: 200 * 1024,  // 200KB 以下の画像はBase64に変換
              },
            },
          },
        ],
    },
};