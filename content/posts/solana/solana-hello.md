---
title: "はじめての Solana: Rust で Hello World!"
date: 2022-04-19 21:00
permalink: /solana-hello
pinned: 23
tags:
  - Solana
  - Rust
  - WASM
description: |-
  Solana で Rust のスマートコントラクトを作ろう！
  Solana 公式の Hello World のチュートリアルから必要なコードだけを抜粋
  初心者の Web3 プログラミング学習
---

このページはこんな人におすすめ

- Rust で簡単なスマートコントラクトを実装してみたい
- Solana に興味がある

このページは、Solana の Hello World を日本語で解説します。

https://docs.solana.com/developing/on-chain-programs/examples

はじめにドキュメント通りの手順を一通り行ったあとで、後半では必要最小限のコードだけを抽出して、ラップされているビルドやデプロイのコマンドを紹介しています。

## 事前準備

Solana の devnet または testnet を使います。devnet や testnet のトークンが必要ですが無料で取得できます。
はじめての方はこちらのページをご覧ください。

[Solana 開発のための環境構築](/posts/solana-config)

## 実行環境

- macOS 11.5.2
- npm 8.5.1
- solana-cli 1.8.5

## ドキュメントの手順を一通りやってみる

まずはドキュメントの通りに一通りやってみましょう。
Solana Labs の example-helloworld というプロジェクトがあります。
これを git clone します。

```
% git clone https://github.com/solana-labs/example-helloworld.git
% cd example-helloworld
```

