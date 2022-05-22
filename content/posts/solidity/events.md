---
title: "Solidity 入門: 定義したイベントを発行してブロックチェーンに記録"
date: 2022-01-21 19:00
permalink: /solidity-events
redirect_from:
  - /solidity-events/
tags:
  - Solidity
  - Ethereum
  - Hardhat
  - EVM
  - Rinkeby
description: |-
  イーサリアム互換のブロックチェーン (EVM) のスマートコントラクトのイベントの使い方、
  初心者向けの Web3 プログラミング学習
---

このページはこんな人におすすめ

- Solidity を学びたい
- 簡単なスマートコントラクトの作り方を知りたい
- EVM の Event のことを知りたい

Solidity by Example の[サンプルコード](https://solidity-by-example.org/events/)を使ってスマートコントラクトを作る方法を解説します。

以下のページでほかのサンプルコードも解説しています。

- [はじめてのイーサリアム Dapps 開発](/posts/first-app)
- [NFT プログラミング (ERC721)](/posts/erc721)
- [オラクルの基本的な使い方（Chainlink Data Feeds)](/posts/price-oracle)
- [Merkle Proof（マークルツリーと Keccak256）](/posts/merkle-tree))
- [定義したイベントを発行してブロックチェーンに記録](/posts/solidity-events)

Hardhat を使ったことがない方は以下の記事も合わせてご覧ください。

- [Hardhat で Solidity のスマートコントラクトを開発しよう！](/posts/hardhat)

# 新しいプロジェクトを作る

events というディレクトリを作り
npm パッケージの hardhat をインストールします。

```
mkdir events
cd events
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

# コーディング

以下のファイルを作ります。

### contracts/Events.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Event {
    // Event declaration
    // Up to 3 parameters can be indexed.
    // Indexed parameters helps you filter the logs by the indexed parameter
    event Log(address indexed sender, string message);
    event AnotherLog();

    function test() public {
        emit Log(msg.sender, "Hello World!");
        emit Log(msg.sender, "Hello EVM!");
        emit AnotherLog();
    }
}

```

Log()と AnotherLog()という 2 つのイベントを定義して、test()関数を実行したときにそのイベントを発行しています。
ブロックチェーンにイベントを記録するときには、emit を付けます。

イベントにはパラメータを渡すことができ、3 つまで indexed することができます。
indexed をつけたパラメータでログをフィルタリングすることができます。

今回は Rinkeby というテストネットにデプロイするので、デプロイ用の設定も書いています。

### hardhat.config.js

```js
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: `${RINKEBY_RPC_URL}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
};
```

# デプロイ

テストネットへのデプロイには以下の 2 つの環境変数が必要です。

- RINKEBY_PRIVATE_KEY
- RINKEBY_RPC_URL

詳細は[こちら](/posts/hardhat)

デプロイ用にスクリプトを用意します。

### scripts/deploy.js

```js
const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("Event");
  const contract = await Factory.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

環境変数を export した端末で以下のコマンドを実行します。

```
npx hardhat run scripts/deploy.js --network rinkeby
```

```
（出力）
Contract deployed to: 0xc5BeE3DDcD7F58380Aa0CA3D01dA63a34a9C3c09
```

このときに出力するコントラクトアドレスを書き留めてください。

# イベントの発行

コントラクトをデプロイしただけでは、まだイベントを発行していません。
イベントを発行するためには、test()関数を実行する必要があります。
スマートコントラクトの実行方法はいろいろありますが、ここでは Etherscan を使ってみましょう。

## Function の実行準備

Rinkeby の Explorer(Etherscan)を開き、デプロイしたコントラクトアドレスを検索しましょう。
デプロイの直後はすぐに表示されないかもしれません。2, 3 分待てば表示されます。

作ったコントラクトの Function を Etherscan で実行するためにソースコードの 「Verify and Publish」を行ってください。
この作業は慣れれば 1 分で終わります。

[コントラクトを Etherscan で最適化しよう。](https://note.com/standenglish/n/n7680bdb2beaf)

## Function の実行

関数の実行には Rinkeby の ETH が少量必要です。
テストネットの ETH は無料で入手できます。

Rinkeby の Etherscan を開いて自分のコントラクトを検索します。

https://rinkeby.etherscan.io/address/0xc5bee3ddcd7f58380aa0ca3d01da63a34a9c3c09#writeContract

- [Contract]タブの[Write Contract]を表示
- [Connect to Web3]をクリックすると Metamask を接続
- [test]の[Write]をクリックして test()関数を実行

![Etherscan](/media/events/1.png)

## Event の確認

test()を実行したらトランザクションが完了するまで待ちましょう。
トランザクションが Success になったら Events タブを開くと、イベントのログを見ることができます。

![Etherscan](/media/events/2.png)

このページで[実際に使ったソースコード](https://github.com/smacon-dev/solidity-example/tree/main/events)を GitHub からダウンロードできます。
