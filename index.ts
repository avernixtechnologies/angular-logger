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
const EmptyFunction = (...args: any[]): void => undefined;
//@dynamic
// eslint-disable-next-line @typescript-eslint/class-name-casing
export class log {
  private static _cache = new Map<LogLevel, typeof log>();
  static hideInDev = false;
  // static show = !log.hideInDev && !environment.production;
  static show = !log.hideInDev;
  static info = log.show ? console.info : EmptyFunction;
  static debug = log.show ? console.log : EmptyFunction;
  static warn = log.show ? console.warn : EmptyFunction;
  static error = log.show ? console.error : EmptyFunction;
  static assert = log.show ? console.assert : EmptyFunction;
  static group = log.show ? console.group : EmptyFunction;
  static groupEnd = log.show ? console.groupEnd : EmptyFunction;
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
            finalize(() => log.debug(`${name}: unsubscribed`))
          );
        })
    : <T>(source: Observable<T>) => source;
}
export class Logger extends log {}
