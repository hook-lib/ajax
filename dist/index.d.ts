import { AxiosResponse, AxiosError } from 'axios';
import Hook from '@hook/hook';
import type { setterKey, options as hookOptions } from '@hook/hook';
export interface options extends hookOptions {
    abortable?: boolean;
}
export declare type method = 'get' | 'post' | 'head' | 'put' | 'delete' | 'connect' | 'options' | 'trace' | 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE';
export default class Ajax extends Hook {
    static axios: import("axios").AxiosStatic;
    static create<T extends Ajax>(url: string, method: method, options?: options): T;
    private _ajaxable;
    private _abortable;
    constructor(options?: options);
    config(key: setterKey, value?: any): this;
    getConfig(field?: string): any;
    params(key: setterKey, value?: any): this;
    getParams(field?: string): any;
    method(method: method): this;
    url(url: string): this;
    abortable(): this;
    abort(message?: string): this;
    isAbortable(): boolean;
    disable(): this;
    enable(): this;
    isDisabled(): boolean;
    convertResponse(res: AxiosResponse): Promise<any>;
    convertError(error: AxiosError): Promise<any>;
    fetch(): Promise<this>;
}
