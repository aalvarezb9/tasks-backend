'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Email = void 0;
class Email {
  constructor(value) {
    this.value = value;
  }
  static create(val) {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) throw new Error('Invalid email');
    return new Email(val.toLowerCase());
  }
}
exports.Email = Email;
