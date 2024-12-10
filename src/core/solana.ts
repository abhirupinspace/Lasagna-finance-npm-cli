import {
    Connection,
    Keypair,
    PublicKey,
    LAMPORTS_PER_SOL,
    Transaction
  } from '@solana/web3.js';
  import { ArbitrageConfig } from './types';
  import { NETWORKS, CONNECTION_CONFIG } from './constants';
  import * as fs from 'fs';
  
  export class SolanaService {
    private connection: Connection;
    private keypair: Keypair;
    
    constructor(config: ArbitrageConfig) {
      const rpcUrl = config.rpcUrl || NETWORKS[config.network];
      this.connection = new Connection(rpcUrl, CONNECTION_CONFIG);
      
      if (config.walletPath) {
        const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(config.walletPath, 'utf-8')));
        this.keypair = Keypair.fromSecretKey(secretKey);
      } else {
        this.keypair = Keypair.generate();
      }
    }
  
    get publicKey(): PublicKey {
      return this.keypair.publicKey;
    }
  
    async getBalance(): Promise<number> {
      return await this.connection.getBalance(this.publicKey);
    }
  
    async requestAirdrop(amount: number): Promise<string> {
      const signature = await this.connection.requestAirdrop(
        this.publicKey,
        amount * LAMPORTS_PER_SOL
      );
      await this.connection.confirmTransaction(signature);
      return signature;
    }
  
    async sendTransaction(transaction: Transaction): Promise<string> {
      transaction.recentBlockhash = (
        await this.connection.getLatestBlockhash()
      ).blockhash;
      transaction.feePayer = this.publicKey;
      transaction.sign(this.keypair);
      
      return await this.connection.sendRawTransaction(
        transaction.serialize()
      );
    }
  }