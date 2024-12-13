import { ArbitrageConfig } from "./types";
export declare const NETWORKS: Record<string, string>;
export declare const DEFAULT_CONFIG: ArbitrageConfig;
export declare const CONNECTION_CONFIG: {
    commitment: "confirmed";
    preflightCommitment: "confirmed";
};
export declare const DEX_ADDRESSES: {
    localnet: {
        raydium: string;
        orca: string;
    };
    devnet: {
        raydium: string;
        orca: string;
    };
};
