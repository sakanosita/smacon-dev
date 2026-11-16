---
title: "ビットコインは量子コンピュータに耐えられるか？BIP-360・BIP-361 と移行の今後 | Web3 プログラミング, スマートコントラクト入門"
date: 2026-11-16 12:00:00
permalink: /bitcoin-quantum-resistance
tags:
  - Bitcoin
  - Quantum
  - Cryptography
description: |-
  量子コンピュータがビットコインの署名を破るリスクと、2026 年に進んだ BIP-360（P2MR）・BIP-361・SHRINCS などの量子耐性への移行提案を整理します。
---

量子コンピュータがビットコインを破る日は来るのか。この話題は長らく「遠い将来の話」として扱われてきました。

しかし 2026 年に入り、必要な量子コンピュータの規模の見積もりが大きく下がり、ビットコイン側でも具体的な移行提案が次々と出てきました。

この記事では、量子コンピュータの何がビットコインの脅威なのか、どのコインが危ないのか、そして開発者コミュニティがどんな対策を議論しているのかを整理します。

※この記事は投資助言ではありません。BTC への投資判断は、必ず一次情報や最新の動向を確認してください。

# 量子コンピュータの何が脅威なのか

ビットコインのセキュリティは、主に 2 つの暗号技術に支えられています。

- **ハッシュ関数（SHA-256 など）**: マイニングやアドレスの生成に使われる
- **デジタル署名（ECDSA / Schnorr）**: 「このコインの持ち主は自分だ」と証明するために使われる

量子コンピュータで特に問題になるのは、後者のデジタル署名です。

ビットコインの署名は、楕円曲線 secp256k1 の上で「公開鍵から秘密鍵を求めるのは事実上不可能」という性質に頼っています。

ところが、量子コンピュータで **ショアのアルゴリズム** を動かせると、この計算が現実的な時間で解けてしまいます。

つまり、公開鍵がわかれば秘密鍵が割り出され、コインを勝手に送金できるようになります。

一方、ハッシュ関数に対しては **グローバーのアルゴリズム** という攻撃がありますが、効果は計算量を平方根に減らす程度です。SHA-256 は量子コンピュータに対しても比較的安全と考えられています。

# 2026 年、脅威の見積もりが一気に縮まった

## Google の論文

2026 年 3 月、Google Quantum AI は Ethereum Foundation やスタンフォード大学と共同で、secp256k1 を破るのに必要な量子コンピュータの規模を見積もった論文を発表しました。

- **論理量子ビット**: 約 1,200〜1,450
- **物理量子ビット**: 50 万未満（超伝導方式）
- **攻撃時間**: 数十分程度

従来の見積もりは物理量子ビット約 100 万だったので、ほぼ半分になったことになります。

この論文は攻撃回路そのものを公開せず、「その規模で動く回路が存在する」ことだけをゼロ知識証明で示すという異例の形で発表されました。悪用を避けるための配慮です。

## 他の方式でも見積もりが出そろった

その後、別の方式の量子コンピュータでも見積もりが出ています。

- **IonQ（イオントラップ方式）**: 物理量子ビット約 2 万、1 回の攻撃に約 26 日
- **Caltech / Oratomic（中性原子方式）**: 物理量子ビット約 2.6 万、約 10 日

方式によって必要な量子ビット数と時間は大きく違いますが、どの方式でも必要な規模は下がり続けています。

ただし、これらはあくまで「これだけの装置があれば破れる」という計算上の見積もりです。そうした量子コンピュータは、現時点ではまだ存在しません。

# 危ないコインと比較的安全なコイン

量子コンピュータで秘密鍵を割り出すには、まず **公開鍵** が必要です。

そのため、リスクは「公開鍵がブロックチェーン上に見えているかどうか」で大きく変わります。

## 公開鍵が見えているコイン（危ない）

- **P2PK（初期のアドレス形式）**: 公開鍵そのものが記録されている。サトシ・ナカモトのものとされる約 110 万 BTC もここに含まれる
- **使い回されたアドレス**: 一度送金すると公開鍵が公開される。そのアドレスに残っている、または再び入金されたコインは危ない
- **Taproot（P2TR）**: 仕組み上、公開鍵がアドレスに含まれている

