"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchErrors = CatchErrors;
function CatchErrors(_t, _p, desc) {
    const o = desc.value;
    desc.value = function (...args) {
        const next = args[2];
        Promise.resolve(o.apply(this, args)).catch(next);
    };
}
