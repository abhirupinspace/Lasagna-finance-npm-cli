import { describe, test, expect, beforeEach } from "@jest/globals";
import { validateRpcUrl, validateKeypair } from '../src/utils/validator';
import { Config } from '../src/utils/config';
import { DEFAULT_CONFIG } from '../src/core/constants';

describe('Validators', () => {
  test('should validate RPC URL', () => {
    expect(validateRpcUrl('http://localhost:8899')).toBe(true);
    expect(validateRpcUrl('not a url')).toBe('Please enter a valid URL');
  });

  test('should validate keypair', () => {
    const validKeypair = new Array(64).fill(0);
    expect(validateKeypair(JSON.stringify(validKeypair))).toBe(true);
    expect(validateKeypair('invalid')).toBe(false);
  });
});

describe('Config', () => {
  beforeEach(() => {
    Config.reset();
  });

  test('should load default config', () => {
    const config = Config.get();
    expect(config.network).toBe(DEFAULT_CONFIG.network);
    expect(config.minProfitThreshold).toBe(DEFAULT_CONFIG.minProfitThreshold);
  });

  test('should update config', () => {
    Config.set('network', 'devnet');
    expect(Config.get().network).toBe('devnet');
  });
});