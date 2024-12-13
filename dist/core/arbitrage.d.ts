import { ArbitrageConfig, PriceData, TradeOpportunity } from './types';
import EventEmitter from 'events';
export declare class ArbitrageMonitor extends EventEmitter {
    private solana;
    private config;
    private isRunning;
    constructor(config: ArbitrageConfig);
    getPrices(pair: string): Promise<PriceData[]>;
    findArbitrageOpportunities(prices: PriceData[]): TradeOpportunity | null;
    onOpportunity(callback: (opportunity: TradeOpportunity) => void): void;
    start(pairs: string[], interval?: number, threshold?: number): Promise<void>;
    stop(): void;
}
