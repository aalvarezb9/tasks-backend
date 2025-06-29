import { container } from 'tsyringe';
import '../../src/infrastructure/di/container';
import { TaskRepository } from '../../../../src/domain/repositories/TaskRepository';

describe('DI container', () => {
  it('resolves TaskRepository singleton', () => {
    const a = container.resolve<TaskRepository>('TaskRepository');
    const b = container.resolve<TaskRepository>('TaskRepository');
    expect(a).toBe(b);
  });
});
