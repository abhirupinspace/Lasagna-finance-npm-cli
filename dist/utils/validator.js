"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateKeypair = exports.validateRpcUrl = void 0;
const validateRpcUrl = (url) => {
    try {
        new URL(url);
        return true;
    }
    catch {
        return 'Please enter a valid URL';
    }
};
exports.validateRpcUrl = validateRpcUrl;
const validateKeypair = (keypairString) => {
    try {
        const secretKey = new Uint8Array(JSON.parse(keypairString));
        return secretKey.length === 64;
    }
    catch {
        return false;
    }
};
exports.validateKeypair = validateKeypair;
