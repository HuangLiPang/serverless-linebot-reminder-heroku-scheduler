"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SignatureValidationFailed extends Error {
    constructor(message, signature) {
        super(message);
        this.signature = signature;
    }
}
exports.SignatureValidationFailed = SignatureValidationFailed;
class JSONParseError extends Error {
    constructor(message, raw) {
        super(message);
        this.raw = raw;
    }
}
exports.JSONParseError = JSONParseError;
class RequestError extends Error {
    constructor(message, code, originalError) {
        super(message);
        this.code = code;
        this.originalError = originalError;
    }
}
exports.RequestError = RequestError;
class ReadError extends Error {
    constructor(originalError) {
        super(originalError.message);
        this.originalError = originalError;
    }
}
exports.ReadError = ReadError;
class HTTPError extends Error {
    constructor(message, statusCode, statusMessage, originalError) {
        super(message);
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.originalError = originalError;
    }
}
exports.HTTPError = HTTPError;
