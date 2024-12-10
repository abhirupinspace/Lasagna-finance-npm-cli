"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEX_ADDRESSES = exports.CONNECTION_CONFIG = exports.DEFAULT_CONFIG = exports.NETWORKS = void 0;
exports.NETWORKS = {
    localnet: 'http://127.0.0.1:8899',
    devnet: 'https://api.devnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com'
};
exports.DEFAULT_CONFIG = {
    network: 'localnet',
    minProfitThreshold: 0.5
};
exports.CONNECTION_CONFIG = {
    commitment: 'confirmed',
    preflightCommitment: 'confirmed'
};
exports.DEX_ADDRESSES = {
    localnet: {
        raydium: 'RAYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyz',
        orca: 'ORCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxabc'
    },
    devnet: {
        raydium: 'RAYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyz',
        orca: 'ORCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxabc'
    }
};
