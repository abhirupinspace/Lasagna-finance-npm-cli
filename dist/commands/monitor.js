"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monitorCommand = void 0;
const arbitrage_1 = require("../core/arbitrage");
const config_1 = require("../utils/config");
const logger_1 = require("../utils/logger");
const table_1 = require("table");
const monitorCommand = (program) => {
    program
        .command('monitor')
        .description('Monitor arbitrage opportunities')
        .option('-p, --pairs <pairs>', 'Token pairs to monitor (comma-separated)', 'SOL/USDC')
        .option('-i, --interval <seconds>', 'Price check interval in seconds', '5')
        .option('-t, --threshold <percent>', 'Minimum profit threshold percentage')
        .action(async (options) => {
        try {
            const config = config_1.Config.get();
            const monitor = new arbitrage_1.ArbitrageMonitor(config);
            logger_1.Logger.info(`Starting price monitor on ${config.network}`);
            logger_1.Logger.info(`Monitoring pairs: ${options.pairs}`);
            logger_1.Logger.info(`Minimum profit threshold: ${config.minProfitThreshold}%`);
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
                console.log('\n' + (0, table_1.table)(data));
            });
            await monitor.start(options.pairs.split(','), parseInt(options.interval), options.threshold ? parseFloat(options.threshold) : undefined);
        }
        catch (err) {
            const error = err;
            logger_1.Logger.error(`Monitor error: ${error.message}`);
        }
    });
};
exports.monitorCommand = monitorCommand;
