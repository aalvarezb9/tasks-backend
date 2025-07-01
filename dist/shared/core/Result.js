"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(v, e) {
        this.v = v;
        this.e = e;
    }
    static ok(v) {
        return new Result(v);
    }
    static fail(e) {
        return new Result(null, e);
    }
    isSuccess() {
        return !!this.v && !this.e;
    }
    value() {
        if (!this.v)
            throw new Error('No value');
        return this.v;
    }
    error() {
        return this.e;
    }
}
exports.Result = Result;
