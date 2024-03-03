"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = exports.log = exports.LogLevel = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["INFO"] = 0] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
    LogLevel[LogLevel["WARNING"] = 2] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 3] = "ERROR";
    LogLevel[LogLevel["OFF"] = 4] = "OFF";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
const dumpFunction = (...args) => undefined;
//@dynamic
// eslint-disable-next-line @typescript-eslint/class-name-casing
class log {
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
        ? (source, name) => (0, rxjs_1.defer)(() => {
            log.debug(`${name}: subscribed`);
            return source.pipe((0, operators_1.tap)({
                next: (value) => log.debug(`${name}: ${value}`),
                error: (e) => log.error(`${name}: error:`, e),
                complete: () => log.debug(`${name}: complete`),
            }), (0, operators_1.finalize)(() => log.debug(`${name}: unsubscribed`)));
        })
        : (source) => source;
}
exports.log = log;
class Logger extends log {
}
exports.Logger = Logger;
