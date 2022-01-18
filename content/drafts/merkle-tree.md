---
title: "Solidity入門: マークル木(Merkle Tree)"
date: 2022-01-18 08:00
permalink: /merkle-tree
tags:
  - Solidity
  - Merkle Tree
  - jp
description: |-
  Solidity by ExmaplesのMerkle Treeのコントラクトを作ります
---

このページはこんな人におすすめ

- Solidity を学びたい
- マークルツリーについて知りたい
- 簡単なスマートコントラクトの作り方を知りたい

Solidity by Example のサンプルコードを使ってスマートコントラクトを作る方法を解説します。

[Merkle Tree (Solidity by Examples)](https://solidity-by-example.org/app/merkle-tree/)

Hardhat を使ったことがない方はこちらからどうぞ

[Hardhat でスマートコントラクトを作ろう！](/hardhat)

このページで実際に使ったソースコードは[GitHub](https://github.com/smacon-dev/solidity-example/tree/main/merkle-tree)からダウンロードできます。

## 新しいプロジェクトを作る

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

## コーディング

contracts/MerkleTree.sol と hardhat.config.js を編集します。
2 つの Solidity バージョンが一致するようにしましょう。

#### contracts/MerkleTree.sol

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

#### hardhat.config.js

```js
require("@nomiclabs/hardhat-waffle");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.9",
};
```

## コンパイル

コンパイルしてみましょう。

```
npx hardhat compile
```

```
（出力）
Compiling 1 file with 0.8.9
Compilation finished successfully
```

## 検証
