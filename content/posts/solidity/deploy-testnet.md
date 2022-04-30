---
title: "イーサリアム入門: テストネットにスマートコントラクトをデプロイしよう！(Ropsten / Rinkeby)"
date: 2022-04-30 22:00
permalink: /deploy-testnet
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

Hardhat を使ったことがない方はこちらからどうぞ

[Hardhat でスマートコントラクトを作ろう！](/posts/hardhat)

# 新しい Hardhat プロジェクトを作る

deploy-testnet というディレクトリを作り
npm パッケージの hardhat をインストールします。

```
mkdir deploy-testnet
cd deploy-testnet
npm init -y
npm i --save-dev hardhat
```

Hardhat のサンプルプロジェクトを作ります。

```
npx hardhat
```

`Create a sample project`を選択して、すべて Yes で回答します。

```
? What do you want to do? …
❯ Create a sample project
  Create an empty hardhat.config.js
  Quit
```

これで hardhat.config.js の初期設定や ether.js などプラグインを追加した状態になります。

# スマートコントラクトの作成

## コーディング

### contracts/Helloworld.sol

```solidity
// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.10 and less than 0.9.0
pragma solidity ^0.8.10;

contract HelloWorld {
    string public greet = "Hello World!";
}
```

### hardhat.config.js

hardhat.config.js を以下のように編集します。

```js
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
};
```

## コンパイル

hardhat コマンドを実行します。

```
npx hardhat compile
```

# テストネット(Ropsten)へのデプロイ

Ethereum のテストネット(Ropsten)にデプロイします。
チュートリアルでオススメされている Ropsten を使って説明します。
テストネットのデプロイには以下の 3 つが必要です。

- Ropsten のアカウントの秘密鍵
- Ropsten の ETH トークン
- RPC エンドポイントの URL

### Ropsten のアカウントの秘密鍵

Metamask でアカウントを作って Private Key をエクスポートすれば取得できます。
念のため、本番で使っているアカウントと分けることをおすすめします。

### Ropsten の ETH トークン

0.01ETH ぐらいあればデプロイには足りると思います。
テストネットは Faucet という無料でトークンをもらえるサイトが存在するのでググって入手してください。

### RPC エンドポイントの URL

ブロックチェーンのネットワークにアクセスするためのエンドポイントです。
代表的なノードプロバイダーを紹介します。

- INFURA
- Alchemy
- QuickNode

Alchemy はある程度まで無料プランで利用できるのでオススメです。
Alchemy にユーザー登録すれば、RPC サーバの URL を取得できます。

もう 1 つの簡単な方法は Metamask で使われている RPC エンドポイントです。
Metamask に指定されている RPC エンドポイントは INFURA というノードプロバイダーの RPC サーバです。(2022 年 1 月現在)
Metamask の Network の設定を開くと Ropsten のエンドポイントの設定内容がみれます。

## 環境変数

秘密鍵や API Key などのクレデンシャルは Git に commit しないようにする必要があります。
そこで、以下の 2 つの環境変数をエクスポートして hardhat 実行時に使えるようにします。

- `ROPSTEN_PRIVATE_KEY`
- `ROPSTEN_RPC_URL`

hatdhat.config.js を以下のように編集します。

### hardhat.config.js

```js
require("@nomiclabs/hardhat-waffle");

const ROPSTEN_PRIVATE_KEY = process.env.ROPSTEN_PRIVATE_KEY;
const ROPSTEN_RPC_URL = process.env.ROPSTEN_RPC_URL;

module.exports = {
  solidity: "0.7.3",
  networks: {
    ropsten: {
      url: `${ROPSTEN_RPC_URL}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};
```

ターミナルで以下のコマンドを実行します。

```
export ROPSTEN_PRIVATE_KEY="<RopstenのアカウントのPrivate Key>"
export ROPSTEN_RPC_URL="https://ropsten.infura.io/v3/xxxxxxxx"
```

設定した値を確認してみましょう。

```
echo "ROPSTEN_PRIVATE_KEY: $ROPSTEN_PRIVATE_KEY"
echo "ROPSTEN_RPC_URL: $ROPSTEN_RPC_URL"
```

このときにエクスポートした環境変数は、このコマンドを実行したターミナルウィンドウだけ使えるようになります。

環境変数を設定したターミナルウィンドウで以下のコマンドを実行します。

```
npx hardhat run scripts/deploy.js --network ropsten
```

```
Deploying contracts with the account: 0x470815ee5b366755284C9e85f0D636F1e046d013
Account balance: 1288845007486614009
Token address: 0xfa9D0729c104841668E0DDeb433Cbc6107AB59C1
```

このようなログが表示されたらテストネットへのデプロイが正常に実行されています。

Etherscan(Ropsten)でコントラクトアドレスやトランザクションを確認してみましょう。

https://ropsten.etherscan.io/address/0xfa9D0729c104841668E0DDeb433Cbc6107AB59C1

## Metamask で確認

Hardhat のチュートリアルには載っていませんが、せっかくトークンを作ったので Metamask に登録してみましょう。

deploy.js を実行した際に出力された`Token address`を Metamask に登録します。
![Metamask](/media/hardhat/1.png)

これで 1,000,000 MHT が見えるようになります。

これは Token.sol というサンプルコードであなたが作った'My Hardhat Token'です。

ほかのアドレスに送ることもできます。自由に試してください。

メインネット用の ETH と RPC を使えば同じやり方でメインネットにデプロイすることもできます。
