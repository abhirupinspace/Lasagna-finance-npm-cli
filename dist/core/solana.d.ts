import { PublicKey, Transaction } from '@solana/web3.js';
import { ArbitrageConfig } from './types';
export declare class SolanaService {
    private connection;
    private keypair;
    constructor(config: ArbitrageConfig);
    get publicKey(): PublicKey;
    getBalance(): Promise<number>;
    requestAirdrop(amount: number): Promise<string>;
    sendTransaction(transaction: Transaction): Promise<string>;
}
