"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const source_1 = __importDefault(require("conf/dist/source"));
const constants_1 = require("../core/constants");
class ConfigManager {
    static getInstance() {
        if (!ConfigManager.instance) {
            ConfigManager.instance = new source_1.default({
                projectName: 'lasagna-finance',
                defaults: constants_1.DEFAULT_CONFIG
            });
        }
        return ConfigManager.instance;
    }
    static get() {
        return ConfigManager.getInstance().store;
    }
    static set(key, value) {
        ConfigManager.getInstance().set(key, value);
    }
    static reset() {
        ConfigManager.getInstance().clear();
        ConfigManager.getInstance().set(constants_1.DEFAULT_CONFIG);
    }
}
exports.Config = ConfigManager;
