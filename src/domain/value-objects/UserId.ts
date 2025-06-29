import { v4 as uuid } from 'uuid';

export class UserId {
  private constructor(public readonly value: string) {}

  static create() {
    return new UserId(uuid());
  }

  static from(val: string) {
    return new UserId(val);
  }
}
