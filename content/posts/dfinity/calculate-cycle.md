---
title: "キャニスターをメインネットへデプロイしたらガス代いくらかかるか計算してみた | Internet Computer (DFINITY)"
date: 2023-05-20 10:00
permalink: /calculate-cycle
tags:
  - Internet Computer
  - DFINITY
  - Cycle
social_image: /og/ledger-cycle-wallet.png
description: |-
  Internet Computer (DFINITY ICP) のメインネットに実際にキャニスターをデプロイしたときにかかったGas代をもとに、公式ドキュメントとXDRレートから日本円でいくらかかるか計算してみた
---

この記事はこんな方にオススメ

- Internet Computer メインネットにキャニスターをデプロイしたい
- ガス代(Cycle)の計算方法を知りたい
- Motoko エンジニアになりたい

こちらの記事で実際に IC メインネットに 2 つのキャニスターをデプロイしたら 0.252 TCycle かかりました。

[メインネットにキャニスターをデプロイする手順](/posts/deploy-to-ic)

実際にかかったコストをもとに公式の Gas 代のガイドを紐解いていきたいと思います。

[Gas/Cycles cost](https://internetcomputer.org/docs/current/developer-docs/gas-cost)

まずは Cycle の単位に慣れていきましょう。

## Cycle の単位

**単位の省略形**

- 1 KC (Thousand/Kilo Cycle) = 1,000 Cycle
- 1 MC (Million Cycle) = 1,000,000 Cycle
- 1 BC (Billion Cycle) = 1,000,000,000 Cycle
- 1 TC (Trillion Cycle) = 1,000,000,000,000 Cycle

**Cycle の価値（通貨レート）**

Cycle は IMF の Special Drawing Rights (SDR)に紐づきます。
SDR は XDR とも表記されます。

1 TC = 1 XDR の固定レートです。

Cycle の場合は法定通貨にペッグしているので、ICP の価格に左右されません。
法定通貨にペッグしている背景には、IC ノードの運営にはインターネットコストや電気代がかかるため、安定した運営を目指すといった理由があります。

SDR の構成比は IMF が公表しています。

[IMF 理事会、５年ごとの SDR 評価見直しを完了 SDR 価値バスケットの新しい比重を決定](https://www.imf.org/ja/News/Articles/2022/05/14/pr22153-imf-board-concludes-sdr-valuation-review)

- 米ドル　 43.38％
- ユーロ　 29.31％
- 中国人民元　 12.28％
- 日本円　 7.59％
- 英ポンド　 7.44％

1 XDR はおよそ $1.4 で日本円だとおよそ 180 円です。（2023-05-20 現在）
当記事では便宜上 1 XDR ≒ 180 円します。

**TC を基準に計算する**

公式のガス代のテーブルにはさまざまな単位が登場しますが、日本円でいくらかかるかを知りたい場合は TC を基準に考えると良いでしょう。

[Gas/Cycles cost](https://internetcomputer.org/docs/current/developer-docs/gas-cost)

1 XDR = 1 TC は固定なので、1 TC ≒ 180 円となります。

- 100 BC = 0.1 TC およそ 18 円
- 10 BC = 0.01 TC およそ 1.8 円
- 1 BC 以下なら 1 円未満
