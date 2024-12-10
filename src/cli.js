'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const figlet_1 = __importDefault(require("figlet"));
const chalk_1 = __importDefault(require("chalk"));
const init_1 = require("./commands/init");
const monitor_1 = require("./commands/monitor");
const wallet_1 = require("./commands/wallet");
const logger_1 = require("./utils/logger");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.yellow(figlet_1.default.textSync('Lasagna Finance', {
        font: 'Standard',
        horizontalLayout: 'full'
    })));
    const program = new commander_1.Command();
    program
        .name('lasagna')
        .description('Lasagna Finance - Solana Arbitrage Testing Tool')
        .version('0.1.0');
    // Add commands
    (0, init_1.initCommand)(program);
    (0, monitor_1.monitorCommand)(program);
    (0, wallet_1.walletCommands)(program);
    // Error handling for unknown commands
    program.on('command:*', () => {
        logger_1.Logger.error('Invalid command.');
        logger_1.Logger.info('Run lasagna --help for available commands');
        process.exit(1);
    });
    yield program.parseAsync(process.argv);
});
start().catch((error) => {
    logger_1.Logger.error(`Failed to start CLI: ${error.message}`);
    process.exit(1);
});
