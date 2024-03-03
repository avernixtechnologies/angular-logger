/** @format */
import { Observable } from 'rxjs';
export declare enum LogLevel {
    INFO = 0,
    DEBUG = 1,
    WARNING = 2,
    ERROR = 3,
    OFF = 4
}
export declare class log {
    static hideInDev: boolean;
    static show: boolean;
    static info: (...args: any[]) => void;
    static debug: (...args: any[]) => void;
    static warn: (...args: any[]) => void;
    static error: (...args: any[]) => void;
    static assert: ((...args: any[]) => void) | ((value: any, message?: string | undefined, ...optionalParams: any[]) => void);
    static group: (...args: any[]) => void;
    static groupEnd: (...args: any[]) => void;
    static Observable: <T>(source: Observable<T>, name: string) => Observable<T>;
}
export declare class Logger extends log {
}
