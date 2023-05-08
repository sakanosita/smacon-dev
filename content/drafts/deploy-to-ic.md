---
title: "Internet Computer 入門: メインネットにキャニスターをデプロイする手順"
date: 2023-05-11 20:00
permalink: /deploy-to-ic
tags:
  - Motoko
  - Internet Computer
social_image: /og/internet-computer-2.png
description: |-
  公式チュートリアルの日本語解説：Motoko のキャニスターをメインネットにデプロイしてみよう！
  Cycle を使ったキャニスターのデプロイと管理
---

この記事はこんな人にオススメ

- 自分の作ったキャニスターをインターネット上で公開したい
- Motoko エンジニア/プログラマになりたい
- Internet Computer (DFINITY) に興味がある
- ブロックチェーンや Dapps 開発に興味がある

当記事は、2023 年 5 月現在の DFINITY 公式のデプロイ手順の日本語解説記事です。

[Deploying to Internet Computer](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet)

（IC 自体がまだ発展途上のため、今後手順が変更になる可能性があります）

## 前提

- ローカル PC 上でキャニスターを動かしたことがある
- dfx 0.14.0
- 少量の ICP トークン (Cycle ウォレット作成用に 0.1~0.2ICP ぐらい必要)

ローカル PC 上でデプロイを実行をしたことがない場合は、先にこちらをご覧ください。

[5 ステップではじめる Motoko プログラミング入門](/posts/hello-motoko)

## 本日のゴール

当記事のゴールはシンプルです。

以下に２つのコマンドを紹介します。
下のコマンドが成功すれば、Internet Computer のメインネットにキャニスターをデプロイできます。

```
# ローカル開発環境へのデプロイ
dfx deploy

# Internet Computerメインネットへのデプロイ
dfx deploy --network ic
```

ローカル PC 上で動かす場合との違いは `--network ic` オプションをつけるかどうかだけです。

ソースコードを書いたりキャニスターをコンパイルするところまでは、ローカル開発でもメインネットでも同じです。

ただし、このメインネットへのデプロイコマンドを成功させるためには Cycle ウォレットと Cycle トークンが必要となります。

## Cycle トークン

この記事を読んでいる人の多くはすでに ICP トークンは知っていると思いますが、Internet Computer でキャニスターを走らせるためには Cycle トークンが必要です。

Internet Computer は Ethereum や Solana などほかの多くのブロックチェーンとは異なり dApps の利用者(ユーザー)ではなく、dApps の運営者が Gas を負担します。

**[Reverse Gas](https://internetcomputer.org/capabilities/reverse-gas/)**

**[Gas/Cycles cost](https://internetcomputer.org/docs/current/developer-docs/gas-cost)**

dApps 開発者は、以下の 2 つの目的で Cycle を使用します。

- キャニスターを作成・デプロイする時の Cycle
- デプロイ後のキャニスターを走らせるための Cycle

Cycle トークンを入手するには２つの方法があります。

- Faucet で開発者向けの Cycle をもらう（無料）
- ICP トークンと Cycle を交換する

どちらの場合でも、まず Cycle ウォレットが必要です。
その Cycle ウォレットを作るために少量(0.1~0.2)の ICP トークンが必要です。

## Ledger アカウント と Cycle ウォレット

Cycle ウォレットを作る前に秘密鍵との関係を整理しておきましょう

### 入手方法 1: Faucet で開発者向けの Cycle をもらう(無料)

Faucet というのは web3 系の開発をするときに開発用のトークンをもらえるしくみのことです。

[Getting Started with Free Cycles](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet)

この方法は、開発用の Cycle ウォレットに直接入れることができて便利です。

Cycle をもらうためには、後述する Cycle ウォレットを作っておく必要があります。

Faucet の手順は頻繁に変更するので、あなたがこの記事を読んでいる時点で、まだ有効な手順かどうかはわかりません。

### 入手方法 2: ICP トークンと Cycle を交換する

ICP と Cycle を交換する方法にもいくつかの方法がありますが、ここでは以下の公式ドキュメントの手順を紹介します。

[Deploying to Internet Computer](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet)

[ICP の入手手順](/posts/get-icp-token)
