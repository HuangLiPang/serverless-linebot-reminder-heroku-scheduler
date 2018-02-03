"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const stream_1 = require("stream");
const exceptions_1 = require("./exceptions");
const fileType = require("file-type");
const pkg = require("../package.json");
function wrapError(err) {
    if (err.response) {
        throw new exceptions_1.HTTPError(err.message, err.response.status, err.response.statusText, err);
    }
    else if (err.code) {
        throw new exceptions_1.RequestError(err.message, err.code, err);
    }
    else if (err.config) {
        // unknown, but from axios
        throw new exceptions_1.ReadError(err);
    }
    // otherwise, just rethrow
    throw err;
}
const userAgent = `${pkg.name}/${pkg.version}`;
function stream(url, headers) {
    headers["User-Agent"] = userAgent;
    return axios_1.default
        .get(url, { headers, responseType: "stream" })
        .then(res => res.data);
}
exports.stream = stream;
function get(url, headers) {
    headers["User-Agent"] = userAgent;
    return axios_1.default
        .get(url, { headers })
        .then(res => res.data)
        .catch(wrapError);
}
exports.get = get;
function post(url, headers, data) {
    headers["Content-Type"] = "application/json";
    headers["User-Agent"] = userAgent;
    return axios_1.default
        .post(url, data, { headers })
        .then(res => res.data)
        .catch(wrapError);
}
exports.post = post;
function postBinary(url, headers, data, contentType) {
    let getBuffer;
    if (Buffer.isBuffer(data)) {
        getBuffer = Promise.resolve(data);
    }
    else {
        getBuffer = new Promise((resolve, reject) => {
            if (data instanceof stream_1.Readable) {
                const buffers = [];
                let size = 0;
                data.on("data", (chunk) => {
                    buffers.push(chunk);
                    size += chunk.length;
                });
                data.on("end", () => resolve(Buffer.concat(buffers, size)));
                data.on("error", reject);
            }
            else {
                reject(new Error("invalid data type for postBinary"));
            }
        });
    }
    return getBuffer.then(data => {
        headers["Content-Type"] = contentType || fileType(data).mime;
        headers["Content-Length"] = data.length;
        headers["User-Agent"] = userAgent;
        return axios_1.default
            .post(url, data, { headers })
            .then(res => res.data)
            .catch(wrapError);
    });
}
exports.postBinary = postBinary;
function del(url, headers) {
    headers["User-Agent"] = userAgent;
    return axios_1.default
        .delete(url, { headers })
        .then(res => res.data)
        .catch(wrapError);
}
exports.del = del;
