---
title: ゼロ知識証明を学ぼう | Web3 プログラミング, スマートコントラクト入門
date: 2022-05-20 12:00:00
tags:
  - ゼロ知識証明
description: |-
  ZKP (Zero Knowledge Proof) について YouTube や事例をもとに理解しよう。
  ZKU (Zero Knowledge University) で学んだり、Starkware ブロックチェーンで体験しよう。
---

# ゼロ知識証明とは？

ゼロ知識証明とは、大事な情報を公開せずに何かを証明するときに使います。

準同型暗号や秘密計算といった数学の理論をもとに研究が進んでおり、ブロックチェーン周りの開発でよく使われています。

開発するためには数学やプログラミング、あるいはブロックチェーンの知識が必要ですが、ゼロ知識証明の概念を理解したり実際に使うことは誰にでもできます。

### YouTube

YouTube のこの動画では、子供でもわかるようにゼロ知識証明を説明しています。

日本語字幕はまだありませんが、YouTube の自動翻訳を使えば理解の助けになると思います。

**[Computer Scientist Explains One Concept in 5 Levels of Difficulty | WIRED](https://www.youtube.com/watch?v=fOGdb1CTu5c)**

[![Computer Scientist Explains One Concept in 5 Levels of Difficulty | WIRED](http://img.youtube.com/vi/fOGdb1CTu5c/0.jpg)](https://www.youtube.com/watch?v=fOGdb1CTu5c)

# ゼロ知識証明を使った事例

ゼロ知識証明は、ブロックチェーンだけでなく既存の IT システムでも活用することができます。

台湾では、コロナ対策のためにゼロ知識証明や QR コードを使ってプライバシーを保護しながら個人情報を共有するシステムを開発して、社会に役立ったという事例があります。

**[ブロックチェーン的発想で社会を救う【オードリー・タン氏】](https://www.coindeskjapan.com/148317/)**

## Zero-Knowledge University (zku.ONE)

ZKU (Zero-Knowledge University) ではオンラインでゼロ知識証明を体系的に学ぶことができるようです。

筆者は受講していないので中身はわかっていませんが、2022 年時点でゼロ知識証明を学びたい人にとっては、ZKU がもっとも優れた環境の 1 つではないかと思います。

https://zku.one/

# Ethereum L2 におけるゼロ知識証明

Ethereum のエコシステムにはスケーリングの課題があります。イーサリアムが世界中で使われるようになるとたくさんの処理をさばかなければなりません。そのために Rollup という手法が考案されました。

Rollup とはレイヤー 2 というブロックチェーンを作りその上で行われる取引を集約してレイヤー 1 である Ethereum にまとめて記録する方法です。

Rollup は大きく分けて Optimistic Rollup と ZK Rollup の 2 つがありますが、ZK Rollup の ZK は(Zero Knowledge)であり、ゼロ知識証明を使います。

## SNARK と STARK

ZK Rollup で使うゼロ知識証明には SNARK と STARK の 2 つのタイプがあります。

## Starkware

https://starkware.co/starknet/

Starkware は、ゼロ知識証明を使った Ethereum の L2 (セカンドレイヤー) のブロックチェーンです。
