import { PublicKey } from '@solana/web3.js';

export interface CustomError {
  message: string;
}

export interface ArbitrageConfig {
  network: string;
  rpcUrl?: string;
  walletPath?: string;
  minProfitThreshold: number;
}

export interface TokenPair {
  tokenA: PublicKey;
  tokenB: PublicKey;
}

export interface PriceData {
  dex: string;
  pair: TokenPair;
  price: number;
  timestamp: number;
}

export interface TradeOpportunity {
  buyDex: string;
  sellDex: string;
  profit: number;
  volume: number;
  timestamp: number;
}