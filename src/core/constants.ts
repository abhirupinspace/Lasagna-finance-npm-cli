import { ArbitrageConfig } from "./types";

export const NETWORKS: Record<string, string> = {
    localnet: 'http://127.0.0.1:8899',
    devnet: 'https://api.devnet.solana.com',
    'mainnet-beta': 'https://api.mainnet-beta.solana.com'
  };
  
  export const DEFAULT_CONFIG: ArbitrageConfig = {
    network: 'localnet',
    minProfitThreshold: 0.5
  };
  
  export const CONNECTION_CONFIG = {
    commitment: 'confirmed' as const,
    preflightCommitment: 'confirmed' as const
  };
  
  export const DEX_ADDRESSES = {
    localnet: {
      raydium: 'RAYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyz',
      orca: 'ORCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxabc'
    },
    devnet: {
      raydium: 'RAYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxyz',
      orca: 'ORCxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxabc'
    }
  };