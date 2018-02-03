"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function s2b(str, encoding) {
    if (Buffer.from) {
        try {
            return Buffer.from(str, encoding);
        }
        catch (err) {
            if (err.name === "TypeError") {
                return new Buffer(str, encoding);
            }
            throw err;
        }
    }
    else {
        return new Buffer(str, encoding);
    }
}
function safeCompare(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    if (crypto_1.timingSafeEqual) {
        return crypto_1.timingSafeEqual(a, b);
    }
    else {
        let result = 0;
        for (let i = 0; i < a.length; i++) {
            result |= a[i] ^ b[i];
        }
        return result === 0;
    }
}
function validateSignature(body, channelSecret, signature) {
    return safeCompare(crypto_1.createHmac("SHA256", channelSecret)
        .update(body)
        .digest(), s2b(signature, "base64"));
}
exports.default = validateSignature;
