---
title: "NFT プログラミング入門: OpenZeppelin ライブラリを使った ERC721 コントラクト"
date: 2022-05-02 20:00
permalink: /open-zeppelin-erc721
unlisted: true
tags:
  - Solidity
  - EVM
  - Rinkeby
  - ERC721
  - NFT
  - OpenZeppelin
description: |-
  OpenZeppelin のライブラリ を使って ERC721 のスマートコントラクトを実装
  初心者向け Solidity プログラミング学習
---

このページはこんな人におすすめ

- NFT のプログラミングを学習したい
- Solidity を学びたい
- 簡単なスマートコントラクトの作り方を知りたい
- Web3 エンジニアになりたい

[OpenZeppelin (ERC721)](https://docs.openzeppelin.com/contracts/4.x/erc721)

# 新しい Hardhat プロジェクトを作る

open-zeppelin-erc721 というディレクトリを作り
npm パッケージの hardhat をインストールします。

```
mkdir open-zeppelin-erc721
cd open-zeppelin-erc721
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

## OpenZeppelin ライブラリのインストール

```
npm install -D hardhat @openzeppelin/contracts
```

# コーディング

### contracts/GateItem.sol

```solidity
// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("GameItem", "ITM") {}

    function awardItem(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
        return newItemId;
    }
}

```

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

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.6",
};
```
