export declare class SignatureValidationFailed extends Error {
    signature: string;
    constructor(message: string, signature?: string);
}
export declare class JSONParseError extends Error {
    raw: any;
    constructor(message: string, raw: any);
}
export declare class RequestError extends Error {
    code: string;
    private originalError;
    constructor(message: string, code: string, originalError: Error);
}
export declare class ReadError extends Error {
    private originalError;
    constructor(originalError: Error);
}
export declare class HTTPError extends Error {
    statusCode: number;
    statusMessage: string;
    private originalError;
    constructor(message: string, statusCode: number, statusMessage: string, originalError: Error);
}
