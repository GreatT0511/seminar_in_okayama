# 教育セミナーin岡山 共有資料

会場の参加者向けに、安藤セッション・田中セッションの資料を共有する静的サイトです。

公開 URL: https://GreatT0511.github.io/seminar_in_okayama/

## 構成

- `docs/index.html`: ページ本体
- `docs/assets/styles.css`: レスポンシブデザイン
- `docs/assets/app.js`: タブ切り替え、資料リンクの表示
- `docs/assets/resources.js`: セッションごとの資料一覧

外部ライブラリやビルド処理は不要です。タブは左右矢印・Home・End キーに対応し、`#ando` / `#tanaka` で各セッションに直接アクセスできます。JavaScript が無効の場合は、両セッションの準備中表示が縦に並びます。

## 資料を追加する

`docs/assets/resources.js` の `ando` または `tanaka` に資料を追加します。初期状態は空です。登録すると、準備中表示が資料リンクに置き換わります。

```js
window.seminarResources = {
  ando: [
    {
      title: "当日のスライド",
      description: "安藤セッションの投影資料です。",
      url: "./materials/ando-slides.pdf",
    },
  ],
  tanaka: [],
};
```

PDF などを配置する場合は `docs/materials/` に保存します。Google スライド等の HTTPS URL も指定できます。会場の参加者が閲覧できる共有設定になっていることを確認してください。

## ローカル確認

```sh
python3 -m http.server 8000 --directory docs --bind 127.0.0.1
```

http://127.0.0.1:8000/ を開きます。

```sh
node --check docs/assets/app.js
node --check docs/assets/resources.js
git diff --check
```

## 公開

GitHub Pages の公開元を `main` ブランチの `/docs` に設定しています。`main` に push すると更新が公開されます。

公開後は HTTP 応答、両タブの切り替え、スマートフォン幅の表示を確認してください。
