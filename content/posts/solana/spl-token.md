---
title: "Solana Program Library: SPL Token"
date: 2022-01-22 21:00
permalink: /spl-token
tags:
  - Solana
  - SPL
description: |-
  Solana Program Library (SPL) のチュートリアル
  コマンドラインでアカウントを作り独自トークンや NFT を mint
  DeFi の Dapps 開発
---

# SPL Token Tutorial

https://spl.solana.com/token

## このページの作業に必要なもの

- solana-keygen コマンド
- spl-token コマンド
- Devnet のアカウント 2 つ
- Phantom ウォレット

### [Solana 開発のための環境構築](/posts/solana-config/)

# 独自トークンの作成

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

# NFT (Non Fungible Token)の発行

Solana では spl-token コマンドで NFT を作ることができます。

NFT といってもアートや画像を表示するものではなく、代替不可能なトークンという本来の意味のトークンです。

まず、小数点以下の桁数を 0 のトークンを作ります。

```
% spl-token create-token --decimals 0
Creating token FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP

Signature: 3Byg1HmyM7xj47iEcmfB2PnrDDB15oimg7azG8igaZbGnQNeSTC3tC8t74bE5TqjKLQFk7snXSyzHnqNznjwwp3j
```

つぎにトークンアカウントを作ります。

```
% spl-token create-account FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP
Creating account HBL76s564iGVk2TMPrSEQJWpyjdZxER7QpmSbdM2GUBk

Signature: 3x6eTSb1Fi4vL5TfYMexWN6Vzzeo1h5J9cghZLAFKLAUNKFTNTXz2vMTDcLSbJt2SMsknchppXiPfnYb9waNLnnN
```

トークンを 1 単位だけ mint します。

```
 % spl-token mint FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP 1
Minting 1 tokens
  Token: FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP
  Recipient: HBL76s564iGVk2TMPrSEQJWpyjdZxER7QpmSbdM2GUBk

Signature: 23LTonVsL8ntNyXasENeit2V3eZ61Gnta6gvAJSaeSKQ5LrSdTM9v4iqcEY8T4PyWttbs88CiNazyf3he8UQ5LrC
```

通常のトークンは、1 だけ発行しても、0.1 や 0.2 を送ることができますが、このトークンは decimals が 0 なので送信できるのは 1 単位です。

つぎに、このトークンアドレスでこれ以上トークンを mint できないようにします。

```
% spl-token authorize FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP mint --disable
Updating FoGRhV7Lh3anC64NSjgV4XSQd5CfXhAihEWG6Diz3EbP
  Current mint authority: 6MJgewZBJyzJseZnwWZX11RUwydLVYoVJevJDCHenKaY
  New mint authority: disabled

Signature: FZv8x2MNEjvcphb2jb3B4zYGeP8PGpmAvWey9NXE7j5HkqkiB9AXjgFZi5TCbZoirdQCYNnmbyqdd5mFouGcypN
```

このトークンは 1 つしかなく、新たに mint して増やすこともできないので、Non-fungible です。
