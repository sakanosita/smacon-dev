---
title: "Solidity 入門: Merkle Proof（マークルツリーと Keccak256）"
date: 2022-04-18 08:00
permalink: /merkle-tree
redirect_from:
  - /merkle-tree
  - /merkle-tree/
social_image: /media/merkle-tree/4.png
pinned: 1
tags:
  - Solidity
  - Ethereum
  - EVM
  - Merkle Tree
description: |-
  ブロックチェーンのスマートコントラクトで使うマークルツリーとは？
  Keccak256 のサンプルコードを使ってツリー構造データのハッシュを計算してみよう
  初心者向けの Web3 プログラミング学習
---

![Merkle Tree](/media/merkle-tree/2.png)

このページはこんな人におすすめ

- Solidity を学びたい
- マークルツリーについて知りたい
- Keccak256 ハッシュ関数ってなに？

Solidity by Example のサンプルコードを使ってスマートコントラクトを作る方法を解説します。

[Merkle Tree (Solidity by Examples)](https://solidity-by-example.org/app/merkle-tree/)

Hardhat を使ったことがない方はこちらからどうぞ

[Hardhat でスマートコントラクトを作ろう！](/posts/hardhat)

このページで実際に使ったソースコードは[GitHub](https://github.com/smacon-dev/solidity-example/tree/main/merkle-tree)からダウンロードできます。

# 新しいプロジェクトを作る

merkle-tree というディレクトリを作り
npm パッケージの hardhat をインストールします。

```
mkdir merkle-tree
cd merkle-tree
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

contracts/MerkleTree.sol と hardhat.config.js を編集します。
2 つの Solidity バージョンが一致するようにしましょう。

### contracts/MerkleTree.sol

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract MerkleProof {
    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf,
        uint256 index
    ) public pure returns (bool) {
        bytes32 hash = leaf;

        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (index % 2 == 0) {
                hash = keccak256(abi.encodePacked(hash, proofElement));
            } else {
                hash = keccak256(abi.encodePacked(proofElement, hash));
            }

            index = index / 2;
        }

        return hash == root;
    }
}

contract TestMerkleProof is MerkleProof {
    bytes32[] public hashes;

    constructor() {
        string[4] memory transactions = [
            "alice -> bob",
            "bob -> dave",
            "carol -> alice",
            "dave -> bob"
        ];

        for (uint256 i = 0; i < transactions.length; i++) {
            hashes.push(keccak256(abi.encodePacked(transactions[i])));
        }

        uint256 n = transactions.length;
        uint256 offset = 0;

        while (n > 0) {
            for (uint256 i = 0; i < n - 1; i += 2) {
                hashes.push(
                    keccak256(
                        abi.encodePacked(
                            hashes[offset + i],
                            hashes[offset + i + 1]
                        )
                    )
                );
            }
            offset += n;
            n = n / 2;
        }
    }

    function getRoot() public view returns (bytes32) {
        return hashes[hashes.length - 1];
    }

    /* verify
    3rd leaf
    0x1bbd78ae6188015c4a6772eb1526292b5985fc3272ead4c65002240fb9ae5d13

    root
    0x074b43252ffb4a469154df5fb7fe4ecce30953ba8b7095fe1e006185f017ad10

    index
    2

    proof
    0x948f90037b4ea787c14540d9feb1034d4a5bc251b9b5f8e57d81e4b470027af8
    0x63ac1b92046d474f84be3aa0ee04ffe5600862228c81803cce07ac40484aee43
    */
}

```

### hardhat.config.js

```js
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
};
```

# Keccak256 のハッシュを検証しよう

今回は、Hardhat のテスト機能で verify()関数を実行してハッシュの値を検証しながら、マークル木を理解していきましょう。
test/merkleTree.js を以下のように編集します。

### test/merkleTree.js

```js
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MerkleProof.verify()", function () {
  it("Should return true", async function () {
    const MerkleProofFactory = await hre.ethers.getContractFactory(
      "MerkleProof"
    );
    const merkleProof = await MerkleProofFactory.deploy();
    await merkleProof.deployed();

    expect(
      await merkleProof.verify(
        [
          "0x948f90037b4ea787c14540d9feb1034d4a5bc251b9b5f8e57d81e4b470027af8",
          "0x63ac1b92046d474f84be3aa0ee04ffe5600862228c81803cce07ac40484aee43",
        ],
        "0x074b43252ffb4a469154df5fb7fe4ecce30953ba8b7095fe1e006185f017ad10",
        "0x1bbd78ae6188015c4a6772eb1526292b5985fc3272ead4c65002240fb9ae5d13",
        2
      )
    ).to.equal(true);
  });
});
```

以下のコマンドでテストを実行します。

```
npx hardhat test
```

```
（出力）
  MerkleProof.verify()
    ✓ Should return true (396ms)

  1 passing (397ms)
```

上のように`1 passing`と表示されれば、テストが期待通りであることがわかります。

# Merkle Proof の解説

このプログラムでは Keccak256 とマークル木いう 2 つのアルゴリズムを使います。

## Keccak256

Keccak256 はハッシュ関数です。

Keccak256 のほかによく使われるハッシュ関数は SHA-1 や MD5 などがあり、ファイル破損をチェックするときに使ったりします。

ブロックチェーンで使う Keccak256 は、スーパーコンピュータ並の計算能力を使っても任意のハッシュ値からもとの値を計算できない特徴があります。

## マークル木

マークル木はデータ構造を表しています。
![Merkle Tree](/media/merkle-tree/4.png)

根(root)が上、葉(leaf)が下にあるので、実際の木とは上下が反対です。

## verify()関数

このページで作る MerkleProof コントラクトの verify() 関数の目的は、keccak256 によって leaf と proof から計算した root のハッシュ値が引数と一致することです。
一致すれば true 一致しなければ false を返します。

verify()関数には、4 つの引数を渡します。

- bytes32[] memory proof,
- bytes32 root,
- bytes32 leaf,
- uint256 index

先頭の proof は配列なので、可変個の値を渡すことができます。

テストコードではそれぞれ以下の値を渡します。
上図のマークル木は leaf が 4 つあり、その中の node3 という leaf をここで使います。

- proof:
  - ["0x948f...", "0x63ac..."]
- root:
  - "0x074b..."
- leaf:
  - "0x1bbd..."
- index:
  - 2

index は leaf が左から何番目かを表します。一番左の node1 は 0 なので、node3 は 2 です。

|       | index |
| ----- | :---: |
| node1 |   0   |
| node2 |   1   |
| node3 |   2   |

## ハッシュ関数の計算のもとになる値

今回は 2 つのハッシュ値をつなげて新しいハッシュ値を計算しています。
以下の流れで 2 回のハッシュ計算を行うと、root を計算できます。

1. node3 と node4 をつなげて node6 を計算する
2. node5 と node6 をつなげて root を計算する

引数で渡した proof[0]が node4、proof[1]が node5 です。

2 つのハッシュ値をつなげるときに、index が奇数が偶数かによって左右が決まります。

```
            if (index % 2 == 0) {
```

式を眺めたり頭で考えてもよくわかりませんが、8 つぐらいの Leaf を使って実際に計算してみてください。
Leaf の index を 2 で割りながら root に向かっていくとうまくいくことがわかります。

| index | 1 回目の剰余 | 2 回目の剰余 | 3 回目の剰余 |
| ----- | ------------ | ------------ | ------------ |
| 0     | 0            | 0            | 0            |
| 1     | 1            | 0            | 0            |
| 2     | 0            | 1            | 0            |
| 3     | 1            | 1            | 0            |
| 4     | 0            | 0            | 1            |
| 5     | 1            | 0            | 1            |
| 6     | 0            | 1            | 1            |
| 7     | 1            | 1            | 1            |

2 回目以降は、前回の商を 2 で割った余りが奇数か偶数かを判断します。
剰余が 0 のときは、leaf を左に、1 のときは leaf を右につなげます。

## Keccak256 Online

Keccak256 のハッシュはブラウザで計算することができるので実際にコピペしてみると、Solidity で計算した Keccak256 と一致することがわかります。

https://emn178.github.io/online-tools/keccak_256.html

ハッシュ値の先頭の `0x` は 16 進数を表すプレフィクスなので値を計算するときには外します。

### 1. "1bbd..." と　"948f..." をつなげて node6 のハッシュ"90ed..."を計算

<!--
- IN
  - `1bbd78ae6188015c4a6772eb1526292b5985fc3272ead4c65002240fb9ae5d13948f90037b4ea787c14540d9feb1034d4a5bc251b9b5f8e57d81e4b470027af8`
- OUT:
  - `90ed7ad0524bf73e077fe6d49abe1fb1629f9843ca60d89ebf0ca88601a19bca` -->

### 2. "63ac..."と 1 で計算した"90ed..."をつなげて root のハッシュを計算

<!-- - IN
  - `63ac1b92046d474f84be3aa0ee04ffe5600862228c81803cce07ac40484aee4390ed7ad0524bf73e077fe6d49abe1fb1629f9843ca60d89ebf0ca88601a19bca`
- OUT
  - `074b43252ffb4a469154df5fb7fe4ecce30953ba8b7095fe1e006185f017ad10` -->

node5 と node6 から計算した"074b..."が root のハッシュ値です。

Solidity の keccak256() と[Keccak256 Online](https://emn178.github.io/online-tools/keccak_256.html)
で計算したハッシュ値が一致していることを確認できました。
