'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CategoryId = void 0;
const uuid_1 = require('uuid');
class CategoryId {
  constructor(value) {
    this.value = value;
  }
  static create() {
    return new CategoryId((0, uuid_1.v4)());
  }
  static from(val) {
    return new CategoryId(val);
  }
}
exports.CategoryId = CategoryId;
