---
title: "Solana開発のための環境構築"
date: 2022-01-22 20:00
permalink: /solana-config
tags:
  - Solana
  - SPL
  - jp
description: |-
  Solanaでスマートコントラクト開発を始めるための最初の一歩
  まずはコマンドのインストールやアカウントを準備しよう
---

## CLI のインストール

以下のようなコマンドをインストールします。

- solana
- solana-keygen
- spl-token

#### Solana Tool Suite

https://docs.solana.com/cli/install-solana-cli-tools

#### SPL Token CLI

https://spl.solana.com/token

## テスト用のキーペアを用意する

[Solana Docmentation - Keypair conventions](https://docs.solana.com/cli/conventions#keypair-conventions)

検証用にアカウントを用意します。目的に応じて 2 つまたは 3 つあると便利です。

わかりやすいように、キーペアに好きな名前をつけます。
例：Alice, Bob, Carol など

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

solana-keygen new
mv ~/.config/solana/id.json ~/.config/solana/carol.json

```

### Phantom ウォレットのインポート

3 つのアカウントを Phantom ウォレットにインポートします。

pbcopy コマンドを使うとファイルの中身をクリップボードにコピーできるので、ウォレットのインポート画面でペーストすればインポートできます。

```
pbcopy < ~/.config/solana/alice.json
pbcopy < ~/.config/solana/bob.json
pbcopy < ~/.config/solana/carol.json
```

## Config 設定

#### API (Devnet)

```
solana config set --url https://api.devnet.solana.com
```

#### Alice/Bob/Carol の Key を設定

```
solana config set --keypair ${HOME}/.config/solana/alice.json
solana config set --keypair ${HOME}/.config/solana/bob.json
solana config set --keypair ${HOME}/.config/solana/carol.json
```

## SOL を入手

Config 設定で Devnet と Alice が設定されていれば、Devnet の Alice のウォレットに 1SOL 入ります。

```
solana airdrop 1
```
