import { TaskId } from '../../../../src/domain/value-objects/TaskId';

describe('TaskId', () => {
  it('creates uuid', () => {
    expect(TaskId.create().value).toHaveLength(36);
  });

  it('from keeps value', () => {
    const id = TaskId.from('123');
    expect(id.value).toBe('123');
  });
});
