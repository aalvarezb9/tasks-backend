import { Task } from '../../../../src/domain/entities/Task';

describe('Task Aggregate', () => {
  it('creates with default status pending', () => {
    const task = Task.create({ title: 'Write tests' });
    expect(task.status).toBe('pending');
    expect(task.title).toBe('Write tests');
    expect(task.pullEvents()).toHaveLength(1);
  });

  it('updates status and props', () => {
    const task = Task.create({ title: 'A' });
    task.update({ title: 'B', status: 'completed' });
    expect(task.title).toBe('B');
    expect(task.status).toBe('completed');
  });
});
