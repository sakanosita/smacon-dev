---
title: "Solidity プログラミング入門: はじめてのイーサリアム Dapps 開発"
date: 2022-04-29 21:00
permalink: /first-app
redirect_from:
  - /first-app/
level: beginner
tags:
  - Solidity
  - Hardhat
  - Rinkeby
  - EVM
  - Ethereum
description: |-
  初心者向けの Solidity サンプルコード集 'Solidity by Example' を日本語で解説,
  スマートコントラクトの実装とデプロイを紹介。
---

このページはこんな人におすすめ

- Solidity を学びたい
- 簡単なスマートコントラクトの作り方を知りたい
- Hardhat を使った Solidity のテスト方法を知りたい

このページで実際に使ったソースコードは[GitHub](https://github.com/smacon-dev/solidity-example/tree/main/first-app)からダウンロードできます。

Solidity by Example のサンプルコードを使ってスマートコントラクトを作る方法を解説します。

[First Application (Solidity by Example)](https://solidity-by-example.org/first-app/)

Hardhat を使ったことがない方は先にこちらもご覧ください。

[Hardhat でスマートコントラクトを作ろう！](/posts/hardhat)

# 新しい Hardhat プロジェクトを作る

first-app というディレクトリを作り
npm パッケージの hardhat をインストールします。

```
mkdir first-app
cd first-app
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

contracts/Counter.sol と hardhat.config.js を編集します。
2 つの Solidity バージョンが一致するようにしましょう。

### contracts/Counter.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Counter {
    uint public count;

    // Function to get the current count
    function get() public view returns (uint) {
        return count;
    }

    // Function to increment count by 1
    function inc() public {
        count += 1;
    }

    // Function to decrement count by 1
    function dec() public {
        count -= 1;
    }
}
```

2022 年 1 月現在、サンプルコードのバージョンは 0.8.10 になっており、
Hardhat 側は 0.8.9 まで対応中なので、0.8.9 に合わせます。

### hardhat.config.js の一部

```js
module.exports = {
  solidity: "0.8.9",
};
```

# テスト

Hardhat では JavaScript のテストツールの chai を使っています。
sample-test.js を以下のように編集します。

### test/sample-test.js

```js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Counter", function () {
  let Factory;
  let contract;

  // 各テストの前に毎回デプロイ処理が走ります
  beforeEach(async function () {
    Factory = await ethers.getContractFactory("Counter");
    contract = await Factory.deploy();
  });

  // 初期状態でget()の戻り値が0であること
  it("Should be 0", async function () {
    expect(await contract.get()).to.equal(0);
  });

  // inc()を実行すると+1されること
  it("Should be 1 after inc()", async function () {
    const Tx = await contract.inc();
    await Tx.wait();
    expect(await contract.get()).to.equal(1);
  });

  // dec()を実行すると-1されること
  it("Should be 0 after inc() and dec()", async function () {
    const Tx1 = await contract.inc();
    await Tx1.wait();
    expect(await contract.get()).to.equal(1);
    const Tx2 = await contract.dec();
    await Tx2.wait();
    expect(await contract.get()).to.equal(0);
  });
});
```

## テスト実行

以下のコマンドを実行すると test ディレクトリ配下にあるテストが実行されます。

```
npx hardhat test
```

```
出力
  Counter
    ✓ Should be 0
    ✓ Should be 1 after inc()
    ✓ Should be 0 after inc() and dec()


  3 passing (406ms)
```

3 つのテストがすべて Pass(成功)となりました。

# デプロイ（ローカル実行環境）

scripts/deploy.js というファイルを作ります。
このファイルはローカル実行環境あるいはパブリックブロックチェーンにデプロイしたり、
スマートコントラクトの関数を実行したりする処理を記述します。

### scripts/deploy.js

```js
const hre = require("hardhat");

async function main() {
  const Factory = await hre.ethers.getContractFactory("Counter");
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

以下のコマンドでデプロイを実行します。

```
npx hardhat run scripts/deploy.js
```

```
出力
Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

これでローカル実行環境にデプロイできました。

ローカル実行県境で試したら、つぎはパブリックテストネットにデプロイしてみましょう。

# デプロイ（テストネット）

ブロックチェーンには本番用のメインネットと検証用のテストネットがあります。

Ethereum には複数のテストネットがあり、誰でもトークンをもらうことができます。

- Ropsten
- Rinkeby
- Kovan
- Goerli

スマートコントラクトをテストネットやメインネットにデプロイする方法を 2 つ紹介します。

- [Hardhat でテストネットにスマートコントラクトをデプロイしよう！](/posts/deploy-testnet)
- [Remix の使い方](/posts/remix-tutorial)
