# 教育セミナーin岡山 共有資料

会場の参加者向けに、安藤セッション・田中セッションの資料を共有する静的サイトです。

公開 URL: https://GreatT0511.github.io/seminar_in_okayama/

## 構成

- `docs/index.html`: ページ本体、田中セッションの参考論文4本、Workspace Studioのデータ分析ワーク付録
- `docs/assets/styles.css`: レスポンシブデザイン
- `docs/assets/app.js`: タブ切り替え、資料リンクの表示、付録プロンプトのコピー
- `docs/assets/resources.js`: セッションごとの資料一覧

外部ライブラリやビルド処理は不要です。タブは左右矢印・Home・End キーに対応し、`#ando` / `#tanaka` で各セッションに直接アクセスできます。JavaScript が無効の場合は、両セッションを縦に表示し、田中の講演資料は代替リンクから開けます。

ページ下部の付録は両タブに共通で、`#appendix` から直接開けます。[倉敷南高校の教材](https://greatt0511.github.io/kurashikim/sec03.html)にある「応用ハンズオン｜振り返りデータをGeminiステップで自動分析する」を掲載しています。架空データのGoogle Sheetsリンクと原文の分析プロンプトを使用し、基本操作の解説へリンクしています。

両セッション共通の `#book` には、安藤昇著『それ、AIで作れます。だれでもたった1日で役立つアプリが作れる本』の紹介を掲載しています。中学生からGitHubの基礎とアプリづくりを学べる入門書として案内し、提供された販促画像、Amazonの購入リンク、出版社の書籍紹介を表示します。

## 資料を追加する

`docs/assets/resources.js` の `ando` または `tanaka` に資料を追加します。安藤セッションには表紙サムネイル付きの講演スライドと、会場で画像生成AIを使って制作した3枚の作成見本を登録済みです。作成見本のGoogle スライドはリンクを知っている全員が閲覧でき、編集はできない設定です。田中セッションには講演スライドを登録済みです。登録すると、代替表示が資料リンクに置き換わります。

```js
window.seminarResources = {
  ando: [
    {
      title: "当日のスライド",
      description: "安藤セッションの投影資料です。",
      url: "./materials/ando-slides.pdf",
      thumbnail: "./assets/ando-cover.png",
      thumbnailAlt: "講演資料の表紙",
    },
  ],
  tanaka: [],
};
```

PDF などを配置する場合は `docs/materials/` に保存します。Google スライド等の HTTPS URL も指定できます。会場の参加者が閲覧できる共有設定になっていることを確認してください。`thumbnail` と `thumbnailAlt` は省略可能です。指定すると表紙画像と資料名を含むリンクが表示され、全体をクリックして資料を開けます。

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

CSS や JavaScript を変更する際は `index.html` の対応する `?v=` も更新し、閲覧済みの端末に古いファイルが残らないようにします。論文の更新時は原典の版・査読状況・測定指標と限界を確認し、確認日を更新してください。
