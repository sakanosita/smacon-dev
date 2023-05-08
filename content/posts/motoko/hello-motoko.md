---
title: 5ステップではじめる Motoko プログラミング | DFINITY ICP 入門
date: 2023-04-29 20:30
permalink: /hello-motoko
redirect_from:
  - /hello-motoko/
  - /blog/hello-motoko/
pinned: 3
level: beginner
tags:
  - Motoko
  - Internet Computer
  - DFINITY
social_image: /og/internet-computer-2.png
description: |-
  DFINITY の Internet Computer (ICP) を使ったキャニスター開発をはじめよう！
  初心者向け Motoko 言語のプログラミングの学習, DFINITY 公式チュートリアルを日本語で解説。
---

この記事はこんな人におすすめです

- Motoko エンジニア/プログラマを目指している(初心者)
- Internet Computer に興味がある
- ブロックチェーンや Dapps 開発に興味がある
- 将来 Web エンジニアになりたい

# はじめに

当記事で紹介する５つのステップは、DFINITY の公式ページに簡潔にまとまっています。

[Deploy your first ICP dapp in 5 minutes](https://internetcomputer.org/docs/current/tutorials/deploy_sample_app)

Internet Computer は 2021 年 5 月にローンチしたサービスで、これまでの一般的な Web 開発をもっとシンプルに変えてくれます。

インターネットそのものを TCP/IP のレイヤーから見直して再設計しており、裏側ではブロックチェーンやゼロ知識証明、秘密分散といった暗号技術を組み合わせて使っています。

誰でもパソコンさえあれば簡単に始めることができるので、まずは実際にやってみましょう。

## 必要なスキル、前提知識

当記事を進めるためには、以下のスキルが必要です。

- ターミナル等を使ってコマンドを入力できる（必須）
- npm コマンドを実行できる（任意）

コマンドは、cd と ls が使えれば大丈夫です。

ステップ 5 でライブラリを使うために npm が登場しますが、必須ではありません。
ブラウザ経由でスマートコントラクトを実行するために npm を使っています。
npm がわからなくてもステップ 4 までは進めらるので、スマートコントを実行することができます。

## 実行環境

本記事では以下の Mac 環境を使った開発を紹介しています。

- macOS: 12.5.1 Monterey
- dfx: 0.14.0
- node: v16.9.1
- npm: 7.21.1

# ステップ 1: dfx(SDK)をインストールする

ターミナルソフトで以下のコマンドを実行します。

```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

これで SDK のインストールは完了です。
dfx コマンドを実行できるようになります。

```bash
$ dfx --version
dfx 0.14.0
```

# ステップ 2: Hello World プロジェクトを作る

自分の好きな作業用ディレクトリを作って移動します。ぼくは dfinity というディレクトリを作っています。

```bash
mkdir dfinity
cd dfinity
```

dfinity ディレクトリの中に hello という名前の Hello World プロジェクトを作ります。

```bash
dfx new hello
```

少し時間がかかって以下のような画面が表示されます。

```bash
added 405 packages, and audited 406 packages in 35s

69 packages are looking for funding
  run `npm fund` for details

  Done.
Creating git repository...

===============================================================================
        Welcome to the internet computer developer community!
                        You're using dfx 0.14.0

            ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄                ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
        ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄      ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
       ▄▄▄▄▄▄▄▄▄▄▀▀▀▀▀▄▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄▄▀▀▀▀▀▀▄▄▄▄▄▄▄▄▄▄
      ▄▄▄▄▄▄▄▄▀         ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀         ▀▄▄▄▄▄▄▄▄▄
     ▄▄▄▄▄▄▄▄▀            ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀             ▄▄▄▄▄▄▄▄
     ▄▄▄▄▄▄▄▄               ▀▄▄▄▄▄▄▄▄▄▄▄▄▀                ▄▄▄▄▄▄▄
     ▄▄▄▄▄▄▄▄                ▄▄▄▄▄▄▄▄▄▄▄▄                 ▄▄▄▄▄▄▄
     ▄▄▄▄▄▄▄▄               ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄              ▄▄▄▄▄▄▄▄
      ▄▄▄▄▄▄▄▄           ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄          ▄▄▄▄▄▄▄▄▀
      ▀▄▄▄▄▄▄▄▄▄▄     ▄▄▄▄▄▄▄▄▄▄▄▄▀ ▀▄▄▄▄▄▄▄▄▄▄▄▄    ▄▄▄▄▄▄▄▄▄▄▄
       ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀     ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀
         ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀         ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
           ▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀▀             ▀▀▄▄▄▄▄▄▄▄▄▄▄▄▄▄▀
              ▀▀▀▀▀▀▀▀▀▀▀                    ▀▀▀▀▀▀▀▀▀▀▀



To learn more before you start coding, see the documentation available online:

- Quick Start: https://internetcomputer.org/docs/current/tutorials/deploy_sample_app
- SDK Developer Tools: https://internetcomputer.org/docs/current/developer-docs/setup/install/
- Motoko Language Guide: https://internetcomputer.org/docs/current/motoko/main/about-this-guide
- Motoko Quick Reference: https://internetcomputer.org/docs/current/motoko/main/language-manual
- Rust CDK Guide: https://internetcomputer.org/docs/current/developer-docs/backend/rust/

If you want to work on programs right away, try the following commands to get started:

    cd hello
    dfx help
    dfx new --help

===============================================================================

```

tree コマンドで hello ディレクトリにどんなファイルが作られたのか見てみましょう。

```bash
 % tree -L 1 hello
hello
├── README.md
├── dfx.json
├── node_modules
├── package-lock.json
├── package.json
├── src
└── webpack.config.js

```

# ステップ 3: ローカル実行環境を起動する

hello ディレクトリに移動して、ローカル PC 上のテスト用 IC 環境を起動します。

```bash
cd hello
dfx start --background
```

以下のようなログが表示されます。

```
hello % dfx start --background
Running dfx start for version 0.14.0
Using the default definition for the 'local' shared network because /Users/sakanosita/.config/dfx/networks.json does not exist.
Dashboard: http://localhost:50362/_/dashboard
```

一番最後にダッシュボードの URL が表示されるので、ブラウザでアクセスすると以下のような画面をみることができます。

[http://localhost:50362/\_/dashboard](http://localhost:50362/_/dashboard)
(ポート番号は環境によって変わるかもしれません)

![icp](/media/hello-motoko/3.png)

これであなたの PC 上にテスト用の Internet Computer が起動できました。
`dfx ping` コマンドを打つと、つながるかどうか疎通を確認できます。

```ts
hello % dfx ping
{
  "ic_api_version": "0.18.0"  "impl_hash": "8907d861e568171490efc74e7ae687d55aa5f9497a6a2c686d6d5df44556cbe1"  "impl_version": "0.8.0"  "replica_health_status": "healthy"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 141, 64, 198, 109, 225, 153, 11, 113, 230, 222, 56, 48, 71, 153, 112, 178, 173, 86, 211, 60, 12, 231, 13, 125, 156, 66, 122, 226, 136, 220, 145, 107, 67, 209, 92, 234, 13, 147, 150, 135, 133, 121, 210, 157, 252, 255, 145, 72, 5, 183, 206, 73, 251, 86, 146, 45, 184, 209, 49, 205, 249, 143, 71, 220, 150, 179, 252, 110, 159, 186, 61, 71, 62, 231, 247, 254, 69, 151, 122, 34, 197, 194, 95, 122, 178, 117, 71, 169, 142, 189, 94, 202, 77, 77, 151, 197]
}
```

上記のようにエラーではなく JSON フォーマットの謎の数字が返ってきたら成功です。

# ステップ 4: ビルドしてデプロイする

以下のコマンドを実行してフロントエンド用のライブラリをインストールします。

```
npm install
```

npm を使って JavaScript のライブラリをインストールしています。

フロントエンドのプログラムは Chrome などのブラウザで実行することになるので、DFINITY の場合でも、そうじゃなくても同じ JavaScript を使います。

続いて、Hello World プログラムをビルドしてローカル実行環境にデプロイします。

```
dfx deploy
```

このコマンドの最後に出力されるログをメモしておきましょう。
具体的には以下のように表示された URL にあとえブラウザからアクセスします。

```
Deployed canisters.
URLs:
  Frontend canister via browser
    hello_frontend: http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai
  Backend canister via Candid interface:
    hello_backend: http://127.0.0.1:4943/?canisterId=be2us-64aaa-aaaaa-qaabq-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai
