---
title: "Can Bitcoin Survive Quantum Computers? BIP-360, BIP-361, and the Road to Migration | Web3 Programming & Smart Contracts"
date: 2026-11-16 12:00:00
permalink: /bitcoin-quantum-resistance
tags:
  - Bitcoin
  - Quantum
  - Cryptography
description: |-
  The risk that quantum computers break Bitcoin's signatures, and the quantum-resistance proposals that advanced in 2026: BIP-360 (P2MR), BIP-361, SHRINCS, and more.
---

Will quantum computers ever break Bitcoin? For a long time, this was treated as a problem for the distant future.

In 2026, however, estimates of the quantum computer needed for an attack dropped sharply, and concrete migration proposals started appearing on the Bitcoin side one after another.

This article explains what exactly makes quantum computers a threat to Bitcoin, which coins are at risk, and what countermeasures the developer community is discussing.

Note: This article is not investment advice. Always check primary sources and the latest developments before making any decisions about BTC.

# What makes quantum computers a threat?

Bitcoin's security rests mainly on two kinds of cryptography.

- **Hash functions (SHA-256 and others)**: used for mining and for generating addresses
- **Digital signatures (ECDSA / Schnorr)**: used to prove "I own this coin"

The real problem with quantum computers is the second one: digital signatures.

Bitcoin's signatures rely on the elliptic curve secp256k1, where deriving a private key from a public key is practically impossible.

But a quantum computer running **Shor's algorithm** could solve that problem in a realistic amount of time.

In other words, anyone who knows your public key could work out your private key and spend your coins.

Hash functions, on the other hand, face **Grover's algorithm**, which only reduces the work to its square root. SHA-256 is considered relatively safe even against quantum computers.

# 2026: the threat estimates shrank fast

## Google's paper

In March 2026, Google Quantum AI, together with the Ethereum Foundation and Stanford University, published a paper estimating the size of quantum computer needed to break secp256k1.

- **Logical qubits**: about 1,200–1,450
- **Physical qubits**: under 500,000 (superconducting)
- **Attack time**: on the order of tens of minutes

Earlier estimates were around 1 million physical qubits, so this roughly cut the requirement in half.

Unusually, the paper did not publish the attack circuits themselves. It only used a zero-knowledge proof to show that circuits of that size exist, as a precaution against misuse.

## Estimates for other architectures

Estimates for other kinds of quantum computers followed.

- **IonQ (trapped ion)**: about 20,000 physical qubits, roughly 26 days per attack attempt
- **Caltech / Oratomic (neutral atom)**: about 26,000 physical qubits, roughly 10 days

The required qubit counts and run times vary widely by architecture, but in every case the required scale keeps falling.

Keep in mind that these are theoretical estimates of what a machine of that size could break. No such quantum computer exists today.

# Coins at risk, and coins that are relatively safe

To derive a private key with a quantum computer, an attacker first needs the **public key**.

So the risk depends heavily on whether the public key is visible on the blockchain.

## Coins with a visible public key (at risk)

- **P2PK (an early address format)**: the public key itself is recorded on-chain. This includes the roughly 1.1 million BTC attributed to Satoshi Nakamoto
- **Reused addresses**: spending from an address reveals its public key. Any coins left in that address, or sent to it again, are at risk
- **Taproot (P2TR)**: by design, the public key is part of the address

## Coins without a visible public key (relatively safe)

- **P2PKH / P2WPKH addresses that have never spent**: the address is a hash of the public key, so the key stays hidden until the coins are spent

However, the public key is broadcast to the network when you send a transaction. If quantum computers become fast enough, the private key could be derived in the window before the transaction is confirmed in a block.

## How much BTC is at risk?

Estimates vary widely depending on how you count.

- **Google**: about 6.9 million BTC (including reused addresses)
- **Project Eleven**: about 6.26 million BTC
- **Glassnode**: about 1.92 million BTC (counting only structurally exposed coins)
- **Bitcoin Magazine's analysis**: about 2.28 million BTC after excluding exchanges and other operational entities

Coins held by businesses are likely to be migrated once a solution is decided.