## 公開鍵が見えていないコイン（比較的安全）

- **P2PKH / P2WPKH などで、一度も送金していないアドレス**: アドレスは公開鍵のハッシュなので、使うまで公開鍵は見えない

ただし、送金するときには公開鍵がネットワークに流れます。量子コンピュータが十分に速くなると、取引がブロックに入るまでの間に秘密鍵を割り出される可能性もあります。

## どれくらいの BTC が危ないのか

見積もりは、数え方によって大きく異なります。

- **Google**: 約 690 万 BTC（アドレスの使い回しを含む）
- **Project Eleven**: 約 626 万 BTC
- **Glassnode**: 約 192 万 BTC（構造的に危ないものだけを数えた場合）
- **Bitcoin Magazine の分析**: 取引所などの事業者分を除くと約 228 万 BTC

事業者のコインは、対策が決まれば移行される可能性が高いです。

本当に問題になるのは、**持ち主が鍵を失くしたか、長年動いていない古いコイン** です。これらは移行されないまま残り続けます。

# 今出ている主な提案

## BIP-360（P2MR）: 量子に強いアドレス形式

BIP-360 は、量子耐性に向けた最初の正式な提案です。2026 年 2 月に BIP リポジトリに取り込まれました。

新しいアドレス形式 **P2MR（Pay-to-Merkle-Root）** を導入します。初期の草案では P2QRH と呼ばれていたため、古い記事ではこの名前が使われていることがあります。

P2MR は Taproot に似ていますが、量子に弱い「鍵で直接使うルート（key path）」を取り除き、スクリプトのルートだけを残した形です。

ただし、BIP-360 自体は新しい署名方式を追加しません。共著者たちも「第 1 段階」と位置づけていて、完全な量子耐性には量子耐性のある署名方式の導入が別途必要です。

## BIP-361: 古い署名の廃止と凍結

BIP-361 は、Jameson Lopp ら 6 人が 2026 年 4 月に提案した移行計画です。

段階的にユーザーを量子耐性アドレスへ移行させ、最終的には **ECDSA と Schnorr の署名を無効化** します。

その結果、期限までに移行されなかったコインは使えなくなります。事実上の凍結です。

Lopp は「量子コンピュータに盗まれるくらいなら、凍結したほうが被害は小さい」と主張しています。

一方、「ビットコインの財産権を侵害する」という強い反発もあり、Blockstream CEO の Adam Back は強制ではなく任意のアップグレードを支持しています。

## SHRINCS: 量子耐性のある署名方式

SHRINCS は、Blockstream の研究者らが 2026 年 8 月に BIP 草案として提案した署名方式です。

NIST が標準化したハッシュベース署名 **SLH-DSA** をもとにしています。ハッシュベースの署名は量子コンピュータにも強いと考えられていますが、署名サイズが大きいという欠点があります。

- **SLH-DSA をそのまま使った場合**: 署名が大きく、処理能力は約 0.36 tx/秒まで落ちる
- **SHRINCS**: 署名を小さくし、約 3 tx/秒まで戻す

現在のビットコインと比べるとまだ処理能力はかなり低く、セキュリティの証明や状態の管理など、未解決の課題も残っています。

## Hourglass V2: 大量売却を防ぐ

Hourglass V2 は、古い P2PK コインの使用を **1 ブロックにつき 1 BTC まで** に制限する提案です。

量子コンピュータで大量の古いコインが盗まれ、一気に売られて市場が崩れるのを防ぐことを狙っています。

## 提案のまとめ

| 提案         | 内容                                   | 状況（2026 年 10 月時点）                    |
| ------------ | -------------------------------------- | -------------------------------------------- |
| BIP-360      | 量子に強いアドレス形式 P2MR            | BIP リポジトリに入ったが draft。有効化は未定 |
| BIP-361      | 古い署名を廃止し、未移行のコインを凍結 | draft。強い反発あり                          |
| SHRINCS      | ハッシュベースの量子耐性署名           | BIP 草案                                     |
| Hourglass V2 | 古い P2PK コインの使用量を制限         | 提案段階                                     |

