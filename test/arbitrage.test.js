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
const globals_1 = require("@jest/globals");
const arbitrage_1 = require("../src/core/arbitrage");
const constants_1 = require("../src/core/constants");
(0, globals_1.describe)('ArbitrageMonitor', () => {
    let monitor;
    (0, globals_1.beforeEach)(() => {
        const config = Object.assign(Object.assign({}, constants_1.DEFAULT_CONFIG), { network: 'localnet' });
        monitor = new arbitrage_1.ArbitrageMonitor(config);
    });
    (0, globals_1.test)('should find arbitrage opportunities', () => __awaiter(void 0, void 0, void 0, function* () {
        const prices = yield monitor.getPrices('SOL/USDC');
        const opportunity = monitor.findArbitrageOpportunities(prices);
        if (opportunity) {
            (0, globals_1.expect)(opportunity.profit).toBeGreaterThan(constants_1.DEFAULT_CONFIG.minProfitThreshold);
            (0, globals_1.expect)(opportunity.buyDex).toBeDefined();
            (0, globals_1.expect)(opportunity.sellDex).toBeDefined();
        }
    }));
});
