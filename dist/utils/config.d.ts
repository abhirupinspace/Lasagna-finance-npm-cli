import { ArbitrageConfig } from '../core/types';
declare class ConfigManager {
    private static instance;
    private static getInstance;
    static get(): ArbitrageConfig;
    static set(key: keyof ArbitrageConfig, value: any): void;
    static reset(): void;
}
export declare const Config: typeof ConfigManager;
export {};
