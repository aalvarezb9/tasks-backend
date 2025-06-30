'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserId = void 0;
const uuid_1 = require('uuid');
class UserId {
  constructor(value) {
    this.value = value;
  }
  static create() {
    return new UserId((0, uuid_1.v4)());
  }
  static from(val) {
    return new UserId(val);
  }
}
exports.UserId = UserId;
