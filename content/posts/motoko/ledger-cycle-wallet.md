---
title: "Internet Computer 入門: dfx identity と ICP トークンと Cycle ウォレット"
date: 2023-05-11 20:00
permalink: /ledger-cycle-wallet
tags:
  - Motoko
  - Internet Computer
  - DFINITY
social_image: /media/ledger-cycle-wallet/1.png
description: |-
  Internet Computerの開発入門、本番のメインネットにキャニスターをデプロイするために
  Identity と Principal と Ledger と Wallet の関係を整理したい
---

当記事では Internet Computer の dfx という開発ツールにおける秘密鍵やウォレットの取り扱いについて説明します。
以下のような方に向いています

- dfx を使ってキャニスターを本番メインネットにデプロイする
- Cycle ウォレットとの取り扱い方を知りたい
- Identity と Principal と Ledger と Wallet の関係を整理したい

![icp](/media/ledger-cycle-wallet/1.png)

図は Internet Computer の機能のうち、dfx の部分に絞って表しています。

# dfx identity

dfx identity は, 1 組の Principal ID と秘密鍵に紐づきます。

上の図では 2 つの dfx identity を表しています。

- aramaki
- batou

**dfx identity の秘密鍵**

以下のコマンドで表示されます。

```
dfx identity export aramaki
```

# Ledger Account

Ledger Account は ICP トークンの残高を管理します。
dfx identity ごとに 1 つの Ledger Account を持っています。

- aramaki の Ledger Account は 2.0 ICP 保有
- batou の Ledger Account は 1.5 ICP 保有

# Canisters

キャニスターは Internet Computer 上のあらゆるアプリケーション（スマートコントラクト）の入れ物です。
デプロイする時やキャニスターを走らせる時に Cycle が必要です。

- batou は hello_frontend と hello_backend キャニスターをデプロイしています
- hello_frontend は 2TCycle デポジットされています
- hello_backend は 1TCycle デポジットされています

# Cycle Wallet

dfx identity ごとにウォレットを作成したり削除したりできます。
ウォレットごとに複数の Principal を contorller として追加でき、Controller となった Principal はそのウォレットの Cycle を利用したり、ウォレットを削除したりできます。

- aramaki の Cycle Wallet は a で 3T Cycle 保有
- batou の Cycle Wallet は b で 2T Cycle 保有
- Cycle Wallet b の controller は aramaki と batou
  - aramaki は Cycle Wallet b を利用することもできる

Cycle Wallet 自体もはキャニスターであり、最初に作る時に少量の ICP が必要です。

**Cycle トークン**

ICP トークンと交換することで入手できます。
アプリケーションキャニスターにデポジットしたり、Cycle ウォレットにデポジットしたりして利用します。
以下の場合には Cycle トークンが必要です。

- キャニスターを作る時
- キャニスターを走らせる時

## 上の図には書いていない説明

- Principal ID は複数の Leger Account を保有できます、図は dfx identity に限定しているので 1 つの Ledger Account だけを持っています。

- Ledger Account と ICP トークンの残高は 特別な NNS サブネット上の Ledger Canister で管理されています。
