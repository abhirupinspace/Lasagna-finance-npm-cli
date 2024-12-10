import chalk from 'chalk';
import ora, { Ora } from 'ora';
import { CustomError } from '../core/types';

export class Logger {
  private static spinner: Ora | null = null;

  static init(text: string): void {
    this.spinner = ora(text).start();
  }

  static success(message: string): void {
    if (this.spinner) {
      this.spinner.succeed(chalk.green(message));
      this.spinner = null;
    } else {
      console.log(chalk.green('✓'), message);
    }
  }

  static error(message: string): void {
    if (this.spinner) {
      this.spinner.fail(chalk.red(message));
      this.spinner = null;
    } else {
      console.error(chalk.red('✗'), message);
    }
  }

  static handleError(err: unknown): void {
    const error = err as CustomError;
    this.error(error.message || 'An unknown error occurred');
  }

  static info(message: string): void {
    if (this.spinner) {
      this.spinner.stop();
      console.log(chalk.blue('ℹ'), message);
      this.spinner.start();
    } else {
      console.log(chalk.blue('ℹ'), message);
    }
  }

  static warn(message: string): void {
    if (this.spinner) {
      this.spinner.warn(chalk.yellow(message));
    } else {
      console.log(chalk.yellow('⚠'), message);
    }
  }

  static table(data: any[][]): void {
    if (this.spinner) {
      this.spinner.stop();
    }
    console.table(data);
    if (this.spinner) {
      this.spinner.start();
    }
  }
}