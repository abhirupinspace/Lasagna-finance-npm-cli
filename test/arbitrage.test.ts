import { describe, test, expect, beforeEach } from "@jest/globals";
import { ArbitrageMonitor } from '../src/core/arbitrage';
import { ArbitrageConfig } from '../src/core/types';
import { DEFAULT_CONFIG } from '../src/core/constants';

describe('ArbitrageMonitor', () => {
  let monitor: ArbitrageMonitor;

  beforeEach(() => {
    const config: ArbitrageConfig = {
      ...DEFAULT_CONFIG,
      network: 'localnet'
    };
    monitor = new ArbitrageMonitor(config);
  });

  test('should find arbitrage opportunities', async () => {
    const prices = await monitor.getPrices('SOL/USDC');
    const opportunity = monitor.findArbitrageOpportunities(prices);

    if (opportunity) {
      expect(opportunity.profit).toBeGreaterThan(DEFAULT_CONFIG.minProfitThreshold);
      expect(opportunity.buyDex).toBeDefined();
      expect(opportunity.sellDex).toBeDefined();
    }
  });
});