The real problem is **old coins whose owners have lost their keys or that haven't moved in years**. These will stay where they are, unmigrated.

# The main proposals so far

## BIP-360 (P2MR): a quantum-resistant output type

BIP-360 is the first formal proposal toward quantum resistance. It was merged into the BIPs repository in February 2026.

It introduces a new output type, **P2MR (Pay-to-Merkle-Root)**. Early drafts called it P2QRH, so older articles may use that name.

P2MR is similar to Taproot, but removes the quantum-vulnerable key path and keeps only the script path.

BIP-360 does not add a new signature scheme by itself, though. Its authors describe it as "step one"; full quantum resistance also requires adopting a quantum-resistant signature scheme.

## BIP-361: sunsetting old signatures and freezing coins

BIP-361 is a migration plan proposed in April 2026 by Jameson Lopp and five co-authors.

It moves users to quantum-resistant addresses in stages, and eventually **invalidates ECDSA and Schnorr signatures**.

As a result, coins that are not migrated by the deadline become unspendable. In effect, they are frozen.

Lopp argues that freezing coins does less damage than letting them be stolen by a quantum computer.

The proposal has also drawn strong pushback as a violation of Bitcoin property rights. Blockstream CEO Adam Back favors optional upgrades over forced ones.

## SHRINCS: a quantum-resistant signature scheme

SHRINCS is a signature scheme that Blockstream researchers and others proposed as a draft BIP in August 2026.

It is based on **SLH-DSA**, a hash-based signature scheme standardized by NIST. Hash-based signatures are considered resistant to quantum computers, but their signatures are large.

- **Using SLH-DSA as is**: large signatures cut throughput to about 0.36 tx/s
- **SHRINCS**: shrinks the signatures and brings throughput back to about 3 tx/s

That is still far below Bitcoin's current throughput, and open issues remain, including security proofs and state management.

## Hourglass V2: preventing a mass sell-off

Hourglass V2 proposes limiting spending from old P2PK coins to **1 BTC per block**.

The goal is to stop a market crash if a quantum computer steals a large number of old coins and dumps them all at once.

## Summary of proposals

| Proposal     | What it does                                     | Status (as of October 2026)                       |
| ------------ | ------------------------------------------------ | ------------------------------------------------- |
| BIP-360      | Quantum-resistant output type P2MR               | In the BIPs repo, still draft. Activation not set |
| BIP-361      | Sunsets old signatures, freezes unmigrated coins | Draft. Strong opposition                          |
| SHRINCS      | Hash-based quantum-resistant signatures          | Draft BIP                                         |
| Hourglass V2 | Limits how fast old P2PK coins can be spent      | Proposal stage                                    |

# The biggest question: freeze them, or let them be stolen?

Harder than any technical challenge is deciding what to do with old coins that never get migrated.

- **Freeze them**: prevents theft, but breaks Bitcoin's principle that no one can stop anyone else's coins
- **Do nothing**: keeps the principle, but an attacker with a quantum computer could take the old coins and dump them on the market

The roughly 1.1 million BTC attributed to Satoshi falls into this group too, so the market impact is significant.

Either choice harms someone's property rights. Lopp frames it as a question of how to minimize total property-rights violations.

# What comes next

Bitcoin upgrades only move forward with community consensus.

BIP-360 co-author Hunter Beast estimates that migration will take **about seven years** from the point consensus is reached.

The discussion is likely to proceed in roughly this order:

1. Agreement on and activation of a quantum-resistant output type (BIP-360)
2. Choosing a quantum-resistant signature scheme (SHRINCS or others)
3. Support from wallets and exchanges, and migration by users
4. Deciding what to do with old signatures and unmigrated coins (BIP-361 and others)

As of October 2026, both BIP-360 and BIP-361 are still drafts, and no quantum-resistant signature scheme has received a BIP number.

Which will move faster: quantum computing, or Bitcoin's consensus process? That race is worth watching over the next few years.

## What users can do now

- **Don't reuse addresses**: don't leave a balance in an address you have already spent from
- **Check your address types**: see whether you hold large balances in P2PK or Taproot addresses
- **Follow your wallet's support**: once quantum-resistant addresses are available, consider migrating

# References

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
