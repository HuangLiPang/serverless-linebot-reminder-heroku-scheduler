/// <reference types="node" />
import * as http from "http";
import * as Types from "./types";
export declare type Request = http.IncomingMessage & {
    body: any;
};
export declare type Response = http.ServerResponse;
export declare type NextCallback = (err?: Error) => void;
export declare type Middleware = (req: Request, res: Response, next: NextCallback) => void;
export default function middleware(config: Types.MiddlewareConfig): Middleware;
