---
title: "Solana Tutorial: SPL Token"
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

## テスト用のキーペアを 3 つ用意する

[Solana Docmentation - Keypair conventions](https://docs.solana.com/cli/conventions#keypair-conventions)

検証用にアカウントを 3 つ用意します。
Pubkey は人によって変わります。

| name  | Pubkey                                       |
| ----- | -------------------------------------------- |
| Alice | 6MJgewZBJyzJseZnwWZX11RUwydLVYoVJevJDCHenKaY |
| Bob   | DvA6SjUWgDfU7G5gLDQUH7FeWPTa1xZGW3p9SR6pNqQ7 |
| Carol | EQC2U4Ewh35xbe2LebQxMqeF4MPVgwojysGopMG1bwFM |

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

#### API

```
solana config set --url https://api.devnet.solana.com
```

#### Key Pair (Alice)

```
solana config set --keypair ${HOME}/.config/solana/alice.json
```

### 注意事項

作業はすべて Devnet を使います。クレデンシャル情報を誤って公開された場所に保存したりするリスクに備えて、
開発で使うアカウントは本番で使うアカウントとわけましょう。
