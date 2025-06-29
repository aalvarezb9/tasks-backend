"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskId = void 0;
const uuid_1 = require("uuid");
class TaskId {
    constructor(value) {
        this.value = value;
    }
    static create() {
        return new TaskId((0, uuid_1.v4)());
    }
    static from(val) {
        return new TaskId(val);
    }
}
exports.TaskId = TaskId;
