"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const exceptions_1 = require("./exceptions");
const validate_signature_1 = require("./validate-signature");
function middleware(config) {
    if (!config.channelSecret) {
        throw new Error("no channel secret");
    }
    const secret = config.channelSecret;
    return (req, res, next) => {
        // header names are lower-cased
        // https://nodejs.org/api/http.html#http_message_headers
        const signature = req.headers["x-line-signature"];
        if (!signature) {
            next(new exceptions_1.SignatureValidationFailed("no signature"));
            return;
        }
        const validate = (body) => {
            if (!validate_signature_1.default(body, secret, signature)) {
                next(new exceptions_1.SignatureValidationFailed("signature validation failed", signature));
                return;
            }
            const strBody = Buffer.isBuffer(body) ? body.toString() : body;
            try {
                req.body = JSON.parse(strBody);
                next();
            }
            catch (err) {
                next(new exceptions_1.JSONParseError(err.message, strBody));
            }
        };
        if (typeof req.body === "string" || Buffer.isBuffer(req.body)) {
            return validate(req.body);
        }
        // if body is not parsed yet, parse it to a buffer
        body_parser_1.raw({ type: "*/*" })(req, res, () => validate(req.body));
    };
}
exports.default = middleware;
