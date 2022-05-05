---
title: "Ethereum 入門: Hardhat でテストネットにスマートコントラクトをデプロイしよう！"
date: 2022-05-02 11:00
permalink: /deploy-testnet/
level: beginner
tags:
  - Solidity
  - Hardhat
  - Ethereum
  - Ropsten
  - Rinkeby
description: |-
  Hardhat を使って Solidity のスマートコントラクトをイーサリアムのテストネット Ropsten や Rinkeby にデプロイ、
  初心者向けの Web3 プログラミング学習
---

このページはこんな人におすすめ

- Solidity を学習したい
- テストネットにスマートコントラクトを作りたい
- Hardhat の使い方を知りたい

Hardhat 自体を使ったことがない場合は先に以下の記事をご覧ください。

[Hardhat で Solidity のスマートコントラクトを開発しよう！](/posts/hardhat)

# Ethereum のテストネットについて

[Ethereum Networks](https://ethereum.org/en/developers/docs/networks/)

- Gorli
- Kovan
- Kintsugi
- Rinkeby
- Ropsten

Ethereum には複数のテストネットが用意されています。

スマートコントラクトを開発するにあたっては、トークンや RPC エンドポイントを入手できるものであれば
どのネットワークを使っても構いません。

NFT を使った開発が目的であれば、Opensea が対応している Rinkeby がオススメです。

# 事前準備

テストネットにデプロイするために以下のものを準備します。

- EOA（Externally Owned Account）の秘密鍵（Metamask ウォレットで使う秘密鍵)
- テストネットの ETH トークン
- テストネットの RPC エンドポイントの URL

１つずつ解説していきます。

## EOA の秘密鍵

Ethereum のテストネットではスマートコントラクトをデプロイするためのアカウントとして EOA を使います。

EOA（Externally Owned Account）とは ユーザーが使うアカウントのことで、Metamask で作るウォレット用のアカウントです。

Metamask でアカウントを作って Private Key をエクスポートすれば取得できます。

念のため、本番で使っているアカウントと分けることをおすすめします。

## テストネット の ETH トークン

0.1ETH ぐらいあればデプロイには足りると思います。

テストネット用のトークンは、テストネットのノードを運営している団体が無料で配布したりしています。

以下のように Google 検索してみてください。

「Rinkeby Faucet」
「Ropsten Faucet」

Faucet は蛇口という意味ですが、ブロックチェーンの開発においてテストネット用のトークンをもらうためのキーワードです。
Ethereum 以外でも Faucet で検索すればテストネット用のトークンを入手することができます。

Faucet では自分のアドレスを入力するだけで送られてくるものもあれば、SNS でシェアした URL を入力するともらえる場合などもあります。

Faucet でパスワードやシードフレーズを聞かれることはありません。もし聞かれたら偽物の詐欺サイトです。

### RPC エンドポイントの URL

ブロックチェーンのネットワークにアクセスするためのエンドポイントです。

エンドポイントを使うということはブロックチェーンのノードにアクセスするということです。

Ethereum では PC やサーバを使って自分でノードを建てることができますが、ノードプロバイダーと呼ばれるを有名なサービスがいくつかあり、メインネットやテストネットのノードを無料で借りることができます。

- INFURA
- Alchemy
- QuickNode

じつは Metamask で使われている RPC エンドポイントは INFURA というノードプロバイダーの RPC サーバです。

Metamask の Network の設定を開けば設定内容が見れるのでそれを使っても構いません。

筆者のおすすめは Alchemy です。
ユーザー登録すれば、RPC サーバの URL を取得できて、ある程度まで無料プランで利用できます。

# 環境変数の設定

以下のような環境変数を設定します。

- Ropsten の場合

  - `ROPSTEN_PRIVATE_KEY`
  - `ROPSTEN_RPC_URL`

- Rinkeby の場合

  - `RINKEBY_PRIVATE_KEY`
  - `RINKEBY_RPC_URL`

### env.txt

秘密鍵や API Key などのクレデンシャルは Git に commit しないようにする必要があります。

そこで環境変数の中身は、env.txt というファイルに書いて Git プロジェクトの外に置いたり、.gitignore を使って Git に commit しないようにしましょう。

```
export ROPSTEN_PRIVATE_KEY="<EOA の秘密鍵>"
export ROPSTEN_RPC_URL="https://ropsten.infura.io/v3/xxxxxxxx"

export RINKEBY_PRIVATE_KEY="<EOA の秘密鍵>"
export RINKEBY_RPC_URL="xhttps://eth-rinkeby.alchemyapi.io/v2/xxxxx"
```

ターミナルで以下のコマンドを実行すれば、環境変数の値を読み込んだ状態になります。

```
source env.txt
```

### hardhat.config.js

hatdhat.config.js を以下のように編集します。

```js
require("@nomiclabs/hardhat-waffle");

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL;

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;

module.exports = {
  solidity: "0.x.x",
  networks: {
    ropsten: {
      url: `${ROPSTEN_RPC_URL}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
    rinkeby: {
      url: `${RINKEBY_RPC_URL}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
};
```

# デプロイ

環境変数を設定したターミナルウィンドウで以下のコマンドを実行します。

```
# 環境変数を読み込む
source env.txt
```

```
# Ropsten にデプロイ
npx hardhat run scripts/deploy.js --network ropsten

# Rinkeby にデプロイ
npx hardhat run scripts/deploy.js --network rinkeby
```

デプロイするには`scripts/deploy.js`といったデプロイ用のスクリプトを用意する必要があります。

デプロイスクリプトの内容はスマートコントラクトによって変わります。

具体的なスクリプトが見たい場合はこれらのページをご覧ください。

- [はじめてのイーサリアム Dapps 開発](/posts/first-app)
- [Hardhat で Solidity のスマートコントラクトを開発しよう！](/posts/hardhat)
