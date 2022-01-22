---
title: "Solana Program Library: SPL Token"
date: 2021-01-21 22:00
permalink: /spl-token
tags:
  - Solana
  - SPL
  - jp
description: |-
  Solana Program Library(SPL)のチュートリアル
---

## SPL Token Tutorial

https://spl.solana.com/token

### このページの作業に必要なもの

- solana-keygen コマンド
- spl-token コマンド
- Phantom ウォレット

## テスト用のキーペアを 2 つ用意する

[Solana Docmentation - Keypair conventions](https://docs.solana.com/cli/conventions#keypair-conventions)

検証用にアカウントを 2 つ用意します。
わかりやすいように、2 つのキーペアに以下の名前をつけます。

- Alice
- Bob

以下のコマンドを入力すると新しいキーペアを作ることができます。

```
solana-keygen new
```

solana-keygen を実行するときにリカバリフレーズが表示されます。

```
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx xxxx
```

検証用のアカウントとして使い捨てるなら不要ですが、あとで復旧することがあるなら保管しましょう。

新しいキーペアはホームディレクトリ配下に id.json という名前でファイルが作成されます。
それぞれファイル名を変更します。

```
solana-keygen new
mv ~/.config/solana/id.json ~/.config/solana/alice.json

solana-keygen new
mv ~/.config/solana/id.json ~/.config/solana/bob.json

```

### Phantom ウォレットのインポート

3 つのアカウントを Phantom ウォレットにインポートします。

pbcopy コマンドを使うとファイルの中身をクリップボードにコピーできるので、ウォレットのインポート画面でペーストすればインポートできます。

```
pbcopy < ~/.config/solana/alice.json
pbcopy < ~/.config/solana/bob.json
```

## Config 設定

#### API

```
solana config set --url https://api.devnet.solana.com
```

#### Key Pair (Alice)

```
solana config set --keypair ${HOME}/.config/solana/alice.json
```

## 独自トークンの作成

はじめに Devnet 用の SOL トークンを入手します。

```
solana airdrop 1
```

Alice の keypair を設定しているので、Alice のアドレスに 1SOL 届きます。

Alice アカウントで Fungible Token を作ります。

```
spl-token create-token
```

```
Creating token 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD

Signature: 5ZovHirScb1uSAi5p7PsiDp24gmXga2ATAVrVkXbtHXHzhFYUEVCU6pbegUY5F5Z1t2uuzacB5fZZcLnBRjKJfCf
```

現在のトークン供給量を表示させてみます。

```
% spl-token supply 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD
0
```

初期値は 0 です。

トークンアカウントを作ります。Solana ではトークンごとにアカウントを作る必要があります。

```
 % spl-token create-account 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD
Creating account EfK3cT3Yp6xbTED5PLHa9hHsLXeSMXxuK6X3poP4gGc4

Signature: 4nJXjot5JnuPf1MjPtfsSGmKQPR5Tm34ZXxunsKUyfpwqwKKcn7HoGUJa4qhErvZT39DC4oBfnEXXV7eLu4AdvEC
```

100 トークンを mint します。つまり生成します。

```
 % spl-token mint  35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD 100
Minting 100 tokens
  Token: 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD
  Recipient: EfK3cT3Yp6xbTED5PLHa9hHsLXeSMXxuK6X3poP4gGc4

Signature: 4V5zgPht8E6BpQGdCA9JjsAFpxKhZwdE5NifFTCghksr9AaHYADFvmR9GARWj5LKZL3Ktxk5QpAYcCGvfULzL6UM
```

Phantom ウォレットを使って 100 トークンのうち、20 を Bob に送ってみましょう。

supply, balance, acounts サブコマンドでトークンの Address を表示すると現在の状態がわかります。

```
subgraphs % spl-token supply 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD
100

subgraphs % spl-token balance 35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD
80

subgraphs % spl-token accounts
Token                                         Balance
---------------------------------------------------------------
35ax2anmDCqjMYRiPNRLMW6WYMCYFosr378XLNu4V1eD  80

```

## Devnet Explorer

Explorer でトークンのアドレスを入力して、バランスを見てみましょう。
2 つのアカウントが 80 対 20 になっているはずです。

https://explorer.solana.com/

### 注意事項

作業はすべて Devnet を使います。クレデンシャル情報を誤って公開された場所に保存したりするリスクに備えて、
開発で使うアカウントは本番で使うアカウントとわけましょう。
