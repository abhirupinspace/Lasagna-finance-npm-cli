import { Command } from 'commander';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Config } from '../utils/config';
import { Logger } from '../utils/logger';
import { SolanaService } from '../core/solana';
import * as fs from 'fs';
import * as path from 'path';
import { CustomError } from '../core/types';

export const walletCommands = (program: Command) => {
  const wallet = program.command('wallet')
    .description('Wallet management commands');

  wallet
    .command('create')
    .description('Create a new wallet')
    .action(async () => {
      try {
        const keypair = Keypair.generate();
        const walletDir = path.join(process.cwd(), 'wallets');
        
        if (!fs.existsSync(walletDir)) {
          fs.mkdirSync(walletDir);
        }

        const walletPath = path.join(walletDir, 'lasagna-wallet.json');
        fs.writeFileSync(walletPath, JSON.stringify(Array.from(keypair.secretKey)));
        
        Config.set('walletPath', walletPath);
        
        Logger.success('Wallet created successfully!');
        Logger.info(`Public key: ${keypair.publicKey.toString()}`);
        Logger.info(`Wallet saved to: ${walletPath}`);
      } catch (err) {
        const error = err as CustomError;
        Logger.error(`Failed to create wallet: ${error.message}`);
      }
    });

  wallet
    .command('status')
    .description('Check wallet status and balance')
    .action(async () => {
      try {
        const config = Config.get();
        const solana = new SolanaService(config);
        const balance = await solana.getBalance();
        
        Logger.info(`Network: ${config.network}`);
        Logger.info(`Address: ${solana.publicKey.toString()}`);
        Logger.info(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`);
      } catch (err) {
        const error = err as CustomError;
        Logger.error(`Failed to create wallet: ${error.message}`);
      }
    });

  wallet
    .command('airdrop')
    .description('Request SOL airdrop on devnet')
    .option('-a, --amount <sol>', 'Amount of SOL to request', '1')
    .action(async (options) => {
      try {
        const config = Config.get();
        if (config.network === 'mainnet-beta') {
          throw new Error('Airdrop not available on mainnet');
        }

        const solana = new SolanaService(config);
        const amount = parseFloat(options.amount);
        
        Logger.init(`Requesting ${amount} SOL airdrop...`);
        const signature = await solana.requestAirdrop(amount);
        
        Logger.success(`Airdrop successful! Signature: ${signature}`);
        const balance = await solana.getBalance();
        Logger.info(`New balance: ${balance / LAMPORTS_PER_SOL} SOL`);
      } catch (err) {
        const error = err as CustomError;
        Logger.error(`Failed to create wallet: ${error.message}`);
      }
    });
};