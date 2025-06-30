'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Password = void 0;
const bcryptjs_1 = __importDefault(require('bcryptjs'));
class Password {
  constructor(hashed) {
    this.hashed = hashed;
  }
  static async hash(plain) {
    const hashed = await bcryptjs_1.default.hash(plain, 10);
    return new Password(hashed);
  }
  static fromHashed(hash) {
    return new Password(hash);
  }
  compare(plain) {
    return bcryptjs_1.default.compare(plain, this.hashed);
  }
  value() {
    return this.hashed;
  }
}
exports.Password = Password;
