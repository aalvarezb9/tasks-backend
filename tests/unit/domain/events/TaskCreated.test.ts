import { TaskCreated } from '../../../../src/domain/events/TaskCreated';
import { TaskId } from '../../../../src/domain/value-objects/TaskId';

describe('TaskCreated event', () => {
  it('stores taskId', () => {
    const id = TaskId.create();
    expect(new TaskCreated(id).taskId.value).toBe(id.value);
  });
});
