---
title: 5ステップではじめる Motoko プログラミング ICP 入門 | DFINITY
date: 2022-05-24 09:38
permalink: /hello-motoko
redirect_from:
  - /hello-motoko/
  - /blog/hello-motoko/
pinned: 11
level: beginner
tags:
  - Motoko
  - Internet Computer
  - DFINITY
social_image: /og/internet-computer-2.png
description: |-
  Internet Computer を使ったキャニスター開発をはじめよう！
  初心者向けの Motoko プログラミングの学習, DFINITY 公式のチュートリアルを日本語で解説。
---

この記事はこんな人におすすめです

- Motoko でプログラミングを学びたい初心者
- Internet Computer に興味がある
- ブロックチェーンや Dapps 開発に興味がある
- 将来 Web エンジニアになりたい

# はじめに

当記事で紹介する５つのステップは、DFINITY の公式ページに簡潔にまとまっています。

[Deploy a "Hello World" Dapp in 10 Minutes](https://internetcomputer.org/docs/current/developer-docs/quickstart/hello10mins)

Internet Computer は 2021 年 5 月にローンチしたサービスで、これまでの一般的な Web 開発をもっとシンプルに変えてくれます。

インターネットそのものを TCP/IP のレイヤーから見直して再設計しており、裏側ではブロックチェーンや高度な暗号技術を使っています。

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

- Mac OS 11.4 Big Sur
- テキストエディタ：Visual Studio Code 1.59
- ターミナルソフト：iTerm2 3.4.8
- dfx：0.8.0
- npm：7.19.1

# ステップ 1: dfx(SDK)をインストールする

ターミナルソフトで以下のコマンドを実行します。

```bash
sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

これで SDK のインストールは完了です。
dfx コマンドを実行できるようになります。

```bash
$ dfx --version
dfx 0.8.0
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
cd hello
```

ls コマンドでどんなファイルがあるか見てみましょう。

```bash
$ ls
README.md dfx.json dist node_modules package-lock.json package.json src webpack.config.js
```

# ステップ 3: ローカル実行環境を起動する

hello ディレクトリにいる状態で、ローカル PC 上で実行環境を起動します。

```bash
dfx start --background
```

以下のようなログが表示されると思います。

```
 Aug 15 07:21:45.751 INFO Starting server. Listening on http://127.0.0.1:8000/
```

これであなたの PC 上にテスト用の Internet Computer が起動できました。以下のように dfx ping コマンドを打つと、つながるかどうか疎通確認できます。

```ts
$ dfx ping
{
  "ic_api_version": "0.18.0"  "impl_hash": "1d09d8fdb066fbcffb985723d80d1f5f9a9de13d96e5917bfe457f4137c0dff8"  "impl_version": "0.8.0"  "root_key": [48, 129, 130, 48, 29, 6, 13, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1, 6, 12, 43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1, 3, 97, 0, 164, 194, 27, 103, 26, 186, 6, 75, 190, 145, 12, 226, 253, 93, 187, 228, 81, 124, 224, 79, 94, 196, 17, 45, 223, 7, 30, 230, 145, 43, 245, 255, 2, 2, 226, 148, 7, 241, 59, 108, 130, 103, 65, 134, 33, 88, 43, 10, 12, 123, 233, 74, 119, 101, 238, 144, 133, 101, 128, 190, 155, 19, 56, 154, 43, 253, 112, 146, 58, 236, 130, 163, 147, 61, 25, 163, 243, 23, 253, 84, 170, 3, 60, 72, 199, 18, 205, 111, 243, 90, 241, 137, 121, 21, 58, 168]
}
```

上記のようにエラーではなく JSON フォーマットの謎の数字が返ってきたら成功です。

# ステップ 4: ビルドしてデプロイする

hello ディレクトリにいる状態で、以下のコマンドを実行してフロントエンド用のライブラリをインストールします。

```
npm install
```

npm を使って JavaScript のライブラリをインストールしています。

フロントエンドのプログラムは Chrome などのブラウザで実行することになるので、DFINITY の場合でも、そうじゃなくても同じ JavaScript を使います。

続いて、Hello World プログラムをビルドしてローカル実行環境にデプロイします。

```
dfx deploy
```

このコマンドでは、以下の 3 つのことをまとめてやってくれます。

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
dfx canister call hello greet everyone
```

hello というキャニスターの greet という命令を、everyone というパラメータで実行しています。下のように結果が返ってきたら成功です！

```
$ dfx canister call hello greet everyone
("Hello, everyone!")
```

作ったプログラムをブラウザで呼び出してみましょう。

フロントエンドのプログラムを起動します

```
npm start
```

以下の URL にブラウザでアクセスして、起動したフロントエンド用のページにアクセスします。

<http://localhost:8080>

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
