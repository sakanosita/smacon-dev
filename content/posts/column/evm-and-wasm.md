---
title: "EVM と WASM の違い | Web3 プログラミング, スマートコントラクト入門"
date: 2022-05-20 12:00:00
permalink: /evm-and-wasm
tags:
  - コラム
  - EVM
  - WASM
description: |-
  ブロックチェーンにおける EVM (Ethereum Virtual Machine) と WASM の特徴を学んで違いを理解しよう
---

この記事はこんな人にぴったり

- EVM と WASM の特徴を理解したい
- スマートコントラクト開発を始めたい
- Web3 エンジニアになりたい

# EVM と WASM の特徴

**EVM (Ethereum Virtual Machine)** と **WASM (Web Assembly)** はどちらもブロックチェーン上のスマートコントラクトを実行するための環境として使われています。

iPhone と Android に喩えるとわかりやすいかもしれません。

どちらで Dapps を開発することもできますが、それぞれのメリット・デメリットを考慮する必要があります。

## 代表的なブロックチェーン

**EVM**

- Ethereum
- Avalanche
- Polygon
- BNB Chain

**WASM**

- Solana
- NEAR
- Internet Computer

## 開発言語

EVM のスマートコントラクトは Solidity を使って開発します。

WASM はいろんなプログラミング言語を WASM にコンパイルすることができますが、代表的なものは Rust と C (C++) です。

## 誕生背景

EVM は名前の通り、Ethereum 上でスマートコントラクトを動かすために開発されました。

EVM と Solidity は Ethereum とともに開発されてきたので、ブロックチェーンやスマートコントラクトを実装するために最適化されています。

一方で、WASM はもともとブラウザで実行するプログラムのフォーマットとして設計されています。

## 互換性と拡張性

EVM は互換性が高いので、Ethereum 用に開発した Solidity のスマートコントラクトやライブラリ、開発ツールをほとんどそのまま他のチェーンでも使うことができます。

互換性が高いことはメリットにもなりますが、それが制約になってしまうというデメリットにつながります。

たとえばウォレットの機能やアカウントの権限を拡張したいと思っても EVM の仕様以外のことはできません。

そういった EVM のチェーンにできないことをできるようにしたチェーンの多くが採用しているのが WASM です。

## 相互運用

Solana や NEAR の Layer-2 として EVM に対応したり、Astar のように WASM と EVM の両方に対応するチェーンもあるので今後どうなるかはまだまだわかりません。
