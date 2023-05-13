---
title: "Internet Computer 入門: メインネットにキャニスターをデプロイする手順"
date: 2023-05-13 12:00
permalink: /deploy-to-ic
tags:
  - Motoko
  - Internet Computer
social_image: /og/internet-computer-2.png
description: |-
  公式チュートリアルの日本語解説：Motoko のキャニスターをメインネットにデプロイしてみよう！
  Cycle を使ったキャニスターのデプロイと管理
---

この記事はこんな人にオススメ

- 自分の作ったキャニスターをインターネット上で公開したい
- Motoko エンジニア/プログラマになりたい
- Internet Computer (DFINITY) に興味がある
- ブロックチェーンや Dapps 開発に興味がある

当記事は、2023 年 5 月現在の DFINITY 公式のデプロイ手順をもとにした解説です。

[Deploying to Internet Computer](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet)

初めての方はローカルでのデプロイから始めるといいですよ。

[5 ステップではじめる Motoko プログラミング入門](/posts/hello-motoko)

# 前提

**筆者の実行環境**

- M1 Mac (macOS 12.5.1)
- dfx: 0.14.0
- Node.js: V18.16.0

**ICP / Cycle トークン**

公式手順どおりに進めるためには以下の２つが必要になります。

- A. ウォレットを作るための ICP トークン($1.5 相当)
- B. 2 つのキャニスターをデプロイするための Cycle (6.3 TCycle 程度)

B については開発者向けの Faucet で Cycle をもらえるので活用してください。

[Getting Started with Free Cycles](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet)

Faucet のしくみはたまに変わりますが、2023 年 5 月に筆者がもらった時は Discord で DM をやりとりしました。
ただし DM で誰かに ICP を直接送ってくれと言われたら、それは 99%詐欺なので気をつけましょう。

# 本日のゴール

当記事のゴールはシンプルです。まず２つのコマンドを示します。

```
# ローカル開発環境へのデプロイ
dfx deploy

# Internet Computerメインネットへのデプロイ
dfx deploy --network ic
```

違いは `--network ic` オプションをつけるかどうかです。
下のコマンドが成功すれば、メインネットにキャニスターをデプロイできます。

ソースコードを書いたりキャニスターをコンパイルするところまでは、ローカル開発でもメインネットでも同じです。

ただし、メインネットへのデプロイコマンドを実行するには Cycle ウォレットと Cycle トークンが必要となります。

# Cycle トークン・ウォレットとは

この記事を読んでいる人の多くはすでに ICP トークンは知っていると思いますが、Internet Computer でキャニスターを走らせるためには Cycle トークンが必要です。

Ethereum や Solana などほかの多くのブロックチェーンとは異なり Internet Computer は dApps の利用者(ユーザー)ではなく、dApps の運営者(開発者)が Gas を負担します。

