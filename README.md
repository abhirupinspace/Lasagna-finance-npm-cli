# Lasagna Finance CLI

A powerful CLI tool for testing Solana arbitrage strategies on local validator and devnet.

## Installation

```bash
npm install -g @lasagna-finance/cli
```

## Quick Start

1. Initialize the CLI:
```bash
lasagna init
```

2. Start monitoring prices:
```bash
lasagna monitor
```

3. Check wallet status:
```bash
lasagna wallet status
```

## Features

- Local validator support
- Devnet testing
- Real-time price monitoring
- Simulated arbitrage execution
- Wallet management
- Easy configuration

## Commands

- `lasagna init` - Initialize configuration
- `lasagna monitor` - Start price monitoring
- `lasagna wallet` - Wallet management commands
  - `status` - Check wallet status
  - `airdrop` - Request devnet SOL
  - `create` - Create new wallet

## Development

```bash
git clone 
cd lasagna-finance-cli
npm install
npm run dev
```