[README](https://github.com/solana-labs/example-helloworld) に書かれているように、npm でライブラリをインストールします。

```
% npm install
```

README では localhost でテスト用の環境を作って deploy していますが、筆者の M1 Mac では localhost でうまく動かないので、testnet にデプロイします。

筆者の solana-cli の config では以下のように設定しています。

```
% solana config get
Config File: /Users/sakanosita/.config/solana/cli/config.yml
RPC URL: https://api.testnet.solana.com
WebSocket URL: wss://api.devnet.solana.com/ (computed)
Keypair Path: /Users/sakanosita/.config/solana/Kagetoki.json
Commitment: confirmed
```

プロジェクトに最初から用意されている、Rust のコードをビルドします。

```
% npm run build:program-rust
```

devnet にデプロイします。

```
% solana program deploy dist/program/helloworld.so
Program Id: HLBxKXnRMaoBxWs3GxUMR78k9if1if7UPqWUJqGGAhCw
```

実行してみましょう。

```
% npm run start

> helloworld@0.0.1 start
> ts-node src/client/main.ts

Let's say hello to a Solana account...
Connection to cluster established: https://api.testnet.solana.com { 'feature-set': 1122441720, 'solana-core': '1.10.8' }
Using account 9HTsYGKHNBjHDnChwVBtdn6f61gWFnSuc5yYfixL1Wfp containing 0.1551188 SOL to pay for fees
Using program HLBxKXnRMaoBxWs3GxUMR78k9if1if7UPqWUJqGGAhCw
Creating account CFWdJJs3ixaLZevwirLHQCpRLKuhB9oDfqryBneA2YX8 to say hello to
Saying hello to CFWdJJs3ixaLZevwirLHQCpRLKuhB9oDfqryBneA2YX8
CFWdJJs3ixaLZevwirLHQCpRLKuhB9oDfqryBneA2YX8 has been greeted 1 time(s)
Success

```

これで testnet にデプロイした helloworld というスマートコントラクトを正常に実行できました。
Testnet のエクスプローラで Program Id を検索するとログを見ることができます。

https://explorer.solana.com/address/HLBxKXnRMaoBxWs3GxUMR78k9if1if7UPqWUJqGGAhCw?cluster=testnet

続いて、ここまでの手順を分解してゼロからコードを作ってみましょう。

# プロジェクトの作成

新しい Cargo プロジェクトを作ります。

Solana Labs の example では C 言語と Rust 言語の両方のソースコードが入っていましたが、
今回は Rust だけのプロジェクトを作りましょう！

プロジェクト名は rust-hello-world にします。

```
% cargo new rust-hello-world
% cd rust-hello-world
```

以下のようなファイルが作られています。

```
.
├── Cargo.toml
└── src
    └── main.rs
```

# コーディング

## Cargo.toml

```toml
[package]
name = "rust-hello-world"
version = "0.0.1"
description = "Example template program written in Rust"
authors = ["Solana Maintainers <maintainers@solana.com>"]
repository = "https://github.com/smacon-dev/solana"
license = "Apache-2.0"
homepage = "https://smacon.dev/"
edition = "2022"

[features]
no-entrypoint = []

[dependencies]
borsh = "0.9.3"
borsh-derive = "0.9.1"
solana-program = "~1.8.14"

[dev-dependencies]
solana-program-test = "~1.8.14"
solana-sdk = "~1.8.14"

[lib]
name = "helloworld"
crate-type = ["cdylib", "lib"]

```

## src/lib.rs

```rust
use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

/// Define the type of state stored in accounts
#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct GreetingAccount {
    /// number of greetings
    pub counter: u32,
}

// Declare and export the program's entrypoint
entrypoint!(process_instruction);

// Program entrypoint's implementation
pub fn process_instruction(
    program_id: &Pubkey, // Public key of the account the hello world program was loaded into
    accounts: &[AccountInfo], // The account to say hello to
    _instruction_data: &[u8], // Ignored, all helloworld instructions are hellos
) -> ProgramResult {
    msg!("Hello World Rust program entrypoint");

    // Iterating accounts is safer than indexing
    let accounts_iter = &mut accounts.iter();

    // Get the account to say hello to
    let account = next_account_info(accounts_iter)?;

    // The account must be owned by the program in order to modify its data
    if account.owner != program_id {
        msg!("Greeted account does not have the correct program id");
        return Err(ProgramError::IncorrectProgramId);
    }

    // Increment and store the number of times the account has been greeted
    let mut greeting_account = GreetingAccount::try_from_slice(&account.data.borrow())?;
    greeting_account.counter += 1;
    greeting_account.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Greeted {} time(s)!", greeting_account.counter);

    Ok(())
}

// Sanity tests
#[cfg(test)]
mod test {
    use super::*;
    use solana_program::clock::Epoch;
    use std::mem;

    #[test]
    fn test_sanity() {
        let program_id = Pubkey::default();
        let key = Pubkey::default();
        let mut lamports = 0;
        let mut data = vec![0; mem::size_of::<u32>()];
        let owner = Pubkey::default();
        let account = AccountInfo::new(
            &key,
            false,
            true,
            &mut lamports,
            &mut data,
            &owner,
            false,
            Epoch::default(),
        );
        let instruction_data: Vec<u8> = Vec::new();

        let accounts = vec![account];

        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            0
        );
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            1
        );
        process_instruction(&program_id, &accounts, &instruction_data).unwrap();
        assert_eq!(
            GreetingAccount::try_from_slice(&accounts[0].data.borrow())
                .unwrap()
                .counter,
            2
        );
    }
}
```

# ビルド＆デプロイ

先程は、npm でラップしてビルドしていましたが、実際にビルドで使われているのは Rust の 開発ツールの cargo コマンドです。

cargo のマニフェスト Cargo.toml はカレントディレクトリにある場合は、指定する必要はありません。
出力先のディレクトリだけ指定しましょう。

```
% cargo build-bpf --bpf-out-dir=dist/program
```

solana-cli で devnet または testnet にデプロイします。

```
% solana program deploy dist/program/helloworld.so
```

# クライアント用ディレクトリの作成

Solana のスマートコントラクトは TypeScript(JavaScript)から実行します。

先ほどの Cargo プロジェクトの中にクライアントプログラム用のディレクトリを作成します。

```
% mkdir client
% cd client
```

# npm ライブラリのインストール

以下のコマンドを実行してライブラリをインストールします。

```
% npm install -D typescript ts-node @types/mz
% npm install @solana/web3.js yaml
```

すると以下のように package.json ができます。

```json
{
  "devDependencies": {
    "@types/mz": "^2.7.4",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.3"
  },
  "dependencies": {
    "@solana/web3.js": "^1.39.1",
    "yaml": "^2.0.1"
  }
}
```

# コーディング（クライアント）

`client/src`ディレクトリの中に３つの TypeScript ファイルを作ります。

- main.ts
- hello_world.ts
- utils.ts

Solana Labs の [example](https://github.com/solana-labs/example-helloworld/tree/master/src/client) をコピーしましょう。

```
client % tree src
src
├── hello_world.ts
├── main.ts
└── utils.ts
```

# 実行

カレントディレクトリが client ディレクトリの状態で npx コマンドを使って ts-node を実行します。

```
 % npx ts-node src/main.ts
Let's say hello to a Solana account...
Connection to cluster established: https://api.testnet.solana.com { 'feature-set': 1122441720, 'solana-core': '1.10.8' }
Using account 9HTsYGKHNBjHDnChwVBtdn6f61gWFnSuc5yYfixL1Wfp containing 1.61226932 SOL to pay for fees
Using program 52cSCaoULTpw1HrUHUnjAYHq6jTeVWLoWWj3MvazCbSs
Saying hello to Aw6Pwy8mQQBBaK4UcMUgF4UzZGFWqUKUfDLdR3jjYXZm
Aw6Pwy8mQQBBaK4UcMUgF4UzZGFWqUK
```

これで実行完了です。

この記事で使った実際のコードは[GitHub](https://github.com/smacon-dev/solana/tree/main/rust-hello-world)で公開しています。
