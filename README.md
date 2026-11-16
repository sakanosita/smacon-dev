# smacon.dev

Web3 プログラミング / スマートコントラクト入門ブログ <https://smacon.dev> のソース。

[Gatsby Starter Glass](https://github.com/yinkakun/gatsby-starter-glass) をベースにした Gatsby 5 サイトです。

## ローカル開発

```bash
npm install
npm run dev     # http://localhost:3080
npm run build   # 本番ビルド
```

## 記事を書く

- 記事は `content/posts/<カテゴリ>/<slug>.md` に Markdown で置く
- 下書きは `content/drafts/`（ビルド対象外）
- 画像は `static/media/<slug>/`

frontmatter の書き方や記事作成の流れは [CLAUDE.md](./CLAUDE.md) を参照。

## 公開

`main` にマージすると Vercel で自動デプロイされます。

## ライセンス

[MIT](./LICENSE)
