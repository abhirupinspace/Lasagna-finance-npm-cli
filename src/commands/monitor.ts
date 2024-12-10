import { Command } from 'commander';
import { ArbitrageMonitor } from '../core/arbitrage';
import { Config } from '../utils/config';
import { Logger } from '../utils/logger';
import { table } from 'table';
import { CustomError } from '../core/types';

export const monitorCommand = (program: Command) => {
  program
    .command('monitor')
    .description('Monitor arbitrage opportunities')
    .option('-p, --pairs <pairs>', 'Token pairs to monitor (comma-separated)', 'SOL/USDC')
    .option('-i, --interval <seconds>', 'Price check interval in seconds', '5')
    .option('-t, --threshold <percent>', 'Minimum profit threshold percentage')
    .action(async (options) => {
      try {
        const config = Config.get();
        const monitor = new ArbitrageMonitor(config);

        Logger.info(`Starting price monitor on ${config.network}`);
        Logger.info(`Monitoring pairs: ${options.pairs}`);
        Logger.info(`Minimum profit threshold: ${config.minProfitThreshold}%`);

        monitor.onOpportunity((opportunity) => {
          const data = [
            ['Buy DEX', 'Sell DEX', 'Profit %', 'Volume'],
            [
              opportunity.buyDex,
              opportunity.sellDex,
              opportunity.profit.toFixed(2) + '%',
              opportunity.volume.toFixed(2)
            ]
          ];
          
          console.log('\n' + table(data));
        });

        await monitor.start(
          options.pairs.split(','),
          parseInt(options.interval),
          options.threshold ? parseFloat(options.threshold) : undefined
        );
      } catch (err) {
        const error = err as CustomError;
        Logger.error(`Monitor error: ${error.message}`);
      }
    });
};