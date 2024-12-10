'use strict';

import { Command } from 'commander';
import figlet from 'figlet';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { monitorCommand } from './commands/monitor';
import { walletCommands } from './commands/wallet';
import { Logger } from './utils/logger';

const start = async () => {
  console.log(
    chalk.yellow(
      figlet.textSync('Lasagna Finance', {
        font: 'Standard',
        horizontalLayout: 'full'
      })
    )
  );

  const program = new Command();

  program
    .name('lasagna')
    .description('Lasagna Finance - Solana Arbitrage Testing Tool')
    .version('0.1.0');

  // Add commands
  initCommand(program);
  monitorCommand(program);
  walletCommands(program);

  // Error handling for unknown commands
  program.on('command:*', () => {
    Logger.error('Invalid command.');
    Logger.info('Run lasagna --help for available commands');
    process.exit(1);
  });

  await program.parseAsync(process.argv);
};

start().catch((error) => {
  Logger.error(`Failed to start CLI: ${error.message}`);
  process.exit(1);
});