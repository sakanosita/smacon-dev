# CLAUDE.md

smacon.dev（Web3 プログラミング / スマートコントラクト入門ブログ）のリポジトリ。Gatsby 5 製。

## 記事作成の流れ

1. ユーザーが記事のテーマを出す
2. スレッド上で構成・内容をやりとりして固める（固まるまで記事ファイルは作らない）
3. 内容が固まったら、ブランチを切って記事を書き、PR を作成する
4. ユーザーが PR をマージすると Vercel で公開される

- ブランチ名: `post/<slug>`（例: `post/mstr-bitcoin-strategy`）
- PR には記事の要約と公開 URL（`https://smacon.dev/posts/<permalink>`）を書く
- 1 PR = 1 記事

## 記事の置き場所

- 公開記事: `content/posts/<カテゴリ>/<slug>.md`
  - カテゴリ: `column`, `solidity`, `rust`, `solana`, `near`, `dfinity`, `motoko`, `thegraph`
  - 当てはまらなければ `column`
- 下書き: `content/drafts/`（Gatsby は読み込まないので公開されない）
- 画像: `static/media/<slug>/` に置き、本文では `/media/<slug>/1.png` で参照

## frontmatter

```yaml
---
title: "記事タイトル | Web3 プログラミング, スマートコントラクト入門"
date: 2026-06-02 12:00:00
permalink: /mstr-bitcoin-strategy
tags:
  - Bitcoin
  - MSTR
description: |-
  検索結果や OGP に出る 1〜2 文の説明。
---
```

- `permalink` を付けると URL は `/posts<permalink>` になる
- `tags` ごとに `/tags/<tag>/` ページが自動生成される
- 参考: `content/posts/column/mstr.md`

## 文体

- 日本語、です・ます調
- 本文の見出しは `#` から使う
- 投資・金融系の話題には「※この記事は投資助言ではありません」の注記を入れる

## コマンド

- `npm run dev` — ローカル確認（http://localhost:3080）
- `npm run build` — 本番ビルド（PR 前にビルドが通ることを確認する）
- `npm run format` — Prettier
