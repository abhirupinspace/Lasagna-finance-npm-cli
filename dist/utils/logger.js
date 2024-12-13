"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const ora_1 = __importDefault(require("ora"));
class Logger {
    static init(text) {
        this.spinner = (0, ora_1.default)(text).start();
    }
    static success(message) {
        if (this.spinner) {
            this.spinner.succeed(chalk_1.default.green(message));
            this.spinner = null;
        }
        else {
            console.log(chalk_1.default.green('✓'), message);
        }
    }
    static error(message) {
        if (this.spinner) {
            this.spinner.fail(chalk_1.default.red(message));
            this.spinner = null;
        }
        else {
            console.error(chalk_1.default.red('✗'), message);
        }
    }
    static handleError(err) {
        const error = err;
        this.error(error.message || 'An unknown error occurred');
    }
    static info(message) {
        if (this.spinner) {
            this.spinner.stop();
            console.log(chalk_1.default.blue('ℹ'), message);
            this.spinner.start();
        }
        else {
            console.log(chalk_1.default.blue('ℹ'), message);
        }
    }
    static warn(message) {
        if (this.spinner) {
            this.spinner.warn(chalk_1.default.yellow(message));
        }
        else {
            console.log(chalk_1.default.yellow('⚠'), message);
        }
    }
    static table(data) {
        if (this.spinner) {
            this.spinner.stop();
        }
        console.table(data);
        if (this.spinner) {
            this.spinner.start();
        }
    }
}
exports.Logger = Logger;
Logger.spinner = null;
