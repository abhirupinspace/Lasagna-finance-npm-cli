import { Command } from 'commander';
import inquirer from 'inquirer';
import { Config } from '../utils/config';
import { Logger } from '../utils/logger';
import { NETWORKS } from '../core/constants';
import { validateRpcUrl } from '../utils/validator';
import { CustomError } from '../core/types';

export const initCommand = (program: Command) => {
  program
    .command('init')
    .description('Initialize Lasagna Finance CLI configuration')
    .action(async () => {
      Logger.info('Welcome to Lasagna Finance! Let\'s set up your configuration.');

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'network',
          message: 'Select network:',
          choices: Object.keys(NETWORKS)
        },
        {
          type: 'input',
          name: 'rpcUrl',
          message: 'Enter custom RPC URL (optional):',
          default: '',
          validate: (input) => !input || validateRpcUrl(input)
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
        Config.set('network', answers.network);
        Config.set('minProfitThreshold', answers.minProfitThreshold);
        
        if (answers.rpcUrl) {
          Config.set('rpcUrl', answers.rpcUrl);
        }

        Logger.success('Configuration saved successfully!');
        Logger.info('Run "lasagna monitor" to start monitoring arbitrage opportunities.');
      } catch (err) {
        Logger.error(`Failed to save configuration: ${(err as CustomError).message}`);
      }
    });
};