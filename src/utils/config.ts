import Conf from 'conf/dist/source';
import { ArbitrageConfig } from '../core/types';
import { DEFAULT_CONFIG } from '../core/constants';

class ConfigManager {
  private static instance: Conf<ArbitrageConfig>;

  private static getInstance(): Conf<ArbitrageConfig> {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new Conf<ArbitrageConfig>({
        projectName: 'lasagna-finance',
        defaults: DEFAULT_CONFIG,
        schema: {
          network: {
            type: 'string',
            default: 'localnet'
          },
          rpcUrl: {
            type: 'string',
            default: ''
          },
          walletPath: {
            type: 'string',
            default: ''
          },
          minProfitThreshold: {
            type: 'number',
            default: 0.5
          }
        }
      });
    }
    return ConfigManager.instance;
  }

  static get(): ArbitrageConfig {
    return ConfigManager.getInstance().store;
  }

  static set(key: keyof ArbitrageConfig, value: any): void {
    ConfigManager.getInstance().set(key, value);
  }

  static reset(): void {
    ConfigManager.getInstance().clear();
    ConfigManager.getInstance().set(DEFAULT_CONFIG);
  }
}

export const Config = ConfigManager;

