"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const config_1 = require("../utils/config");
const logger_1 = require("../utils/logger");
const constants_1 = require("../core/constants");
const validator_1 = require("../utils/validator");
const initCommand = (program) => {
    program
        .command('init')
        .description('Initialize Lasagna Finance CLI configuration')
        .action(async () => {
        logger_1.Logger.info('Welcome to Lasagna Finance! Let\'s set up your configuration.');
        const answers = await inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'network',
                message: 'Select network:',
                choices: Object.keys(constants_1.NETWORKS)
            },
            {
                type: 'input',
                name: 'rpcUrl',
                message: 'Enter custom RPC URL (optional):',
                default: '',
                validate: (input) => !input || (0, validator_1.validateRpcUrl)(input)
            },
            {
                type: 'number',
                name: 'minProfitThreshold',
                message: 'Enter minimum profit threshold (%):',
                default: 0.5,
                validate: (input) => input > 0 && input <= 100
            }
        ]);
        try {
            config_1.Config.set('network', answers.network);
            config_1.Config.set('minProfitThreshold', answers.minProfitThreshold);
            if (answers.rpcUrl) {
                config_1.Config.set('rpcUrl', answers.rpcUrl);
            }
            logger_1.Logger.success('Configuration saved successfully!');
            logger_1.Logger.info('Run "lasagna monitor" to start monitoring arbitrage opportunities.');
        }
        catch (err) {
            logger_1.Logger.error(`Failed to save configuration: ${err.message}`);
        }
    });
};
exports.initCommand = initCommand;
