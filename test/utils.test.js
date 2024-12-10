"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const validator_1 = require("../src/utils/validator");
const config_1 = require("../src/utils/config");
const constants_1 = require("../src/core/constants");
(0, globals_1.describe)('Validators', () => {
    (0, globals_1.test)('should validate RPC URL', () => {
        (0, globals_1.expect)((0, validator_1.validateRpcUrl)('http://localhost:8899')).toBe(true);
        (0, globals_1.expect)((0, validator_1.validateRpcUrl)('not a url')).toBe('Please enter a valid URL');
    });
    (0, globals_1.test)('should validate keypair', () => {
        const validKeypair = new Array(64).fill(0);
        (0, globals_1.expect)((0, validator_1.validateKeypair)(JSON.stringify(validKeypair))).toBe(true);
        (0, globals_1.expect)((0, validator_1.validateKeypair)('invalid')).toBe(false);
    });
});
(0, globals_1.describe)('Config', () => {
    (0, globals_1.beforeEach)(() => {
        config_1.Config.reset();
    });
    (0, globals_1.test)('should load default config', () => {
        const config = config_1.Config.get();
        (0, globals_1.expect)(config.network).toBe(constants_1.DEFAULT_CONFIG.network);
        (0, globals_1.expect)(config.minProfitThreshold).toBe(constants_1.DEFAULT_CONFIG.minProfitThreshold);
    });
    (0, globals_1.test)('should update config', () => {
        config_1.Config.set('network', 'devnet');
        (0, globals_1.expect)(config_1.Config.get().network).toBe('devnet');
    });
});
