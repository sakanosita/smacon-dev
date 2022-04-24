---
title: "NEAR Protocol: はじめてのスマートコントラクト in Rust"
date: 2022-04-18 19:38
permalink: /first-smart-contract-near
redirect_from:
  - /first-smart-contract-near
  - /first-smart-contract-near/
pinned: 22
tags:
  - NEAR
  - Rust
  - WASM
description: |-
  RustのスマートコントラクトをNEARにデプロイしよう！
  はじめてNEAR Protocolで開発する方の最初の一歩
---

このページはこんな人におすすめ

- Rust で簡単なスマートコントラクトを実装してみたい
- NEAR Protocol に興味がある

このページは、NEAR Protocol の Rust のチュートリアルを日本語で解説しています。

[Building a Smart Contract in Rust](https://docs.near.org/docs/develop/contracts/rust/intro)

## 事前準備

NEAR のテストネット用のアカウントとテストネットの NEAR トークンが必要です。

https://wallet.testnet.near.org/

## 実行環境

- macOS 11.5.2
- npm 8.5.1
- rustup: 1.24.3
- rustc: 1.60.0
- cargo: 1.60.0

## near-cli のインストール

開発用の Mac へ NEAR の開発ツール near-cli をインストールします。

```
$ npm install -g near-cli
```

成功すると以下のように near コマンドを実行できるようになります。

```
$ near --version
3.2.0
```

## 新しいプロジェクトの作成

cargo コマンドで新しいプロジェクトを作ります。

```
$ cargo new rust-counter-tutorial
$ cd rust-counter-tutorial
```

以下のようなファイルが作られます。

```
.
├── Cargo.toml
└── src
   └── main.rs
```

## ソースコード

自動生成されたファイルから以下のようにファイルを作り変えます。

```
.
├── Cargo.toml
└── src
   └── lib.rs
```

### Cargo.toml

```toml
[package]
name = "rust-counter-tutorial"
version = "0.1.0"
authors = ["NEAR Inc <hello@near.org>"]
edition = "2018"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
near-sdk = "3.1.0"

[profile.release]
codegen-units = 1
# Tell `rustc` to optimize for small code size.
opt-level = "z"
lto = true
debug = false
panic = "abort"
# Opt into extra safety checks on arithmetic operations https://stackoverflow.com/a/64136471/249801
overflow-checks = true
```

### src/lib.rs

````rust

//! This contract implements simple counter backed by storage on blockchain.
//!
//! The contract provides methods to [increment] / [decrement] counter and
//! [get it's current value][get_num] or [reset].
//!
//! [increment]: struct.Counter.html#method.increment
//! [decrement]: struct.Counter.html#method.decrement
//! [get_num]: struct.Counter.html#method.get_num
//! [reset]: struct.Counter.html#method.reset

use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::{env, near_bindgen};

near_sdk::setup_alloc!();

// add the following attributes to prepare your code for serialization and invocation on the blockchain
// More built-in Rust attributes here: https://doc.rust-lang.org/reference/attributes.html#built-in-attributes-index
#[near_bindgen]
#[derive(Default, BorshDeserialize, BorshSerialize)]
pub struct Counter {
    // See more data types at https://doc.rust-lang.org/book/ch03-02-data-types.html
    val: i8, // i8 is signed. unsigned integers are also available: u8, u16, u32, u64, u128
}

#[near_bindgen]
impl Counter {
    /// Returns 8-bit signed integer of the counter value.
    ///
    /// This must match the type from our struct's 'val' defined above.
    ///
    /// Note, the parameter is `&self` (without being mutable) meaning it doesn't modify state.
    /// In the frontend (/src/main.js) this is added to the "viewMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near view counter.YOU.testnet get_num
    /// ```
    pub fn get_num(&self) -> i8 {
        return self.val;
    }

    /// Increment the counter.
    ///
    /// Note, the parameter is "&mut self" as this function modifies state.
    /// In the frontend (/src/main.js) this is added to the "changeMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near call counter.YOU.testnet increment --accountId donation.YOU.testnet
    /// ```
    pub fn increment(&mut self) {
        // note: adding one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        // e.g. self.val = i8::wrapping_add(self.val, 1);
        // https://doc.rust-lang.org/std/primitive.i8.html#method.wrapping_add
        self.val += 1;
        let log_message = format!("Increased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }

    /// Decrement (subtract from) the counter.
    ///
    /// In (/src/main.js) this is also added to the "changeMethods" array
    /// using near-cli we can call this by:
    ///
    /// ```bash
    /// near call counter.YOU.testnet decrement --accountId donation.YOU.testnet
    /// ```
    pub fn decrement(&mut self) {
        // note: subtracting one like this is an easy way to accidentally overflow
        // real smart contracts will want to have safety checks
        // e.g. self.val = i8::wrapping_sub(self.val, 1);
        // https://doc.rust-lang.org/std/primitive.i8.html#method.wrapping_sub
        self.val -= 1;
        let log_message = format!("Decreased number to {}", self.val);
        env::log(log_message.as_bytes());
        after_counter_change();
    }

    /// Reset to zero.
    pub fn reset(&mut self) {
        self.val = 0;
        // Another way to log is to cast a string into bytes, hence "b" below:
        env::log(b"Reset counter to zero");
    }
}

// unlike the struct's functions above, this function cannot use attributes #[derive(…)] or #[near_bindgen]
// any attempts will throw helpful warnings upon 'cargo build'
// while this function cannot be invoked directly on the blockchain, it can be called from an invoked function
fn after_counter_change() {
    // show helpful warning that i8 (8-bit signed integer) will overflow above 127 or below -128
    env::log("Make sure you don't overflow, my friend.".as_bytes());
}

/*
 * the rest of this file sets up unit tests
 * to run these, the command will be:
 * cargo test --package rust-counter-tutorial -- --nocapture
 * Note: 'rust-counter-tutorial' comes from cargo.toml's 'name' key
 */

// use the attribute below for unit tests
#[cfg(test)]
mod tests {
    use super::*;
    use near_sdk::MockedBlockchain;
    use near_sdk::{testing_env, VMContext};

    // part of writing unit tests is setting up a mock context
    // in this example, this is only needed for env::log in the contract
    // this is also a useful list to peek at when wondering what's available in env::*
    fn get_context(input: Vec<u8>, is_view: bool) -> VMContext {
        VMContext {
            current_account_id: "alice.testnet".to_string(),
            signer_account_id: "robert.testnet".to_string(),
            signer_account_pk: vec![0, 1, 2],
            predecessor_account_id: "jane.testnet".to_string(),
            input,
            block_index: 0,
            block_timestamp: 0,
            account_balance: 0,
            account_locked_balance: 0,
            storage_usage: 0,
            attached_deposit: 0,
            prepaid_gas: 10u64.pow(18),
            random_seed: vec![0, 1, 2],
            is_view,
            output_data_receivers: vec![],
            epoch_height: 19,
        }
    }

    // mark individual unit tests with #[test] for them to be registered and fired
    #[test]
    fn increment() {
        // set up the mock context into the testing environment
        let context = get_context(vec![], false);
        testing_env!(context);
        // instantiate a contract variable with the counter at zero
        let mut contract = Counter { val: 0 };
        contract.increment();
        println!("Value after increment: {}", contract.get_num());
        // confirm that we received 1 when calling get_num
        assert_eq!(1, contract.get_num());
    }

    #[test]
    fn decrement() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter { val: 0 };
        contract.decrement();
        println!("Value after decrement: {}", contract.get_num());
        // confirm that we received -1 when calling get_num
        assert_eq!(-1, contract.get_num());
    }

    #[test]
    fn increment_and_reset() {
        let context = get_context(vec![], false);
        testing_env!(context);
        let mut contract = Counter { val: 0 };
        contract.increment();
        contract.reset();
        println!("Value after reset: {}", contract.get_num());
        // confirm that we received -1 when calling get_num
        assert_eq!(0, contract.get_num());
    }
}
````

## テストとビルド

以下のコマンドでプログラムのテストを実行できます。

```
$ cargo test -- --nocapture
```

以下のコマンドでソースコードから WASM モジュールをコンパイルします。

```
$ cargo build --target wasm32-unknown-unknown --release
```

## NEAR テストネットへのデプロイ

テストネットにログインします。

```
$ near login
```

ビルドした WASM のスマートコントラクトを NEAR テストネットにデプロイします。

```
$ near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_counter_tutorial.wasm --accountId YOUR_ACCOUNT_HERE
```

例として sakanosita.testnet を指定する場合

```
e.g.
$ near deploy --wasmFile target/wasm32-unknown-unknown/release/rust_counter_tutorial.wasm --accountId sakanosita.testnet
```

## 実行

デプロイしたスマートコントラクトを実行してみましょう。
get_mum を実行すると現在のカウンタの値を表示して、increment を call するとカウンタを+1 します。

```
$ near view YOUR_ACCOUNT_HERE get_num --accountId YOUR_ACCOUNT_HERE
$ near call YOUR_ACCOUNT_HERE increment --accountId YOUR_ACCOUNT_HERE
```

例として increment の実行前後に get_num を実行すると以下のようになります。

```
e.g.
$ near view sakanosita.testnet get_num --accountId sakanosita.testnet
View call: sakanosita.testnet.get_num()
5

$ near call sakanosita.testnet increment --accountId sakanosita.testnet
Scheduling a call: sakanosita.testnet.increment()
Doing account.functionCall()
Receipt: FrzjQZfPNiHAZCcf9oGUWMG6NKDZRZLktS8LFYZAzjtW
        Log [sakanosita.testnet]: Increased number to 6
        Log [sakanosita.testnet]: Make sure you don't overflow, my friend.
Transaction Id 7dkK3Gmf1ANubsgK4vVsifnVqNqDdcFuC97i9VucyUtE
To see the transaction in the transaction explorer, please open this url in your browser
https://explorer.testnet.near.org/transactions/7dkK3Gmf1ANubsgK4vVsifnVqNqDdcFuC97i9VucyUtE
''

$ near view sakanosita.testnet get_num --accountId sakanosita.
View call: sakanosita.testnet.get_num()
6

```
