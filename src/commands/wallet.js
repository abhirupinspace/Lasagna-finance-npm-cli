"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletCommands = void 0;
const web3_js_1 = require("@solana/web3.js");
const config_1 = require("../utils/config");
const logger_1 = require("../utils/logger");
const solana_1 = require("../core/solana");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const walletCommands = (program) => {
    const wallet = program.command('wallet')
        .description('Wallet management commands');
    wallet
        .command('create')
        .description('Create a new wallet')
        .action(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const keypair = web3_js_1.Keypair.generate();
            const walletDir = path.join(process.cwd(), 'wallets');
            if (!fs.existsSync(walletDir)) {
                fs.mkdirSync(walletDir);
            }
            const walletPath = path.join(walletDir, 'lasagna-wallet.json');
            fs.writeFileSync(walletPath, JSON.stringify(Array.from(keypair.secretKey)));
            config_1.Config.set('walletPath', walletPath);
            logger_1.Logger.success('Wallet created successfully!');
            logger_1.Logger.info(`Public key: ${keypair.publicKey.toString()}`);
            logger_1.Logger.info(`Wallet saved to: ${walletPath}`);
        }
        catch (err) {
            const error = err;
            logger_1.Logger.error(`Failed to create wallet: ${error.message}`);
        }
    }));
    wallet
        .command('status')
        .description('Check wallet status and balance')
        .action(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const config = config_1.Config.get();
            const solana = new solana_1.SolanaService(config);
            const balance = yield solana.getBalance();
            logger_1.Logger.info(`Network: ${config.network}`);
            logger_1.Logger.info(`Address: ${solana.publicKey.toString()}`);
            logger_1.Logger.info(`Balance: ${balance / web3_js_1.LAMPORTS_PER_SOL} SOL`);
        }
        catch (err) {
            const error = err;
            logger_1.Logger.error(`Failed to create wallet: ${error.message}`);
        }
    }));
    wallet
        .command('airdrop')
        .description('Request SOL airdrop on devnet')
        .option('-a, --amount <sol>', 'Amount of SOL to request', '1')
        .action((options) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const config = config_1.Config.get();
            if (config.network === 'mainnet-beta') {
                throw new Error('Airdrop not available on mainnet');
            }
            const solana = new solana_1.SolanaService(config);
            const amount = parseFloat(options.amount);
            logger_1.Logger.init(`Requesting ${amount} SOL airdrop...`);
            const signature = yield solana.requestAirdrop(amount);
            logger_1.Logger.success(`Airdrop successful! Signature: ${signature}`);
            const balance = yield solana.getBalance();
            logger_1.Logger.info(`New balance: ${balance / web3_js_1.LAMPORTS_PER_SOL} SOL`);
        }
        catch (err) {
            const error = err;
            logger_1.Logger.error(`Failed to create wallet: ${error.message}`);
        }
    }));
};
exports.walletCommands = walletCommands;
