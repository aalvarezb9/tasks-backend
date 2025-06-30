import { v4 as uuid } from 'uuid';

export class CategoryId {
  private constructor(public readonly value: string) {}

  static create() {
    return new CategoryId(uuid());
  }

  static from(val: string) {
    return new CategoryId(val);
  }
}
