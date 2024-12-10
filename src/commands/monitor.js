"use strict";
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
        .action((options) => __awaiter(void 0, void 0, void 0, function* () {
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
            yield monitor.start(options.pairs.split(','), parseInt(options.interval), options.threshold ? parseFloat(options.threshold) : undefined);
        }
        catch (err) {
            const error = err;
            logger_1.Logger.error(`Monitor error: ${error.message}`);
        }
    }));
};
exports.monitorCommand = monitorCommand;
