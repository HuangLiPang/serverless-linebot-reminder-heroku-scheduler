/// <reference types="node" />
import { Readable } from "stream";
export declare function stream(url: string, headers: any): Promise<Readable>;
export declare function get(url: string, headers: any): Promise<any>;
export declare function post(url: string, headers: any, data?: any): Promise<any>;
export declare function postBinary(url: string, headers: any, data: Buffer | Readable, contentType?: string): Promise<any>;
export declare function del(url: string, headers: any): Promise<any>;