[Internet Computer: Reverse Gas Model](https://internetcomputer.org/capabilities/reverse-gas/)

ここでは以下の 2 つの用途で Cycle を使用します。

- キャニスターを作成・デプロイする時の Cycle
- デプロイ後のキャニスターを走らせるための Cycle

Internet Computer のウォレット自体もキャニスターとして作られます。
Cycle ウォレットを作る前にウォレットの概念をイメージで掴んでおきましょう。

[dfx identity と ICP トークンと Cycle ウォレット](/posts/ledger-cycle-wallet)

# 注意事項

ICP や Cycle のレートは変動しており、キャニスターの作成に必要な ICP や Cycle の量も変動します。

ICP や Cycle を節約したい気持ちもありますが、ギリギリの量で作業を進めてコマンド実行に失敗すると Cycle は戻ってこない場合もあります。

また今後の IC や dfx の仕様変更でコマンドの実行結果が同じにならない可能性もあります。

オススメなのは、開発専用のウォレットになくなってもいいと思える $10 程度の ICP を用意しておくことです。

こういったリスクを理解した上ですべて自己責任で作業を進めてください。

# Deploying to Internet Computer

それでは実際に、公式のガイドに従って進めて行きましょう。
以下のような流れとなっています。(2023 年 5 月現在)

[Deploying to Internet Computer](https://internetcomputer.org/docs/current/developer-docs/setup/deploy-mainnet)

- Download and install
- Verify the SDK is ready to use
- Create a new project
- Check the connection to the IC mainnet
- Confirm your developer identity and ledger account
- Creating a Cycles Wallet
- Validate your cycles wallet
- Register, build, and deploy the application
- Test the dapp frontend

すでに dfx ツールまではインストール済みとして、「Create a new project」から始めます。

**Create a new project**

```
dfx new hello
cd hello
```

hello というプロジェクトを作ると、2 つのキャニスターのソースコードも自動で作られます。
もちろんソースコードをあなたの好きに変えても構いません。

- hello_frontend
- hello_backend

IC mainnet にこの 2 つのキャニスターをデプロイすることになります。

**Check the connection to the IC mainnet**

IC mainnet との疎通を確認します。

```log
hello % dfx ping ic
{
  "certified_height": 67799281  "ic_api_version": "0.18.0"  "impl_hash": "83128b3d340d81e601413dcebcbda3bdf0fd5dcb151f7cc0e43790cedd3e5f40"  "impl_version": "6d21535b301fee2ad3e8a0e8af2c3f9a3d022111"  "replica_health_status": "healthy"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 129, 76, 14, 110, 199, 31, 171, 88, 59, 8, 189, 129, 55, 60, 37, 92, 60, 55, 27, 46, 132, 134, 60, 152, 164, 241, 224, 139, 116, 35, 93, 20, 251, 93, 156, 12, 213, 70, 217, 104, 95, 145, 58, 12, 11, 44, 197, 52, 21, 131, 191, 75, 67, 146, 228, 103, 219, 150, 214, 91, 155, 180, 203, 113, 113, 18, 248, 71, 46, 13, 90, 77, 20, 80, 95, 253, 116, 132, 176, 18, 145, 9, 28, 95, 135, 185, 136, 131, 70, 63, 152, 9, 26, 11, 170, 174]
}
```

**Confirm your developer identity and ledger account**

Identity, Prncipal ID, Account ID を確認します。

```
dfx identity whoami
dfx identity get-principal
dfx ledger account-id
```

Identity は任意のものを使って進めてください。
公式手順では dfx インストール直後のまま進めるので default になっています。

- Principal ID
- Account ID

の 2 つは後で使うのでメモするか、このコマンドをいつでも使えるように覚えておきましょう。

次は ICP トークンの残高を確認します。

```
dfx ledger --network ic balance
```

```log
WARN: The default identity is not stored securely. Do not use it to control a lot of cycles/ICP. Create a new identity with `dfx identity new` and use it in mainnet-facing commands with the `--identity` flag
```

この時、WARN が表示されました。dfx identity を切り変える方法を勧めています。

もし、dfx identity を使い分けられる人はその方がより安全に運用できるのでそうしてください。

当記事ではなるべく公式手順どおりに進めたいので今後この WARN は無視します。

先ほどのコマンドを実行します。（実行結果の WARN を無視）

```
hello % dfx ledger --network ic balance
0.00000000 ICP
```

この時点ではまだ送金していないため 0.0 ICP の表示ですが、公式手順ではこのアカウントの ICP 残高が 10 ICP になっています。

```
hello % dfx ledger --network ic balance
10.00000000 ICP
```

これ以降の手順で ICP が必要になるので少量の ICP トークンを先ほどの Principal ID もしくは Account ID 宛に送金する必要があります。

以下のコマンドで表示されるあなたの Account ID (アドレス)に送りましょう。

```
dfx ledger --network ic account-id
```

ところで、公式手順の同じコマンドでは `--network ic` をつけていないことに気づきましたか？

じつは同じ秘密鍵を使えば Principal ID や Account ID はローカルでもメインネットでも同じ値になります。
試しに以下のように比較してみてください。

```
dfx ledger account-id
dfx ledger account-id --network ic
```

送金はどこから送っても大丈夫です。（例：NNS, Plug, NFID、取引所からの引き出し）

ぼくは自分の Plug ウォレット から dfx ledger の Account ID へ 0.3 ICP を送金しました。
送金後にもう一度 Ledger の残高を確認します。

```
hello % dfx ledger --network ic balance
0.30000000 ICP
```

この後の dfx 用のウォレットの作成には 0.7 TCycle ぐらい必要になるので、当記事ではこのうち 0.25 ICP($1.25 相当)を使います。

2023/5/12 現在のレート

- 1 ICP はおよそ $5
- 1 TCycle はおよそ $1.4

**Creating a Cycles Wallet**

2 つのコマンドを実行して Cycle ウォレットを作ります。
ここでのポイントは

- Cycle ウォレット自身もキャニスターである
- キャニスターの作成は Cycle で支払うが、まだ Cycle ウォレットがないので最初だけは ICP で払う

```bash
 % dfx ledger --network ic create-canister nmcsh-pngle-oimvf-zeu3q-jbynm-qw3vr-44mgt-biuks-xjweo-q2j36-vae --amount .28
Transfer sent at block height 6106475
Using transfer at block height 6106475
Canister created with id: "gi5zp-fyaaa-aaaap-qbfwa-cai "
```

さきほど Account ID に送った 0.3 ICP の中から 0.25 ICP を使ってウォレットを作ります。
この時に ICP が足りないとウォレットを作れません。

公式手順でも 0.25 ICP を使ってウォレットを作っていますが、法定通貨に対して ICP 高くなれば、もっと少ない ICP て良いはずです。
目安は $1 ~ $1.2 ぐらいの ICP です。

```bash
 % dfx identity --network ic deploy-wallet "gi5zp-fyaaa-aaaap-qbfwa-cai "
Creating a wallet canister on the ic network.
The wallet canister on the "ic" network for user "default" is "gi5zp-fyaaa-aaaap-qbfwa-cai "
```

わたしのウォレットのキャニスター ID は `gi5zp-fyaaa-aaaap-qbfwa-cai` で作られました。

**Validate your cycles wallet**

```
hello % dfx identity --network ic get-wallet
gi5zp-fyaaa-aaaap-qbfwa-cai
```

```
hello % dfx wallet --network ic balance
0.806 TC (trillion cycles).
```

今日現在の 0.25 ICP を使って作ったウォレットには 0.806 TCycle 入っています。

ブラウザでウォレットを管理するためのインターフェースがあります。

```
https://<WALLET-CANISTER-ID>.icp0.io
```

2023 年 5 月現在筆者環境でこの機能は動作確認できませんでした。
以前はこの機能を使えていましたが、おそらくウォレットの仕様のアップグレードの影響だと思います。

この機能が使えなくても先には進めるので、ここはいったん飛ばしましょう。
（後日、確認できたら記事を更新します）

**Deploy の前に Cycle を補充する**

キャニスターのデプロイの前に Cycle を追加で取得する必要があります。
この後で hello プロジェクトの 2 つのキャニスターを１発でデプロイするためには 6.3 TCycle 程度必要です。(2023 年 5 月現在)

公式ガイドの手順通りに簡単に進めるためにも Faucet を利用して 20 TCycle をもらうのがオススメです。

[Getting Started with Free Cycles](https://internetcomputer.org/docs/current/developer-docs/setup/cycles/cycles-faucet)

補足：公式ガイドの手順とは異なりますがキャニスター作成時に Cycle の量を指定することで利用する Cycle の量を調整することができます。また、終わったらキャニスターを Stop & Delete すればキャニスターに Deposit した Cycle をウォレットに引き出すこともできます。

なんらかの事情で Faucet から貰えない場合や、多少の ICP を消費してでもたくさんの Cycle が必要な場合は、[ICLight](https://avjzx-pyaaa-aaaaj-aadmq-cai.raw.ic0.app/account) などの dapps で ICP を Cycle に交換したり、Cycle を dfx identity の wallet に送金するといったことできます。

```
hello % dfx wallet --network ic balance
8.139 TC (trillion cycles).
```

筆者のウォレットには 8.139 TCycle 入れました。

**Register, build, and deploy the application**

いよいよ当記事のゴールとして紹介したデプロイのコマンドが登場します。

まずは Node.js のライブラリをインストールします。
はじめにプロジェクトを作るときにライブラリもインストール済みなので、ここではなにも起こらないかもしれません。

```log
hello % npm install

up to date, audited 406 packages in 461ms

69 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

さていよいよデプロイコマンドです。

```log
hello % dfx deploy --network ic
WARN: The batou identity is not stored securely. Do not use it to control a lot of cycles/ICP. Create a new identity with `dfx identity new` and use it in mainnet-facing commands with the `--identity` flag
Deploying all canisters.
Creating canisters...
Creating canister hello_backend...
hello_backend canister created on network ic with canister id: esbrt-3iaaa-aaaap-qbfza-cai
Creating canister hello_frontend...
hello_frontend canister created on network ic with canister id: evaxh-wqaaa-aaaap-qbfzq-cai
Building canisters...
Shrink WASM module size.
Building frontend...
WARN: Building canisters before generate for Motoko
WARN: .did file for canister 'hello_frontend' does not exist.
Shrink WASM module size.
Generating type declarations for canister hello_frontend:
  src/declarations/hello_frontend/hello_frontend.did.d.ts
  src/declarations/hello_frontend/hello_frontend.did.js
  src/declarations/hello_frontend/hello_frontend.did
Generating type declarations for canister hello_backend:
  src/declarations/hello_backend/hello_backend.did.d.ts
  src/declarations/hello_backend/hello_backend.did.js
  src/declarations/hello_backend/hello_backend.did

Installing canisters...
Installing code for canister hello_backend, with canister ID esbrt-3iaaa-aaaap-qbfza-cai
Installing code for canister hello_frontend, with canister ID evaxh-wqaaa-aaaap-qbfzq-cai
Uploading assets to asset canister...
Fetching properties for all assets in the canister.
Starting batch.
Staging contents of new and changed assets in batch 1:
  /favicon.ico 1/1 (15406 bytes) sha 4e8d31b50ffb59695389d94e393d299c5693405a12f6ccd08c31bcf9b58db2d4 (with 7 headers)
  /index.js.LICENSE.txt 1/1 (413 bytes) sha f2dcfd36875be0296e171d0a6b1161de82510a3e60f4d54cc1b4bec0829f8b33 (with 7 headers)
  /sample-asset.txt 1/1 (24 bytes) sha 2d523f5aaeb195da24dcff49b0d560a3d61b8af859cee78f4cff0428963929e6 (with 7 headers)
  /index.js.LICENSE.txt (gzip) 1/1 (273 bytes) sha db89b3ccdfe399f8ef3135c0b076326a0ae9e1c96409f79f8e686031537c572c (with 7 headers)
  /main.css (gzip) 1/1 (299 bytes) sha b4879e7ba34e68b2965d626e48d772ce615e4f6b78b69cc8f2f91127ed18b850 (with 7 headers)
  /logo2.svg 1/1 (15139 bytes) sha 037eb7ae523403daa588cf4f47a34c56a3f5de08a5a2dd2364839e45f14f4b8b (with 7 headers)
  /main.css 1/1 (537 bytes) sha 75ac0c5aea719bb2b887fffbde61867be5c3a9eceab3d75619763c28735891cb (with 7 headers)
  /index.html 1/1 (539 bytes) sha 053f9dc1283c64d114d43cbf03b0b0062afae08a04a5044ae58dbc68f4a1f93f (with 7 headers)
  /index.html (gzip) 1/1 (350 bytes) sha 16289744897bd78f5df24924dac6972c19e0bb56f5ddcf695de65656b942d769 (with 7 headers)
  /index.js (gzip) 1/1 (88324 bytes) sha 03dd42729ce7df78926af89d9da96020425bc2ec160328ae6106e23e1b398efd (with 7 headers)
  /index.js 1/1 (246603 bytes) sha 4224eb8e09f0b05e9077f0feb1f851d9594700d5bb08093e7bcd63f477833c4e (with 7 headers)
Committing batch.
Deployed canisters.
URLs:
  Frontend canister via browser
    hello_frontend: https://evaxh-wqaaa-aaaap-qbfzq-cai.icp0.io/
  Backend canister via Candid interface:
    hello_backend: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=esbrt-3iaaa-aaaap-qbfza-cai
```

デプロイできました！
いくつか WARN がありますが、無事にデプロイされるとこのようなログが表示されます。

公式手順ではデプロイした Canister に Cycle を追加する手順を紹介していますが、これは実行しなくても良いでしょう。

```
# 実行不要!!!
dfx ledger --network ic top-up gastn-uqaaa-aaaae-aaafq-cai --amount 1.005
```

バックエンドキャニスターを dfx コマンドで実行して確認します。

```
hello % dfx canister --network ic call hello_backend greet '("everyone": text)'
("Hello, everyone!")
```

つづいてブラウザからフロントエンドに繋いでみましょう！

**Test the dapp frontend**

公式ガイドが dfx の仕様に対して古いため、公式手順とは少し異なります。

デプロイしたときのログに hello_frontend の URL が表示されているのでそのままブラウザでアクセスすれば確認できます。

**https://<hello_frontend のキャニスター ID>.icp0.io/**

hello_frontend キャニスターの ID を知りたいときは

```
dfx canister id --network ic hello_frontend
```

![icp](/media/deploy-to-ic/1.png)

このようにブラウザで確認できれば成功です。

# おまけ: キャニスターの Cycle を引き出してウォレットに入れる

このまま終わっても良いですが、デプロイしたキャニスターにはそれぞれ 3 TCycle ほどデポジットされています。
キャニスターを削除すれば dfx identity の Cycle wallet に戻すことができます。

**Cycle ウォレットの残高確認**

```
% dfx wallet balance --network ic
1.939 TC (trillion cycles).
```

もともと 8.139 TC だったので 2 つのキャニスターのデプロイで 6.2 TC 消費したことになります。

**キャニスターのステータス確認**

```
dfx canister status hello_frontend --network ic
dfx canister status hello_backend --network ic
```

```
hello % dfx canister status hello_frontend --network ic
Canister status call result for hello_frontend.
Status: Running
Controllers: gi5zp-fyaaa-aaaap-qbfwa-cai nmcsh-pngle-oimvf-zeu3q-jbynm-qw3vr-44mgt-biuks-xjweo-q2j36-vae
Memory allocation: 0
Compute allocation: 0
Freezing threshold: 2_592_000
Memory Size: Nat(2209774)
Balance: 2_996_668_686_422 Cycles
Module hash: 0xe7866e1949e3688a78d8d29bd63e1c13cd6bfb8fbe29444fa606a20e0b1e33f0
```

キャニスターの Balance を見るとおよそ 3TCycle デポジットされていることを確認できます。

**キャニスターの停止**

Status=Running のままだとキャニスターを削除できないので、先に stop にします。

```
dfx canister stop hello_frontend --network ic
dfx canister stop hello_backend --network ic
```

**キャニスターの削除**

```
dfx canister delete hello_frontend --network ic
dfx canister delete hello_backend --network ic
```

**Cycle ウォレットの残高確認**

```
hello % dfx wallet balance --network ic
7.887 TC (trillion cycles).
```

デプロイ前後で消費した分: 6.2 TC

8.139（デプロイ前）- 1.939 (デプロイ後)

削除前後でウォレットに戻った分: 5.948 TC

1.939 (削除前) - 7.887（削除後

全体で消費した量: 0.252 TC

6.2 - 5.948 or 8.139 - 7.88

おわり！
よかったらシェアしてください
