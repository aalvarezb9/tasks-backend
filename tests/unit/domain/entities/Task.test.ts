import { Task } from '../../../../src/domain/entities/Task';

describe('Task', () => {
  it('create + update', () => {
    const t = Task.create({ title: 'X' });
    t.update({ status: 'completed', description: 'done' });
    expect(t.status).toBe('completed');
    expect(t.description).toBe('done');
  });
});
