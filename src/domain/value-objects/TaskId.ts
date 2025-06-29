import { v4 as uuid } from 'uuid';

export class TaskId {
  private constructor(public readonly value: string) {}

  static create() {
    return new TaskId(uuid());
  }

  static from(val: string) {
    return new TaskId(val);
  }
}