# 最大の論点：凍結するか、盗まれるに任せるか

技術的な課題以上に難しいのが、移行されない古いコインをどう扱うかです。

- **凍結する**: 盗まれるのは防げるが、「誰も他人のコインを止められない」というビットコインの原則を破る
- **何もしない**: 原則は守れるが、量子コンピュータを持つ攻撃者が古いコインを手に入れ、市場に流す可能性がある

サトシのものとされる約 110 万 BTC もこの問題に含まれるため、市場への影響も大きな話です。

どちらを選んでも誰かの財産権を損なうことになるため、Lopp も「どうすれば財産権の侵害を最小にできるか」という問題だと表現しています。

# これからの流れ

ビットコインのアップグレードは、コミュニティの合意がないと進みません。

BIP-360 の共著者 Hunter Beast は、合意ができてから移行が終わるまでに **約 7 年** かかると見ています。

今後は、次のような順番で議論が進むと考えられます。

1. 量子に強いアドレス形式（BIP-360）の合意と有効化
2. 量子耐性のある署名方式（SHRINCS など）の選定
3. ウォレットや取引所の対応と、ユーザーの移行
4. 古い署名と移行されないコインの扱い（BIP-361 など）

2026 年 10 月時点では、BIP-360 も BIP-361 も draft のままで、量子耐性のある署名方式で BIP 番号が付いたものもありません。

量子コンピュータの進歩と、ビットコインの合意形成のどちらが速いか。これから数年は、この競争を見ていくことになりそうです。

## ユーザーが今できること

- **アドレスを使い回さない**: 一度送金したアドレスに残高を残さない
- **自分のコインのアドレス形式を確認する**: P2PK や Taproot に大きな残高があるかどうか
- **ウォレットの対応状況を追う**: 量子耐性アドレスが使えるようになったら、移行を検討する

# 参考

- [Bitcoin Took Its First Step Against Quantum Computers - Forbes](https://www.forbes.com/sites/digital-assets/2026/02/23/bitcoin-took-its-first-step-against-quantum-computers/)
- [A look at post quantum proposals for Bitcoin - Project Eleven](https://www.projecteleven.com/blog/a-look-at-post-quantum-proposals-for-bitcoin)
- [Bitcoin's Quantum Migration Debate - Jameson Lopp](https://blog.lopp.net/bitcoin-quantum-migration-debate/)
- [Bitcoin's 'your keys, your coins' promise just got an expiry date - CoinDesk](https://www.coindesk.com/tech/2026/04/15/bitcoin-developers-are-trying-to-build-quantum-defenses-your-coins-could-pay-the-price)
- [Google's Quantum Breakthrough: What New ECC Attack Estimates Mean for Blockchain](https://www.postquantumsecurity.org/publications/google_ai_ecc_whitepaper.html)
- [IonQ secp256k1 Estimate - PostQuantum.com](https://postquantum.com/post-quantum/ionq-secp256k1-resource-estimate/)
- [OP_CHECKSHRINCS: A Hash-Based Signature Opcode for Post-Quantum Bitcoin - Blockstream](https://blog.blockstream.com/op_checkshrincs-a-hash-based-signature-opcode-for-post-quantum-bitcoin/)
- [Bitcoin researchers propose quantum fix that would not crowd out transactions - CoinDesk](https://www.coindesk.com/tech/2026/08/27/bitcoin-researchers-propose-quantum-fix-that-would-not-crowd-out-transactions)
- [Nearly 10% of Bitcoin supply structurally unsafe - Cointelegraph](https://cointelegraph.com/news/nearly-10-bitcoin-supply-structurally-unsafe-quantum-breakthrough-glassnode)
- [Inside Bitcoin's 7-Year Quantum Shield - Crypto Times](https://www.cryptotimes.io/insights/inside-bitcoins-7-year-quantum-shield-bip-360-and-bip-361-plan-to-save-a-1-5-trillion-network/)