```

この `dfx deploy` コマンドでは、以下の 3 つのことをまとめてやってくれます。

- ローカル実行環境にキャニスターを作る（ID を取得する）
- Motoko で書いたソースコードをコンパイルして、WASM 実行プログラムを作る
- WAS 実行プログラムをキャニスターにインストールする

キャニスターや WASM について今はわからなくても大丈夫です。この３つはそれぞれ以下のコマンドで個別に実行することができます。

- dfx canister create
- dfx build
- dfx canister install

dfx deploy はこの３つをまとめて、しかも終わっていないところだけを実行してくれる便利なコマンドです。

# ステップ 5: Hello World プログラムを実行する

以下のコマンドを実行すると、ローカル PC 上の Internet Computer で動くキャニスターを実行することができます。

```
dfx canister call hello_backend greet everyone
```

このコマンドの意味は以下のとおりです。

- キャニスターの別名: hello_backend
- 実行する関数(命令): greet
- 関数に渡す値: everyone

```
$ dfx canister call hello_backend greet everyone
("Hello, everyone!")
```

### 解説

本来 Internet Computer 上でキャニスターを指定する場合はキャニスター ID を使います。
しかし、dfx コマンドの機能として、キャニスター ID に名前をつけて使うことができます。
キャニスターの名前は、dfx.json によってつけられており、
キャニスター ID との紐付けは `./.dfx/local/canister_ids.json` で確認できます。

今後は、作ったプログラムをブラウザで呼び出してみましょう。
フロントエンドのプログラムを起動します

```
npm start
```

先ほどメモしておいた、`dfx deploy` の出力に含まれる URL にアクセスしてください。

<http://127.0.0.1:4943/?canisterId=(キャニスターID)>

![icp](/media/hello-motoko/1.png)

名前をいれてクリックしてみましょう、先程ローカルの IC にデプロイしたキャニスターを実行して結果をブラウザで表示します。

![icp](/media/hello-motoko/2.png)

今は、ローカル PC 上の実行環境にデプロイしたプログラム（キャニスター）を呼び出しています。

これから ICP トークンや Cycle トークンを使って、インターネット上の Internet Computer にキャニスターをデプロイすることで、世界中のどこからでも自分の作るキャニスターを呼び出せるようになります。

Internet Computer の世界へようこそ

公式のチュートリアルや Examples を日本語で解説しています。

- [DFINITY プロジェクトの始め方](/posts/motoko-explore-hello)
- [はじめてのアクター](/posts/motoko-actor-hello)
- [パラメータを渡してキャニスターを実行する](/posts/motoko-location-hello)
- [Candid UI を使ってキャニスターを実行する](/posts/motoko-my-counter)
- [簡単な数値計算](/posts/motoko-calc)
- [ライブラリを使って簡単な電話帳アプリを作ろう](/posts/motoko-phonebook)
- [複数のアクター&キャニスター](/posts/motoko-multiple-actors)
- [キャニスター間の関数呼び出し](/posts/motoko-linkedup)
- [ID とアクセス管理](/posts/access-hello)
- [CYCLE ウォレットとキャニスター](/posts/cycles-hello)
