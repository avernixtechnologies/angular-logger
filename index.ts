/** @format */

import { defer } from 'rxjs';
/* eslint-disable no-fallthrough */
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

export enum LogLevel {
    INFO,
    DEBUG,
    WARNING,
    ERROR,
    OFF,
}
const dumpFunction = (...args: any[]): void => undefined;
//@dynamic
// eslint-disable-next-line @typescript-eslint/class-name-casing
export class log {
    static hideInDev = false;
    // static show = !log.hideInDev && !environment.production;
    static show = !log.hideInDev;
    static info = log.show ? console.info : dumpFunction;
    static debug = log.show ? console.log : dumpFunction;
    static warn = log.show ? console.warn : dumpFunction;
    static error = log.show ? console.error : dumpFunction;
    static assert = log.show ? console.assert : dumpFunction;
    static group = log.show ? console.group : dumpFunction;
    static groupEnd = log.show ? console.groupEnd : dumpFunction;
    static Observable = log.show
        ? <T>(source: Observable<T>, name: string) =>
              defer(() => {
                  log.debug(`${name}: subscribed`);
                  return source.pipe(
                      tap({
                          next: (value) => log.debug(`${name}: ${value}`),
                          error: (e) => log.error(`${name}: error:`, e),
                          complete: () => log.debug(`${name}: complete`),
                      }),
                      finalize(() => log.debug(`${name}: unsubscribed`)),
                  );
              })
        : <T>(source: Observable<T>) => source;
}
export class Logger extends log {}
