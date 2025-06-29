import { TaskId } from '../value-objects/TaskId';

export class TaskCreated {
  constructor(public readonly taskId: TaskId) {}
}
